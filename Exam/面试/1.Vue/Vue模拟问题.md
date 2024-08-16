### 模拟问题：

**1.Vue响应式原理是怎么实现的，从面向对象角度谈一谈？**

> （1）Observer类：负责监听数据变化。data对象以及其内部的每个对象都对应一个Observer实例。Observer实例化时通过Object.defineProperty递归地将对象方法设置为访问器方法getter和setter进行拦截。（2）Watcher类：负责依据监听到的数据变化做出响应。每个组件的data对象对应一个Watcher实例。（3）Dep类：负责收集Watcher依赖和通知Watcher数据发生变化。每个Observer实例中都有一个Dep类用于收集Watcher实例。Dep在getter中收集Watcher实例，在setter中通知Watcher实例做出响应。



**2.Vue响应式原理是如何处理数组的？**

>在Array.prototype上加一层原型，继承自Array.prototype，重写（1）push（2）pop（3）shift（4）unshift（5）reverse（6）sort（7）splice方法进行拦截。



**3.Vue2响应式原理有哪些缺陷，有什么解决方案？**

> Vue2响应式实现使用的Object.defineProperty()拦截能力差，不能拦截（1）通过下标修改数组元素（2）修改数组属性，例如array.length（3）添加或删除对象中的属性。Vue2只有针对（3）的解决方案，提供了set和delete方法来响应式添加和删除对象的属性。



**4.对MVVM和MVC的理解？**

> （1）MVVM指Model-View-ViewModel。Model层指组件中的JavaScript数据和逻辑，View层指组件中的模板或视图，ViewModel层指Vue.js框架。这三层的工作模式是：View发生变化时ViewModel自动通知Model更新，Model发生变化时ViewModel自动通知View更新。这样的好处是开发者可以将精力更多地关注Model层数据的变化，而不是操纵DOM。（2）MVC值Model-View-Controller。Model层指数据与逻辑，View层指视图，Controller层指控制器负责两层的通信。这三层的工作模式是：View发生变化时通知Controller选择Model更新，Model发生变化时手动操作DOM使View更新。这样的缺点是开发者除了关注Model层数据的变化外还要关注如何操作DOM更新View。



**5.双向数据绑定通过什么实现？**

> 双向数据绑定是指视图更新时数据自动更新，数据自动更新时视图自动更新。Vue响应式原理已经实现了数据更新时视图更新，视图更新时数据更新可以通过v-model实现。



**6.v-model实现原理是什么？**

> （1）例如v-model作用于input标签，相当于在input上监听input事件，并绑定value属性。当input事件触发时，用新输入的值更新绑定的value。（2）依据此思路，v-model可以作用于自定义组件。



**7.Vue模板编译过程是什么？**

> （1）选定的模板进入解析器，以栈的思想匹配标签，解析成AST，描述了代码的层级关系，AST每个节点描述了标签的内容（2）AST进入代码优化器，标记静态子树，例如纯文本节点，使其在虚拟DOM的Patch算法运行时不会被考虑（3）优化后的AST进入代码生成器，生成代码字符串，代码字符串用于传入渲染函数生成虚拟DOM



**8.Vue模板编译时同时出现el和template该如何选择？**

> （1）判断是否有el属性，有el属性调用$mount(el)挂载并判断是否有template属性。无el属性必须有手动调用$mount(el)挂载（2）判断是否有template属性，有template属性则选择template的模板编译，无template属性则选择el对应的模板编译。



**9.介绍一下Vue的每一个生命周期？**

> （1）beforeCreate周期：Vue实例创建并开始初始化
>
> （2）created周期：Vue实例完成初始化，实现响应式原理，data、props、watch、computed、methods可访问
>
> （3）beforeMount周期：完成模板编译准备开始挂载
>
> （4）mounted周期：挂载完成，可以访问DOM
>
> （5）beforeUpdate周期：更新前，虚拟DOM的patch算法运行完毕，判断出哪些节点要更新
>
> （6）updated周期：更新完毕，视图完成重新渲染
>
> （7）beforeDestroy周期：卸载之前
>
> （8）destroyed周期：卸载结束



**10.介绍一下Vue生命周期发生转变时的动作？**

> （1）beforeCreate->created：设置属性data、computed、watch、methods、props，实现响应式原理
>
> （2）created->beforeMount：模板编译，选择el或template的模板进行编译，生成渲染函数
>
> （3）beforeMount->mounted：模板挂载，生成DOM
>
> （4）mounted->beforeUpdate：更新前后虚拟DOM使用patch算法选择需要更新的节点
>
> （5）beforeUpdate->updated：视图更新渲染
>
> （6）updated->beforeDestroy：调用$destroy()函数
>
> （7）beforeDestroy->destroyed：$destroy()函数执行



