> 参考：
>
> <<深入浅出Vue.js>> 第二章 Object的变化侦测
>
> Vue2.x和Vue3.x官网关于<<深入响应式原理>>的介绍
>
> <<JavaScript权威指南(第七版)>>



### 1.追踪对象变化的方法

#### Vue2.x

在组件创建时，Vue2.x系列使用了Object.defineProperty来给组件中的data的每个属性设置为访问器属性。

**效果是：访问器属性拥有setter，可以探测到属性值的修改**

**缺点是：访问器属性具有局限性，无法探测属性的增加或删除。下面是缺点导致的后果---参考Vue2.x官网<<深入响应式原理>>**

(1) 嵌套对象添加响应式 property需要调用Vue特殊方法

使用```Vue.$set(anyObject, property, value)```或```Vue.$delete```

```javascript
let school = {
    name: "SDU",
    province: "Shan Dong"
}

// Vue组件中的data
data() {
	return {
        name: "Danny",
        school: school
    }
}

// 此变化无法被访问器属性探测
school.city = "Ji Nan"

// 需要调用Vue.$set方法
this.$set(this.school, "city", "Ji Nan")
```

(2 ) Vue 不允许动态添加根级别的响应式 property

不允许在data上添加或删除属性

```javascript
let school = {
    name: "SDU",
    province: "Shan Dong"
}

// Vue组件中的data
data() {
	return {
        name: "Danny",
        school: school
    }
}

// 给data添加一个新的属性，这是不允许的
this.gender = "male"
```



#### Vue3.x

Vue3.x使用了ES6的proxy来探测对象的变化，详情可参考Vue3.x官网<<深入响应性原理>>

**效果是：使用对象代理和对象反射可以探测到对象的所有变化，解决了Vue2.x中的响应式缺陷。**



### 2.通知模板变化的方法

注：在<<深入浅出Vue>>中这里为“收集依赖的方法”

#### 2.1 订阅发布模式

在追踪到对象的改变后，Vue需要通知到所有依赖这些对象的位置（通常指的是Vue模板template），说明对象已经发生改变。这实际上是订阅发布模式的简化版。在这里先了解并实现一个简单的订阅发布模式。参考：https://segmentfault.com/a/1190000019260857

**订阅发布模式的设计**

1. 订阅发布模式关注“订阅过程”，“发布过程”

> 实现订阅过程和发布过程需要有一个中间人。订阅者将订阅信息提交给中间人，中间人记录下来；发布者把发布信息发布给中间人，中间人查找订阅给类型信息的订阅者，将发布信息依次发送给订阅者

2. 订阅发布模式需要的数据结构如下：

​	用简易代码表示：

```javascript
// eventType(n)存储第n种事件对应的消息通知队列，队列中存储着订阅者提供的通知函数，执行该通知函数就可通知对应的订阅者
eventType1 = [() => {}, () => {}, ..., () => {}]
eventType2 = [() => {}, () => {}, ..., () => {}]
eventType3 = [() => {}, () => {}, ..., () => {}]
...
eventTypen = [() => {}, () => {}, ..., () => {}]

// eventList存储所有可能的事件类型，每种事件类型都指向一个消息通知队列
eventList = {
    eventType1,
    eventType2,
    eventType3,
    ...
    eventTypen
}
```

​	用内存图表示：

![](assests/eventEmitter.PNG)

**订阅发布模式的代码：(JavaScript实现)**

