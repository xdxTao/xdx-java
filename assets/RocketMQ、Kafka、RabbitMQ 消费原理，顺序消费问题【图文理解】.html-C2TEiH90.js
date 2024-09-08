import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as r,a,w as i,b as s,e as o,r as l,o as c,f as t}from"./app-8V5nO28f.js";const p="/assets/05_7-DwSZsgOH.png",u="/assets/05_8-CKmP35_w.png",h="/assets/05_9-DdY5rgAf.png",d="/assets/05_10-D-4zB3v2.png",k="/assets/05_11-C_m-Srq3.png",b={},m=s('<p><a href="https://www.bilibili.com/video/BV1Mu4m1G7We" target="_blank" rel="noopener noreferrer">B站视频地址</a></p><p><br><br></p><br><h1 id="一、开始" tabindex="-1"><a class="header-anchor" href="#一、开始"><span>一、开始</span></a></h1><br><blockquote><p>先来定义一下何为顺序消息，比如有A、B两条消息，消息处理的流程是 1、2、3 ... 10，只有当A消息执行10完毕后，B消息才可以进行1流程。<br> 注：如果A执行到7，B开始执行1，这其实不一定是顺序消息，因为各种原因最终可能导致B先执行完10。</p></blockquote><br><p>目前比较流行的队列：RocketMQ、RabbitMQ、Kafka</p><ul><li>RocketMQ 消息发送到 topic，再到topic关联的 queue</li><li>RabbitMQ 消息发送到 exchange，再由exchange通过规则到 queue</li><li>Kafka 消息发送到 topic，再到topic关联的 partitions （partitions可以理解就是一个queue）</li></ul><p>基于消息队列的规则，想要达到我们的目标就要求A、B两个消息先后发送到同一个 queue/partitions，且只能有一个消费者，且消费的时候必须是单线程非异步的才可满足。</p><br><h1 id="二、结果" tabindex="-1"><a class="header-anchor" href="#二、结果"><span>二、结果</span></a></h1><br><p>三种MQ都支持消息发送到指定的 queue/partition，简单来说就是基于一个标识去计算看它应该落在哪个queue/partition，同一批顺序消息的标识是一样的，所以最终进入的queue/partition也是一致的。 进入 queue/partition 之后的消息都是顺序的，它们是 FIFO的。</p><p>顺序消息的控制主要是在消费端，那问题就变成了2个</p><ol><li>queue/partition 和消费者之间是如何对应的</li><li>消费者对同一个 queue/partition 的消息，是多线程还是单线程</li></ol><br><p>只有满足一个queue/partition 只能对应一个消费者，一个消费者对于一个queue/partition 是单线程消费的，才可以做到消费顺序。</p><br>',19),_=o("br",null,null,-1),g=s('<br><h2 id="_1、rocketmq-消费关系图" tabindex="-1"><a class="header-anchor" href="#_1、rocketmq-消费关系图"><span>1、RocketMQ 消费关系图</span></a></h2><br><h3 id="_1-1、queue和consumer的关系" tabindex="-1"><a class="header-anchor" href="#_1-1、queue和consumer的关系"><span>1-1、queue和consumer的关系</span></a></h3><br><figure><img src="'+p+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><p>从上面的图可以看到，一个queue最多只能对一个 consumer，如果某个 topic需要更大的并发，那就需要，那就增加 queue，然后增加 consumer</p><br><h3 id="_1-2、consumer-和线程的关系" tabindex="-1"><a class="header-anchor" href="#_1-2、consumer-和线程的关系"><span>1-2、consumer 和线程的关系</span></a></h3><br><p>正常使用SpringBoot开发项目的时候，都是引入 rocketmq-spring-boot-starter，然后用 @RocketMQMessageListener 来做消费处理，所以下面图也是基于这个用法来画的</p><figure><img src="'+u+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><p>通过这个图可以看到使用 @RocketMQMessageListener 做消费者的时候，本质上消息是被多线程去消费了，那就存在A、B消息的真正处理顺序不一致了。</p><br>',16),f=s(`<br><p>设置顺序消费的代码</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">RocketMQMessageListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">        topic</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;Topic1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> </span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">        consumerGroup</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;springboot3_producer_group&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> </span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">        consumeMode</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> ConsumeMode</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">ORDERLY</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h2 id="_2、kafka-消费关系图" tabindex="-1"><a class="header-anchor" href="#_2、kafka-消费关系图"><span>2、Kafka 消费关系图</span></a></h2><br><p>Kafka 里面没有queue的概念，转而用partitions，但其本质上queue和partitions是一样的，就把它理解成一个queue完事</p><br><h3 id="_1-1、partitions和consumer的关系" tabindex="-1"><a class="header-anchor" href="#_1-1、partitions和consumer的关系"><span>1-1、partitions和consumer的关系</span></a></h3><br><p>partitions 和 consumer的关系和 RocketMQ的一模一样，只是把queue改为partitions即可，就不画了</p><br><h3 id="_1-2、consumer-和线程的关系-1" tabindex="-1"><a class="header-anchor" href="#_1-2、consumer-和线程的关系-1"><span>1-2、consumer 和线程的关系</span></a></h3><br><figure><img src="`+h+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><ol><li>Kafa消费消息的时候是主动去拉，拉到了就去消费，消费完了，再去拉。 拉和消费的线程是一个</li><li>当自定义线程数大于 partitions 的时候，没用，这个没用的意思是 Kafka压根不会创建比分配给自己 partitions 数量更多的线程</li><li>添加消费者的时候，会自平衡（这点所有的MQ都一样的）</li><li>默认如果没有给consumer设置线程数的话，是单线程</li></ol><br>',18),B=s('<br><h2 id="_3、rabbitmq-消费关系图" tabindex="-1"><a class="header-anchor" href="#_3、rabbitmq-消费关系图"><span>3、RabbitMQ 消费关系图</span></a></h2><br><h3 id="_1-1、queue和consumer的关系-1" tabindex="-1"><a class="header-anchor" href="#_1-1、queue和consumer的关系-1"><span>1-1、queue和consumer的关系</span></a></h3><br><figure><img src="'+d+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><ol><li>RabbitMQ新增了exchange（交换机）的概念，所有的数据都是先发送到交换机，再由exchange基于规则下发到具体的queue</li><li>可以通过设置交换机的类型的，让消息投递到一个或多个 queue</li><li>广播消息：可以设置exchange类型为fanout，这样消息就会投递到所有与之绑定的queue（前提是没有设置特殊的 routingkey）</li><li>集群消费：可以设置多个 consumer去消费一个queue，或一个消费者设置多线程去消费，以此来增加消费速率</li></ol>',8),E=s('<br><h3 id="_1-2、consumer-和线程的关系-2" tabindex="-1"><a class="header-anchor" href="#_1-2、consumer-和线程的关系-2"><span>1-2、consumer 和线程的关系</span></a></h3><br><figure><img src="'+k+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><ol><li>RabbitMQ默认也是一个线程消费</li><li>当开启了多个线程的时候，消息最终顺序就可能不一致，因为各个线程之间其实是相互独立的</li></ol><br><h2 id="_4、总结" tabindex="-1"><a class="header-anchor" href="#_4、总结"><span>4、总结</span></a></h2><br><p>从上述结果来看其实三种队列都是支持顺序消息的（前提消息都发送到一个 queue/partitions），但支持的程度和结果不同</p><ol><li>RocketMQ，一个queue只能有一个consumer，消费者是多线程的，但开启顺序消费的时候，会对 queue加锁从而保证顺序</li><li>Kafka，一个 partitions只能由一个consumer的一个线程去消费，基于单线程就保证了顺序性</li><li>RabbitMQ，queue和consumer是多对多的，consumer的多个线程是独立的，要想保证顺序，只能让一个queue只有一个consumer，且consumer只有一个线程（但这样做效率就很低）</li></ol><br><h1 id="三、实践" tabindex="-1"><a class="header-anchor" href="#三、实践"><span>三、实践</span></a></h1><br><h2 id="_1、全局有序" tabindex="-1"><a class="header-anchor" href="#_1、全局有序"><span>1、全局有序</span></a></h2><br><p>基于上述分析，三种MQ都可以做到全局有序，因为一旦要求全局有序，消费者就必须是单线程消费。</p><br><h2 id="_2、局部有序" tabindex="-1"><a class="header-anchor" href="#_2、局部有序"><span>2、局部有序</span></a></h2><br><p>比如用户订单业务，对于不同的用户它们的消费顺序可以不用关注，但是对于同一个用户的消息必须是严格有序的（简单的如先下单、再支付）。</p><p>对于这种场景RabbitMQ基本上就不满足的，它只有一个队列，如果消费者是单线程的会阻塞其它的消息，一定会造成消息积压。</p><p>RocketMQ和Kafka在发送消息的时候都可以指定一个queue/partitions（发消息的时候指定一个key，通过key的hash找一个queue，相同的key得到的就是同一个queue）。</p><ol><li>RocketMQ 通过顺序消息对queue加锁变成单线程消费</li><li>Kafka 的每一个partitions 就只有一个线程去消费</li></ol><p>消息可能重复消费这个和顺序消息没关系，所以在写消费逻辑的时候应该做幂等。</p>',25);function M(q,Q){const e=l("font");return c(),r("div",null,[m,a(e,{color:"red"},{default:i(()=>[t("注：MQ有集群消费和广播消费，顺序消费肯定是建立在集群消费模式下的。")]),_:1}),_,a(e,{color:"green"},{default:i(()=>[t("最终结果：RocketMQ和Kafka是支持顺序消息的，RabbitMQ不支持顺序消息。")]),_:1}),g,a(e,{color:"green"},{default:i(()=>[t("RocketMQ的解决办法是，当你设置消费为顺序消费的时候，在消息处理的时候它会基于 queue加锁，这样就只能单线程处理这个queue的消息了。")]),_:1}),f,a(e,{color:"green"},{default:i(()=>[t("Kafka的解决办法是，每一个 partitions 最多只有一个线程来消费它，单线程自然就是顺序消费的咯。")]),_:1}),B,a(e,{color:"red"},{default:i(()=>[t("注：RabbitMQ的queue和consumer是可以设置为多对多的关系")]),_:1}),E])}const A=n(b,[["render",M],["__file","RocketMQ、Kafka、RabbitMQ 消费原理，顺序消费问题【图文理解】.html.vue"]]),v=JSON.parse('{"path":"/05%E6%B6%88%E6%81%AF%E9%98%9F%E5%88%97/RocketMQ%E3%80%81Kafka%E3%80%81RabbitMQ%20%E6%B6%88%E8%B4%B9%E5%8E%9F%E7%90%86%EF%BC%8C%E9%A1%BA%E5%BA%8F%E6%B6%88%E8%B4%B9%E9%97%AE%E9%A2%98%E3%80%90%E5%9B%BE%E6%96%87%E7%90%86%E8%A7%A3%E3%80%91.html","title":"【中】RocketMQ、Kafka、RabbitMQ 消费原理，顺序消费问题【图文理解】","lang":"zh-CN","frontmatter":{"title":"【中】RocketMQ、Kafka、RabbitMQ 消费原理，顺序消费问题【图文理解】","shortTitle":"【中】RocketMQ、Kafka、RabbitMQ 消费原理，顺序消费问题","index":true,"date":"2024-03-10T14:57:45.000Z","category":["中级","视频讲解"],"tag":["RocketMQ","Kafka","RabbitMQ","顺序消息"],"description":"B站视频地址 一、开始 先来定义一下何为顺序消息，比如有A、B两条消息，消息处理的流程是 1、2、3 ... 10，只有当A消息执行10完毕后，B消息才可以进行1流程。 注：如果A执行到7，B开始执行1，这其实不一定是顺序消息，因为各种原因最终可能导致B先执行完10。 目前比较流行的队列：RocketMQ、RabbitMQ、Kafka RocketMQ...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/05%E6%B6%88%E6%81%AF%E9%98%9F%E5%88%97/RocketMQ%E3%80%81Kafka%E3%80%81RabbitMQ%20%E6%B6%88%E8%B4%B9%E5%8E%9F%E7%90%86%EF%BC%8C%E9%A1%BA%E5%BA%8F%E6%B6%88%E8%B4%B9%E9%97%AE%E9%A2%98%E3%80%90%E5%9B%BE%E6%96%87%E7%90%86%E8%A7%A3%E3%80%91.html"}],["meta",{"property":"og:site_name","content":"小道仙Java笔记"}],["meta",{"property":"og:title","content":"【中】RocketMQ、Kafka、RabbitMQ 消费原理，顺序消费问题【图文理解】"}],["meta",{"property":"og:description","content":"B站视频地址 一、开始 先来定义一下何为顺序消息，比如有A、B两条消息，消息处理的流程是 1、2、3 ... 10，只有当A消息执行10完毕后，B消息才可以进行1流程。 注：如果A执行到7，B开始执行1，这其实不一定是顺序消息，因为各种原因最终可能导致B先执行完10。 目前比较流行的队列：RocketMQ、RabbitMQ、Kafka RocketMQ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-08-28T12:55:56.000Z"}],["meta",{"property":"article:author","content":"小道仙97"}],["meta",{"property":"article:tag","content":"RocketMQ"}],["meta",{"property":"article:tag","content":"Kafka"}],["meta",{"property":"article:tag","content":"RabbitMQ"}],["meta",{"property":"article:tag","content":"顺序消息"}],["meta",{"property":"article:published_time","content":"2024-03-10T14:57:45.000Z"}],["meta",{"property":"article:modified_time","content":"2024-08-28T12:55:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"【中】RocketMQ、Kafka、RabbitMQ 消费原理，顺序消费问题【图文理解】\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-03-10T14:57:45.000Z\\",\\"dateModified\\":\\"2024-08-28T12:55:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小道仙97\\",\\"url\\":\\"https://java.xdx97.com\\"}]}"]]},"headers":[{"level":2,"title":"1、RocketMQ 消费关系图","slug":"_1、rocketmq-消费关系图","link":"#_1、rocketmq-消费关系图","children":[{"level":3,"title":"1-1、queue和consumer的关系","slug":"_1-1、queue和consumer的关系","link":"#_1-1、queue和consumer的关系","children":[]},{"level":3,"title":"1-2、consumer 和线程的关系","slug":"_1-2、consumer-和线程的关系","link":"#_1-2、consumer-和线程的关系","children":[]}]},{"level":2,"title":"2、Kafka 消费关系图","slug":"_2、kafka-消费关系图","link":"#_2、kafka-消费关系图","children":[{"level":3,"title":"1-1、partitions和consumer的关系","slug":"_1-1、partitions和consumer的关系","link":"#_1-1、partitions和consumer的关系","children":[]},{"level":3,"title":"1-2、consumer 和线程的关系","slug":"_1-2、consumer-和线程的关系-1","link":"#_1-2、consumer-和线程的关系-1","children":[]}]},{"level":2,"title":"3、RabbitMQ 消费关系图","slug":"_3、rabbitmq-消费关系图","link":"#_3、rabbitmq-消费关系图","children":[{"level":3,"title":"1-1、queue和consumer的关系","slug":"_1-1、queue和consumer的关系-1","link":"#_1-1、queue和consumer的关系-1","children":[]},{"level":3,"title":"1-2、consumer 和线程的关系","slug":"_1-2、consumer-和线程的关系-2","link":"#_1-2、consumer-和线程的关系-2","children":[]}]},{"level":2,"title":"4、总结","slug":"_4、总结","link":"#_4、总结","children":[]},{"level":2,"title":"1、全局有序","slug":"_1、全局有序","link":"#_1、全局有序","children":[]},{"level":2,"title":"2、局部有序","slug":"_2、局部有序","link":"#_2、局部有序","children":[]}],"git":{"createdTime":1721478655000,"updatedTime":1724849756000,"contributors":[{"name":"ziyangtao","email":"ziyangtao@distinctclinic.com","commits":2}]},"readingTime":{"minutes":6.12,"words":1837},"filePathRelative":"05消息队列/RocketMQ、Kafka、RabbitMQ 消费原理，顺序消费问题【图文理解】.md","localizedDate":"2024年3月10日","excerpt":"<p><a href=\\"https://www.bilibili.com/video/BV1Mu4m1G7We\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">B站视频地址</a></p>\\n<p><br><br></p>\\n<br>\\n<h1>一、开始</h1>\\n<br>\\n<blockquote>\\n<p>先来定义一下何为顺序消息，比如有A、B两条消息，消息处理的流程是 1、2、3 ... 10，只有当A消息执行10完毕后，B消息才可以进行1流程。<br>\\n注：如果A执行到7，B开始执行1，这其实不一定是顺序消息，因为各种原因最终可能导致B先执行完10。</p>\\n</blockquote>","autoDesc":true}');export{A as comp,v as data};