**11.父子组件的生命周期是什么样的？**

> （1）创建时，父组件先初始化，然后子组件完成初始化和挂载，父组件再挂载
>
> > 父组件beforeCreate。父组件created。父组件beforeMount
> >
> > 子组件beforeCreate。子组件created。子组件beforeMount。子组件mounted
> >
> > 父组件mounted
>
> （2）更新时，子组件先更新，父组件后更新
>
> > 父组件beforeUpdate
> >
> > 子组件beforeUpdate。子组件updated
> >
> > 父组件updated
>
> （3）销毁时，子组件先销毁，父组件后销毁
>
> > 父组件beforeDestroy
> >
> > 子组件beforeDestroy。子组件destroyed
> >
> > 父组件destroyed



**12.异步请求通常放到哪个生命周期中？**

> 异步请求习惯放在created或mounted周期中。请求data数据的异步请求通常放在created周期中，放在mounted周期中会造成数据显示变慢。请求修改DOM的异步请求通常放在mounted周期中，放在created周期中需要使用Vue.$nextTick进行操作。



**13.Vue.$nextTick是什么，该如何使用？**

> Vue.$nextTick是将指定函数推迟到下次视图渲染之后执行。用法是Vue.$nextTick(function(){})或Vue.$nextTick().then(function(){})。如果想要在Vue生命周期的mounted之前操作DOM可以使用该函数。



**14.computed属性和watch属性的区别？**

> （1）computed计算属性指别人变化影响我，watch指我变化影响别人。
>
> （2）computed计算属性是一个未声明的属性，是一个函数返回计算值。watch监听属性是在data或props中已经存在的属性，是一个对象，handler(newVal, oldVal)函数表示变化时的操作，immediate表示组件第一次加载是否监听，deep表示是否对对象内部属性监听。
>
> （3）computed有缓存机制，参与计算的属性不变时，调用计算属性不会重复计算。watch没有缓存机制，watch表示监听属性变化后做出某种操作，不一定是计算操作，所以没有缓存。
>
> （4）computed不支持异步操作，计算属性函数返回同步值。watch支持异步操作，可以在数据变化后做异步操作。



**15.是否能用methods代替computed计算属性，为什么？**

> 可以用methods代替computed计算某些属性值。但是methods没有缓存机制，当参与计算的数据没有发生改变时多次使用计算值，会多次重复计算，使用computed不会有这种情况。



**16.父子组件通信的方法有哪些？**

> （1）props—$emit通信（2）$parent—$children通信。（3）$refs—ref通信。父组件可以通过$refs访问子组件，在子组件上需要用ref属性标明子组件的名称，父组件通过$refs.名称访问。



**17.兄弟组件通信的方法有哪些？**

> （1）事件总线通信。通过Vue提供的$on和$emit方法实现发布订阅模式，引入一个新的Vue实例作为发布订阅模式控制器。（2）Vuex通信



**18.如何解决爷孙组件通信？**

> （1）$attrs—$listeners通信。$attrs表示父组件绑定在子组件上的所有属性，$listeners表示父组件绑定在子组件上的所有监听器，子组件可以通过这两个属性将绑定内容传给孙子组件，不用再一个个写出绑定属性和绑定方法。（2）provide—inject通信。在父组件上设置provide属性提供哪些数据，在孙子组件上设置inject属性接收。



**19.子组件可以直接改变父组件中的数据吗？**

> 在Vue2中可以但不推荐，在Vue3中不可改变。父子组件应该维护单向数据流，否则数据流向在调试时会难以理解。子组件不应该直接修改props数据来修改父组件中数据。子组件可以通过$emit告知父组件修改props数据，或者使用便捷写法，即父组件在子组件上绑定props时在属性后添加.sync修饰符使子组件可直接修改props数据。



**20.为什么用虚拟DOM**？

> 虚拟DOM是为了解决数据驱动视图模式下的渲染问题。传统DOM操作繁琐，因此诞生了MVVM数据驱动视图的模式，使开发者只关注于数据的变化。在Vue1中采用高细粒度绑定，每个数据都有一个Watcher监听，数据变化后会精确更新DOM，但是Watcher太多效率低。在Vue2中采用中等细粒度绑定，每个组件有一个Watcher监听，数据变化后需要在组件中判断哪些DOM需要更新，而不是重新输出整个组件进行渲染。因此用虚拟DOM来判断组件中哪些节点需要更新。



**21.简述虚拟DOM的Diff算法？**

