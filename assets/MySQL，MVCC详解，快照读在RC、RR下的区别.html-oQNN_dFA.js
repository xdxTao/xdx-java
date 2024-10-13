import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,b as n}from"./app-Q2dkLXYo.js";const i="/assets/0301_20-ejhv2xuf.png",r="/assets/0301_21-CCmvFBFa.png",o="/assets/0301_22-C_G2l1Ty.png",l="/assets/0301_23-BaGY6AD0.png",d={},p=n('<br><p>最近感觉写博客越来越难写了，不再像以前对于写出来的东西只是为了一个产出，不去看质量。就比如说学习这个MVCC的时候，别的博客都已经写的很好了，但是不去自己按照理解写出来又好像不合适。（诚然我写出来的不可能是比那些大佬写得好）</p><br><h2 id="一、什么是mvcc" tabindex="-1"><a class="header-anchor" href="#一、什么是mvcc"><span>一、什么是MVCC</span></a></h2><p>我们在操作数据库的时候总是这四大类 <code>读读</code> <code>读写</code> <code>写读</code> <code>写写</code>，读读肯定是没有任务数据问题的，但对事物有了解的同学就会知道，读写、写写操作很容易就会导致数据不一致。</p><p>在此之前解决这类问题的常用方式就是<code>加锁</code>，听名字就知道这是个很复杂、很耗性能的操作，所以大神们不满足这个操作，从而在MySQL里面实现了MVCC。</p><p>MVCC并不是MySQL独有的，它是一个理念，百度百科解释如下</p><blockquote><p>Multi-Version Concurrency Control 多版本并发控制，MVCC 是一种并发控制的方法，一般在数据库管理系统中，实现对数据库的并发访问；在编程语言中实现事务内存。</p></blockquote><p>MVCC里面有一些关键词，理解这些关键词，你就明白了什么是MVCC。MVCC是解决读写、写读导致数据不一致的问题，写写问题还是需要加锁来解决。</p><p>所以我们可以使用 MVCC + 锁（乐观锁/悲观锁）来解决全部的问题。</p><br><h2 id="二、当前读、快照读" tabindex="-1"><a class="header-anchor" href="#二、当前读、快照读"><span>二、当前读、快照读</span></a></h2><p>当前读就是读取最新的数据，为了保证读取的是最新且准确的数据，所以它在读取的时候会加锁，防止其它事物操作。</p><p>快照读是不加锁的方式，当一个事物要操作数据库的时候，会在这个事物的基础上形成一个快照，其它的操作就读取这个快照。</p><p>MVCC就是基于快照读来实现的，在MySQL里面的快照读是基于这样几个关键点来实现的</p><ul><li>三个隐藏参数 （DB_ROW_ID 隐藏主键id、DB_ROLL_PTR 回滚指针、DB_TRX_ID 事物id）</li><li>undo log 日志</li><li>read view</li></ul><br><h2 id="三、隐藏字段" tabindex="-1"><a class="header-anchor" href="#三、隐藏字段"><span>三、隐藏字段</span></a></h2><p>假如我们有一张表，里面有两个字段，name、age，但实际上我们表里的数据是这样的</p><figure><img src="'+i+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><h3 id="_3-1、隐藏主键" tabindex="-1"><a class="header-anchor" href="#_3-1、隐藏主键"><span>3-1、隐藏主键</span></a></h3><p>6byte，隐含的自增ID（隐藏主键），如果数据表没有主键，InnoDB会自动以DB_ROW_ID产生一个聚簇索引</p><p><strong>聚簇索引</strong>：数据存储和索引是存在一起的，逻辑上和物理上都是一起的，一个表只能有一个聚簇索引。</p><p>注：理解聚簇索引可以很好的理解MySQL的索引规则，感兴趣的可以看看这个 <a href="https://blog.csdn.net/Tomwildboar/article/details/120389591" target="_blank" rel="noopener noreferrer">MySQL索引详解</a></p><br><h3 id="_3-2、事物id" tabindex="-1"><a class="header-anchor" href="#_3-2、事物id"><span>3-2、事物id</span></a></h3><p>记录这条记录最后一次操作的事物id</p><br><h3 id="_3-3、回滚指针" tabindex="-1"><a class="header-anchor" href="#_3-3、回滚指针"><span>3-3、回滚指针</span></a></h3><p>回滚指针，指向这条记录的上一个版本（存储于rollback segment里），用于配合下面的 undo log。</p><br><h2 id="四、undo-log" tabindex="-1"><a class="header-anchor" href="#四、undo-log"><span>四、undo log</span></a></h2><p>undo log 日志分为两种</p><ul><li><code>insert undo log</code> 数据库在插入数据的时候产生，只有在<strong>当前事物</strong>回滚的时候才有用，所以在当前事物结束的时候它就没用了，就会被删除。</li><li><code>update undo log</code> 数据库在更新、删除的时候产生，除了当前事物会使用，在快照读的时候也会使用，所以不能随便删除，只有在快速读或事务回滚不涉及该日志时，对应的日志才会被<code>purge</code>线程统一清除</li></ul><br><p>假设我们的隐藏主键是从1、2、3....， 事物主键、回滚指针也是这样生成的 （事实上不是这样的规则），那么我们对上面的表进行操作，将会形成如下的链式结构。</p><p><strong>插入数据</strong></p><figure><img src="'+r+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><p><strong>修改张三为李四</strong></p><figure><img src="'+o+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><p><strong>修改年纪为25</strong></p><figure><img src="'+l+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><p>注：这里的指针是指向这条数据，而不是里面的 主键。</p><br><h2 id="五、read-view" tabindex="-1"><a class="header-anchor" href="#五、read-view"><span>五、Read View</span></a></h2><p>什么是读视图呢？数据库的操作都是多个事物同时进行的，有读有写。假如当前有两个事物，A事物读取，B事物正在更新数据。</p><p>在A事物开始的时候，就形成当前数据库的一个快照，记录并维护系统当前活跃事务的ID。read view 主要是用来做可见性判断的，它会判断每条记录的的数据，这条数据可能是真实的数据，也可能是undo log 中的数据。</p><p>read view 用一个可见性的算法，来判断当前是读取真实的数据，还是undo log的数据。这里可以简单理解read view 内部维护了一个事物id列表，里面有最大值和最小值，可以判断其它事物的id是否在这个可见范围内。</p><br><h2 id="n、其它" tabindex="-1"><a class="header-anchor" href="#n、其它"><span>N、其它</span></a></h2><h3 id="n-1、快照读在rc和rr下的区别" tabindex="-1"><a class="header-anchor" href="#n-1、快照读在rc和rr下的区别"><span>N-1、快照读在RC和RR下的区别</span></a></h3><ul><li>RC （read-committed）读已提交， 可能会导致 不可重复读、幻读</li><li>RR （repeatable-read）可重复读，可能会导致 幻读</li></ul><p><strong>幻读</strong> ： 事物A查询数据库查询出来了20条数据，然后事物B删除了2条数据，这时候事物A再去查询发现只有18条了，从而产生了幻觉。</p><p>我们知道在RR级别下面不会产生 不可重复读，之所以不会产生 不可重复读，是快照读在RC和RR下的生成的策略不一样。</p><p><mark>RC隔离级别下，是每个快照读都会生成并获取最新的Read View；而在RR隔离级别下，则是同一个事务中的第一个快照读才会创建Read View, 之后的快照读获取的都是同一个Read View。</mark></p><br><h3 id="n-2、关于高性能的mysql" tabindex="-1"><a class="header-anchor" href="#n-2、关于高性能的mysql"><span>N-2、关于高性能的MySQL</span></a></h3><p>在《高性能的MySQL》里面所讲解的MVCC和上面完全不一样，这也给我带来了很大的困扰。</p><p>后面在网上看到人家说《高性能的MySQL》里面讲的是PostgreSQL 里面MVCC实现方式。</p>',59),c=[p];function s(h,C){return a(),t("div",null,c)}const _=e(d,[["render",s],["__file","MySQL，MVCC详解，快照读在RC、RR下的区别.html.vue"]]),u=JSON.parse('{"path":"/03%E6%95%B0%E6%8D%AE%E5%BA%93/01MySQL/MySQL%EF%BC%8CMVCC%E8%AF%A6%E8%A7%A3%EF%BC%8C%E5%BF%AB%E7%85%A7%E8%AF%BB%E5%9C%A8RC%E3%80%81RR%E4%B8%8B%E7%9A%84%E5%8C%BA%E5%88%AB.html","title":"【初】MySQL，MVCC详解，快照读在RC、RR下的区别","lang":"zh-CN","frontmatter":{"title":"【初】MySQL，MVCC详解，快照读在RC、RR下的区别","shortTitle":"【初】MVCC详解，快照读在RC、RR下的区别","date":"2022-08-02T16:00:29.000Z","category":["初级"],"description":"最近感觉写博客越来越难写了，不再像以前对于写出来的东西只是为了一个产出，不去看质量。就比如说学习这个MVCC的时候，别的博客都已经写的很好了，但是不去自己按照理解写出来又好像不合适。（诚然我写出来的不可能是比那些大佬写得好） 一、什么是MVCC 我们在操作数据库的时候总是这四大类 读读 读写 写读 写写，读读肯定是没有任务数据问题的，但对事物有了解的同...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/03%E6%95%B0%E6%8D%AE%E5%BA%93/01MySQL/MySQL%EF%BC%8CMVCC%E8%AF%A6%E8%A7%A3%EF%BC%8C%E5%BF%AB%E7%85%A7%E8%AF%BB%E5%9C%A8RC%E3%80%81RR%E4%B8%8B%E7%9A%84%E5%8C%BA%E5%88%AB.html"}],["meta",{"property":"og:site_name","content":"小道仙Java笔记"}],["meta",{"property":"og:title","content":"【初】MySQL，MVCC详解，快照读在RC、RR下的区别"}],["meta",{"property":"og:description","content":"最近感觉写博客越来越难写了，不再像以前对于写出来的东西只是为了一个产出，不去看质量。就比如说学习这个MVCC的时候，别的博客都已经写的很好了，但是不去自己按照理解写出来又好像不合适。（诚然我写出来的不可能是比那些大佬写得好） 一、什么是MVCC 我们在操作数据库的时候总是这四大类 读读 读写 写读 写写，读读肯定是没有任务数据问题的，但对事物有了解的同..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-20T12:30:55.000Z"}],["meta",{"property":"article:author","content":"小道仙97"}],["meta",{"property":"article:published_time","content":"2022-08-02T16:00:29.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-20T12:30:55.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"【初】MySQL，MVCC详解，快照读在RC、RR下的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-08-02T16:00:29.000Z\\",\\"dateModified\\":\\"2024-07-20T12:30:55.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小道仙97\\",\\"url\\":\\"https://java.xdx97.com\\"}]}"]]},"headers":[{"level":2,"title":"一、什么是MVCC","slug":"一、什么是mvcc","link":"#一、什么是mvcc","children":[]},{"level":2,"title":"二、当前读、快照读","slug":"二、当前读、快照读","link":"#二、当前读、快照读","children":[]},{"level":2,"title":"三、隐藏字段","slug":"三、隐藏字段","link":"#三、隐藏字段","children":[{"level":3,"title":"3-1、隐藏主键","slug":"_3-1、隐藏主键","link":"#_3-1、隐藏主键","children":[]},{"level":3,"title":"3-2、事物id","slug":"_3-2、事物id","link":"#_3-2、事物id","children":[]},{"level":3,"title":"3-3、回滚指针","slug":"_3-3、回滚指针","link":"#_3-3、回滚指针","children":[]}]},{"level":2,"title":"四、undo log","slug":"四、undo-log","link":"#四、undo-log","children":[]},{"level":2,"title":"五、Read View","slug":"五、read-view","link":"#五、read-view","children":[]},{"level":2,"title":"N、其它","slug":"n、其它","link":"#n、其它","children":[{"level":3,"title":"N-1、快照读在RC和RR下的区别","slug":"n-1、快照读在rc和rr下的区别","link":"#n-1、快照读在rc和rr下的区别","children":[]},{"level":3,"title":"N-2、关于高性能的MySQL","slug":"n-2、关于高性能的mysql","link":"#n-2、关于高性能的mysql","children":[]}]}],"git":{"createdTime":1721461625000,"updatedTime":1721478655000,"contributors":[{"name":"ziyangtao","email":"ziyangtao@distinctclinic.com","commits":6}]},"readingTime":{"minutes":5.43,"words":1628},"filePathRelative":"03数据库/01MySQL/MySQL，MVCC详解，快照读在RC、RR下的区别.md","localizedDate":"2022年8月3日","excerpt":"<br>\\n<p>最近感觉写博客越来越难写了，不再像以前对于写出来的东西只是为了一个产出，不去看质量。就比如说学习这个MVCC的时候，别的博客都已经写的很好了，但是不去自己按照理解写出来又好像不合适。（诚然我写出来的不可能是比那些大佬写得好）</p>\\n<br>\\n<h2>一、什么是MVCC</h2>\\n<p>我们在操作数据库的时候总是这四大类 <code>读读</code> <code>读写</code> <code>写读</code> <code>写写</code>，读读肯定是没有任务数据问题的，但对事物有了解的同学就会知道，读写、写写操作很容易就会导致数据不一致。</p>\\n<p>在此之前解决这类问题的常用方式就是<code>加锁</code>，听名字就知道这是个很复杂、很耗性能的操作，所以大神们不满足这个操作，从而在MySQL里面实现了MVCC。</p>","autoDesc":true}');export{_ as comp,u as data};
