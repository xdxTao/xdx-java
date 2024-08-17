import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as a,b as t}from"./app-BcAKAKCF.js";const s={},n=t(`<br><h2 id="一" tabindex="-1"><a class="header-anchor" href="#一"><span>一</span></a></h2><p>今天想在docker里面修改下MySQL的配置文件，使用 <code>vim</code>命令，发现没有。</p><br><h2 id="二" tabindex="-1"><a class="header-anchor" href="#二"><span>二</span></a></h2><p>按照网上的办法，运行下面两个命令，结果报错 <code>Could not connect to deb.debian.org:80</code></p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> update</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> install</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -y</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> vim</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>看错误是说链接不上这个镜像源地址，然后我按照网上的一个思路，把镜像切换到了 网易云镜像，但是接着就出现了这个错 <code>E: Unable to locate package vim</code></p><br><h2 id="三" tabindex="-1"><a class="header-anchor" href="#三"><span>三</span></a></h2><p>大致意思就是这个镜像也可不用了，使用下面命令设置一个镜像源可解决问题。</p><p>因为我们无法使用vim，所以我们使用 <code>cat</code> 命令进行文件的追加</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">cat</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> &gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">/etc/apt/sources.list</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> &lt;&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#ABB2BF;">EOF</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">deb http://deb.debian.org/debian buster main</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">deb http://security.debian.org/debian-security buster/updates main</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">deb http://deb.debian.org/debian buster-updates main</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#ABB2BF;">EOF</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://i-blog.csdnimg.cn/blog_migrate/707ce44a7b566c6d134dc40285b75dba.png" alt="在这里插入图片描述" loading="lazy"> 执行成功后，我们再运行下面的命令即可</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> update</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> install</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -y</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> vim</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div>`,15),l=[n];function d(o,r){return a(),i("div",null,l)}const p=e(s,[["render",d],["__file","docker内安装vim、E_ Unable to locate package vim、Could not connect to deb.debian.org_80.html.vue"]]),k=JSON.parse('{"path":"/06%E5%BE%AE%E6%9C%8D%E5%8A%A1/12Docker/docker%E5%86%85%E5%AE%89%E8%A3%85vim%E3%80%81E_%20Unable%20to%20locate%20package%20vim%E3%80%81Could%20not%20connect%20to%20deb.debian.org_80.html","title":"【初】docker内安装vim、E Unable to locate package vim、Could not connect to deb.debian.org:80","lang":"zh-CN","frontmatter":{"title":"【初】docker内安装vim、E Unable to locate package vim、Could not connect to deb.debian.org:80","shortTitle":"【初】Docker内安装vim","date":"2021-10-11T20:19:58.000Z","category":["初级"],"tag":["docker"],"order":2,"description":"一 今天想在docker里面修改下MySQL的配置文件，使用 vim命令，发现没有。 二 按照网上的办法，运行下面两个命令，结果报错 Could not connect to deb.debian.org:80 看错误是说链接不上这个镜像源地址，然后我按照网上的一个思路，把镜像切换到了 网易云镜像，但是接着就出现了这个错 E: Unable to lo...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/06%E5%BE%AE%E6%9C%8D%E5%8A%A1/12Docker/docker%E5%86%85%E5%AE%89%E8%A3%85vim%E3%80%81E_%20Unable%20to%20locate%20package%20vim%E3%80%81Could%20not%20connect%20to%20deb.debian.org_80.html"}],["meta",{"property":"og:site_name","content":"小道仙Java笔记"}],["meta",{"property":"og:title","content":"【初】docker内安装vim、E Unable to locate package vim、Could not connect to deb.debian.org:80"}],["meta",{"property":"og:description","content":"一 今天想在docker里面修改下MySQL的配置文件，使用 vim命令，发现没有。 二 按照网上的办法，运行下面两个命令，结果报错 Could not connect to deb.debian.org:80 看错误是说链接不上这个镜像源地址，然后我按照网上的一个思路，把镜像切换到了 网易云镜像，但是接着就出现了这个错 E: Unable to lo..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://i-blog.csdnimg.cn/blog_migrate/707ce44a7b566c6d134dc40285b75dba.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-08-10T14:31:36.000Z"}],["meta",{"property":"article:author","content":"小道仙97"}],["meta",{"property":"article:tag","content":"docker"}],["meta",{"property":"article:published_time","content":"2021-10-11T20:19:58.000Z"}],["meta",{"property":"article:modified_time","content":"2024-08-10T14:31:36.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"【初】docker内安装vim、E Unable to locate package vim、Could not connect to deb.debian.org:80\\",\\"image\\":[\\"https://i-blog.csdnimg.cn/blog_migrate/707ce44a7b566c6d134dc40285b75dba.png\\"],\\"datePublished\\":\\"2021-10-11T20:19:58.000Z\\",\\"dateModified\\":\\"2024-08-10T14:31:36.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小道仙97\\",\\"url\\":\\"https://java.xdx97.com\\"}]}"]]},"headers":[{"level":2,"title":"一","slug":"一","link":"#一","children":[]},{"level":2,"title":"二","slug":"二","link":"#二","children":[]},{"level":2,"title":"三","slug":"三","link":"#三","children":[]}],"git":{"createdTime":1723300296000,"updatedTime":1723300296000,"contributors":[{"name":"ziyangtao","email":"ziyangtao@distinctclinic.com","commits":1}]},"readingTime":{"minutes":0.94,"words":283},"filePathRelative":"06微服务/12Docker/docker内安装vim、E: Unable to locate package vim、Could not connect to deb.debian.org:80.md","localizedDate":"2021年10月12日","excerpt":"<br>\\n<h2>一</h2>\\n<p>今天想在docker里面修改下MySQL的配置文件，使用 <code>vim</code>命令，发现没有。</p>\\n<br>\\n<h2>二</h2>\\n<p>按照网上的办法，运行下面两个命令，结果报错 <code>Could not connect to deb.debian.org:80</code></p>\\n<div class=\\"language-shell line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"shell\\" data-title=\\"shell\\" style=\\"--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes github-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">apt-get</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> update</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">apt-get</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> install</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\"> -y</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> vim</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{p as comp,k as data};
