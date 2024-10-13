import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as l,e,f as i,a as n,w as h,b as s,r,o as d}from"./app-BRh3vv8H.js";const p="/assets/15_12-Cj7oHCii.png",k="/assets/15_13-Dy9AMVhu.png",g="/assets/15_14-rHuDH1Ek.png",y="/assets/15_15-DOl0S2eI.png",C="/assets/15_16-CMDgjs-L.png",o="/assets/15_17-Cx6_2-3Y.png",c="/assets/15_18-DuEVxIRm.png",F={},m=s('<ul><li><a href="https://www.bilibili.com/video/BV1qa4y1C7KA" target="_blank" rel="noopener noreferrer">视频讲解地址</a></li></ul><br><h1 id="一、开始" tabindex="-1"><a class="header-anchor" href="#一、开始"><span>一、开始</span></a></h1><br><p>查看当前JDK版本所支持的垃圾回收器有哪些、以及默认使用的回收器</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">java </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">XX</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">:</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">PrintFlagsFinal </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">version </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">|</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> grep </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">E </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">\\&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">Use.*GC</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">\\&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><br><p><strong>JDK8和JDK11运行上述命令结果如下：</strong></p><figure><img src="'+p+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><p><strong>各种组合GC的开关</strong></p><table><thead><tr><th style="text-align:left;">名称</th><th style="text-align:left;">描述</th></tr></thead><tbody><tr><td style="text-align:left;">UseSerialGC</td><td style="text-align:left;">年轻代和老年代都用串行收集器</td></tr><tr><td style="text-align:left;">UseParNewGC</td><td style="text-align:left;">年轻代使用ParNew，老年代使用 Serial Old</td></tr><tr><td style="text-align:left;">UseParallelGC</td><td style="text-align:left;">年轻代使用Paraller Scavenge，老年代使用Serial Old</td></tr><tr><td style="text-align:left;">UseParallelOldGC</td><td style="text-align:left;">新生代Paraller Scavenge，老年代使用Paraller Old</td></tr><tr><td style="text-align:left;">UseConcMarkSweepGC</td><td style="text-align:left;">表示年轻代使用ParNew，老年代的用CMS + Serial Old</td></tr><tr><td style="text-align:left;">UseG1GC</td><td style="text-align:left;">使用G1垃圾回收器</td></tr></tbody></table><br><ol><li>JDK8 默认是 Paraller Scavenge + Paraller Old ，JDK11默认是 G1 （其实JDK9开始默认是G1）。</li><li>在JDK11里面没有看到 ParNew，是因为 ParNew+Serial Old 这个组合已经不存在了。</li></ol><br><p>注：</p><ol><li>垃圾回收器和JDK的版本是有关系的，但目前主流的版本是8和11，所以此次学习也是用这两个版本</li><li>8和11默认的回收器分别是UseParallelGC和G1，既如此我们就深入理解它们</li><li>理解垃圾回收器无非是理论+各种参数，理论上篇已经解释了，此次就来看看这两款收集器的核心配置参数</li></ol><br><h1 id="二、常用命令" tabindex="-1"><a class="header-anchor" href="#二、常用命令"><span>二、常用命令</span></a></h1><br><h2 id="_1、原生命令" tabindex="-1"><a class="header-anchor" href="#_1、原生命令"><span>1、原生命令</span></a></h2><br><p>注：pid 可以使用 jps/jcmd 查看</p><table><thead><tr><th>命令</th><th>描述</th><th>结果</th></tr></thead><tbody><tr><td>jcmd pid VM.flags</td><td>查看当前JVM参数</td><td><img src="'+k+'" alt="在这里插入图片描述" loading="lazy"></td></tr><tr><td>jmap -heap pid</td><td>查看当前堆信息（JDK11用不了）</td><td><img src="'+g+'" alt="在这里插入图片描述" loading="lazy"></td></tr><tr><td>jcmd pid GC.heap_info</td><td>查看各个区域内存使用情况，可以看Metaspace、和class space</td><td><img src="'+y+'" alt="在这里插入图片描述" loading="lazy"></td></tr><tr><td>jstat -gc pid</td><td>查看内存使用情况、且可以看到GC频率</td><td><img src="'+C+'" alt="在这里插入图片描述" loading="lazy"></td></tr></tbody></table><br><p>注： jstat -gc 结果描述</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> `</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">S0C</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">`</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 第一个幸存区（Survivor</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 0）的容量（Capacity）。</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> `</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">S1C</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">`</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 第二个幸存区（Survivor</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 1）的容量。</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> `</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">S0U</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">`</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 第一个幸存区的使用量（Used）。</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> `</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">S1U</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">`</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 第二个幸存区的使用量。</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> `</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">EC</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">`</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> Eden</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 区的容量。</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> `</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">EU</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">`</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> Eden</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 区的使用量。</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> `</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">OC</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">`</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 老年代的容量。</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> `</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">OU</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">`</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 老年代的使用量。</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> `</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">MC</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">`</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 元空间（Metaspace）的容量。</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> `</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">MU</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">`</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 元空间的使用量。</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> `</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">CCSC</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">`</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 压缩类空间的容量。</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> `</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">CCSU</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">`</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 压缩类空间的使用量。</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> `</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">YGC</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">`</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 年轻代垃圾回收的次数。</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> `</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">YGCT</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">`</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 年轻代垃圾回收的总时间。</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> `</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">FGC</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">`</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 老年代垃圾回收的次数。</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> `</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">FGCT</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">`</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 老年代垃圾回收的总时间。</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> `</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">CGC</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">`</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 全局垃圾回收的次数。</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> `</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">CGCT</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">`</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 全局垃圾回收的总时间。</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> `</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">GCT</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">`</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 所有垃圾回收的总时间。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h2 id="_2、arthas命令" tabindex="-1"><a class="header-anchor" href="#_2、arthas命令"><span>2、arthas命令</span></a></h2><table><thead><tr><th>命令</th><th>描述</th><th>图视</th></tr></thead><tbody><tr><td>memory</td><td>查看内存使用情况</td><td><img src="'+o+'" alt="在这里插入图片描述" loading="lazy"></td></tr></tbody></table><br>',31),b=s('<br><h1 id="三、parallel" tabindex="-1"><a class="header-anchor" href="#三、parallel"><span>三、Parallel</span></a></h1><br><p>查看某个参数的值：jinfo -flag ParallelGCThreads pid</p><table><thead><tr><th style="text-align:left;">参数</th><th style="text-align:left;">描述</th></tr></thead><tbody><tr><td style="text-align:left;">ParallelGCThreads</td><td style="text-align:left;">设置用于垃圾回收的线程数，通常设置为处理器数量的几倍。</td></tr><tr><td style="text-align:left;">MaxGCPauseMillis</td><td style="text-align:left;">设置期望的最大垃圾收集停顿时间，Parallel GC会尝试调整各种参数以满足这个目标。</td></tr><tr><td style="text-align:left;">GCTimeRatio</td><td style="text-align:left;">设置垃圾收集时间占总时间的比例。值为n，表示垃圾收集时间占总时间的1/(1+n)。比如19表示垃圾收集时间占总时间的1/20。</td></tr><tr><td style="text-align:left;">UseAdaptiveSizePolicy</td><td style="text-align:left;">当这个参数激活后，就不需要人工指定新生代的大小、Eden和Survivor区的比例、晋升老年代对象的大小，虚拟机会动态的调整。</td></tr></tbody></table><br><h1 id="四、g1-相关参数" tabindex="-1"><a class="header-anchor" href="#四、g1-相关参数"><span>四、G1 相关参数</span></a></h1><br><p>查看某个参数的值：jinfo -flag G1HeapRegionSize pid</p><table><thead><tr><th style="text-align:left;">参数</th><th style="text-align:left;">描述</th><th style="text-align:left;">备注</th></tr></thead><tbody><tr><td style="text-align:left;">G1HeapRegionSize</td><td style="text-align:left;">设置Region大小，并非最终值，会按照实际空间来看</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">MaxGCPauseMillis</td><td style="text-align:left;">设置G1收集过程目标时间，默认 200ms</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">G1NewSizePercent</td><td style="text-align:left;">新生代最小值</td><td style="text-align:left;">在我这个版本JDK没有这个参数</td></tr><tr><td style="text-align:left;">G1MaxNewSizePercent</td><td style="text-align:left;">新生代最大值，默认值60%</td><td style="text-align:left;">在我这个版本JDK没有这个参数</td></tr><tr><td style="text-align:left;">ParallelGCThreads</td><td style="text-align:left;">STW期间，并行GC线程数</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">ConcGCThreads</td><td style="text-align:left;">并发标记阶段，并行执行的线程数</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">InitiatingHeapOccupancyPercent</td><td style="text-align:left;">设置触发标记周期的 Java 堆占用率阈值。默认值是45%。这里的java堆占比指的是non_young_capacity_bytes，包括old+humongous</td><td style="text-align:left;"></td></tr></tbody></table><figure><img src="'+c+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><h1 id="五、通用参数" tabindex="-1"><a class="header-anchor" href="#五、通用参数"><span>五、通用参数</span></a></h1><br><table><thead><tr><th style="text-align:left;">参数</th><th style="text-align:left;">描述</th></tr></thead><tbody><tr><td style="text-align:left;">Xmx</td><td style="text-align:left;">设置JVM的最大堆内存大小。</td></tr><tr><td style="text-align:left;">Xms</td><td style="text-align:left;">设置JVM的初始堆内存大小。</td></tr><tr><td style="text-align:left;">Xmn</td><td style="text-align:left;">设置新生代的大小。新生代包含Eden区和两个Survivor区</td></tr><tr><td style="text-align:left;">Xss</td><td style="text-align:left;">设置每个线程的堆栈大小。</td></tr><tr><td style="text-align:left;">SurvivorRatio</td><td style="text-align:left;">设置Eden区与Survivor区的大小比例。</td></tr><tr><td style="text-align:left;">MaxPermSize / MaxMetaspaceSize</td><td style="text-align:left;">设置永久代（PermGen）或元空间（Metaspace）的最大大小。</td></tr></tbody></table><br><h1 id="六、jvm调优参数" tabindex="-1"><a class="header-anchor" href="#六、jvm调优参数"><span>六、JVM调优参数</span></a></h1><br><p>所谓的JVM调优，就是为了保证我们系统的稳定运行</p><ol><li>设置各个内存区域的大小和占比【五】</li><li>选定合适的垃圾回收器（基本都是用默认的）</li><li>当前系统关注的是快速回收还是吞吐量，基于此去设置 Parallel 和 G1的相关参数</li></ol>',20);function f(v,E){const t=r("RouteLink");return d(),l("div",null,[m,e("p",null,[i("想了解arthas的小伙伴可以看这个： "),n(t,{to:"/15JVM/java%E7%BA%BF%E4%B8%8A%E9%97%AE%E9%A2%98%E6%8E%92%E6%9F%A5%E5%B7%A5%E5%85%B7%E2%80%94%E2%80%94Arthas.html"},{default:h(()=>[i("java线上问题排查工具——Arthas")]),_:1})]),b])}const A=a(F,[["render",f],["__file","JVM内存调优常用参数.html.vue"]]),_=JSON.parse(`{"path":"/15JVM/JVM%E5%86%85%E5%AD%98%E8%B0%83%E4%BC%98%E5%B8%B8%E7%94%A8%E5%8F%82%E6%95%B0.html","title":"【中】JVM内存调优常用参数","lang":"zh-CN","frontmatter":{"title":"【中】JVM内存调优常用参数","shortTitle":"【中】JVM内存调优常用参数","index":true,"date":"2024-01-28T22:16:19.000Z","category":["中级","视频讲解"],"tag":["JVM"],"order":4,"description":"视频讲解地址 一、开始 查看当前JDK版本所支持的垃圾回收器有哪些、以及默认使用的回收器 JDK8和JDK11运行上述命令结果如下： 在这里插入图片描述在这里插入图片描述 各种组合GC的开关 JDK8 默认是 Paraller Scavenge + Paraller Old ，JDK11默认是 G1 （其实JDK9开始默认是G1）。 在JDK11里面没...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/15JVM/JVM%E5%86%85%E5%AD%98%E8%B0%83%E4%BC%98%E5%B8%B8%E7%94%A8%E5%8F%82%E6%95%B0.html"}],["meta",{"property":"og:site_name","content":"小道仙Java笔记"}],["meta",{"property":"og:title","content":"【中】JVM内存调优常用参数"}],["meta",{"property":"og:description","content":"视频讲解地址 一、开始 查看当前JDK版本所支持的垃圾回收器有哪些、以及默认使用的回收器 JDK8和JDK11运行上述命令结果如下： 在这里插入图片描述在这里插入图片描述 各种组合GC的开关 JDK8 默认是 Paraller Scavenge + Paraller Old ，JDK11默认是 G1 （其实JDK9开始默认是G1）。 在JDK11里面没..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-23T14:12:53.000Z"}],["meta",{"property":"article:author","content":"小道仙97"}],["meta",{"property":"article:tag","content":"JVM"}],["meta",{"property":"article:published_time","content":"2024-01-28T22:16:19.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-23T14:12:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"【中】JVM内存调优常用参数\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-01-28T22:16:19.000Z\\",\\"dateModified\\":\\"2024-07-23T14:12:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小道仙97\\",\\"url\\":\\"https://java.xdx97.com\\"}]}"]]},"headers":[{"level":2,"title":"1、原生命令","slug":"_1、原生命令","link":"#_1、原生命令","children":[]},{"level":2,"title":"2、arthas命令","slug":"_2、arthas命令","link":"#_2、arthas命令","children":[]}],"git":{"createdTime":1721743973000,"updatedTime":1721743973000,"contributors":[{"name":"ziyangtao","email":"ziyangtao@distinctclinic.com","commits":1}]},"readingTime":{"minutes":4.44,"words":1331},"filePathRelative":"15JVM/JVM内存调优常用参数.md","localizedDate":"2024年1月29日","excerpt":"<ul>\\n<li><a href=\\"https://www.bilibili.com/video/BV1qa4y1C7KA\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">视频讲解地址</a></li>\\n</ul>\\n<br>\\n<h1>一、开始</h1>\\n<br>\\n<p>查看当前JDK版本所支持的垃圾回收器有哪些、以及默认使用的回收器</p>\\n<div class=\\"language-java line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"java\\" data-title=\\"java\\" style=\\"--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes github-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">java </span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\">-</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">XX</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">:</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\">+</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">PrintFlagsFinal </span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\">-</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">version </span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\">|</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\"> grep </span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\">-</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">E </span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">'</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#56B6C2\\">\\\\&lt;</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">Use.*GC</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#56B6C2\\">\\\\&gt;</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">'</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{A as comp,_ as data};
