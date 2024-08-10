import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as h,f as k,e,a as s,w as r,d as i,r as l,o as p}from"./app-CPTE7G04.js";const d="/assets/15_19-CYrR21I0.png",c="/assets/15_20-BhVIq08M.png",o="/assets/15_21-CO_0VTsi.png",g={},y=i(`<ol><li>视频讲解 <a href="https://www.bilibili.com/video/BV1FD4y1j73p" target="_blank" rel="noopener noreferrer">https://www.bilibili.com/video/BV1FD4y1j73p</a></li><li>官方文档 https://arthas.aliyun.com/doc/</li></ol><br><h2 id="一、安装" tabindex="-1"><a class="header-anchor" href="#一、安装"><span>一、安装</span></a></h2><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">curl </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">O</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> https</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">:</span><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">//arthas.aliyun.com/arthas-boot.jar</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">java </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">jar arthas</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">boot</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">jar</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">curl </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">L</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> https</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">:</span><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">//arthas.aliyun.com/install.sh | sh</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h2 id="二、场景" tabindex="-1"><a class="header-anchor" href="#二、场景"><span>二、场景</span></a></h2><h3 id="_2-1、查看当前服务运行的参数-jvm、内存、启动参数等" tabindex="-1"><a class="header-anchor" href="#_2-1、查看当前服务运行的参数-jvm、内存、启动参数等"><span>2-1、查看当前服务运行的参数 JVM、内存、启动参数等</span></a></h3><h4 id="_1、memory" tabindex="-1"><a class="header-anchor" href="#_1、memory"><span>1、memory</span></a></h4><p>查看当前堆和非堆的内存使用情况 <img src="`+d+`" alt="在这里插入图片描述" loading="lazy"><br></p><h4 id="_2、thread" tabindex="-1"><a class="header-anchor" href="#_2、thread"><span>2、thread</span></a></h4><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 查看全部的线程状态</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">thread</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 查看当前最忙的 n个线程</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">thread</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -n</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 查看被阻塞的线程</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">thread</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -b</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h4 id="_3、查看当前类的方法" tabindex="-1"><a class="header-anchor" href="#_3、查看当前类的方法"><span>3、查看当前类的方法</span></a></h4><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">sm</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> cn.data.process.api.ApiApplication</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><br><h4 id="_4、其它" tabindex="-1"><a class="header-anchor" href="#_4、其它"><span>4、其它</span></a></h4><ol><li><code>cls</code> 清空控制台</li><li><code>history</code> 查看历史的命令</li><li><code>pwd</code> 查看当前目录</li><li><code>quit</code> 推出 arthas</li><li><code>reset</code> 重制所有的 arthas的增强操作</li><li><code>stop</code> 关闭 Arthas 服务端，所有 Arthas 客户端全部退出。会重置掉所有做过的增强类,但是用 redefine 重加载的类内容不会被重置。</li><li><code>version</code> 查看当前的 arthas 的版本</li></ol><br><h3 id="_2-2、查看线上源码" tabindex="-1"><a class="header-anchor" href="#_2-2、查看线上源码"><span>2-2、查看线上源码</span></a></h3><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 查看源码</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">jad</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> cn.data.process.api.ApiApplication</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 保存反编译的源码</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">jad</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> --source-only</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> com.example.demo.arthas.user.UserController</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> &gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> /UserController.java</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h3 id="_2-3、修改线上源码" tabindex="-1"><a class="header-anchor" href="#_2-3、修改线上源码"><span>2-3、修改线上源码</span></a></h3>`,22),E=i(`<ol><li>把你本地的 class上传到服务器</li><li>通过 arthas的 <code>jad</code>命令来把 class反编译成 java ，<code>mc</code> 命令来把 java 编译成 class</li><li><code>retransform</code> 命令把 class加载到 jvm中去</li></ol><p>方法一就没什么好说了，来看方式二</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 1、从原class 里面复制出新的 java文件（有可能反编译会有问题，建议先检查下结果）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">jad</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> --source-only</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> cn.data.process.api.web.WkDataController</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> &gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> /WkDataController.java</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 2、修改java里面的内容为你想要的内容</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 3、使用 mc 把你的java 编译成 class</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">mc</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> /WkDataController.java</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -d</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> /</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 4、把新的class 加载到JVM中去</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">retransform</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> /cn/data/process/api/web/WkDataController.class</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h3 id="_2-4、监控线上代码" tabindex="-1"><a class="header-anchor" href="#_2-4、监控线上代码"><span>2-4、监控线上代码</span></a></h3><ol><li>monitor 间隔N秒，统计 某个方法 成功次数、失败次数、平均耗时、失败率</li><li>stack 打印整个栈的信息，太长了感觉没啥用</li><li>trace 监控某个方法各个步骤的耗时</li></ol><h4 id="_1、monitor" tabindex="-1"><a class="header-anchor" href="#_1、monitor"><span>1、monitor</span></a></h4><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 每隔 5s 监控一下WkDataController 类的 test 方法</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">monitor</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -c</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 5</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> cn.data.process.api.web.WkDataController</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> test</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+c+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure>',9),b=i('<h4 id="_2、stack" tabindex="-1"><a class="header-anchor" href="#_2、stack"><span>2、stack</span></a></h4><p>打印整个栈的信息，太长了感觉没啥用</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">stack</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> cn.data.process.api.web.WkDataController</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> test2</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>',3),v=i(`<h4 id="_3、trace-排查慢接口好帮手" tabindex="-1"><a class="header-anchor" href="#_3、trace-排查慢接口好帮手"><span>3、trace （排查慢接口好帮手）</span></a></h4><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 监控一下WkDataController 类的 test 方法的执行耗时</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">trace</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> cn.data.process.api.web.WkDataController</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> test</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+o+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure>',3),m=i(`<h4 id="_4、参数过滤" tabindex="-1"><a class="header-anchor" href="#_4、参数过滤"><span>4、参数过滤</span></a></h4><ol><li>https://github.com/alibaba/arthas/issues/71</li><li>https://github.com/alibaba/arthas/issues/11</li></ol><p>上面的监控虽然很好，但在实际的项目中，我们的访问量很大，我们想要监控某个请求这时候通过参数过滤将会是完美的方案。</p><h5 id="_4-1、监控某个参数的值" tabindex="-1"><a class="header-anchor" href="#_4-1、监控某个参数的值"><span>4-1、监控某个参数的值</span></a></h5><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">GetMapping</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;/test1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> test1</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">RequestParam</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> String</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> str</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> @</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">RequestParam</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> Integer</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> age)  {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">    System</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">out</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">println</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(str </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">+</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;  &quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> +</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> age);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"># 监控 str </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">==</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> zxc</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">trace </span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">cn</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">data</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">process</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">api</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">web</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">WkDataController</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> test1 </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;params[0] == &#39;zxc&#39;&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"># 监控 age </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&gt;=</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">trace </span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">cn</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">data</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">process</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">api</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">web</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">WkDataController</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> test1 </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;params[1] &gt;= 1&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">PostMapping</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;/test2&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> test2</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">RequestBody</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> TestDTO</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> testDTO) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">    System</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">out</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">println</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">testDTO</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">getName</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">+</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;  &quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> +</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> testDTO</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">getAge</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">());</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"># 监控 name </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">==</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 111</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">trace </span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">cn</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">data</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">process</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">api</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">web</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">WkDataController</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> test2 </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;params[0].name == &#39;111&#39;&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),u=i(`<h3 id="_2-5、修改日志的级别" tabindex="-1"><a class="header-anchor" href="#_2-5、修改日志的级别"><span>2-5、修改日志的级别</span></a></h3><p>Arthas 支持修改每个类的日志级别，这里只演示修改整个系统的日志级别 https://arthas.aliyun.com/doc/logger.html</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 1、查看日志信息</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">logger</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 2、修改日志的隔离级别</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">logger</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> --name</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> ROOT</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> --level</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> debug</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3);function B(C,F){const n=l("font"),a=l("BR");return p(),h("div",null,[y,k("p",null,[e("修改的原理就是 把 "),s(n,{color:"red"},{default:r(()=>[e("新的class 加载到JVM 里面去")]),_:1}),e("，生成 class的方式有2种")]),E,s(a),b,s(a),v,s(a),m,s(a),u])}const D=t(g,[["render",B],["__file","java线上问题排查工具——Arthas.html.vue"]]),_=JSON.parse('{"path":"/15JVM/java%E7%BA%BF%E4%B8%8A%E9%97%AE%E9%A2%98%E6%8E%92%E6%9F%A5%E5%B7%A5%E5%85%B7%E2%80%94%E2%80%94Arthas.html","title":"【初】Arthas 线上排查问题好帮手","lang":"zh-CN","frontmatter":{"title":"【初】Arthas 线上排查问题好帮手","shortTitle":"【初】Arthas 线上排查问题好帮手","index":true,"date":"2022-12-28T21:12:43.000Z","category":["初级","视频讲解"],"tag":["工具"],"order":1,"description":"视频讲解 https://www.bilibili.com/video/BV1FD4y1j73p 官方文档 https://arthas.aliyun.com/doc/ 一、安装 二、场景 2-1、查看当前服务运行的参数 JVM、内存、启动参数等 1、memory 查看当前堆和非堆的内存使用情况 在这里插入图片描述 2、thread 3、查看当前类的方...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/15JVM/java%E7%BA%BF%E4%B8%8A%E9%97%AE%E9%A2%98%E6%8E%92%E6%9F%A5%E5%B7%A5%E5%85%B7%E2%80%94%E2%80%94Arthas.html"}],["meta",{"property":"og:site_name","content":"小道仙Java笔记"}],["meta",{"property":"og:title","content":"【初】Arthas 线上排查问题好帮手"}],["meta",{"property":"og:description","content":"视频讲解 https://www.bilibili.com/video/BV1FD4y1j73p 官方文档 https://arthas.aliyun.com/doc/ 一、安装 二、场景 2-1、查看当前服务运行的参数 JVM、内存、启动参数等 1、memory 查看当前堆和非堆的内存使用情况 在这里插入图片描述 2、thread 3、查看当前类的方..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-23T14:12:53.000Z"}],["meta",{"property":"article:author","content":"小道仙97"}],["meta",{"property":"article:tag","content":"工具"}],["meta",{"property":"article:published_time","content":"2022-12-28T21:12:43.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-23T14:12:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"【初】Arthas 线上排查问题好帮手\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-12-28T21:12:43.000Z\\",\\"dateModified\\":\\"2024-07-23T14:12:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小道仙97\\",\\"url\\":\\"https://java.xdx97.com\\"}]}"]]},"headers":[{"level":2,"title":"一、安装","slug":"一、安装","link":"#一、安装","children":[]},{"level":2,"title":"二、场景","slug":"二、场景","link":"#二、场景","children":[{"level":3,"title":"2-1、查看当前服务运行的参数 JVM、内存、启动参数等","slug":"_2-1、查看当前服务运行的参数-jvm、内存、启动参数等","link":"#_2-1、查看当前服务运行的参数-jvm、内存、启动参数等","children":[]},{"level":3,"title":"2-2、查看线上源码","slug":"_2-2、查看线上源码","link":"#_2-2、查看线上源码","children":[]},{"level":3,"title":"2-3、修改线上源码","slug":"_2-3、修改线上源码","link":"#_2-3、修改线上源码","children":[]},{"level":3,"title":"2-4、监控线上代码","slug":"_2-4、监控线上代码","link":"#_2-4、监控线上代码","children":[]},{"level":3,"title":"2-5、修改日志的级别","slug":"_2-5、修改日志的级别","link":"#_2-5、修改日志的级别","children":[]}]}],"git":{"createdTime":1721461625000,"updatedTime":1721743973000,"contributors":[{"name":"ziyangtao","email":"ziyangtao@distinctclinic.com","commits":1}]},"readingTime":{"minutes":2.88,"words":865},"filePathRelative":"15JVM/java线上问题排查工具——Arthas.md","localizedDate":"2022年12月29日","excerpt":"<ol>\\n<li>视频讲解  <a href=\\"https://www.bilibili.com/video/BV1FD4y1j73p\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://www.bilibili.com/video/BV1FD4y1j73p</a></li>\\n<li>官方文档 https://arthas.aliyun.com/doc/</li>\\n</ol>\\n<br>\\n<h2>一、安装</h2>\\n<div class=\\"language-java line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"java\\" data-title=\\"java\\" style=\\"--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes github-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">curl </span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\">-</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">O</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\"> https</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">:</span><span style=\\"--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">//arthas.aliyun.com/arthas-boot.jar</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">java </span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\">-</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">jar arthas</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\">-</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">boot</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">jar</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">curl </span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\">-</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">L</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\"> https</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">:</span><span style=\\"--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">//arthas.aliyun.com/install.sh | sh</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{D as comp,_ as data};
