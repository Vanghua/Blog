注：由于ES6之后的标准变化不大，因此在此将ES6及之后标准发生的变化在此一起总结
# 1.变量声明——let和const
1. **(作用域)** let和const是块级作用域，var是函数作用域
2. **(变量提升)** var声明变量存在变量提升
3. **(暂时性死区)** let和const声明变量存在暂时性死区
4. **(重复声明)** var声明的变量允许重复声明，后声明的变量覆盖先声明的变量，let和const不允许
5. **(全局变量)** var在浏览器全局环境下声明的变量会自动加入全局对象的属性，不可被delete。
6. **(初始值)** var和let不需要设置初始值，const声明变量必须要有初始值
7. **(指针指向)** const的指针不可变，var和let可变


# 2.操作符
### 2.1 扩展运算符
1. **(函数)** 收集剩余形参
2. **(函数)** 展开剩余实参
3. **(数组)** 数组展开(扁平化)
4. **(对象)** 对象迭代(针对可迭代对象)

### 2.2 指数操作符
**操作符代替Math.pow()进行指数运算，具有右结合性。

### 2.3 属性访问操作符
?.操作符是用于对象属性访问。**短路操作，如果对象通过?.访问属性为null或undefined，那么不论属性访问式有多长访问结果立即为undefined。**
```javascript
let a = {
    b: null
}
console.log(a.b?.c.d) // undefined
// ?.左边的a.b为null，那么这个属性访问表达式结果立即返回undefined

console.log(a.b?.().c.d()) // undefined
// 当然在调用方法时也是一样，在调用b()前发现a.b为null，那么访问表达式立即返回undefined
```

### 2.4 缺值合并操作符
??操作符是用于求值。如果??操作符前的值为null或undefined，那么求值表达式的结果将会为??操作符后的值，反之求值表达式的结果将会为??操作符前的值。**短路操作，如果操作符前不是null或undefined，操作符后就不管了。**
```javascript
;(function test(arg) {
    arg = arg ?? 1
    console.log(arg) // 1
    // 由于执行时未给arg传值，arg为undefined，所以函数体第一行arg为1
})();
```

### 2.5 与操作符
&&操作符可用于求值。如果&&操作符前后都是真值，那么返回&&操作符后的真值。否则返回假值。**短路操作，如果操作符前是假值，操作符后就不管了。**
```javascript
console.log(0 && 12) // 0

console.log("dog" && null) // null

// 只有都是真值才会返回操作符后的结果
console.log("Danny" && 27) // 27
```

### 2.6 或操作符
||操作符可用于求值。如果||操作符前后都是假值，那么返回||操作符后的假值。否则返回真值。**短路操作，如果操作符前是真值，操作符后就不管了。**
```javascript
console.log(undefined || "Danny") // Danny

console.log("Danny" || undefined) // Danny

// 只有都是假值才会返回操作符后的结果
console.log(undefined || null) // null
```

# 3.赋值语句——解构
解构提供了一种更好地提取数据的方式
### 3.1 数组解构
```javascript
let [a, b, c] = [1, 2, 3] // a = 1, b = 2, c = 3
```
数组解构是按照数组下标来提取值

### 3.2 对象解构
```javascript
let obj = {
    name: "Danny",
    gender: "man"
}
// ES6增强型对象写法
let { name, gender } = obj
// 对象解构普通写法，属性值用于存储提取出来的数据，属性名要和原对象属性名相同
let { name: name2, gender: gender2 } = obj
```
对象解构是按照属性名来提取值

### 3.3 解构应用
1. 从深层嵌套的对象中提取数据   
**应用场景是对象属性中嵌套对象，想要提取深层嵌套中的某个数据，可以使用对象解构**
```javascript
let obj = {
    event: {
        target: {
            result: "Danny"
        }
    }
}
let { event: { target: { result } } } = obj
console.log(result)
```

2. 当函数参数过多时进行函数参数解构   
**应用场景是函数参数过多，记得住参数叫什么，但记不清参数的顺序，可以使用对象结构**
```javascript
// 线性回归的核心迭代函数，参数比较多，可能记不清顺序
function linearRegression({theta, Y, X, alpha = 0.5, iter =10000}) {
    // 略
}

let theta = []
let X = []
let Y = []

// 调用时只需要直到有哪些参数即可，不需要考虑它们的顺序
linearRegression({theta: theta, X: X, Y: Y})
```
# 4.数值
### 4.1 数值方法
1. 将parseInt()和parseFloat()和isNaN()方法除了可以全局调用也可以通过Number对象调用

