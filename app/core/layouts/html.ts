export const html =
`<h2>Types and Interfaces</h2>
<p>In this article we explore the intricaties of types and interfaces - defined via <code>type</code> and <code>interface</code> - in TypeScript. There are some similarities, but also some differences to look out for.</p>
<h2>Not Types, but Type Aliases</h2>
<p>If we look at the <a href="https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-aliases">official documentation</a>, we will see types are actually referred to as &quot;Type Aliases&quot;. When you define a type, you are creating an alias, or a new <em>name</em>, to an existing definition. A type alias (often just referred to as a type for short, like in this article) defines data.</p>
<p>An <code>interface</code>, on the other hand, is used to describe the shape of some data - usually an object.</p>
<p>Despite this somewhat ambiguous definition, you can use a type aliases in a similar capacity to interfaces. Time for some examples.</p>
<h2>The Animal Type</h2>
<p>In this example we define an <code>Animal</code> type. To make it clear it's a type, not an interface, we prepend the type with <code>T</code>.</p>
<pre class="hljs"><code><span class="hljs-keyword">type</span> TAnimal = {
  <span class="hljs-attr">kind</span>: <span class="hljs-string">&#x27;cat&#x27;</span> | <span class="hljs-string">&#x27;dog&#x27;</span>   
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>
}

<span class="hljs-keyword">const</span> kitty: TAnimal = {
  <span class="hljs-attr">kind</span>: <span class="hljs-string">&#x27;cat&#x27;</span>,
  <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Kitty&#x27;</span>
}

<span class="hljs-keyword">const</span> lucky: TAnimal = {
  <span class="hljs-attr">kind</span>: <span class="hljs-string">&#x27;dog&#x27;</span>,
  <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Lucky&#x27;</span>
}
</code></pre>
<p>We created a new <code>TAnimal</code> type. In the tiny little world we are defining, there are only two types of animals - cats and dogs. Creating a <code>TAnimal</code> with a <code>kind</code> other than <code>cat</code> or <code>dog</code> will throw an error.</p>
<h2>Types in Types</h2>
<p>Instead of specifying the <code>kind</code> every time we define a <code>TAnimal</code>, we can create another type alias. Type aliases can use type aliases!</p>
<pre class="hljs"><code><span class="hljs-keyword">type</span> TKind = <span class="hljs-string">&#x27;cat&#x27;</span> | <span class="hljs-string">&#x27;dog&#x27;</span>

<span class="hljs-keyword">type</span> TAnimal = {
  <span class="hljs-attr">kind</span>: TKind
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>
}
</code></pre>
<h2>TDog and TCat Type Aliases</h2>
<p>If dogs and cats are so common in our system, we might like a <code>TDog</code> and <code>TCat</code> type. The both share some common definitions - namely, they have <code>kind</code> and <code>name</code> properties. Thinking ahead when we want to add some more animals to our world, maybe a <code>TBird</code>, we decide having a shared base type sounds like a pretty good idea.</p>
<p>This is where type aliases might not be the best choice.</p>
<p>Let's try it out. We will define a <code>TCat</code> and <code>TDog</code> which use a base type, <code>TAnimal</code>. This introduces a new operator, <code>&amp;</code>, the intersection operator.</p>
<pre class="hljs"><code><span class="hljs-keyword">type</span> TKind = <span class="hljs-string">&#x27;cat&#x27;</span> | <span class="hljs-string">&#x27;dog&#x27;</span>

<span class="hljs-keyword">type</span> TAnimal = {
  <span class="hljs-attr">kind</span>: TKind
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>
}

<span class="hljs-keyword">type</span> TDog = {
  <span class="hljs-attr">kind</span>: <span class="hljs-string">&#x27;dog&#x27;</span>
} &amp; TAnimal

<span class="hljs-keyword">type</span> TCat = {
  <span class="hljs-attr">kind</span>: <span class="hljs-string">&#x27;cat&#x27;</span>
} &amp; TAnimal

<span class="hljs-keyword">const</span> cat: TCat = {
  <span class="hljs-attr">kind</span>: <span class="hljs-string">&#x27;cat&#x27;</span>,
  <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Kitty&#x27;</span>
}

<span class="hljs-keyword">const</span> dog: TDog = {
  <span class="hljs-attr">kind</span>: <span class="hljs-string">&#x27;dog&#x27;</span>,
  <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Lucky&#x27;</span>
}
</code></pre>
<p>A little awkward, but we did it! The intersection operator basically smooshes all the types together. A concise example would be:</p>
<pre class="hljs"><code><span class="hljs-keyword">type</span> HasStatusCode = {
  <span class="hljs-attr">code</span>: <span class="hljs-built_in">number</span>
}

<span class="hljs-keyword">type</span> HasBody = {
  <span class="hljs-attr">body</span>: <span class="hljs-built_in">string</span>
}

<span class="hljs-keyword">type</span> Request = HasStatus &amp; HasBody
</code></pre>
<p>A valid <code>Request</code> must now have a <code>code</code> and a <code>body</code>.</p>
<p>While w <em>can</em> compose complex type aliases by combining them, there is a more idiomatic way: <code>interface</code>, which works with the <code>extends</code> keyword.</p>
<h2>Refactoring to Interface</h2>
<p>Whenever you are defining a base type that is you intend to extend, using an interface probably makes sense. Let's do a refactor, using <code>interface</code> where possible:</p>
<pre class="hljs"><code><span class="hljs-keyword">type</span> TKind = <span class="hljs-string">&#x27;cat&#x27;</span> | <span class="hljs-string">&#x27;dog&#x27;</span>

<span class="hljs-keyword">interface</span> IAnimal {
  <span class="hljs-attr">kind</span>: TKind
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>
}

<span class="hljs-keyword">interface</span> IDog <span class="hljs-keyword">extends</span> IAnimal {
  <span class="hljs-attr">kind</span>: <span class="hljs-string">&#x27;dog&#x27;</span>
}

<span class="hljs-keyword">interface</span> ICat <span class="hljs-keyword">extends</span> IAnimal {
  <span class="hljs-attr">kind</span>: <span class="hljs-string">&#x27;cat&#x27;</span>
}

<span class="hljs-keyword">const</span> cat: ICat = {
  <span class="hljs-attr">kind</span>: <span class="hljs-string">&#x27;cat&#x27;</span>,
  <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Kitty&#x27;</span>
}

<span class="hljs-keyword">const</span> dog: IDog = {
  <span class="hljs-attr">kind</span>: <span class="hljs-string">&#x27;dog&#x27;</span>,
  <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Lucky&#x27;</span>
}
</code></pre>
<p>When it comes to actually <em>using</em> the interface, it's exaclty the same syntax: <code>const dog: &lt;type or interface&gt; = { ... }</code>.</p>
<p>Notice we will have one type alias - <code>type TKind = 'cat' | 'dog'</code>. You can't use <code>interface</code> to alias types like this. <code>interface IKind = 'dog' | 'cat'</code> is simply not valid. A general rule of thumb could be use <code>interface</code> for defining types intended as base definitions, and use <code>type</code> for aliasing multiple types.</p>
<p>Another example using <code>type</code> to group types could be if we added a <code>IHuman</code> to the system, but would like to capture <code>IDog</code> and <code>ICat</code> as a subset of the <code>IAnimal</code> type. This also introduces a new operator, the <code>|</code> union operator.</p>
<pre class="hljs"><code><span class="hljs-keyword">type</span> TKind = <span class="hljs-string">&#x27;cat&#x27;</span> | <span class="hljs-string">&#x27;dog&#x27;</span> | <span class="hljs-string">&#x27;human&#x27;</span>

<span class="hljs-comment">// interface ICat, IDog ...</span>

<span class="hljs-keyword">interface</span> IHuman <span class="hljs-keyword">extends</span> IAnimal {
  <span class="hljs-attr">kind</span>: <span class="hljs-string">&#x27;human&#x27;</span>
}

<span class="hljs-keyword">type</span> TPet = IDog | ICat
</code></pre>
<p><code>|</code> means <code>TPet</code> can either be an <code>IDog</code> <em>or</em> and <code>ICat</code> - but not an <code>IHuman</code>. <code>TPet</code> <em>unites</em> the two type aliases - that's why <code>|</code> is called the <code>union</code> operator.</p>
<h2>Further Extending Interfaces</h2>
<p><code>interface</code> has a another neat feature - you can extend the <em>same</em> interface in multiple places in the same file (which isn't very useful), but also in different files (which is very useful).</p>
<p>A common example of this is extending the built-in <code>Window</code> interface. Perhaps you added something on <code>window</code> in your application, and would like to type it:</p>
<pre class="hljs"><code><span class="hljs-keyword">interface</span> Window {
  <span class="hljs-attr">foo</span>: <span class="hljs-built_in">string</span>
}

<span class="hljs-built_in">window</span>.foo <span class="hljs-comment">// strongly typed!</span>
</code></pre>
<p>Another common example is extending an API defined by a third party module. The <a href="https://cypress.io">Cypress</a> test runner ships with a number of useful commands on the <code>cy</code> variable, which is makes available globally. You can also <a href="https://docs.cypress.io/guides/tooling/typescript-support#Types-for-custom-commands">extend it</a>, adding your own strongly typed methods. This makes use of the <code>namespace</code> keyword, which I discuss in another article. In this example we extend the <code>Chainable</code> interface, defining a <code>dataCy</code> method:</p>
<pre class="hljs"><code><span class="hljs-keyword">declare</span> <span class="hljs-keyword">namespace</span> Cypress {
  <span class="hljs-keyword">interface</span> Chainable&lt;Element&gt; {
    <span class="hljs-comment">/**
     * Custom command to select DOM element by data-cy attribute.
     * <span class="hljs-doctag">@example </span>cy.dataCy(&#x27;greeting&#x27;)
     */</span>
    dataCy(value: <span class="hljs-built_in">string</span>): Chainable&lt;Element&gt;
  }
}
</code></pre>
<h2>Under the Hood</h2>
<p>There are also some under-the-hood implications when deciding to use a type alias or an interface. For most people, these won't matter, but it's good to know either way.</p>
<h2>Interfaces Over Intersections</h2>
<p>Microsoft recommends <a href="https://github.com/microsoft/TypeScript/wiki/Performance#preferring-interfaces-over-intersections">interfaces over intersections</a>. This is basically for performance reasons - type intersections are much more complex to evaluate under the hood. They also display a little better in IDEs like VS Code.</p>
<p>Where you can, instead of:</p>
<pre class="hljs"><code><span class="hljs-keyword">type</span> Foo = Bar &amp; Baz &amp; {
    <span class="hljs-attr">someProp</span>: <span class="hljs-built_in">string</span>;
}
</code></pre>
<p>Do this:</p>
<pre class="hljs"><code><span class="hljs-keyword">interface</span> Foo <span class="hljs-keyword">extends</span> Bar, Baz {
    <span class="hljs-attr">someProp</span>: <span class="hljs-built_in">string</span>;
}
</code></pre>
<h2>Prefer Base Types Over Unions</h2>
<p>Another <a href="https://github.com/microsoft/TypeScript/wiki/Performance#preferring-base-types-over-unions">Microsoft recommendation</a>. The example they provide is this:</p>
<pre class="hljs"><code><span class="hljs-keyword">interface</span> WeekdaySchedule {
  <span class="hljs-attr">day</span>: <span class="hljs-string">&#x27;Monday&#x27;</span> | <span class="hljs-string">&#x27;Tuesday&#x27;</span> | <span class="hljs-string">&#x27;Wednesday&#x27;</span> | <span class="hljs-string">&#x27;Thursday&#x27;</span> | <span class="hljs-string">&#x27;Friday&#x27;</span>
  <span class="hljs-attr">wake</span>: Time
  <span class="hljs-attr">startWork</span>: Time
  <span class="hljs-attr">endWork</span>: Time
  <span class="hljs-attr">sleep</span>: Time
}

<span class="hljs-keyword">interface</span> WeekendSchedule {
  <span class="hljs-attr">day</span>: <span class="hljs-string">&#x27;Saturday&#x27;</span> | <span class="hljs-string">&#x27;Sunday&#x27;</span>
  <span class="hljs-attr">wake</span>: Time
  <span class="hljs-attr">familyMeal</span>: Time
  <span class="hljs-attr">sleep</span>: Time
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">printSchedule</span>(<span class="hljs-params">schedule: WeekdaySchedule | WeekendSchedule</span>) </span>{
  <span class="hljs-comment">// ...</span>
}
</code></pre>
<p>This works fine - but <code>WeekdaySchedule</code> and <code>WeekendSchedule</code> are fairly complex types. More complex types will slow down the TypeScript compiler. This has no runtime cost, since you are compiling to typeless JavaScript at the end of the day, but it's nice to keep things as fast and performant as possible, even during development.</p>
<p>An alternative would be to use <code>interface</code> and the <code>extends</code> keyword, like we saw before:</p>
<pre class="hljs"><code><span class="hljs-keyword">interface</span> Schedule {
  <span class="hljs-attr">day</span>: <span class="hljs-string">&#x27;Monday&#x27;</span> | <span class="hljs-string">&#x27;Tuesday&#x27;</span> | <span class="hljs-string">&#x27;Wednesday&#x27;</span> | <span class="hljs-string">&#x27;Thursday&#x27;</span> | <span class="hljs-string">&#x27;Friday&#x27;</span> | <span class="hljs-string">&#x27;Saturday&#x27;</span> | <span class="hljs-string">&#x27;Sunday&#x27;</span>
  <span class="hljs-attr">wake</span>: Time
  <span class="hljs-attr">sleep</span>: Time
}

<span class="hljs-keyword">interface</span> WeekdaySchedule <span class="hljs-keyword">extends</span> Schedule {
  <span class="hljs-attr">day</span>: <span class="hljs-string">&#x27;Monday&#x27;</span> | <span class="hljs-string">&#x27;Tuesday&#x27;</span> | <span class="hljs-string">&#x27;Wednesday&#x27;</span> | <span class="hljs-string">&#x27;Thursday&#x27;</span> | <span class="hljs-string">&#x27;Friday&#x27;</span>
  <span class="hljs-attr">startWork</span>: Time
  <span class="hljs-attr">endWork</span>: Time
}

<span class="hljs-keyword">interface</span> WeekendSchedule <span class="hljs-keyword">extends</span> Schedule {
  <span class="hljs-attr">day</span>: <span class="hljs-string">&#x27;Saturday&#x27;</span> | <span class="hljs-string">&#x27;Sunday&#x27;</span>
  <span class="hljs-attr">familyMeal</span>: Time
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">printSchedule</span>(<span class="hljs-params">schedule: Schedule</span>) </span>{
  <span class="hljs-comment">// ...</span>
}
</code></pre>
<p>This results in a much easier comparison for the TypeScript compiler to execute. The more you know.</p>`

