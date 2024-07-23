import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o,d as a}from"./app-RyNrWDts.js";const p={},i=a('<div class="hint-container tip"><p class="hint-container-title">先要有设计，再谈过度设计</p><p>一段代码在写好之后，被人阅读的次数要远远大于修改的次数，如果站在让别人更好理解阅读的角度来写代码，就会大不相同。</p></div><br><p>在工作的前四年，我写代码的标准一直都是：可以稳定运行，第一眼看起来不那么让人恶心。</p><p>但我本质上还是想写好代码的，写让人赏心悦目的代码，所以我看了好几遍的《阿里巴巴Java开发手册》和《设计模式之美》，我也知道其中的一些写代码的规范和优点。</p><p>但我几乎从来不会去遵循，原因有很多比如，写出好的代码也不会给我带来太大的好处，大家都写垃圾代码有人比我写的还垃圾，我写垃圾代码也没什么坏处，没人说我什么。</p><p>去年开始找工作的时候，我想如果可以去一个业务牛逼的公司最好（高并发、大数据），如果我的能力不足以去这种地方那就去一个规范的公司。我一直都知道我写的代码很垃圾，但还是期望借助外力来改变自己。</p><p>这周写了一个需求，评估工时2天，组长CodeReview提了27个问题，改了25个。我们CodeReview的时候都是在群里说通知对应的人去修改，到最后我组长都私聊我，因为实在是太多了，可能是照顾我的情面，也可能是不想打扰大家。</p><p>前些天看别人CodeView的时候我还在想为什么要反反复复那么多次，到我之后问直接傻眼了，比别人还多N次。</p><p>他提的肯定是合理的，不然我也不会改，但这也从侧面说明我的代码写的很烂，我也挺愿意去修改的，这个系列就专门讨论如何写个漂亮的代码（主要记录我在工作中遇到的一些好的点）。</p><p>万物都需要一个开始，在我还没开始追求写个漂亮代码的时候，我总在想怎么写个漂亮的代码，我看的书中也总会提到一个词：“过度设计”，这次词在我脑海中出现的次数比任何有关设计的词都多很多。所以我每次想要设计的时候的时候就在想，真的有必要设计吗？这么简单的代码稍微设计一下是不是就过度了？现在看来我要担心的不是过度设计，而是没有设计，我应该先学会设计，再去考虑过度设计的问题。（现在也是一个好的机会，我只需要去设计，过度设计的问题留给CodeView我代码的人去考虑）</p><br><blockquote><p>这个专栏的东西都来自我的真实工作实践，且代码优雅这个和其它的事情不同，它不是唯一的，只供参考</p></blockquote>',12),n=[i];function r(c,s){return o(),e("div",null,n)}const m=t(p,[["render",r],["__file","index.html.vue"]]),h=JSON.parse('{"path":"/25%E5%86%99%E4%B8%AA%E6%BC%82%E4%BA%AE%E7%9A%84%E4%BB%A3%E7%A0%81/","title":"25:写个漂亮的代码","lang":"zh-CN","frontmatter":{"title":"25:写个漂亮的代码","shortTitle":"【中】写个漂亮的代码","date":"2024-06-08T07:53:02.000Z","category":["中级"],"description":"先要有设计，再谈过度设计 一段代码在写好之后，被人阅读的次数要远远大于修改的次数，如果站在让别人更好理解阅读的角度来写代码，就会大不相同。 在工作的前四年，我写代码的标准一直都是：可以稳定运行，第一眼看起来不那么让人恶心。 但我本质上还是想写好代码的，写让人赏心悦目的代码，所以我看了好几遍的《阿里巴巴Java开发手册》和《设计模式之美》，我也知道其中的...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/25%E5%86%99%E4%B8%AA%E6%BC%82%E4%BA%AE%E7%9A%84%E4%BB%A3%E7%A0%81/"}],["meta",{"property":"og:site_name","content":"小道仙Java笔记"}],["meta",{"property":"og:title","content":"25:写个漂亮的代码"}],["meta",{"property":"og:description","content":"先要有设计，再谈过度设计 一段代码在写好之后，被人阅读的次数要远远大于修改的次数，如果站在让别人更好理解阅读的角度来写代码，就会大不相同。 在工作的前四年，我写代码的标准一直都是：可以稳定运行，第一眼看起来不那么让人恶心。 但我本质上还是想写好代码的，写让人赏心悦目的代码，所以我看了好几遍的《阿里巴巴Java开发手册》和《设计模式之美》，我也知道其中的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-23T14:12:53.000Z"}],["meta",{"property":"article:author","content":"小道仙97"}],["meta",{"property":"article:published_time","content":"2024-06-08T07:53:02.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-23T14:12:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"25:写个漂亮的代码\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-08T07:53:02.000Z\\",\\"dateModified\\":\\"2024-07-23T14:12:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小道仙97\\",\\"url\\":\\"https://java.xdx97.com\\"}]}"]]},"headers":[],"git":{"createdTime":1721743973000,"updatedTime":1721743973000,"contributors":[{"name":"ziyangtao","email":"ziyangtao@distinctclinic.com","commits":1}]},"readingTime":{"minutes":2.69,"words":807},"filePathRelative":"25写个漂亮的代码/README.md","localizedDate":"2024年6月8日","excerpt":"<div class=\\"hint-container tip\\">\\n<p class=\\"hint-container-title\\">先要有设计，再谈过度设计</p>\\n<p>一段代码在写好之后，被人阅读的次数要远远大于修改的次数，如果站在让别人更好理解阅读的角度来写代码，就会大不相同。</p>\\n</div>\\n<br>\\n<p>在工作的前四年，我写代码的标准一直都是：可以稳定运行，第一眼看起来不那么让人恶心。</p>\\n<p>但我本质上还是想写好代码的，写让人赏心悦目的代码，所以我看了好几遍的《阿里巴巴Java开发手册》和《设计模式之美》，我也知道其中的一些写代码的规范和优点。</p>\\n<p>但我几乎从来不会去遵循，原因有很多比如，写出好的代码也不会给我带来太大的好处，大家都写垃圾代码有人比我写的还垃圾，我写垃圾代码也没什么坏处，没人说我什么。</p>","autoDesc":true}');export{m as comp,h as data};
