import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as t,b as n}from"./app-Q2dkLXYo.js";const r="/assets/06_1-BQ2nwDUu.png",a="/assets/06_2-B3sDmoro.png",l="/assets/06_3-vkUEIUMe.png",o={},p=n('<ul><li>B站：<a href="https://www.bilibili.com/video/BV1R24y1u7a2" target="_blank" rel="noopener noreferrer">https://www.bilibili.com/video/BV1R24y1u7a2</a></li></ul><br><h2 id="一、起源" tabindex="-1"><a class="header-anchor" href="#一、起源"><span>一、起源</span></a></h2><p>为什么想写这篇文章呢？起源于我最开始对于它俩的误解，在很长一段时间我都分不清它们的区别。</p><p>对于SpringCloud在实际项目中并未使用过，只是自学过SpringCloud和SpringCloud Alibaba，也基于学习搭建过demo。</p><p>对于Kubernetes，目前这家公司就是使用的这个，但也只是管中窥豹，目前对于二者的关系，以及一些优缺点，还是有点认识的。</p><p>基于学习、总结的想法，然后就出了这篇文章，下面以对比的方式来介绍它们俩。</p><br><h2 id="二、框架图" tabindex="-1"><a class="header-anchor" href="#二、框架图"><span>二、框架图</span></a></h2><p>这个是我21年学习cloud画的流程图</p><figure><img src="'+r+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><p>这是基于我理解的K8S画的图</p><figure><img src="'+a+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><h2 id="三、功能对比" tabindex="-1"><a class="header-anchor" href="#三、功能对比"><span>三、功能对比</span></a></h2><br><p>下面这个问题的回答来自 chatGPD</p><blockquote><p><strong>SpringCloud 和 Kubernetes的区别</strong> <br> <br> Spring Cloud 和 Kubernetes 都是用于构建和管理云原生应用程序的工具，但它们有一些重要的区别。 <br><br> Spring Cloud 是一组用于构建微服务架构的框架和库。它提供了一系列解决方案，如服务注册、配置管理、负载均衡、断路器、路由和追踪等功能。 <br> Spring Cloud 建立在 Spring Framework 的基础上，它的目标是让开发人员能够更轻松地构建和管理微服务架构。Spring Cloud 可以运行在任何基础设施上，包括本地服务器、虚拟机和云环境。 <br> Kubernetes 是一个容器编排平台，它允许用户自动化部署、扩展和管理容器化应用程序。Kubernetes 提供了许多功能，如服务发现、负载均衡、自动伸缩、滚动更新、容器存储和自动恢复等。Kubernetes 的设计目标是支持大规模的容器集群，它可以在任何基础设施上运行，包括本地服务器、公有云和私有云环境。 <br> 因此，Spring Cloud 和 Kubernetes 的主要区别在于它们的设计目标和重点。Spring Cloud 主要关注构建微服务架构，提供了一系列解决方案，而 Kubernetes 主要关注容器编排，提供了一套自动化部署、扩展和管理容器化应用程序的功能。当构建和管理微服务架构时，可以使用 Spring Cloud，当部署和管理容器化应用程序时，可以使用 Kubernetes。 <br></p></blockquote><p>就我的使用体验来说，我觉得它们并不是对立的，不是说用了K8S就不可以使用SpringCloud，相反我觉得它们是可以相互补充的。</p><br><h3 id="_1、服务网关" tabindex="-1"><a class="header-anchor" href="#_1、服务网关"><span>1、服务网关</span></a></h3><p>网关简单来说就是一个大门，你想要去访问门后的东西，第一步就是跨过大门。</p><ul><li>Cloud里面的网关代表有zuul、Gateway等，它们需要去连接一个注册中心，去注册中心拿到服务相关的信息，再去做相对的转发策略。</li><li>K8S的网关是 ingress，目前我们的服务是部署在阿里云上面的，使用的是 nginx ingress controller，本质上是基于nginx + luajit 来实现的，借助luajit框架可以让我们像编程一样的去操作nginx能力。（可以去看看开源框架 OpenResty）</li></ul><p>以我的使用体验来看，我更喜欢 ingress，它依托k8s本身，新增服务的时候会自动的去发现服务，我们的服务本身没有任何的依赖，比如配置注册中心地址什么的，部署即刻生效。</p><br><h3 id="_2、服务注册-发现" tabindex="-1"><a class="header-anchor" href="#_2、服务注册-发现"><span>2、服务注册/发现</span></a></h3><ul><li>Cloud的服务注册发现，是需要借助其它中间件比如Eureka、Nacos等，这些组件也还需要借助第三方的存储比如MySQL。</li><li>K8S的数据存储是ETCD，理所当然服务信息也会存储到这个里面，自然就形成了注册，ingress会从etcd里面获取信息，就形成了服务的发现，完全是K8S自带的。</li></ul><br><h3 id="_3、服务调用" tabindex="-1"><a class="header-anchor" href="#_3、服务调用"><span>3、服务调用</span></a></h3><p>不管是cloud还是k8s，其实服务本身的通信是没有什么限制的，比如你可以使用HTTP，也可以用 RPC。</p><p>相对于cloud，k8s服务调用更有优势，你注册了一个服务，会生成一个服务内部调用地址，通过这个地址去调用服务走内部通信，一个是快，一个是自带负载均衡。</p><p>如果你想使用RPC调用，在K8S里面也是完全可以的，我们的服务就在慢慢的开始使用OpenFegin，目的是为了统一技术站，为后续服务治理做准备。</p><br><h3 id="_4、服务配置" tabindex="-1"><a class="header-anchor" href="#_4、服务配置"><span>4、服务配置</span></a></h3><ul><li>Cloud 里面的配置中心有config、nacos等，可以做到热更新，也可以做到不同的环境不同的配置。</li><li>K8S里面可以使用configMap，它就是一个 key-value 格式的数据，我们的value可以是任何格式的数据，这取决于我们的服务想用什么比如 Java里面的 yaml，nginx里面的conf。</li></ul><p>从功能来看nacos是全胜的，但是从业务场景来看，有时候configMap更适合我们</p><ol><li>热更新：nacos是支持热更新的，configMap不支持，不过K8S的pod支持滚动升级，偶尔的一次修改配置文件也可以做到用户无感知，只是操作稍微麻烦些，需要重启。</li><li>编写体验：nacos有很好的编辑器，不同的文件会有不同的高亮显示，但是阿里云的configMap目前只是一个单纯的文本框。（这点我也无所谓，一般我都是复制出来的本地编辑再复制回去）</li><li>难易度：毫无疑问configMap属于K8S本身肯定要简单很多不需要单独的服务并且代码无任何侵入。</li></ol><br><h3 id="_5、服务熔断、降级" tabindex="-1"><a class="header-anchor" href="#_5、服务熔断、降级"><span>5、服务熔断、降级</span></a></h3><p>K8S和Cloud一样需要引入第三方中间件，如 sentinel和hystrix</p><figure><img src="'+l+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><h3 id="_6、分布式事务" tabindex="-1"><a class="header-anchor" href="#_6、分布式事务"><span>6、分布式事务</span></a></h3><p>同上，也需要引入第三方中间件，或自己做补偿机制</p><br><h2 id="四、总结" tabindex="-1"><a class="header-anchor" href="#四、总结"><span>四、总结</span></a></h2><p>个人觉得它们最大的区别在于一个是为了解决Java微服务架构问题，一个是容器架构和语言无关，所有功能都是自己这个架构所自带的，只是为了解决架构的某些问题而产生的。</p>',48),s=[p];function d(c,u){return t(),i("div",null,s)}const b=e(o,[["render",d],["__file","谈谈我理解的SpringCloud和Kubernetes的区别.html.vue"]]),m=JSON.parse('{"path":"/06%E5%BE%AE%E6%9C%8D%E5%8A%A1/%E8%B0%88%E8%B0%88%E6%88%91%E7%90%86%E8%A7%A3%E7%9A%84SpringCloud%E5%92%8CKubernetes%E7%9A%84%E5%8C%BA%E5%88%AB.html","title":"【中】谈谈我理解的SpringCloud和Kubernetes的区别","lang":"zh-CN","frontmatter":{"title":"【中】谈谈我理解的SpringCloud和Kubernetes的区别","shortTitle":"【中】Cloud和k8s的区别","date":"2023-03-26T10:36:25.000Z","category":["中级","视频讲解"],"tag":["Kubernetes","SpringCloud","微服务"],"description":"B站：https://www.bilibili.com/video/BV1R24y1u7a2 一、起源 为什么想写这篇文章呢？起源于我最开始对于它俩的误解，在很长一段时间我都分不清它们的区别。 对于SpringCloud在实际项目中并未使用过，只是自学过SpringCloud和SpringCloud Alibaba，也基于学习搭建过demo。 对于Ku...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/06%E5%BE%AE%E6%9C%8D%E5%8A%A1/%E8%B0%88%E8%B0%88%E6%88%91%E7%90%86%E8%A7%A3%E7%9A%84SpringCloud%E5%92%8CKubernetes%E7%9A%84%E5%8C%BA%E5%88%AB.html"}],["meta",{"property":"og:site_name","content":"小道仙Java笔记"}],["meta",{"property":"og:title","content":"【中】谈谈我理解的SpringCloud和Kubernetes的区别"}],["meta",{"property":"og:description","content":"B站：https://www.bilibili.com/video/BV1R24y1u7a2 一、起源 为什么想写这篇文章呢？起源于我最开始对于它俩的误解，在很长一段时间我都分不清它们的区别。 对于SpringCloud在实际项目中并未使用过，只是自学过SpringCloud和SpringCloud Alibaba，也基于学习搭建过demo。 对于Ku..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-20T12:30:55.000Z"}],["meta",{"property":"article:author","content":"小道仙97"}],["meta",{"property":"article:tag","content":"Kubernetes"}],["meta",{"property":"article:tag","content":"SpringCloud"}],["meta",{"property":"article:tag","content":"微服务"}],["meta",{"property":"article:published_time","content":"2023-03-26T10:36:25.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-20T12:30:55.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"【中】谈谈我理解的SpringCloud和Kubernetes的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-03-26T10:36:25.000Z\\",\\"dateModified\\":\\"2024-07-20T12:30:55.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小道仙97\\",\\"url\\":\\"https://java.xdx97.com\\"}]}"]]},"headers":[{"level":2,"title":"一、起源","slug":"一、起源","link":"#一、起源","children":[]},{"level":2,"title":"二、框架图","slug":"二、框架图","link":"#二、框架图","children":[]},{"level":2,"title":"三、功能对比","slug":"三、功能对比","link":"#三、功能对比","children":[{"level":3,"title":"1、服务网关","slug":"_1、服务网关","link":"#_1、服务网关","children":[]},{"level":3,"title":"2、服务注册/发现","slug":"_2、服务注册-发现","link":"#_2、服务注册-发现","children":[]},{"level":3,"title":"3、服务调用","slug":"_3、服务调用","link":"#_3、服务调用","children":[]},{"level":3,"title":"4、服务配置","slug":"_4、服务配置","link":"#_4、服务配置","children":[]},{"level":3,"title":"5、服务熔断、降级","slug":"_5、服务熔断、降级","link":"#_5、服务熔断、降级","children":[]},{"level":3,"title":"6、分布式事务","slug":"_6、分布式事务","link":"#_6、分布式事务","children":[]}]},{"level":2,"title":"四、总结","slug":"四、总结","link":"#四、总结","children":[]}],"git":{"createdTime":1721461625000,"updatedTime":1721478655000,"contributors":[{"name":"ziyangtao","email":"ziyangtao@distinctclinic.com","commits":6}]},"readingTime":{"minutes":5.55,"words":1665},"filePathRelative":"06微服务/谈谈我理解的SpringCloud和Kubernetes的区别.md","localizedDate":"2023年3月26日","excerpt":"<ul>\\n<li>B站：<a href=\\"https://www.bilibili.com/video/BV1R24y1u7a2\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://www.bilibili.com/video/BV1R24y1u7a2</a></li>\\n</ul>\\n<br>\\n<h2>一、起源</h2>\\n<p>为什么想写这篇文章呢？起源于我最开始对于它俩的误解，在很长一段时间我都分不清它们的区别。</p>\\n<p>对于SpringCloud在实际项目中并未使用过，只是自学过SpringCloud和SpringCloud Alibaba，也基于学习搭建过demo。</p>","autoDesc":true}');export{b as comp,m as data};
