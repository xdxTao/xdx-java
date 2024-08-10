import{_ as o}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as r,f as e}from"./app-CPTE7G04.js";const a={},n=e("p",null,"一次Dubbo请求经历了哪些（从服务发送者到服务提供者） Dubbo是怎么注册的（到nacos），怎么做的负载 Dubbo序列化和反序列化 Dubbo之Filter在消费者和服务提供者的运行",-1),i=e("p",null,"org.apache.dubbo.config.spring.ServiceBean#afterPropertiesSet org.apache.dubbo.config.deploy.DefaultModuleDeployer#exportServices org.apache.dubbo.registry.nacos.NacosRegistry#notifySubscriber",-1),c=e("p",null,"这个是生成 invoker 的地方 org.apache.dubbo.config.ServiceConfig#doExportUrl invoker = new DelegateProviderMetaDataInvoker(invoker, this);",-1),p=e("p",null,"1、通过所有的@DubboServer注解找到所有的服务提供者，然后生成ServerBean再注册到nacos 2、在生成 invoker 3、服务请求的时候是通过netty，然后再一层层到通过代理到我们的service",-1),b=e("p",null,"问：怎么从netty找到我们的 invoker的呢？",-1),s=e("p",null,"org.apache.dubbo.rpc.cluster.filter.DefaultFilterChainBuilder#buildInvokerChain",-1),u=e("p",null,"org.apache.dubbo.config.spring.util.LazyTargetInvocationHandler#invoke org.apache.dubbo.rpc.proxy.InvokerInvocationHandler#invoke org.apache.dubbo.rpc.proxy.InvocationUtil#invoke org.apache.dubbo.rpc.cluster.support.wrapper.ScopeClusterInvoker#invoke org.apache.dubbo.rpc.cluster.support.wrapper.MockClusterInvoker#invoke org.apache.dubbo.rpc.cluster.support.wrapper.AbstractCluster.ClusterFilterInvoker#invoke org.apache.dubbo.rpc.cluster.filter.FilterChainBuilder.CallbackRegistrationInvoker#invoke org.apache.dubbo.rpc.cluster.filter.FilterChainBuilder.CopyOfFilterChainNode#invoke",-1),l=e("p",null,"https://www.cnblogs.com/xing1/articles/15626569.html",-1),d=[n,i,c,p,b,s,u,l];function g(h,D){return r(),t("div",null,d)}const m=o(a,[["render",g],["__file","dubbo源码后续.html.vue"]]),_=JSON.parse('{"path":"/06%E5%BE%AE%E6%9C%8D%E5%8A%A1/01Dubbo/dubbo%E6%BA%90%E7%A0%81%E5%90%8E%E7%BB%AD.html","title":"【中】Dx","lang":"zh-CN","frontmatter":{"title":"【中】Dx","shortTitle":"【中】x","date":"2024-07-29T21:50:01.000Z","category":["中级","视频讲解"],"tag":["Dubbo","Dubbo3"],"order":1,"index":false,"timeline":false,"article":false,"description":"一次Dubbo请求经历了哪些（从服务发送者到服务提供者） Dubbo是怎么注册的（到nacos），怎么做的负载 Dubbo序列化和反序列化 Dubbo之Filter在消费者和服务提供者的运行 org.apache.dubbo.config.spring.ServiceBean#afterPropertiesSet org.apache.dubbo.co...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/06%E5%BE%AE%E6%9C%8D%E5%8A%A1/01Dubbo/dubbo%E6%BA%90%E7%A0%81%E5%90%8E%E7%BB%AD.html"}],["meta",{"property":"og:site_name","content":"小道仙Java笔记"}],["meta",{"property":"og:title","content":"【中】Dx"}],["meta",{"property":"og:description","content":"一次Dubbo请求经历了哪些（从服务发送者到服务提供者） Dubbo是怎么注册的（到nacos），怎么做的负载 Dubbo序列化和反序列化 Dubbo之Filter在消费者和服务提供者的运行 org.apache.dubbo.config.spring.ServiceBean#afterPropertiesSet org.apache.dubbo.co..."}],["meta",{"property":"og:type","content":"website"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"小道仙97"}],["meta",{"property":"article:tag","content":"Dubbo"}],["meta",{"property":"article:tag","content":"Dubbo3"}],["meta",{"property":"article:published_time","content":"2024-07-29T21:50:01.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"WebPage\\",\\"name\\":\\"【中】Dx\\",\\"description\\":\\"一次Dubbo请求经历了哪些（从服务发送者到服务提供者） Dubbo是怎么注册的（到nacos），怎么做的负载 Dubbo序列化和反序列化 Dubbo之Filter在消费者和服务提供者的运行 org.apache.dubbo.config.spring.ServiceBean#afterPropertiesSet org.apache.dubbo.co...\\"}"]]},"headers":[],"git":{"createdTime":null,"updatedTime":null,"contributors":[]},"readingTime":{"minutes":0.71,"words":213},"filePathRelative":"06微服务/01Dubbo/dubbo源码后续.md","localizedDate":"2024年7月30日","excerpt":"<p>一次Dubbo请求经历了哪些（从服务发送者到服务提供者）\\nDubbo是怎么注册的（到nacos），怎么做的负载\\nDubbo序列化和反序列化\\nDubbo之Filter在消费者和服务提供者的运行</p>\\n<p>org.apache.dubbo.config.spring.ServiceBean#afterPropertiesSet\\norg.apache.dubbo.config.deploy.DefaultModuleDeployer#exportServices\\norg.apache.dubbo.registry.nacos.NacosRegistry#notifySubscriber</p>","autoDesc":true}');export{m as comp,_ as data};
