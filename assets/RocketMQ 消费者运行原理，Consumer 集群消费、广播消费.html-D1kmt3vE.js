import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,d as t,o as a}from"./app-Q2dkLXYo.js";const s={};function r(l,o){return a(),n("div",null,[t(` 

- B站 [https://www.bilibili.com/video/BV1zm4y1872b](https://www.bilibili.com/video/BV1zm4y1872b)


<br/>

> 上次我们整体的看了一下RocketMQ Consumer 的消费过程   [RocketMQ之 Consumer，消费者消费原理解析](https://blog.csdn.net/Tomwildboar/article/details/130186017)，今天再来聚焦看一下 Consumer 是如何进行集群消费和广播消费的。<br/> <br/> **先来说结论** <br/> 
> 1. 消费者注册的时候已经告知服务器自己是的消费模型（集群/广播）
> 2. 消费者去拉取数据的时候由服务器判断是否可以拉到消息  
> <br/>
> 
>**再来看问题** 
> 1. 消费者如何注册进去的呢？
>2. 第一个请求是如何来到的呢？
>3. rebalanceService 是如何做负载的？
>4. 不同的 消费者最终执行任务的线程池是不是一个？

<br/>

## 一、开始

<br/>

没看过上一篇的小伙伴先看看之前的，这篇是上一篇的进阶版 Consumer，消费者消费原理解析 

每一个使用\`@RocketMQMessageListener\` 注解修饰的类，都会根据配置信息生成一个 \`DefaultRocketMQListenerContainer\` 消费开始就是从这个容器的 \`start()\` 方法开始。


<br/>

## 二、消费者是如何注册到nameserver

<br/>

结论：通过心跳注册并实时更新的

mQClientFactory.start() 中会开启一系列的定时任务，其中有一个就是定时任务

<br/>

### MQClientInstance.java

\`\`\`java
public void start() throws MQClientException {

    synchronized (this) {
        switch (this.serviceState) {
            case CREATE_JUST:
                // ... 
                
                // 开启定时任务
                this.startScheduledTask();
                
                // ...
                break;
            case START_FAILED:
                throw new MQClientException("The Factory object[" + this.getClientId() + "] has been created before, and failed.", null);
            default:
                break;
        }
    }
}
\`\`\`


这里面的定时任务很多，更新nameserver地址、更新topic、更新offset 等

\`\`\`java
private void startScheduledTask() {
   
    // ... 
    
    // 定时发送心跳更新消费者信息
    this.scheduledExecutorService.scheduleAtFixedRate(new Runnable() {

        @Override
        public void run() {
            try {
                MQClientInstance.this.cleanOfflineBroker();
                MQClientInstance.this.sendHeartbeatToAllBrokerWithLock();
            } catch (Exception e) {
                log.error("ScheduledTask sendHeartbeatToAllBroker exception", e);
            }
        }
    }, 1000, this.clientConfig.getHeartbeatBrokerInterval(), TimeUnit.MILLISECONDS);

    // ...
}
\`\`\`


简化版 发送心跳操作

\`\`\`java
public void sendHeartbeatToAllBrokerWithLock() {
    this.sendHeartbeatToAllBroker();
}



private void sendHeartbeatToAllBroker() {
    // 获取发送心跳的信息
    final HeartbeatData heartbeatData = this.prepareHeartbeatData();
    

    if (!this.brokerAddrTable.isEmpty()) {
        // ... 
        // 发送心跳
        int version = this.mQClientAPIImpl.sendHearbeat(addr, heartbeatData, clientConfig.getMqClientApiTimeout());
        // ...
    }
}


private HeartbeatData prepareHeartbeatData() {
    HeartbeatData heartbeatData = new HeartbeatData();

    // clientID
    heartbeatData.setClientID(this.clientId);

   
    // 每个消费者都会被注册到 consumerTable 里面，它是一个 ConcurrentMap
    for (Map.Entry<String, MQConsumerInner> entry : this.consumerTable.entrySet()) {
        MQConsumerInner impl = entry.getValue();
        if (impl != null) {
            // 获取消费者的信息
            ConsumerData consumerData = new ConsumerData();
            consumerData.setGroupName(impl.groupName());
            consumerData.setConsumeType(impl.consumeType());
            consumerData.setMessageModel(impl.messageModel());
            consumerData.setConsumeFromWhere(impl.consumeFromWhere());
            consumerData.getSubscriptionDataSet().addAll(impl.subscriptions());
            consumerData.setUnitMode(impl.isUnitMode());

            heartbeatData.getConsumerDataSet().add(consumerData);
        }
    }

    // Producer
    for (Map.Entry<String/* group */, MQProducerInner> entry : this.producerTable.entrySet()) {
        MQProducerInner impl = entry.getValue();
        if (impl != null) {
            ProducerData producerData = new ProducerData();
            producerData.setGroupName(entry.getKey());

            heartbeatData.getProducerDataSet().add(producerData);
        }
    }

    return heartbeatData;
}
\`\`\`

<br/>

### DefaultMQPushConsumerImpl.java
consumerTable 的数据来源

\`\`\`java
public synchronized void start() throws MQClientException {
    switch (this.serviceState) {
        case CREATE_JUST:
          
            // ... 
            // 注册消费者
            boolean registerOK = mQClientFactory.registerConsumer(this.defaultMQPushConsumer.getConsumerGroup(), this);
        
            // ... 
            this.serviceState = ServiceState.RUNNING;
            break;
        case RUNNING:
        case START_FAILED:
        case SHUTDOWN_ALREADY:
            throw new MQClientException("The PushConsumer service state not OK, maybe started once, "
                + this.serviceState
                + FAQUrl.suggestTodo(FAQUrl.CLIENT_SERVICE_NOT_OK),
                null);
        default:
            break;
    }
}

private final ConcurrentMap<String/* group */, MQConsumerInner> consumerTable = new ConcurrentHashMap<String, MQConsumerInner>();

public synchronized boolean registerConsumer(final String group, final MQConsumerInner consumer) {
    if (null == group || null == consumer) {
        return false;
    }
    
    // putIfAbsent 方法如果设置值成功就返回 true，如果key已经存在了就返回当前 key对应的值
    MQConsumerInner prev = this.consumerTable.putIfAbsent(group, consumer);
    if (prev != null) {
        log.warn("the consumer group[" + group + "] exist already.");
        return false;
    }

    return true;
}
\`\`\`

<br/>


## 三、第一个请求是如何来到的呢

<br/>

上一篇文章我们提到：每一个消费者都会开始一个死循环，一直从队列取数据进行消费，我们也知道每次任务完成都会把当前的这个请求存入队列构成一个循环请求，这样就会有个问题：第一次请求是怎么来的呢，其实是来自负载均衡。

其实它是来自负载，它的负载就是：我们知道 topic是逻辑上面的分类，队列才是存储数据的实质，负载就是切换不同的队列去消费数据。（只有集群消费才有）

### MQClientInstance.java

\`\`\`java
public void start() throws MQClientException {

    synchronized (this) {
        switch (this.serviceState) {
            case CREATE_JUST:
                // ...
                
                // 开启负载均衡
                this.rebalanceService.start();
                
                // ...
                break;
            case START_FAILED:
                throw new MQClientException("The Factory object[" + this.getClientId() + "] has been created before, and failed.", null);
            default:
                break;
        }
    }
}
\`\`\`

<br/>

### RebalanceService.java  run()

<br/>
这里开启了一个死循环，只要线程不停止就会一直执行

\`\`\`java
@Override
public void run() {
    log.info(this.getServiceName() + " service started");

    while (!this.isStopped()) {
        this.waitForRunning(waitInterval);
        this.mqClientFactory.doRebalance();
    }

    log.info(this.getServiceName() + " service end");
}
\`\`\`

<br/>

### MQClientInstance.java

上面我们已经知道每一个使用注解的类都会被注册成一个 \`DefaultMQPushConsumerImpl implements MQConsumerInner\`

\`\`\`java
public void doRebalance() {
    for (Map.Entry<String, MQConsumerInner> entry : this.consumerTable.entrySet()) {
        MQConsumerInner impl = entry.getValue();
        if (impl != null) {
            try {
                impl.doRebalance();
            } catch (Throwable e) {
                log.error("doRebalance exception", e);
            }
        }
    }
}
\`\`\`

<br/>


### DefaultMQPushConsumerImpl.java

\`\`\`java
@Override
public void doRebalance() {
    if (!this.pause) {
        this.rebalanceImpl.doRebalance(this.isConsumeOrderly());
    }
}

RebalanceImpl.java
public void doRebalance(final boolean isOrder) {
    Map<String, SubscriptionData> subTable = this.getSubscriptionInner();
    if (subTable != null) {
        for (final Map.Entry<String, SubscriptionData> entry : subTable.entrySet()) {
            final String topic = entry.getKey();
            try {
                this.rebalanceByTopic(topic, isOrder);
            } catch (Throwable e) {
                if (!topic.startsWith(MixAll.RETRY_GROUP_TOPIC_PREFIX)) {
                    log.warn("rebalanceByTopic Exception", e);
                }
            }
        }
    }

    this.truncateMessageQueueNotMyTopic();
}
\`\`\`

<br/>

这里我们可以看到，不管是集群消费，还是广播消费 都会，获取当前 topic对应的队列信息，然后进行投递到队列中（集群消费的分配策略复杂一些，这里先注视掉，下面再做解释）

<br/>

\`\`\`java
private void rebalanceByTopic(final String topic, final boolean isOrder) {
    switch (messageModel) {
        case BROADCASTING: {
            Set<MessageQueue> mqSet = this.topicSubscribeInfoTable.get(topic);
            if (mqSet != null) {
                boolean changed = this.updateProcessQueueTableInRebalance(topic, mqSet, isOrder);
                if (changed) {
                    this.messageQueueChanged(topic, mqSet, mqSet);
                    log.info("messageQueueChanged {} {} {} {}",
                        consumerGroup,
                        topic,
                        mqSet,
                        mqSet);
                }
            } else {
                log.warn("doRebalance, {}, but the topic[{}] not exist.", consumerGroup, topic);
            }
            break;
        }
        case CLUSTERING: {
             Set<MessageQueue> mqSet = this.topicSubscribeInfoTable.get(topic);
             // ...

            boolean changed = this.updateProcessQueueTableInRebalance(topic, allocateResultSet, isOrder);
            if (changed) {
                log.info(
                    "rebalanced result changed. allocateMessageQueueStrategyName={}, group={}, topic={}, clientId={}, mqAllSize={}, cidAllSize={}, rebalanceResultSize={}, rebalanceResultSet={}",
                    strategy.getName(), consumerGroup, topic, this.mQClientFactory.getClientId(), mqSet.size(), cidAll.size(),
                    allocateResultSet.size(), allocateResultSet);
                this.messageQueueChanged(topic, mqSet, allocateResultSet);
            }
          
            break;
        }
        default:
            break;
    }
}
\`\`\`

<br/>

这个方法会把每一个队列（MessageQueue）都组装成一个请求（PullRequest）

\`\`\`java
private boolean updateProcessQueueTableInRebalance(final String topic, final Set<MessageQueue> mqSet,
    final boolean isOrder) {
    boolean changed = false;

    // ...
    
    List<PullRequest> pullRequestList = new ArrayList<PullRequest>();
    for (MessageQueue mq : mqSet) {
        if (!this.processQueueTable.containsKey(mq)) {
            if (isOrder && !this.lock(mq)) {
                log.warn("doRebalance, {}, add a new mq failed, {}, because lock failed", consumerGroup, mq);
                continue;
            }

            this.removeDirtyOffset(mq);
            ProcessQueue pq = new ProcessQueue();

            long nextOffset = -1L;
            try {
                nextOffset = this.computePullFromWhereWithException(mq);
            } catch (Exception e) {
                log.info("doRebalance, {}, compute offset failed, {}", consumerGroup, mq);
                continue;
            }

            if (nextOffset >= 0) {
                ProcessQueue pre = this.processQueueTable.putIfAbsent(mq, pq);
                if (pre != null) {
                    log.info("doRebalance, {}, mq already exists, {}", consumerGroup, mq);
                } else {
                    log.info("doRebalance, {}, add a new mq, {}", consumerGroup, mq);
                    PullRequest pullRequest = new PullRequest();
                    pullRequest.setConsumerGroup(consumerGroup);
                    pullRequest.setNextOffset(nextOffset);
                    pullRequest.setMessageQueue(mq);
                    pullRequest.setProcessQueue(pq);
                    pullRequestList.add(pullRequest);
                    changed = true;
                }
            } else {
                log.warn("doRebalance, {}, add new mq failed, {}", consumerGroup, mq);
            }
        }
    }

    this.dispatchPullRequest(pullRequestList);

    return changed;
}
\`\`\`

<br/>

调用这个方法把请求（PullRequest），添加到队列中去，由之前的死循环去拉取请求处理

\`\`\`java
@Override
public void dispatchPullRequest(List<PullRequest> pullRequestList) {
    for (PullRequest pullRequest : pullRequestList) {
        // 之前我们已经看过，这个 方法就会把任务添加到队列中去了
        this.defaultMQPushConsumerImpl.executePullRequestImmediately(pullRequest);
        log.info("doRebalance, {}, add a new pull request {}", consumerGroup, pullRequest);
    }
}
\`\`\`

<br/>


## 四、rebalanceService 是如何做负载的

<br/>

首先一个 topic 的消息，会投递到多个消息队列（这里我们假设是A、B、C三个队列），所谓的负载就是消费者按照某种策略分别从三（N）个列队依次消费。

上面第一个请求中，我们已经知道负载的入口了，我们直接来看负载的核心方法
\`org.apache.rocketmq.client.impl.consumer.RebalanceImpl#rebalanceByTopic\`


\`\`\`java
private void rebalanceByTopic(final String topic, final boolean isOrder) {
    switch (messageModel) {
        case BROADCASTING: {
             // ... 广播负载
             
        }
        case CLUSTERING: {
            // ... 集群负载
        
        }
    }
}
\`\`\`

<br/>

### 广播消费

\`\`\`java
case BROADCASTING: {
    // 获取当前topic的队列信息
    Set<MessageQueue> mqSet = this.topicSubscribeInfoTable.get(topic);
    if (mqSet != null) {
        boolean changed = this.updateProcessQueueTableInRebalance(topic, mqSet, isOrder);
        if (changed) {
            this.messageQueueChanged(topic, mqSet, mqSet);
            log.info("messageQueueChanged {} {} {} {}",
                consumerGroup,
                topic,
                mqSet,
                mqSet);
        }
    } else {
        log.warn("doRebalance, {}, but the topic[{}] not exist.", consumerGroup, topic);
    }
    break;
}
\`\`\`

广播消费每个消费者是需要消费topic里面的每一个消息，所以就不存在什么负载了。

<br/>

#### updateProcessQueueTableInRebalance

updateProcessQueueTableInRebalance 方法是用来对负载均衡结果进行处理的，这个方法是通用的。因为广播消费不存在负载均衡，所以直接处理结果。

\`\`\`java
private boolean updateProcessQueueTableInRebalance(final String topic, final Set<MessageQueue> mqSet,
    final boolean isOrder) {
    boolean changed = false;
    // ... 
    
    List<PullRequest> pullRequestList = new ArrayList<PullRequest>();
    for (MessageQueue mq : mqSet) {
        // 判断当前正在进行的队列中，没有此队列
        if (!this.processQueueTable.containsKey(mq)) {
            if (isOrder && !this.lock(mq)) {
                log.warn("doRebalance, {}, add a new mq failed, {}, because lock failed", consumerGroup, mq);
                continue;
            }
            
            // 删除异常的队列
            this.removeDirtyOffset(mq);
            ProcessQueue pq = new ProcessQueue();

            long nextOffset = -1L;
            try {
                nextOffset = this.computePullFromWhereWithException(mq);
            } catch (Exception e) {
                log.info("doRebalance, {}, compute offset failed, {}", consumerGroup, mq);
                continue;
            }

            if (nextOffset >= 0) {
                ProcessQueue pre = this.processQueueTable.putIfAbsent(mq, pq);
                if (pre != null) {
                    log.info("doRebalance, {}, mq already exists, {}", consumerGroup, mq);
                } else {
                    // 组装消息请求，之前说到会有一个死循环不停的从队列中获取请求信息
                    log.info("doRebalance, {}, add a new mq, {}", consumerGroup, mq);
                    PullRequest pullRequest = new PullRequest();
                    pullRequest.setConsumerGroup(consumerGroup);
                    pullRequest.setNextOffset(nextOffset);
                    pullRequest.setMessageQueue(mq);
                    pullRequest.setProcessQueue(pq);
                    pullRequestList.add(pullRequest);
                    changed = true;
                }
            } else {
                log.warn("doRebalance, {}, add new mq failed, {}", consumerGroup, mq);
            }
        }
    }

    // 这个方法就是把这些个请求信息放到之前所说的队列中去
    this.dispatchPullRequest(pullRequestList);

    return changed;
}
\`\`\`

<br/>

### 集群消费

<br/>

集群消费因为每个消息只保证给消费组中的某个消费者消费，所以才需要负载均衡。

集群消费的负载均衡就是拿到全部的队列，和当前topic、consumerGroup下的全部消费者，再按照某种策略进行分发。


\`\`\`java
case CLUSTERING: {
    // 获取当前topic下的全部队列
    Set<MessageQueue> mqSet = this.topicSubscribeInfoTable.get(topic);
    
    // 获取当前topic和consumerGroup 下的全部消费者（会发起请求去服务端获取）
    List<String> cidAll = this.mQClientFactory.findConsumerIdList(topic, consumerGroup);
    
    // ... 省略参数校验
      
    if (mqSet != null && cidAll != null) {
        List<MessageQueue> mqAll = new ArrayList<MessageQueue>();
        mqAll.addAll(mqSet);

        Collections.sort(mqAll);
        Collections.sort(cidAll);
        
        // 获取负载均衡的策略 默认是【AllocateMessageQueueAveragely】平均哈希队列算法
        AllocateMessageQueueStrategy strategy = this.allocateMessageQueueStrategy;
        List<MessageQueue> allocateResult = null;
        try {
            allocateResult = strategy.allocate(
                this.consumerGroup,
                this.mQClientFactory.getClientId(),
                mqAll,
                cidAll);
        } catch (Throwable e) {
            log.error("AllocateMessageQueueStrategy.allocate Exception. allocateMessageQueueStrategyName={}", strategy.getName(),
                e);
            return;
        }

        Set<MessageQueue> allocateResultSet = new HashSet<MessageQueue>();
        if (allocateResult != null) {
            allocateResultSet.addAll(allocateResult);
        }
        
        // 把策略返回的结果进行实践处理【上面已经说过了】
        boolean changed = this.updateProcessQueueTableInRebalance(topic, allocateResultSet, isOrder);
        if (changed) {
            log.info(
                "rebalanced result changed. allocateMessageQueueStrategyName={}, group={}, topic={}, clientId={}, mqAllSize={}, cidAllSize={}, rebalanceResultSize={}, rebalanceResultSet={}",
                strategy.getName(), consumerGroup, topic, this.mQClientFactory.getClientId(), mqSet.size(), cidAll.size(),
                allocateResultSet.size(), allocateResultSet);
            this.messageQueueChanged(topic, mqSet, allocateResultSet);
        }
    }
    break;
}
\`\`\`

<br/>


#### AllocateMessageQueueAveragely

<br/>

想必你也和我一样好奇这个默认策略是怎么来的？？？

默认策略是从当前对象中拿到的，当前对象是 \`RebalanceImpl
AllocateMessageQueueStrategy strategy = this.allocateMessageQueueStrategy;\`

再往上看持有 RebalanceImpl 对象的是 DefaultMQPushConsumerImpl 对象

\`\`\`java
@Override
public void doRebalance() {
    if (!this.pause) {
        this.rebalanceImpl.doRebalance(this.isConsumeOrderly());
    }
}
\`\`\`

所以我们需要找到在创建DefaultMQPushConsumerImpl 对象的时候，它的创建在最开始解析 @RocketMQMessageListener的时候，可以看看上篇文章，这里只是把最终结果展示出来

\`\`\`java
private void initRocketMQPushConsumer() throws MQClientException {
    // ...
    
    // 不管是下面哪种创建方式负载均衡策略的默认值都是 【AllocateMessageQueueAveragely】
    if (Objects.nonNull(rpcHook)) {
        consumer = new DefaultMQPushConsumer(consumerGroup, rpcHook, new AllocateMessageQueueAveragely(),
            enableMsgTrace, this.applicationContext.getEnvironment().
            resolveRequiredPlaceholders(this.rocketMQMessageListener.customizedTraceTopic()));
        consumer.setVipChannelEnabled(false);
    } else {
        log.debug("Access-key or secret-key not configure in " + this + ".");
        consumer = new DefaultMQPushConsumer(consumerGroup, enableMsgTrace,
            this.applicationContext.getEnvironment().
                resolveRequiredPlaceholders(this.rocketMQMessageListener.customizedTraceTopic()));
    }
    
    // ...
}
\`\`\`

<br/>

## 五、不同的消费者最终执行任务的线程池是不是一个

<br/>

之所以产生这个疑问，是在想如果每个消费者都创建一个自己的线程池，那线程池不是很多么？（其实线程不多的话怎么做到高性能呢）


DefaultMQPushConsumerImpl#start
创建线程池的起始点是 start 方法，代码片段如下：

\`\`\`java
public synchronized void start() throws MQClientException {

    // ...
    
    if (this.getMessageListenerInner() instanceof MessageListenerOrderly) {
        this.consumeOrderly = true;
        this.consumeMessageService =
            new ConsumeMessageOrderlyService(this, (MessageListenerOrderly) this.getMessageListenerInner());
    } else if (this.getMessageListenerInner() instanceof MessageListenerConcurrently) {
        this.consumeOrderly = false;
        this.consumeMessageService =
            new ConsumeMessageConcurrentlyService(this, (MessageListenerConcurrently) this.getMessageListenerInner());
    }
    this.consumeMessageService.start();
    
    // ... 
}
\`\`\`

<br/>

并发消费走的是 ConsumeMessageConcurrentlyService

\`\`\`java
public ConsumeMessageConcurrentlyService(DefaultMQPushConsumerImpl defaultMQPushConsumerImpl,
    MessageListenerConcurrently messageListener) {
    // ...
    // 总是new创建的线程池
    this.consumeExecutor = new ThreadPoolExecutor(
        this.defaultMQPushConsumer.getConsumeThreadMin(),
        this.defaultMQPushConsumer.getConsumeThreadMax(),
        1000 * 60,
        TimeUnit.MILLISECONDS,
        this.consumeRequestQueue,
        new ThreadFactoryImpl(consumeThreadPrefix));

   // ...
}
\`\`\`

<br/>

通过new的方式创建基本就确定了是单独的线程池，如果还想继续确定可以打断点看对象的地址（事实证明是不一样的）

<br/>

参考文献
1. https://cloud.tencent.com/developer/article/2045909

B站 https://www.bilibili.com/video/BV1zm4y1872b
在线学习文档 https://d9bp4nr5ye.feishu.cn/wiki/wikcnqTsEVMD74nV9W6IsmVHuxe

上次我们整体的看了一下RocketMQ Consumer 的消费过程 RocketMQ之 Consumer，消费者消费原理解析，今天再来聚焦看一下 Consumer 是如何进行集群消费和广播消费的。

先来说结论

消费者注册的时候已经告知服务器自己是的消费模型（集群/广播）
消费者去拉取数据的时候由服务器判断是否可以拉到消息

再来看问题

消费者如何注册进去的呢？
第一个请求是如何来到的呢？
rebalanceService 是如何做负载的？
不同的 消费者最终执行任务的线程池是不是一个？

一、开始

没看过上一篇的小伙伴先看看之前的，这篇是上一篇的进阶版 Consumer，消费者消费原理解析

每一个使用@RocketMQMessageListener 注解修饰的类，都会根据配置信息生成一个 DefaultRocketMQListenerContainer 消费开始就是从这个容器的 start() 方法开始。


二、消费者是如何注册到nameserver

结论：通过心跳注册并实时更新的

mQClientFactory.start() 中会开启一系列的定时任务，其中有一个就是定时任务


MQClientInstance.java
public void start() throws MQClientException {

    synchronized (this) {
        switch (this.serviceState) {
            case CREATE_JUST:
                // ... 
                
                // 开启定时任务
                this.startScheduledTask();
                
                // ...
                break;
            case START_FAILED:
                throw new MQClientException("The Factory object[" + this.getClientId() + "] has been created before, and failed.", null);
            default:
                break;
        }
    }
}
这里面的定时任务很多，更新nameserver地址、更新topic、更新offset 等

private void startScheduledTask() {
   
    // ... 
    
    // 定时发送心跳更新消费者信息
    this.scheduledExecutorService.scheduleAtFixedRate(new Runnable() {

        @Override
        public void run() {
            try {
                MQClientInstance.this.cleanOfflineBroker();
                MQClientInstance.this.sendHeartbeatToAllBrokerWithLock();
            } catch (Exception e) {
                log.error("ScheduledTask sendHeartbeatToAllBroker exception", e);
            }
        }
    }, 1000, this.clientConfig.getHeartbeatBrokerInterval(), TimeUnit.MILLISECONDS);

    // ...
}
简化版 发送心跳操作

public void sendHeartbeatToAllBrokerWithLock() {
    this.sendHeartbeatToAllBroker();
}



private void sendHeartbeatToAllBroker() {
    // 获取发送心跳的信息
    final HeartbeatData heartbeatData = this.prepareHeartbeatData();
    

    if (!this.brokerAddrTable.isEmpty()) {
        // ... 
        // 发送心跳
        int version = this.mQClientAPIImpl.sendHearbeat(addr, heartbeatData, clientConfig.getMqClientApiTimeout());
        // ...
    }
}


private HeartbeatData prepareHeartbeatData() {
    HeartbeatData heartbeatData = new HeartbeatData();

    // clientID
    heartbeatData.setClientID(this.clientId);

   
    // 每个消费者都会被注册到 consumerTable 里面，它是一个 ConcurrentMap
    for (Map.Entry<String, MQConsumerInner> entry : this.consumerTable.entrySet()) {
        MQConsumerInner impl = entry.getValue();
        if (impl != null) {
            // 获取消费者的信息
            ConsumerData consumerData = new ConsumerData();
            consumerData.setGroupName(impl.groupName());
            consumerData.setConsumeType(impl.consumeType());
            consumerData.setMessageModel(impl.messageModel());
            consumerData.setConsumeFromWhere(impl.consumeFromWhere());
            consumerData.getSubscriptionDataSet().addAll(impl.subscriptions());
            consumerData.setUnitMode(impl.isUnitMode());

            heartbeatData.getConsumerDataSet().add(consumerData);
        }
    }

    // Producer
    for (Map.Entry<String/* group */, MQProducerInner> entry : this.producerTable.entrySet()) {
        MQProducerInner impl = entry.getValue();
        if (impl != null) {
            ProducerData producerData = new ProducerData();
            producerData.setGroupName(entry.getKey());

            heartbeatData.getProducerDataSet().add(producerData);
        }
    }

    return heartbeatData;
}

DefaultMQPushConsumerImpl.java
consumerTable 的数据来源

public synchronized void start() throws MQClientException {
    switch (this.serviceState) {
        case CREATE_JUST:
          
            // ... 
            // 注册消费者
            boolean registerOK = mQClientFactory.registerConsumer(this.defaultMQPushConsumer.getConsumerGroup(), this);
        
            // ... 
            this.serviceState = ServiceState.RUNNING;
            break;
        case RUNNING:
        case START_FAILED:
        case SHUTDOWN_ALREADY:
            throw new MQClientException("The PushConsumer service state not OK, maybe started once, "
                + this.serviceState
                + FAQUrl.suggestTodo(FAQUrl.CLIENT_SERVICE_NOT_OK),
                null);
        default:
            break;
    }
}

private final ConcurrentMap<String/* group */, MQConsumerInner> consumerTable = new ConcurrentHashMap<String, MQConsumerInner>();

public synchronized boolean registerConsumer(final String group, final MQConsumerInner consumer) {
    if (null == group || null == consumer) {
        return false;
    }
    
    // putIfAbsent 方法如果设置值成功就返回 true，如果key已经存在了就返回当前 key对应的值
    MQConsumerInner prev = this.consumerTable.putIfAbsent(group, consumer);
    if (prev != null) {
        log.warn("the consumer group[" + group + "] exist already.");
        return false;
    }

    return true;
}

三、第一个请求是如何来到的呢

上一篇文章我们提到：每一个消费者都会开始一个死循环，一直从队列取数据进行消费，我们也知道每次任务完成都会把当前的这个请求存入队列构成一个循环请求，这样就会有个问题：第一次请求是怎么来的呢，其实是来自负载均衡。

其实它是来自负载，它的负载就是：我们知道 topic是逻辑上面的分类，队列才是存储数据的实质，负载就是切换不同的队列去消费数据。（只有集群消费才有）

MQClientInstance.java
public void start() throws MQClientException {

    synchronized (this) {
        switch (this.serviceState) {
            case CREATE_JUST:
                // ...
                
                // 开启负载均衡
                this.rebalanceService.start();
                
                // ...
                break;
            case START_FAILED:
                throw new MQClientException("The Factory object[" + this.getClientId() + "] has been created before, and failed.", null);
            default:
                break;
        }
    }
}

RebalanceService.java run()

这里开启了一个死循环，只要线程不停止就会一直执行
@Override
public void run() {
    log.info(this.getServiceName() + " service started");

    while (!this.isStopped()) {
        this.waitForRunning(waitInterval);
        this.mqClientFactory.doRebalance();
    }

    log.info(this.getServiceName() + " service end");
}

MQClientInstance.java
上面我们已经知道每一个使用注解的类都会被注册成一个 DefaultMQPushConsumerImpl implements MQConsumerInner

public void doRebalance() {
    for (Map.Entry<String, MQConsumerInner> entry : this.consumerTable.entrySet()) {
        MQConsumerInner impl = entry.getValue();
        if (impl != null) {
            try {
                impl.doRebalance();
            } catch (Throwable e) {
                log.error("doRebalance exception", e);
            }
        }
    }
}

DefaultMQPushConsumerImpl.java
@Override
public void doRebalance() {
    if (!this.pause) {
        this.rebalanceImpl.doRebalance(this.isConsumeOrderly());
    }
}

RebalanceImpl.java
public void doRebalance(final boolean isOrder) {
    Map<String, SubscriptionData> subTable = this.getSubscriptionInner();
    if (subTable != null) {
        for (final Map.Entry<String, SubscriptionData> entry : subTable.entrySet()) {
            final String topic = entry.getKey();
            try {
                this.rebalanceByTopic(topic, isOrder);
            } catch (Throwable e) {
                if (!topic.startsWith(MixAll.RETRY_GROUP_TOPIC_PREFIX)) {
                    log.warn("rebalanceByTopic Exception", e);
                }
            }
        }
    }

    this.truncateMessageQueueNotMyTopic();
}

这里我们可以看到，不管是集群消费，还是广播消费 都会，获取当前 topic对应的队列信息，然后进行投递到队列中（集群消费的分配策略复杂一些，这里先注视掉，下面再做解释）


private void rebalanceByTopic(final String topic, final boolean isOrder) {
    switch (messageModel) {
        case BROADCASTING: {
            Set<MessageQueue> mqSet = this.topicSubscribeInfoTable.get(topic);
            if (mqSet != null) {
                boolean changed = this.updateProcessQueueTableInRebalance(topic, mqSet, isOrder);
                if (changed) {
                    this.messageQueueChanged(topic, mqSet, mqSet);
                    log.info("messageQueueChanged {} {} {} {}",
                        consumerGroup,
                        topic,
                        mqSet,
                        mqSet);
                }
            } else {
                log.warn("doRebalance, {}, but the topic[{}] not exist.", consumerGroup, topic);
            }
            break;
        }
        case CLUSTERING: {
             Set<MessageQueue> mqSet = this.topicSubscribeInfoTable.get(topic);
             // ...

            boolean changed = this.updateProcessQueueTableInRebalance(topic, allocateResultSet, isOrder);
            if (changed) {
                log.info(
                    "rebalanced result changed. allocateMessageQueueStrategyName={}, group={}, topic={}, clientId={}, mqAllSize={}, cidAllSize={}, rebalanceResultSize={}, rebalanceResultSet={}",
                    strategy.getName(), consumerGroup, topic, this.mQClientFactory.getClientId(), mqSet.size(), cidAll.size(),
                    allocateResultSet.size(), allocateResultSet);
                this.messageQueueChanged(topic, mqSet, allocateResultSet);
            }
          
            break;
        }
        default:
            break;
    }
}

这个方法会把每一个队列（MessageQueue）都组装成一个请求（PullRequest）

private boolean updateProcessQueueTableInRebalance(final String topic, final Set<MessageQueue> mqSet,
    final boolean isOrder) {
    boolean changed = false;

    // ...
    
    List<PullRequest> pullRequestList = new ArrayList<PullRequest>();
    for (MessageQueue mq : mqSet) {
        if (!this.processQueueTable.containsKey(mq)) {
            if (isOrder && !this.lock(mq)) {
                log.warn("doRebalance, {}, add a new mq failed, {}, because lock failed", consumerGroup, mq);
                continue;
            }

            this.removeDirtyOffset(mq);
            ProcessQueue pq = new ProcessQueue();

            long nextOffset = -1L;
            try {
                nextOffset = this.computePullFromWhereWithException(mq);
            } catch (Exception e) {
                log.info("doRebalance, {}, compute offset failed, {}", consumerGroup, mq);
                continue;
            }

            if (nextOffset >= 0) {
                ProcessQueue pre = this.processQueueTable.putIfAbsent(mq, pq);
                if (pre != null) {
                    log.info("doRebalance, {}, mq already exists, {}", consumerGroup, mq);
                } else {
                    log.info("doRebalance, {}, add a new mq, {}", consumerGroup, mq);
                    PullRequest pullRequest = new PullRequest();
                    pullRequest.setConsumerGroup(consumerGroup);
                    pullRequest.setNextOffset(nextOffset);
                    pullRequest.setMessageQueue(mq);
                    pullRequest.setProcessQueue(pq);
                    pullRequestList.add(pullRequest);
                    changed = true;
                }
            } else {
                log.warn("doRebalance, {}, add new mq failed, {}", consumerGroup, mq);
            }
        }
    }

    this.dispatchPullRequest(pullRequestList);

    return changed;
}

调用这个方法把请求（PullRequest），添加到队列中去，由之前的死循环去拉取请求处理

@Override
public void dispatchPullRequest(List<PullRequest> pullRequestList) {
    for (PullRequest pullRequest : pullRequestList) {
        // 之前我们已经看过，这个 方法就会把任务添加到队列中去了
        this.defaultMQPushConsumerImpl.executePullRequestImmediately(pullRequest);
        log.info("doRebalance, {}, add a new pull request {}", consumerGroup, pullRequest);
    }
}

四、rebalanceService 是如何做负载的

首先一个 topic 的消息，会投递到多个消息队列（这里我们假设是A、B、C三个队列），所谓的负载就是消费者按照某种策略分别从三（N）个列队依次消费。

上面第一个请求中，我们已经知道负载的入口了，我们直接来看负载的核心方法
org.apache.rocketmq.client.impl.consumer.RebalanceImpl#rebalanceByTopic

private void rebalanceByTopic(final String topic, final boolean isOrder) {
    switch (messageModel) {
        case BROADCASTING: {
             // ... 广播负载
             
        }
        case CLUSTERING: {
            // ... 集群负载
        
        }
    }
}

广播消费
case BROADCASTING: {
    // 获取当前topic的队列信息
    Set<MessageQueue> mqSet = this.topicSubscribeInfoTable.get(topic);
    if (mqSet != null) {
        boolean changed = this.updateProcessQueueTableInRebalance(topic, mqSet, isOrder);
        if (changed) {
            this.messageQueueChanged(topic, mqSet, mqSet);
            log.info("messageQueueChanged {} {} {} {}",
                consumerGroup,
                topic,
                mqSet,
                mqSet);
        }
    } else {
        log.warn("doRebalance, {}, but the topic[{}] not exist.", consumerGroup, topic);
    }
    break;
}
广播消费每个消费者是需要消费topic里面的每一个消息，所以就不存在什么负载了。


updateProcessQueueTableInRebalance
updateProcessQueueTableInRebalance 方法是用来对负载均衡结果进行处理的，这个方法是通用的。因为广播消费不存在负载均衡，所以直接处理结果。

private boolean updateProcessQueueTableInRebalance(final String topic, final Set<MessageQueue> mqSet,
    final boolean isOrder) {
    boolean changed = false;
    // ... 
    
    List<PullRequest> pullRequestList = new ArrayList<PullRequest>();
    for (MessageQueue mq : mqSet) {
        // 判断当前正在进行的队列中，没有此队列
        if (!this.processQueueTable.containsKey(mq)) {
            if (isOrder && !this.lock(mq)) {
                log.warn("doRebalance, {}, add a new mq failed, {}, because lock failed", consumerGroup, mq);
                continue;
            }
            
            // 删除异常的队列
            this.removeDirtyOffset(mq);
            ProcessQueue pq = new ProcessQueue();

            long nextOffset = -1L;
            try {
                nextOffset = this.computePullFromWhereWithException(mq);
            } catch (Exception e) {
                log.info("doRebalance, {}, compute offset failed, {}", consumerGroup, mq);
                continue;
            }

            if (nextOffset >= 0) {
                ProcessQueue pre = this.processQueueTable.putIfAbsent(mq, pq);
                if (pre != null) {
                    log.info("doRebalance, {}, mq already exists, {}", consumerGroup, mq);
                } else {
                    // 组装消息请求，之前说到会有一个死循环不停的从队列中获取请求信息
                    log.info("doRebalance, {}, add a new mq, {}", consumerGroup, mq);
                    PullRequest pullRequest = new PullRequest();
                    pullRequest.setConsumerGroup(consumerGroup);
                    pullRequest.setNextOffset(nextOffset);
                    pullRequest.setMessageQueue(mq);
                    pullRequest.setProcessQueue(pq);
                    pullRequestList.add(pullRequest);
                    changed = true;
                }
            } else {
                log.warn("doRebalance, {}, add new mq failed, {}", consumerGroup, mq);
            }
        }
    }

    // 这个方法就是把这些个请求信息放到之前所说的队列中去
    this.dispatchPullRequest(pullRequestList);

    return changed;
}

集群消费

集群消费因为每个消息只保证给消费组中的某个消费者消费，所以才需要负载均衡。

集群消费的负载均衡就是拿到全部的队列，和当前topic、consumerGroup下的全部消费者，再按照某种策略进行分发。

case CLUSTERING: {
    // 获取当前topic下的全部队列
    Set<MessageQueue> mqSet = this.topicSubscribeInfoTable.get(topic);
    
    // 获取当前topic和consumerGroup 下的全部消费者（会发起请求去服务端获取）
    List<String> cidAll = this.mQClientFactory.findConsumerIdList(topic, consumerGroup);
    
    // ... 省略参数校验
      
    if (mqSet != null && cidAll != null) {
        List<MessageQueue> mqAll = new ArrayList<MessageQueue>();
        mqAll.addAll(mqSet);

        Collections.sort(mqAll);
        Collections.sort(cidAll);
        
        // 获取负载均衡的策略 默认是【AllocateMessageQueueAveragely】平均哈希队列算法
        AllocateMessageQueueStrategy strategy = this.allocateMessageQueueStrategy;
        List<MessageQueue> allocateResult = null;
        try {
            allocateResult = strategy.allocate(
                this.consumerGroup,
                this.mQClientFactory.getClientId(),
                mqAll,
                cidAll);
        } catch (Throwable e) {
            log.error("AllocateMessageQueueStrategy.allocate Exception. allocateMessageQueueStrategyName={}", strategy.getName(),
                e);
            return;
        }

        Set<MessageQueue> allocateResultSet = new HashSet<MessageQueue>();
        if (allocateResult != null) {
            allocateResultSet.addAll(allocateResult);
        }
        
        // 把策略返回的结果进行实践处理【上面已经说过了】
        boolean changed = this.updateProcessQueueTableInRebalance(topic, allocateResultSet, isOrder);
        if (changed) {
            log.info(
                "rebalanced result changed. allocateMessageQueueStrategyName={}, group={}, topic={}, clientId={}, mqAllSize={}, cidAllSize={}, rebalanceResultSize={}, rebalanceResultSet={}",
                strategy.getName(), consumerGroup, topic, this.mQClientFactory.getClientId(), mqSet.size(), cidAll.size(),
                allocateResultSet.size(), allocateResultSet);
            this.messageQueueChanged(topic, mqSet, allocateResultSet);
        }
    }
    break;
}

AllocateMessageQueueAveragely

想必你也和我一样好奇这个默认策略是怎么来的？？？

默认策略是从当前对象中拿到的，当前对象是 RebalanceImpl AllocateMessageQueueStrategy strategy = this.allocateMessageQueueStrategy;

再往上看持有 RebalanceImpl 对象的是 DefaultMQPushConsumerImpl 对象

@Override
public void doRebalance() {
    if (!this.pause) {
        this.rebalanceImpl.doRebalance(this.isConsumeOrderly());
    }
}
所以我们需要找到在创建DefaultMQPushConsumerImpl 对象的时候，它的创建在最开始解析 @RocketMQMessageListener的时候，可以看看上篇文章，这里只是把最终结果展示出来

private void initRocketMQPushConsumer() throws MQClientException {
    // ...
    
    // 不管是下面哪种创建方式负载均衡策略的默认值都是 【AllocateMessageQueueAveragely】
    if (Objects.nonNull(rpcHook)) {
        consumer = new DefaultMQPushConsumer(consumerGroup, rpcHook, new AllocateMessageQueueAveragely(),
            enableMsgTrace, this.applicationContext.getEnvironment().
            resolveRequiredPlaceholders(this.rocketMQMessageListener.customizedTraceTopic()));
        consumer.setVipChannelEnabled(false);
    } else {
        log.debug("Access-key or secret-key not configure in " + this + ".");
        consumer = new DefaultMQPushConsumer(consumerGroup, enableMsgTrace,
            this.applicationContext.getEnvironment().
                resolveRequiredPlaceholders(this.rocketMQMessageListener.customizedTraceTopic()));
    }
    
    // ...
}

五、不同的消费者最终执行任务的线程池是不是一个

之所以产生这个疑问，是在想如果每个消费者都创建一个自己的线程池，那线程池不是很多么？（其实线程不多的话怎么做到高性能呢）

DefaultMQPushConsumerImpl#start
创建线程池的起始点是 start 方法，代码片段如下：

public synchronized void start() throws MQClientException {

    // ...
    
    if (this.getMessageListenerInner() instanceof MessageListenerOrderly) {
        this.consumeOrderly = true;
        this.consumeMessageService =
            new ConsumeMessageOrderlyService(this, (MessageListenerOrderly) this.getMessageListenerInner());
    } else if (this.getMessageListenerInner() instanceof MessageListenerConcurrently) {
        this.consumeOrderly = false;
        this.consumeMessageService =
            new ConsumeMessageConcurrentlyService(this, (MessageListenerConcurrently) this.getMessageListenerInner());
    }
    this.consumeMessageService.start();
    
    // ... 
}

并发消费走的是 ConsumeMessageConcurrentlyService

public ConsumeMessageConcurrentlyService(DefaultMQPushConsumerImpl defaultMQPushConsumerImpl,
    MessageListenerConcurrently messageListener) {
    // ...
    // 总是new创建的线程池
    this.consumeExecutor = new ThreadPoolExecutor(
        this.defaultMQPushConsumer.getConsumeThreadMin(),
        this.defaultMQPushConsumer.getConsumeThreadMax(),
        1000 * 60,
        TimeUnit.MILLISECONDS,
        this.consumeRequestQueue,
        new ThreadFactoryImpl(consumeThreadPrefix));

   // ...
}

通过new的方式创建基本就确定了是单独的线程池，如果还想继续确定可以打断点看对象的地址（事实证明是不一样的）


参考文献

https://cloud.tencent.com/developer/article/2045909
语法说明
标题文本样式列表图片链接目录代码片表格注脚注释自定义列表LaTeX 数学公式插入甘特图插入UML图插入Mermaid流程图插入Flowchart流程图插入类图快捷键
标题复制

# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
Markdown 14815 字数 715 行数 当前行 1, 当前列 0HTML 14192 字数 475 段落读完需要20分钟
发布博文获得大额流量券 `)])}const c=e(s,[["render",r],["__file","RocketMQ 消费者运行原理，Consumer 集群消费、广播消费.html.vue"]]),p=JSON.parse('{"path":"/05%E6%B6%88%E6%81%AF%E9%98%9F%E5%88%97/RocketMQ%20%E6%B6%88%E8%B4%B9%E8%80%85%E8%BF%90%E8%A1%8C%E5%8E%9F%E7%90%86%EF%BC%8CConsumer%20%E9%9B%86%E7%BE%A4%E6%B6%88%E8%B4%B9%E3%80%81%E5%B9%BF%E6%92%AD%E6%B6%88%E8%B4%B9.html","title":"【中】RocketMQ 消费者运行原理，Consumer 集群消费、广播消费","lang":"zh-CN","frontmatter":{"title":"【中】RocketMQ 消费者运行原理，Consumer 集群消费、广播消费","shortTitle":"【中】RocketMQ集群消费、广播消费","index":true,"date":"2023-05-23T22:54:21.000Z","timeline":false,"article":false,"category":["中级","视频讲解"],"tag":["RocketMQ","Consumer","消费者","消费模式"],"head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/05%E6%B6%88%E6%81%AF%E9%98%9F%E5%88%97/RocketMQ%20%E6%B6%88%E8%B4%B9%E8%80%85%E8%BF%90%E8%A1%8C%E5%8E%9F%E7%90%86%EF%BC%8CConsumer%20%E9%9B%86%E7%BE%A4%E6%B6%88%E8%B4%B9%E3%80%81%E5%B9%BF%E6%92%AD%E6%B6%88%E8%B4%B9.html"}],["meta",{"property":"og:site_name","content":"小道仙Java笔记"}],["meta",{"property":"og:title","content":"【中】RocketMQ 消费者运行原理，Consumer 集群消费、广播消费"}],["meta",{"property":"og:type","content":"website"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-21T07:52:57.000Z"}],["meta",{"property":"article:author","content":"小道仙97"}],["meta",{"property":"article:tag","content":"RocketMQ"}],["meta",{"property":"article:tag","content":"Consumer"}],["meta",{"property":"article:tag","content":"消费者"}],["meta",{"property":"article:tag","content":"消费模式"}],["meta",{"property":"article:published_time","content":"2023-05-23T22:54:21.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-21T07:52:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"WebPage\\",\\"name\\":\\"【中】RocketMQ 消费者运行原理，Consumer 集群消费、广播消费\\"}"]]},"headers":[],"git":{"createdTime":1721478655000,"updatedTime":1721548377000,"contributors":[{"name":"ziyangtao","email":"ziyangtao@distinctclinic.com","commits":3}]},"readingTime":{"minutes":18.32,"words":5496},"filePathRelative":"05消息队列/RocketMQ 消费者运行原理，Consumer 集群消费、广播消费.md","localizedDate":"2023年5月24日","excerpt":"<!-- \\n\\n- B站 [https://www.bilibili.com/video/BV1zm4y1872b](https://www.bilibili.com/video/BV1zm4y1872b)\\n\\n\\n<br/>\\n\\n> 上次我们整体的看了一下RocketMQ Consumer 的消费过程   [RocketMQ之 Consumer，消费者消费原理解析](https://blog.csdn.net/Tomwildboar/article/details/130186017)，今天再来聚焦看一下 Consumer 是如何进行集群消费和广播消费的。<br/> <br/> **先来说结论** <br/> \\n> 1. 消费者注册的时候已经告知服务器自己是的消费模型（集群/广播）\\n> 2. 消费者去拉取数据的时候由服务器判断是否可以拉到消息  \\n> <br/>\\n> \\n>**再来看问题** \\n> 1. 消费者如何注册进去的呢？\\n>2. 第一个请求是如何来到的呢？\\n>3. rebalanceService 是如何做负载的？\\n>4. 不同的 消费者最终执行任务的线程池是不是一个？\\n\\n<br/>\\n\\n## 一、开始\\n\\n<br/>\\n\\n没看过上一篇的小伙伴先看看之前的，这篇是上一篇的进阶版 Consumer，消费者消费原理解析 \\n\\n每一个使用`@RocketMQMessageListener` 注解修饰的类，都会根据配置信息生成一个 `DefaultRocketMQListenerContainer` 消费开始就是从这个容器的 `start()` 方法开始。\\n\\n\\n<br/>\\n\\n## 二、消费者是如何注册到nameserver\\n\\n<br/>\\n\\n结论：通过心跳注册并实时更新的\\n\\nmQClientFactory.start() 中会开启一系列的定时任务，其中有一个就是定时任务\\n\\n<br/>\\n\\n### MQClientInstance.java\\n\\n```java\\npublic void start() throws MQClientException {\\n\\n    synchronized (this) {\\n        switch (this.serviceState) {\\n            case CREATE_JUST:\\n                // ... \\n                \\n                // 开启定时任务\\n                this.startScheduledTask();\\n                \\n                // ...\\n                break;\\n            case START_FAILED:\\n                throw new MQClientException(\\"The Factory object[\\" + this.getClientId() + \\"] has been created before, and failed.\\", null);\\n            default:\\n                break;\\n        }\\n    }\\n}\\n```\\n\\n\\n这里面的定时任务很多，更新nameserver地址、更新topic、更新offset 等\\n\\n```java\\nprivate void startScheduledTask() {\\n   \\n    // ... \\n    \\n    // 定时发送心跳更新消费者信息\\n    this.scheduledExecutorService.scheduleAtFixedRate(new Runnable() {\\n\\n        @Override\\n        public void run() {\\n            try {\\n                MQClientInstance.this.cleanOfflineBroker();\\n                MQClientInstance.this.sendHeartbeatToAllBrokerWithLock();\\n            } catch (Exception e) {\\n                log.error(\\"ScheduledTask sendHeartbeatToAllBroker exception\\", e);\\n            }\\n        }\\n    }, 1000, this.clientConfig.getHeartbeatBrokerInterval(), TimeUnit.MILLISECONDS);\\n\\n    // ...\\n}\\n```\\n\\n\\n简化版 发送心跳操作\\n\\n```java\\npublic void sendHeartbeatToAllBrokerWithLock() {\\n    this.sendHeartbeatToAllBroker();\\n}\\n\\n\\n\\nprivate void sendHeartbeatToAllBroker() {\\n    // 获取发送心跳的信息\\n    final HeartbeatData heartbeatData = this.prepareHeartbeatData();\\n    \\n\\n    if (!this.brokerAddrTable.isEmpty()) {\\n        // ... \\n        // 发送心跳\\n        int version = this.mQClientAPIImpl.sendHearbeat(addr, heartbeatData, clientConfig.getMqClientApiTimeout());\\n        // ...\\n    }\\n}\\n\\n\\nprivate HeartbeatData prepareHeartbeatData() {\\n    HeartbeatData heartbeatData = new HeartbeatData();\\n\\n    // clientID\\n    heartbeatData.setClientID(this.clientId);\\n\\n   \\n    // 每个消费者都会被注册到 consumerTable 里面，它是一个 ConcurrentMap\\n    for (Map.Entry<String, MQConsumerInner> entry : this.consumerTable.entrySet()) {\\n        MQConsumerInner impl = entry.getValue();\\n        if (impl != null) {\\n            // 获取消费者的信息\\n            ConsumerData consumerData = new ConsumerData();\\n            consumerData.setGroupName(impl.groupName());\\n            consumerData.setConsumeType(impl.consumeType());\\n            consumerData.setMessageModel(impl.messageModel());\\n            consumerData.setConsumeFromWhere(impl.consumeFromWhere());\\n            consumerData.getSubscriptionDataSet().addAll(impl.subscriptions());\\n            consumerData.setUnitMode(impl.isUnitMode());\\n\\n            heartbeatData.getConsumerDataSet().add(consumerData);\\n        }\\n    }\\n\\n    // Producer\\n    for (Map.Entry<String/* group */, MQProducerInner> entry : this.producerTable.entrySet()) {\\n        MQProducerInner impl = entry.getValue();\\n        if (impl != null) {\\n            ProducerData producerData = new ProducerData();\\n            producerData.setGroupName(entry.getKey());\\n\\n            heartbeatData.getProducerDataSet().add(producerData);\\n        }\\n    }\\n\\n    return heartbeatData;\\n}\\n```\\n\\n<br/>\\n\\n### DefaultMQPushConsumerImpl.java\\nconsumerTable 的数据来源\\n\\n```java\\npublic synchronized void start() throws MQClientException {\\n    switch (this.serviceState) {\\n        case CREATE_JUST:\\n          \\n            // ... \\n            // 注册消费者\\n            boolean registerOK = mQClientFactory.registerConsumer(this.defaultMQPushConsumer.getConsumerGroup(), this);\\n        \\n            // ... \\n            this.serviceState = ServiceState.RUNNING;\\n            break;\\n        case RUNNING:\\n        case START_FAILED:\\n        case SHUTDOWN_ALREADY:\\n            throw new MQClientException(\\"The PushConsumer service state not OK, maybe started once, \\"\\n                + this.serviceState\\n                + FAQUrl.suggestTodo(FAQUrl.CLIENT_SERVICE_NOT_OK),\\n                null);\\n        default:\\n            break;\\n    }\\n}\\n\\nprivate final ConcurrentMap<String/* group */, MQConsumerInner> consumerTable = new ConcurrentHashMap<String, MQConsumerInner>();\\n\\npublic synchronized boolean registerConsumer(final String group, final MQConsumerInner consumer) {\\n    if (null == group || null == consumer) {\\n        return false;\\n    }\\n    \\n    // putIfAbsent 方法如果设置值成功就返回 true，如果key已经存在了就返回当前 key对应的值\\n    MQConsumerInner prev = this.consumerTable.putIfAbsent(group, consumer);\\n    if (prev != null) {\\n        log.warn(\\"the consumer group[\\" + group + \\"] exist already.\\");\\n        return false;\\n    }\\n\\n    return true;\\n}\\n```\\n\\n<br/>\\n\\n\\n## 三、第一个请求是如何来到的呢\\n\\n<br/>\\n\\n上一篇文章我们提到：每一个消费者都会开始一个死循环，一直从队列取数据进行消费，我们也知道每次任务完成都会把当前的这个请求存入队列构成一个循环请求，这样就会有个问题：第一次请求是怎么来的呢，其实是来自负载均衡。\\n\\n其实它是来自负载，它的负载就是：我们知道 topic是逻辑上面的分类，队列才是存储数据的实质，负载就是切换不同的队列去消费数据。（只有集群消费才有）\\n\\n### MQClientInstance.java\\n\\n```java\\npublic void start() throws MQClientException {\\n\\n    synchronized (this) {\\n        switch (this.serviceState) {\\n            case CREATE_JUST:\\n                // ...\\n                \\n                // 开启负载均衡\\n                this.rebalanceService.start();\\n                \\n                // ...\\n                break;\\n            case START_FAILED:\\n                throw new MQClientException(\\"The Factory object[\\" + this.getClientId() + \\"] has been created before, and failed.\\", null);\\n            default:\\n                break;\\n        }\\n    }\\n}\\n```\\n\\n<br/>\\n\\n### RebalanceService.java  run()\\n\\n<br/>\\n这里开启了一个死循环，只要线程不停止就会一直执行\\n\\n```java\\n@Override\\npublic void run() {\\n    log.info(this.getServiceName() + \\" service started\\");\\n\\n    while (!this.isStopped()) {\\n        this.waitForRunning(waitInterval);\\n        this.mqClientFactory.doRebalance();\\n    }\\n\\n    log.info(this.getServiceName() + \\" service end\\");\\n}\\n```\\n\\n<br/>\\n\\n### MQClientInstance.java\\n\\n上面我们已经知道每一个使用注解的类都会被注册成一个 `DefaultMQPushConsumerImpl implements MQConsumerInner`\\n\\n```java\\npublic void doRebalance() {\\n    for (Map.Entry<String, MQConsumerInner> entry : this.consumerTable.entrySet()) {\\n        MQConsumerInner impl = entry.getValue();\\n        if (impl != null) {\\n            try {\\n                impl.doRebalance();\\n            } catch (Throwable e) {\\n                log.error(\\"doRebalance exception\\", e);\\n            }\\n        }\\n    }\\n}\\n```\\n\\n<br/>\\n\\n\\n### DefaultMQPushConsumerImpl.java\\n\\n```java\\n@Override\\npublic void doRebalance() {\\n    if (!this.pause) {\\n        this.rebalanceImpl.doRebalance(this.isConsumeOrderly());\\n    }\\n}\\n\\nRebalanceImpl.java\\npublic void doRebalance(final boolean isOrder) {\\n    Map<String, SubscriptionData> subTable = this.getSubscriptionInner();\\n    if (subTable != null) {\\n        for (final Map.Entry<String, SubscriptionData> entry : subTable.entrySet()) {\\n            final String topic = entry.getKey();\\n            try {\\n                this.rebalanceByTopic(topic, isOrder);\\n            } catch (Throwable e) {\\n                if (!topic.startsWith(MixAll.RETRY_GROUP_TOPIC_PREFIX)) {\\n                    log.warn(\\"rebalanceByTopic Exception\\", e);\\n                }\\n            }\\n        }\\n    }\\n\\n    this.truncateMessageQueueNotMyTopic();\\n}\\n```\\n\\n<br/>\\n\\n这里我们可以看到，不管是集群消费，还是广播消费 都会，获取当前 topic对应的队列信息，然后进行投递到队列中（集群消费的分配策略复杂一些，这里先注视掉，下面再做解释）\\n\\n<br/>\\n\\n```java\\nprivate void rebalanceByTopic(final String topic, final boolean isOrder) {\\n    switch (messageModel) {\\n        case BROADCASTING: {\\n            Set<MessageQueue> mqSet = this.topicSubscribeInfoTable.get(topic);\\n            if (mqSet != null) {\\n                boolean changed = this.updateProcessQueueTableInRebalance(topic, mqSet, isOrder);\\n                if (changed) {\\n                    this.messageQueueChanged(topic, mqSet, mqSet);\\n                    log.info(\\"messageQueueChanged {} {} {} {}\\",\\n                        consumerGroup,\\n                        topic,\\n                        mqSet,\\n                        mqSet);\\n                }\\n            } else {\\n                log.warn(\\"doRebalance, {}, but the topic[{}] not exist.\\", consumerGroup, topic);\\n            }\\n            break;\\n        }\\n        case CLUSTERING: {\\n             Set<MessageQueue> mqSet = this.topicSubscribeInfoTable.get(topic);\\n             // ...\\n\\n            boolean changed = this.updateProcessQueueTableInRebalance(topic, allocateResultSet, isOrder);\\n            if (changed) {\\n                log.info(\\n                    \\"rebalanced result changed. allocateMessageQueueStrategyName={}, group={}, topic={}, clientId={}, mqAllSize={}, cidAllSize={}, rebalanceResultSize={}, rebalanceResultSet={}\\",\\n                    strategy.getName(), consumerGroup, topic, this.mQClientFactory.getClientId(), mqSet.size(), cidAll.size(),\\n                    allocateResultSet.size(), allocateResultSet);\\n                this.messageQueueChanged(topic, mqSet, allocateResultSet);\\n            }\\n          \\n            break;\\n        }\\n        default:\\n            break;\\n    }\\n}\\n```\\n\\n<br/>\\n\\n这个方法会把每一个队列（MessageQueue）都组装成一个请求（PullRequest）\\n\\n```java\\nprivate boolean updateProcessQueueTableInRebalance(final String topic, final Set<MessageQueue> mqSet,\\n    final boolean isOrder) {\\n    boolean changed = false;\\n\\n    // ...\\n    \\n    List<PullRequest> pullRequestList = new ArrayList<PullRequest>();\\n    for (MessageQueue mq : mqSet) {\\n        if (!this.processQueueTable.containsKey(mq)) {\\n            if (isOrder && !this.lock(mq)) {\\n                log.warn(\\"doRebalance, {}, add a new mq failed, {}, because lock failed\\", consumerGroup, mq);\\n                continue;\\n            }\\n\\n            this.removeDirtyOffset(mq);\\n            ProcessQueue pq = new ProcessQueue();\\n\\n            long nextOffset = -1L;\\n            try {\\n                nextOffset = this.computePullFromWhereWithException(mq);\\n            } catch (Exception e) {\\n                log.info(\\"doRebalance, {}, compute offset failed, {}\\", consumerGroup, mq);\\n                continue;\\n            }\\n\\n            if (nextOffset >= 0) {\\n                ProcessQueue pre = this.processQueueTable.putIfAbsent(mq, pq);\\n                if (pre != null) {\\n                    log.info(\\"doRebalance, {}, mq already exists, {}\\", consumerGroup, mq);\\n                } else {\\n                    log.info(\\"doRebalance, {}, add a new mq, {}\\", consumerGroup, mq);\\n                    PullRequest pullRequest = new PullRequest();\\n                    pullRequest.setConsumerGroup(consumerGroup);\\n                    pullRequest.setNextOffset(nextOffset);\\n                    pullRequest.setMessageQueue(mq);\\n                    pullRequest.setProcessQueue(pq);\\n                    pullRequestList.add(pullRequest);\\n                    changed = true;\\n                }\\n            } else {\\n                log.warn(\\"doRebalance, {}, add new mq failed, {}\\", consumerGroup, mq);\\n            }\\n        }\\n    }\\n\\n    this.dispatchPullRequest(pullRequestList);\\n\\n    return changed;\\n}\\n```\\n\\n<br/>\\n\\n调用这个方法把请求（PullRequest），添加到队列中去，由之前的死循环去拉取请求处理\\n\\n```java\\n@Override\\npublic void dispatchPullRequest(List<PullRequest> pullRequestList) {\\n    for (PullRequest pullRequest : pullRequestList) {\\n        // 之前我们已经看过，这个 方法就会把任务添加到队列中去了\\n        this.defaultMQPushConsumerImpl.executePullRequestImmediately(pullRequest);\\n        log.info(\\"doRebalance, {}, add a new pull request {}\\", consumerGroup, pullRequest);\\n    }\\n}\\n```\\n\\n<br/>\\n\\n\\n## 四、rebalanceService 是如何做负载的\\n\\n<br/>\\n\\n首先一个 topic 的消息，会投递到多个消息队列（这里我们假设是A、B、C三个队列），所谓的负载就是消费者按照某种策略分别从三（N）个列队依次消费。\\n\\n上面第一个请求中，我们已经知道负载的入口了，我们直接来看负载的核心方法\\n`org.apache.rocketmq.client.impl.consumer.RebalanceImpl#rebalanceByTopic`\\n\\n\\n```java\\nprivate void rebalanceByTopic(final String topic, final boolean isOrder) {\\n    switch (messageModel) {\\n        case BROADCASTING: {\\n             // ... 广播负载\\n             \\n        }\\n        case CLUSTERING: {\\n            // ... 集群负载\\n        \\n        }\\n    }\\n}\\n```\\n\\n<br/>\\n\\n### 广播消费\\n\\n```java\\ncase BROADCASTING: {\\n    // 获取当前topic的队列信息\\n    Set<MessageQueue> mqSet = this.topicSubscribeInfoTable.get(topic);\\n    if (mqSet != null) {\\n        boolean changed = this.updateProcessQueueTableInRebalance(topic, mqSet, isOrder);\\n        if (changed) {\\n            this.messageQueueChanged(topic, mqSet, mqSet);\\n            log.info(\\"messageQueueChanged {} {} {} {}\\",\\n                consumerGroup,\\n                topic,\\n                mqSet,\\n                mqSet);\\n        }\\n    } else {\\n        log.warn(\\"doRebalance, {}, but the topic[{}] not exist.\\", consumerGroup, topic);\\n    }\\n    break;\\n}\\n```\\n\\n广播消费每个消费者是需要消费topic里面的每一个消息，所以就不存在什么负载了。\\n\\n<br/>\\n\\n#### updateProcessQueueTableInRebalance\\n\\nupdateProcessQueueTableInRebalance 方法是用来对负载均衡结果进行处理的，这个方法是通用的。因为广播消费不存在负载均衡，所以直接处理结果。\\n\\n```java\\nprivate boolean updateProcessQueueTableInRebalance(final String topic, final Set<MessageQueue> mqSet,\\n    final boolean isOrder) {\\n    boolean changed = false;\\n    // ... \\n    \\n    List<PullRequest> pullRequestList = new ArrayList<PullRequest>();\\n    for (MessageQueue mq : mqSet) {\\n        // 判断当前正在进行的队列中，没有此队列\\n        if (!this.processQueueTable.containsKey(mq)) {\\n            if (isOrder && !this.lock(mq)) {\\n                log.warn(\\"doRebalance, {}, add a new mq failed, {}, because lock failed\\", consumerGroup, mq);\\n                continue;\\n            }\\n            \\n            // 删除异常的队列\\n            this.removeDirtyOffset(mq);\\n            ProcessQueue pq = new ProcessQueue();\\n\\n            long nextOffset = -1L;\\n            try {\\n                nextOffset = this.computePullFromWhereWithException(mq);\\n            } catch (Exception e) {\\n                log.info(\\"doRebalance, {}, compute offset failed, {}\\", consumerGroup, mq);\\n                continue;\\n            }\\n\\n            if (nextOffset >= 0) {\\n                ProcessQueue pre = this.processQueueTable.putIfAbsent(mq, pq);\\n                if (pre != null) {\\n                    log.info(\\"doRebalance, {}, mq already exists, {}\\", consumerGroup, mq);\\n                } else {\\n                    // 组装消息请求，之前说到会有一个死循环不停的从队列中获取请求信息\\n                    log.info(\\"doRebalance, {}, add a new mq, {}\\", consumerGroup, mq);\\n                    PullRequest pullRequest = new PullRequest();\\n                    pullRequest.setConsumerGroup(consumerGroup);\\n                    pullRequest.setNextOffset(nextOffset);\\n                    pullRequest.setMessageQueue(mq);\\n                    pullRequest.setProcessQueue(pq);\\n                    pullRequestList.add(pullRequest);\\n                    changed = true;\\n                }\\n            } else {\\n                log.warn(\\"doRebalance, {}, add new mq failed, {}\\", consumerGroup, mq);\\n            }\\n        }\\n    }\\n\\n    // 这个方法就是把这些个请求信息放到之前所说的队列中去\\n    this.dispatchPullRequest(pullRequestList);\\n\\n    return changed;\\n}\\n```\\n\\n<br/>\\n\\n### 集群消费\\n\\n<br/>\\n\\n集群消费因为每个消息只保证给消费组中的某个消费者消费，所以才需要负载均衡。\\n\\n集群消费的负载均衡就是拿到全部的队列，和当前topic、consumerGroup下的全部消费者，再按照某种策略进行分发。\\n\\n\\n```java\\ncase CLUSTERING: {\\n    // 获取当前topic下的全部队列\\n    Set<MessageQueue> mqSet = this.topicSubscribeInfoTable.get(topic);\\n    \\n    // 获取当前topic和consumerGroup 下的全部消费者（会发起请求去服务端获取）\\n    List<String> cidAll = this.mQClientFactory.findConsumerIdList(topic, consumerGroup);\\n    \\n    // ... 省略参数校验\\n      \\n    if (mqSet != null && cidAll != null) {\\n        List<MessageQueue> mqAll = new ArrayList<MessageQueue>();\\n        mqAll.addAll(mqSet);\\n\\n        Collections.sort(mqAll);\\n        Collections.sort(cidAll);\\n        \\n        // 获取负载均衡的策略 默认是【AllocateMessageQueueAveragely】平均哈希队列算法\\n        AllocateMessageQueueStrategy strategy = this.allocateMessageQueueStrategy;\\n        List<MessageQueue> allocateResult = null;\\n        try {\\n            allocateResult = strategy.allocate(\\n                this.consumerGroup,\\n                this.mQClientFactory.getClientId(),\\n                mqAll,\\n                cidAll);\\n        } catch (Throwable e) {\\n            log.error(\\"AllocateMessageQueueStrategy.allocate Exception. allocateMessageQueueStrategyName={}\\", strategy.getName(),\\n                e);\\n            return;\\n        }\\n\\n        Set<MessageQueue> allocateResultSet = new HashSet<MessageQueue>();\\n        if (allocateResult != null) {\\n            allocateResultSet.addAll(allocateResult);\\n        }\\n        \\n        // 把策略返回的结果进行实践处理【上面已经说过了】\\n        boolean changed = this.updateProcessQueueTableInRebalance(topic, allocateResultSet, isOrder);\\n        if (changed) {\\n            log.info(\\n                \\"rebalanced result changed. allocateMessageQueueStrategyName={}, group={}, topic={}, clientId={}, mqAllSize={}, cidAllSize={}, rebalanceResultSize={}, rebalanceResultSet={}\\",\\n                strategy.getName(), consumerGroup, topic, this.mQClientFactory.getClientId(), mqSet.size(), cidAll.size(),\\n                allocateResultSet.size(), allocateResultSet);\\n            this.messageQueueChanged(topic, mqSet, allocateResultSet);\\n        }\\n    }\\n    break;\\n}\\n```\\n\\n<br/>\\n\\n\\n#### AllocateMessageQueueAveragely\\n\\n<br/>\\n\\n想必你也和我一样好奇这个默认策略是怎么来的？？？\\n\\n默认策略是从当前对象中拿到的，当前对象是 `RebalanceImpl\\nAllocateMessageQueueStrategy strategy = this.allocateMessageQueueStrategy;`\\n\\n再往上看持有 RebalanceImpl 对象的是 DefaultMQPushConsumerImpl 对象\\n\\n```java\\n@Override\\npublic void doRebalance() {\\n    if (!this.pause) {\\n        this.rebalanceImpl.doRebalance(this.isConsumeOrderly());\\n    }\\n}\\n```\\n\\n所以我们需要找到在创建DefaultMQPushConsumerImpl 对象的时候，它的创建在最开始解析 @RocketMQMessageListener的时候，可以看看上篇文章，这里只是把最终结果展示出来\\n\\n```java\\nprivate void initRocketMQPushConsumer() throws MQClientException {\\n    // ...\\n    \\n    // 不管是下面哪种创建方式负载均衡策略的默认值都是 【AllocateMessageQueueAveragely】\\n    if (Objects.nonNull(rpcHook)) {\\n        consumer = new DefaultMQPushConsumer(consumerGroup, rpcHook, new AllocateMessageQueueAveragely(),\\n            enableMsgTrace, this.applicationContext.getEnvironment().\\n            resolveRequiredPlaceholders(this.rocketMQMessageListener.customizedTraceTopic()));\\n        consumer.setVipChannelEnabled(false);\\n    } else {\\n        log.debug(\\"Access-key or secret-key not configure in \\" + this + \\".\\");\\n        consumer = new DefaultMQPushConsumer(consumerGroup, enableMsgTrace,\\n            this.applicationContext.getEnvironment().\\n                resolveRequiredPlaceholders(this.rocketMQMessageListener.customizedTraceTopic()));\\n    }\\n    \\n    // ...\\n}\\n```\\n\\n<br/>\\n\\n## 五、不同的消费者最终执行任务的线程池是不是一个\\n\\n<br/>\\n\\n之所以产生这个疑问，是在想如果每个消费者都创建一个自己的线程池，那线程池不是很多么？（其实线程不多的话怎么做到高性能呢）\\n\\n\\nDefaultMQPushConsumerImpl#start\\n创建线程池的起始点是 start 方法，代码片段如下：\\n\\n```java\\npublic synchronized void start() throws MQClientException {\\n\\n    // ...\\n    \\n    if (this.getMessageListenerInner() instanceof MessageListenerOrderly) {\\n        this.consumeOrderly = true;\\n        this.consumeMessageService =\\n            new ConsumeMessageOrderlyService(this, (MessageListenerOrderly) this.getMessageListenerInner());\\n    } else if (this.getMessageListenerInner() instanceof MessageListenerConcurrently) {\\n        this.consumeOrderly = false;\\n        this.consumeMessageService =\\n            new ConsumeMessageConcurrentlyService(this, (MessageListenerConcurrently) this.getMessageListenerInner());\\n    }\\n    this.consumeMessageService.start();\\n    \\n    // ... \\n}\\n```\\n\\n<br/>\\n\\n并发消费走的是 ConsumeMessageConcurrentlyService\\n\\n```java\\npublic ConsumeMessageConcurrentlyService(DefaultMQPushConsumerImpl defaultMQPushConsumerImpl,\\n    MessageListenerConcurrently messageListener) {\\n    // ...\\n    // 总是new创建的线程池\\n    this.consumeExecutor = new ThreadPoolExecutor(\\n        this.defaultMQPushConsumer.getConsumeThreadMin(),\\n        this.defaultMQPushConsumer.getConsumeThreadMax(),\\n        1000 * 60,\\n        TimeUnit.MILLISECONDS,\\n        this.consumeRequestQueue,\\n        new ThreadFactoryImpl(consumeThreadPrefix));\\n\\n   // ...\\n}\\n```\\n\\n<br/>\\n\\n通过new的方式创建基本就确定了是单独的线程池，如果还想继续确定可以打断点看对象的地址（事实证明是不一样的）\\n\\n<br/>\\n\\n参考文献\\n1. https://cloud.tencent.com/developer/article/2045909\\n\\nB站 https://www.bilibili.com/video/BV1zm4y1872b\\n在线学习文档 https://d9bp4nr5ye.feishu.cn/wiki/wikcnqTsEVMD74nV9W6IsmVHuxe\\n\\n上次我们整体的看了一下RocketMQ Consumer 的消费过程 RocketMQ之 Consumer，消费者消费原理解析，今天再来聚焦看一下 Consumer 是如何进行集群消费和广播消费的。\\n\\n先来说结论\\n\\n消费者注册的时候已经告知服务器自己是的消费模型（集群/广播）\\n消费者去拉取数据的时候由服务器判断是否可以拉到消息\\n\\n再来看问题\\n\\n消费者如何注册进去的呢？\\n第一个请求是如何来到的呢？\\nrebalanceService 是如何做负载的？\\n不同的 消费者最终执行任务的线程池是不是一个？\\n\\n一、开始\\n\\n没看过上一篇的小伙伴先看看之前的，这篇是上一篇的进阶版 Consumer，消费者消费原理解析\\n\\n每一个使用@RocketMQMessageListener 注解修饰的类，都会根据配置信息生成一个 DefaultRocketMQListenerContainer 消费开始就是从这个容器的 start() 方法开始。\\n\\n\\n二、消费者是如何注册到nameserver\\n\\n结论：通过心跳注册并实时更新的\\n\\nmQClientFactory.start() 中会开启一系列的定时任务，其中有一个就是定时任务\\n\\n\\nMQClientInstance.java\\npublic void start() throws MQClientException {\\n\\n    synchronized (this) {\\n        switch (this.serviceState) {\\n            case CREATE_JUST:\\n                // ... \\n                \\n                // 开启定时任务\\n                this.startScheduledTask();\\n                \\n                // ...\\n                break;\\n            case START_FAILED:\\n                throw new MQClientException(\\"The Factory object[\\" + this.getClientId() + \\"] has been created before, and failed.\\", null);\\n            default:\\n                break;\\n        }\\n    }\\n}\\n这里面的定时任务很多，更新nameserver地址、更新topic、更新offset 等\\n\\nprivate void startScheduledTask() {\\n   \\n    // ... \\n    \\n    // 定时发送心跳更新消费者信息\\n    this.scheduledExecutorService.scheduleAtFixedRate(new Runnable() {\\n\\n        @Override\\n        public void run() {\\n            try {\\n                MQClientInstance.this.cleanOfflineBroker();\\n                MQClientInstance.this.sendHeartbeatToAllBrokerWithLock();\\n            } catch (Exception e) {\\n                log.error(\\"ScheduledTask sendHeartbeatToAllBroker exception\\", e);\\n            }\\n        }\\n    }, 1000, this.clientConfig.getHeartbeatBrokerInterval(), TimeUnit.MILLISECONDS);\\n\\n    // ...\\n}\\n简化版 发送心跳操作\\n\\npublic void sendHeartbeatToAllBrokerWithLock() {\\n    this.sendHeartbeatToAllBroker();\\n}\\n\\n\\n\\nprivate void sendHeartbeatToAllBroker() {\\n    // 获取发送心跳的信息\\n    final HeartbeatData heartbeatData = this.prepareHeartbeatData();\\n    \\n\\n    if (!this.brokerAddrTable.isEmpty()) {\\n        // ... \\n        // 发送心跳\\n        int version = this.mQClientAPIImpl.sendHearbeat(addr, heartbeatData, clientConfig.getMqClientApiTimeout());\\n        // ...\\n    }\\n}\\n\\n\\nprivate HeartbeatData prepareHeartbeatData() {\\n    HeartbeatData heartbeatData = new HeartbeatData();\\n\\n    // clientID\\n    heartbeatData.setClientID(this.clientId);\\n\\n   \\n    // 每个消费者都会被注册到 consumerTable 里面，它是一个 ConcurrentMap\\n    for (Map.Entry<String, MQConsumerInner> entry : this.consumerTable.entrySet()) {\\n        MQConsumerInner impl = entry.getValue();\\n        if (impl != null) {\\n            // 获取消费者的信息\\n            ConsumerData consumerData = new ConsumerData();\\n            consumerData.setGroupName(impl.groupName());\\n            consumerData.setConsumeType(impl.consumeType());\\n            consumerData.setMessageModel(impl.messageModel());\\n            consumerData.setConsumeFromWhere(impl.consumeFromWhere());\\n            consumerData.getSubscriptionDataSet().addAll(impl.subscriptions());\\n            consumerData.setUnitMode(impl.isUnitMode());\\n\\n            heartbeatData.getConsumerDataSet().add(consumerData);\\n        }\\n    }\\n\\n    // Producer\\n    for (Map.Entry<String/* group */, MQProducerInner> entry : this.producerTable.entrySet()) {\\n        MQProducerInner impl = entry.getValue();\\n        if (impl != null) {\\n            ProducerData producerData = new ProducerData();\\n            producerData.setGroupName(entry.getKey());\\n\\n            heartbeatData.getProducerDataSet().add(producerData);\\n        }\\n    }\\n\\n    return heartbeatData;\\n}\\n\\nDefaultMQPushConsumerImpl.java\\nconsumerTable 的数据来源\\n\\npublic synchronized void start() throws MQClientException {\\n    switch (this.serviceState) {\\n        case CREATE_JUST:\\n          \\n            // ... \\n            // 注册消费者\\n            boolean registerOK = mQClientFactory.registerConsumer(this.defaultMQPushConsumer.getConsumerGroup(), this);\\n        \\n            // ... \\n            this.serviceState = ServiceState.RUNNING;\\n            break;\\n        case RUNNING:\\n        case START_FAILED:\\n        case SHUTDOWN_ALREADY:\\n            throw new MQClientException(\\"The PushConsumer service state not OK, maybe started once, \\"\\n                + this.serviceState\\n                + FAQUrl.suggestTodo(FAQUrl.CLIENT_SERVICE_NOT_OK),\\n                null);\\n        default:\\n            break;\\n    }\\n}\\n\\nprivate final ConcurrentMap<String/* group */, MQConsumerInner> consumerTable = new ConcurrentHashMap<String, MQConsumerInner>();\\n\\npublic synchronized boolean registerConsumer(final String group, final MQConsumerInner consumer) {\\n    if (null == group || null == consumer) {\\n        return false;\\n    }\\n    \\n    // putIfAbsent 方法如果设置值成功就返回 true，如果key已经存在了就返回当前 key对应的值\\n    MQConsumerInner prev = this.consumerTable.putIfAbsent(group, consumer);\\n    if (prev != null) {\\n        log.warn(\\"the consumer group[\\" + group + \\"] exist already.\\");\\n        return false;\\n    }\\n\\n    return true;\\n}\\n\\n三、第一个请求是如何来到的呢\\n\\n上一篇文章我们提到：每一个消费者都会开始一个死循环，一直从队列取数据进行消费，我们也知道每次任务完成都会把当前的这个请求存入队列构成一个循环请求，这样就会有个问题：第一次请求是怎么来的呢，其实是来自负载均衡。\\n\\n其实它是来自负载，它的负载就是：我们知道 topic是逻辑上面的分类，队列才是存储数据的实质，负载就是切换不同的队列去消费数据。（只有集群消费才有）\\n\\nMQClientInstance.java\\npublic void start() throws MQClientException {\\n\\n    synchronized (this) {\\n        switch (this.serviceState) {\\n            case CREATE_JUST:\\n                // ...\\n                \\n                // 开启负载均衡\\n                this.rebalanceService.start();\\n                \\n                // ...\\n                break;\\n            case START_FAILED:\\n                throw new MQClientException(\\"The Factory object[\\" + this.getClientId() + \\"] has been created before, and failed.\\", null);\\n            default:\\n                break;\\n        }\\n    }\\n}\\n\\nRebalanceService.java run()\\n\\n这里开启了一个死循环，只要线程不停止就会一直执行\\n@Override\\npublic void run() {\\n    log.info(this.getServiceName() + \\" service started\\");\\n\\n    while (!this.isStopped()) {\\n        this.waitForRunning(waitInterval);\\n        this.mqClientFactory.doRebalance();\\n    }\\n\\n    log.info(this.getServiceName() + \\" service end\\");\\n}\\n\\nMQClientInstance.java\\n上面我们已经知道每一个使用注解的类都会被注册成一个 DefaultMQPushConsumerImpl implements MQConsumerInner\\n\\npublic void doRebalance() {\\n    for (Map.Entry<String, MQConsumerInner> entry : this.consumerTable.entrySet()) {\\n        MQConsumerInner impl = entry.getValue();\\n        if (impl != null) {\\n            try {\\n                impl.doRebalance();\\n            } catch (Throwable e) {\\n                log.error(\\"doRebalance exception\\", e);\\n            }\\n        }\\n    }\\n}\\n\\nDefaultMQPushConsumerImpl.java\\n@Override\\npublic void doRebalance() {\\n    if (!this.pause) {\\n        this.rebalanceImpl.doRebalance(this.isConsumeOrderly());\\n    }\\n}\\n\\nRebalanceImpl.java\\npublic void doRebalance(final boolean isOrder) {\\n    Map<String, SubscriptionData> subTable = this.getSubscriptionInner();\\n    if (subTable != null) {\\n        for (final Map.Entry<String, SubscriptionData> entry : subTable.entrySet()) {\\n            final String topic = entry.getKey();\\n            try {\\n                this.rebalanceByTopic(topic, isOrder);\\n            } catch (Throwable e) {\\n                if (!topic.startsWith(MixAll.RETRY_GROUP_TOPIC_PREFIX)) {\\n                    log.warn(\\"rebalanceByTopic Exception\\", e);\\n                }\\n            }\\n        }\\n    }\\n\\n    this.truncateMessageQueueNotMyTopic();\\n}\\n\\n这里我们可以看到，不管是集群消费，还是广播消费 都会，获取当前 topic对应的队列信息，然后进行投递到队列中（集群消费的分配策略复杂一些，这里先注视掉，下面再做解释）\\n\\n\\nprivate void rebalanceByTopic(final String topic, final boolean isOrder) {\\n    switch (messageModel) {\\n        case BROADCASTING: {\\n            Set<MessageQueue> mqSet = this.topicSubscribeInfoTable.get(topic);\\n            if (mqSet != null) {\\n                boolean changed = this.updateProcessQueueTableInRebalance(topic, mqSet, isOrder);\\n                if (changed) {\\n                    this.messageQueueChanged(topic, mqSet, mqSet);\\n                    log.info(\\"messageQueueChanged {} {} {} {}\\",\\n                        consumerGroup,\\n                        topic,\\n                        mqSet,\\n                        mqSet);\\n                }\\n            } else {\\n                log.warn(\\"doRebalance, {}, but the topic[{}] not exist.\\", consumerGroup, topic);\\n            }\\n            break;\\n        }\\n        case CLUSTERING: {\\n             Set<MessageQueue> mqSet = this.topicSubscribeInfoTable.get(topic);\\n             // ...\\n\\n            boolean changed = this.updateProcessQueueTableInRebalance(topic, allocateResultSet, isOrder);\\n            if (changed) {\\n                log.info(\\n                    \\"rebalanced result changed. allocateMessageQueueStrategyName={}, group={}, topic={}, clientId={}, mqAllSize={}, cidAllSize={}, rebalanceResultSize={}, rebalanceResultSet={}\\",\\n                    strategy.getName(), consumerGroup, topic, this.mQClientFactory.getClientId(), mqSet.size(), cidAll.size(),\\n                    allocateResultSet.size(), allocateResultSet);\\n                this.messageQueueChanged(topic, mqSet, allocateResultSet);\\n            }\\n          \\n            break;\\n        }\\n        default:\\n            break;\\n    }\\n}\\n\\n这个方法会把每一个队列（MessageQueue）都组装成一个请求（PullRequest）\\n\\nprivate boolean updateProcessQueueTableInRebalance(final String topic, final Set<MessageQueue> mqSet,\\n    final boolean isOrder) {\\n    boolean changed = false;\\n\\n    // ...\\n    \\n    List<PullRequest> pullRequestList = new ArrayList<PullRequest>();\\n    for (MessageQueue mq : mqSet) {\\n        if (!this.processQueueTable.containsKey(mq)) {\\n            if (isOrder && !this.lock(mq)) {\\n                log.warn(\\"doRebalance, {}, add a new mq failed, {}, because lock failed\\", consumerGroup, mq);\\n                continue;\\n            }\\n\\n            this.removeDirtyOffset(mq);\\n            ProcessQueue pq = new ProcessQueue();\\n\\n            long nextOffset = -1L;\\n            try {\\n                nextOffset = this.computePullFromWhereWithException(mq);\\n            } catch (Exception e) {\\n                log.info(\\"doRebalance, {}, compute offset failed, {}\\", consumerGroup, mq);\\n                continue;\\n            }\\n\\n            if (nextOffset >= 0) {\\n                ProcessQueue pre = this.processQueueTable.putIfAbsent(mq, pq);\\n                if (pre != null) {\\n                    log.info(\\"doRebalance, {}, mq already exists, {}\\", consumerGroup, mq);\\n                } else {\\n                    log.info(\\"doRebalance, {}, add a new mq, {}\\", consumerGroup, mq);\\n                    PullRequest pullRequest = new PullRequest();\\n                    pullRequest.setConsumerGroup(consumerGroup);\\n                    pullRequest.setNextOffset(nextOffset);\\n                    pullRequest.setMessageQueue(mq);\\n                    pullRequest.setProcessQueue(pq);\\n                    pullRequestList.add(pullRequest);\\n                    changed = true;\\n                }\\n            } else {\\n                log.warn(\\"doRebalance, {}, add new mq failed, {}\\", consumerGroup, mq);\\n            }\\n        }\\n    }\\n\\n    this.dispatchPullRequest(pullRequestList);\\n\\n    return changed;\\n}\\n\\n调用这个方法把请求（PullRequest），添加到队列中去，由之前的死循环去拉取请求处理\\n\\n@Override\\npublic void dispatchPullRequest(List<PullRequest> pullRequestList) {\\n    for (PullRequest pullRequest : pullRequestList) {\\n        // 之前我们已经看过，这个 方法就会把任务添加到队列中去了\\n        this.defaultMQPushConsumerImpl.executePullRequestImmediately(pullRequest);\\n        log.info(\\"doRebalance, {}, add a new pull request {}\\", consumerGroup, pullRequest);\\n    }\\n}\\n\\n四、rebalanceService 是如何做负载的\\n\\n首先一个 topic 的消息，会投递到多个消息队列（这里我们假设是A、B、C三个队列），所谓的负载就是消费者按照某种策略分别从三（N）个列队依次消费。\\n\\n上面第一个请求中，我们已经知道负载的入口了，我们直接来看负载的核心方法\\norg.apache.rocketmq.client.impl.consumer.RebalanceImpl#rebalanceByTopic\\n\\nprivate void rebalanceByTopic(final String topic, final boolean isOrder) {\\n    switch (messageModel) {\\n        case BROADCASTING: {\\n             // ... 广播负载\\n             \\n        }\\n        case CLUSTERING: {\\n            // ... 集群负载\\n        \\n        }\\n    }\\n}\\n\\n广播消费\\ncase BROADCASTING: {\\n    // 获取当前topic的队列信息\\n    Set<MessageQueue> mqSet = this.topicSubscribeInfoTable.get(topic);\\n    if (mqSet != null) {\\n        boolean changed = this.updateProcessQueueTableInRebalance(topic, mqSet, isOrder);\\n        if (changed) {\\n            this.messageQueueChanged(topic, mqSet, mqSet);\\n            log.info(\\"messageQueueChanged {} {} {} {}\\",\\n                consumerGroup,\\n                topic,\\n                mqSet,\\n                mqSet);\\n        }\\n    } else {\\n        log.warn(\\"doRebalance, {}, but the topic[{}] not exist.\\", consumerGroup, topic);\\n    }\\n    break;\\n}\\n广播消费每个消费者是需要消费topic里面的每一个消息，所以就不存在什么负载了。\\n\\n\\nupdateProcessQueueTableInRebalance\\nupdateProcessQueueTableInRebalance 方法是用来对负载均衡结果进行处理的，这个方法是通用的。因为广播消费不存在负载均衡，所以直接处理结果。\\n\\nprivate boolean updateProcessQueueTableInRebalance(final String topic, final Set<MessageQueue> mqSet,\\n    final boolean isOrder) {\\n    boolean changed = false;\\n    // ... \\n    \\n    List<PullRequest> pullRequestList = new ArrayList<PullRequest>();\\n    for (MessageQueue mq : mqSet) {\\n        // 判断当前正在进行的队列中，没有此队列\\n        if (!this.processQueueTable.containsKey(mq)) {\\n            if (isOrder && !this.lock(mq)) {\\n                log.warn(\\"doRebalance, {}, add a new mq failed, {}, because lock failed\\", consumerGroup, mq);\\n                continue;\\n            }\\n            \\n            // 删除异常的队列\\n            this.removeDirtyOffset(mq);\\n            ProcessQueue pq = new ProcessQueue();\\n\\n            long nextOffset = -1L;\\n            try {\\n                nextOffset = this.computePullFromWhereWithException(mq);\\n            } catch (Exception e) {\\n                log.info(\\"doRebalance, {}, compute offset failed, {}\\", consumerGroup, mq);\\n                continue;\\n            }\\n\\n            if (nextOffset >= 0) {\\n                ProcessQueue pre = this.processQueueTable.putIfAbsent(mq, pq);\\n                if (pre != null) {\\n                    log.info(\\"doRebalance, {}, mq already exists, {}\\", consumerGroup, mq);\\n                } else {\\n                    // 组装消息请求，之前说到会有一个死循环不停的从队列中获取请求信息\\n                    log.info(\\"doRebalance, {}, add a new mq, {}\\", consumerGroup, mq);\\n                    PullRequest pullRequest = new PullRequest();\\n                    pullRequest.setConsumerGroup(consumerGroup);\\n                    pullRequest.setNextOffset(nextOffset);\\n                    pullRequest.setMessageQueue(mq);\\n                    pullRequest.setProcessQueue(pq);\\n                    pullRequestList.add(pullRequest);\\n                    changed = true;\\n                }\\n            } else {\\n                log.warn(\\"doRebalance, {}, add new mq failed, {}\\", consumerGroup, mq);\\n            }\\n        }\\n    }\\n\\n    // 这个方法就是把这些个请求信息放到之前所说的队列中去\\n    this.dispatchPullRequest(pullRequestList);\\n\\n    return changed;\\n}\\n\\n集群消费\\n\\n集群消费因为每个消息只保证给消费组中的某个消费者消费，所以才需要负载均衡。\\n\\n集群消费的负载均衡就是拿到全部的队列，和当前topic、consumerGroup下的全部消费者，再按照某种策略进行分发。\\n\\ncase CLUSTERING: {\\n    // 获取当前topic下的全部队列\\n    Set<MessageQueue> mqSet = this.topicSubscribeInfoTable.get(topic);\\n    \\n    // 获取当前topic和consumerGroup 下的全部消费者（会发起请求去服务端获取）\\n    List<String> cidAll = this.mQClientFactory.findConsumerIdList(topic, consumerGroup);\\n    \\n    // ... 省略参数校验\\n      \\n    if (mqSet != null && cidAll != null) {\\n        List<MessageQueue> mqAll = new ArrayList<MessageQueue>();\\n        mqAll.addAll(mqSet);\\n\\n        Collections.sort(mqAll);\\n        Collections.sort(cidAll);\\n        \\n        // 获取负载均衡的策略 默认是【AllocateMessageQueueAveragely】平均哈希队列算法\\n        AllocateMessageQueueStrategy strategy = this.allocateMessageQueueStrategy;\\n        List<MessageQueue> allocateResult = null;\\n        try {\\n            allocateResult = strategy.allocate(\\n                this.consumerGroup,\\n                this.mQClientFactory.getClientId(),\\n                mqAll,\\n                cidAll);\\n        } catch (Throwable e) {\\n            log.error(\\"AllocateMessageQueueStrategy.allocate Exception. allocateMessageQueueStrategyName={}\\", strategy.getName(),\\n                e);\\n            return;\\n        }\\n\\n        Set<MessageQueue> allocateResultSet = new HashSet<MessageQueue>();\\n        if (allocateResult != null) {\\n            allocateResultSet.addAll(allocateResult);\\n        }\\n        \\n        // 把策略返回的结果进行实践处理【上面已经说过了】\\n        boolean changed = this.updateProcessQueueTableInRebalance(topic, allocateResultSet, isOrder);\\n        if (changed) {\\n            log.info(\\n                \\"rebalanced result changed. allocateMessageQueueStrategyName={}, group={}, topic={}, clientId={}, mqAllSize={}, cidAllSize={}, rebalanceResultSize={}, rebalanceResultSet={}\\",\\n                strategy.getName(), consumerGroup, topic, this.mQClientFactory.getClientId(), mqSet.size(), cidAll.size(),\\n                allocateResultSet.size(), allocateResultSet);\\n            this.messageQueueChanged(topic, mqSet, allocateResultSet);\\n        }\\n    }\\n    break;\\n}\\n\\nAllocateMessageQueueAveragely\\n\\n想必你也和我一样好奇这个默认策略是怎么来的？？？\\n\\n默认策略是从当前对象中拿到的，当前对象是 RebalanceImpl AllocateMessageQueueStrategy strategy = this.allocateMessageQueueStrategy;\\n\\n再往上看持有 RebalanceImpl 对象的是 DefaultMQPushConsumerImpl 对象\\n\\n@Override\\npublic void doRebalance() {\\n    if (!this.pause) {\\n        this.rebalanceImpl.doRebalance(this.isConsumeOrderly());\\n    }\\n}\\n所以我们需要找到在创建DefaultMQPushConsumerImpl 对象的时候，它的创建在最开始解析 @RocketMQMessageListener的时候，可以看看上篇文章，这里只是把最终结果展示出来\\n\\nprivate void initRocketMQPushConsumer() throws MQClientException {\\n    // ...\\n    \\n    // 不管是下面哪种创建方式负载均衡策略的默认值都是 【AllocateMessageQueueAveragely】\\n    if (Objects.nonNull(rpcHook)) {\\n        consumer = new DefaultMQPushConsumer(consumerGroup, rpcHook, new AllocateMessageQueueAveragely(),\\n            enableMsgTrace, this.applicationContext.getEnvironment().\\n            resolveRequiredPlaceholders(this.rocketMQMessageListener.customizedTraceTopic()));\\n        consumer.setVipChannelEnabled(false);\\n    } else {\\n        log.debug(\\"Access-key or secret-key not configure in \\" + this + \\".\\");\\n        consumer = new DefaultMQPushConsumer(consumerGroup, enableMsgTrace,\\n            this.applicationContext.getEnvironment().\\n                resolveRequiredPlaceholders(this.rocketMQMessageListener.customizedTraceTopic()));\\n    }\\n    \\n    // ...\\n}\\n\\n五、不同的消费者最终执行任务的线程池是不是一个\\n\\n之所以产生这个疑问，是在想如果每个消费者都创建一个自己的线程池，那线程池不是很多么？（其实线程不多的话怎么做到高性能呢）\\n\\nDefaultMQPushConsumerImpl#start\\n创建线程池的起始点是 start 方法，代码片段如下：\\n\\npublic synchronized void start() throws MQClientException {\\n\\n    // ...\\n    \\n    if (this.getMessageListenerInner() instanceof MessageListenerOrderly) {\\n        this.consumeOrderly = true;\\n        this.consumeMessageService =\\n            new ConsumeMessageOrderlyService(this, (MessageListenerOrderly) this.getMessageListenerInner());\\n    } else if (this.getMessageListenerInner() instanceof MessageListenerConcurrently) {\\n        this.consumeOrderly = false;\\n        this.consumeMessageService =\\n            new ConsumeMessageConcurrentlyService(this, (MessageListenerConcurrently) this.getMessageListenerInner());\\n    }\\n    this.consumeMessageService.start();\\n    \\n    // ... \\n}\\n\\n并发消费走的是 ConsumeMessageConcurrentlyService\\n\\npublic ConsumeMessageConcurrentlyService(DefaultMQPushConsumerImpl defaultMQPushConsumerImpl,\\n    MessageListenerConcurrently messageListener) {\\n    // ...\\n    // 总是new创建的线程池\\n    this.consumeExecutor = new ThreadPoolExecutor(\\n        this.defaultMQPushConsumer.getConsumeThreadMin(),\\n        this.defaultMQPushConsumer.getConsumeThreadMax(),\\n        1000 * 60,\\n        TimeUnit.MILLISECONDS,\\n        this.consumeRequestQueue,\\n        new ThreadFactoryImpl(consumeThreadPrefix));\\n\\n   // ...\\n}\\n\\n通过new的方式创建基本就确定了是单独的线程池，如果还想继续确定可以打断点看对象的地址（事实证明是不一样的）\\n\\n\\n参考文献\\n\\nhttps://cloud.tencent.com/developer/article/2045909\\n语法说明\\n标题文本样式列表图片链接目录代码片表格注脚注释自定义列表LaTeX 数学公式插入甘特图插入UML图插入Mermaid流程图插入Flowchart流程图插入类图快捷键\\n标题复制\\n\\n# 一级标题\\n## 二级标题\\n### 三级标题\\n#### 四级标题\\n##### 五级标题\\n###### 六级标题\\nMarkdown 14815 字数 715 行数 当前行 1, 当前列 0HTML 14192 字数 475 段落读完需要20分钟\\n发布博文获得大额流量券 -->"}');export{c as comp,p as data};
