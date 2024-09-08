import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,b as e}from"./app-8V5nO28f.js";const n="/assets/0301_1-VJjgGFW0.png",t="/assets/0301_2-Cv8U6nJo.png",l="/assets/0301_3-8LGCweFZ.png",h="/assets/0301_4-RmT4ynCi.png",p="/assets/0301_5-B-0ZN2BN.png",r={},d=e('<p>前段时间面试每次提到索引，我就巴拉巴拉说一堆，然后到了说说你理解的 <strong>B+tree索引</strong>我就懵逼了。</p><p>直接说<code>B+tree</code>可能并不是很好理解，下面我们从最简单的二叉查找树开始慢慢循序渐进。</p><br><h2 id="一、b-tree索引" tabindex="-1"><a class="header-anchor" href="#一、b-tree索引"><span>一、B+Tree索引</span></a></h2><h3 id="_1、二叉查找树" tabindex="-1"><a class="header-anchor" href="#_1、二叉查找树"><span>1、二叉查找树</span></a></h3><p>在最开始学习树的时候，我们一定学习过这样一种结构的二叉树<strong>根结点大于它的左节点，小于它的右节点</strong>。</p><figure><img src="'+n+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><p>如果我们要在上述的二叉树里面去查询 <code>6</code> ,只需要三步即可</p><ol><li>找到根节点 <code>10</code> ，判断6比10小，寻左结点</li><li>找到结点 <code>5</code> ， 判断6比5大，寻右结点</li><li>找到结点 <code>6</code>，判断6符合查找需要</li></ol><br><h3 id="_2、平衡二叉树-avl树" tabindex="-1"><a class="header-anchor" href="#_2、平衡二叉树-avl树"><span>2、平衡二叉树（AVL树）</span></a></h3><p>熟悉二叉树的都知道，在特殊情况下，上面的二叉树可能形成如下结构</p><figure><img src="'+t+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><p>如果在此种二叉树上面查询结点，那就是一个个进行对比了，效率相当低下，这个时候我们就引入<strong>平衡二叉树</strong>的概念。</p><p>平衡二叉树有如下要求：</p><ul><li>每个根结点的左节点小于它，右节点大于它</li><li>每个结点的左右子树高度差不能超过 <code>1</code></li></ul><figure><img src="'+l+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><p><strong>每次添加元素的时候，代码都会判断当前结构是否还属于平衡的，如果不是就进行调整。调整的代价也是挺大的，所以平衡二叉树一般用于多查询的功能里面。</strong></p><br><h3 id="_3、b-tree" tabindex="-1"><a class="header-anchor" href="#_3、b-tree"><span>3、B-Tree</span></a></h3><p>我们所有的数据最终都是存在磁盘上面的。平衡二叉树有一个问题，那就是数据量如果过大的话，那么这个树就会很长很长，这样会导致频繁的进行磁盘IO，这样效率就降低了很多。</p><p><strong>在数据库里面数据不是一个个存储，而是按照页来存储，一页是16kb大小。</strong></p><p>B-Tree可以解决频繁的IO问题，它把数据按照页进行存储。</p><p>假如我们有这样一张表，里面有两个字段 id、name，id是主键</p><p>那么它的存储结构如下：</p><figure><img src="'+h+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><p><strong>页之间也是双向指向的</strong></p><p>从上面的结构我们可以看出，每一<strong>页</strong>里面存储索引和对应的数据，并且是多条数据，而不是单一的。</p><p>一般我们的根页（页1）是存储在内存中的，然后我们进行判断一个个读取页到内存，使用这种结构可以在查询更少的页，就可以查询到我们想要的数据了。</p><br><h3 id="_4、b-tree" tabindex="-1"><a class="header-anchor" href="#_4、b-tree"><span>4、B+Tree</span></a></h3><p>上面的结构也存在一种问题，因为每一页的大小是固定的（16KB），如果既要存储索引，又要存储数据，那么我们16KB也存储不了多少索引数据（尤其是在大表中），这样还是会进行频繁的IO处理。</p><p><strong>如果我们只在结点中存储索引，在叶子结点里面存储数据，这样我们每一页都可以存储更多的索引。</strong></p><figure><img src="'+p+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><h4 id="_4-1、精确查找" tabindex="-1"><a class="header-anchor" href="#_4-1、精确查找"><span>4-1、精确查找</span></a></h4><p>如果我们要查询 <code>1</code>，先找到页1，再找到页2，最后从叶子结点找到对应的数据。</p><h4 id="_4-2、范围查询" tabindex="-1"><a class="header-anchor" href="#_4-2、范围查询"><span>4-2、范围查询</span></a></h4><p>如果我们要找到 <code>WHERE id &gt; 2 AND id &lt; 5</code></p><p>和上面一样会先精确查询到<code>2</code>，叶子结点上下和左右都是有双向指针的，一个个向下去找，当找打5的时候发现 <code>id &lt; 5</code> 已经不满足要求了，就结束查找。</p><br><h3 id="_5、总结" tabindex="-1"><a class="header-anchor" href="#_5、总结"><span>5、总结</span></a></h3><ul><li>B+Tree 把所有的数据都存储在叶子结点上面，非叶子结点只存储索引，这样可以保证最少次数的IO提高索引查询的性能。</li><li>存储的时候不是一个结点一个结点的存储，而是以页的方式进行存储，每一页的大小是16KB。</li></ul><br><h2 id="二、hash索引" tabindex="-1"><a class="header-anchor" href="#二、hash索引"><span>二、Hash索引</span></a></h2><p>Hash索引就是根据给定的字段，进行创建Hash值。Hash索引可以很快的进行单个匹配度查询，但是无法做到范围查询。</p><p>如果你创建组合索引（A、B），它是根据AB俩个字段进行Hash的，所以当你单独使用A进行条件筛选的时候，是无法使用索引的。</p><br><h2 id="三、全文索引" tabindex="-1"><a class="header-anchor" href="#三、全文索引"><span>三、全文索引</span></a></h2><p>全文索引是一个比较特殊的索引，一般用的也很少。它查找的是文本中的关键词，而不是比较索引中的值。全文索引更类似于搜索引擎做的事。</p><br><h2 id="四、聚簇索引和非聚簇索引" tabindex="-1"><a class="header-anchor" href="#四、聚簇索引和非聚簇索引"><span>四、聚簇索引和非聚簇索引</span></a></h2><p>聚簇索引并不是一种单独的索引类型，而是一种数据存储方式。在InnoDB的聚簇索引实际上在同一个结构中保存了B+Tree索引和数据行。当表有聚簇索引时，它的数据行实际上存放在索引的叶子页中。</p><p>因为无法同时把数据行存放在两个不同的地方，所以一个表只能有一个聚簇索引。（不过，覆盖索引可以模拟多个聚簇索引的情况，下面说明）</p><p>在InnoDB中会选择主键来作为聚簇索引，如果没有定义主键，InnoDB会选择一个唯一的非空索引代替。如果没有这样的索引，InnoDB会隐式定义一个主键来作为聚簇索引。</p><p><strong>聚簇索引：</strong> 它的非叶子结点存储的是，主键索引（大多数是的），叶子结点是存储的行数据。</p><p><strong>非聚簇索引：</strong> 它的非叶子结点存储的是，索引值，叶子结点存储的是这个索引对应的主键索引。</p><p>所以我们使用非聚簇索引进行查询数据的时候，会查询两次先查询到聚簇索引，再去通过聚簇索引找到相关的数据，这个过程称之为<strong>回表</strong>。</p><br><h2 id="五、其它" tabindex="-1"><a class="header-anchor" href="#五、其它"><span>五、其它</span></a></h2><h3 id="_5-1、为什么主键索引比其它索引快" tabindex="-1"><a class="header-anchor" href="#_5-1、为什么主键索引比其它索引快"><span>5-1、为什么主键索引比其它索引快</span></a></h3><p>因为非主键索引对应的是非聚簇索引，所以在查询的时候需要进行回表操作，先在查询找到对应的主键索引，再通过主键索引去查询真实的数据。</p><p>但也不是全部的主键索引都比其它索引快，比如我们下面要说的覆盖索引。</p><h3 id="_5-2、覆盖索引" tabindex="-1"><a class="header-anchor" href="#_5-2、覆盖索引"><span>5-2、覆盖索引</span></a></h3><p>假设我们有这样一张表</p><div class="language-sql line-numbers-mode" data-highlighter="shiki" data-ext="sql" data-title="sql" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">CREATE</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> TABLE</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> `</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">t_user</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">` (</span></span>\n<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">  `id`</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> int</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">11</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">NOT NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> AUTO_INCREMENT COMMENT </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;主键id&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>\n<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">  `name`</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> varchar</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">50</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">DEFAULT</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> COMMENT </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;姓名&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>\n<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">  `age`</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> int</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">DEFAULT</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> COMMENT </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;年龄&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>\n<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">  `sex`</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> tinyint</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">DEFAULT</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> COMMENT </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;性别&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">  PRIMARY KEY</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">`id`</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">),</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">  KEY</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> `name_age`</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">`name`</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">`age`</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">) ENGINE</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">InnoDB </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">DEFAULT</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> CHARSET</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">utf8mb4;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们需要查询 name和age，sql如下</p><div class="language-sql line-numbers-mode" data-highlighter="shiki" data-ext="sql" data-title="sql" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">SELECT</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> name</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, age </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> t_user</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>因为我们建立了 name，age 的索引，并且我们查询的数据也就是这两个，所以我们不需要再去进行回表了。</p><p><strong>覆盖索引：</strong> 如果一个索引包含（或者说覆盖）所有需要查询的字段的值，我们就称之为“覆盖索引”。</p><p>注：覆盖索引必须要存储索引列的值，而哈希索引、空间索引和全文索引等都不存储索引列的值，所以MySQL只能使用B+Tree索引做覆盖索引。另外，不同的存储引擎实现覆盖索引的方式也不同，而且不是所有的引擎都支持覆盖索引。</p>',70),k=[d];function g(o,c){return a(),s("div",null,k)}const E=i(r,[["render",g],["__file","MySQL索引详解【B_Tree索引、哈希索引、全文索引、覆盖索引】.html.vue"]]),_=JSON.parse('{"path":"/03%E6%95%B0%E6%8D%AE%E5%BA%93/01MySQL/MySQL%E7%B4%A2%E5%BC%95%E8%AF%A6%E8%A7%A3%E3%80%90B_Tree%E7%B4%A2%E5%BC%95%E3%80%81%E5%93%88%E5%B8%8C%E7%B4%A2%E5%BC%95%E3%80%81%E5%85%A8%E6%96%87%E7%B4%A2%E5%BC%95%E3%80%81%E8%A6%86%E7%9B%96%E7%B4%A2%E5%BC%95%E3%80%91.html","title":"【初】MySQL索引详解【B+Tree索引、哈希索引、全文索引、覆盖索引】","lang":"zh-CN","frontmatter":{"title":"【初】MySQL索引详解【B+Tree索引、哈希索引、全文索引、覆盖索引】","shortTitle":"【初】 MySQL索引详解","date":"2021-09-20T11:45:59.000Z","category":["初级"],"description":"前段时间面试每次提到索引，我就巴拉巴拉说一堆，然后到了说说你理解的 B+tree索引我就懵逼了。 直接说B+tree可能并不是很好理解，下面我们从最简单的二叉查找树开始慢慢循序渐进。 一、B+Tree索引 1、二叉查找树 在最开始学习树的时候，我们一定学习过这样一种结构的二叉树根结点大于它的左节点，小于它的右节点。 在这里插入图片描述在这里插入图片描述...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/03%E6%95%B0%E6%8D%AE%E5%BA%93/01MySQL/MySQL%E7%B4%A2%E5%BC%95%E8%AF%A6%E8%A7%A3%E3%80%90B_Tree%E7%B4%A2%E5%BC%95%E3%80%81%E5%93%88%E5%B8%8C%E7%B4%A2%E5%BC%95%E3%80%81%E5%85%A8%E6%96%87%E7%B4%A2%E5%BC%95%E3%80%81%E8%A6%86%E7%9B%96%E7%B4%A2%E5%BC%95%E3%80%91.html"}],["meta",{"property":"og:site_name","content":"小道仙Java笔记"}],["meta",{"property":"og:title","content":"【初】MySQL索引详解【B+Tree索引、哈希索引、全文索引、覆盖索引】"}],["meta",{"property":"og:description","content":"前段时间面试每次提到索引，我就巴拉巴拉说一堆，然后到了说说你理解的 B+tree索引我就懵逼了。 直接说B+tree可能并不是很好理解，下面我们从最简单的二叉查找树开始慢慢循序渐进。 一、B+Tree索引 1、二叉查找树 在最开始学习树的时候，我们一定学习过这样一种结构的二叉树根结点大于它的左节点，小于它的右节点。 在这里插入图片描述在这里插入图片描述..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-20T12:30:55.000Z"}],["meta",{"property":"article:author","content":"小道仙97"}],["meta",{"property":"article:published_time","content":"2021-09-20T11:45:59.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-20T12:30:55.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"【初】MySQL索引详解【B+Tree索引、哈希索引、全文索引、覆盖索引】\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-09-20T11:45:59.000Z\\",\\"dateModified\\":\\"2024-07-20T12:30:55.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小道仙97\\",\\"url\\":\\"https://java.xdx97.com\\"}]}"]]},"headers":[{"level":2,"title":"一、B+Tree索引","slug":"一、b-tree索引","link":"#一、b-tree索引","children":[{"level":3,"title":"1、二叉查找树","slug":"_1、二叉查找树","link":"#_1、二叉查找树","children":[]},{"level":3,"title":"2、平衡二叉树（AVL树）","slug":"_2、平衡二叉树-avl树","link":"#_2、平衡二叉树-avl树","children":[]},{"level":3,"title":"3、B-Tree","slug":"_3、b-tree","link":"#_3、b-tree","children":[]},{"level":3,"title":"4、B+Tree","slug":"_4、b-tree","link":"#_4、b-tree","children":[]},{"level":3,"title":"5、总结","slug":"_5、总结","link":"#_5、总结","children":[]}]},{"level":2,"title":"二、Hash索引","slug":"二、hash索引","link":"#二、hash索引","children":[]},{"level":2,"title":"三、全文索引","slug":"三、全文索引","link":"#三、全文索引","children":[]},{"level":2,"title":"四、聚簇索引和非聚簇索引","slug":"四、聚簇索引和非聚簇索引","link":"#四、聚簇索引和非聚簇索引","children":[]},{"level":2,"title":"五、其它","slug":"五、其它","link":"#五、其它","children":[{"level":3,"title":"5-1、为什么主键索引比其它索引快","slug":"_5-1、为什么主键索引比其它索引快","link":"#_5-1、为什么主键索引比其它索引快","children":[]},{"level":3,"title":"5-2、覆盖索引","slug":"_5-2、覆盖索引","link":"#_5-2、覆盖索引","children":[]}]}],"git":{"createdTime":1721461625000,"updatedTime":1721478655000,"contributors":[{"name":"ziyangtao","email":"ziyangtao@distinctclinic.com","commits":6}]},"readingTime":{"minutes":6.57,"words":1970},"filePathRelative":"03数据库/01MySQL/MySQL索引详解【B+Tree索引、哈希索引、全文索引、覆盖索引】.md","localizedDate":"2021年9月20日","excerpt":"<p>前段时间面试每次提到索引，我就巴拉巴拉说一堆，然后到了说说你理解的  <strong>B+tree索引</strong>我就懵逼了。</p>\\n<p>直接说<code>B+tree</code>可能并不是很好理解，下面我们从最简单的二叉查找树开始慢慢循序渐进。</p>\\n<br>\\n<h2>一、B+Tree索引</h2>\\n<h3>1、二叉查找树</h3>\\n<p>在最开始学习树的时候，我们一定学习过这样一种结构的二叉树<strong>根结点大于它的左节点，小于它的右节点</strong>。</p>\\n<figure><figcaption>在这里插入图片描述</figcaption></figure>","autoDesc":true}');export{E as comp,_ as data};