### 4.2 BigInt类型
1. **(数据类型)** BigInt也是JavaScript数据类型，至此共有8种基础数据类型。


2. **(数值范围)** IEEE754 64位标准表示的最大精度整数是16位，使用BigInt可以表示更大的数，在chrome测试最大能到10** 10 ** 9(10的10亿次方)，理论上是无限大的。


3. **(使用)** 可以使用BigInt工厂函数或者数值后面加上一个n来表示BigInt类型

### 4.3 Math方法
增加的Math方法一般用不到

# 5.字符串
### 5.1 模板字符串
模板字符串允许在字符串中插入动态的值，可以是JavaScript语句。这属于模板语法，模板语法不在此过多介绍，面试题总结基本从未涉及。

### 5.2 字符串新增方法
1. includes()方法：用于判断子串是否存在
```javascript
let s = "123Danny"
console.log(s.includes("Danny")) // true
```
2. startsWith()方法：用于判断字符串开头是否是目标子串
```javascript
let s = "123Danny"
console.log(s.startsWith("Danny")) // false
```
3. endsWidth()方法：用于判断字符串结尾是否是目标子串
```javascript
let s = "123Danny"
console.log(s.endsWith("Danny")) // true
```
4. padStart()方法：用于在字符串左侧填充符号，使字符串长度变成参数指定的长度
```javascript
let s = "123Danny"
console.log(s.padStart(20, " ")) //             123Danny
```
5. padEnd()方法：用于在字符串右侧填充符号，使字符串长度变成参数指定的长度
```javascript
let s = "123Danny"
console.log(s.padEnd(20, " ") + 1) // 123Danny            1
```
6. trimStart()方法：用于去除字符串左侧的空格
```javascript
let s = "123Danny"
console.log(s = s.padStart(20, " ")) //             123Danny
console.log(s = s.trimStart()) // 123Danny
```
7. trimEnd()方法：用于去除字符串右侧的空格
```javascript
let s = "123Danny"
console.log(s = s.padEnd(20, " "), s.length) // 20
console.log(s = s.trimEnd(), s.length) // 8
```
8. matchAll()方法：用于正则表达式分组

# 6.符号
### 6.1 创建符号
1. 使用Symbol()工厂函数创建 **(Symbol不像其它类型，Symbol只能作为工厂函数，不能作为构造函数)**，传入字符串作为参数，返回一个符号值，即使每次传入相同字符串，也会返回不同的符号。


2. 使用Symbol.for()方法创建，传入字符串作为参数，如果传入相同字符串，那么返回相同的符号值。

### 6.2 迭代器协议
[Symbol.iterator]方法和[Symbol.asyncIterator]方法用于实现迭代器和异步迭代器

### 6.3 对象方法
1. [Symbol.toStringTag]方法用于改变对象调用toString方法的返回值，**必须是get方法**
```javascript
let stu = {
    name: "Danny"
}
console.log(stu.toString()) // [object Object]

class Test {
    constructor() {}
    get [Symbol.toStringTag]() {
        return "Test"
    }
}
let test = new Test()
console.log(test.toString()) // [object Test]
```

2. [Symbol.hasInstance]方法用于扩展instanceof操作符(右侧必须是构造函数)使用范围，使得那些没有构造函数的对象也可以使用该操作符。
```javascript
// 不要给函数添加这个方法，只适用于非函数对象
function Student(name, gender) {
    let object = new Object()
    object.name = name
    object.gender = gender
    return object
}
Student[Symbol.hasInstance] = function(obj) {
    console.log(obj)
    return "name" in obj && "gender" in obj ? true : false
}

let student = Student("Danny", "man")
console.log(student instanceof Student) // false，这个在工厂函数中使用不起作用

// 正确示范，在对象中使用
let grade = {
    [Symbol.hasInstance](grade) {
        return grade >= 0 && grade <= 100 ? true : false
    }
}
console.log(98 instanceof grade) //true
```
3. 其它的符号方法更不常用了，这里就列举两个

# 7.对象
### 7.1 对象属性增强写法
1. 可以在对象字面量中只使用属性名
2. 可以通过[]来访问属性

### 7.2 支持类
详情见“面向对象编程”中继承中关于类的介绍