```javascript
class EventEmitter{
    constructor() {
        // 事件类型对象，存储各种不同事件的通知函数队列
        this.eventList = {}
    }

    // 订阅函数
    on(eventType, notifyFunc) {
        // 如果存在该类型事件，那么直接在其订阅者队列中添加一个通知函数。否则先创建订阅者队列，之后再添加通知函数。
        (this.eventList[eventType] || (this.eventList[eventType] = [])).push(notifyFunc)
    }

    // 发布函数
    emit(eventType, ...content) {
        // 发布时，先找到该类型事件，然后执行每个订阅者的通知函数，把信息通知给这些订阅者
        this.eventList[eventType] && this.eventList[eventType].forEach(notifyFunc => notifyFunc.call(this, ...content))
    }

    // 只订阅一次
    once(eventType, notifyFunc) {
        let that = this
        // 创建一个新函数on，包装订阅者的通知函数notifyFunc
        function on(content) {
            // 当通知订阅者时，执行订阅者传来的通知函数
            notifyFunc.call(that, content)
            // 把新函数on取消订阅
            this.off(eventType, on)
        }
        // 把新函数on放入通知队列，代替  订阅者的通知函数notifyFunc
        this.on(eventType, on)
    }

    // 取消订阅
    off(eventType, notifyFunc) {
        let notifyQueue = this.eventList[eventType]
        // 取消订阅时，先判断是否存在这种事件，再判断该事件的通知队列中是否存在该通知函数
        if(notifyQueue && notifyQueue.includes(notifyFunc))
            // 存在这种函数时则删除通知队列中所有该通知函数
            for(let i = 0; i < notifyQueue.length;)
                if(notifyQueue[i] === notifyFunc)
                    notifyQueue.splice(i, 1)
                else i ++
    }
}
```

**测试订阅发布模式**

```javascript
// 创建一个“订阅发布模式”对象
let eventEmitter = new EventEmitter()

// 1.测试基础的订阅事件，假设三个同学订阅了“开学事件”
eventEmitter.on("开学", console.log)
eventEmitter.on("开学", console.log)
eventEmitter.on("开学", console.log)
// 1秒后发布“开学事件”，发布信息是开学时间
setTimeout(() => {
    eventEmitter.emit("开学", "2022/2/20")
}, 1000)


// 2.测试取消订阅
eventEmitter.on("放假", console.log)
eventEmitter.on("放假", console.log)
eventEmitter.off("放假", console.log)
// 1秒后发布“放假事件”，发布信息是放假时间
setTimeout(() => {
    eventEmitter.emit("放假", "放假时间是2022/1/8")
}, 1000)


// 3.测试只订阅一次
eventEmitter.once("社会实践", console.log)
// 1秒后发布“社会实践事件”，发布信息是社会实践时间
setTimeout(() => {
    eventEmitter.emit("社会实践", "社会实践时间是2022/1至2022/3")
}, 1000)
// 2秒后再次发布“社会实践事件”，发布信息是修改后的信息，理论上订阅一次是接收不到此次发布的信息的
setTimeout(() => {
    eventEmitter.emit("社会实践", "社会实践时间延长至2022/4")
}, 2000)

// 4.测试发布一个不存在的事件
eventEmitter.emit("放假", "2022/1/8")

// 5.测试取消订阅一个不存在的事件
eventEmitter.off("玩电脑", console.log)

// 测试结果如下
// 2022/2/20
// 2022/2/20
// 2022/2/20
// 社会实践时间是2022/1至2022/3
```



#### 2.2 基于订阅发布模式实现Vue的响应式原理

**注意：**

下述代码思路参考<<深入浅出Vue.js>>，减少了原文中代码的封装性，提高了一些可读性



**1.下述代码想要模拟的场景是：**

创建一个新的Vue实例，Vue在底层将Vue实例中的data的属性全部设置为访问器属性，检测数据变化。声明一个变量，赋值为data中的某个属性，模拟Vue模板中使用数据绑定。最后改变data中的属性值，观察结果。



**2.下述代码在何处使用订阅发布模式：(实现思路)**

在将Vue实例中的data的属性设为访问器属性时使用订阅发布模式。访问器get方法中进行订阅，传入一个通知函数，该通知函数能够通知Vue模板中所有绑定该变量的位置，该变量值发生变化。访问器set方法中进行发布，当属性值变化时，发布事件，触发通知函数，通知模板中绑定该变量的位置要更新变量值。



**3.下述代码的前提条件：**

下述代码将data的属性全部设置为访问器属性，默认是在Vue2.x环境下。如果想模拟Vue3.x环境，可将其自行换为Proxy。

