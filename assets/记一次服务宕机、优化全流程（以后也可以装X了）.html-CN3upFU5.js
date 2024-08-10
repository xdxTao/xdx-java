import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,a as e,d as a,f as i,o as l,r as p}from"./app-DTFy3zAf.js";const r="/assets/06_4-CUI-By_o.png",h="/assets/06_5-Ld-SjEaj.png",o="/assets/06_6-DSQ4i1dM.png",d="/assets/06_7-zVxIQYwA.png",c="/assets/06_8-CzVV9npy.png",g="/assets/06_9-o8v1Jx1X.png",_="/assets/06_10-BN5Xqjio.png",k="/assets/06_11-jDQ5OR7t.png",b="/assets/06_12-CWjg5Rk5.png",m="/assets/06_13-C7FuRylb.png",u="/assets/06_14-Dan73Y-I.png",f="/assets/06_15-BAvK3OB_.png",y="/assets/06_16-wWuBWNqi.png",B="/assets/06_17-DUMTsBW_.png",v="/assets/06_18-BCYbwY07.png",x="/assets/06_19-CdaGtOBq.png",E="/assets/06_20-7j9w3Djr.png",A="/assets/06_21-PC82XW0q.png",w="/assets/06_22-DUdXQiTI.png",D="/assets/06_23-BemQPiFi.png",C="/assets/06_24-DqUI1g61.png",z="/assets/06_25-CFgr3p6g.png",F="/assets/06_26-CZjtk30g.png",q="/assets/06_27-DB_saiw-.png",S={},X=a('<br><p>视频地址： <a href="https://www.bilibili.com/video/BV1924y1y7jN" target="_blank" rel="noopener noreferrer">https://www.bilibili.com/video/BV1924y1y7jN</a></p><br><blockquote><p>221115上午10点的时候客户反应进入小程序慢，打开监控发现服务pv已经超过了历史之最（印象中最高的是100w），这次到了400w。原因是因为推广了一个发红包的活动。</p></blockquote><h2 id="数据体现" tabindex="-1"><a class="header-anchor" href="#数据体现"><span>数据体现</span></a></h2><p>最终pv峰值达到了 400w/小时，5分钟峰值 60w， 1分钟峰值 12w，单个服务1分钟峰值 4.6w</p><figure><img src="'+r+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><br><h3 id="整体数据面板" tabindex="-1"><a class="header-anchor" href="#整体数据面板"><span>整体数据面板</span></a></h3><figure><img src="'+h+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><br><h3 id="接口访问排行榜" tabindex="-1"><a class="header-anchor" href="#接口访问排行榜"><span>接口访问排行榜</span></a></h3><figure><img src="'+o+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><br><h3 id="一分钟峰值" tabindex="-1"><a class="header-anchor" href="#一分钟峰值"><span>一分钟峰值</span></a></h3><figure><img src="'+d+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><br><h3 id="一分钟-exhibition峰值" tabindex="-1"><a class="header-anchor" href="#一分钟-exhibition峰值"><span>一分钟 exhibition峰值</span></a></h3><figure><img src="'+c+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><br><h3 id="exhibition-承受的压力" tabindex="-1"><a class="header-anchor" href="#exhibition-承受的压力"><span>exhibition 承受的压力</span></a></h3><br><p>一天整体的访问量是 1377w， exhibition 510w</p><figure><img src="'+g+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="'+_+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><br><h2 id="问题现象" tabindex="-1"><a class="header-anchor" href="#问题现象"><span>问题现象</span></a></h2><p>我们后台大概有50多个服务，其实有一个服务是 exhibition，承载了C端用户的主要访问量，exhibition 服务一直重启，我们把节点从 12个扩容到28个依旧扛不住压力。</p><p>其它服务的 pod都是看似正常的，exhibition 服务的表象是 pod一直在重启。</p><br><h2 id="问题排查" tabindex="-1"><a class="header-anchor" href="#问题排查"><span>问题排查</span></a></h2><h3 id="_1、排查所有其它服务" tabindex="-1"><a class="header-anchor" href="#_1、排查所有其它服务"><span>1、排查所有其它服务</span></a></h3><p>主要是用来判断下游服务是否已经宕机了，其它服务的 pod都是正常，也没有重启，然后就跳过这项。</p><figure><img src="'+k+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><br><h3 id="_2、排查压力原因" tabindex="-1"><a class="header-anchor" href="#_2、排查压力原因"><span>2、排查压力原因</span></a></h3><p>我们使用的是阿里云的数据库，有很好的监控，查看数据库的压力都很小，cpu 在50%的样子，然后我就把 pod节点从 12、16、20、28， 但是用依旧扛不住。</p><br><h3 id="_3、热点接口问题排查" tabindex="-1"><a class="header-anchor" href="#_3、热点接口问题排查"><span>3、热点接口问题排查</span></a></h3><p>请求最多的接口是 <code>/information</code> 接口,平均响应时间到了 8s+， 仔细看了这个接口却发现也没法优化，因为在正常的时候，它是没问题的，下面是前天和今天的数据 接口平均时间都是在 0.3s 以下</p><figure><img src="'+b+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="'+m+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><br><h3 id="_4、连接池排查" tabindex="-1"><a class="header-anchor" href="#_4、连接池排查"><span>4、连接池排查</span></a></h3><p>我们的服务里面配置了 256个工作线程，但是数据库连接池里面的只配置了50，遂即调到了 200，但是用依旧扛不住。 （ps：这时候的数据库也没有达到顶峰）</p><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">server</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:     </span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">  undertow</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:    </span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">    io-threads</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">16</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    </span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">    worker-threads</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">256</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,46),M=i("h3",{id:"_5、结果",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#_5、结果"},[i("span",null,"5、结果")])],-1),N=i("p",null,"到了 13.40的时候流量慢慢下来了，这个时候服务也就恢复了正常，但这不是结束，客户说周四的晚上还会推一波流量，所以就有了我们下面的优化。",-1),j=i("p",null,"另外可能很多人第一反应就是限流，我们也做了，如果不限流一个 pod都起不来，以前对于限流也没有什么思考，现在觉得：限流的第一步是要考虑你的系统最大并发量，不然限流就是个借口。",-1),T=i("p",null,"exhibition 服务在1.5w/min 的时候就开始挂机，顶峰4.5w， 或许我们的服务达不到4.5w，但绝对不会是1.5w。",-1),Q=a('<h2 id="总结-系统优化" tabindex="-1"><a class="header-anchor" href="#总结-系统优化"><span>总结：系统优化</span></a></h2><p>其实很简单，承受大部分流程的就是这个 exhibition 服务，我们要保证它的可用性，要找到它短板，并准备好限流策略。</p><p>下面是阿里云的 EDAS全链路追踪工具，通过这个工具，我们可以看到一次请求的全链路，每一个步骤的耗时</p><figure><img src="'+u+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="'+f+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>优化的手段主要是</p><ol><li>通过 EADS 去找热点接口超时的数据，分析超时的原因</li><li>去看异常采集服务都抛出了些什么异常</li><li>脑子思考</li></ol>',7),R=a('<h3 id="_1、慢sql" tabindex="-1"><a class="header-anchor" href="#_1、慢sql"><span>1、慢SQL</span></a></h3><p>慢sql一定是要优化的，这是致命的，并发一大将会全部阻塞。在这之前我们已经做过一轮的慢sql的优化了，并且复杂的查询都已经迁移到 ADB大数据库里面了。</p><p>因为是使用阿里云的数据库，所以可以直接查看哪些是慢sql，简单的sql它可以直接给出优化。</p><figure><img src="'+y+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="'+B+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><br><h3 id="_2、热点接口优化" tabindex="-1"><a class="header-anchor" href="#_2、热点接口优化"><span>2、热点接口优化</span></a></h3><p>上面说到我们的热点接口是 information 接口，正常情况它是没什么性能问题的，但也经不住调用次数那么多。</p><p>ps：热点接口一定一定不能是慢sql，不然就死定了，这个接口我们优化过，所以不属于慢接口。</p><p><strong>解决办法：</strong></p><ol><li>从业务出发让前端做本地缓存，减少调用的次数。</li></ol><br><h3 id="_3、下游服务超时" tabindex="-1"><a class="header-anchor" href="#_3、下游服务超时"><span>3、下游服务超时</span></a></h3><p>通过观察日志、EDAS分析，我们发现有很多的下游服务宕机了</p><ol><li>基础SDK，我们有基于单表的增删改查SDK</li><li>错误采集服务</li><li>飞书通知</li></ol><p>日志中可以看到很多调用这三个服务超时的问题，但是我们也检查过我们的基础SDK和错误采集服务，为什么没发现呢？</p><p>基础SDK和错误采集服务都是些基础的新增查询操作，它们的pod节点很少，但是服务也没有挂，所以我们检查 pod的时候发现它们都是正常运行，并且没有重启。</p><p>原因很简单，它们的工作线程都已经满了，新来的任务都进去了队列等待，队列满了就会拒绝，但是在队列中的请求就会耗时很长，甚至超时，而我们的exhibition服务一直在等它们返回就造成线程阻塞。</p><p>基础SDK和错误采集服务不会宕机的原因是因为它是正常工作的，没有内存不足，只是排队工作而言。</p><p>exhibition 服务宕机的原因，是因为我们配置了存活检测机制，当连续3次请求服务都得不到结果的时候就会重启，而我们256个工作线程都在工作或者阻塞了，没有线程来处理我们的存活检测，导致存活不过就被重启了。</p><figure><img src="'+v+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>至于飞书通知就没什么好说了，第三方的工具，一样的先进入队列，然后开始拒绝，队列的就阻塞了。</p><p><strong>解决办法：</strong></p><ol><li>下游服务也跟着扩容，并加上存活检测，及时发现瓶颈</li><li>去掉飞书通知</li></ol><br><h3 id="_4、内部服务调用整改" tabindex="-1"><a class="header-anchor" href="#_4、内部服务调用整改"><span>4、内部服务调用整改</span></a></h3><p>服务多了，内部之间的调用也会很多，大多数人都会选择使用 域名的方式去调用，但这样其实会走一遍外网会耗时更多也可能被防火墙拦截，而昨天通过 域名调用的次数有 43w</p><figure><img src="'+x+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>解决办法：</strong></p><ol><li>统一改成 k8s内部端点 访问</li></ol><br><h3 id="_5、连接池" tabindex="-1"><a class="header-anchor" href="#_5、连接池"><span>5、连接池</span></a></h3><p>之前我们的MySQL连接池配置的是 50，但是服务的工作线程是256，也匹配把MySQL的连接池配置到 200。</p><p>Redis 连接池，之前redis连接池也是50个，现在也改成了200，线上redis支持的连接数是2w个。</p><h3 id="_6、redis-慢日志" tabindex="-1"><a class="header-anchor" href="#_6、redis-慢日志"><span>6、Redis 慢日志</span></a></h3><p>Redis也是使用的阿里云的，发现也会有不少的慢日志，如果是发生在高并发的时候也是致命的，查看了发现是因为一个操作使用 keys 命令，全表扫描了。</p><figure><img src="'+E+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>解决办法：</strong></p><ol><li>找到具体的地方，去掉这个操作，设置过期时间不去使用 keys 命令</li></ol><br><h3 id="_7、内部接口逻辑处理慢" tabindex="-1"><a class="header-anchor" href="#_7、内部接口逻辑处理慢"><span>7、内部接口逻辑处理慢</span></a></h3><p>有一个给用户发消息的接口，这是一个个循环消息推送，需要组装数据和调用第三方接口</p><p>解决办法： 接口做成异步去调用，设置单独的一个线程池，并且设置好线程数、拒绝策略、阻塞队列的大小</p><br><h3 id="n、接口限流" tabindex="-1"><a class="header-anchor" href="#n、接口限流"><span>N、接口限流</span></a></h3><p>除了做优化本身我们也做了限流策略，用来做兜底。</p><p>N-1、基于城市限流 我们有 550w的 openId，其中有手机号的有289w，通过阿里云的归属地查询接口把这289w的数据全部洗到一张表里面，策略就是 保新弃旧</p><figure><img src="'+A+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>status = 1 就标识限制不能请求，这时候我们会返回http状态为 401，前端接收到了就会给一个友好的提示。</p><p>限流的代码也很简单，就是写一个过滤器 （比拦截器好，从过滤器到拦截器这中间要做很多事情，没必要）</p><figure><img src="'+w+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>这里其实还有2个问题</strong></p><ul><li>这个查询的SQL性能如何</li><li>限流策略如何精确</li></ul><p>当我创建完这张表的时候，我查询了一下这个SQL，耗时在 60-80ms 之间</p><div class="language-sql line-numbers-mode" data-highlighter="shiki" data-ext="sql" data-title="sql" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">SELECT</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> open_id  </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> im_region_limit_rule </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">WHERE</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> open_id </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;oTfJO5XKWeMfwOGzsJeU6DcBBBUY&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> AND</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> status</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 1</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>对于将近300w的数据表来说，好像也还不错了？（已经创建了 openId + status 的联合索引，并且不需要回表，执行分析也是 row = 1），但在高并发情况依旧是不行，后面尝试了很多的策略都不行，</p><ul><li>比如修改索引为 hash</li><li>修改引擎为 MyISAM</li></ul><p>最后没办法上到线上一看，平均耗时当在 2ms 左右，所有猜想 Navicat 这类的工具主要是耗时在了创建和释放连接上了，而我们的代码是有连接池的</p><figure><img src="'+D+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>这样简单推算一下，我们数据库16核的，2个节点，工作线程有 64个 <br></p><div class="language-sql line-numbers-mode" data-highlighter="shiki" data-ext="sql" data-title="sql" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> ms</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">次 </span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> 64线程 </span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">*</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 500</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> 64000次</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">秒</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>表很简单，限流策略也很简单，但是如果你的服务被击溃了，你的脑子将是混沌的，思考能力急速下降，流量是花钱投放来了，这时候的时间就等于金钱了，为了最高效的解决问题，其实我们应该提前去把限流的脚本写好，到时候按照批次执行就好了，这里我准备了三个SQL</p><ol><li>有的手机号是异常手机号查询不到归属地的，第一步限流 —— 26w</li><li>越秀在全国25个城市有楼盘，限流掉非这25个城市的手机号 —— 134w</li><li>越秀的总部在广州，我们在深圳，限流掉非这两个城市的数据 —— 214w</li></ol>',63),V=a(`<h3 id="n-2、基于ip限流" tabindex="-1"><a class="header-anchor" href="#n-2、基于ip限流"><span>N-2、基于ip限流</span></a></h3><p>第一步是上面的城市限流，如果第一步还是扛不住的话，那就需要第二步了。</p><p>原理差不多，也是把访问的ip、访问次数、访问地域存到一个表里面去，每分钟异步更新一下数据，然后去实时查询</p><ol><li>先是限流非 25个楼盘的城市ip</li><li>再是限流非广州和深圳的ip</li><li>限流深圳访问大的ip</li><li>限流广州访问量小的 ip （为什么呢？因为越秀总部在广州，大的访问量应该在他们那里，如果他们领导打不开，那就完蛋）</li></ol><p>虽然策略差不多，但是这里的实现思路变了，变得更有趣了，不再是代码侵入式了。</p><p>k8s里面有个组件是 路由Ingress， 你可以在你需要限流的服务里面配置一个 annotations ，让它在访问你的服务时候先去访问 B服务，通过B服务的结果来判断是否要访问你的服务。 并且它可以实时修改，实时生效，支持传参，可以实现不同的策略替换，上面的基于城市的限流，也可以放到这个里面了。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>metadata:</span></span>
<span class="line"><span>  annotations:</span></span>
<span class="line"><span>    nginx.ingress.kubernetes.io/auth-url: &gt;-</span></span>
<span class="line"><span>      http://XXXXXXXX:8000/mirror/rate/limit?limitType=user</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),L=a('<h2 id="m、另外再说一下机器的配置" tabindex="-1"><a class="header-anchor" href="#m、另外再说一下机器的配置"><span>M、另外再说一下机器的配置</span></a></h2><h3 id="m-1、k8s" tabindex="-1"><a class="header-anchor" href="#m-1、k8s"><span>M-1、K8S</span></a></h3><br><p>360核， 796G</p><figure><img src="'+C+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>',5),I=i("h3",{id:"m-2、mysql",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#m-2、mysql"},[i("span",null,"M-2、MySQL")])],-1),K=i("br",null,null,-1),O=i("p",null,"双节点 16核 128G",-1),W=i("figure",null,[i("img",{src:z,alt:"",tabindex:"0",loading:"lazy"}),i("figcaption")],-1),Z=i("h3",{id:"m-3、redis",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#m-3、redis"},[i("span",null,"M-3、Redis")])],-1),U=i("br",null,null,-1),G=i("p",null,"16G双节点",-1),J=i("figure",null,[i("img",{src:F,alt:"",tabindex:"0",loading:"lazy"}),i("figcaption")],-1),P=i("h3",{id:"m-4、adb",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#m-4、adb"},[i("span",null,"M-4、ADB")])],-1),Y=i("br",null,null,-1),H=i("figure",null,[i("img",{src:q,alt:"",tabindex:"0",loading:"lazy"}),i("figcaption")],-1),$=i("h2",{id:"结果",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#结果"},[i("span",null,"结果：")])],-1),ii=i("p",null,"哎、本来今天晚上也就是17号，说是会有一波推广，刚好可以验证这次优化，但却只是小推广，太失望了...",-1);function si(ei,ai){const s=p("BR");return l(),t("div",null,[X,e(s),M,N,j,T,e(s),Q,e(s),R,e(s),V,e(s),L,e(s),I,K,O,W,e(s),Z,U,G,J,e(s),P,Y,H,e(s),$,ii])}const li=n(S,[["render",si],["__file","记一次服务宕机、优化全流程（以后也可以装X了）.html.vue"]]),pi=JSON.parse('{"path":"/06%E5%BE%AE%E6%9C%8D%E5%8A%A1/%E8%AE%B0%E4%B8%80%E6%AC%A1%E6%9C%8D%E5%8A%A1%E5%AE%95%E6%9C%BA%E3%80%81%E4%BC%98%E5%8C%96%E5%85%A8%E6%B5%81%E7%A8%8B%EF%BC%88%E4%BB%A5%E5%90%8E%E4%B9%9F%E5%8F%AF%E4%BB%A5%E8%A3%85X%E4%BA%86%EF%BC%89.html","title":"【中】记一次服务宕机、优化全流程（以后也可以装X了）","lang":"zh-CN","frontmatter":{"title":"【中】记一次服务宕机、优化全流程（以后也可以装X了）","shortTitle":"【中】记一次服务宕机","date":"2022-11-19T17:03:26.000Z","category":["初级","视频讲解"],"description":"视频地址： https://www.bilibili.com/video/BV1924y1y7jN 221115上午10点的时候客户反应进入小程序慢，打开监控发现服务pv已经超过了历史之最（印象中最高的是100w），这次到了400w。原因是因为推广了一个发红包的活动。 数据体现 最终pv峰值达到了 400w/小时，5分钟峰值 60w， 1分钟峰值 12...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/06%E5%BE%AE%E6%9C%8D%E5%8A%A1/%E8%AE%B0%E4%B8%80%E6%AC%A1%E6%9C%8D%E5%8A%A1%E5%AE%95%E6%9C%BA%E3%80%81%E4%BC%98%E5%8C%96%E5%85%A8%E6%B5%81%E7%A8%8B%EF%BC%88%E4%BB%A5%E5%90%8E%E4%B9%9F%E5%8F%AF%E4%BB%A5%E8%A3%85X%E4%BA%86%EF%BC%89.html"}],["meta",{"property":"og:site_name","content":"小道仙Java笔记"}],["meta",{"property":"og:title","content":"【中】记一次服务宕机、优化全流程（以后也可以装X了）"}],["meta",{"property":"og:description","content":"视频地址： https://www.bilibili.com/video/BV1924y1y7jN 221115上午10点的时候客户反应进入小程序慢，打开监控发现服务pv已经超过了历史之最（印象中最高的是100w），这次到了400w。原因是因为推广了一个发红包的活动。 数据体现 最终pv峰值达到了 400w/小时，5分钟峰值 60w， 1分钟峰值 12..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-08-10T08:35:36.000Z"}],["meta",{"property":"article:author","content":"小道仙97"}],["meta",{"property":"article:published_time","content":"2022-11-19T17:03:26.000Z"}],["meta",{"property":"article:modified_time","content":"2024-08-10T08:35:36.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"【中】记一次服务宕机、优化全流程（以后也可以装X了）\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-19T17:03:26.000Z\\",\\"dateModified\\":\\"2024-08-10T08:35:36.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小道仙97\\",\\"url\\":\\"https://java.xdx97.com\\"}]}"]]},"headers":[{"level":2,"title":"数据体现","slug":"数据体现","link":"#数据体现","children":[{"level":3,"title":"整体数据面板","slug":"整体数据面板","link":"#整体数据面板","children":[]},{"level":3,"title":"接口访问排行榜","slug":"接口访问排行榜","link":"#接口访问排行榜","children":[]},{"level":3,"title":"一分钟峰值","slug":"一分钟峰值","link":"#一分钟峰值","children":[]},{"level":3,"title":"一分钟 exhibition峰值","slug":"一分钟-exhibition峰值","link":"#一分钟-exhibition峰值","children":[]},{"level":3,"title":"exhibition 承受的压力","slug":"exhibition-承受的压力","link":"#exhibition-承受的压力","children":[]}]},{"level":2,"title":"问题现象","slug":"问题现象","link":"#问题现象","children":[]},{"level":2,"title":"问题排查","slug":"问题排查","link":"#问题排查","children":[{"level":3,"title":"1、排查所有其它服务","slug":"_1、排查所有其它服务","link":"#_1、排查所有其它服务","children":[]},{"level":3,"title":"2、排查压力原因","slug":"_2、排查压力原因","link":"#_2、排查压力原因","children":[]},{"level":3,"title":"3、热点接口问题排查","slug":"_3、热点接口问题排查","link":"#_3、热点接口问题排查","children":[]},{"level":3,"title":"4、连接池排查","slug":"_4、连接池排查","link":"#_4、连接池排查","children":[]},{"level":3,"title":"5、结果","slug":"_5、结果","link":"#_5、结果","children":[]}]},{"level":2,"title":"总结：系统优化","slug":"总结-系统优化","link":"#总结-系统优化","children":[{"level":3,"title":"1、慢SQL","slug":"_1、慢sql","link":"#_1、慢sql","children":[]},{"level":3,"title":"2、热点接口优化","slug":"_2、热点接口优化","link":"#_2、热点接口优化","children":[]},{"level":3,"title":"3、下游服务超时","slug":"_3、下游服务超时","link":"#_3、下游服务超时","children":[]},{"level":3,"title":"4、内部服务调用整改","slug":"_4、内部服务调用整改","link":"#_4、内部服务调用整改","children":[]},{"level":3,"title":"5、连接池","slug":"_5、连接池","link":"#_5、连接池","children":[]},{"level":3,"title":"6、Redis 慢日志","slug":"_6、redis-慢日志","link":"#_6、redis-慢日志","children":[]},{"level":3,"title":"7、内部接口逻辑处理慢","slug":"_7、内部接口逻辑处理慢","link":"#_7、内部接口逻辑处理慢","children":[]},{"level":3,"title":"N、接口限流","slug":"n、接口限流","link":"#n、接口限流","children":[]},{"level":3,"title":"N-2、基于ip限流","slug":"n-2、基于ip限流","link":"#n-2、基于ip限流","children":[]}]},{"level":2,"title":"M、另外再说一下机器的配置","slug":"m、另外再说一下机器的配置","link":"#m、另外再说一下机器的配置","children":[{"level":3,"title":"M-1、K8S","slug":"m-1、k8s","link":"#m-1、k8s","children":[]},{"level":3,"title":"M-2、MySQL","slug":"m-2、mysql","link":"#m-2、mysql","children":[]},{"level":3,"title":"M-3、Redis","slug":"m-3、redis","link":"#m-3、redis","children":[]},{"level":3,"title":"M-4、ADB","slug":"m-4、adb","link":"#m-4、adb","children":[]}]},{"level":2,"title":"结果：","slug":"结果","link":"#结果","children":[]}],"git":{"createdTime":1723278936000,"updatedTime":1723278936000,"contributors":[{"name":"ziyangtao","email":"ziyangtao@distinctclinic.com","commits":1}]},"readingTime":{"minutes":9.95,"words":2986},"filePathRelative":"06微服务/记一次服务宕机、优化全流程（以后也可以装X了）.md","localizedDate":"2022年11月20日","excerpt":"<br>\\n<p>视频地址： <a href=\\"https://www.bilibili.com/video/BV1924y1y7jN\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://www.bilibili.com/video/BV1924y1y7jN</a></p>\\n<br>\\n<blockquote>\\n<p>221115上午10点的时候客户反应进入小程序慢，打开监控发现服务pv已经超过了历史之最（印象中最高的是100w），这次到了400w。原因是因为推广了一个发红包的活动。</p>\\n</blockquote>\\n<h2>数据体现</h2>\\n","autoDesc":true}');export{li as comp,pi as data};