### 7.3 for in和 for of 和 for await
1. for in 是JavaScript本来就有的枚举方法   
   **(1)用来枚举对象的可枚举属性**  
   **(2)与Object.keys相比，同样不可以枚举Symbol属性，可以枚举继承属性**
```javascript
let stu = {
    name: "Danny",
    gender: "man",
    grade: 100,
    changeName(name) {
        this.name = name
    }
}
// 枚举出所有属性(上述属性都是可枚举的)，枚举有特殊顺序
for(let el in stu)
    console.log(el)
// 该对象不是可迭代对象，枚举会报错
for(let el of stu)
    console.log(el)
```

2. for of 是ES6新增的枚举方法     
   **(1)用来按照迭代器协议枚举可迭代对象**
```javascript
function* generator(n) {
    let a = 0, b = 1
    while(a < n) {
        yield a;
        [a, b] = [b, a + b]
    }
}
let fib = generator(100)
for(let el of fib)
    console.log(el)
```

3. for await 是ES6以后新增的枚举方法   
   **(1)是按照迭代器协议枚举可枚举对象，在给循环变量赋值时都会加上一个await**
```javascript
// 实现一个异步迭代器
function asyncIterator(ar) {
    let index = 0, length = ar.length
    return {
       [Symbol.asyncIterator]() {
           return this
       },
       next() {
           if(index === length)
               return new Promise(resolve => {
                   resolve({done: true, value: undefined})
               })
           else {
               if (ar[index] instanceof Promise)
                   return new Promise((resolve, reject) => {
                       ar[index ++].then(res => {
                           resolve({done: false, value: res})
                       }, error => {
                           reject(error)
                       })
                   })
               else
                   return new Promise(resolve => {
                       resolve({done: false, value: ar[index ++]})
                   })
           }
       }
   }
}

// 创建测试数据
let p1 = new Promise(res => {
    setTimeout(() => {
        res("p1")
    }, 3000)
}), p2 = new Promise(res => {
    setTimeout(() => {
        res("p2")
    }, 2000)
});

(async function () {
    // 使用for await迭代异步迭代器
    for await(let p of asyncIterator([p1, p2]))
        console.log(p);

    // 手动迭代异步迭代器
    (function autoMaker(asyncIter) {
        let result = asyncIter.next();
        (function next(result) {
            result.then(res => {
                if(res.done !== true) {
                    console.log(res.value)
                    result = asyncIter.next()
                    next(result)
                }
            })
        })(result);
    })(asyncIterator([p1, p2]));
})();
```

### 7.4 对象方法
只在ES6的文档中就扩展了不少新的对象方法，这里列举一下常用的。   
**注：虽然像Object.freeze和Object.seal这些方法也很有用，但是这里先不总结。Object.freeze可以配合Vue使用提高性能，等用到的时候再做总结。**
1. Object.is(value1, value2) 用于判断两个值是否相等。
> 判断规则:
>1. 类型转换不同于===和==，不会对value1和value2做强制类型转换。
>2. null和undefined不同于===和==，都为null或都为undefined时为true
>3. 字符串判断同===和==，字面相同即为true
>4. 数值判断不同于===和==，NaN和NaN为true，+0和-0为true
>5. 对象判断不同于===和==，指向同一个堆内存的对象为true

2. Object.assign(target, ...args) 用于对象合并，效果和扩展操作符一样
> 合并规则：
>1. target是目标对象，args都是来源对象，将来源对象的可枚举属性都复制到target上面，如果出现覆盖现象，那么按顺序覆盖。
>2. "Object.assign"和"扩展操作符+对象字面量"来合并对象，都是浅复制，不会复制堆内存。

# 8.数组
### 8.1 数组新方法
1. Array.from(iterator) 工厂方法，可以将一个可迭代对象展开，转换成一个数组
    ```javascript
    // 斐波那契数列迭代器
    function generator(n) {
        let a = 0, b = 1
        return {
            [Symbol.iterator]() {
                return this
            },
            next() {
                let temp = a
                if(temp <= n ) {
                    [a, b] = [b, a + b]
                    return {done: false, value: temp}
                }
                else
                    return { done: true, value: undefined }
            }
        }
    }
    // 得到一个1000以内的斐波那契数列数组
    console.log(Array.from(generator(1000))) 
    ```
2. Array.isArray(obj) 工厂方法，判断传入的参数是否是数组


3. Array.of(...args) 工厂方法，传入任意多个元素，成为数组的成员。在Array构造函数中，如果只传入一个元素，那么会设定为数组长度，Array.of()解决了这个问题。 


