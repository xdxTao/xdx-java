import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,b as n}from"./app-BcAKAKCF.js";const t="/assets/0704_1-CJQPNrNO.png",h="/assets/0704_2-CMzqCtRI.png",l="/assets/0704_3-BZkAneNn.png",k="/assets/0704_4-DddfRM7A.png",e="/assets/0704_5-jHSBjWKK.png",p="/assets/0704_6-BeJOv4wX.png",r="/assets/0704_7-CWqaH4e5.png",d="/assets/0704_8-fmvsjtaW.png",g="/assets/0704_9-cDLswL8W.png",B="/assets/0704_10-BP8SgxQ2.png",y="/assets/0704_11-B2q8e8Ff.png",E="/assets/0704_12-COSySqtG.png",o="/assets/0704_13-D-SNK6ry.png",c={},C=n('<p><a href="https://www.bilibili.com/video/BV1ED421n7kw" target="_blank" rel="noopener noreferrer">B站视频地址</a></p><p>在一些特殊的场景下，需要把我们的内网暴露出去，比如写了一个接口或网站想让别人看到，或者进行第三方开发调试的时候需要一个外网可用的回调地址。</p><br><p>来对比一下ngrok和natapp免费功能的优劣</p><table><thead><tr><th></th><th>限制</th><th>http/https</th><th>域名</th><th>支持程度</th><th>操作</th><th>访问</th></tr></thead><tbody><tr><td>ngrok</td><td>加了一个中间页，需要设置特殊的请求头</td><td>都支持</td><td>可以使用隧道固定域名</td><td>微信对其有限制，有时候不生效</td><td>简单</td><td>没有梯子会很慢</td></tr><tr><td>natapp</td><td>无</td><td>只有http</td><td>每次开启不一样的域名</td><td>挺好</td><td>简单</td><td>正常</td></tr></tbody></table><br><p>如果第三方不支持ngrok的时候可以使用natapp来替代，不然ngrok可以固定域名还是挺方便的</p><br><h1 id="natapp" tabindex="-1"><a class="header-anchor" href="#natapp"><span>Natapp</span></a></h1><br><h2 id="_1、登录注册账号、下载软件" tabindex="-1"><a class="header-anchor" href="#_1、登录注册账号、下载软件"><span>1、登录注册账号、下载软件</span></a></h2><ol><li>https://natapp.cn/</li></ol><figure><img src="'+t+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><p>下载下来的 natapp可能没有权限，只需要给它赋予权限就好了</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> chmod</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 777</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> natapp</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><br><h2 id="_2、使用" tabindex="-1"><a class="header-anchor" href="#_2、使用"><span>2、使用</span></a></h2><br><h3 id="_2-1、购买隧道、查看token" tabindex="-1"><a class="header-anchor" href="#_2-1、购买隧道、查看token"><span>2-1、购买隧道、查看token</span></a></h3><br><figure><img src="'+h+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><figure><img src="'+l+`" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><h3 id="_2-2、端口穿透" tabindex="-1"><a class="header-anchor" href="#_2-2、端口穿透"><span>2-2、端口穿透</span></a></h3><br><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># XXXXXXX 替换成你的token即可</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">./natapp</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -authtoken=XXXXXXX</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+k+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><h1 id="ngrok" tabindex="-1"><a class="header-anchor" href="#ngrok"><span>Ngrok</span></a></h1><br><h2 id="_1、登录注册账号、下载软件-1" tabindex="-1"><a class="header-anchor" href="#_1、登录注册账号、下载软件-1"><span>1、登录注册账号、下载软件</span></a></h2><br><ol><li>https://dashboard.ngrok.com/login</li><li>https://ngrok.com/download</li></ol><br><h2 id="_2、使用-1" tabindex="-1"><a class="header-anchor" href="#_2、使用-1"><span>2、使用</span></a></h2><br><h3 id="_2-1、获取并设置-token" tabindex="-1"><a class="header-anchor" href="#_2-1、获取并设置-token"><span>2-1、获取并设置 token</span></a></h3><br><figure><img src="'+e+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><p>可以执行Command Line，把token进行设置， ngrok就是上一步下载的可执行文件</p><br><h3 id="_2-2、使用" tabindex="-1"><a class="header-anchor" href="#_2-2、使用"><span>2-2、使用</span></a></h3><br><p>假如我们要暴露 9999端口，就执行下面命令</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">./ngrok</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> http</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 9999</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><figure><img src="'+p+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><p>复制生成的随机域名到浏览器，会看到如下页面</p><figure><img src="'+r+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><p>很早之前不会有这样一个中间页，如果只是临时访问，点一下 【Visit Site】也就可以了，但如果前后端对接或者第三方回调，就难办了。</p><br><p>官方提供三个解决办法</p><ol><li>点一下 【Visit Site】</li><li>访问的时候加一个特殊的请求头 【ngrok-skip-browser-warning】</li><li>充值</li></ol><br><h2 id="_3、隧道" tabindex="-1"><a class="header-anchor" href="#_3、隧道"><span>3、隧道</span></a></h2><br><p>使用隧道的好处就是可以固定域名</p><p><img src="'+d+'" alt="在这里插入图片描述" loading="lazy"><img src="'+g+'" alt="在这里插入图片描述" loading="lazy"><img src="'+B+'" alt="在这里插入图片描述" loading="lazy"><img src="'+y+`" alt="在这里插入图片描述" loading="lazy"></p><br><h1 id="微信回调配置" tabindex="-1"><a class="header-anchor" href="#微信回调配置"><span>微信回调配置</span></a></h1><br><h2 id="_1、注册测试公众号" tabindex="-1"><a class="header-anchor" href="#_1、注册测试公众号"><span>1、注册测试公众号</span></a></h2><br><p>只需要扫码登录就行</p><p>https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&amp;t=sandbox/index</p><br><h2 id="_2、回调代码" tabindex="-1"><a class="header-anchor" href="#_2、回调代码"><span>2、回调代码</span></a></h2><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">GetMapping</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;/callback&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">public</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> String</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> entryCallbackSign</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">RequestParam</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">name</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;signature&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> required</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">) </span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> signature</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">                                @</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">RequestParam</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">name</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;timestamp&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> required</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">) </span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> timestamp</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">                                @</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">RequestParam</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">name</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;nonce&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> required</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">) </span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> nonce</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">                                @</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">RequestParam</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">name</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;openid&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> required</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">) </span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> openid</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">                                @</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">RequestParam</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">name</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;encrypt_type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> required</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">) </span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> encType</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">                                @</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">RequestParam</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">name</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;msg_signature&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> required</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">) </span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> msgSignature</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">                                @</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">RequestParam</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">name</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;echostr&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> required</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">) </span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> echostr) {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">    log</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">info</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;微信回调 GET&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">    log</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">debug</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;signature: {}&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, signature);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">    log</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">debug</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;timestamp: {}&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, timestamp);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">    log</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">debug</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;nonce: {}&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, nonce);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">    log</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">debug</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;openid: {}&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, openid);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">    log</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">debug</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;encType: {}&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, encType);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">    log</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">debug</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;msgSignature: {}&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, msgSignature);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">    log</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">debug</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;echostr: {}&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, echostr);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> echostr</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">PostMapping</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">value</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;/callback&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> produces</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;application/xml; charset=UTF-8&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">public</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> String</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> entryCallback</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">RequestBody</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">required</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">) </span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> requestBody</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">                            @</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">RequestParam</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">name</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;signature&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> required</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">) </span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> signature</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">                            @</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">RequestParam</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">name</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;timestamp&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> required</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">) </span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> timestamp</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">                            @</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">RequestParam</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">name</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;nonce&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> required</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">) </span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> nonce</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">                            @</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">RequestParam</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">name</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;openid&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> required</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">) </span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> openid</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">                            @</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">RequestParam</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">name</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;encrypt_type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> required</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">) </span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> encType</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">                            @</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">RequestParam</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">name</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;msg_signature&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> required</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">) </span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> msgSignature) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">    log</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">info</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;微信回调 POST&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">    log</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">debug</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;signature: {}&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, signature);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">    log</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">debug</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;timestamp: {}&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, timestamp);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">    log</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">debug</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;nonce: {}&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, nonce);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">    log</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">debug</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;openid: {}&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, openid);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">    log</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">debug</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;encType: {}&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, encType);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">    log</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">debug</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;requestBody : &quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> +</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> requestBody);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">    log</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">debug</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;msgSignature: {}&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, msgSignature);</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    return</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h2 id="_3、回调配置" tabindex="-1"><a class="header-anchor" href="#_3、回调配置"><span>3、回调配置</span></a></h2><br><figure><img src="`+E+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><p>注：网页回调地址这里不需要http开头</p><figure><img src="'+o+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure>',77),u=[C];function A(F,m){return a(),s("div",null,u)}const _=i(c,[["render",A],["__file","免费简单好用的内网穿透工具（ngrok、natapp），微信回调地址配置.html.vue"]]),D=JSON.parse('{"path":"/07Java%E5%91%A8%E8%BE%B9/04%E5%AE%9E%E7%94%A8%E5%B7%A5%E5%85%B7/%E5%85%8D%E8%B4%B9%E7%AE%80%E5%8D%95%E5%A5%BD%E7%94%A8%E7%9A%84%E5%86%85%E7%BD%91%E7%A9%BF%E9%80%8F%E5%B7%A5%E5%85%B7%EF%BC%88ngrok%E3%80%81natapp%EF%BC%89%EF%BC%8C%E5%BE%AE%E4%BF%A1%E5%9B%9E%E8%B0%83%E5%9C%B0%E5%9D%80%E9%85%8D%E7%BD%AE.html","title":"【中】免费简单好用的内网穿透工具（ngrok、natapp），微信回调地址配置","lang":"zh-CN","frontmatter":{"title":"【中】免费简单好用的内网穿透工具（ngrok、natapp），微信回调地址配置","shortTitle":"【中】免费简单好用的内网穿透工具","date":"2024-04-03T07:53:02.000Z","category":["中级","视频讲解"],"tag":["内网穿透"],"order":1,"description":"B站视频地址 在一些特殊的场景下，需要把我们的内网暴露出去，比如写了一个接口或网站想让别人看到，或者进行第三方开发调试的时候需要一个外网可用的回调地址。 来对比一下ngrok和natapp免费功能的优劣 如果第三方不支持ngrok的时候可以使用natapp来替代，不然ngrok可以固定域名还是挺方便的 Natapp 1、登录注册账号、下载软件 http...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/07Java%E5%91%A8%E8%BE%B9/04%E5%AE%9E%E7%94%A8%E5%B7%A5%E5%85%B7/%E5%85%8D%E8%B4%B9%E7%AE%80%E5%8D%95%E5%A5%BD%E7%94%A8%E7%9A%84%E5%86%85%E7%BD%91%E7%A9%BF%E9%80%8F%E5%B7%A5%E5%85%B7%EF%BC%88ngrok%E3%80%81natapp%EF%BC%89%EF%BC%8C%E5%BE%AE%E4%BF%A1%E5%9B%9E%E8%B0%83%E5%9C%B0%E5%9D%80%E9%85%8D%E7%BD%AE.html"}],["meta",{"property":"og:site_name","content":"小道仙Java笔记"}],["meta",{"property":"og:title","content":"【中】免费简单好用的内网穿透工具（ngrok、natapp），微信回调地址配置"}],["meta",{"property":"og:description","content":"B站视频地址 在一些特殊的场景下，需要把我们的内网暴露出去，比如写了一个接口或网站想让别人看到，或者进行第三方开发调试的时候需要一个外网可用的回调地址。 来对比一下ngrok和natapp免费功能的优劣 如果第三方不支持ngrok的时候可以使用natapp来替代，不然ngrok可以固定域名还是挺方便的 Natapp 1、登录注册账号、下载软件 http..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-23T14:12:53.000Z"}],["meta",{"property":"article:author","content":"小道仙97"}],["meta",{"property":"article:tag","content":"内网穿透"}],["meta",{"property":"article:published_time","content":"2024-04-03T07:53:02.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-23T14:12:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"【中】免费简单好用的内网穿透工具（ngrok、natapp），微信回调地址配置\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-04-03T07:53:02.000Z\\",\\"dateModified\\":\\"2024-07-23T14:12:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小道仙97\\",\\"url\\":\\"https://java.xdx97.com\\"}]}"]]},"headers":[{"level":2,"title":"1、登录注册账号、下载软件","slug":"_1、登录注册账号、下载软件","link":"#_1、登录注册账号、下载软件","children":[]},{"level":2,"title":"2、使用","slug":"_2、使用","link":"#_2、使用","children":[{"level":3,"title":"2-1、购买隧道、查看token","slug":"_2-1、购买隧道、查看token","link":"#_2-1、购买隧道、查看token","children":[]},{"level":3,"title":"2-2、端口穿透","slug":"_2-2、端口穿透","link":"#_2-2、端口穿透","children":[]}]},{"level":2,"title":"1、登录注册账号、下载软件","slug":"_1、登录注册账号、下载软件-1","link":"#_1、登录注册账号、下载软件-1","children":[]},{"level":2,"title":"2、使用","slug":"_2、使用-1","link":"#_2、使用-1","children":[{"level":3,"title":"2-1、获取并设置 token","slug":"_2-1、获取并设置-token","link":"#_2-1、获取并设置-token","children":[]},{"level":3,"title":"2-2、使用","slug":"_2-2、使用","link":"#_2-2、使用","children":[]}]},{"level":2,"title":"3、隧道","slug":"_3、隧道","link":"#_3、隧道","children":[]},{"level":2,"title":"1、注册测试公众号","slug":"_1、注册测试公众号","link":"#_1、注册测试公众号","children":[]},{"level":2,"title":"2、回调代码","slug":"_2、回调代码","link":"#_2、回调代码","children":[]},{"level":2,"title":"3、回调配置","slug":"_3、回调配置","link":"#_3、回调配置","children":[]}],"git":{"createdTime":1721743973000,"updatedTime":1721743973000,"contributors":[{"name":"ziyangtao","email":"ziyangtao@distinctclinic.com","commits":1}]},"readingTime":{"minutes":3.13,"words":940},"filePathRelative":"07Java周边/04实用工具/免费简单好用的内网穿透工具（ngrok、natapp），微信回调地址配置.md","localizedDate":"2024年4月3日","excerpt":"<p><a href=\\"https://www.bilibili.com/video/BV1ED421n7kw\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">B站视频地址</a></p>\\n<p>在一些特殊的场景下，需要把我们的内网暴露出去，比如写了一个接口或网站想让别人看到，或者进行第三方开发调试的时候需要一个外网可用的回调地址。</p>\\n<br>\\n<p>来对比一下ngrok和natapp免费功能的优劣</p>\\n<table>\\n<thead>\\n<tr>\\n<th></th>\\n<th>限制</th>\\n<th>http/https</th>\\n<th>域名</th>\\n<th>支持程度</th>\\n<th>操作</th>\\n<th>访问</th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td>ngrok</td>\\n<td>加了一个中间页，需要设置特殊的请求头</td>\\n<td>都支持</td>\\n<td>可以使用隧道固定域名</td>\\n<td>微信对其有限制，有时候不生效</td>\\n<td>简单</td>\\n<td>没有梯子会很慢</td>\\n</tr>\\n<tr>\\n<td>natapp</td>\\n<td>无</td>\\n<td>只有http</td>\\n<td>每次开启不一样的域名</td>\\n<td>挺好</td>\\n<td>简单</td>\\n<td>正常</td>\\n</tr>\\n</tbody>\\n</table>","autoDesc":true}');export{_ as comp,D as data};
