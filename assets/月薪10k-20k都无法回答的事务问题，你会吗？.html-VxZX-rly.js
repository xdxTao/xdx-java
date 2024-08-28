import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as a,b as n}from"./app-CqoDLIc2.js";const e={},l=n(`<br><p>今天朋友扔来一个“简单”的事务代码，初看无味，再看惊奇。</p><p>也问了身边的一些朋友无一人回答正确，你也试试？</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">Service</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> TestService</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    @</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">Autowired</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    private</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> TestMapper</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> testMapper</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    @</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">Autowired</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    private</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> TestServiceTwo</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> testServiceTwo</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    @</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">Transactional</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">rollbackFor</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> Exception</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">class</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> String</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> funOne</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(){</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">        // 这个就是一个简单的insert语句</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">        testMapper</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">insert</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;a&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">        try</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">            testServiceTwo</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">funTwo</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        }</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">catch</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Exception</span><span style="--shiki-light:#E36209;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"> e</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">){</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">            System</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">out</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">println</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;异常了~~~&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">        return</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;da&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">Service</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> TestServiceTwo</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    @</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">Transactional</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">rollbackFor</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> Exception</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">class</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> funTwo</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(){</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">        throw</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> RuntimeException</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;DASDASDA&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>问：最后数据库插入了几条数据？（答案放在文中）</p><br><p>下面有几个结论我们一个个去证明，看完你就会明白了。</p><br><h4 id="一、spring基于注解的事务是基于代理的-不走代理-被调用的方法就不受事务管理代码的控制" tabindex="-1"><a class="header-anchor" href="#一、spring基于注解的事务是基于代理的-不走代理-被调用的方法就不受事务管理代码的控制"><span>一、spring基于注解的事务是基于代理的，不走代理，被调用的方法就不受事务管理代码的控制</span></a></h4><p>所谓代理其实就是是否是用过依赖注入的，如果我们手动new一个对象，或者直接去调用本类的方法则不走代理。</p><p>通过下面这个代码可以打印出当前事务的<code>hashCode</code>，如果<code>hashCode</code>相同则认为是同一个事务。</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">TransactionAspectSupport</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">currentTransactionStatus</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">hashCode</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">()</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ul><li><p>可以把它放在上面的<code>funOne</code>和<code>funTwo</code>里面，发现最后打印出来的<code>hashCode</code>并不相同。</p></li><li><p>如果我们调用<code>funTwo</code>的时候，并不使用<code>@Autowired</code>的方式，而是使用<code>new</code>的方式，你会发现打印的<code>hashCode</code>确是相同的。</p></li><li><ul><li>TestServiceTwo two = new TestServiceTwo();</li></ul></li><li><ul><li>two.funTwo();</li></ul></li><li><p>如果去掉方法<code>funTwo</code>上面的<code>@Transactional</code>注解，再次打印的<code>hashCode</code>也是相同的。</p></li><li><p>如果不去调用<code>funTwo</code>，而是去调用和<code>funOne</code>同类（同一个类）的<code>funThree</code>，打印的<code>hashCode</code>也是相同的。</p></li></ul><p>注：如果<code>hashCode</code>相同那么说明是用一个事务。</p><br><h4 id="二、嵌套事务如果子事务抛出了异常-父事务同样会回滚-并且会抛出一个异常" tabindex="-1"><a class="header-anchor" href="#二、嵌套事务如果子事务抛出了异常-父事务同样会回滚-并且会抛出一个异常"><span>二、嵌套事务如果子事务抛出了异常，父事务同样会回滚，并且会抛出一个异常</span></a></h4><div class="language-error line-numbers-mode" data-highlighter="shiki" data-ext="error" data-title="error" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>Transaction rolled back because it has been marked as rollback-only</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>其实这个结论就在本题的结果，最后没有插入一条数据，原因就是父事务也回滚了。</p><p><code>funOne</code>调用<code>funTwo</code>，<code>funOne</code>中抓了<code>funTwo</code>的异常，当<code>funTwo</code>发生异常的时候，<code>funTwo</code>的操作应该回滚，但是<code>funOne</code>吃了异常，<code>funOne</code>方法中没有产生异常，所以<code>funOne</code>的操作又应该提交，二者是相互矛盾的。</p><p><mark>spring的事务关联拦截器在抓到<code>funTwo</code>的异常后就会标记rollback-only为true，当<code>funOne</code>执行完准备提交后，发现rollback-only为true，也会回滚，并抛出异常告诉调用者。</mark></p><br><p>但也不是绝对的，我们知道上面的两个事务虽然是独立的两个事务，但是依旧是有关联的，你可以理解成关联事务（就是上面所说spring的事务关联拦截器......）</p><p>如果我们让其事务不进行关联，是两个独立的事务，也就是说不会抛出<code>rollback-only</code>这个异常，那么<code>funOne</code>就不会回滚。</p><p>事务的传播行为有很多种，默认是<code>REQUIRED</code>，我们改成<code>REQUIRES_NEW</code>，再来试试结果发现是插入了一条数据的。</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">Transactional</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">rollbackFor</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> Exception</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">class</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> propagation</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> Propagation</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">REQUIRES_NEW</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>事务的传播行为：</p><table><thead><tr><th>value</th><th>desc</th></tr></thead><tbody><tr><td>REQUIRED (默认)</td><td>支持当前事务，如果当前没有事务，就新建一个事务。这是最常见的选择</td></tr><tr><td>SUPPORTS</td><td>支持当前事务，如果当前没有事务，就以非事务方式执行</td></tr><tr><td>MANDATORY</td><td>支持当前事务，如果当前没有事务，就抛出异常</td></tr><tr><td>REQUIRES_NEW</td><td>新建事务，如果当前存在事务，把当前事务挂起</td></tr><tr><td>NOT_SUPPORTED</td><td>以非事务方式执行操作，如果当前存在事务，就把当前事务挂起</td></tr><tr><td>NEVER</td><td>以非事务方式执行，如果当前存在事务，则抛出异常</td></tr><tr><td>NESTED</td><td>支持当前事务，如果当前事务存在，则执行一个嵌套事务，如果当前没有事务，就新建一个事务</td></tr></tbody></table><p>注：这里的<strong>当前事务</strong>和我们一般理解有些不同，不是它的父事务。</p><br><h4 id="三、如果在同一个事务内-不管是父方法异常-还是子方法异常-全部会回滚。-如果把异常try-catch-则不会" tabindex="-1"><a class="header-anchor" href="#三、如果在同一个事务内-不管是父方法异常-还是子方法异常-全部会回滚。-如果把异常try-catch-则不会"><span>三、如果在同一个事务内，不管是父方法异常，还是子方法异常，全部会回滚。（如果把异常<code>try catch</code>，则不会）</span></a></h4><p>这里的同一个事务指（其实我们可以通过打印<code>hashCode</code>的方式来判断）</p><ul><li>同一个类去调用子方法</li><li>调用另外一个类的没有<code>@Transactional</code>的方法</li></ul><p>eg:</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">Service</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> TestService</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    @</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">Autowired</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    private</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> TestMapper</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> testMapper</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    @</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">Transactional</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">rollbackFor</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> Exception</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">class</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> String</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> funOne</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(){</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">        testMapper</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">insert</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;a&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">        funThree</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">        return</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;das&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> funThree</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(){</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">        int</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> i</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> /</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,35),t=[l];function h(k,p){return a(),i("div",null,t)}const c=s(e,[["render",h],["__file","月薪10k-20k都无法回答的事务问题，你会吗？.html.vue"]]),B=JSON.parse('{"path":"/19%E5%9C%BA%E6%99%AF%E9%A2%98/02%E7%90%86%E8%AE%BA%E5%85%88%E8%A1%8C/%E6%9C%88%E8%96%AA10k-20k%E9%83%BD%E6%97%A0%E6%B3%95%E5%9B%9E%E7%AD%94%E7%9A%84%E4%BA%8B%E5%8A%A1%E9%97%AE%E9%A2%98%EF%BC%8C%E4%BD%A0%E4%BC%9A%E5%90%97%EF%BC%9F.html","title":"【初】月薪10k-20k都无法回答的事务问题，你会吗？","lang":"zh-CN","frontmatter":{"title":"【初】月薪10k-20k都无法回答的事务问题，你会吗？","shortTitle":"【初】月薪10k-20k都无法回答的事务问题","date":"2021-07-26T22:10:17.000Z","category":["初级"],"order":3,"description":"今天朋友扔来一个“简单”的事务代码，初看无味，再看惊奇。 也问了身边的一些朋友无一人回答正确，你也试试？ 问：最后数据库插入了几条数据？（答案放在文中） 下面有几个结论我们一个个去证明，看完你就会明白了。 一、spring基于注解的事务是基于代理的，不走代理，被调用的方法就不受事务管理代码的控制 所谓代理其实就是是否是用过依赖注入的，如果我们手动new...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/19%E5%9C%BA%E6%99%AF%E9%A2%98/02%E7%90%86%E8%AE%BA%E5%85%88%E8%A1%8C/%E6%9C%88%E8%96%AA10k-20k%E9%83%BD%E6%97%A0%E6%B3%95%E5%9B%9E%E7%AD%94%E7%9A%84%E4%BA%8B%E5%8A%A1%E9%97%AE%E9%A2%98%EF%BC%8C%E4%BD%A0%E4%BC%9A%E5%90%97%EF%BC%9F.html"}],["meta",{"property":"og:site_name","content":"小道仙Java笔记"}],["meta",{"property":"og:title","content":"【初】月薪10k-20k都无法回答的事务问题，你会吗？"}],["meta",{"property":"og:description","content":"今天朋友扔来一个“简单”的事务代码，初看无味，再看惊奇。 也问了身边的一些朋友无一人回答正确，你也试试？ 问：最后数据库插入了几条数据？（答案放在文中） 下面有几个结论我们一个个去证明，看完你就会明白了。 一、spring基于注解的事务是基于代理的，不走代理，被调用的方法就不受事务管理代码的控制 所谓代理其实就是是否是用过依赖注入的，如果我们手动new..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-08-10T14:31:36.000Z"}],["meta",{"property":"article:author","content":"小道仙97"}],["meta",{"property":"article:published_time","content":"2021-07-26T22:10:17.000Z"}],["meta",{"property":"article:modified_time","content":"2024-08-10T14:31:36.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"【初】月薪10k-20k都无法回答的事务问题，你会吗？\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-07-26T22:10:17.000Z\\",\\"dateModified\\":\\"2024-08-10T14:31:36.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小道仙97\\",\\"url\\":\\"https://java.xdx97.com\\"}]}"]]},"headers":[],"git":{"createdTime":1723300296000,"updatedTime":1723300296000,"contributors":[{"name":"ziyangtao","email":"ziyangtao@distinctclinic.com","commits":1}]},"readingTime":{"minutes":3.83,"words":1149},"filePathRelative":"19场景题/02理论先行/月薪10k-20k都无法回答的事务问题，你会吗？.md","localizedDate":"2021年7月27日","excerpt":"<br>\\n<p>今天朋友扔来一个“简单”的事务代码，初看无味，再看惊奇。</p>\\n<p>也问了身边的一些朋友无一人回答正确，你也试试？</p>\\n<div class=\\"language-java line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"java\\" data-title=\\"java\\" style=\\"--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes github-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">@</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#E5C07B\\">Service</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">public</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\"> class</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#E5C07B\\"> TestService</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\"> {</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">    @</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#E5C07B\\">Autowired</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">    private</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\"> TestMapper</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\"> testMapper</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">;</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">    @</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#E5C07B\\">Autowired</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">    private</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\"> TestServiceTwo</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\"> testServiceTwo</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">;</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">    @</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#E5C07B\\">Transactional</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">(</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">rollbackFor</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\"> =</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\"> Exception</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">class</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">)</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">    public</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\"> String</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\"> funOne</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">(){</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">        // 这个就是一个简单的insert语句</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">        testMapper</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">insert</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">(</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">\\"a\\"</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">);</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">        try</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\"> {</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">            testServiceTwo</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">funTwo</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">();</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">        }</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">catch</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\"> (</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">Exception</span><span style=\\"--shiki-light:#E36209;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\"> e</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">){</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">            System</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">out</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">println</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">(</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">\\"异常了~~~\\"</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">);</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">        }</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">        return</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> \\"da\\"</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">;</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">    }</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">}</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{c as comp,B as data};