4. array.findIndex() 新增了数组元素搜索方法，搜不到返回-1，否则返回满足条件的元素的位置。此方法比indexOf方法更加灵活，这种方法可以说是高阶函数，允许自己编程。
    ```javascript
    // 制造100个位于-50~+50之间的随机数
    let ar = []
    for(let i = 0; i < 100; i ++)
        ar[i] = (Math.random() - 0.5) * 100
    
    // 寻找第一个大于60的数的下标
    let index = ar.findIndex((el, index, array) => {
        return el > 30
    },this)
    console.log(index)
    ```
   
5. array.find() 新增了数组元素搜索方法，搜不到返回undefined，否则返回满足条件的元素的值。
    ```javascript
    // 制造100个位于-50~+50之间的随机数
    let ar = []
    for(let i = 0; i < 100; i ++)
        ar[i] = (Math.random() - 0.5) * 100
    
    // 寻找第一个大于60的数的值
    let el = ar.find((el, index, array) => {
        return el > 30
    },this)
    console.log(el)
    ```
6. array.flat(depth) 新增了数组扁平化方法。可以设置扁平的层数。这个方法返回一个新数组，不修改原数组。
    ```javascript
    let ar = [1, [2, [3, [4, [5]]]]]
    console.log(ar.flat(1), ar) // [ 1, 2, [ 3, [ 4, [Array] ] ] ] [ 1, [ 2, [ 3, [Array] ] ] ]
    console.log(ar.flat(2), ar) // [ 1, 2, 3, [ 4, [ 5 ] ] ] [ 1, [ 2, [ 3, [Array] ] ] ]
    console.log(ar.flat(3), ar) // [ 1, 2, 3, 4, [ 5 ] ] [ 1, [ 2, [ 3, [Array] ] ] ]
    console.log(ar.flat(4), ar) // [ 1, 2, 3, 4, 5 ] [ 1, [ 2, [ 3, [Array] ] ] ]
    ```
7. array.flatMap() 新增了数组扁平化映射方法。默认扁平化一层。这个方法会先进行map映射，最后再进行数组扁平化。这个方法返回一个新数组，不修改原数组。
    ```javascript
    // 使用flatMap方法比map方法更高效，除了能扁平化，还能实现filter的效果。
    let ar = [1, , , 2, , 3, [], 4, , [], , , 5]
    console.log(ar.flatMap((el, index, array) => {
        return el ? el : []
    }, this)) // [ 1, 2, 3, 4, 5 ]
    ```
8. array.fill(value, start, end) 新增了数组填充方法。从起始位置到终点位置填充value值(左闭右开的区间)。这个方法不返回一个新数组，会修改原数组。
    ```javascript
    let ar = new Array(10)
    ar.fill(12, 0, 9)
    console.log(ar) // [ 12, 12, 12, 12, 12, 12, 12, 12, 12, <1 empty item> ]
    ```
9. array.includes(el) 新增了数组的元素存在方法。这个方法相比下面“12”中介绍的集合的测试元素是否存在方法低效很多。
    ```javascript
    let ar = new Array(10)
    ar.fill(12, 0, 9)
    console.log(ar.includes(11), ar.includes(12)) // false true
    ```


# 9.函数
### 9.1 箭头函数
详情见“JavaScript解释器和编译器”中JavaScript运行时执行上下文创建时关于this绑定的问题

### 9.2 函数支持形参赋默认值
注意一下形参赋默认值实际是在执行上下文的词法环境中赋的值，不是在变量环境中赋值。详情见“JavaScript解释器和编译器”中JavaScript运行时执行上下文创建时的词法环境和语法环境，以及提供的例题。

### 9.3 尾调用
详情见“函数式编程”中尾调用

# 10.异步编程
### 10.1 Promise
详情见“JavaScript异步编程”中的Promise

### 10.2 迭代器和生成器
详情见“JavaScript异步编程”中的迭代器和生成器

### 10.3 async和await和异步迭代器
详情见“JavaScript异步编程”中的async和await

# 11.代理和反射
### 11.1 理解反射对象
反射对象是Reflect，它类似于Map定义了一些映射关系。Reflect的方法直接映射到操作对象的方法上。举例如下：
1. Reflect.ownKeys(Object) 直接映射到对象属性访问，访问对象所有属性
2. Reflect.has(Object, name) 直接映射到in操作符，相当于name in Object的操作

