import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,d as n}from"./app-DHPyT5jL.js";const l={},t=n(`<h2 id="_1、先看一下arraylist的构造方法" tabindex="-1"><a class="header-anchor" href="#_1、先看一下arraylist的构造方法"><span>1、先看一下ArrayList的构造方法</span></a></h2><p><strong>1-1：空参构造方法:</strong></p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">private</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> static</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> final</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;"> Object</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> {}</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">public</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> ArrayList</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">() {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;">    this</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">elementData</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> DEFAULTCAPACITY_EMPTY_ELEMENTDATA</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到默认的空参构造方法是<strong>赋值了一个空数组</strong><br></p><p><strong>1-2：传入默认大小/容量，构造方法</strong></p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> private</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> static</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> final</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;"> Object</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">[] EMPTY_ELEMENTDATA </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> {}</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">public</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> ArrayList</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> initialCapacity) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> (initialCapacity </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;">        this</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">elementData</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> new</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;"> Object</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">[initialCapacity]</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    } </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">else</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> if</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> (initialCapacity </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">==</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;">        this</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">elementData</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> EMPTY_ELEMENTDATA</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    } </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">else</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">        throw</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> IllegalArgumentException</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;Illegal Capacity: &quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">+</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">                                               initialCapacity)</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>当你传入的容量大于等于0，就会给你new出相对应大小的数组。不然就会抛出非法参数的异常</li><li>因为扩容是需要浪费时间的性能的。所以如果你开始就知道容量大小，应当直接选择这种构造方法</li></ul><br><p><strong>1-2：传入一个Collection的集合，构造方法</strong></p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">public</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> ArrayList</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Collection</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> extends E</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> c) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    elementData </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> c</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">toArray</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> ((size </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> elementData</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">length</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">!=</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">    // c.toArray might (incorrectly) not return Object[] (see 6260652)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    	if</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> (</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">elementData</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">getClass</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> !=</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;"> Object</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">[]</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">class</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">){</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">	     elementData </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> Arrays</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">copyOf</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(elementData, size, </span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">Object</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">[].</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">class</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    } </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">else</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">        // replace with empty array.</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;">        this</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">elementData</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> EMPTY_ELEMENTDATA</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">     }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>把你传入的其它类型的集合，转成ArrayList集合</p><br><h2 id="_2、看一下arraylist是如何进入扩容的" tabindex="-1"><a class="header-anchor" href="#_2、看一下arraylist是如何进入扩容的"><span>2、看一下ArrayList是如何进入扩容的</span></a></h2><p><strong>看一下add()方法</strong></p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> boolean</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> add</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">E</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> e) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    ensureCapacityInternal</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(size </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">)</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">  // Increments modCount!!</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    elementData[size</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">++</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> e</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    return</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到首先就是调用了这个 ensureCapacityInternal，因为你添加一个元素，可能会出现数组越界，那这个方法就是预防这个问题的。</p><p><strong>我们再看一下这个 ensureCapacityInternal</strong></p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">private</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> ensureCapacityInternal</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> minCapacity) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    ensureExplicitCapacity</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">calculateCapacity</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(elementData</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> minCapacity))</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这个里面先调用了calculateCapacity，后调用 ensureExplicitCapacity，我们依次来看</strong></p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">private</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> static</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> final</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> int</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> DEFAULT_CAPACITY </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 10</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">private</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> static</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> int</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> calculateCapacity</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">Object</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">[] elementData</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> int</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> minCapacity) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> (elementData </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">==</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">        return</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> Math</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">max</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(DEFAULT_CAPACITY, minCapacity);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> minCapacity</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>这个方法就是判断，目前这个集合/数组是否为空，因为我们看到使用空参构造出来的集合/数据是空的。如果是空的话。就取默认大小和当前大小的最大值。</li><li>可以看到默认容量大小是 10</li></ul><p><strong>上面看了calculateCapacity，我们再来看下 ensureExplicitCapacity</strong></p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">private</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> ensureExplicitCapacity</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> minCapacity) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    modCount</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">++</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> (minCapacity </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> elementData</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">length</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> &gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">){</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    	grow</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(minCapacity)</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    }        </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个 <strong>minCapacity</strong> 就是我们现在需要的容量大小，如果它大于当前的数组大小。那么就触发了 <strong>grow()</strong> 方法，也就是扩容方法。</p><br><h2 id="_3、现在我们可以来具体看一下这个-grow-扩容方法了" tabindex="-1"><a class="header-anchor" href="#_3、现在我们可以来具体看一下这个-grow-扩容方法了"><span>3、现在我们可以来具体看一下这个 grow() 扩容方法了</span></a></h2><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">private</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> static</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> final</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> int</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> MAX_ARRAY_SIZE </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> Integer</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">MAX_VALUE</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> -</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 8</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">private</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> grow</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> minCapacity) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">    // overflow-conscious code</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    int</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> oldCapacity </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> elementData</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">length</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    int</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> newCapacity </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> oldCapacity </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> (oldCapacity </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&gt;&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">)</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> (newCapacity </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> minCapacity </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">){</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">        newCapacity </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> minCapacity</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> (newCapacity </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> MAX_ARRAY_SIZE </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">){</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">        newCapacity </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> hugeCapacity</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(minCapacity)</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    }</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">    // minCapacity is usually close to size, so this is a win:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    elementData </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> Arrays</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">copyOf</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(elementData, newCapacity);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><details><summary><b>简单解释一下 &gt;&gt; 右位移，你也可以直接记住是扩大了50%</b></summary><br>     <b>这里直接把oldCapacity当作 999</b><br>     1、把 999 转化成二进制 1111100111<br>     2、从右边去掉一位变成 111110011 就是最后的结果，转成十进制是 499<br>     3、你可以理解成 &gt;&gt; 后面接几，就移除几位 </details><br><ul><li>通过上面的解释我们知道了新的容量大小是之前的1.5倍。</li><li>如果当前所需容量大小，还是大于新的容量大小。 就直接让当前容量大小作为扩容后的大小</li><li>如果新的容量要是大于默认最大值，就需要调用一下hugeCapacity方法，取Integer和当前容量的最大值</li></ul><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">private</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> static</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> int</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> hugeCapacity</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> minCapacity) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> (minCapacity </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">// overflow</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">        throw</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> OutOfMemoryError</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">()</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> (minCapacity </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> MAX_ARRAY_SIZE) </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> Integer</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">MAX_VALUE</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> :</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> MAX_ARRAY_SIZE</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h2 id="_4、总结" tabindex="-1"><a class="header-anchor" href="#_4、总结"><span>4、总结</span></a></h2><ul><li>当我们向集合里面添加一个元素的时候，就会去判断当前集合大小是否满足。</li><li>因为使用无参构造方法创建的ArrayList，默认是空数组。所以需要先判断数组是否为空，如果为空的话，就取当前长度和默认长度的最大值，默认长度是10。</li><li>然后判断当前所需空间是否大于数组的空间，如果不大于就不需要进行扩容了。如果大于则需要进去扩容。</li><li>新的长度大小，是在旧的基础上加上旧长度的0.5倍。使用向右位移一位计算出来的。</li><li>如果新计算的长度还是小于当前需要的长度，就直接让新的长度等于当前所需长度。</li><li>最后得出的新长度要和最大的数组长度对比。如果大于最大长度。就需要让新长度和最大长度比较，大于最大长度，就让新长度等于Integer的最大值，否则就让新长度等于数组最大长度。</li><li>最后一步，得出了新的长度，调用Arrays.copyOf，生成新的数组。</li></ul>`,34),h=[t];function e(k,p){return a(),s("div",null,h)}const g=i(l,[["render",e],["__file","ArrayList扩容机制源码分析.html.vue"]]),y=JSON.parse('{"path":"/01Java/02%E9%9B%86%E5%90%88/ArrayList%E6%89%A9%E5%AE%B9%E6%9C%BA%E5%88%B6%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90.html","title":"【初】ArrayList扩容机制源码分析","lang":"zh-CN","frontmatter":{"title":"【初】ArrayList扩容机制源码分析","shortTitle":"【初】ArrayList扩容机制源码分析","index":true,"date":"2019-12-19T16:35:08.000Z","category":["初级"],"description":"1、先看一下ArrayList的构造方法 1-1：空参构造方法: 可以看到默认的空参构造方法是赋值了一个空数组 1-2：传入默认大小/容量，构造方法 当你传入的容量大于等于0，就会给你new出相对应大小的数组。不然就会抛出非法参数的异常 因为扩容是需要浪费时间的性能的。所以如果你开始就知道容量大小，应当直接选择这种构造方法 1-2：传入一个Collec...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/01Java/02%E9%9B%86%E5%90%88/ArrayList%E6%89%A9%E5%AE%B9%E6%9C%BA%E5%88%B6%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90.html"}],["meta",{"property":"og:site_name","content":"小道仙Java笔记"}],["meta",{"property":"og:title","content":"【初】ArrayList扩容机制源码分析"}],["meta",{"property":"og:description","content":"1、先看一下ArrayList的构造方法 1-1：空参构造方法: 可以看到默认的空参构造方法是赋值了一个空数组 1-2：传入默认大小/容量，构造方法 当你传入的容量大于等于0，就会给你new出相对应大小的数组。不然就会抛出非法参数的异常 因为扩容是需要浪费时间的性能的。所以如果你开始就知道容量大小，应当直接选择这种构造方法 1-2：传入一个Collec..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-20T12:30:55.000Z"}],["meta",{"property":"article:author","content":"小道仙97"}],["meta",{"property":"article:published_time","content":"2019-12-19T16:35:08.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-20T12:30:55.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"【初】ArrayList扩容机制源码分析\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-12-19T16:35:08.000Z\\",\\"dateModified\\":\\"2024-07-20T12:30:55.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小道仙97\\",\\"url\\":\\"https://java.xdx97.com\\"}]}"]]},"headers":[{"level":2,"title":"1、先看一下ArrayList的构造方法","slug":"_1、先看一下arraylist的构造方法","link":"#_1、先看一下arraylist的构造方法","children":[]},{"level":2,"title":"2、看一下ArrayList是如何进入扩容的","slug":"_2、看一下arraylist是如何进入扩容的","link":"#_2、看一下arraylist是如何进入扩容的","children":[]},{"level":2,"title":"3、现在我们可以来具体看一下这个 grow() 扩容方法了","slug":"_3、现在我们可以来具体看一下这个-grow-扩容方法了","link":"#_3、现在我们可以来具体看一下这个-grow-扩容方法了","children":[]},{"level":2,"title":"4、总结","slug":"_4、总结","link":"#_4、总结","children":[]}],"git":{"createdTime":1721461625000,"updatedTime":1721478655000,"contributors":[{"name":"ziyangtao","email":"ziyangtao@distinctclinic.com","commits":6}]},"readingTime":{"minutes":3.95,"words":1184},"filePathRelative":"01Java/02集合/ArrayList扩容机制源码分析.md","localizedDate":"2019年12月20日","excerpt":"<h2>1、先看一下ArrayList的构造方法</h2>\\n<p><strong>1-1：空参构造方法:</strong></p>\\n<div class=\\"language-java line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"java\\" data-title=\\"java\\" style=\\"--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes github-light one-dark-pro vp-code\\"><code><span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">private</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\"> static</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\"> final</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#E5C07B\\"> Object</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA </span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\">=</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\"> {}</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">;</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">public</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\"> ArrayList</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">() {</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#005CC5;--shiki-dark:#E5C07B\\">    this</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">elementData</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\"> =</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\"> DEFAULTCAPACITY_EMPTY_ELEMENTDATA</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">;</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">}</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{g as comp,y as data};
