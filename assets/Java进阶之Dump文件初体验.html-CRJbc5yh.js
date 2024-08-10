import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as i,d as a}from"./app-DTFy3zAf.js";const s="/assets/15_8-C5yND3Nv.png",l="/assets/15_9-rcLk-Nsr.png",n="/assets/15_10-Dps1hf-2.png",p="/assets/15_11-DRYz_ztc.png",d={},r=a('<p>视频地址：<a href="https://www.bilibili.com/video/BV1Ak4y137oh" target="_blank" rel="noopener noreferrer">https://www.bilibili.com/video/BV1Ak4y137oh</a></p><br><p>最近线上频繁的内存告警，同事A通过分析dump文件解决了这个问题，我当然是不会放过这种学习的机会。</p><br><h2 id="一、分析dump文件" tabindex="-1"><a class="header-anchor" href="#一、分析dump文件"><span>一、分析dump文件</span></a></h2><br><h3 id="_1、下载dump文件" tabindex="-1"><a class="header-anchor" href="#_1、下载dump文件"><span>1、下载dump文件</span></a></h3><table><thead><tr><th style="text-align:left;">步骤</th><th style="text-align:left;">命令</th><th style="text-align:left;">描述</th></tr></thead><tbody><tr><td style="text-align:left;">找到Java服务</td><td style="text-align:left;">jps</td><td style="text-align:left;">找到需要观察的Java服务进程。 也可以使用 ps -ef grep java <br><br> 1. jps 属于JDK提供的命令 <br> 2. ps 是Linux提供的命令</td></tr><tr><td style="text-align:left;">生成dump文件</td><td style="text-align:left;">jmap</td><td style="text-align:left;">jmap -dump:file=/tmp/xdx_dump.bin 1 <br><br> 上面命令的含义就是在 /tmp 目录下生成一个名为 xdx_dump 的文件，格式为 bin，java服务的进程 1</td></tr><tr><td style="text-align:left;">压缩dump文件</td><td style="text-align:left;">tar</td><td style="text-align:left;">在真实线上生成的 dump 文件都很大，所以我们需要把它压缩成 tar.gz 文件，可以减少6倍以上的大小。 <br> <br>tar -zcvf xdx_dump_one.tar.gz xdx_dump_one.bin <br> <br> 上面命令的含义就是 把当前目录下的xdx_dump_one.bin文件，压缩成 xdx_dump_one.tar.gz 文件</td></tr></tbody></table><br><h3 id="_2、查看dump文件" tabindex="-1"><a class="header-anchor" href="#_2、查看dump文件"><span>2、查看dump文件</span></a></h3><br><p>可以通过两种方式获取查看dump文件的软件</p><ol><li>官网下载，可以拿到最新版本。 https://visualvm.github.io/</li><li>在JDK的 home/bin 目录下已经带了这个工具，并且还是中文的。</li></ol><br><p>从服务器上下载压缩后的dump文件，拿到本地后再解压出来，双击打开 visualvm，把解压好的bin文件拖进去。然后你就可以看到堆中的数据信息了。</p><figure><img src="'+s+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><h3 id="_3、分析dump文件" tabindex="-1"><a class="header-anchor" href="#_3、分析dump文件"><span>3、分析dump文件</span></a></h3><br><figure><img src="'+l+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><p>毫无疑问，内存飙升，我们只需要看看当前系统中内存占比最大的是个什么东西，然后想办法干掉它。</p><figure><img src="'+n+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><h2 id="二、扩展-jvm内存结构-回收规则" tabindex="-1"><a class="header-anchor" href="#二、扩展-jvm内存结构-回收规则"><span>二、扩展：JVM内存结构，回收规则</span></a></h2><br><p>为了方便理解后面实战的部分，需要准备一点前置知识：JVM内存结构和回收机制。</p><p>Hotspot VM将内存划分为不同的三个物理区：新生代、老年代、永久代。其中新生代又被分成Edun区和两个Survivor区。</p><figure><img src="'+p+`" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><table><thead><tr><th style="text-align:left;"></th><th style="text-align:left;">描述</th></tr></thead><tbody><tr><td style="text-align:left;">新生代</td><td style="text-align:left;">大多数对象在这里被创建，其中很多对象的生命周期很短。每次新生代的垃圾回收（又称Minor GC）后只有少量对象存活，所以选用复制算法，只需要少量的复制成本就可以完成回收。 <br><br>新生代内又分三个区：一个Eden区，两个Survivor区（一般而言），大部分对象在Eden区中生成。当Eden区满时，还存活的对象将被复制到两个Survivor区（中的一个）。当这个Survivor区满时，此区的存活且不满足“晋升”条件的对象将被复制到另外一个Survivor区。对象每经历一次Minor GC，年龄加1，达到“晋升年龄阈值”后，被放到老年代，这个过程也称为“晋升”。显然，“晋升年龄阈值”的大小直接影响着对象在新生代中的停留时间。</td></tr><tr><td style="text-align:left;">老年代</td><td style="text-align:left;">在新生代中经历了N次垃圾回收后仍然存活的对象，就会被放到年老代，该区域中对象存活率高。老年代的垃圾回收（又称Major GC）通常使用“标记-清理”或“标记-整理”算法。整堆包括新生代和老年代的垃圾回收称为Full GC（HotSpot VM里，除了CMS之外，其它能收集老年代的GC都会同时收集整个GC堆，包括新生代）。</td></tr><tr><td style="text-align:left;">永久代</td><td style="text-align:left;">要存放元数据，例如Class、Method的元信息，与垃圾回收要回收的Java对象关系不大。相对于新生代和年老代来说，该区域的划分对垃圾回收影响比较小。</td></tr></tbody></table><br><p><strong>Minor GC 的频率远高于Major GC，所以对象一旦到达老年代，它存活的时间会更长。</strong></p><br><h2 id="三、实战" tabindex="-1"><a class="header-anchor" href="#三、实战"><span>三、实战</span></a></h2><br><p>在我们查看dump文件的时候，发现内存占用前几名（比例很大）都是日志输出的对象。伪代码如下：</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">List</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">XdxDTO</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> list </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;"> this</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">baseMapper</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">getAllList</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">info</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;当前数据为:{}&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">JSONUtil</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">toJsonStr</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(list));</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><br><p>正常来说在方法里面返回的数据都属于局部变量，当方法执行完毕之后就没有引用会被回收。</p><br><p>但使用log输出的时候，它是异步输出的，消费能力不足的时候，就会把任务丢到阻塞队列里面去，如果某个大对象这时候在阻塞队列等待执行，恰好Edun区满了要被回收的时候，日志还没输出相当于还有引用这个数据，就不会被回收，如果系统持续压力过大，经过几轮Minor GC还没用回收，这个对象就会被放老年代，更难以回收了， 从而导致了内存OOM。</p>`,42),h=[r];function o(m,g){return i(),e("div",null,h)}const b=t(d,[["render",o],["__file","Java进阶之Dump文件初体验.html.vue"]]),k=JSON.parse('{"path":"/15JVM/Java%E8%BF%9B%E9%98%B6%E4%B9%8BDump%E6%96%87%E4%BB%B6%E5%88%9D%E4%BD%93%E9%AA%8C.html","title":"【中】Java进阶之Dump文件初体验","lang":"zh-CN","frontmatter":{"title":"【中】Java进阶之Dump文件初体验","shortTitle":"【中】Java进阶之Dump文件初体验","index":true,"date":"2023-07-30T19:29:50.000Z","category":["中级","视频讲解"],"order":2,"description":"视频地址：https://www.bilibili.com/video/BV1Ak4y137oh 最近线上频繁的内存告警，同事A通过分析dump文件解决了这个问题，我当然是不会放过这种学习的机会。 一、分析dump文件 1、下载dump文件 2、查看dump文件 可以通过两种方式获取查看dump文件的软件 官网下载，可以拿到最新版本。 https://...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/15JVM/Java%E8%BF%9B%E9%98%B6%E4%B9%8BDump%E6%96%87%E4%BB%B6%E5%88%9D%E4%BD%93%E9%AA%8C.html"}],["meta",{"property":"og:site_name","content":"小道仙Java笔记"}],["meta",{"property":"og:title","content":"【中】Java进阶之Dump文件初体验"}],["meta",{"property":"og:description","content":"视频地址：https://www.bilibili.com/video/BV1Ak4y137oh 最近线上频繁的内存告警，同事A通过分析dump文件解决了这个问题，我当然是不会放过这种学习的机会。 一、分析dump文件 1、下载dump文件 2、查看dump文件 可以通过两种方式获取查看dump文件的软件 官网下载，可以拿到最新版本。 https://..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-23T14:12:53.000Z"}],["meta",{"property":"article:author","content":"小道仙97"}],["meta",{"property":"article:published_time","content":"2023-07-30T19:29:50.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-23T14:12:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"【中】Java进阶之Dump文件初体验\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-07-30T19:29:50.000Z\\",\\"dateModified\\":\\"2024-07-23T14:12:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小道仙97\\",\\"url\\":\\"https://java.xdx97.com\\"}]}"]]},"headers":[{"level":2,"title":"一、分析dump文件","slug":"一、分析dump文件","link":"#一、分析dump文件","children":[{"level":3,"title":"1、下载dump文件","slug":"_1、下载dump文件","link":"#_1、下载dump文件","children":[]},{"level":3,"title":"2、查看dump文件","slug":"_2、查看dump文件","link":"#_2、查看dump文件","children":[]},{"level":3,"title":"3、分析dump文件","slug":"_3、分析dump文件","link":"#_3、分析dump文件","children":[]}]},{"level":2,"title":"二、扩展：JVM内存结构，回收规则","slug":"二、扩展-jvm内存结构-回收规则","link":"#二、扩展-jvm内存结构-回收规则","children":[]},{"level":2,"title":"三、实战","slug":"三、实战","link":"#三、实战","children":[]}],"git":{"createdTime":1721461625000,"updatedTime":1721743973000,"contributors":[{"name":"ziyangtao","email":"ziyangtao@distinctclinic.com","commits":7}]},"readingTime":{"minutes":4.26,"words":1277},"filePathRelative":"15JVM/Java进阶之Dump文件初体验.md","localizedDate":"2023年7月31日","excerpt":"<p>视频地址：<a href=\\"https://www.bilibili.com/video/BV1Ak4y137oh\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://www.bilibili.com/video/BV1Ak4y137oh</a></p>\\n<br>\\n<p>最近线上频繁的内存告警，同事A通过分析dump文件解决了这个问题，我当然是不会放过这种学习的机会。</p>\\n<br>\\n<h2>一、分析dump文件</h2>\\n<br>\\n<h3>1、下载dump文件</h3>\\n<table>\\n<thead>\\n<tr>\\n<th style=\\"text-align:left\\">步骤</th>\\n<th style=\\"text-align:left\\">命令</th>\\n<th style=\\"text-align:left\\">描述</th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td style=\\"text-align:left\\">找到Java服务</td>\\n<td style=\\"text-align:left\\">jps</td>\\n<td style=\\"text-align:left\\">找到需要观察的Java服务进程。 也可以使用 ps -ef grep java <br><br> 1. jps  属于JDK提供的命令 <br> 2. ps  是Linux提供的命令</td>\\n</tr>\\n<tr>\\n<td style=\\"text-align:left\\">生成dump文件</td>\\n<td style=\\"text-align:left\\">jmap</td>\\n<td style=\\"text-align:left\\">jmap -dump:file=/tmp/xdx_dump.bin 1 <br><br> 上面命令的含义就是在 /tmp 目录下生成一个名为 xdx_dump 的文件，格式为 bin，java服务的进程 1</td>\\n</tr>\\n<tr>\\n<td style=\\"text-align:left\\">压缩dump文件</td>\\n<td style=\\"text-align:left\\">tar</td>\\n<td style=\\"text-align:left\\">在真实线上生成的 dump 文件都很大，所以我们需要把它压缩成 tar.gz 文件，可以减少6倍以上的大小。 <br> <br>tar -zcvf xdx_dump_one.tar.gz xdx_dump_one.bin <br> <br> 上面命令的含义就是 把当前目录下的xdx_dump_one.bin文件，压缩成 xdx_dump_one.tar.gz 文件</td>\\n</tr>\\n</tbody>\\n</table>","autoDesc":true}');export{b as comp,k as data};