在下述代码中会使用上文已经实现的EventEmitter类，虽然Vue2.x默认不在ES6环境下，没有类的概念，但是方便起见不要计较。

```javascript
// 假设window.target是如下的通知函数
globalThis.target = function(key, val, newVal) {
    console.log(key + "属性发生了改变，由" + val + "变为了" + newVal)
    // 下面的代码省略，是通知Vue模板中使用该变量的位置，该变量值发生了改变，需要更新
}

// 将某个属性设置为访问器属性，以做到对属性变化的检测
function defineReactive(data, key, val) {
    // 不为所有情况创建一个全局的EventEmitter对象的原因是：eventType的表示不方便，两个对象有同名属性时需要考虑对对象进行哈希运算，否则会出现两个对象使用同一个eventType。
    // 这里牺牲空间复杂度降低时间复杂度。
    const eventEmitter = new EventEmitter()
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        // 注意这里不要使用get()增强型写法，Vue2.x的Object.defineProperty方法在设计时不是在ES6环境，否则直接使用proxy对象完成对象探测
        get: function() {
            // 这里假设一个不存在的window.target属性为通知函数，真正的Vue的通知函数要复杂，这里使用window.target代指之。
            if(globalThis.target)
                // 这里的eventType随便命名即可，订阅时传入通知函数
                eventEmitter.on("change", globalThis.target)
            return val
        },
        set: function(newVal) {
            if(val === newVal)
                return
            // 当属性值发生改变时，先更新属性值，然后发布更新信息
            eventEmitter.emit("change", key, val, newVal)
            val = newVal
        }
    })
}

// 传入一个对象，使它每个属性变成访问器属性
function makeResponsive(data) {
    // 简便期间，这里不对data做额外的类型检查，只是检查data是数组还是非数组非函数的普通对象
    if(data instanceof Array) {
        // data是数组，遍历data的每一个属性
        data.forEach(property => {
            // 如果该属性值是非函数的引用类型，那么需要递归使它每个属性变成响应式
            if(data[property] && (typeof data[property] !== "function" && data[property] instanceof Object)) {
                defineReactive(data, property, data[property])
                makeResponsive(data[property])
                // 注意defineReactive(data, property, data[property])，不能统一写在if之前，因为if中的data[property]相当于调用了get方法，这不是我们希望的
            } else defineReactive(data, property, data[property])
        })
    } else Object.keys(data).forEach(property => {
        // data是对象的情况同上
        if(data[property] && (typeof data[property] !== "function" && data[property] instanceof Object)) {
            defineReactive(data, property, data[property])
            makeResponsive(data[property])
        } else defineReactive(data, property, data[property])
    })
}
```

**4.测试上述代码**

```javascript
// 测试响应式原理
// 下面的data对象模拟Vue中的data
let data = {
    name: "Danny",
    gender: "male",
    school: {
        name: "SDU",
        grade: [1, 2, 3],
        location: {
            province: "Shandong",
            city: "WeiHai"
        }
    }
}

// 将data对象的属性全部变为访问器属性
makeResponsive(data)

// 模拟Vue模板中使用data中的数据
let gender = data.gender
// data中的数据发生变化，将会通知模板中使用该变量的位置。此处使用let模拟模板，无法改变let声明的变量的值，理解意思即可。
data.gender = "female"

// 模拟Vue模板中使用data中的数据
let schoolName = data.school.name
// data中的数据发生变化，将会通知模板中使用该变量的位置。此处使用let模拟模板，无法改变let声明的变量的值，理解意思即可。
data.school.name = "PKU"

// 预计输出结果，输出原因是通知函数
// gender属性发生了改变，由male变为了female
// name属性发生了改变，由SDU变为了PKU
```



#### 2.3 Vue响应式原理实现vm.$watch

**注意：**

在Vue官网中关于vm.$watch的介绍比较简略，但是不影响理解它的含义。在<<深入浅出Vue.js>>中主要在第四章介绍vm.$watch，但是第二章也有所涉及。



**1.回顾：**

