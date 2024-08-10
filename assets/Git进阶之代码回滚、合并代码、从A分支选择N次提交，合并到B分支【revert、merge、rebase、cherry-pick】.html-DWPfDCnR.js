import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as r,f as a,e as i,a as n,w as t,d as s,r as h,o as p}from"./app-DTFy3zAf.js";const d="/assets/0701_1-_TFrbJ5A.png",c="/assets/0701_2-DaDZB0yz.png",k="/assets/0701_3-XdumxkN8.png",g="/assets/0701_4-cPvst6R7.png",o="/assets/0701_5-CUqdoPhM.png",b="/assets/0701_6-CuR5ypTN.png",m="/assets/0701_7-DkMUcyWU.png",y="/assets/0701_8-DvmaIwn3.png",v="/assets/0701_9-nAr3cjsV.png",u="/assets/0701_10-CYwxvuTR.png",F="/assets/0701_11-DSf81EIz.png",f="/assets/0701_12-DO6hutfF.png",A={},E=s('<br><ul><li>B站视频地址： <a href="https://www.bilibili.com/video/BV1KX4y1a7N9" target="_blank" rel="noopener noreferrer">https://www.bilibili.com/video/BV1KX4y1a7N9</a></li></ul><br><p>在很长一段时间里，我对Git的操作只限于：提交代码，拉取代码，合并代码。</p><p>虽然上面这些操作在日常工作中也足够了，但不会点高级知识不利于装X，今天我们来学习几个高级点的操作。</p><br><h2 id="一、前提" tabindex="-1"><a class="header-anchor" href="#一、前提"><span>一、前提</span></a></h2><br><p>在正式操作之前，我们先来共知几个命令和概念。</p><br><h3 id="sha标识" tabindex="-1"><a class="header-anchor" href="#sha标识"><span>SHA标识</span></a></h3><br><p>每一次提交Git都会生成一个<strong>唯一SHA标识</strong>（简单来说就是为这次提交生成一个唯一字符串），代码合并、回滚、检出都和这个标识相关。</p><p>注：SHA标识是指Git中的SHA-1哈希标识符，它是一个40个字符的字符串，用于唯一标识Git中的每个提交、对象和分支。SHA-1是一个加密哈希函数，它接受输入（例如文件内容或提交信息）并生成一个唯一的40字符长的哈希值。</p><br><h3 id="git-log" tabindex="-1"><a class="header-anchor" href="#git-log"><span>git log</span></a></h3><br><p>Git 的每次提交都会携带很多信息，提交者、提交时间、唯一SHA标识等，想要查看这些信息，可以使用 <code>git log</code> 命令。</p><br><h4 id="git-log-1" tabindex="-1"><a class="header-anchor" href="#git-log-1"><span>git log</span></a></h4><br><p>完整的查看 log信息，展示效果如下：</p><figure><img src="'+d+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><h4 id="git-log-oneline" tabindex="-1"><a class="header-anchor" href="#git-log-oneline"><span>git log --oneline</span></a></h4><br><p>精简提交信息，以一行的方式展示</p><figure><img src="'+c+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><h4 id="git-log-graph-oneline" tabindex="-1"><a class="header-anchor" href="#git-log-graph-oneline"><span>git log --graph --oneline</span></a></h4><p>以时间线的方式查看精简的日志信息</p><figure><img src="'+k+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><h2 id="二、回滚代码" tabindex="-1"><a class="header-anchor" href="#二、回滚代码"><span>二、回滚代码</span></a></h2><br><p>代码回滚，提交了错误的代码、代码错合并到非目标分支</p><ol><li>commit 回滚</li><li>merge 回滚</li></ol><br><h3 id="回滚" tabindex="-1"><a class="header-anchor" href="#回滚"><span>回滚</span></a></h3><br><p>使用 <code>git log --graph --oneline</code> 查看日志线，并找到我们要撤回提交的hash</p><figure><img src="'+g+`" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">1、找到我们要回滚commit的</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> hash</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> log</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> --graph</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> --oneline</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">2、执行回滚命令</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">   回滚之后可能是有冲突的，是需要手动解决冲突</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> revert</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 1b17801</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> push</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">3、回滚</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> mergn</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> revert</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> f259bf5</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> push</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h3 id="冲突" tabindex="-1"><a class="header-anchor" href="#冲突"><span>冲突</span></a></h3><br><p>如果回滚的时候有冲突，会这样提示</p><figure><img src="`+o+`" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><p><strong>方式一</strong></p><p>可以选择放弃这次的回滚 <code>git revert --abort</code></p><br><p><strong>方式二</strong></p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">--</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 1、手动解决冲突</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">--</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 2、提交修改</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> .</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">--</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 3、继续revert，</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 会弹出一个文件，可以修改commit的描述，也可以直接关闭</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> revert</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> --continue</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">--</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 4、push代码</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> push</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+b+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><h2 id="三、合并代码" tabindex="-1"><a class="header-anchor" href="#三、合并代码"><span>三、合并代码</span></a></h2><br><p>合并代码就是把branchA的代码移植到branchB，有两个命令可以来完成此操作：merge、rebase。</p><p>假如branchA是我们的开发分支，branchB是正式分支，在branchA上面我们提交了三次。现在我们来看看使用 merge 和 rebase 合并会有什么不同。</p><br><h3 id="merge" tabindex="-1"><a class="header-anchor" href="#merge"><span>Merge</span></a></h3>',61),B=s(`<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># branchA 当前log</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">A---B---C</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (branchA)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># branchB 当前log</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">D---E---F---G</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (branchB)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 在branchB 上执行 git merge branchA  </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">      A---B---C</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (branchA)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">     /</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">         \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">D---E---F---G---H (branchB, </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">merge</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> commit</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其实就是把 branchA 当前的状态当作一次提交合并到branchB上去，所以会形成一次新的提交 H。对branchA没什么改变，对branchB 多了一次提交。（Merge remote-tracking branch &#39;origin/branchA&#39; into branchB）</p><br><h3 id="rebase" tabindex="-1"><a class="header-anchor" href="#rebase"><span>Rebase</span></a></h3>`,4),C=s(`<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># branchA 当前log</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">A---B---C</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (branchA)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># branchB 当前log</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">D---E---F---G</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (branchB)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 在branchB 上执行 git rebase branchA  </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">             A--B--C</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (branchA, </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">rebased</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">            /</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">D---E---F---G</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (branchB)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><p>从结果来看相对于 merge， rebase有两个特殊点（代码没有冲突的情况下）</p><ol><li>它不会生成新的 SHA标识。</li><li>目标分支成了一条直线，且更长了。（具体看branchA提交的次数）</li></ol><br><h3 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h3><p>合并代码的时候使用 merge，可以更好的看到提交的变更，并保留每个分支的独立性和历史记录，只需要解决一次冲突，所以在正常情况下，更推荐使用 merge 来合并代码。</p><p>当然如果你是把别的分支 rebase到自己的分支，那没什么关系，最起码不会影响到别人。</p><br><h3 id="rebase-合并-commit" tabindex="-1"><a class="header-anchor" href="#rebase-合并-commit"><span>Rebase 合并 commit</span></a></h3><br><p>rebase 除了上面的合并代码，它还有一个很大的用处就是合并commit，开发的过程中我们可能提交了很多乱七八糟的commit，但是为了更美观，我们可以把多个commit合并成一个新的commit。</p><p>合并commit有两个方式</p><ol><li>以头为标准，往下合并N个commit <code>git rebase -i HEAD~N</code></li><li>以某个节点向上做commit合并 <code>git rebase xxx</code> xxx 就是commit的hash值</li></ol><p>假设我们有三次提交，现在我们要把 two 和 three 合并成一个新的提交 <code>two and three</code></p><figure><img src="`+m+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><p>git rebase -i 49412a4</p><p>执行命令后，会弹出一个文本窗口，让我们来确定要对这次rebase的操作，可以对每个commit进行很多。</p><figure><img src="'+y+`" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><p>把 <code>pick 687575f three commit</code> 改为 <code>squash 687575f three commit </code>然后保存退出。</p><p>保存后，又会弹出一个窗口，告知我们修改 commit的提交信息</p><p>修改前</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># This is a combination of 2 commits.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># This is the 1st commit message:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">two</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> commit</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># This is the commit message #2:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">three</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> commit</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><p>修改后</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># This is a combination of 2 commits.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># This is the 1st commit message:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">two</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> three</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> commit</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># This is the commit message #2:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">three</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> commit</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><p>保存后就成功</p><figure><img src="`+v+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><p>再次查看日志</p><figure><img src="'+u+`" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><p>rebase修改commit的操作有很多，上面我们用了一个<code>squash</code>，下面是全部的命令，可以根据需要选择</p><table><thead><tr><th style="text-align:left;">命令</th><th style="text-align:left;">解释</th><th style="text-align:left;">简写</th></tr></thead><tbody><tr><td style="text-align:left;">pick</td><td style="text-align:left;">使用提交，即应用该提交的更改。</td><td style="text-align:left;">p</td></tr><tr><td style="text-align:left;">reword</td><td style="text-align:left;">使用提交，但可以编辑提交消息。</td><td style="text-align:left;">r</td></tr><tr><td style="text-align:left;">edit</td><td style="text-align:left;">使用提交，但停下来以进行修改。</td><td style="text-align:left;">e</td></tr><tr><td style="text-align:left;">squash</td><td style="text-align:left;">使用提交，将其融入到前一个提交中。</td><td style="text-align:left;">s</td></tr><tr><td style="text-align:left;">exec</td><td style="text-align:left;">使用shell运行命令（行中的其余部分）。</td><td style="text-align:left;">x</td></tr><tr><td style="text-align:left;">break</td><td style="text-align:left;">在此处停止（稍后使用 <code>git rebase --continue</code> 继续进行rebase）。</td><td style="text-align:left;">b</td></tr><tr><td style="text-align:left;">drop</td><td style="text-align:left;">删除提交。</td><td style="text-align:left;">d</td></tr><tr><td style="text-align:left;">label</td><td style="text-align:left;">为当前HEAD标记一个名称。</td><td style="text-align:left;">l</td></tr><tr><td style="text-align:left;">reset</td><td style="text-align:left;">将HEAD重置为一个标签。</td><td style="text-align:left;">t</td></tr><tr><td style="text-align:left;">merge</td><td style="text-align:left;">将标签合并到HEAD上，并且可以选择编辑合并提交的消息。</td><td style="text-align:left;">m</td></tr><tr><td style="text-align:left;">fixup</td><td style="text-align:left;">类似于&quot;squash&quot;，但仅保留前一个提交的日志消息，除非使用了<code>-C</code>，这种情况下仅保留当前提交的消息；<code>-c</code> 与 <code>-C</code> 相同，但会打开编辑器。</td><td style="text-align:left;">f</td></tr></tbody></table><br><h2 id="四、从a分支选择n次提交-合并到b分支" tabindex="-1"><a class="header-anchor" href="#四、从a分支选择n次提交-合并到b分支"><span>四、从A分支选择N次提交，合并到B分支</span></a></h2><br><p>如标题所示，目的是从A分支拣取某几次提交到B分支，可使用命令 <code>git cherry-pick</code></p><p>假设在A分支上提交了三次，三次的hash分别是 A1、A2、A3， 现在我们要把 A2、A3 提交合并到B分支上，需要执行的命令如下：</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">--</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 1、切换到B分支</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> checkout</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> B</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">--</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 2、把A2、A3</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 提交合并过来</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> cherry-pick</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> A2</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> A3</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">--</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 3、提交代码</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> push</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><p>正常流程就是上面这样，但合并代码总面临着冲突，如果冲突了就会显示下面的异常</p><figure><img src="`+F+`" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><br><p>冲突了的解决办法有两个</p><br><p><strong>方式一</strong></p><p>取消这次的操作 <code>git cherry-pick --abort</code></p><br><p><strong>方式二</strong></p><p>解决冲突</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">--</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 1、先手动解决冲突</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">--</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 2、添加修改</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> .</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">--</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 3、在解决冲突后继续执行git</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> cherry-pick命令</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 、</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 会弹出一个文件，可以修改commit的描述，也可以直接关闭</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> cherry-pick</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> --continue</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">--</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 4、push代码</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> push</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+f+'" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure>',55);function _(x,D){const e=h("font");return p(),r("div",null,[E,a("p",null,[i("merge会把branchA所有的提交打包成一个最终状态，去和branchB的最终状态来一次合并。如果有冲突，我们只需要"),n(e,{color:"red"},{default:t(()=>[i("解决一次冲突")]),_:1}),i("就好了。")]),B,a("p",null,[i("rebase 会把branchA 上的每一次提交，都依次合并到 branchB 上去。 如果在branchA上的三次提交都和branchB有冲突，那你就要"),n(e,{color:"red"},{default:t(()=>[i("解决三次冲突")]),_:1}),i("。（因为它是依次提交的）")]),C])}const G=l(A,[["render",_],["__file","Git进阶之代码回滚、合并代码、从A分支选择N次提交，合并到B分支【revert、merge、rebase、cherry-pick】.html.vue"]]),T=JSON.parse('{"path":"/07Java%E5%91%A8%E8%BE%B9/01Git/Git%E8%BF%9B%E9%98%B6%E4%B9%8B%E4%BB%A3%E7%A0%81%E5%9B%9E%E6%BB%9A%E3%80%81%E5%90%88%E5%B9%B6%E4%BB%A3%E7%A0%81%E3%80%81%E4%BB%8EA%E5%88%86%E6%94%AF%E9%80%89%E6%8B%A9N%E6%AC%A1%E6%8F%90%E4%BA%A4%EF%BC%8C%E5%90%88%E5%B9%B6%E5%88%B0B%E5%88%86%E6%94%AF%E3%80%90revert%E3%80%81merge%E3%80%81rebase%E3%80%81cherry-pick%E3%80%91.html","title":"【中】Git进阶之代码回滚、合并代码、从A分支选择N次提交，合并到B分支【revert、merge、rebase、cherry-pick】","lang":"zh-CN","frontmatter":{"title":"【中】Git进阶之代码回滚、合并代码、从A分支选择N次提交，合并到B分支【revert、merge、rebase、cherry-pick】","shortTitle":"【中】代码回滚、合并代码、从A分支选择N次提交，合并到B分支","date":"2023-05-28T15:21:48.000Z","category":["中级","视频讲解"],"tag":["git","merge","revert"],"order":2,"description":"B站视频地址： https://www.bilibili.com/video/BV1KX4y1a7N9 在很长一段时间里，我对Git的操作只限于：提交代码，拉取代码，合并代码。 虽然上面这些操作在日常工作中也足够了，但不会点高级知识不利于装X，今天我们来学习几个高级点的操作。 一、前提 在正式操作之前，我们先来共知几个命令和概念。 SHA标识 每一次提...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/07Java%E5%91%A8%E8%BE%B9/01Git/Git%E8%BF%9B%E9%98%B6%E4%B9%8B%E4%BB%A3%E7%A0%81%E5%9B%9E%E6%BB%9A%E3%80%81%E5%90%88%E5%B9%B6%E4%BB%A3%E7%A0%81%E3%80%81%E4%BB%8EA%E5%88%86%E6%94%AF%E9%80%89%E6%8B%A9N%E6%AC%A1%E6%8F%90%E4%BA%A4%EF%BC%8C%E5%90%88%E5%B9%B6%E5%88%B0B%E5%88%86%E6%94%AF%E3%80%90revert%E3%80%81merge%E3%80%81rebase%E3%80%81cherry-pick%E3%80%91.html"}],["meta",{"property":"og:site_name","content":"小道仙Java笔记"}],["meta",{"property":"og:title","content":"【中】Git进阶之代码回滚、合并代码、从A分支选择N次提交，合并到B分支【revert、merge、rebase、cherry-pick】"}],["meta",{"property":"og:description","content":"B站视频地址： https://www.bilibili.com/video/BV1KX4y1a7N9 在很长一段时间里，我对Git的操作只限于：提交代码，拉取代码，合并代码。 虽然上面这些操作在日常工作中也足够了，但不会点高级知识不利于装X，今天我们来学习几个高级点的操作。 一、前提 在正式操作之前，我们先来共知几个命令和概念。 SHA标识 每一次提..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-23T14:12:53.000Z"}],["meta",{"property":"article:author","content":"小道仙97"}],["meta",{"property":"article:tag","content":"git"}],["meta",{"property":"article:tag","content":"merge"}],["meta",{"property":"article:tag","content":"revert"}],["meta",{"property":"article:published_time","content":"2023-05-28T15:21:48.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-23T14:12:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"【中】Git进阶之代码回滚、合并代码、从A分支选择N次提交，合并到B分支【revert、merge、rebase、cherry-pick】\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-05-28T15:21:48.000Z\\",\\"dateModified\\":\\"2024-07-23T14:12:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小道仙97\\",\\"url\\":\\"https://java.xdx97.com\\"}]}"]]},"headers":[{"level":2,"title":"一、前提","slug":"一、前提","link":"#一、前提","children":[{"level":3,"title":"SHA标识","slug":"sha标识","link":"#sha标识","children":[]},{"level":3,"title":"git log","slug":"git-log","link":"#git-log","children":[]}]},{"level":2,"title":"二、回滚代码","slug":"二、回滚代码","link":"#二、回滚代码","children":[{"level":3,"title":"回滚","slug":"回滚","link":"#回滚","children":[]},{"level":3,"title":"冲突","slug":"冲突","link":"#冲突","children":[]}]},{"level":2,"title":"三、合并代码","slug":"三、合并代码","link":"#三、合并代码","children":[{"level":3,"title":"Merge","slug":"merge","link":"#merge","children":[]},{"level":3,"title":"Rebase","slug":"rebase","link":"#rebase","children":[]},{"level":3,"title":"结论","slug":"结论","link":"#结论","children":[]},{"level":3,"title":"Rebase 合并 commit","slug":"rebase-合并-commit","link":"#rebase-合并-commit","children":[]}]},{"level":2,"title":"四、从A分支选择N次提交，合并到B分支","slug":"四、从a分支选择n次提交-合并到b分支","link":"#四、从a分支选择n次提交-合并到b分支","children":[]}],"git":{"createdTime":1721743973000,"updatedTime":1721743973000,"contributors":[{"name":"ziyangtao","email":"ziyangtao@distinctclinic.com","commits":1}]},"readingTime":{"minutes":7,"words":2100},"filePathRelative":"07Java周边/01Git/Git进阶之代码回滚、合并代码、从A分支选择N次提交，合并到B分支【revert、merge、rebase、cherry-pick】.md","localizedDate":"2023年5月28日","excerpt":"<br>\\n<ul>\\n<li>B站视频地址： <a href=\\"https://www.bilibili.com/video/BV1KX4y1a7N9\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://www.bilibili.com/video/BV1KX4y1a7N9</a></li>\\n</ul>\\n<br>\\n<p>在很长一段时间里，我对Git的操作只限于：提交代码，拉取代码，合并代码。</p>\\n<p>虽然上面这些操作在日常工作中也足够了，但不会点高级知识不利于装X，今天我们来学习几个高级点的操作。</p>\\n<br>\\n<h2>一、前提</h2>","autoDesc":true}');export{G as comp,T as data};
