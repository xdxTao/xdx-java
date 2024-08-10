import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as a,d as n}from"./app-CPTE7G04.js";const l={},e=n(`<h1 id="一、持久化脚本" tabindex="-1"><a class="header-anchor" href="#一、持久化脚本"><span>一、持久化脚本</span></a></h1><br><p>nacos需要用到MySQL持久化，需要在数据库创建如下表</p><p>https://github.com/alibaba/nacos/blob/2.3.0/config/src/main/resources/META-INF/nacos-db.sql</p><br><h1 id="二、docker-compose-yaml" tabindex="-1"><a class="header-anchor" href="#二、docker-compose-yaml"><span>二、docker-compose.yaml</span></a></h1><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;3&#39;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">services</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">  nacos</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">    image</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">nacos/nacos-server:v2.3.0-slim</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">    # 容器名称</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">    container_name</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">nacos</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">    # 端口映射</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">    ports</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">8848:8848</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">9848:9848</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">9849:9849</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">    # 容器权限</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">    privileged</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">true</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">    # 参数设置</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">    environment</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">      JVM_XMS</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">128m</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">      JVM_XMX</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">128m</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">      JVM_MS</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">64m</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">      JVM_MMS</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">64m</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">      MODE</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">standalone</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">      NACOS_REPLICAS</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">1</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">      PREFER_HOST_MODE</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">ip</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">    volumes</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">./logs:/home/nacos/logs</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">./plugins:/home/nacos/plugins</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">./data:/home/nacos/data</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">./config/application.properties:/home/nacos/conf/application.properties</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">    networks</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">      nacos</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">        aliases</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">          - </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">nacos_2.3.0</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">networks</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">  nacos</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">    name</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">nacos_2.3.0</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">    driver</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">bridge</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h1 id="三、application-properties" tabindex="-1"><a class="header-anchor" href="#三、application-properties"><span>三、application.properties</span></a></h1><br><p>nacos可以充当配置中心，我们当然不希望重启服务之后配置丢失，这里是配置MySQL做持久化</p><div class="language-xml line-numbers-mode" data-highlighter="shiki" data-ext="xml" data-title="xml" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"># 只需要修改下面MySQL的账号密码、连接地址</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">spring.datasource.platform=mysql</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">db.num=1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">db.url.0=jdbc:mysql://192.168.2.18:3306/nacos_conf?characterEncoding=utf8</span><span style="--shiki-light:#B31D28;--shiki-dark:#FFFFFF;--shiki-light-font-style:italic;--shiki-dark-font-style:inherit;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">connectTimeout=1000</span><span style="--shiki-light:#B31D28;--shiki-dark:#FFFFFF;--shiki-light-font-style:italic;--shiki-dark-font-style:inherit;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">socketTimeout=3000</span><span style="--shiki-light:#B31D28;--shiki-dark:#FFFFFF;--shiki-light-font-style:italic;--shiki-dark-font-style:inherit;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">autoReconnect=true</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"># db.url.0=jdbc:mysql://192.168.1.35:3306/nacos_conf?characterEncoding=utf8</span><span style="--shiki-light:#B31D28;--shiki-dark:#FFFFFF;--shiki-light-font-style:italic;--shiki-dark-font-style:inherit;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">connectTimeout=1000</span><span style="--shiki-light:#B31D28;--shiki-dark:#FFFFFF;--shiki-light-font-style:italic;--shiki-dark-font-style:inherit;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">socketTimeout=3000</span><span style="--shiki-light:#B31D28;--shiki-dark:#FFFFFF;--shiki-light-font-style:italic;--shiki-dark-font-style:inherit;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">autoReconnect=true</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">db.user=root</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">db.password=root</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"># 随机字符串，要长点</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">nacos.core.auth.plugin.nacos.token.secret.key=0123321adsfffdasf343134124fasfdfdffas34134343</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h1 id="四、创建容器" tabindex="-1"><a class="header-anchor" href="#四、创建容器"><span>四、创建容器</span></a></h1><br><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">docker-compose</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> up</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -d</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>`,16),t=[e];function h(p,k){return a(),i("div",null,t)}const c=s(l,[["render",h],["__file","docker-compose 安装Nacos.html.vue"]]),o=JSON.parse(`{"path":"/06%E5%BE%AE%E6%9C%8D%E5%8A%A1/02Nacos/docker-compose%20%E5%AE%89%E8%A3%85Nacos.html","title":"【中】docker-compose 安装Nacos","lang":"zh-CN","frontmatter":{"title":"【中】docker-compose 安装Nacos","shortTitle":"【中】安装Nacos","date":"2024-03-25T10:36:25.000Z","category":["中级"],"tag":["nacos","docker-compose"],"description":"一、持久化脚本 nacos需要用到MySQL持久化，需要在数据库创建如下表 https://github.com/alibaba/nacos/blob/2.3.0/config/src/main/resources/META-INF/nacos-db.sql 二、docker-compose.yaml 三、application.properties ...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/06%E5%BE%AE%E6%9C%8D%E5%8A%A1/02Nacos/docker-compose%20%E5%AE%89%E8%A3%85Nacos.html"}],["meta",{"property":"og:site_name","content":"小道仙Java笔记"}],["meta",{"property":"og:title","content":"【中】docker-compose 安装Nacos"}],["meta",{"property":"og:description","content":"一、持久化脚本 nacos需要用到MySQL持久化，需要在数据库创建如下表 https://github.com/alibaba/nacos/blob/2.3.0/config/src/main/resources/META-INF/nacos-db.sql 二、docker-compose.yaml 三、application.properties ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-23T14:12:53.000Z"}],["meta",{"property":"article:author","content":"小道仙97"}],["meta",{"property":"article:tag","content":"nacos"}],["meta",{"property":"article:tag","content":"docker-compose"}],["meta",{"property":"article:published_time","content":"2024-03-25T10:36:25.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-23T14:12:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"【中】docker-compose 安装Nacos\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-03-25T10:36:25.000Z\\",\\"dateModified\\":\\"2024-07-23T14:12:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小道仙97\\",\\"url\\":\\"https://java.xdx97.com\\"}]}"]]},"headers":[],"git":{"createdTime":1721743973000,"updatedTime":1721743973000,"contributors":[{"name":"ziyangtao","email":"ziyangtao@distinctclinic.com","commits":1}]},"readingTime":{"minutes":0.83,"words":249},"filePathRelative":"06微服务/02Nacos/docker-compose 安装Nacos.md","localizedDate":"2024年3月25日","excerpt":"\\n<br>\\n<p>nacos需要用到MySQL持久化，需要在数据库创建如下表</p>\\n<p>https://github.com/alibaba/nacos/blob/2.3.0/config/src/main/resources/META-INF/nacos-db.sql</p>\\n<br>\\n<h1>二、docker-compose.yaml</h1>\\n<div class=\\"language-yaml line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"yaml\\" data-title=\\"yaml\\" style=\\"--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes github-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#22863A;--shiki-dark:#E06C75\\">version</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">: </span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">'3'</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#22863A;--shiki-dark:#E06C75\\">services</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">:</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#22863A;--shiki-dark:#E06C75\\">  nacos</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">:</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#22863A;--shiki-dark:#E06C75\\">    image</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">: </span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">nacos/nacos-server:v2.3.0-slim</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">    # 容器名称</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#22863A;--shiki-dark:#E06C75\\">    container_name</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">: </span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">nacos</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">    # 端口映射</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#22863A;--shiki-dark:#E06C75\\">    ports</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">:</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">      - </span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">8848:8848</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">      - </span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">9848:9848</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">      - </span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">9849:9849</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">    # 容器权限</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#22863A;--shiki-dark:#E06C75\\">    privileged</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">: </span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">true</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">    # 参数设置</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#22863A;--shiki-dark:#E06C75\\">    environment</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">:</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#22863A;--shiki-dark:#E06C75\\">      JVM_XMS</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">: </span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">128m</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#22863A;--shiki-dark:#E06C75\\">      JVM_XMX</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">: </span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">128m</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#22863A;--shiki-dark:#E06C75\\">      JVM_MS</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">: </span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">64m</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#22863A;--shiki-dark:#E06C75\\">      JVM_MMS</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">: </span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">64m</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#22863A;--shiki-dark:#E06C75\\">      MODE</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">: </span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">standalone</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#22863A;--shiki-dark:#E06C75\\">      NACOS_REPLICAS</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">: </span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">1</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#22863A;--shiki-dark:#E06C75\\">      PREFER_HOST_MODE</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">: </span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">ip</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#22863A;--shiki-dark:#E06C75\\">    volumes</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">:</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">      - </span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">./logs:/home/nacos/logs</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">      - </span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">./plugins:/home/nacos/plugins</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">      - </span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">./data:/home/nacos/data</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">      - </span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">./config/application.properties:/home/nacos/conf/application.properties</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#22863A;--shiki-dark:#E06C75\\">    networks</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">:</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#22863A;--shiki-dark:#E06C75\\">      nacos</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">:</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#22863A;--shiki-dark:#E06C75\\">        aliases</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">:</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">          - </span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">nacos_2.3.0</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#22863A;--shiki-dark:#E06C75\\">networks</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">:</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#22863A;--shiki-dark:#E06C75\\">  nacos</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">:</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#22863A;--shiki-dark:#E06C75\\">    name</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">: </span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">nacos_2.3.0</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#22863A;--shiki-dark:#E06C75\\">    driver</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">: </span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">bridge</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{c as comp,o as data};
