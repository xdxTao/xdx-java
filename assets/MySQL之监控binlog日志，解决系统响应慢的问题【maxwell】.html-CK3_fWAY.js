import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,b as n}from"./app-BcAKAKCF.js";const l="/assets/1901_3-Bh2kCGyM.png",e="/assets/1901_4-DMOz7Ule.png",t="/assets/1901_5-DIJeL2iK.png",h="/assets/1901_6-C1XVkdhL.png",p={},k=n('<br><p>视频地址： <a href="https://www.bilibili.com/video/BV1PY4y1s7a1" target="_blank" rel="noopener noreferrer">https://www.bilibili.com/video/BV1PY4y1s7a1</a></p><br><h2 id="一、场景" tabindex="-1"><a class="header-anchor" href="#一、场景"><span>一、场景</span></a></h2><blockquote><p>不知道你是否有无数次吐槽公司的架构设计，比如某一个关键的列表， <code>join</code> 了无数张表 （join 代表了left join、 inner join 等） <br> 做了一个新功能，新增了几张表，列表为了展示一个字段，又去关联一张大表，这样的操作，速度不慢才怪嘞 <br> 很遗憾我们现在的系统就是这样的，不知道你们有没有听说过ADB这样的数据库，它们主要是用来处理大数据的，性能超强，我们一个查询<code>20s</code>的SQL，迁移到ADB里面那就<code>0.Ns</code>了 (我们不去探索它为什么这么快哈) <br> 但尽管如此，终会有一天ADB这样的数据库也扛不住，这一天已经不远了 <br> 以前我的想法总是说去重构代码，但每次只是想想就头痛，一个关键的列表，关联了十几张表，谁敢去动它呢？ <br></p></blockquote><br><h2 id="二、解决方案" tabindex="-1"><a class="header-anchor" href="#二、解决方案"><span>二、解决方案</span></a></h2><p>是不是一定没有办法解决呢？答案是否定的，最近我们有一个解决方案，并且已经实践了，一个20s的查询优化后可以达到0.Ns</p><p>怎么做呢？我们知道所有的数据最终都是写入MySQL数据库，那么我们就可以<code>监控binlog</code> 把十几张表里面我们需要用到的字段冗余到一张表里面（也就20个左右的字段），这样我们的查询就只需要 <code>join一张表</code> join一次还是带了索引它能不快吗？</p><p>我们之所以关联了那么多张表不正是想要从它里面获取某个数据吗？假如我们关联A表是为了获取a1字段，那么我们是不是可以监控操作A表增、删、改的全部binlog，然后把每次操作都写入我们的宽表里面？是不是就做到了？</p><p>监控binlog的插件有很多，这里我推荐一个 <code>MaxWell</code> ，它是国外的一家公司开源用于监控binlog的软件，基于java开发的。</p><p>它使用起来很简单，完全和你的代码解耦，你单独的部署它，它可以把监控到的结果发送到 kafka、rabbitmq、redis等很多地方，然后你只需要去消费这个消息，对它进行业务处理即可。</p><br><h2 id="三、实践" tabindex="-1"><a class="header-anchor" href="#三、实践"><span>三、实践</span></a></h2><h3 id="_3-1、开始" tabindex="-1"><a class="header-anchor" href="#_3-1、开始"><span>3-1、开始</span></a></h3><p>下面我们来搭建一下maxwell，需要准备下面的环境</p><ul><li>JDK 11</li><li>MySQL</li><li>MaxWell</li><li>RabbitMQ</li><li>Linux/Mac 服务器</li></ul><p>注：rabbitmq不是必须的，如果想要发送到rabbitmq里面则可以安装，默认是输出到控制台</p><p>JDK、MySQL、rabbitmq都自行安装，这里说一下，一般我们都已经安装好了JDK8，我们可以再下载一下JDK11，安装就行，不需要配置环境变量，到时候我们执行maxwell的时候指定JDK11 就好</p><br><h3 id="_3-2、下载maxwell" tabindex="-1"><a class="header-anchor" href="#_3-2、下载maxwell"><span>3-2、下载maxwell</span></a></h3><br><p><a href="https://github.com/zendesk/maxwell/releases/download/v1.37.6/maxwell-1.37.6.tar.gz" target="_blank" rel="noopener noreferrer">https://github.com/zendesk/maxwell/releases/download/v1.37.6/maxwell-1.37.6.tar.gz</a></p><p>它是一个解压即可用的软件，解压后目录如下：</p><figure><img src="'+l+`" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><p>我们需要把它上传到Linux服务器上，如果你是Mac电脑那么恭喜你，直接可以运行</p><br><h3 id="_3-3、mysql配置" tabindex="-1"><a class="header-anchor" href="#_3-3、mysql配置"><span>3-3、MySQL配置</span></a></h3><p>找到我们的 <code>my.cnf</code>，添加上如下配置</p><div class="language-cnf line-numbers-mode" data-highlighter="shiki" data-ext="cnf" data-title="cnf" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span># 给当前mysql一个唯一id</span></span>
<span class="line"><span>server_id=1</span></span>
<span class="line"><span># 开启binlog</span></span>
<span class="line"><span>log-bin=master</span></span>
<span class="line"><span>binlog_format=row</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>binlog_format</strong> 是设置binlog的格式，它有三种格式</p><ul><li>statement 基于SQL语句的复制</li><li>row 基于行的复制(row-based replication, RBR)</li><li>mixed 混合模式复制(mixed-based replication, MBR)</li></ul><p>详情参考 <a href="https://blog.csdn.net/Tomwildboar/article/details/120707318" target="_blank" rel="noopener noreferrer">MySQL日志篇，MySQL日志之binlog日志，binlog日志详解</a></p><br><h3 id="_3-4、配置文件" tabindex="-1"><a class="header-anchor" href="#_3-4、配置文件"><span>3-4、配置文件</span></a></h3><p>把下面的配置文件放在 <code>bin</code> 目录下， 配置文件都很简单，相信你能看懂</p><div class="language-yml line-numbers-mode" data-highlighter="shiki" data-ext="yml" data-title="yml" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># tl;dr config</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">log_level=info</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># mysql login info</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">host=127.0.0.1</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">port=3306</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">user=root</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">password=123456</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 结果打印在控制台</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">producer=stdout</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 结果输出到rabbitmq</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#producer=rabbitmq</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#rabbitmq_host=127.0.0.1</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#rabbitmq_port=5672</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#rabbitmq_user=guest</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#rabbitmq_pass=guest</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#rabbitmq_virtual_host=/</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#rabbitmq_exchange=maxwell</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#rabbitmq_exchange_type=fanout</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#rabbitmq_exchange_durable=false</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#rabbitmq_exchange_autodelete=false</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#rabbitmq_routing_key_template=%db%.%table%</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#rabbitmq_message_persistent=false</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#rabbitmq_declare_exchange=true</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h3 id="_3-5、修改启动文件" tabindex="-1"><a class="header-anchor" href="#_3-5、修改启动文件"><span>3-5、修改启动文件</span></a></h3><p>启动文件是 <code>bin/maxwell</code> ，因为大部分人配置都是JDK8，所以直接从环境变量里面读取是不行的，这里我们要把JDK换成11的</p><p>找到你JDK11的安装目录，把下面的代码删掉换成你自己的JDK11位置，比如我的配置如下</p><figure><img src="`+e+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">JAVA</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;/usr/local/jdk-11.0.15.1/bin/java&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><br><h3 id="_3-6、启动" tabindex="-1"><a class="header-anchor" href="#_3-6、启动"><span>3-6、启动</span></a></h3><p>进入到bin目录下，输入下面的命令</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">./maxwell</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>有可能提示权限不够，我们可以使用下面的命令赋值权限后，再启用</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">chmod</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 777</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> ./maxwell</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><br><figure><img src="'+t+`" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><h3 id="_3-7、测试" tabindex="-1"><a class="header-anchor" href="#_3-7、测试"><span>3-7、测试</span></a></h3><p>我们可以使用navicat或者任意操作数据库的办法，比如我们在数据库里面执行这样一句</p><div class="language-sql line-numbers-mode" data-highlighter="shiki" data-ext="sql" data-title="sql" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">INSERT INTO</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> user (id, user_name) </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">VALUES</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">7</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;小道仙&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>我们的控制台会打印这样的数据（数据是一行的，为了展示，我把它换行了）</p><div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" data-title="json" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">	&quot;database&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;test&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">	&quot;table&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;user&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">	&quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;insert&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">	&quot;ts&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">1654417263</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">	&quot;xid&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">70955</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">	&quot;commit&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">	&quot;data&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">		&quot;id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;7&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">		&quot;user_name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;小道仙&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><p>更新语句</p><div class="language-sql line-numbers-mode" data-highlighter="shiki" data-ext="sql" data-title="sql" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">UPDATE</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> \`user\`</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> SET</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> user_name </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;小道仙97&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> WHERE</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> id </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 7</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">	&quot;database&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;test&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">	&quot;table&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;user&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">	&quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;update&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">	&quot;ts&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">1654417405</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">	&quot;xid&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">71147</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">	&quot;commit&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: true,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">	&quot;data&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">		&quot;id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;7&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">		&quot;user_name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;小道仙97&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">	},</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">	&quot;old&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">		&quot;user_name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;小道仙&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><p>删除语句</p><div class="language-sql line-numbers-mode" data-highlighter="shiki" data-ext="sql" data-title="sql" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">DELETE</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> FROM</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> \`user\`</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> WHERE</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> id </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">IN</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">	&quot;database&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;test&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">	&quot;table&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;user&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">	&quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;delete&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">	&quot;ts&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">1654417609</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">	&quot;xid&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">71478</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">	&quot;xoffset&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">	&quot;data&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">		&quot;id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">		&quot;user_name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;张三&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">} </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">	&quot;database&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;test&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">	&quot;table&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;user&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">	&quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;delete&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">	&quot;ts&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">1654417609</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">	&quot;xid&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">71478</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">	&quot;xoffset&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">	&quot;data&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">		&quot;id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;2&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">		&quot;user_name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;李四&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h2 id="四、其它" tabindex="-1"><a class="header-anchor" href="#四、其它"><span>四、其它</span></a></h2><br><h3 id="_4-1、maxwell-官方文档" tabindex="-1"><a class="header-anchor" href="#_4-1、maxwell-官方文档"><span>4-1、maxwell 官方文档</span></a></h3><p><a href="https://maxwells-daemon.io/" target="_blank" rel="noopener noreferrer">https://maxwells-daemon.io/</a></p><br><h3 id="_4-2、实际使用中的问题" tabindex="-1"><a class="header-anchor" href="#_4-2、实际使用中的问题"><span>4-2、实际使用中的问题</span></a></h3><p>其实也就是一些队列消费的问题了，比如保持<code>幂等</code>、<code>消息丢失</code>、<code>消费速率</code>、<code>消息积压</code>问题等，这里主要说一下消息积压的问题。</p><p>我们开了40个线程，消费队列5k，但依旧消费不过来，线程池默认的拒绝策略是<mark>丢弃并抛出异常</mark>，我们可以改成<mark>使用当前线程处理</mark>，这样虽然消费会慢点，但不至于丢数据。 （当然实际上开多少个线程还是要根据你的业务来）</p><p>maxwell是监控当前链接的全部数据库，我们可以进行一个限制，使其只监控我们需要的库、表。</p><p>ps：这里吐槽一下，线程池的拒绝策略我背了很熟了，但出了问题我却没想到可以换一种策略来处理。 <br></p><h3 id="_4-n、下面是准备的安装包" tabindex="-1"><a class="header-anchor" href="#_4-n、下面是准备的安装包"><span>4-N、下面是准备的安装包</span></a></h3><figure><img src="`+h+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><p>关注微信公众号回复关键字获取：<strong>maxwellFile</strong></p>',77),r=[k];function d(o,c){return a(),s("div",null,r)}const b=i(p,[["render",d],["__file","MySQL之监控binlog日志，解决系统响应慢的问题【maxwell】.html.vue"]]),y=JSON.parse('{"path":"/19%E5%9C%BA%E6%99%AF%E9%A2%98/01%E5%8A%9F%E8%83%BD%E5%AE%9E%E8%B7%B5/MySQL%E4%B9%8B%E7%9B%91%E6%8E%A7binlog%E6%97%A5%E5%BF%97%EF%BC%8C%E8%A7%A3%E5%86%B3%E7%B3%BB%E7%BB%9F%E5%93%8D%E5%BA%94%E6%85%A2%E7%9A%84%E9%97%AE%E9%A2%98%E3%80%90maxwell%E3%80%91.html","title":"【初】MySQL之监控binlog日志，解决系统响应慢的问题【maxwell】","lang":"zh-CN","frontmatter":{"title":"【初】MySQL之监控binlog日志，解决系统响应慢的问题【maxwell】","shortTitle":"【初】MySQL之监控binlog日志，解决系统响应慢的问题【maxwell】","index":true,"date":"2022-06-11T18:22:34.000Z","category":["初级","视频讲解"],"tag":["maxwell"],"description":"视频地址： https://www.bilibili.com/video/BV1PY4y1s7a1 一、场景 不知道你是否有无数次吐槽公司的架构设计，比如某一个关键的列表， join 了无数张表 （join 代表了left join、 inner join 等） 做了一个新功能，新增了几张表，列表为了展示一个字段，又去关联一张大表，这样的操作，速度不慢...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/19%E5%9C%BA%E6%99%AF%E9%A2%98/01%E5%8A%9F%E8%83%BD%E5%AE%9E%E8%B7%B5/MySQL%E4%B9%8B%E7%9B%91%E6%8E%A7binlog%E6%97%A5%E5%BF%97%EF%BC%8C%E8%A7%A3%E5%86%B3%E7%B3%BB%E7%BB%9F%E5%93%8D%E5%BA%94%E6%85%A2%E7%9A%84%E9%97%AE%E9%A2%98%E3%80%90maxwell%E3%80%91.html"}],["meta",{"property":"og:site_name","content":"小道仙Java笔记"}],["meta",{"property":"og:title","content":"【初】MySQL之监控binlog日志，解决系统响应慢的问题【maxwell】"}],["meta",{"property":"og:description","content":"视频地址： https://www.bilibili.com/video/BV1PY4y1s7a1 一、场景 不知道你是否有无数次吐槽公司的架构设计，比如某一个关键的列表， join 了无数张表 （join 代表了left join、 inner join 等） 做了一个新功能，新增了几张表，列表为了展示一个字段，又去关联一张大表，这样的操作，速度不慢..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-08-10T08:35:36.000Z"}],["meta",{"property":"article:author","content":"小道仙97"}],["meta",{"property":"article:tag","content":"maxwell"}],["meta",{"property":"article:published_time","content":"2022-06-11T18:22:34.000Z"}],["meta",{"property":"article:modified_time","content":"2024-08-10T08:35:36.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"【初】MySQL之监控binlog日志，解决系统响应慢的问题【maxwell】\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-06-11T18:22:34.000Z\\",\\"dateModified\\":\\"2024-08-10T08:35:36.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小道仙97\\",\\"url\\":\\"https://java.xdx97.com\\"}]}"]]},"headers":[{"level":2,"title":"一、场景","slug":"一、场景","link":"#一、场景","children":[]},{"level":2,"title":"二、解决方案","slug":"二、解决方案","link":"#二、解决方案","children":[]},{"level":2,"title":"三、实践","slug":"三、实践","link":"#三、实践","children":[{"level":3,"title":"3-1、开始","slug":"_3-1、开始","link":"#_3-1、开始","children":[]},{"level":3,"title":"3-2、下载maxwell","slug":"_3-2、下载maxwell","link":"#_3-2、下载maxwell","children":[]},{"level":3,"title":"3-3、MySQL配置","slug":"_3-3、mysql配置","link":"#_3-3、mysql配置","children":[]},{"level":3,"title":"3-4、配置文件","slug":"_3-4、配置文件","link":"#_3-4、配置文件","children":[]},{"level":3,"title":"3-5、修改启动文件","slug":"_3-5、修改启动文件","link":"#_3-5、修改启动文件","children":[]},{"level":3,"title":"3-6、启动","slug":"_3-6、启动","link":"#_3-6、启动","children":[]},{"level":3,"title":"3-7、测试","slug":"_3-7、测试","link":"#_3-7、测试","children":[]}]},{"level":2,"title":"四、其它","slug":"四、其它","link":"#四、其它","children":[{"level":3,"title":"4-1、maxwell 官方文档","slug":"_4-1、maxwell-官方文档","link":"#_4-1、maxwell-官方文档","children":[]},{"level":3,"title":"4-2、实际使用中的问题","slug":"_4-2、实际使用中的问题","link":"#_4-2、实际使用中的问题","children":[]},{"level":3,"title":"4-N、下面是准备的安装包","slug":"_4-n、下面是准备的安装包","link":"#_4-n、下面是准备的安装包","children":[]}]}],"git":{"createdTime":1723278936000,"updatedTime":1723278936000,"contributors":[{"name":"ziyangtao","email":"ziyangtao@distinctclinic.com","commits":1}]},"readingTime":{"minutes":5.74,"words":1722},"filePathRelative":"19场景题/01功能实践/MySQL之监控binlog日志，解决系统响应慢的问题【maxwell】.md","localizedDate":"2022年6月12日","excerpt":"<br>\\n<p>视频地址：  <a href=\\"https://www.bilibili.com/video/BV1PY4y1s7a1\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://www.bilibili.com/video/BV1PY4y1s7a1</a></p>\\n<br>\\n<h2>一、场景</h2>\\n<blockquote>\\n<p>不知道你是否有无数次吐槽公司的架构设计，比如某一个关键的列表， <code>join</code> 了无数张表 （join 代表了left join、 inner join 等）  <br>\\n做了一个新功能，新增了几张表，列表为了展示一个字段，又去关联一张大表，这样的操作，速度不慢才怪嘞 <br>\\n很遗憾我们现在的系统就是这样的，不知道你们有没有听说过ADB这样的数据库，它们主要是用来处理大数据的，性能超强，我们一个查询<code>20s</code>的SQL，迁移到ADB里面那就<code>0.Ns</code>了   (我们不去探索它为什么这么快哈) <br>\\n但尽管如此，终会有一天ADB这样的数据库也扛不住，这一天已经不远了 <br>\\n以前我的想法总是说去重构代码，但每次只是想想就头痛，一个关键的列表，关联了十几张表，谁敢去动它呢？ <br></p>\\n</blockquote>","autoDesc":true}');export{b as comp,y as data};