### 11.2 理解对象代理
```let p = new Proxy(target, handler)```

|对象类型|意义|作用|
|---|---|---|
|代理对象|Proxy构造函数的实例化对象，指的是p|目标对象的代理人，用户发起的对目标对象的操作都交给代理对象处理。代理对象接收到操作请求后会交给处理器对象。|
|目标对象|一个普通对象，指的是target|目标对象不希望暴露出去，指派代理对象作为代理人。|
|处理器对象|一个普通对象，指的是handler|目标对象的操作人，处理器对象有自己的处理函数命名规范，用来处理对象操作，例如set用于设置对象属性，get用于获取对象属性，也可以调用反射对象方法将操作返回给目标对象执行。|

### 11.3 保护引用
对象代理中可以创建一个可撤销代理，当需要把对象交给第三方库时，可以给对象创建一个透明包装(处理器对象为空对象)，并且这个包装是可撤销的，一使用完第三方库就立即撤销代理，第三方库无法访问目标对象。
```javascript
// 一个涉及到学生成绩隐私的对象
let stu = {
    name: "Danny",
    grade: [98, 96, 96, 91, 91, 97, 94]
}

// 一个不受信赖的第三方函数
function unSafeFunc(stuInfo) {
    console.log(stuInfo)
}

// 创建可撤销代理
let { proxy, revoke } = Proxy.revocable(stu, {})

// 第三方函数操作，此时第三方函数中可以操作该对象
unSafeFunc(proxy)

// 撤销代理，proxy代理对象不能再代理目标对象stu，就是proxy不能再操作stu
revoke()

// 第三方函数再次尝试操作，发现不能操作该对象，直接报错
unSafeFunc(proxy)
```
### 11.4 隐藏属性
在3.5的示例中如果想保护学生隐私，不想让成绩被别发现，那么可以在处理器对象中设置拦截，在has函数和get函数中判断如果出现grade属性相关操作，那么一律拦截。
```javascript
has(target, name) {
    if(name === "grade")
        return false
    return Reflect.has(target, name)
}

get(target, name, receiver) {
    if(name === "grade")
        return undefined
    return Reflect.get(target, name, receiver)
}
```

### 11.5 记录操作
对代理对象的操作会先交付给处理器对象，如果在处理器对象中设置监听操作，那么就可以记录这些针对目标对象的操作。
```javascript
let stu = {
    name: "Danny",
    grade: [98, 96, 96, 91, 91, 97, 94]
}

let handler = {
    get(target, name, receiver) {
        console.log(`监听到访问对象${name}属性的操作`)
        return Reflect.get(target, name, receiver)
    },
    set(target, name, value, receiver) {
        console.log(`监听到修改对象${name}属性值为${value}的操作`)
        return Reflect.set(target, name, value, receiver)
    },
    has(target, name) {
        console.log(`监听到查询对象是否存在${name}属性的操作`)
        return Reflect.has(target, name)
    }
}

let proxy = new Proxy(stu, handler)

proxy.name = "Lucy"
console.log(proxy.name)
console.log("grade" in proxy)
```

### 11.6 类型验证
可以利用3.4中提到的拦截机制来提供JavaScript中不具备的自动类型检查功能。类型检查不用写在类中，提高了代码的简洁性。
```javascript
class Student {
    constructor(name, gender) {
        this.name = name
        this.gender = gender
    }
}

let StudentProxy = new Proxy(Student, {
    construct(target, args, newTarget) {
        if(typeof args[0] !== "string")
            throw new TypeError("姓名必须是字符串")
        if(typeof args[1] !== "string" || (args[1] !== "男" && args[1] !== "女"))
            throw new TypeError("性别必须是男或女")
        return Reflect.construct(target, args, newTarget)
    }
})

// 由于man不符合处理器对象第二条规范，所以会抛出错误
let stu = new StudentProxy("Danny", "man")
```

### 11.7 数据绑定
可以利用3.4中提到的拦截机制来进行数据绑定，把两个本来不相关的数据绑定在一起。下面实现了每创建一个学生就会自动被加入学生列表的操作。
```javascript
let stuList = []

class Student {
    constructor(name, gender) {
        this.name = name
        this.gender = gender
    }
}

let StudentProxy = new Proxy(Student, {
    construct(target, argArray, newTarget) {
        let stu = Reflect.construct(target, argArray, newTarget)
        stuList.push(stu)
        return stu
    }
})

let stu = new StudentProxy("Danny", "man")
console.log(stuList)
```