export const style =
`<style>
.article h2 {
  font-size: 24px;
}

p > code {
  background: rgba(243, 244, 246, var(--tw-bg-opacity));
  color: rgb(239, 68, 68);
  padding: 0.1rem 0.2rem;
}
/* Syntax theme */

/* Base16 Atelier Forest Light - Theme */
/* by Bram de Haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/forest) */
/* Original Base16 color scheme by Chris Kempson (https://github.com/chriskempson/base16) */

/* Atelier-Forest Comment */
.hljs-comment,
.hljs-quote {
  color: #766e6b;
}

/* Atelier-Forest Red */
.hljs-variable,
.hljs-template-variable,
.hljs-attribute,
.hljs-tag,
.hljs-name,
.hljs-regexp,
.hljs-link,
.hljs-name,
.hljs-selector-id,
.hljs-selector-class {
  color: #f22c40;
}

/* Atelier-Forest Orange */
.hljs-number,
.hljs-meta,
.hljs-built_in,
.hljs-builtin-name,
.hljs-literal,
.hljs-type,
.hljs-params {
  color: #df5320;
}

/* Atelier-Forest Green */
.hljs-string,
.hljs-symbol,
.hljs-bullet {
  color: #7b9726;
}

/* Atelier-Forest Blue */
.hljs-title,
.hljs-section {
  color: #407ee7;
}

/* Atelier-Forest Purple */
.hljs-keyword,
.hljs-selector-tag {
  color: #6666ea;
}

.hljs {
  display: block;
  overflow-x: auto;
  background: #f1efee;
  color: #68615e;
  padding: 0.5em;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}</style>`