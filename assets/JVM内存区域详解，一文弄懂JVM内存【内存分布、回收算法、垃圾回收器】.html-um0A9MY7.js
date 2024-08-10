import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as l,e as i,d as t,o as a}from"./app-DTFy3zAf.js";const n="/assets/15_1-CxXd_G0q.png",r="/assets/15_2-By-IeCyj.png",d="/assets/15_3-D1vKe3wL.png",s="/assets/15_4-DUKx6fGc.png",g="/assets/15_5-DOJduNQE.png",o="/assets/15_6-CX9Mypqx.png",f="/assets/15_7-NnnKEiB0.png",y={},x=t('<p><a href="https://www.bilibili.com/video/BV1j64y1N7c4" target="_blank" rel="noopener noreferrer">视频讲解地址</a></p><p><a href="https://d9bp4nr5ye.feishu.cn/wiki/IfjBwSCoKityeMkPsYocSFwWnje" target="_blank" rel="noopener noreferrer">学习文档</a></p><br><h2 id="一、内存区域" tabindex="-1"><a class="header-anchor" href="#一、内存区域"><span>一、内存区域</span></a></h2><figure><img src="'+n+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><table><thead><tr><th style="text-align:left;">区域</th><th style="text-align:left;">描述</th><th style="text-align:left;">线程私有</th><th style="text-align:left;">如何溢出</th></tr></thead><tbody><tr><td style="text-align:left;">程序计数器</td><td style="text-align:left;">为了线程切换后能恢复到正确的执行位置，每个线程都要有一个独立的程序计数器。</td><td style="text-align:left;">✅</td><td style="text-align:left;">唯一一个不会内存溢出的地方</td></tr><tr><td style="text-align:left;">虚拟机栈</td><td style="text-align:left;">1. 每个方法执行的时候，Java虚拟机都会同步创建一个栈帧用于存储局部变量表、操作数栈、方法出口等信息。 <br> 2. 每一个方法从调用到执行完毕都对应着一个栈帧在虚拟机栈中从入栈到出栈的过程。<br> 3. 局部变量表存储了编译期可知的各种Java基本数据类型和对象引用。</td><td style="text-align:left;">✅</td><td style="text-align:left;">1. 线程请求的栈深度大于虚拟机所允许的深度时抛出 StackOverFlowError异常。<br> 2. 栈扩容时无法申请到足够内存的时候抛出 OutOfMemoryError。</td></tr><tr><td style="text-align:left;">本地方法栈</td><td style="text-align:left;">和虚拟机栈类似，本地方法栈是为本地（Native）方法服务的</td><td style="text-align:left;">✅</td><td style="text-align:left;">同【虚拟机栈】</td></tr><tr><td style="text-align:left;">方法区</td><td style="text-align:left;">线程共享，用于存放被虚拟机加载后的类型信息、常量、静态变量、即时编译器编译后的代码缓存数据。 <br> 注：运行时常量池、元空间都属于方法区的一部分。</td><td style="text-align:left;">❌</td><td style="text-align:left;">无法满足新的内存分配会抛出 OutOfMemoryError</td></tr><tr><td style="text-align:left;">堆（垃圾收集的主要区域）</td><td style="text-align:left;">1. 基本上所有的对象都是在堆上分配的。 <br> 2. Java堆可以处于物理上不连续的内存空间中，但在逻辑上它应该被视为连续的。</td><td style="text-align:left;">❌</td><td style="text-align:left;">无法满足新的内存分配会抛出 OutOfMemoryError</td></tr><tr><td style="text-align:left;">直接内存</td><td style="text-align:left;">NIO通过使用Native函数库直接分配对外内存。不受Java堆大小限制，但是受机器的物理内存限制。</td><td style="text-align:left;">❌</td><td style="text-align:left;">无法满足新的内存分配会抛出 OutOfMemoryError</td></tr></tbody></table><br><p>堆其实就是一大块内存区域，是用来存放对象的，对于一个应用来说最耗费内存的就是“对象”。因为在运行的过程中会创建无数个对象，所以内存回收（垃圾回收）的时候主要就是针对堆的垃圾进行回收。</p><br><p><strong>常见的堆划分是：</strong></p><ol><li>把堆分为新生代和老年代</li><li>新生代分为一个Eden区和两个Survivor区，它们的内存占比是 8:1:1</li><li>注：但G1却不是这样的，它把堆分成数个大小相同的Regin块</li></ol><br><h2 id="二、回收时机" tabindex="-1"><a class="header-anchor" href="#二、回收时机"><span>二、回收时机</span></a></h2><br><p>上面我们谈到内存空间，内存是有限的，想要健康持续的运行下去，就一定要回收“垃圾”。</p><p>那怎么判定一个对象是不是垃圾呢，就成了新的问题。</p><table><thead><tr><th style="text-align:left;">算法</th><th style="text-align:left;">描述</th><th style="text-align:left;">备注</th></tr></thead><tbody><tr><td style="text-align:left;">引用计数算法</td><td style="text-align:left;">当某个对象被引用的时候引用计数器就加一，引用失效时就减一，当没有引用的时候就说明可以被回收了。</td><td style="text-align:left;">几乎没有使用它的，因为它无法解决循环依赖的问题。</td></tr><tr><td style="text-align:left;">可达性分析</td><td style="text-align:left;">某些对象被定义为根（GC Roots），从GC Roots向下搜索的路径成为“引用链”，如果某个对象到GC Roots间没有任何引用，那说明它不可达，它就可以被回收了。</td><td style="text-align:left;">目前都是用这种算法。</td></tr></tbody></table><br><p><strong>GC Roots并不是一个固定的对象，它是一组对象：</strong></p><ol><li>在虚拟机栈引用的对象，譬如各个线程被调用的方法堆栈中使用到的参数、局部变量、临时变量等。</li><li>在方法区中类静态属性引用的对象，譬如Java类的引用类型静态变量。</li><li>在方法区中常量引用的对象，譬如字符串常量池里的引用。</li><li>在本地方法栈中JNI（即 Native方法）引用的对象。</li><li>Java虚拟机内部的引用，如基本数据类型对应的Class对象。</li><li>所有被同步锁（Sync）持有的对象。</li><li>除了这些固定的GC Roots，根据不同的垃圾回收器还可以有其他“临时性”地加入。</li></ol><br><p><strong>一个对象是否可以被回收，是要看有没有被GC Roots触达，而不是仅仅是 触达</strong></p><figure><img src="'+r+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><p><strong>不管是引用计数算法，还是可达性分析，都提到了引用。Java中的引用并不是简单的引用，它有四种不同的引用</strong></p><table><thead><tr><th style="text-align:left;">引用类型</th><th style="text-align:left;">描述</th></tr></thead><tbody><tr><td style="text-align:left;">强引用</td><td style="text-align:left;">被强引用的对象不会被回收。 new 的方式创建就是产生强引用。</td></tr><tr><td style="text-align:left;">软引用</td><td style="text-align:left;">被软应用的对象，只有在内存不足的时候才会被回收。</td></tr><tr><td style="text-align:left;">弱引用</td><td style="text-align:left;">被弱引用的对象，在下一次垃圾回收的时候就会被回收。</td></tr><tr><td style="text-align:left;">虚引用</td><td style="text-align:left;">虚引用又被称为幽灵引用，它和回收没太大关系，只是在回收的时候，会收到一个系统的通知。</td></tr></tbody></table><br><h2 id="三、回收算法" tabindex="-1"><a class="header-anchor" href="#三、回收算法"><span>三、回收算法</span></a></h2><br>',30),p=t('<br><table><thead><tr><th style="text-align:left;">名称</th><th style="text-align:left;">描述</th><th style="text-align:left;">优缺点</th></tr></thead><tbody><tr><td style="text-align:left;">标记-清除</td><td style="text-align:left;">标记所有未被引用的对象，在GC的时候清空它们。</td><td style="text-align:left;">优点：简单直观 <br> 缺点：会产生大量的内存碎片。如果下次需要分配一个大对象，没有连续空间的时候会提前触发GC。</td></tr><tr><td style="text-align:left;">标记-整理</td><td style="text-align:left;">标记所有被引用的对象，将还存活的对象移动到一端，然后清除边界外的内存。</td><td style="text-align:left;">优点：减少了内存碎片，相对于标记-清除减少了碎片化问题。 <br> 缺点：移动对象需要成本。</td></tr><tr><td style="text-align:left;">标记-复制</td><td style="text-align:left;">将内存划分成两个相同大小的块，每次只使用其中一块。当一块的内存用完了，就将还存活的对象复制到另外一块，然后再把之前那块空间清空。 <br><br> IBM公司有一项研究的结论是：新生代中98%的对象熬不过第一轮回收，所以不必按照 1:1 的比例来划分。<br> 新生代分为三个区：一个Eden、两个Survivor，对象优先分配在Eden区，每次只使用Eden和一个Survivor，在垃圾回收的时候把还存活的对象移动到另外一个没有被使用的Survivor中。如果Survivor区空间不够，会把对象移动到老年代。 <br><br> 注 <br> 1. 两个Survivor，在有的地方被称为From和 To，或 S0、S1 <br> 2. 默认情况下Eden和两个Survivor的比例是 8:1:1</td><td style="text-align:left;">优点：减少了内存碎片，适用于对象生命周期短的场景。 <br>缺点：空间浪费和复制成本。</td></tr></tbody></table><br><h2 id="四、回收器" tabindex="-1"><a class="header-anchor" href="#四、回收器"><span>四、回收器</span></a></h2><br><p>回收算法是理论，回收器是实践，不同回收器都是基于理论进行真正的实践，在讨论回收器之前需要先了解下面几个点</p><ol><li>STW：Stop The World 的缩写，意味着在GC的时候，其它线程无法工作。</li><li>并行、并发：多个GC线程一起工作就是并行，GC线程和用户线程一起工作就是并发。</li><li>吞吐量：<strong>运行用户代码时间 / 运行用户代码时间+垃圾回收时间</strong>，通过算法可以得出想要提高吞吐量，就必须减少垃圾回收耗时。</li></ol><br><p><strong>下面是各个回收器的作用域，连线表示它们可以组合使用，红色线表示JDK9已经不推荐了。</strong></p><figure><img src="'+d+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><table><thead><tr><th style="text-align:left;">名称</th><th style="text-align:left;">描述</th><th style="text-align:left;">效率</th><th style="text-align:left;">STW</th><th style="text-align:left;">回收算法</th><th style="text-align:left;">作用域</th><th style="text-align:left;">目标</th><th style="text-align:left;">使用场景</th></tr></thead><tbody><tr><td style="text-align:left;">Serial</td><td style="text-align:left;">它是单线程工作的，且在进行垃圾回收的时候，必须暂停所有的工作线程。</td><td style="text-align:left;">串行</td><td style="text-align:left;">是</td><td style="text-align:left;">标记-复制</td><td style="text-align:left;">新生代</td><td style="text-align:left;">快速的回收</td><td style="text-align:left;">1. 在客户端模式下的默认新生代收集器。 <br> 2. 对于内存资源不多的情况下，它是所有收集器里额外内存消耗最小的。</td></tr><tr><td style="text-align:left;">Serial Old</td><td style="text-align:left;">同上</td><td style="text-align:left;">串行</td><td style="text-align:left;">是</td><td style="text-align:left;">标记-整理</td><td style="text-align:left;">老年代</td><td style="text-align:left;">快速的回收</td><td style="text-align:left;">同上</td></tr><tr><td style="text-align:left;">ParNew</td><td style="text-align:left;">它支持多线程并行回收垃圾，其它与Serial收集器没什么大的差别。</td><td style="text-align:left;">并行</td><td style="text-align:left;">是</td><td style="text-align:left;">标记-复制</td><td style="text-align:left;">新生代</td><td style="text-align:left;">快速的回收</td><td style="text-align:left;">是除了Serial之外唯一可以和CMS收集器配合工作的。</td></tr><tr><td style="text-align:left;">Parallel Scavenge</td><td style="text-align:left;">它和ParNew有很多相似的地方，不同的是它关注的是 达到一个可控制的吞吐量。</td><td style="text-align:left;">并行</td><td style="text-align:left;">是</td><td style="text-align:left;">标记-复制</td><td style="text-align:left;">新生代</td><td style="text-align:left;">提高吞吐量</td><td style="text-align:left;">大规模的后台服务、批处理任务等，对吞吐量要求高的场景。</td></tr><tr><td style="text-align:left;">Parallel Old</td><td style="text-align:left;">同上</td><td style="text-align:left;">并行</td><td style="text-align:left;">是</td><td style="text-align:left;">标记-整理</td><td style="text-align:left;">老年代</td><td style="text-align:left;">提高吞吐量</td><td style="text-align:left;">同上</td></tr><tr><td style="text-align:left;">CMS</td><td style="text-align:left;">CMS可以并发的去执行，并且可以部分STW的回收器。</td><td style="text-align:left;">并发</td><td style="text-align:left;">部分STW</td><td style="text-align:left;">标记-清除</td><td style="text-align:left;">老年代</td><td style="text-align:left;">快速的回收</td><td style="text-align:left;">对延迟敏感的应用，需要较短垃圾回收停顿时间。</td></tr><tr><td style="text-align:left;">G1</td><td style="text-align:left;">1. G1将堆分成多个大小相同的Regin（大小在 1-32MB，默认是 2048个），每一个Regin都可以充当新生代或老年代中的某个区。<br> 2. Regin中还有一个特殊的区域 Humongous Regin（大对象直接分在老年代，防止了反复拷贝移动） ，G1规定大小超过普通Regin一半的对象是大对象，大对象就存在Humongous Regin，它会独占一个、或多个连续Region。 <br> 3. 使用 Mixed GC 回收（下面讲）</td><td style="text-align:left;">并发</td><td style="text-align:left;">部分STW</td><td style="text-align:left;">标记-整理</td><td style="text-align:left;">通吃</td><td style="text-align:left;">满足高吞吐量的同时，尽可能地减少垃圾回收耗时</td><td style="text-align:left;">大内存应用、需要可预测停顿时间的应用，JDK9开始成为默认的垃圾回收器。</td></tr></tbody></table><br><p><strong>Serial/Serial Old 回收图</strong></p><figure><img src="'+s+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><p><strong>ParNew/Parallel Scavenge/Parallel Old 回收图</strong></p><figure><img src="'+g+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><p><strong>CMS 回收图</strong></p><figure><img src="'+o+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><p><strong>G1 回收图</strong></p><figure><img src="'+f+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><p><strong>CMS和G1的对比</strong></p><ol><li>CMS会产生内存碎片，且无法回收浮动垃圾（因为清理的时候是并发的，这时候工作线程可能产生新的垃圾）</li><li>关注点：CMS是快速的回收，G1是在限定的时间内（这个时间可以自定义），最大限度的回收（会把垃圾排序然后回收收益最大的部分）</li><li>作用范围：CMS是作用于老年代，G1是都可以</li><li>内存分布：G1对堆内存进行了大小相同的Regin划分，在Regin的基础上再进行新生代和老年代划分，CMS是传统的新生代、老年代分布</li><li>性能：CMS对CPU资源非常敏感可能会影响正常请求（因为回收的时候很多阶段是并发的），G1对内存要求较高（想想它对堆做了那么复杂的划分和逻辑，这些都是需要额外内存和cup支持的），所以更适合大堆</li><li>G1的目的是代替CMS，JDK9之后默认的垃圾收集器就是G1，但CMS并不是一无是处，在内存小的时候还是更合适的</li></ol><br><p><strong>MinorGC、MajorGC、Full GC、Mixed GC</strong></p><ol><li>MinorGC：是对新生代回收时候的GC，有时候也叫 youngGC</li><li>MajorGC：是针对老年代的垃圾回收操作。出现 Major GC 通常会出现至少一次 Minor GC。有时候也叫 OldGC</li><li>Full GC：Full GC 会清理整个堆和方法区，包括年轻代、老年代和方法区。FullGC对于方法区的回收主要是满足下面三个条件</li></ol><ul><li><ul><li>Java堆中不存在该类的任何实例对象；</li></ul></li><li><ul><li>加载该类的类加载器已经被回收；</li></ul></li><li><ul><li>该类对应的java.lang.Class对象不在任何地方被引用，且无法在任何地方通过反射访问该类的方法。</li></ul></li></ul><ol start="4"><li>Mixed GC：它是G1才有的。不再是每次回收新生代、老年代了，而是把内存排序后，回收利益最大的，这也是G1这个名字的由来。</li></ol><br><h2 id="五、其它" tabindex="-1"><a class="header-anchor" href="#五、其它"><span>五、其它</span></a></h2><br><p>注：G1并不是终点，后面还有ZGC它关注更低的延迟，但现在大家都还没用到，暂时先不去学习了</p><br><p>参考：</p><ol><li>本文严重参考了《深入理解Java虚拟机》这本书</li><li>https://tech.meituan.com/2016/09/23/g1.html</li></ol>',39);function h(c,b){return a(),l("div",null,[x,i(" 已经知道了哪些对象是可以回收的，那就需要按照某种回收算法，去回收它们。 "),p])}const u=e(y,[["render",h],["__file","JVM内存区域详解，一文弄懂JVM内存【内存分布、回收算法、垃圾回收器】.html.vue"]]),m=JSON.parse('{"path":"/15JVM/JVM%E5%86%85%E5%AD%98%E5%8C%BA%E5%9F%9F%E8%AF%A6%E8%A7%A3%EF%BC%8C%E4%B8%80%E6%96%87%E5%BC%84%E6%87%82JVM%E5%86%85%E5%AD%98%E3%80%90%E5%86%85%E5%AD%98%E5%88%86%E5%B8%83%E3%80%81%E5%9B%9E%E6%94%B6%E7%AE%97%E6%B3%95%E3%80%81%E5%9E%83%E5%9C%BE%E5%9B%9E%E6%94%B6%E5%99%A8%E3%80%91.html","title":"【中】JVM内存区域详解，一文弄懂JVM内存【内存分布、回收算法、垃圾回收器】","lang":"zh-CN","frontmatter":{"title":"【中】JVM内存区域详解，一文弄懂JVM内存【内存分布、回收算法、垃圾回收器】","shortTitle":"【中】JVM内存区域详解","date":"2024-01-14T15:51:47.000Z","category":["中级","视频讲解"],"order":3,"description":"视频讲解地址 学习文档 一、内存区域 在这里插入图片描述在这里插入图片描述 堆其实就是一大块内存区域，是用来存放对象的，对于一个应用来说最耗费内存的就是“对象”。因为在运行的过程中会创建无数个对象，所以内存回收（垃圾回收）的时候主要就是针对堆的垃圾进行回收。 常见的堆划分是： 把堆分为新生代和老年代 新生代分为一个Eden区和两个Survivor区，它...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/15JVM/JVM%E5%86%85%E5%AD%98%E5%8C%BA%E5%9F%9F%E8%AF%A6%E8%A7%A3%EF%BC%8C%E4%B8%80%E6%96%87%E5%BC%84%E6%87%82JVM%E5%86%85%E5%AD%98%E3%80%90%E5%86%85%E5%AD%98%E5%88%86%E5%B8%83%E3%80%81%E5%9B%9E%E6%94%B6%E7%AE%97%E6%B3%95%E3%80%81%E5%9E%83%E5%9C%BE%E5%9B%9E%E6%94%B6%E5%99%A8%E3%80%91.html"}],["meta",{"property":"og:site_name","content":"小道仙Java笔记"}],["meta",{"property":"og:title","content":"【中】JVM内存区域详解，一文弄懂JVM内存【内存分布、回收算法、垃圾回收器】"}],["meta",{"property":"og:description","content":"视频讲解地址 学习文档 一、内存区域 在这里插入图片描述在这里插入图片描述 堆其实就是一大块内存区域，是用来存放对象的，对于一个应用来说最耗费内存的就是“对象”。因为在运行的过程中会创建无数个对象，所以内存回收（垃圾回收）的时候主要就是针对堆的垃圾进行回收。 常见的堆划分是： 把堆分为新生代和老年代 新生代分为一个Eden区和两个Survivor区，它..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-23T14:12:53.000Z"}],["meta",{"property":"article:author","content":"小道仙97"}],["meta",{"property":"article:published_time","content":"2024-01-14T15:51:47.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-23T14:12:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"【中】JVM内存区域详解，一文弄懂JVM内存【内存分布、回收算法、垃圾回收器】\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-01-14T15:51:47.000Z\\",\\"dateModified\\":\\"2024-07-23T14:12:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小道仙97\\",\\"url\\":\\"https://java.xdx97.com\\"}]}"]]},"headers":[{"level":2,"title":"一、内存区域","slug":"一、内存区域","link":"#一、内存区域","children":[]},{"level":2,"title":"二、回收时机","slug":"二、回收时机","link":"#二、回收时机","children":[]},{"level":2,"title":"三、回收算法","slug":"三、回收算法","link":"#三、回收算法","children":[]},{"level":2,"title":"四、回收器","slug":"四、回收器","link":"#四、回收器","children":[]},{"level":2,"title":"五、其它","slug":"五、其它","link":"#五、其它","children":[]}],"git":{"createdTime":1721461625000,"updatedTime":1721743973000,"contributors":[{"name":"ziyangtao","email":"ziyangtao@distinctclinic.com","commits":7}]},"readingTime":{"minutes":10.83,"words":3248},"filePathRelative":"15JVM/JVM内存区域详解，一文弄懂JVM内存【内存分布、回收算法、垃圾回收器】.md","localizedDate":"2024年1月14日","excerpt":"<p><a href=\\"https://www.bilibili.com/video/BV1j64y1N7c4\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">视频讲解地址</a></p>\\n<p><a href=\\"https://d9bp4nr5ye.feishu.cn/wiki/IfjBwSCoKityeMkPsYocSFwWnje\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">学习文档</a></p>\\n<br>\\n<h2>一、内存区域</h2>\\n<figure><figcaption>在这里插入图片描述</figcaption></figure>","autoDesc":true}');export{u as comp,m as data};