|运用方向|应用场景|
|---|---|
|保护目标对象|3.3 保护引用|
|保护目标对象|3.4 隐藏属性|
|提高代码封装性|3.5 记录操作|
|提高代码封装性|3.6 类型验证|
|提高代码封装性|3.7 数据绑定|

# 12.集合和映射
## 12.1 Map
### 12.1.1 Map和Object的对比
|情况|Map|Object|
|---|---|---|
|意外的键|Map默认情况下不包含键|默认情况下Object包含原型链上的键，可能会被自身的键覆盖|
|键的顺序|枚举时Map的键的顺序是插入顺序|枚举时Object的键有特殊顺序|
|键的类型|Map的键可以是任意类型|Object的键只能是Symbol或者String|
|迭代性|Map可迭代|Object只有写迭代器才可以迭代|
|性能优化|1.可以快速通过size属性获取键值数量 2.对频繁增删查改键值做出优化|未作出优化|

### 12.1.2 如果没有Map如何模拟一个Map
根据“12.1”中提到的Map和Object的对比，可以考虑用Object来模拟一个Map。实际上就是指定一个特殊的映射，可以使用hash算法，也可以借助Symbol.for()来完成，将键进行序列化后传入Symbol.for()得到一个符号，一定和传入其它字符串产生的Symbol不同。

### 12.1.3 Map方法介绍
基础方法：
1. set(key, value) 设置键和值
2. get(key) 通过键获取值
3. delete(key) 根据键删除某个键值
4. has(key ) 判断是否有键
5. clear() 清空所有键值

迭代器方法：
1. keys() 返回键构成的数组
2. values() 返回值构成的数组
3. entries() 返回键和值构成的数组
4. forEach() 类似数组的遍历方法
5. size 返回Map键值对的个数

### 12.1.4 WeakMap和Map的对比
|情况|Map|WeakMap|
|---|---|---|
|键的要求|原始类型或者引用类型|必须是引用类型|
|垃圾回收|Map中的值如果是引用类型，相当于对该堆内存又添加了一个引用，不管是标记清理还是引用计数都无法释放该堆内存|WeakMap中的值是引用类型，但是不会影响该堆内存被垃圾回收|
|迭代性|可迭代|由于值随时会被垃圾回收，所以不可迭代|

### 12.1.5 WeakMap方法介绍
1. set(key, value) 添加一个键值对
2. has(key) 判断是否有键
3. delete(key) 删除一个键值对
3. get(key) 获取一个键对应的值

## 12.2 Set
### 12.2.1 Set和Array的对比
|情况|Set|Array|
|---|---|---|
|顺序性|元素插入Set的顺序|有数值索引顺序|
|重复性|不允许元素重复|允许元素重复|
|迭代性|可迭代|可迭代|
|索引|无索引|有索引|
|性能优化|1.对检查是否存在某一个元素做了优化|相比Set没什么优化|

### 12.2.2 如果没有Set如何模拟一个Array
上述提到的Array来模拟，实际上可以对Array增加一些检查机制，可以通过对象代理来实现，来实现Set对于元素的严格要求。之后对元素检查做一个O(lgn)的优化。

### 12.2.3 Set方法介绍
基础方法：
1. add(el) 给集合添加一个元素
2. has(el) 判断集合中是否存在一个元素
3. delete(el) 删除集合中的一个元素
4. clear() 清空集合

迭代器方法：
1. forEach 类似数组的遍历方法
2. size 返回集合元素个数

# 13.模块化

## 13.1 CommonJS规范
### 13.1.1 CommonJS的实现机制
**1. 模块加载器机制：** 为了实现CommonJS，NodeJS或webpack会实现一个模块加载器，用于实现下列两种机制。模块加载器的部分代码如下举例。

**2. 包裹机制：** 实现CommonJS模块化需要在模块被创建时在外面包裹一个闭包

```javascript
// 下面是模拟实现，Module类控制模块，调用Module.wrap方法，传入你的代码后就会自动对你的代码进行包装
Module.wrapper = [
    // 可以看到CommonJS要求为每个模块额外提供5个全局变量
   '(function (exports, require, module, __dirname, __filename) {', '})'
]

Module.wrap = script => {
   return `${Module.wrapper[0]}${script}${Module.wrapper[1]}`
}
```

