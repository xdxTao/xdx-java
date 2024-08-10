import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,f as i,e as s,a as l,w as t,d as p,r as h,o as r}from"./app-DTFy3zAf.js";const d="/assets/0601_6-BGC20ddA.png",k="/assets/0601_7-Dm5SnhsI.png",o="/assets/0601_8-DMuniADT.png",c="/assets/0601_9-CtDEzYfz.png",b="/assets/0601_10-DiYr56eT.png",g="/assets/0601_11-rS50b9Az.png",u="/assets/0601_12-DNeAWHox.png",E="/assets/0601_13-KAMYwdBn.png",m={},y=i("p",null,[i("a",{href:"https://www.bilibili.com/video/BV1Yz421C7Ht",target:"_blank",rel:"noopener noreferrer"},"B站视频地址")],-1),B=i("br",null,null,-1),v=p(`<p>上篇我们搭建了Dubbo3的Demo，无非是提供服务和调用服务。 今天再来学一下Dubbo更多的一些实践内容，学完这篇，正常开发其实也就足够了。</p><br><h1 id="一、配置多协议" tabindex="-1"><a class="header-anchor" href="#一、配置多协议"><span>一、配置多协议</span></a></h1><br><p>Dubbo是支持多协议的，它默认的Dubbo协议已经很好了，正常情况下，使用Dubbo是做服务之间的通信是不需要更换协议的。 但它既然提供了多协议，今天就来看看使用dubbo提供双协议。</p><br><h2 id="_1-1、api-改造" tabindex="-1"><a class="header-anchor" href="#_1-1、api-改造"><span>1-1、API 改造</span></a></h2><br><p>原本的dubbo协议是不需要提供路径的，现在的HTTP需要提供路径，改造如下</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> org.springframework.web.bind.annotation.GetMapping</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> org.springframework.web.bind.annotation.RequestMapping</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">RequestMapping</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;/xdx&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> DemoService</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    @</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">GetMapping</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;/getStr&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">    String</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> getString</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h2 id="_1-2、配置文件" tabindex="-1"><a class="header-anchor" href="#_1-2、配置文件"><span>1-2、配置文件</span></a></h2><p>单协议使用 <code>protocol</code>多协议用 <code>protocols</code></p><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">server</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">  port</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">5656</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">dubbo</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">  application</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">    id</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">xdx-dubbo3-provider</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">    name</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">xdx-dubbo3-provider</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">    serialize-check-status</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">WARN</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">  # 多协议</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">  protocols</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">    id</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">dubbo-rest</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">    dubbo</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">      name</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">dubbo</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">      port</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">7788</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">    rest</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">      name</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">rest</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">      port</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">7799</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">      # 最好不配置这个，这个会对 dubbo协议有影响</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">      contextpath</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">/xxx</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">  # 单协议    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">  # protocol:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">  #   contextpath: /xxx</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">  #   name: rest</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">  #   host: 127.0.0.1</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">  #   port: 7799</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    </span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">    serialization</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">hessian2</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">  registry</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">    address</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">nacos://\${nacos.config.server-addr}</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">    parameters.namespace</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">\${nacos.config.namespace}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">dubboParams</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">xdx97</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h2 id="_1-3、provider" tabindex="-1"><a class="header-anchor" href="#_1-3、provider"><span>1-3、provider</span></a></h2><br><p>默认的协议就是 dubbo，所以在使用的时候不需要指定协议，如果使用其它协议需要指定对应的协议 <code>protocol = &quot;rest,dubbo&quot;</code></p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> com.alibaba.nacos.api.config.annotation.NacosValue</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> com.xdx97.dubbo3.api.DemoService</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> org.apache.dubbo.config.annotation.DubboService</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">DubboService</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">version</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;1.0.0&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> protocol</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;rest,dubbo&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> DemoServiceImpl</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> implements</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> DemoService</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">    // nacos.config.autoRefresh = true 这个配置要打才可以</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    @</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">NacosValue</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">value</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;\${dubboParams}&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> autoRefreshed</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    private</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> String</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> dubboParams</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    @</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">Override</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> String</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> getString</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">()</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">        return</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> dubboParams;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h2 id="_1-4、测试" tabindex="-1"><a class="header-anchor" href="#_1-4、测试"><span>1-4、测试</span></a></h2><br><p>dubbo协议请求还是和之前的一样，http协议请求需要带上version，如果有group也要带上。自然是放在请求头里面</p><figure><img src="`+d+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><h2 id="_1-5、其它" tabindex="-1"><a class="header-anchor" href="#_1-5、其它"><span>1-5、其它</span></a></h2><br><p>更多设置参考官方文档</p><p>https://cn.dubbo.apache.org/zh-cn/overview/reference/protocols/http/</p><p>https://cn.dubbo.apache.org/zh-cn/overview/tasks/protocols/web/</p><br><h1 id="二、dubbo-admin-实践" tabindex="-1"><a class="header-anchor" href="#二、dubbo-admin-实践"><span>二、Dubbo-Admin 实践</span></a></h1><br><p>Dubbo不只是作为服务间的通讯，它还涉及服务治理，今天就来一起学习下Dubbo的控制台使用。</p><p>目前最新版的控制台首页如下，可快速的对服务进行测试、治理</p><figure><img src="'+k+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><h2 id="_2-1、服务测试" tabindex="-1"><a class="header-anchor" href="#_2-1、服务测试"><span>2-1、服务测试</span></a></h2><br><p>目前这个服务测试应当只支持Dubbo协议的</p><figure><img src="'+o+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><p>https://cn.dubbo.apache.org/zh-cn/overview/reference/admin/test/</p><br><h2 id="_2-2、负载均衡" tabindex="-1"><a class="header-anchor" href="#_2-2、负载均衡"><span>2-2、负载均衡</span></a></h2><br><p>https://cn.dubbo.apache.org/zh-cn/docsv2.7/admin/ops/governance/</p><p>Dubbo多服务默认就是轮询的算法，但它又提供了很多不同的策略</p><figure><img src="'+c+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><h3 id="_2-2-1、标签路由" tabindex="-1"><a class="header-anchor" href="#_2-2-1、标签路由"><span>2-2-1、标签路由</span></a></h3><br><p>比如有两个服务的提供者提供相同的服务，可以给它们打上A、B标签，请求的时候可以根据标签去固定请求对应的服务。</p><br><p><img src="'+b+'" alt="在这里插入图片描述" loading="lazy"><img src="'+g+'" alt="在这里插入图片描述" loading="lazy"></p><br><h3 id="_2-2-2、黑白名单" tabindex="-1"><a class="header-anchor" href="#_2-2-2、黑白名单"><span>2-2-2、黑白名单</span></a></h3><br><p>黑名单不允许访问，白名单可以访问 注：不可以填写 127.0.0.1。对 rest协议没用影响</p><figure><img src="'+u+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><h3 id="_2-2-3、权重" tabindex="-1"><a class="header-anchor" href="#_2-2-3、权重"><span>2-2-3、权重</span></a></h3><p>默认的权重都是100，相当于轮询了，可以修改其中一个服务的权重为20，这样就相当于1/5。再去请求就可以看到结果。</p><figure><img src="'+E+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><h3 id="_2-2-4、其它" tabindex="-1"><a class="header-anchor" href="#_2-2-4、其它"><span>2-2-4、其它</span></a></h3><p>dubbo还提供了很多更高级的负载，比如 最后一次存活、地区优先、同机房优先，这个暂时不涉及，感兴趣的同学可自行去研究。</p><p>https://cn.dubbo.apache.org/zh-cn/overview/tasks/traffic-management/</p><br><h2 id="_2-3、无法显示consumer" tabindex="-1"><a class="header-anchor" href="#_2-3、无法显示consumer"><span>2-3、无法显示consumer</span></a></h2><p>Dubbo-admin 提供了消费者统计，但实际中显示有点问题，官方好像还没解决</p><p>https://github.com/apache/dubbo-admin/issues/674</p>',72);function A(D,C){const a=h("RouteLink");return r(),e("div",null,[y,B,i("p",null,[s("此篇文章是基于上一篇的Demo之上 【"),l(a,{to:"/06%E5%BE%AE%E6%9C%8D%E5%8A%A1/01Dubbo/Dubbo%E5%85%A5%E9%97%A8%E9%A1%B9%E7%9B%AE%E6%90%AD%E5%BB%BA%E3%80%90Dubbo3.2.9%E3%80%81Nacos2.3.0%E3%80%81SpringBoot%202.7.17%E3%80%81Dubbo-Admin%200.6.0%E3%80%91.html"},{default:t(()=>[s("Dubbo入门项目搭建【Dubbo3.2.9、Nacos2.3.0、SpringBoot 2.7.17、Dubbo-Admin 0.6.0】")]),_:1}),s("】")]),v])}const F=n(m,[["render",A],["__file","Dubbo-Admin 实践，Dubbo3 配置多协议，同时提供Dubbo和HTTP协议.html.vue"]]),x=JSON.parse('{"path":"/06%E5%BE%AE%E6%9C%8D%E5%8A%A1/01Dubbo/Dubbo-Admin%20%E5%AE%9E%E8%B7%B5%EF%BC%8CDubbo3%20%E9%85%8D%E7%BD%AE%E5%A4%9A%E5%8D%8F%E8%AE%AE%EF%BC%8C%E5%90%8C%E6%97%B6%E6%8F%90%E4%BE%9BDubbo%E5%92%8CHTTP%E5%8D%8F%E8%AE%AE.html","title":"【中】Dubbo-Admin 实践，Dubbo3 配置多协议，同时提供Dubbo和HTTP协议","lang":"zh-CN","frontmatter":{"title":"【中】Dubbo-Admin 实践，Dubbo3 配置多协议，同时提供Dubbo和HTTP协议","shortTitle":"【中】Dubbo-Admin 实践","date":"2024-04-27T19:30:05.000Z","category":["中级","视频讲解"],"tag":["Dubbo","Dubbo3"],"order":2,"description":"B站视频地址 此篇文章是基于上一篇的Demo之上 【】 上篇我们搭建了Dubbo3的Demo，无非是提供服务和调用服务。 今天再来学一下Dubbo更多的一些实践内容，学完这篇，正常开发其实也就足够了。 一、配置多协议 Dubbo是支持多协议的，它默认的Dubbo协议已经很好了，正常情况下，使用Dubbo是做服务之间的通信是不需要更换协议的。 但它既然提...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/06%E5%BE%AE%E6%9C%8D%E5%8A%A1/01Dubbo/Dubbo-Admin%20%E5%AE%9E%E8%B7%B5%EF%BC%8CDubbo3%20%E9%85%8D%E7%BD%AE%E5%A4%9A%E5%8D%8F%E8%AE%AE%EF%BC%8C%E5%90%8C%E6%97%B6%E6%8F%90%E4%BE%9BDubbo%E5%92%8CHTTP%E5%8D%8F%E8%AE%AE.html"}],["meta",{"property":"og:site_name","content":"小道仙Java笔记"}],["meta",{"property":"og:title","content":"【中】Dubbo-Admin 实践，Dubbo3 配置多协议，同时提供Dubbo和HTTP协议"}],["meta",{"property":"og:description","content":"B站视频地址 此篇文章是基于上一篇的Demo之上 【】 上篇我们搭建了Dubbo3的Demo，无非是提供服务和调用服务。 今天再来学一下Dubbo更多的一些实践内容，学完这篇，正常开发其实也就足够了。 一、配置多协议 Dubbo是支持多协议的，它默认的Dubbo协议已经很好了，正常情况下，使用Dubbo是做服务之间的通信是不需要更换协议的。 但它既然提..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-23T14:12:53.000Z"}],["meta",{"property":"article:author","content":"小道仙97"}],["meta",{"property":"article:tag","content":"Dubbo"}],["meta",{"property":"article:tag","content":"Dubbo3"}],["meta",{"property":"article:published_time","content":"2024-04-27T19:30:05.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-23T14:12:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"【中】Dubbo-Admin 实践，Dubbo3 配置多协议，同时提供Dubbo和HTTP协议\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-04-27T19:30:05.000Z\\",\\"dateModified\\":\\"2024-07-23T14:12:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小道仙97\\",\\"url\\":\\"https://java.xdx97.com\\"}]}"]]},"headers":[{"level":2,"title":"1-1、API 改造","slug":"_1-1、api-改造","link":"#_1-1、api-改造","children":[]},{"level":2,"title":"1-2、配置文件","slug":"_1-2、配置文件","link":"#_1-2、配置文件","children":[]},{"level":2,"title":"1-3、provider","slug":"_1-3、provider","link":"#_1-3、provider","children":[]},{"level":2,"title":"1-4、测试","slug":"_1-4、测试","link":"#_1-4、测试","children":[]},{"level":2,"title":"1-5、其它","slug":"_1-5、其它","link":"#_1-5、其它","children":[]},{"level":2,"title":"2-1、服务测试","slug":"_2-1、服务测试","link":"#_2-1、服务测试","children":[]},{"level":2,"title":"2-2、负载均衡","slug":"_2-2、负载均衡","link":"#_2-2、负载均衡","children":[{"level":3,"title":"2-2-1、标签路由","slug":"_2-2-1、标签路由","link":"#_2-2-1、标签路由","children":[]},{"level":3,"title":"2-2-2、黑白名单","slug":"_2-2-2、黑白名单","link":"#_2-2-2、黑白名单","children":[]},{"level":3,"title":"2-2-3、权重","slug":"_2-2-3、权重","link":"#_2-2-3、权重","children":[]},{"level":3,"title":"2-2-4、其它","slug":"_2-2-4、其它","link":"#_2-2-4、其它","children":[]}]},{"level":2,"title":"2-3、无法显示consumer","slug":"_2-3、无法显示consumer","link":"#_2-3、无法显示consumer","children":[]}],"git":{"createdTime":1721743973000,"updatedTime":1721743973000,"contributors":[{"name":"ziyangtao","email":"ziyangtao@distinctclinic.com","commits":1}]},"readingTime":{"minutes":3.35,"words":1005},"filePathRelative":"06微服务/01Dubbo/Dubbo-Admin 实践，Dubbo3 配置多协议，同时提供Dubbo和HTTP协议.md","localizedDate":"2024年4月28日","excerpt":"<p><a href=\\"https://www.bilibili.com/video/BV1Yz421C7Ht\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">B站视频地址</a></p>\\n<br>\\n<p>此篇文章是基于上一篇的Demo之上 【<a href=\\"/06%E5%BE%AE%E6%9C%8D%E5%8A%A1/01Dubbo/Dubbo%E5%85%A5%E9%97%A8%E9%A1%B9%E7%9B%AE%E6%90%AD%E5%BB%BA%E3%80%90Dubbo3.2.9%E3%80%81Nacos2.3.0%E3%80%81SpringBoot%202.7.17%E3%80%81Dubbo-Admin%200.6.0%E3%80%91.html\\" target=\\"_blank\\">Dubbo入门项目搭建【Dubbo3.2.9、Nacos2.3.0、SpringBoot 2.7.17、Dubbo-Admin 0.6.0】</a>】</p>","autoDesc":true}');export{F as comp,x as data};