> （1）新旧虚拟DOM两个节点不同，进行替换。即使它们的子节点都相同，也不进行各层比较。
>
> （2）新旧虚拟DOM两个节点相同，一个有子节点，一个没有子节点。进行子节点添加或删除。
>
> （3）新旧虚拟DOM两个节点相同，都有子节点，进行子节点更新算法。



**22.简述虚拟DOM的优缺点？**

> （1）缺点：在静态页面或变化较少的页面中虚拟DOM速度比原生DOM慢，因为创建虚拟节点时额外的耗时操作。（2）缺点：在DOM操作可预测时，可以精确操纵并优化DOM操作，原生DOM比虚拟DOM更快，不需要虚拟节点创建和虚拟节点对比。（3）优点：在老的没有渲染队列的浏览器中，原生DOM操作会一个个执行，可能有无效渲染。虚拟DOM只关注最终结果进行一次DOM操作。



**23.列表渲染为什么最好加上key属性？**

> Vue会建立key和index的映射。在Diff算法进行子节点更新时，新虚拟DOM子节点可以通过映射在O(1)的时间内找到就虚拟DOM中对应子节点位置进行比较，不再需要循环嵌套寻找对应子节点，这样子节点更新的最坏时间复杂度是O(n)，提高了效率。



**24.条件渲染什么时候要加上key属性？**

> 条件渲染v-if，v-if-else，v-else在切换时Vue不会从头重新渲染元素，会尽可能保留相同部分提高渲染效率。如果不想保留相同部分，则给条件渲染元素绑定key属性，传入不同的值，这样会从头重新渲染。



**25.为什么不建议用列表渲染中的索引值index作为key属性的值？**

> 因为列表项顺序发生变化或列表发生添加删除时，index的值都会变化，建立的映射关系应该是不变的，否则会引起映射错误。这就类似于在数组顺序发生变化或数组元素发生添加删除时仍用index遍历数组会发生错误一样。



**26.了解Vue插槽吗？是做什么用的？**

> （1）插槽是Vue的内容分发机制，父组件将特定内容插入子组件中。
>
> （2）父组件通过template标签描述插入插槽的若干内容，子组件通过slot标签描述插槽。
>
> （3）插槽分为匿名插槽，具名插槽和作用域插槽。匿名插槽是子组件中只有一个slot标签描述插槽。具名插槽是子组件中有多个slot描述插槽，使用时要通过name和v-slot区分。作用域插槽是父组件能访问子组件内容，通过v-bind和v-slot绑定数据访问。



**27.Vue常用事件修饰符有哪些？**

> （1）.stop修饰符表示阻止事件冒泡（2）.prevent修饰符表示阻止原生事件发生但不阻止事件冒泡（3）.capture修饰符表示在事件冒泡前进行事件捕获（4）.self修饰符表示只有在当前元素触发事件才会触发监听器，不受事件冒泡影响。（5）.once修饰符表示多次触发事件只会触发一次回调



**28.mixins和extends是怎么用的？覆盖逻辑是什么样的？**

> （1）mixins和extends表示抽离组件公共逻辑，降低代码耦合度
>
> （2）mixins用法是混入一个数组，数组中有若干对象，每个对象的属性都是Vue实例的属性
>
> （3）extends用法是组合一个对象，对象的属性都是Vue实例的属性
>
> （4）对象属性不是钩子函数时，组件内部属性优先度高，发生冲突时组件内部数据覆盖对象数据。对象属性是钩子函数时，钩子函数会按传入顺序依次执行，最后执行组件内部钩子函数



**29.v-if和v-show的区别是什么？**

> （1）v-if指为true时渲染元素，为false时不渲染元素
>
> （2）v-show指为true时显示元素，为false时不显示元素，通过控制display属性控制是否显示
>
> （3）元素频繁切换时用v-show好，v-if频繁渲染效率低下



**30.v-if和v-for为什么不推荐同时写在一个标签上？**

> （1）v-for优先程度高于v-if。会先创建列表节点，然后依次判断每个节点的v-if来判断是否显示，效率低下。
>
> （2）可以将v-if写在template标签上放在v-for标签的内部或外部解决该问题。



**31.v-html怎么使用？**

> （1）v-html属性绑定数据，作用于某标签，将数据替换该标签的子节点
>
> （2）v-html替换的内容不会经过Vue模板编译
>
> （3）v-html直接插入文档应提防XSS攻击



**32.什么是Vue自定义指令？**

> Vue自定义指令指“自定义可复用的操纵底层DOM的操作”。自定义指令通过directive注册，通过v-自定义指令名使用。编写Vue自定义指令时主要考虑bind，update，inserted钩子函数，分别表示指令绑定到元素时触发，组件虚拟DOM更新时触发，元素插入父元素时触发。