**3. 同步加载机制：** 实现CommonJS模块化需要实现重要的模块加载机制。加载机制可以简述为以下几个步骤：  
**(1)** 解析路径    
**(2)** 调用底层的C++提供的IO模块**同步**读取文件   
**(3)** 创建模块对象，创建时会实现上面的包裹机制    
**(4)** 将模块对象加入自定义的缓存对象存储，提高多次调用时的效率    
**(5)** 返回该模块暴露出来的module.exports对象
```javascript
// 模拟实现的核心代码
// 实现模块加载的函数
function req (filename) {
    //1.我们需要一个绝对路径来，缓存是根据绝对路径的来的
    filename =  Module.resolvePathName(filename)
    if(!filename) return new Error('not find file')
    
    //判断是否有缓存，有的话返回缓存对象
    let cacheModule = Module._cache[filename]
    if(cacheModule) return cacheModule

    // 2,没有模块 创建模块
    let module = new Module(filename) //创建模块

    //3.加载这个模块{filename: 'c:xx', exports: 'hello world'}
    module.load(filename) // 这里不过多列举load方法，感兴趣可以再到网上了解
    
    //4.把加载好的模块加入缓存
    Module._cache[filename] = module
    return module.exports
}

// 实现路径解析的函数
Module.resolvePathName = filename => {
   // 1.拿到路径,进行解析绝对路径
   let p = path.resolve(__dirname, filename)
   //2.判断路径里是路径还是文件名,如果是文件名的话查找文件
   if(!path.extname(p)) {
      //4.如果有文件名,则确定是一个文件,开始
      for(var i =0, arr = Module._extentions, len = arr.length; i < len; i++) {
         let newPath = `${p}${arr[i]}`
         //如果访问的文件不存在， 就会发生异常
         try {
            fs.accessSync(newPath)
            return newPath
         } catch(e) {}
      }
   } else {
      // 3.如果没有文件名,则进行模块化加载:查找同名文件夹下的package.json || index.js
      // 这里没有做处理,只是做了防止报错
      try {
         fs.accessSync(p)
         return p
      } catch(e) {}
   }
}
```

### 13.1.2 CommonJS全局对象介绍
1. require(filename) 表示加载某一个模块，加载规则如下
   * 路径规则：自定义模块必须使用相对路径或者绝对路径。如果只写文件名，表示是内置模块
   * 文件名规则：文件名的js可以省略
   
2. exports 表示一个对module.exports的引用，即module.exports === exports为true。模块在导出时导出的是module.exports的栈内存地址，而不是exports的栈内存地址。**这就让人想到了在“原型链”中总结到的原型的动态性，实例化对象的__proto__指针和构造函数的prototype指针与这里的module.exports指针和exports指针的情况有些相似的地方。** 这里也可以举出很多例子来。
   
   

   **举例一： 修改module.exports的堆内存**
   ```javascript
   // A.js
   console.log(require("./B.js")) // msg，name，gender都会输出
   
   // B.js
   module.exports.msg = "hello"
   exports.name = "Danny"
   exports.gender = "man"
   ```
   **举例二：重写module.exports的堆内存**
   ```javascript
   // A.js
   console.log(require("./B.js")) // 只会输出msg
   
   // B.js
   // module.exports的堆内存被重写了，即新开辟了堆内存。下面exports仍然在旧的堆内存上修改，这些修改不会作用到最后的结果上去。
   module.exports = {
       msg: "hello"
   }
   exports.name = "Danny"
   exports.gender = "man"
   ```
   
3. module 该对象主要使用module.exports进行模块内容导出，使用module.exports导出的内容会被其它引用它的模块接收(可以参考13.1.1中提到的模块加载机制)


4. __dirname 表示当前文件所在的文件夹的绝对路径


5. __filename 表示当前文件所在的绝对路径，包含文件名

### 13.1.3 CommonJS的使用
NodeJS实现了CommonJS规范，可以直接使用上述提到的所有机制。在客户端中不能直接使用CommonJS规范，需要借助webpack等打包工具实现上述机制。

## 13.2 AMD规范
### 13.2.1 AMD的实现机制
AMD的实现机制和CommonJS的实现机制大同小异，也分为以下三点。

**1. 模块加载器机制：** 与CommonJS类似，可以在github中找到对应的实现(require.js)

