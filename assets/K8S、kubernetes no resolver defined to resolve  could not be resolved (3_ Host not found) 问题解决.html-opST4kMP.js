import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,a as e,w as l,b as s,r as t,o as h,f as k}from"./app-BcAKAKCF.js";const p="/assets/25_1-CNbifZDd.png",r="/assets/25_2-BhVZZMzw.png",d={},o=s(`<h2 id="开始" tabindex="-1"><a class="header-anchor" href="#开始"><span>开始</span></a></h2><p>最近在使用openResty搭建一个动态代理功能，遇到了死命的问题，弄了几天才弄好，遂记录下来。</p><ol><li>openResty 如果不熟悉的人可以把它理解成nginx</li><li>环境是在K8S容器内部</li><li>curl http://openresty-svc/data-dashboard/card/myClueList （请求的命令）</li></ol><br><p><strong>下面是我配置的 nginx.conf</strong></p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">http</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    server</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">        listen</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 80</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">        server_name</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> openresty</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;   </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">        location</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> /</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">            # 声明一个变量 host_xxxx ，并给它设置值</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">            # 这个xdx-wahaha-online-service-svc 是我K8S里的一个内部服务</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">            set</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> $host_xxxx</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;xdx-wahaha-online-service-svc&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">            proxy_pass</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> http://</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">$host_xxxx</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">:8080</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h2 id="no-resolver-defined-to-resolve-xxxx" tabindex="-1"><a class="header-anchor" href="#no-resolver-defined-to-resolve-xxxx"><span>no resolver defined to resolve xxxx</span></a></h2><p>发起一个请求，报了下面的错误</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">2023/02/28</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 19:56:07</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> [error] 6#6: </span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">3 no resolver defined to resolve xdx-wahaha-online-service-svc, client: 172.27.3.63, server: openresty, request: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;GET /data-dashboard/card/myClueList HTTP/1.1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, host: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;openresty-svc&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>翻译过来就是 没有定义解析器来解析DNS</p>`,11),c=s(`<br><h3 id="正常情况" tabindex="-1"><a class="header-anchor" href="#正常情况"><span>正常情况</span></a></h3><p>如果是在正常的环境下（我上面是在 K8S里面，属于内部环境），只需要配置固定的解析器</p><ol><li>114.114.114.114是国内移动、电信和联通通用的DNS，手机和电脑端都可以使用，干净无广告，解析成功率相对来说更高，国内用户使用的比较多，而且速度相对快、稳定，是国内用户上网常用的DNS</li><li>8.8.8.8是GOOGLE公司提供的DNS，该地址是全球通用的，相对来说，更适合国外以及访问国外网站的用户使用。</li><li>参考 <a href="https://blog.csdn.net/u011095110/article/details/84570419" target="_blank" rel="noopener noreferrer">https://blog.csdn.net/u011095110/article/details/84570419</a></li></ol><p><strong>具体配置</strong> (下面三个位置都可以配置)</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">http {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    resolver </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">114.114</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#B31D28;--shiki-dark:#FFFFFF;--shiki-light-font-style:italic;--shiki-dark-font-style:inherit;">114</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#B31D28;--shiki-dark:#FFFFFF;--shiki-light-font-style:italic;--shiki-dark-font-style:inherit;">114</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    server {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">        resolver </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">114.114</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#B31D28;--shiki-dark:#FFFFFF;--shiki-light-font-style:italic;--shiki-dark-font-style:inherit;">114</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#B31D28;--shiki-dark:#FFFFFF;--shiki-light-font-style:italic;--shiki-dark-font-style:inherit;">114</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">        </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">        location </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">            resolver </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">114.114</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#B31D28;--shiki-dark:#FFFFFF;--shiki-light-font-style:italic;--shiki-dark-font-style:inherit;">114</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#B31D28;--shiki-dark:#FFFFFF;--shiki-light-font-style:italic;--shiki-dark-font-style:inherit;">114</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">        </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h3 id="k8s内部" tabindex="-1"><a class="header-anchor" href="#k8s内部"><span>K8S内部</span></a></h3><p>如果是在K8S内部就不行了，K8S内部是一个独立的网络，我们可以找到 K8S的DNS解析域名</p><p>随便找到一个 pod，输入 <code>cat /etc/resolv.conf</code> 你就可以看到DNS的IP和匹配规则了</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># DNS的ip地址</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">nameserver</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 182.16.0.12</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 匹配规则，可以理解是后缀匹配，也就是我们的域名必须以它们结尾</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">search</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> xxxxx.svc.cluster.local</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> svc.cluster.local</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> cluster.local</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">options</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> ndots:5</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>找到了DNS地址，我们就可以把DNS修改为K8S内部的地址了</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">http {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    resolver </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">182.16</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#B31D28;--shiki-dark:#FFFFFF;--shiki-light-font-style:italic;--shiki-dark-font-style:inherit;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#B31D28;--shiki-dark:#FFFFFF;--shiki-light-font-style:italic;--shiki-dark-font-style:inherit;">12</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    server {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">        resolver </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">182.16</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#B31D28;--shiki-dark:#FFFFFF;--shiki-light-font-style:italic;--shiki-dark-font-style:inherit;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#B31D28;--shiki-dark:#FFFFFF;--shiki-light-font-style:italic;--shiki-dark-font-style:inherit;">12</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">        </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">        location </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">            resolver </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">182.16</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#B31D28;--shiki-dark:#FFFFFF;--shiki-light-font-style:italic;--shiki-dark-font-style:inherit;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#B31D28;--shiki-dark:#FFFFFF;--shiki-light-font-style:italic;--shiki-dark-font-style:inherit;">12</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">        </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果上面的配置还是不行，就改成 <code>resolver 182.16.0.12 valid=30s ipv6=off;</code></p><br><h2 id="could-not-be-resolved-3-host-not-found" tabindex="-1"><a class="header-anchor" href="#could-not-be-resolved-3-host-not-found"><span>could not be resolved (3: Host not found)</span></a></h2><p>修改好上面的配置，并重启后，还是报错了</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">2023</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">02</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">28</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 21</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">40</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">47</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> [error] </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">7</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">#</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">7</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">:</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> *</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> xdx</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">wahaha</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">online</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">service</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">svc could not be </span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">resolved</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> (</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">3</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> Host</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> not found)</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> client</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 172.27</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#B31D28;--shiki-dark:#FFFFFF;--shiki-light-font-style:italic;--shiki-dark-font-style:inherit;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#B31D28;--shiki-dark:#FFFFFF;--shiki-light-font-style:italic;--shiki-dark-font-style:inherit;">63</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> server</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> openresty</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> request</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;GET /data-dashboard/card/myClueList HTTP/1.1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> host</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;openresty-svc&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>现在是有了解析器，但是无法解析我们的域名（服务名），我们再来看一下上面找到的 DNS说明，下图是阿里云的文档解释</p><p><a href="https://help.aliyun.com/document_detail/188179.html" target="_blank" rel="noopener noreferrer">https://help.aliyun.com/document_detail/188179.html</a></p><figure><img src="`+p+`" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><p>大概意思就是它必须以固定的后缀进行匹配 <code>kube-system</code> 就是你的命名空间</p><p>然后把配置文件改成下面的，就OK了</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">http {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    server {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">        listen </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">80</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">        server_name openresty</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">   </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">        resolver </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">182.16</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#B31D28;--shiki-dark:#FFFFFF;--shiki-light-font-style:italic;--shiki-dark-font-style:inherit;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#B31D28;--shiki-dark:#FFFFFF;--shiki-light-font-style:italic;--shiki-dark-font-style:inherit;">12</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> valid</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">30s ipv6</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">off</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">        </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">        location </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">            # 声明一个变量 host_xxxx ，并给它设置值</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">            # 这个xdx</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">wahaha</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">online</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">service</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">svc 是我K8S里的一个内部服务</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">            set $host_xxxx </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;xdx-wahaha-online-service-svc.xdxnamespase.svc.cluster.local&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">            proxy_pass http</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">:</span><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">//$host_xxxx:8080;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h2 id="_302、400、500" tabindex="-1"><a class="header-anchor" href="#_302、400、500"><span>302、400、500</span></a></h2><p>如果上面的配置后，你发现虽然不报错，但是请求状态不对，是302，那先恭喜你，服务访问成功了，大概了是url不对，参看下这个 <a href="https://juejin.cn/post/7109510751638781966" target="_blank" rel="noopener noreferrer">https://juejin.cn/post/7109510751638781966</a></p><figure><img src="`+r+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure>',28);function g(y,v){const i=t("font");return h(),n("div",null,[o,e(i,{color:"red"},{default:l(()=>[k("在nginx里面如果 proxy_pass 里面使用了变量，就必须定义一个解析器。")]),_:1}),c])}const F=a(d,[["render",g],["__file","K8S、kubernetes no resolver defined to resolve  could not be resolved (3_ Host not found) 问题解决.html.vue"]]),C=JSON.parse('{"path":"/06%E5%BE%AE%E6%9C%8D%E5%8A%A1/08Nginx/K8S%E3%80%81kubernetes%20no%20resolver%20defined%20to%20resolve%20%20could%20not%20be%20resolved%20(3_%20Host%20not%20found)%20%E9%97%AE%E9%A2%98%E8%A7%A3%E5%86%B3.html","title":"【中】K8S、kubernetes no resolver defined to resolve  could not be resolved Host not found","lang":"zh-CN","frontmatter":{"title":"【中】K8S、kubernetes no resolver defined to resolve  could not be resolved Host not found","shortTitle":"【中】OpenResty异常","date":"2023-03-01T10:57:06.000Z","category":["中级"],"tag":["SkyWalking","链路追踪","微服务"],"description":"开始 最近在使用openResty搭建一个动态代理功能，遇到了死命的问题，弄了几天才弄好，遂记录下来。 openResty 如果不熟悉的人可以把它理解成nginx 环境是在K8S容器内部 curl http://openresty-svc/data-dashboard/card/myClueList （请求的命令） 下面是我配置的 nginx.conf...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/06%E5%BE%AE%E6%9C%8D%E5%8A%A1/08Nginx/K8S%E3%80%81kubernetes%20no%20resolver%20defined%20to%20resolve%20%20could%20not%20be%20resolved%20(3_%20Host%20not%20found)%20%E9%97%AE%E9%A2%98%E8%A7%A3%E5%86%B3.html"}],["meta",{"property":"og:site_name","content":"小道仙Java笔记"}],["meta",{"property":"og:title","content":"【中】K8S、kubernetes no resolver defined to resolve  could not be resolved Host not found"}],["meta",{"property":"og:description","content":"开始 最近在使用openResty搭建一个动态代理功能，遇到了死命的问题，弄了几天才弄好，遂记录下来。 openResty 如果不熟悉的人可以把它理解成nginx 环境是在K8S容器内部 curl http://openresty-svc/data-dashboard/card/myClueList （请求的命令） 下面是我配置的 nginx.conf..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-23T14:12:53.000Z"}],["meta",{"property":"article:author","content":"小道仙97"}],["meta",{"property":"article:tag","content":"SkyWalking"}],["meta",{"property":"article:tag","content":"链路追踪"}],["meta",{"property":"article:tag","content":"微服务"}],["meta",{"property":"article:published_time","content":"2023-03-01T10:57:06.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-23T14:12:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"【中】K8S、kubernetes no resolver defined to resolve  could not be resolved Host not found\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-03-01T10:57:06.000Z\\",\\"dateModified\\":\\"2024-07-23T14:12:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小道仙97\\",\\"url\\":\\"https://java.xdx97.com\\"}]}"]]},"headers":[{"level":2,"title":"开始","slug":"开始","link":"#开始","children":[]},{"level":2,"title":"no resolver defined to resolve  xxxx","slug":"no-resolver-defined-to-resolve-xxxx","link":"#no-resolver-defined-to-resolve-xxxx","children":[{"level":3,"title":"正常情况","slug":"正常情况","link":"#正常情况","children":[]},{"level":3,"title":"K8S内部","slug":"k8s内部","link":"#k8s内部","children":[]}]},{"level":2,"title":"could not be resolved (3: Host not found)","slug":"could-not-be-resolved-3-host-not-found","link":"#could-not-be-resolved-3-host-not-found","children":[]},{"level":2,"title":"302、400、500","slug":"_302、400、500","link":"#_302、400、500","children":[]}],"git":{"createdTime":1721743973000,"updatedTime":1721743973000,"contributors":[{"name":"ziyangtao","email":"ziyangtao@distinctclinic.com","commits":1}]},"readingTime":{"minutes":3.06,"words":917},"filePathRelative":"06微服务/08Nginx/K8S、kubernetes no resolver defined to resolve  could not be resolved (3: Host not found) 问题解决.md","localizedDate":"2023年3月1日","excerpt":"<h2>开始</h2>\\n<p>最近在使用openResty搭建一个动态代理功能，遇到了死命的问题，弄了几天才弄好，遂记录下来。</p>\\n<ol>\\n<li>openResty 如果不熟悉的人可以把它理解成nginx</li>\\n<li>环境是在K8S容器内部</li>\\n<li>curl http://openresty-svc/data-dashboard/card/myClueList    （请求的命令）</li>\\n</ol>\\n<br>\\n<p><strong>下面是我配置的 nginx.conf</strong></p>\\n<div class=\\"language-shell line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"shell\\" data-title=\\"shell\\" style=\\"--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes github-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">http</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> {</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">    server</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> {</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">        listen</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\"> 80</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">;</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">        server_name</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> openresty</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">;   </span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">        location</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> /</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> {</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">            # 声明一个变量 host_xxxx ，并给它设置值</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">            # 这个xdx-wahaha-online-service-svc 是我K8S里的一个内部服务</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#005CC5;--shiki-dark:#56B6C2\\">            set</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\"> $host_xxxx</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> \\"xdx-wahaha-online-service-svc\\"</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">;</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">            proxy_pass</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> http://</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">$host_xxxx</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">:8080</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">;</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">        }</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">    }</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">}</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{F as comp,C as data};