在2.2中实现了基础的Vue响应式原理，主要是考虑了两个方面：1.如何追踪对象的变化——使用访问器属性 2.如何将对象的变化通知给模板——使用订阅发布模式。



**2.vm.$watch：**

但是在实际的Vue响应式实现中考虑了更灵活的应用场景，用户应也可以监听对象的变化。Vue提供了更高封装程度的vm.$watch代替访问器属性，让用户更容易监听对象变化。使用```vm.$watch(property, callback)```的效果是，当指定的Vue实例的data中的property发生变化后，会执行callback函数。



**3.vm.$watch的实现：**

下述代码实现了Watcher类，效果和vm.$watch大致相同，使用方法不同。但效果都是能够让用户监听到对象的变化。将下述代码和2.2中实现的代码结合即可。

```javascript
class Watcher {
    // expOrFn为属性表达式，详情参见Vue官网关于vm.$watch的使用，expOrFn对应其第一个参数。在这里的实现中vm指的是Vue实例的data对象。
    constructor(vm, expOrFn, callback) {
        this.vm = vm
        this.expOrFn = expOrFn
        this.callback = callback
        this.value = this.get()
    }

    get() {
        globalThis.target = (key, val, newVal) => {
            this.callback.call(this.vm, val, newVal)
            this.value = this.get()
        }

        // 访问data.expOrFn对应的属性，此时会触发访问器属性get，get中会加入globalThis.target，此时的globalThis.target已经修改成了用户希望的回调函数
        let value = Watcher.parsePath(this.expOrFn).call(this, this.vm)

        // 将globalThis.target还原，上文globalThis的值就如下
        globalThis.target = function(key, val, newVal) {
            console.log(key + "属性发生了改变，由" + val + "变为了" + newVal)
            // 下面的代码省略，是通知Vue模板中使用该变量的位置，该变量值发生了改变，需要更新
        }
        return value
    }

    // 解析传入的属性expOrFn，比如"a.b.c"，结果是obj.a.b.c
    static parsePath(expOrFn) {
        let segments = expOrFn.split(".")
        return function(obj) {
            for(let i = 0; i < segments.length; i ++)
                if(!obj)
                    return
                else
                    obj = obj[segments[i]]
            return obj
        }
    }
}
```

**4.代码测试：**

在将上述代码和2.1,2.2的代码结合后做下述测试

```javascript
// 测试响应式原理中的vm.$watch
// 下面的data对象模拟Vue中的data
let data = {
    name: "Danny",
    gender: "male",
    school: {
        name: "SDU",
        grade: [1, 2, 3],
        location: {
            province: "Shandong",
            city: "WeiHai"
        }
    }
}

// 将data对象的属性全部变为访问器属性
makeResponsive(data)

// 使用Watcher对象使得用户可以监听到对象的变化
new Watcher(data, "school.name", function(val, newVal) {
    console.log("使用watcher监听到了对象的变化","老属性值是" + val, "新属性值是" + newVal)
})

// 对象发生变化
data.school.name = "PKU"

// 预计输出结果
// 使用watcher监听到了对象的变化 老属性值是SDU 新属性值是PKU
```



### 3.Vue响应式是异步更新DOM

在Vue官网中介绍<<深入响应式原理>>时提到Vue的DOM更新是异步的，如果想在DOM更新后执行某些回电函数，那么需要使用Vue.$nextTick()。



这里有些困惑，在本人另一篇博客“浏览器事件”中提到了浏览器更新DOM的时机。根据WhatWG官方文档介绍，浏览器先执行task(就是通常讲的宏任务，只不过第一个task是JavaScript同步代码)，之后执行microtask，再之后才进行DOM更新。因此我猜想Vue.$nextTick()的实现会用到宏任务，这样会在DOM更新后执行回调。但是在查阅了源码（在node_modules/vue/src/core中）后发现实现中可以使用微任务也可以使用宏任务。在参考了https://segmentfault.com/q/1010000039973370后，本人推测应该与Vue的虚拟DOM有关。此问题将在完成虚拟DOM学习后再详细考虑。