**33.mixins和extends的用法和覆盖逻辑是什么样的？**

> （1）mixins和extends表示抽离组件公共逻辑，降低代码耦合度。
>
> （2）mixins混入一个数组。数组中有若干对象，对象属性都是组件中的属性。
>
> （3）extends组合一个对象。对象属性都是组件中的属性。
>
> （4）如果属性不是钩子函数，那么组件中属性优先度高，发生冲突时优先组件中数据覆盖对象中数据。如果属性是钩子函数，那么按照传入的顺序依次执行，最后执行组件内钩子函数。



**34.组件中的过滤器如何使用？**

> （1）Vue3中取消了过滤器，过滤器通常用于数据格式规范化，用于v-bind或mustache语法
>
> （2）用法是变量后面跟上“| 过滤器函数名”，如何在组件中的filters属性中像设置methods一样设置过滤器函数



**35.template和jsx使用上有何不同？**

> （1）template中的模板需要先进行模板编译，然后将代码字符串传给渲染函数进行渲染。jsx是直接编写代码字符串传给渲染函数，不需要模板编译的流程。（2）template使用直观方便维护，jsx使用贴近底层更加灵活能更好处理交互问题。



**36.了解keep-alive吗？keep-alive如何使用？**

> keep-alive表示缓存组件，使组件切换时不用频繁创建销毁。使用keep-alive后组件生命周期变化，命中组件时触发activated钩子函数，切换组件时触发deactivated钩子函数。keep-alive可以在组件外嵌套，可以在router-view外嵌套，可以在路由配置项中配置。



**37.什么是路由懒加载？**

> 在加载路由配置文件时不引入路由页面的组件，等到使用时再引入，以便于减少文件下载大小。具体写法是component: () => import("") 



**38.路由hash和history模式有什么区别？**

> （1）hash模式和history模式URL不同，hash模式下URL路径之前有一个#，history没有。
>
> （2）hash模式和history模式下URL改变不会发起HTTP请求。
>
> （3）hash模式原理是监听haschange事件，根据hash值变化来切换页面。history模式原理是监听pushstate，popstate事件，使用history相关API，例如pushState来切换页面。
>
> （4）hash模式优点是hash值无效时不会切换页面，history缺点是路径无效时也会切换页面，需要在web服务器配置路径无效时返回特殊页面，或在路由配置项中用path:"*"匹配所有页面，使无效页面返回404。



**39.Vue路由中$route和$router有什么区别？**

> $router是全局路由对象，包含路由配置详细信息，通常调用方法来路由跳转。$route是当前路由对象。



**40.Vue路由跳转方法有哪些？**

> （1）router-link标签跳转（2）$router相关方法跳转，例如push，replace，forward，back，go等



**41.Vue路由传参方法有哪些？**

> （1）params传参。不配置路由信息。传参内容不拼接在URL上，刷新后内容丢失。
>
> （2）params传参。配置路由信息。传参内容拼接在URL上，刷新后内容不丢失。
>
> （2）query传参。不配置路由信息。传参内容以查询拼接在URL上，刷新后传参内容不会丢失。



**42.vue-router跳转和location.href跳转有什么区别？**

> （1）vue-router跳转是修改URL并切换页面，但不发起HTTP请求。
>
> （2）locatio.href跳转是修改URL并切换页面，发起HTTP请求。
>
> （3）history.pushState跳转是修改URL并切换页面，但不发起HTTP请求。



**43.什么是单页路由？**

> 单页路由指的是页面切换不发起HTTP请求，只修改URL。这样的好处是页面切换速度快，前后端分离便于开发。



**44.单页路由大致实现思路？**

> （1）history+pushState方法。pushState和popState方法只修改URL但不发起新的HTTP请求。（2）hash+监听haschange事件。在window上监听haschange事件，当监听到hash变化，那么切换页面。



**45.Vuex中actions和mutations的区别？**

> （1）使用区别：mutations中方法使用commit触发，actions中方法使用dispatch触发，方法内部必须调用commit触发mutations中方法。
>
> （2）同步异步区别：mutations中只支持同步操作来修改state数据，actions中支持异步操作来修改state数据。
>
> （3）执行顺序区别：mutations直接修改state数据，actions想修改state数据必须用commit触发mutations中方法修改state数据。



**46.为什么使用Vuex？**

> 用于解决多个兄弟组件通信问题。例如项目中用户登录信息需要被若干个组件共享。



**47.Vuex有哪些属性？**

> state基本数据，getters基于基本数据计算，mutations同步操作修改基本数据，actions异步操作修改基本数据，modules模块化基本数据集