import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,a,w as n,b as s,r as p,o as h,f as e}from"./app-BRh3vv8H.js";const r="/assets/0302_1-pbVGN6yr.png",d="/assets/0302_2-UNG1RKmc.png",k="/assets/0302_3-BO1egNd5.png",c="/assets/0302_4-DdCcnlqt.png",o="/assets/0302_5-DwoLTOsq.png",g="/assets/0302_6-CUVDELAu.png",y="/assets/0302_7-BVggH6I2.png",F={},u=s('<blockquote><p>在我看来主从模式和哨兵集群这都不能算是真正的集群，只有<strong>Redis分片集群模式</strong>才是真的集群。 <br> 可能看到这么说大家会很疑惑，那么请看下面相信你一定会有所获。</p></blockquote><ul><li><a href="http://www.redis.cn/topics/cluster-tutorial.html" target="_blank" rel="noopener noreferrer">Redis集群中文文档</a></li><li>之前一直担心搭建集群虚拟机内存不足，搭建完发现6个Redis只用了0.1G内存。（可能是Redis数据存储在内存中的，没数据的时候内存使用就很少）</li></ul><br><p>@[toc]</p><h2 id="一、主从集群" tabindex="-1"><a class="header-anchor" href="#一、主从集群"><span>一、主从集群</span></a></h2><p>相信有一点集群知识的人，一看到<strong>主从集群</strong>脑海里很快就浮现出了概念图，没错正如你所想的。</p><figure><img src="'+r+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><p>单机模式下，如果Redis宕机了，那服务就会不可用了。所以我们需要搭建主从集群。</p><ul><li>主数据库可读可写</li><li>从数据库只能读（从数据库从主数据库同步数据）</li></ul><p><strong>但是主从模式存在一个问题就是当主服务断掉后，服务将只可读不可写</strong></p><p><br><br></p><h2 id="二、哨兵集群" tabindex="-1"><a class="header-anchor" href="#二、哨兵集群"><span>二、哨兵集群</span></a></h2><p>哨兵其实和数据的存储没有关系，上面我们遗留了一个问题：<mark>主从模式下当主服务断掉后，服务将只可读不可写</mark>，哨兵则是来解决这个问题的。</p><p>哨兵的作用就是在主服务宕机后，在从服务里面选一个来做新的主服务。</p><br><h3 id="_2-1、哨兵的作用" tabindex="-1"><a class="header-anchor" href="#_2-1、哨兵的作用"><span>2-1、哨兵的作用</span></a></h3><ul><li><strong>监控</strong>：哨兵会不断的检查你的主服务器和从服务器是否运作正常</li><li><strong>通知</strong>：当被监控的某个 Redis 服务器出现问题时， 哨兵可以通过API向管理员或者其他应用程序发送通知</li><li><strong>故障迁移</strong>：当主服务器不能正常工作时，哨兵会自动进行故障迁移，也就是主从切换</li><li><strong>统一的配置管理</strong>：连接者询问哨兵取得主从的地址</li></ul><br><h3 id="_2-2、哨兵原理" tabindex="-1"><a class="header-anchor" href="#_2-2、哨兵原理"><span>2-2、哨兵原理</span></a></h3><p>哨兵使用的算法核心是 Raft 算法，主要用途就是用于分布式系统，系统容错，以及Leader选举，每个哨兵都需要定期的执行以下任务</p><ol><li>每个 哨兵会自动发现其他 哨兵和从服务器，它以每秒钟一次的频率向它所知的主服务器、从服务器以及其他 哨兵实例发送一个 PING 命令。</li><li>如果一个实例(instance)距离最后一次有效回复 PING 命令的时间超过 down-after-milliseconds 选项所指定的值， 那么这个实例会被 哨兵标记为主观下线。 有效回复可以是： +PONG 、 -LOADING 或者 -MASTERDOWN 。</li><li>如果一个主服务器被标记为主观下线， 那么正在监视这个主服务器的所有哨兵要以每秒一次的频率确认主服务器的确进入了主观下线状态。</li><li>如果一个主服务器被标记为主观下线， 并且有足够数量的哨兵(至少要达到配置文件指定的数量)在指定的时间范围内同意这一判断， 那么这个主服务器被标记为客观下线。</li><li>在一般情况下， 每个哨兵会以每 10 秒一次的频率向它已知的所有主服务器和从服务器发送 INFO 命令。 当一个主服务器被哨兵标记为客观下线时，哨兵向下线主服务器的所有从服务器发送 INFO 命令的频率会从 10 秒一次改为每秒一次。</li><li>当没有足够数量的哨兵同意主服务器已经下线， 主服务器的客观下线状态就会被移除。 当主服务器重新向哨兵的 PING 命令返回有效回复时， 主服务器的主管下线状态就会被移除。</li></ol><p><br><br></p><h2 id="三、分片集群" tabindex="-1"><a class="header-anchor" href="#三、分片集群"><span>三、分片集群</span></a></h2><p>如果数据量很大，虽然我们可以考虑加大Redis的硬件，但仍不是一个好的解决办法，这时候我们就需要使用分片集群。</p><br><h3 id="_3-1、分片集群简单理解" tabindex="-1"><a class="header-anchor" href="#_3-1、分片集群简单理解"><span>3-1、分片集群简单理解</span></a></h3><p>我们把集群中的每一个节点当作是一个水桶，而我们的数据只存在其中一个水桶（不用管怎么存怎么取Redis已经做好了），这样当数据越来越多，我们只需要新增“水桶”就好了</p><p>因为集群中的每一个服务中的数据都是独一无二的，所以每一个服务需要一个备用服务，也就是主从模式（和上面的不一样哦）</p><br><h3 id="_3-2、分片集群深入理解" tabindex="-1"><a class="header-anchor" href="#_3-2、分片集群深入理解"><span>3-2、分片集群深入理解</span></a></h3><p>Redis 集群没有使用一致性hash, 而是引入了 哈希槽的概念.</p><p>Redis 集群有16384个哈希槽,每个key通过CRC16校验后对16384取模来决定放置哪个槽.集群的每个节点负责一部分hash槽,举个例子,比如当前集群有3个节点,那么:</p><ul><li>节点 A 包含 0 到 5500号哈希槽</li><li>节点 B 包含5501 到 11000 号哈希槽</li><li>节点 C 包含11001 到 16384号哈希槽</li></ul><p>这种结构很容易添加或者删除节点. 比如如果我想新添加个节点D, 我需要从节点 A, B, C中得部分槽到D上. 如果我想移除节点A,需要将A中的槽移到B和C节点上,然后将没有任何槽的A节点从集群中移除即可. 由于从一个节点将哈希槽移动到另一个节点并不会停止服务,所以无论添加删除或者改变某个节点的哈希槽的数量都不会造成集群不可用的状态</p><br><p><strong>Redis 集群的主从复制模型</strong></p><p>为了使在部分节点失败或者大部分节点无法通信的情况下集群仍然可用，所以集群使用了主从复制模型,每个节点都会有N个复制品</p><p>在我们例子中具有A，B，C三个节点的集群,在没有复制模型的情况下,如果节点B失败了，那么整个集群就会以为缺少5501-11000这个范围的槽而不可用</p><p>然而如果在集群创建的时候（或者过一段时间）我们为每个节点添加一个从节点A1，B1，C1,那么整个集群便有三个master节点和三个slave节点组成，这样在节点B失败后，集群便会选举B1为新的主节点继续服务，整个集群便不会因为槽找不到而不可用了</p><p>不过当B和B1 都失败后，集群是不可用的</p><br><h3 id="_3-3、redis集群图" tabindex="-1"><a class="header-anchor" href="#_3-3、redis集群图"><span>3-3、Redis集群图</span></a></h3><figure><img src="'+d+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure>',43),v=s('<br><h3 id="_3-4、其它补充" tabindex="-1"><a class="header-anchor" href="#_3-4、其它补充"><span>3-4、其它补充</span></a></h3><p>我们知道主从模式中，都是客户端插入数据到主节点，然后主节点去插入到其它的从节点。如果从节点过多就会导致主节点的性能下降（毕竟数据的复制是需要消耗的）</p><p><strong>使用主-从-从的模式可以降低主节点的压力</strong></p><figure><img src="'+k+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><p><br><br></p><h2 id="三、集群搭建" tabindex="-1"><a class="header-anchor" href="#三、集群搭建"><span>三、集群搭建</span></a></h2><blockquote><p>主从模式、哨兵集群感觉没啥用，就不搭建了，这里直接搭建真·Redis集群</p></blockquote><br><h3 id="_3-1、环境准备" tabindex="-1"><a class="header-anchor" href="#_3-1、环境准备"><span>3-1、环境准备</span></a></h3><p>集群里面有三份，然后按照主从模式搭建，也就是需要6台Redis。按照下面的文档按照6次即可</p><p><a href="https://www.xdx97.com/article/651017203176439808" target="_blank" rel="noopener noreferrer">Linux下安装Redis,并修改默认端口和密码，设置后台启动【阿里云CentOS7.3】</a></p><figure><img src="'+c+`" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><h3 id="_3-2、配置文件修改" tabindex="-1"><a class="header-anchor" href="#_3-2、配置文件修改"><span>3-2、配置文件修改</span></a></h3><p>为了方便大家，我把redis.conf里面的注释全部删掉了，然后整理整理了一份简洁版的，<mark>需要修改的地方我全部加了注释</mark>，大家简单修改复制进去即可。</p><p><strong>这只是为了方便大家搭建，正式环境不要这样做</strong></p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#去掉bind绑定访问ip信息</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">bind</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 0.0.0.0</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#关闭保护模式</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">protected-mode</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> no</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#修改对应的端口</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">port</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 5001</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#启动集群模式</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">cluster-enabled</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> yes</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#集群节点信息文件，这里500x最好和port对应上</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">cluster-config-file</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> nodes-5001.conf</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#节点离线的超时时间</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">cluster-node-timeout</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 5000</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#如果要设置密码需要增加如下配置：</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#设置redis访问密码</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">requirepass</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> xdx97</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#设置集群节点间访问密码，跟上面一致</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">masterauth</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> xdx97</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 修改启动进程号存储位置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">pidfile</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> /var/run/redis_5001.pid</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#指定数据文件存放位置，必须要指定不同的目录位置，不然会丢失数据</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">dir</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> /usr/local/redis-cluster/redis-5001</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#修改为后台启动</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">daemonize</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> yes</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#启动AOF文件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">appendonly</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> yes</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">tcp-backlog</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 511</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">timeout</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 0</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">tcp-keepalive</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 300</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">supervised</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> no</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">loglevel</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> notice</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">logfile</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">databases</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 16</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">always-show-logo</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> yes</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">save</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 900</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">save</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 300</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 10</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">save</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 60</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 10000</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">stop-writes-on-bgsave-error</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> yes</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">rdbcompression</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> yes</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">rdbchecksum</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> yes</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">dbfilename</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> dump.rdb</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">replica-serve-stale-data</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> yes</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">replica-read-only</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> yes</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">repl-diskless-sync</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> no</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">repl-diskless-sync-delay</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 5</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">repl-disable-tcp-nodelay</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> no</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">replica-priority</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 100</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">lazyfree-lazy-eviction</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> no</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">lazyfree-lazy-expire</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> no</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">lazyfree-lazy-server-del</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> no</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">replica-lazy-flush</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> no</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">appendfilename</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;appendonly.aof&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">appendfsync</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> everysec</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">no-appendfsync-on-rewrite</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> no</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">auto-aof-rewrite-percentage</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 100</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">auto-aof-rewrite-min-size</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 64mb</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">aof-load-truncated</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> yes</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">aof-use-rdb-preamble</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> yes</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">lua-time-limit</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 5000</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">slowlog-log-slower-than</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 10000</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">slowlog-max-len</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 128</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">latency-monitor-threshold</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 0</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">notify-keyspace-events</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">hash-max-ziplist-entries</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 512</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">hash-max-ziplist-value</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 64</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">list-max-ziplist-size</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -2</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">list-compress-depth</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 0</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">set-max-intset-entries</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 512</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">zset-max-ziplist-entries</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 128</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">zset-max-ziplist-value</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 64</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">hll-sparse-max-bytes</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 3000</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">stream-node-max-bytes</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 4096</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">stream-node-max-entries</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 100</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">activerehashing</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> yes</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">client-output-buffer-limit</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> normal</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 0</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">client-output-buffer-limit</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> replica</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 256mb</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 64mb</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 60</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">client-output-buffer-limit</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> pubsub</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 32mb</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 8mb</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 60</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">hz</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 10</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">dynamic-hz</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> yes</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">aof-rewrite-incremental-fsync</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> yes</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">rdb-save-incremental-fsync</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> yes</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h3 id="_3-3、启动全部的redis" tabindex="-1"><a class="header-anchor" href="#_3-3、启动全部的redis"><span>3-3、启动全部的redis</span></a></h3><p>打码的这一台是平时我自己使用的，不用在意</p><figure><img src="`+o+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><h3 id="_3-4、集群搭建" tabindex="-1"><a class="header-anchor" href="#_3-4、集群搭建"><span>3-4、集群搭建</span></a></h3><p>使用 redis-cli 创建整个 redis 集群（redis5.0版本之前使用的ruby脚本 redis-trib.rb）</p><br><ul><li><strong>/usr/local/redis-cluster/redis-5001/redis-5.0.5/src/redis-cli</strong> 随便找一台服务使用它的redis-cli命令</li><li><strong>-a xdx97</strong> 我们之前设置的密码</li><li><strong>--cluster-replicas 1</strong> 主从搭配比例，1表示一主一从，2表示一主2从</li></ul>',27),b=s('<div class="language-sql line-numbers-mode" data-highlighter="shiki" data-ext="sql" data-title="sql" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">usr</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">/</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">local</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">redis</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">cluster</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">redis</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">5001</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">redis</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">5</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">5</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">src</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">redis</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">cli </span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">a xdx97 </span><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">--cluster create --cluster-replicas 1 127.0.0.1:5001 127.0.0.1:5002 127.0.0.1:5003 127.0.0.1:5004 127.0.0.1:5005 127.0.0.1:5006</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><br><p>执行完后会出现下面的界面，输入<mark>yes</mark>回车即可，我们可以得到以下信息</p><ul><li>每一个主服务的哈希槽是多少</li><li>谁是主谁是从，谁是谁的主，谁是谁的从</li></ul><figure><img src="'+g+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><p><strong>成功标识</strong></p><figure><img src="'+y+`" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><p>可以通过命令查看Redis集群的相关命令</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">./redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> --cluster</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> help</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><br><br></p><h2 id="四、集群相关知识" tabindex="-1"><a class="header-anchor" href="#四、集群相关知识"><span>四、集群相关知识</span></a></h2><br><h3 id="_4-1、redis集群选举原理" tabindex="-1"><a class="header-anchor" href="#_4-1、redis集群选举原理"><span>4-1、Redis集群选举原理</span></a></h3><p>从节点的选举和提升都是由从节点处理的，主节点会投票要提升哪个从节点。一个从节点的选举是在主节点被至少一个具有成为主节点必备条件的从节点标记为 FAIL 的状态的时候发生的。</p><p>当以下条件满足时，一个从节点可以发起选举：</p><ul><li>该从节点的主节点处于 FAIL 状态</li><li>这个主节点负责的哈希槽数目不为零</li><li>从节点和主节点之间的重复连接（replication link）断线不超过一段给定的时间，这是为了确保从节点的数据是可靠的</li><li>一个从节点想要被推选出来，那么第一步应该是提高它的 currentEpoch 计数，并且向主节点们请求投票</li></ul><p>从节点通过广播一个 FAILOVER_AUTH_REQUEST 数据包给集群里的每个主节点来请求选票。然后等待回复（最多等 NODE_TIMEOUT 这么长时间）。一旦一个主节点给这个从节点投票，会回复一个 FAILOVER_AUTH_ACK，并且在 NODE_TIMEOUT * 2 这段时间内不能再给同个主节点的其他从节点投票。在这段时间内它完全不能回复其他授权请求。</p><p>从节点会忽视所有带有的时期（epoch）参数比 currentEpoch 小的回应（ACKs），这样能避免把之前的投票的算为当前的合理投票。</p><p>一旦某个从节点收到了大多数主节点的回应，那么它就赢得了选举。否则，如果无法在 NODE_TIMEOUT 时间内访问到大多数主节点，那么当前选举会被中断并在 NODE_TIMEOUT * 4 这段时间后由另一个从节点尝试发起选举。</p><p>一旦有从节点赢得选举，它就会开始用 ping 和 pong 数据包向其他节点宣布自己已经是主节点，并提供它负责的哈希槽，设置 configEpoch 为 currentEpoch（选举开始时生成的）。</p><br><h3 id="_4-2、新增节点、删除节点" tabindex="-1"><a class="header-anchor" href="#_4-2、新增节点、删除节点"><span>4-2、新增节点、删除节点</span></a></h3><p>参考文档：<a href="http://www.redis.cn/topics/cluster-tutorial.html" target="_blank" rel="noopener noreferrer">http://www.redis.cn/topics/cluster-tutorial.html</a></p><br><h3 id="_4-3、集群的重启、重新创建" tabindex="-1"><a class="header-anchor" href="#_4-3、集群的重启、重新创建"><span>4-3、集群的重启、重新创建</span></a></h3><br><h4 id="_4-3-1、不改变原有集群" tabindex="-1"><a class="header-anchor" href="#_4-3-1、不改变原有集群"><span>4-3-1、不改变原有集群</span></a></h4><p>如果不改变原有集群，只是想重启一下，只需要把全部节点都关闭，然后再把全部节点打开即可。</p><br><h4 id="_4-3-2、新建集群" tabindex="-1"><a class="header-anchor" href="#_4-3-2、新建集群"><span>4-3-2、新建集群</span></a></h4><ol><li>关闭之前的全部节点</li><li>删除<strong>nodes-500x.conf</strong>、<strong>dump.rdb</strong>、<strong>appendonly.aof</strong>文件 （如果是按照我上面的conf，则这几个文件在安装目录下面）</li><li>重启全部的服务</li><li>使用上面的命令重新创建集群</li></ol><p><br><br></p><h2 id="五、使用java来操作redis集群" tabindex="-1"><a class="header-anchor" href="#五、使用java来操作redis集群"><span>五、使用Java来操作Redis集群</span></a></h2><blockquote><p>下面的整合都是基于RedisTemplate</p></blockquote><h3 id="_5-1、单节点整合redis" tabindex="-1"><a class="header-anchor" href="#_5-1、单节点整合redis"><span>5-1、单节点整合Redis</span></a></h3><p><a href="https://blog.csdn.net/Tomwildboar/article/details/109923596" target="_blank" rel="noopener noreferrer">https://blog.csdn.net/Tomwildboar/article/details/109923596</a></p><br><h3 id="_5-2、集群整合" tabindex="-1"><a class="header-anchor" href="#_5-2、集群整合"><span>5-2、集群整合</span></a></h3><p>其实只要搭建好上面的环境，整合集群是相当简单的，只需要把配置文件修改为如下即可：</p><div class="language-conf line-numbers-mode" data-highlighter="shiki" data-ext="conf" data-title="conf" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>spring.redis.cluster.nodes=127.0.0.1:5001,127.0.0.1:5002,127.0.0.1:5003,127.0.0.1:5004,127.0.0.1:5005,127.0.0.1:5006</span></span>
<span class="line"><span>spring.redis.password=xdx97</span></span>
<span class="line"><span>spring.redis.timeout=5000</span></span>
<span class="line"><span>spring.redis.cluster.max-redirects=3</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,41);function m(C,A){const i=p("font");return h(),t("div",null,[u,a(i,{color:"red"},{default:n(()=>[e("需要说明的是，分片集群里面的主从是不需要依赖哨兵的，当其中一个主节点宕机也是可以由另外的从节点顶替上")]),_:1}),v,a(i,{color:"red"},{default:n(()=>[e("**特别说明一下，我下面使用的127.0.0.1只是一个展示，要使用可以被客户端访问到的ip**")]),_:1}),b])}const _=l(F,[["render",m],["__file","Redis集群之主从、哨兵、分片集群，SpringBoot整合Redis集群.html.vue"]]),B=JSON.parse('{"path":"/03%E6%95%B0%E6%8D%AE%E5%BA%93/02Redis/Redis%E9%9B%86%E7%BE%A4%E4%B9%8B%E4%B8%BB%E4%BB%8E%E3%80%81%E5%93%A8%E5%85%B5%E3%80%81%E5%88%86%E7%89%87%E9%9B%86%E7%BE%A4%EF%BC%8CSpringBoot%E6%95%B4%E5%90%88Redis%E9%9B%86%E7%BE%A4.html","title":"【初】Redis集群之主从、哨兵、分片集群，SpringBoot整合Redis集群","lang":"zh-CN","frontmatter":{"title":"【初】Redis集群之主从、哨兵、分片集群，SpringBoot整合Redis集群","shortTitle":"【初】Redis集群之主从、哨兵、分片集群","date":"2023-11-10T23:17:10.000Z","category":["初级"],"tag":["Redis","分布式","Redis集群","主从集群","哨兵集群"],"description":"在我看来主从模式和哨兵集群这都不能算是真正的集群，只有Redis分片集群模式才是真的集群。 可能看到这么说大家会很疑惑，那么请看下面相信你一定会有所获。 Redis集群中文文档 之前一直担心搭建集群虚拟机内存不足，搭建完发现6个Redis只用了0.1G内存。（可能是Redis数据存储在内存中的，没数据的时候内存使用就很少） @[toc] 一、主从集群 ...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/03%E6%95%B0%E6%8D%AE%E5%BA%93/02Redis/Redis%E9%9B%86%E7%BE%A4%E4%B9%8B%E4%B8%BB%E4%BB%8E%E3%80%81%E5%93%A8%E5%85%B5%E3%80%81%E5%88%86%E7%89%87%E9%9B%86%E7%BE%A4%EF%BC%8CSpringBoot%E6%95%B4%E5%90%88Redis%E9%9B%86%E7%BE%A4.html"}],["meta",{"property":"og:site_name","content":"小道仙Java笔记"}],["meta",{"property":"og:title","content":"【初】Redis集群之主从、哨兵、分片集群，SpringBoot整合Redis集群"}],["meta",{"property":"og:description","content":"在我看来主从模式和哨兵集群这都不能算是真正的集群，只有Redis分片集群模式才是真的集群。 可能看到这么说大家会很疑惑，那么请看下面相信你一定会有所获。 Redis集群中文文档 之前一直担心搭建集群虚拟机内存不足，搭建完发现6个Redis只用了0.1G内存。（可能是Redis数据存储在内存中的，没数据的时候内存使用就很少） @[toc] 一、主从集群 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-20T12:30:55.000Z"}],["meta",{"property":"article:author","content":"小道仙97"}],["meta",{"property":"article:tag","content":"Redis"}],["meta",{"property":"article:tag","content":"分布式"}],["meta",{"property":"article:tag","content":"Redis集群"}],["meta",{"property":"article:tag","content":"主从集群"}],["meta",{"property":"article:tag","content":"哨兵集群"}],["meta",{"property":"article:published_time","content":"2023-11-10T23:17:10.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-20T12:30:55.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"【初】Redis集群之主从、哨兵、分片集群，SpringBoot整合Redis集群\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-11-10T23:17:10.000Z\\",\\"dateModified\\":\\"2024-07-20T12:30:55.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小道仙97\\",\\"url\\":\\"https://java.xdx97.com\\"}]}"]]},"headers":[{"level":2,"title":"一、主从集群","slug":"一、主从集群","link":"#一、主从集群","children":[]},{"level":2,"title":"二、哨兵集群","slug":"二、哨兵集群","link":"#二、哨兵集群","children":[{"level":3,"title":"2-1、哨兵的作用","slug":"_2-1、哨兵的作用","link":"#_2-1、哨兵的作用","children":[]},{"level":3,"title":"2-2、哨兵原理","slug":"_2-2、哨兵原理","link":"#_2-2、哨兵原理","children":[]}]},{"level":2,"title":"三、分片集群","slug":"三、分片集群","link":"#三、分片集群","children":[{"level":3,"title":"3-1、分片集群简单理解","slug":"_3-1、分片集群简单理解","link":"#_3-1、分片集群简单理解","children":[]},{"level":3,"title":"3-2、分片集群深入理解","slug":"_3-2、分片集群深入理解","link":"#_3-2、分片集群深入理解","children":[]},{"level":3,"title":"3-3、Redis集群图","slug":"_3-3、redis集群图","link":"#_3-3、redis集群图","children":[]},{"level":3,"title":"3-4、其它补充","slug":"_3-4、其它补充","link":"#_3-4、其它补充","children":[]}]},{"level":2,"title":"三、集群搭建","slug":"三、集群搭建","link":"#三、集群搭建","children":[{"level":3,"title":"3-1、环境准备","slug":"_3-1、环境准备","link":"#_3-1、环境准备","children":[]},{"level":3,"title":"3-2、配置文件修改","slug":"_3-2、配置文件修改","link":"#_3-2、配置文件修改","children":[]},{"level":3,"title":"3-3、启动全部的redis","slug":"_3-3、启动全部的redis","link":"#_3-3、启动全部的redis","children":[]},{"level":3,"title":"3-4、集群搭建","slug":"_3-4、集群搭建","link":"#_3-4、集群搭建","children":[]}]},{"level":2,"title":"四、集群相关知识","slug":"四、集群相关知识","link":"#四、集群相关知识","children":[{"level":3,"title":"4-1、Redis集群选举原理","slug":"_4-1、redis集群选举原理","link":"#_4-1、redis集群选举原理","children":[]},{"level":3,"title":"4-2、新增节点、删除节点","slug":"_4-2、新增节点、删除节点","link":"#_4-2、新增节点、删除节点","children":[]},{"level":3,"title":"4-3、集群的重启、重新创建","slug":"_4-3、集群的重启、重新创建","link":"#_4-3、集群的重启、重新创建","children":[]}]},{"level":2,"title":"五、使用Java来操作Redis集群","slug":"五、使用java来操作redis集群","link":"#五、使用java来操作redis集群","children":[{"level":3,"title":"5-1、单节点整合Redis","slug":"_5-1、单节点整合redis","link":"#_5-1、单节点整合redis","children":[]},{"level":3,"title":"5-2、集群整合","slug":"_5-2、集群整合","link":"#_5-2、集群整合","children":[]}]}],"git":{"createdTime":1721461625000,"updatedTime":1721478655000,"contributors":[{"name":"ziyangtao","email":"ziyangtao@distinctclinic.com","commits":6}]},"readingTime":{"minutes":12.06,"words":3617},"filePathRelative":"03数据库/02Redis/Redis集群之主从、哨兵、分片集群，SpringBoot整合Redis集群.md","localizedDate":"2023年11月11日","excerpt":"<blockquote>\\n<p>在我看来主从模式和哨兵集群这都不能算是真正的集群，只有<strong>Redis分片集群模式</strong>才是真的集群。 <br>\\n可能看到这么说大家会很疑惑，那么请看下面相信你一定会有所获。</p>\\n</blockquote>\\n<ul>\\n<li><a href=\\"http://www.redis.cn/topics/cluster-tutorial.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Redis集群中文文档</a></li>\\n<li>之前一直担心搭建集群虚拟机内存不足，搭建完发现6个Redis只用了0.1G内存。（可能是Redis数据存储在内存中的，没数据的时候内存使用就很少）</li>\\n</ul>","autoDesc":true}');export{_ as comp,B as data};