**2. 包裹机制：** moduleName表示当前模块的名称，不写moduleName会成为匿名模块，文件名为模块名。requireModules表示要异步引入的模块的名称，这些模块的工厂函数返回值将会作为当前模块的全局变量。function是一个工厂函数，工厂函数是需要返回内容，这个返回的内容将会被引用该模块的模块接收到，在下面例子中提到工厂函数也可以模仿CommonJS的动态加载机制。
```javascript
// requireModules也可以是require和modules等等，这样就可以在AMD规范中实现一个CommonJS规范的风格
define(moduleName, [...requireModules], function(...requireModules) {
    return {
        msg: "hello"
    }
})
```

**3. 异步加载机制：** 与CommonJS类似，只不过换成了异步加载

### 13.2.2 AMD与CommonJS的相同与不同
**1. 不同点：** AMD是“异步加载机制”更关注于客户端JavaScript，CommonJS在上面提到是“同步加载机制”更关注于服务端JavaScript。 

**2. 相同点：** CommonJS是NodeJS的默认模块机制，如果想在NodeJS使用AMD需要通过npm或yarn安装。CommonJS和AMD都是使用了“模块加载器”机制。

## 13.3 CMD规范
### 13.3.1 CMD规范的实现机制
CMD的实现机制和AMD和CommonJS实现大同小异，也分为以下三点。

**1. 模块加载器机制：** 与CommonJS类似，可以在github中找到对应的实现(sea.js)

**2. 包裹机制：** 包裹机制和AMD太相似了，但是CMD默认为你提供了一个CommonJS风格的模块。CMD虽然可以像AMD一样在模块创建时在第二个参数写依赖模块，但是提供的CommonJS风格的模块还是希望你使用动态模块加载机制，使用require在用到模块时再加载。
```javascript
define(moduleName, [...requireModules], function(require, exports, module) {
    return {
        msg: "hello"
    }
})
```

**3. 加载机制：** 可以在第二个参数中写依赖的模块，就像模仿AMD规范一样，也可以使用CommonJS风格，动态加载模块。

## 13.4 UMD规范
### 13.4.1 UMD规范的实现
UMD规范主要是为了整合上述规范。实现思路是，模块创建时会自动检测define，module的类型情况，以此来判断该使用哪一种模块。

## 13.5 ES6模块规范
### 13.5.1 ES6模块机制的使用
注：起始ES6的模块机制的export和import有很多种有意思的用法，这里仅列举出常用的，不涉及一些组合用法。
1. 导出export：
   * export 后跟{}，大括号中写要一次性导出的多个变量。这很像ES6增强的对象写法，实际上这不是对象。
   * export 后跟变量，表示一次导出一个变量。
   * export default 后跟变量。export default一个模块中只能有一个，export可以有多个。
   
2. 导入import：
   * import {} from 'filename'。大括号中填写export导出的变量名，要保持一致。filename必须带上js，必须使用绝对路径或者相对路径，否则会被当做内置模块。
   * import 自定义名称 from 'filename'。如果是接收export default的导出，需要自定义一个名称。

### 13.5.2 ES6模块机制和CommonJS模块机制的区别
1. **CommonJS模块输出的是值的拷贝，ES6模块输出的是值的引用，是只读的。** 当被引用的模块中的变量发生变化时，CommonJS规范下导出的该变量不会变化，ES6规范下导出的该变量会变化。因为只读的特性，ES6模块输出值的栈内存不可更改，堆内存可以更改，CommonJS则是都可以修改。
>CommonJS模块输出测试
> ```javascript
> // test.js
> let {a} = require("./server.js")
> console.log(a)      // 1
> setTimeout(() => {
>     console.log(a)  // 1
> }, 3000)
>
> // server.js
> let a = 1
> setTimeout(() => {
>    a = 3
> }, 2000)
> exports.a = a
> ```
> ES6模块测试
> ```javascript
> // test.js
> import {a} from "./server.js"
> console.log(a)
> setTimeout(() => {
>     console.log(a)
> }, 3000)
>
> // server.js
> let a = 1
> setTimeout(() => {
>    a = 3
> }, 2000)
> export { a }
> ```

2. **CommonJS是运行时加载，ES6是编译时加载。**   
> **CommonJS：** CommonJS模块是对象。在遇到require时，会加载整个模块。模块导出值集中到module.exports暴露出去。
>
> **ES6：** ES6模块不是对象。在遇到import时会去找导出的变量，而不是加载整个模块。export+{}表示显示输出代码，而不是将变量集中到某个变量中去。