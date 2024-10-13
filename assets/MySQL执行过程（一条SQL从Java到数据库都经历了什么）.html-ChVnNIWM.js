import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as a,b as t}from"./app-Q2dkLXYo.js";const s="/assets/0301_17-DWb3zvow.png",l="/assets/0301_18-DOrKIJI3.png",n="/assets/0301_19-D8Dp52-0.png",p={},r=t(`<p>视频地址 <a href="https://www.bilibili.com/video/bv1Sq4y1377k" target="_blank" rel="noopener noreferrer">https://www.bilibili.com/video/bv1Sq4y1377k</a></p><br><p>从我们学习Java开始，我们就学了很多种操作数据库的方式，最开始的JDBC、后面的JPA、HIbernate、MyBatis，那你是否想过，我们只是简单的写了一个sql，最终是如何到达数据库、返回结果？这中间都经历了什么呢？</p><br><p>不管我们是用原生的JDBC还是后面的ORM框架，我们都会引入这样一个pom文件，这就是MySQL驱动，我们通过这个驱动去连接MySQL</p><div class="language-xml line-numbers-mode" data-highlighter="shiki" data-ext="xml" data-title="xml" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;mysql&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;mysql-connector-java&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么看起来就像这样</p><figure><img src="`+s+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><p>我们知道，每一个系统都是有并发量的，为了保证系统高效的运行，就注定了不可能是单线程的运行，同样操作数据的时候也是一样，我们学过了很多数据库连接池，C3P0、DBCP、Druid等，这些是在Java这边的连接池，同理数据库层面肯定也不能只是一个线程来执行我们的任务，所以数据库这边也会有对应的连接池。</p><figure><img src="'+l+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><p>当然上面是省略了一部分，那就是数据库对你这个连接进行身份校验的操作。</p><br><p>现在想一想，当一个请求到了数据库，数据库收到之后是不是就得分配一个线程，然后去执行这个sql呢？</p><p>其实这当然不是了，毕竟数据库是一个系统，它不是人，当我们要去电脑里面找寻某个文件的时候，我们脑海里是知道这个文件在什么的位置的，它叫什么。</p><p>同样的系统要把我们的这个请求进行解析，解析成它可以理解的语法，然后再去做相关操作，具体的逻辑顺序如下：</p><h3 id="sql接口" tabindex="-1"><a class="header-anchor" href="#sql接口"><span>SQL接口</span></a></h3><p>这个sql接口，就是用来接受应用服务器发送的sql</p><p>当应用服务器通过连接通道发送sql到数据库后，数据库从连接池里面拿到后，分发一个线程去进行处理，第一步就是把sql交给这个sql接口。</p><h3 id="sql解析器" tabindex="-1"><a class="header-anchor" href="#sql解析器"><span>SQL解析器</span></a></h3><p>某种程度上讲，系统和我们人类是类似的，我们的眼睛如同SQL接口获取信息，SQL解析器则如同我们的大脑，对获取的内容进行解析、拆分，然后变成数据库所能理解的内容。</p><h3 id="查询优化器" tabindex="-1"><a class="header-anchor" href="#查询优化器"><span>查询优化器</span></a></h3><p>一个简单的sql <code>SELECT name FROM user WHERE id = 1</code> 它可能有多种执行策略：</p><ul><li>先查询出全部的 name，然后再取出 id=1 的数据</li><li>直接先找寻id=1 的数据，然后再取出它的 name</li></ul><p>毫无疑问肯定是第二种策略更好，第一种就是全表扫描了，当然真正的执行策略并不一定就是我这里所说的这样，这只是一个比喻。</p><p>一个稍微复杂一点的SQL，它很有可能会有很多种的执行策略，那么这个查询优化器，就会帮助我们来选择一个最合适的策略。</p><h3 id="执行器" tabindex="-1"><a class="header-anchor" href="#执行器"><span>执行器</span></a></h3><p>当优化器选择最合适的执行策略之后，就由执行器去调用对应的引擎去操作硬盘上的数据了。（虽然引擎有很多比如innodb、myisam等，但用的最多的还是innodb了）</p><figure><img src="'+n+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><h3 id="buffer-pool" tabindex="-1"><a class="header-anchor" href="#buffer-pool"><span>buffer pool</span></a></h3><p>在InnoDB引擎下，所有的操作都是先把数据读取到<code>缓冲池</code>（这个就是内存的一块区域），然后在这个区域内进行增删改查操作，之所以这样做是因为在内存操作的性能要远远高于在硬盘中的操作。</p><br><p>理解了上面都执行流程之后，我们只需要记住这个执行链，然后再基于自己的理解就好了</p><ul><li>SQL接口 &gt; SQL解析器 &gt; 查询优化器 &gt; 执行器 &gt; 调用引擎接口去执行</li></ul>',33),o=[r];function h(d,c){return a(),e("div",null,o)}const m=i(p,[["render",h],["__file","MySQL执行过程（一条SQL从Java到数据库都经历了什么）.html.vue"]]),k=JSON.parse('{"path":"/03%E6%95%B0%E6%8D%AE%E5%BA%93/01MySQL/MySQL%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B%EF%BC%88%E4%B8%80%E6%9D%A1SQL%E4%BB%8EJava%E5%88%B0%E6%95%B0%E6%8D%AE%E5%BA%93%E9%83%BD%E7%BB%8F%E5%8E%86%E4%BA%86%E4%BB%80%E4%B9%88%EF%BC%89.html","title":"【初】MySQL执行过程（一条SQL从Java到数据库都经历了什么）","lang":"zh-CN","frontmatter":{"title":"【初】MySQL执行过程（一条SQL从Java到数据库都经历了什么）","shortTitle":"【初】 MySQL执行过程","date":"2021-11-14T20:46:22.000Z","category":["初级","视频讲解"],"description":"视频地址 https://www.bilibili.com/video/bv1Sq4y1377k 从我们学习Java开始，我们就学了很多种操作数据库的方式，最开始的JDBC、后面的JPA、HIbernate、MyBatis，那你是否想过，我们只是简单的写了一个sql，最终是如何到达数据库、返回结果？这中间都经历了什么呢？ 不管我们是用原生的JDBC还是...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/03%E6%95%B0%E6%8D%AE%E5%BA%93/01MySQL/MySQL%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B%EF%BC%88%E4%B8%80%E6%9D%A1SQL%E4%BB%8EJava%E5%88%B0%E6%95%B0%E6%8D%AE%E5%BA%93%E9%83%BD%E7%BB%8F%E5%8E%86%E4%BA%86%E4%BB%80%E4%B9%88%EF%BC%89.html"}],["meta",{"property":"og:site_name","content":"小道仙Java笔记"}],["meta",{"property":"og:title","content":"【初】MySQL执行过程（一条SQL从Java到数据库都经历了什么）"}],["meta",{"property":"og:description","content":"视频地址 https://www.bilibili.com/video/bv1Sq4y1377k 从我们学习Java开始，我们就学了很多种操作数据库的方式，最开始的JDBC、后面的JPA、HIbernate、MyBatis，那你是否想过，我们只是简单的写了一个sql，最终是如何到达数据库、返回结果？这中间都经历了什么呢？ 不管我们是用原生的JDBC还是..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-20T12:30:55.000Z"}],["meta",{"property":"article:author","content":"小道仙97"}],["meta",{"property":"article:published_time","content":"2021-11-14T20:46:22.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-20T12:30:55.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"【初】MySQL执行过程（一条SQL从Java到数据库都经历了什么）\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-11-14T20:46:22.000Z\\",\\"dateModified\\":\\"2024-07-20T12:30:55.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小道仙97\\",\\"url\\":\\"https://java.xdx97.com\\"}]}"]]},"headers":[{"level":3,"title":"SQL接口","slug":"sql接口","link":"#sql接口","children":[]},{"level":3,"title":"SQL解析器","slug":"sql解析器","link":"#sql解析器","children":[]},{"level":3,"title":"查询优化器","slug":"查询优化器","link":"#查询优化器","children":[]},{"level":3,"title":"执行器","slug":"执行器","link":"#执行器","children":[]},{"level":3,"title":"buffer pool","slug":"buffer-pool","link":"#buffer-pool","children":[]}],"git":{"createdTime":1721461625000,"updatedTime":1721478655000,"contributors":[{"name":"ziyangtao","email":"ziyangtao@distinctclinic.com","commits":6}]},"readingTime":{"minutes":3.56,"words":1069},"filePathRelative":"03数据库/01MySQL/MySQL执行过程（一条SQL从Java到数据库都经历了什么）.md","localizedDate":"2021年11月15日","excerpt":"<p>视频地址  <a href=\\"https://www.bilibili.com/video/bv1Sq4y1377k\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://www.bilibili.com/video/bv1Sq4y1377k</a></p>\\n<br>\\n<p>从我们学习Java开始，我们就学了很多种操作数据库的方式，最开始的JDBC、后面的JPA、HIbernate、MyBatis，那你是否想过，我们只是简单的写了一个sql，最终是如何到达数据库、返回结果？这中间都经历了什么呢？</p>\\n<br>\\n<p>不管我们是用原生的JDBC还是后面的ORM框架，我们都会引入这样一个pom文件，这就是MySQL驱动，我们通过这个驱动去连接MySQL</p>","autoDesc":true}');export{m as comp,k as data};
