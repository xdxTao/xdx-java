import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as e,b as a}from"./app-BRh3vv8H.js";const t="/assets/0701_13-CLx77VwW.png",n="/assets/0701_14-kYVZ3kMm.png",l="/assets/0701_15-D-0dCaZm.png",h="/assets/0701_16-Bch7szRC.png",r="/assets/0701_17-DCuQvXzW.png",d={},p=a('<br><p>从接触git到现在大概有三年之久了，也使用它工作一年之久，但直到写这篇文章之前，依旧对它的<strong>冲突</strong>很恐惧。</p><p>而现在只能算是说麻烦，不能算是说恐惧了，下面就把我目前对git冲突解决经验传授给大家。</p><br><h2 id="一、准备" tabindex="-1"><a class="header-anchor" href="#一、准备"><span>一、准备</span></a></h2><blockquote><p>这里主要是讲怎么解决冲突，所以对于其它的尽量能少则少。</p></blockquote><p>使用gitee创建一个项目，项目初始有一个<code>README.MD</code>和两个分支<code>dev</code>、<code>master</code>。</p><br><h3 id="_1-1、dev分支里面的readme" tabindex="-1"><a class="header-anchor" href="#_1-1、dev分支里面的readme"><span>1-1、dev分支里面的README</span></a></h3><div class="language-md line-numbers-mode" data-highlighter="shiki" data-ext="md" data-title="md" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">TEST- dev</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><br><h3 id="_1-2、master分支里面的readme" tabindex="-1"><a class="header-anchor" href="#_1-2、master分支里面的readme"><span>1-2、master分支里面的README</span></a></h3><div class="language-md line-numbers-mode" data-highlighter="shiki" data-ext="md" data-title="md" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">TEST- master</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><br><h3 id="_1-3、说明" tabindex="-1"><a class="header-anchor" href="#_1-3、说明"><span>1-3、说明</span></a></h3><p>两个分支同一个文件里面的代码不一样，如果合并就会冲突。</p><p>现在我们就来合并分支 <code>dev</code> &gt; <code>master</code></p><br><h2 id="二、冲突" tabindex="-1"><a class="header-anchor" href="#二、冲突"><span>二、冲突</span></a></h2><h3 id="_2-1、合并结果" tabindex="-1"><a class="header-anchor" href="#_2-1、合并结果"><span>2-1、合并结果</span></a></h3><br><figure><img src="'+t+`" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><p><mark>此 Pull Request 无法自动合并，你应该手动合并它</mark></p><p>注：实际我们多用的是gitlab，上面的英文翻译一下大意也是如此。</p><br><p>解决冲突的步骤：</p><ol><li>把两个分支的代码都拉到你本地</li><li>手动去把代码整合一下</li><li>提交你的本地代码</li></ol><br><h3 id="_2-2、解决冲突一-有master分支操作权限" tabindex="-1"><a class="header-anchor" href="#_2-2、解决冲突一-有master分支操作权限"><span>2-2、解决冲突一（有master分支操作权限）</span></a></h3><p>如果你有master分支的权限，你可以使用这个办法。</p><p>一般冲突后会提示你解决的办法，也是此办法。</p><br><h4 id="_2-2-1、更新远程分支" tabindex="-1"><a class="header-anchor" href="#_2-2-1、更新远程分支"><span>2-2-1、更新远程分支</span></a></h4><p>这一步一般不做，大部分这两个分支本地都有，但是可能出现没有的情况，所以运行一下也没什么关系。</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> fetch</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><br><h4 id="_2-2-2、切换master分支、并拉取master分支代码" tabindex="-1"><a class="header-anchor" href="#_2-2-2、切换master分支、并拉取master分支代码"><span>2-2-2、切换master分支、并拉取master分支代码</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> checkout</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> master</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> pull</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> origin</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> master</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><br><h4 id="_2-2-3、拉取dev分支代码-当前分支是master" tabindex="-1"><a class="header-anchor" href="#_2-2-3、拉取dev分支代码-当前分支是master"><span>2-2-3、拉取dev分支代码（当前分支是master）</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> pull</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> origin</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> dev</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><br><h4 id="_2-2-4、解决冲突" tabindex="-1"><a class="header-anchor" href="#_2-2-4、解决冲突"><span>2-2-4、解决冲突</span></a></h4><p>这个时候你的本地代码会如下：</p><figure><img src="`+n+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><p>我们按照正确的代码格式，把本地代码整理成如下</p><figure><img src="'+l+`" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><h4 id="_2-2-5、提交代码" tabindex="-1"><a class="header-anchor" href="#_2-2-5、提交代码"><span>2-2-5、提交代码</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 添加全部的文件，这里为了演示方便，你可以添加具体的文件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> .</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 提交代码到本地仓库</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> commit</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -m</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;解决冲突&#39;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 提交代码到线上仓库</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> push</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> origin</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> master</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>提交到线上后，我们的那个分支合并，也会自动合并好了。</p><br><h3 id="_2-3、解决冲突二-无master分支权限" tabindex="-1"><a class="header-anchor" href="#_2-3、解决冲突二-无master分支权限"><span>2-3、解决冲突二（无master分支权限）</span></a></h3><ul><li>实际开发中我们很可能没有这个分支的提交权限，我们只能拉取代码。</li></ul><p>使用上面的方式再来重新制造一个冲突。</p><figure><img src="`+h+`" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><p>其实原理是一样的，之前我们是在<code>master</code>分支上解决冲突，现在我们在<code>dev</code>分支上去解决冲突。</p><br><h4 id="_2-3-1、更新远程分支" tabindex="-1"><a class="header-anchor" href="#_2-3-1、更新远程分支"><span>2-3-1、更新远程分支</span></a></h4><p>这一步一般不做，大部分这两个分支本地都有，但是可能出现没有的情况，所以运行一下也没什么关系。</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> fetch</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><br><h4 id="_2-3-2、切换dev分支、并拉取dev分支代码" tabindex="-1"><a class="header-anchor" href="#_2-3-2、切换dev分支、并拉取dev分支代码"><span>2-3-2、切换dev分支、并拉取dev分支代码</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> checkout</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> dev</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> pull</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> origin</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> dev</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><br><h4 id="_2-3-3、拉取master分支代码-当前是dev分支" tabindex="-1"><a class="header-anchor" href="#_2-3-3、拉取master分支代码-当前是dev分支"><span>2-3-3、拉取master分支代码（当前是dev分支）</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> pull</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> origin</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> master</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><br><h4 id="_2-3-4、解决冲突" tabindex="-1"><a class="header-anchor" href="#_2-3-4、解决冲突"><span>2-3-4、解决冲突</span></a></h4><p>如上面一样，按照自己正确的代码进行调整</p><br><h4 id="_2-3-5、提交代码" tabindex="-1"><a class="header-anchor" href="#_2-3-5、提交代码"><span>2-3-5、提交代码</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 添加全部的文件，这里为了演示方便，你可以添加具体的文件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> .</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 提交代码到本地仓库</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> commit</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -m</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;解决冲突&#39;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 提交代码到线上仓库</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> push</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> origin</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> dev</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这时候合并请求便会如下：</p><figure><img src="`+r+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><p>这个意思是现在已经没有冲突了，但是你没权限合并，找有权限的人给你合并。</p><br><h2 id="三、其它" tabindex="-1"><a class="header-anchor" href="#三、其它"><span>三、其它</span></a></h2><ul><li>这里的dev分支代表你的开发分支，master分支标识要合并的分支</li><li>我这里使用的<code>gitee</code>提示都是中文的，如果你使用<code>gitlab</code>提示是英文的，大意都是一样的</li><li>如果你没有合并权限的时候可能会出现<code>合并冲突</code>、<code>没有需要合并的</code>、<code>找有权限的人给你合并</code>，记得翻译一下英文，不然可能闹出笑话。</li><li>如果你明白了上面的含义，实际上遇到冲突了只可能是冲突文件比较复杂会难得处理，但不会手足无措。</li><li>我这里为了通用性都是使用的<code>git命令</code>，实际开发大家可以结合具体的软件（<code>IDEA</code>、<code>VSCODE</code>）可能会更简单。</li></ul>',78),k=[p];function c(g,o){return e(),s("div",null,k)}const u=i(d,[["render",c],["__file","git冲突解决，使用git命令解决冲突【通用版】.html.vue"]]),v=JSON.parse('{"path":"/07Java%E5%91%A8%E8%BE%B9/01Git/git%E5%86%B2%E7%AA%81%E8%A7%A3%E5%86%B3%EF%BC%8C%E4%BD%BF%E7%94%A8git%E5%91%BD%E4%BB%A4%E8%A7%A3%E5%86%B3%E5%86%B2%E7%AA%81%E3%80%90%E9%80%9A%E7%94%A8%E7%89%88%E3%80%91.html","title":"【中】Git冲突解决，使用Git命令解决冲突【通用版】","lang":"zh-CN","frontmatter":{"title":"【中】Git冲突解决，使用Git命令解决冲突【通用版】","shortTitle":"【中】Git冲突解决","date":"2021-07-08T14:53:50.000Z","category":["初级"],"tag":["git"],"order":1,"description":"从接触git到现在大概有三年之久了，也使用它工作一年之久，但直到写这篇文章之前，依旧对它的冲突很恐惧。 而现在只能算是说麻烦，不能算是说恐惧了，下面就把我目前对git冲突解决经验传授给大家。 一、准备 这里主要是讲怎么解决冲突，所以对于其它的尽量能少则少。 使用gitee创建一个项目，项目初始有一个README.MD和两个分支dev、master。 1...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/07Java%E5%91%A8%E8%BE%B9/01Git/git%E5%86%B2%E7%AA%81%E8%A7%A3%E5%86%B3%EF%BC%8C%E4%BD%BF%E7%94%A8git%E5%91%BD%E4%BB%A4%E8%A7%A3%E5%86%B3%E5%86%B2%E7%AA%81%E3%80%90%E9%80%9A%E7%94%A8%E7%89%88%E3%80%91.html"}],["meta",{"property":"og:site_name","content":"小道仙Java笔记"}],["meta",{"property":"og:title","content":"【中】Git冲突解决，使用Git命令解决冲突【通用版】"}],["meta",{"property":"og:description","content":"从接触git到现在大概有三年之久了，也使用它工作一年之久，但直到写这篇文章之前，依旧对它的冲突很恐惧。 而现在只能算是说麻烦，不能算是说恐惧了，下面就把我目前对git冲突解决经验传授给大家。 一、准备 这里主要是讲怎么解决冲突，所以对于其它的尽量能少则少。 使用gitee创建一个项目，项目初始有一个README.MD和两个分支dev、master。 1..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-08-10T14:31:36.000Z"}],["meta",{"property":"article:author","content":"小道仙97"}],["meta",{"property":"article:tag","content":"git"}],["meta",{"property":"article:published_time","content":"2021-07-08T14:53:50.000Z"}],["meta",{"property":"article:modified_time","content":"2024-08-10T14:31:36.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"【中】Git冲突解决，使用Git命令解决冲突【通用版】\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-07-08T14:53:50.000Z\\",\\"dateModified\\":\\"2024-08-10T14:31:36.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小道仙97\\",\\"url\\":\\"https://java.xdx97.com\\"}]}"]]},"headers":[{"level":2,"title":"一、准备","slug":"一、准备","link":"#一、准备","children":[{"level":3,"title":"1-1、dev分支里面的README","slug":"_1-1、dev分支里面的readme","link":"#_1-1、dev分支里面的readme","children":[]},{"level":3,"title":"1-2、master分支里面的README","slug":"_1-2、master分支里面的readme","link":"#_1-2、master分支里面的readme","children":[]},{"level":3,"title":"1-3、说明","slug":"_1-3、说明","link":"#_1-3、说明","children":[]}]},{"level":2,"title":"二、冲突","slug":"二、冲突","link":"#二、冲突","children":[{"level":3,"title":"2-1、合并结果","slug":"_2-1、合并结果","link":"#_2-1、合并结果","children":[]},{"level":3,"title":"2-2、解决冲突一（有master分支操作权限）","slug":"_2-2、解决冲突一-有master分支操作权限","link":"#_2-2、解决冲突一-有master分支操作权限","children":[]},{"level":3,"title":"2-3、解决冲突二（无master分支权限）","slug":"_2-3、解决冲突二-无master分支权限","link":"#_2-3、解决冲突二-无master分支权限","children":[]}]},{"level":2,"title":"三、其它","slug":"三、其它","link":"#三、其它","children":[]}],"git":{"createdTime":1723300296000,"updatedTime":1723300296000,"contributors":[{"name":"ziyangtao","email":"ziyangtao@distinctclinic.com","commits":1}]},"readingTime":{"minutes":4.04,"words":1211},"filePathRelative":"07Java周边/01Git/git冲突解决，使用git命令解决冲突【通用版】.md","localizedDate":"2021年7月8日","excerpt":"<br>\\n<p>从接触git到现在大概有三年之久了，也使用它工作一年之久，但直到写这篇文章之前，依旧对它的<strong>冲突</strong>很恐惧。</p>\\n<p>而现在只能算是说麻烦，不能算是说恐惧了，下面就把我目前对git冲突解决经验传授给大家。</p>\\n<br>\\n<h2>一、准备</h2>\\n<blockquote>\\n<p>这里主要是讲怎么解决冲突，所以对于其它的尽量能少则少。</p>\\n</blockquote>\\n<p>使用gitee创建一个项目，项目初始有一个<code>README.MD</code>和两个分支<code>dev</code>、<code>master</code>。</p>","autoDesc":true}');export{u as comp,v as data};
