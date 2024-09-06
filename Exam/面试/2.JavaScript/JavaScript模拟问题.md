### 1.数据类型

#### 数据类型列举

> 八种基本类型：Number，String，Boolean，BigInt，Symbol，Undefined，Null，Object

#### 数据类型检测

> **typeof**
>
> > * null被判断为object
> > * 函数被判断为function。
>
> **instanceOf**
>
> > * 左值不是对象则为false
> > * 右值不为类则报错
>
> **constructor**
>
> > constructor通过构造函数判断有构造函数的类型。
>
> **Object.prototype.toString.call().slice(8, -1)**
>
> > * 自定义类型可以用[Symbol.toStringTag]修改返回值。

#### 数据类型区别

> **null和undefined区别**
>
> **类型：** null和undefined都是原始类型，这两个原始类型下都只各有一个值null和undefined。
>
> **语义：** null是JavaScript保留字。undefined不是保留字，可以用作变量名，可以通过void 后跟任何值安全获得undefined值。
>
> **语义：** ull表示一个空对象，只有栈内存没有堆内存。undefined表示变量已声明但未赋值。
>
> **类型判断：** 第一版JavaScript规定了存储数据的低三位用于类型判断，对象和null低三位都是0，在使用typeof时null会被误判为对象。undefined不会出现这种问题。
>
> **类型判断：** 使用宽松相等判断null==undefined时会返回true，使用严格相等时会返回false。

#### 数据类型转换

> 



#### 运算符优先级

> **从低到高**
>
> 1. 逗号
>
> 2. 赋值运算
>
> 3. 条件三目运算
>
> 4. 逻辑或和空值合并运算
>
> 5. 逻辑与运算
> 5. 按位或运算
> 5. 按位异或预算
> 5. 按位与预算
> 5. 相等运算
> 5. 比较运算（in，instanceOf）
> 5. 位移运算
> 5. 加减运算
> 5. 乘除模运算
> 5. 幂运算
> 5. 一元运算（await，delete，void）
>
> **逗号最低别忘掉，赋值运算也重要。**
> **条件三目看仔细，逻辑或来空值并。**
> **逻辑与后位运算，或异与来要分明。**
> **相等比较别混淆，ins实例也要清。**
> **位移加减心中留，乘除模来不可丢。**
> **幂运一元最高级，await删空要牢记。**



### 2.对象

#### this指向

> **this指向确定：**
>
> 运行时词法环境确定时确定this指向。
>
> 非严格模式this默认指向全局对象；严格模式this默认指向undefined。
>
> **this指向改变：**
>
> 三种改变this指向的方法，按改变this的优先程度是：
>
> （1）构造函数调用
>
> （2）call，apply，bind调用
>
> （3）对象方法调用
>
> **this指向继承：**
>
> 箭头函数this继承自所在函数或全局作用域。

#### new实现内容

> （1）创建一个空对象
>
> （2）绑定构造函数的this指向该对象
>
> （3）绑定该对象的prototype指向构造函数的原型
>
> （4）判断构造函数返回值类型，如果是引用类型则返回引用类型，如果是基本类型则返回该对象

#### ES5模拟继承

> **按迭代顺序来看：**
>
> **1.ES5前—原型链模式：**
>
> > **实现：**
> >
> > 原型调用父类构造函数。
> >
> > **缺点：**
> >
> > * **共享引用：** 所有子类实例都共享父类实例的属性。
> >
> > * **无法传参：** 调用父类构造函数时不能根据子类实例特性传参。
>
> **2.ES5前—盗用构造函数模式：**
>
> > **实现：**
> >
> > 构造函数中调用父类构造函数。
> >
> > **缺点：**
> >
> > * **无法继承方法：** 子类实例可以继承父类属性，无法继承父类方法。
>
> **3.ES5前—组合模式：**
>
> > **实现：**
> >
> > 构造函数中调用父类构造函数。原型调用父类构造函数。
> >
> > **缺点：**
> >
> > * **浪费空间：** 父类属性存储两遍，一次在子类实例，一次在原型。
>
> **4.ES5前—寄生组合模式：**
>
> > **实现：**
> >
> > 原型不调用父类构造函数。中间类的原型指向父类原型。子类原型为中间类实例。
> >
> > **优化：** 
> >
> > 优化了原型调用两次父类构造函数的问题。
>
> **5.ES5—原型模式：**
>
> > **实现：**
> >
> > 调用Object.create
> >
> > **缺点：**
> >
> > * **共享引用：** 所有实例共享一个对象上的属性。
> > * **无法复用方法：** 每次实例化要重新声明方法。
>
> **6.ES5—寄生模式：**
>
> > **实现：**
> >
> > 调用Object.create，之后再扩展新属性。
> >
> > **缺点：** 
> >
> > 缺点同上

#### arguments用法

> **含义：**
>
> > **表示—类数组：**
> >
> > 可迭代类数组对象。
> >
> > **表示—函数实参：**
> >
> > arguments表示函数的实参，length表示函数的形参。
> >
> > 注意：不写形参不影响arguments接收实参。
> >
> > **表示—函数引用：**
> >
> > arguments.callee指向当前函数，深拷贝函数时处理递归可以使用该属性。
> >
> > 注意：严格模式下无法接收callee。
>
> **副作用：**
>
> > **副作用—特殊参数：**
> >
> > arguments非严格模式下无法追踪“解构，初始值，剩余参数”相关实参。

#### 类数组对象

> **含义：**
>
> > 拥有length和index索引的对象。例如：
> >
> > * String
> > * 函数内部的arguments
> > * NodeList和HTMLCollection
>
> **转换到数组：**
>
> > * Array.from
> > * 通过原型调用Array上的方法

#### NodeList和HTMLCollection区别

> **获取方法：**
>
> > **NodeList新方法：**
> >
> > * HTMLElement.querySelector相关方法
> > * HTMLElement.childNodes
> >
> > **HTMLCollection旧方法：**
> >
> > * HTMLElement.getElementBy相关方法
> > * HTMLElement.children
>
> **动态和静态：**
>
> > NodeList动态，HTMLCollection静态。NodeList可以实时反应DOM元素变化。

#### 函数深拷贝

> **必要性**
>
> > 没必要深拷贝
> >
> > * **主流库效果：** lodash深拷贝不包括函数。
> > * **共享引用：** 深拷贝是避免修改堆内存时影响全局，一般不修改函数的属性。
> > * **跨窗口通信：** iframe之间或者worker之间通信一般使用MessageChannel，一般不序列化函数。
>
> **实现方式**
>
> > * **识别函数体：** 识别普通函数，箭头函数，ES6增强写法的函数。传入new Function。
> > * **替换递归调用：** 递归调用替换为arguments.callee调用。

#### Object.assign

> 

#### 自有属性和可枚举属性

> **可枚举属性：**
>
> > * **enumerable：** enumerable设置为true。
> > * **可枚举操作：** 可以出现在可枚举操作中，例如for in，Object.keys，展开语法等等。
>
> **自有属性：**
>
> > * **原型链：** 自己的非原型链继承的属性。
> > * **自有属性操作：** hasOwnProperty。



### 3.闭包/作用域/执行上下文

#### 闭包

> **含义：**
>
> > 函数和声明时的词法环境绑定，即用函数声明时的作用域和函数内部变量解析函数的机制是闭包机制。
>
> **应用：**
>
> > **访问函数内部变量：**
> >
> > 函数返回一个函数，使外部可以通过返回值访问函数内部变量。
> >
> > **持久存储：**
> >
> > 函数返回一个函数，引用函数内部变量。
> >
> > **作用域隔离：**
> >
> > 函数嵌套一个函数，嵌套函数作为模块，内部声明变量，被嵌套函数执行逻辑。

#### 闭包内存泄漏

> **原因：**
>
> > 函数中返回的函数引用了函数内部的对象，导致内存无法被释放。
>
> **解决：**
>
> > （1）不使用时主动设置对象为null。
> >
> > （2）如果使用对象的某些属性，就直接用栈内存拷贝，不引用整个堆内存。

#### 节流防抖

> **节流：**
>
> >**概念：**
> >
> >X秒内最多执行一次。
> >
> >**应用：**
> >
> >搜索框搜索；表单提交；按钮点击。
>
> **防抖：**
>
> >**概念：**
> >
> >上一次调用后延迟X秒执行。
> >
> >**应用：**
> >
> >滚动事件；窗口大小变化。

#### 作用域

> 全局作用域
>
> 函数作用域
>
> 局部作用域
>
> eval作用域

#### 作用域链

> 



### 4.ES6

#### let和const区别

> **初始值**
>
> const声明变量必须赋初始值。
>
> **栈内存不可变**
>
> const声明变量栈内存指针不能修改。

#### let/const和var区别

> **作用域**
>
> let/const是块级作用域，var是函数作用域。
>
> **重复声明**
>
> var声明的变量可以重复声明，后声明的覆盖先声明的。let/const声明的变量不能重复声明。
>
> **变量提升和暂时性死区**
>
> var声明的变量在声明前可以使用，但是值为undefined。let/const声明的变量在声明前不能使用。

#### 箭头函数和普通函数区别

> **prototype，arguments，super**
>
> 没有prototype，arguments，super。特例是ES6对象增强型方法也没有prototype。
>
> **this指向**
>
> this继承自所在函数或全局作用域。

#### 展开和剩余语法使用场景

> **展开语法**
>
> > **描述函数实参**
> >
> > * **要求：** 只能展开可迭代对象
> >
> > **构造数组或对象字面量**
> >
> > * **数组：** 只能展开可迭代对象
> > * **对象：** 复制可枚举属性
>
> **剩余语法**
>
> > **描述函数形参**
> >
> > * **解构：** 用于解构数组或对象，收集参数到数组或对象

#### 迭代器和生成器

> 



### 5.代码实现

#### instanceOf

> ```javascript
> function _instanceOf(left, right) {
>   // 1.校验左值
>   if (!(left && (typeof left === "object" || typeof left === "function"))) {
>     return false;
>   }
>   // 2.校验右值
>   if (!(typeof right === "function")) {
>     throw new Error("必须是构造函数");
>   }
> 
>   let prototype = Object.getPrototypeOf(left);
>   while (prototype) {
>     if (prototype === right.prototype) {
>       return true;
>     } else {
>       prototype = Object.getPrototypeOf(prototype);
>     }
>   }
>   return false;
> }
> ```

#### curry

> ```javascript
> const curry = (func) => {
>   return (...args) => {
>     if (args.length >= func.length) {
>       return func(...args);
>     } else {
>       return curry(func.bind(null, ...args));
>     }
>   };
> };
> ```

#### new

> ```javascript
> function _new(constructor, ...args) {
>   // 1.创建空对象
>   const target = {};
>   // 2.绑定this
>   const result = constructor.call(target, ...args);
>   const object = typeof result === "object" && result ? result : target;
>   // 3.绑定prototype
>   Object.setPrototypeOf(object, constructor.prototype);
>   // 4.返回this或新对象
>   return object;
> }
> ```

#### bind和call

> **call**
>
> ```javascript
> Function.prototype._call = function (context, ...args) {
>   let contextObj;
>   // 1.格式化上下文
>   if (context === null || context === void 0) {
>     contextObj = globalThis;
>   } else if (typeof context !== "object" && typeof context !== "function") {
>     contextObj = Objec(context);
>   } else {
>     contextObj = context;
>   }
>   // 2.上下文定义方法
>   const propName = Symbol("");
>   Object.defineProperty(contextObj, propName, {
>     value: this,
>   });
>   // 3.上下文调用函数
>   contextObj[propName](...args);
>   delete contextObj[propName];
> };
> ```
>
> **bind**
>
> ```javascript
> Function.prototype._bind = function (context, ...args) {
>   return (...rest) => {
>     return this.call(context, ...args, ...rest);
>   };
> };
> ```

#### ES5模拟类

> **组合模式**
>
> ```javascript
> function Student(school, grade) {
>   this.school = school;
>   this.grade = grade;
> }
> 
> Student.prototype.getSchool = function () {
>   return this.school;
> };
> Student.prototype.getGrade = function () {
>   return this.grade;
> };
> ```

#### ES5模拟继承

> **组合模式**
>
> ```javascript
> function Person(name, gender) {
>   this.name = name;
>   this.gender = gender;
> }
> 
> Person.prototype.getName = function () {
>   return this.name;
> };
> Person.prototype.getGender = function () {
>   return this.gender;
> };
> 
> function Student({ name, gender, school, grade }) {
>   // 1.盗用构造函数
>   Person.call(this, name, gender);
>   this.school = school;
>   this.grade = grade;
> }
> // 2.原型继承
> Student.prototype = new Person();
> Student.prototype.getSchool = function () {
>   return this.school;
> };
> Student.prototype.getGrade = function () {
>   return this.grade;
> };
> ```
>
> **寄生组合模式**
>
> ```javascript
> function inherit(Father, Son) {
>   // 3.通过中间类实例访问原型
>   function F() {}
>   F.prototype = Father.prototype;
>   const prototype = new F();
>   prototype.constructor = Son;
>   return prototype;
> }
> 
> function Person(name, gender) {
>   this.name = name;
>   this.gender = gender;
> }
> 
> Person.prototype.getName = function () {
>   return this.name;
> };
> Person.prototype.getGender = function () {
>   return this.gender;
> };
> 
> function Student({ name, gender, school, grade }) {
>   // 1.盗用构造函数
>   Person.call(this, name, gender);
>   this.school = school;
>   this.grade = grade;
> }
> // 2.原型寄生
> Student.prototype = inherit(Person, Student);
> Student.prototype.getSchool = function () {
>   return this.school;
> };
> Student.prototype.getGrade = function () {
>   return this.grade;
> };
> ```

#### 深拷贝

> ```javascript
>  const cloneDeep = (target) => {
>       const wm = new WeakMap();
> 
>       const clone = (target) => {
>         if (!(target && typeof target === "object")) {
>           return target;
>         }
> 
>         if (wm.has(target)) {
>           return wm.get(target);
>         }
> 
>         let result = null;
>         if (Array.isArray(target)) {
>           result = [];
>         } else {
>           result = {};
>         }
> 		// 注意：记录的是当前对象target被拷贝为了新对象result
>         wm.set(target, result);
> 
>         Object.entries(target).forEach(([key, value]) => {
>           if (value && typeof value === "object") {
>             result[key] = clone(value);
>           } else {
>             result[key] = value;
>           }
>         });
> 
>         return result;
>       };
> 
>       return clone(target);
>     };
> ```

#### 数组打平

> ```javascript
> const flatArray = (arr, depth = 1) => {
>   const result = [];
>   (Array.isArray(arr) ? arr : []).forEach((el) => {
>     if (Array.isArray(el) && depth >= 1) {
>       result.push(...flatArray(el, depth - 1));
>     } else {
>       result.push(el);
>     }
>   });
>   return result;
> };
> ```

#### 数组去重

> **场景1：只有数值：**
>
> > ```javascript
> > // 1.辅助对象实现去重。返回的是字符串
> > const filterByObj = (arr) => {
> >   return Object.keys(
> >     arr.reduce((target, el) => {
> >       target[el] = true;
> >       return target;
> >     }, {})
> >   );
> > };
> > 
> > // 2.辅助数组实现去重。
> > const filterByArr = (arr) => {
> >   const result = [];
> >   return arr.filter((el) => {
> >     if (result.includes(el)) {
> >       return false;
> >     } else {
> >       result.push(el);
> >       return true;
> >     }
> >   });
> > };
> > 
> > // 3.集合实现去重
> > const filterBySet = (arr) => {
> >   return Array.from(new Set(arr));
> > };
> > ```
>
> **场景2：对象属性相同也视为相同：**
>
> > ```javascript
> > const isObject = (item) => {
> >   return item && (typeof item === "object" || typeof item === "function");
> > };
> > 
> > // 核心判断：两个对象是否每个属性相等
> > const isEqual = (valueA, valueB) => {
> >   if (isObject(valueA) && isObject(valueB)) {
> >     // 1.判断：键数量相等
> >     if (Object.keys(valueA).length !== Object.keys(valueB).length) {
> >       return false;
> >     } else {
> >       // 2.判断：每个键值判断相等性
> >       return Object.keys(valueA).every((key) => {
> >         if (isObject(valueA[key]) && isObject(valueB[key])) {
> >           return isEqual(valueA[key], valueB[key]);
> >         } else {
> >           return valueA[key] === valueB[key];
> >         }
> >       });
> >     }
> >   } else {
> >     return Object.is(valueA, valueB);
> >   }
> > };
> > 
> > const filter = (arr) => {
> >   const result = [];
> >   return arr.filter((el) => {
> >     if (result.find((item) => isEqual(item, el))) {
> >       return false;
> >     } else {
> >       result.push(el);
> >       return true;
> >     }
> >   });
> > };
> > ```

#### 节流防抖

> **节流**
>
> ```javascript
> const throttle = function (func, wait) {
>      let now = 0;
>      return function (...args) {
>        if (Date.now() - now - wait >= 0) {
>          func(...args);
>          now = Date.now();
>        }
>      };
>    };
>    ```
>    
>   **防抖**
>    
>    ```javascript
>    const debounce = function (func, wait) {
>     let timeId = null;
>      return function (...args) {
>        timeId && clearTimeout(timeId);
>        timeId = setTimeout(() => func(...args), wait);
>      };
>    };
>    ```

#### 并发控制

> ```javascript
> // 注意：并发控制只需要维护：1.等待进行的任务。2.正在进行的任务（数）
> const multiControl = (tasks, maxNum) => {
>   let taskNum = 0;
>   const pendingQueue = [];
> 
>   const run = async (task) => {
>     if (taskNum < maxNum) {
>       taskNum++;
>       await task();
>       taskNum--;
>       const nextTask = pendingQueue.shift();
>       nextTask && run(nextTask);
>     } else {
>       pendingQueue.push(task);
>     }
>   };
> 
>   tasks.forEach(run);
> };
> ```

#### 重传控制

> ```javascript
> // 注意1：并发控制只需要维护：1.等待进行的任务。2.正在进行的任务（数）
> // 注意2：重传控制只需要维护：在并发控制上添加一个重传函数
> const execControl = (tasks, maxNum, retryNum) => {
>   let taskNum = 0;
>   const pendingQueue = [];
> 
>   const run = async (task) => {
>     if (taskNum < maxNum) {
>       taskNum++;
>       try {
>         await task();
>         taskNum--;
>       } catch {
>         taskNum--;
>         return Promise.reject();
>       }
>       const nextTask = pendingQueue.shift();
>       nextTask && run(nextTask);
>     } else {
>       pendingQueue.push(task);
>     }
>   };
> 
>   const retryRun = async (task, tryTime) => {
>     return run(task).catch(() => {
>       return tryTime > 0 ? retryRun(task, tryTime - 1) : Promise.reject();
>     });
>   };
> 
>   tasks.forEach((task) => retryRun(task, retryNum));
> };
> ```





**26.Map和Object的区别是什么？**

> （1）Map中默认不包含键，Object中默认包含原型链上的键
>
> （2）Map中键可以是任意类型，Object中键只能是String或Symbol类型
>
> （3）Map中的键是依据插入顺序的，Object中的键无序
>
> （4）Map中键的个数可以用size获取，Object中的键的个数不能直接获取。
>
> （5）Map是可迭代对象，Object必须有迭代器协议才能迭代。
>
> （6）Map对频繁增删键值对情景有优化，Object对频繁增删键值对情景无优化



**28.Map和WeakMap的区别？**

> （1）Map中键可以是任意类型，WeakMap中键只能是引用类型
>
> （2）Map中键值对是强引用，如果键是对象，Map外不再引用时不能被回收。WeakMap中键值对是弱引用，WeakMap外不再引用时，可以被垃圾回收。



**29.对前后端交换信息的JSON的理解？**

> （1）JSON是一种基于文本的轻量级数据交换格式，也是JavaScript语法的子集。
>
> （2）JSON中字符串都要求使用双引号，非字符串有true，false，null，数值。
>
> （3）JSON通常表示成数组或对象的形式。



**30.对JavaScript内置对象JSON的理解？**

> （1）JSON对象负责JavaScript对象和JSON格式对象的转换。stringify函数表示将JavaScript对象转换为JSON格式对象的字符串形式。parse函数表示将JSON格式对象的字符串形式转换为JavaScript对象。
>
> （2）JSON可以用来做对象深拷贝，但是无法深拷贝JavaScript内置对象和循环引用，但是可以给stringify传一个处理函数，复制属性时用WeakMap记录，如果某个键已经存在，则不再拷贝，用于解决循环引用问题。



**31.JavaScript脚本延迟加载的方法有哪些？**

> （1）defer属性：script标签会在html解析完成后再执行，不阻塞html解析。
>
> （2）async属性：async属性必须添加http请求的URL，表示该脚本异步请求，不阻塞html解析。
>
> （3）动态创建DOM：监听DOMContentLoaded事件，html加载完成后动态插入script标签。
>
> （4）宏任务队列：可以将脚本内容放入setTimeout中等html解析完后执行。
>
> （5）放置到文档底部：将script标签放到文档底部，不阻塞html解析。



**34.说一说数组常用原生方法？**

> （1）归并方法：reduce(归并函数，初始值)。
>
> （2）首尾操作方法：push，pop，shift，unshift
>
> （3）查找方法：indexOf，lastIndexOf，includes，find，findIndex
>
> （4）排序方法：sort，reverse
>
> （5）扁平化方法：flat，flatMap
>
> （6）截取方法：slice
>
> （7）拼接方法：concat
>
> （8）增删元素方法：splice
>
> （9）字符串方法：toString，join
>
> （10）迭代方法：forEach，map，filter，every，some



**35.知道数组slice方法吗，怎么使用？**

> （1）slice是数组截取函数。
>
> （2）slice接收两个参数
>
> * 第一个参数表示开始截取位置，闭区间。
> * 第二个参数表示截取结束位置，开区间。不传第二个参数默认截取到数组尾部。第二个参数可以为负数，表示从数组尾部向前的位置。
>
> （3）slice返回一个新数组。



**36.知道数组splice方法吗，怎么使用？**

> （1）splice是数组添加删除函数。
>
> （2）splice可以接收两个参数
>
> * 第一个参数表示开始删除位置。如果值不合法，例如负值或超出数组长度的值，那么会默认取当前数组最后一个元素。
> * 第二个参数表示从这个位置开始删除多少个元素，为0时表示不删除元素。
> * 第三个和后续参数表示删除完后再添加若干元素。
>
> （3）splice修改原数组。



**37.数组方法map和filter方法有什么区别？**

> （1）返回值不同。map的处理函数依据原数组元素返回一个新值。filter的处理函数以及数组元素返回true或false。
>
> （2）返回数组长度不同。map返回一个新数组和原数组长度相同，对每个元素都做了映射。filter返回一个新数组和原数组长度不一定相同，filter不会处理undefined元素，会抛弃返回值为false的元素。



**38.数组扁平化怎么实现？**

> 数组扁平化函数flat返回一个新数组。设计递归实现数组扁平化，递归函数参数是数组和扁平次数，递归方程是遍历当前数组每个元素，如果当前需扁平次数大于零且当前元素为数组，那么对调用扁平化函数对该数组扁平化，否则将元素加入新数组。
>
> ```javascript
> const customFlat = (ar, flatNum) => {
>   const result = [];
>   (Array.isArray(ar) ? ar : []).forEach((item) => {
>     if (Array.isArray(item)) {
>       if (!isNaN(flatNum) && flatNum) {
>         result.push(...customFlat(item, flatNum - 1));
>       } else {
>         result.push(item);
>       }
>     } else {
>       result.push(item);
>     }
>   });
> 
>   return result;
> };
> 
> Array.prototype.customFlat = function (flatNum) {
>   const num = flatNum < 0 || isNaN(flatNum) ? 0 : flatNum;
>   return customFlat(this, num);
> };
> ```



**39.flatMap方法怎么使用？**

> flatMap方法结合了map和flat方法。如果回调函数没有特殊操作flatMap的时间复杂度就是O(n)。
>
> （1）flatMap是先进行映射再进行一次数组扁平化（先Map后Flat）。
>
> （2）flatMap可以用于过滤，如果某个元素映射值为空数组，那么扁平化时将会过滤掉该元素。



**40.数组方法中哪些方法会修改原数组？**

> （1）首尾修改方法push，pop，shift，unshift
>
> （2）排序方法sort，reverse
>
> （3）添加删除方法splice



**41.什么是AJAX？如何实现AJAX？**

> AJAX是不刷新页面就可以发起网络请求来更新页面。
>
> 实现AJAX：
>
> （1）创建一个XMLHttpRequest对象。
>
> （2）在该对象上创建Http请求，配置基本信息。
>
> （3）设置回调函数，监听XMLHttpRequest对象状态。readyState为4时正常，status为服务器返回的状态码。
>
> （4）发送Http请求。
>
> ```javascript
> // 1.创建对象
> let xhr = new XMLHttpRequest();
> 
> // 2.创建Http请求
> xhr.open("GET", "/api/test");
> // 2.配置基本信息
> xhr.responseType = "json"
> xhr.setRequestHeader("Accept", "application/json")
> 
> // 3.设置回调函数监听
> xhr.onreadystatechange = function() {
>     if (this.readyState ! == 4)
>         return;
>     if (this.status == 200) 
>         handle(this.response)
>     else
>         console.log(this.statusText)
> }
> 
> // 3.设置回调函数监听
> xhr.onerror = function() {
>     console.log(this.statusText)
> }
> 
> // 4.发送Http请求
> xhr.send(null)
> ```



**43.fetch和XMLHttpRequest发起网络请求有什么区别？**

> （1）fetch最初不支持终止网络请求，现在可以用AbortController类终止Promise请求。XHR可以终止网络请求。
>
> （2）fetch默认不携带cookie，如果使用需要手动添加。XHR默认携带cookie。
>
> （3）fetch无法监听网络请求上传进度，XHR可以监听网络请求上传和下载进度。



**44.什么是尾调用优化？**

> 尾调用优化指提前让执行上下文出栈来降低空间复杂度。尾调用优化只能在严格模式下开启。尾调用优化情景是当前函数返回值和父级函数返回值相同，那么先让父级执行上下文出栈。
>
> 例如：递归中没有回溯中要进行的操作，并且返回值在函数末尾，并且返回的是当前函数，那么在栈中可以让递归需要保留的记录提前出栈。



**45.ES6模块和CommonJS模块的异同？**

> （1）区别：ES6是对模块引用，CommonJS是对模块浅拷贝。ES6可以修改模块中内容，但是指向模块的指针不能修改，类似于const。CommonJS可以修改模块中的内容，也可以修改指向模块的指针。
>
> （2）共同点：ES6和CommonJS都可以修改引用的对象的内部值。





**49.谈一谈严格模式下熟悉的限制？**

> （1）不能有with，以提高解释器优化效率
>
> （2）变量必须先声明后使用
>
> （3）不能delete prop，只能delete global[prop]
>
> （4）禁止this指向全局对象



**50.for in和for of的区别？**

> （1）for of是ES6新提出的，根据迭代器协议遍历对象键值对。
>
> （2）for in是遍历对象键。for in会遍历原型链上所有可枚举属性。



**51.如何用for of迭代对象？**

> 给对象添加迭代器协议。迭代器协议函数返回一个迭代器对象，对象中有一个next方法，next方法返回一个对象{value：，done：}，当done为true时迭代结束。
>
> ```javascript
> let obj = {
>     a: 1, b: 2, c: 3
> }
> 
> obj[Symbol.iterator] = function() {
>     let keys = Object.keys(this)
>     let length = keys.length, cnt = 0
>     return {
>         next() {
>             if(cnt < length)
>                 return { value: { key: keys[cnt], value: obj[keys[cnt ++]]}, done: false}
>             return { value: undefined, done: true }
>         }
>     }
> }
> 
> for(let { key, value } of obj)
>     console.log(key, value)
> ```



### 4.原型链

**52.描述一下原型链的指针关系？**

> （1）对象的\_\_proto\_\_属性指向自己的原型对象。
>
> （2）原型对象的constructor指向构造函数，\_\_proto\_\_属性指向自己的原型对象。
>
> （3）构造函数的prototype属性指向该构造函数对应的原型对象，\_\_proto\_\_指向自己的原型对象。
>
> 注：一个对象深究，用两条原型链来描述，如下
>
> ![](./assets/原型链.png)





**54.如何获得对象非原型链上的属性？**

> 用for in遍历对象所有属性，用hasOwnProperty来判断是不是非原型链属性



**55.修改原型时该注意什么？**

> 修改原型尽量修改原型内部属性。如果重写原型，那么之前的对象的原型指针不能指向最新的原型对象。



### 5.执行上下文/作用域链/闭包



**57.什么是执行上下文？**

> JavaScript代码执行时的环境。执行上下文分为全局执行上下文和函数执行上下文。每个函数执行前都会创建自己的执行上下文环境并压入执行上下文栈，执行完毕时出栈。



**58.执行上下文创建过程是什么样的？**

> （1）绑定this。
>
> * 普通函数的this指向全局对象
> * 箭头函数this的指向和所在函数作用域中的this指向相同
> * 普通函数被作为对象方法调用时this指向对象
> * 构造函数中this指向新创建的对象
> * apply，call，bind改变this的指向。
>
> （2）创建词法环境。词法环境记录了函数的外部作用域，记录了函数相关参数如name，prototype，arguments
>
> （3）创建变量环境。
>
> * 先将形参加入变量环境，属性值为undefined。
>
> * 先找var声明的变量加入变量环境，属性值为undefined。
> * 找let和const变量声明的变量加入变量环境，属性值为未初始化不可访问。
> * 将实参值带入。
> * 将声明式函数加入变量环境，属性值为函数本身。





### 7.Promise与异步编程

**64.使用异步编程有什么好处？**

> （1）便于解决回调函数多层嵌套不易理解的问题。例如多个异步操作必须依次执行，使用回调函数编写，必须回调函数中嵌套回调函数，不易于理解，使用Promise或async/await异步编程可以线性表示非线性逻辑，代码便于理解和维护。
>
> （2）便于解决回调函数嵌套错误不易传给顶层函数的问题。使用Promoise编写异步代码用catch容易解决。



**65.Promise如何实现？**

> （1）构造函数：传给Promise的函数立即执行，Promise把自己的resolve方法和reject方法传给该函数。
>
> （2）then方法：
>
> * 接收解决回调函数和拒绝回调函数。如果当前Promise实例处于等待态，那么将回调函数加入回调函数队列，Promise维护回调函数队列是因为一个Promise实例可以用then注册若干回调函数。如果当前Promise已经解决或拒绝，那么依据PromiseA+标准，等到JavaScript主程序执行完后再执行回调函数，V8引擎是让回调函数在微任务队列执行。
> * 除了对回调函数的处理，then还会立即返回一个Promise实例，会以兑现回调函数的返回值兑现或以拒绝回调函数的拒绝值拒绝。
>
> （3）resolve和reject方法：
>
> * resolve和reject方法会维护Promise有限状态自动机，Promise的状态只能由pending到fulfilled或rejected，不能逆向转变或多次由pending转变。
> * 如果解决值或拒绝值不是Promise实例，那么会立即修改Promise实例状态转为解决或拒绝，并依次执行回调函数队列中的函数。
> * 依据PromiseA+规范，如果解决值或拒绝值时Promise实例，那么当前Promise实例仍处于等待态，知道该Promise实例解决或拒绝时才解决或拒绝。此时只需要给解决值或拒绝值通过then方法注册回调函数，当它解决或拒绝时通知当前Promise实例即可。
>
> ```javascript
> class VPromise {
>   static PENDING = "pending";
>   static FULFILLED = "fulfilled";
>   static REJECTED = "rejected";
> 
>   static REJECT_ERROR = "can't reject yourself";
>   static RESOLVE_ERROR = "can't resolve yourself";
>   static STATUS_ERROR = "wrong status change";
> 
>   #status = VPromise.PENDING;
>   #value;
>   #reason;
> 
>   #fulfilledCallbacks = [];
>   #rejectedCallbacks = [];
> 
>   constructor(func) {
>     try {
>       typeof func === "function" &&
>         func.call(this, this.#resolve.bind(this), this.#reject.bind(this));
>     } catch (err) {
>       this.#reject(err);
>     }
>   }
> 
>   #resolve(value) {
>     if (this.#status !== VPromise.PENDING) return;
>     if (value === this) throw new TypeError(VPromise.RESOLVE_ERROR);
>     if (value instanceof VPromise) {
>       value.then(
>         (res) => this.#resolve(res),
>         (err) => this.#reject(err)
>       );
>     } else {
>       this.#value = value;
>       this.#status = VPromise.FULFILLED;
>       (Array.isArray(this.#fulfilledCallbacks)
>         ? this.#fulfilledCallbacks
>         : []
>       ).forEach((func) => {
>         typeof func === "function" && func(this.#value);
>       });
>     }
>   }
> 
>   #reject(reason) {
>     if (this.#status !== VPromise.PENDING) return;
>     if (reason === this) throw new TypeError(VPromise.REJECT_ERROR);
>     if (reason instanceof VPromise) {
>       reason.then(
>         (res) => this.#reject(res),
>         (err) => this.#reject(err)
>       );
>     } else {
>       this.#reason = reason;
>       this.#status = VPromise.REJECTED;
>       (Array.isArray(this.#rejectedCallbacks)
>         ? this.#rejectedCallbacks
>         : []
>       ).forEach((func) => {
>         typeof func === "function" && func(this.#reason);
>       });
>     }
>   }
> 
>   then(onFulfilledCallback, onRejectedCallback) {
>     const forMatFulfilledCallback =
>       typeof onFulfilledCallback === "function"
>         ? onFulfilledCallback
>         : (value) => value;
>     const forMatRejectedCallback =
>       typeof onRejectedCallback === "function"
>         ? onRejectedCallback
>         : (reason) => reason;
> 
>     return new VPromise((resolve, reject) => {
>       if (this.#status === VPromise.PENDING) {
>         const fulfilledCallbacks = Array.isArray(this.#fulfilledCallbacks)
>           ? this.#fulfilledCallbacks
>           : [];
>         fulfilledCallbacks.push((value) => {
>           try {
>             resolve(forMatFulfilledCallback(value));
>           } catch (err) {
>             reject(err);
>           }
>         });
>         this.#fulfilledCallbacks = fulfilledCallbacks;
> 
>         const rejectedCallbacks = Array.isArray(this.#rejectedCallbacks)
>           ? this.#rejectedCallbacks
>           : [];
>         rejectedCallbacks.push((reason) => {
>           try {
>             reject(forMatRejectedCallback(reason));
>           } catch (err) {
>             reject(err);
>           }
>         });
>         this.#rejectedCallbacks = rejectedCallbacks;
>       } else if (this.#status === VPromise.FULFILLED) {
>         queueMicrotask(() => {
>           try {
>             resolve(forMatFulfilledCallback(this.#value));
>           } catch (err) {
>             reject(err);
>           }
>         });
>       } else if (this.#status === VPromise.REJECTED) {
>         queueMicrotask(() => {
>           try {
>             reject(forMatRejectedCallback(this.#reason));
>           } catch (err) {
>             reject(err);
>           }
>         });
>       } else {
>         throw new Error(VPromise.STATUS_ERROR);
>       }
>     });
>   }
> 
>   catch(onCatchCallback) {
>     return this.then(
>       null,
>       (reason) =>
>         typeof onCatchCallback === "function" && onCatchCallback(reason)
>     );
>   }
> 
>   finally(onFianllyCallback) {
>     return this.then(
>       (value) => {
>         typeof onFianllyCallback === "function" && onFianllyCallback(value);
>         return value;
>       },
>       (reason) => {
>         typeof onFianllyCallback === "function" && onFianllyCallback(reason);
>         throw new Error(reason);
>       }
>     );
>   }
> 
>   static all(promiseList) {
>     return new VPromise((resolve, reject) => {
>       const result = [];
>       (Array.isArray(promiseList) ? promiseList : []).forEach(
>         (promise, index) => {
>           if (promise instanceof VPromise) {
>             promise.then((value) => {
>               result[index] = value;
>               result.length === promiseList.length && resolve(result);
>             }, reject);
>           } else {
>             result[index] = promise;
>             result.length === promiseList.length && resolve(result);
>           }
>         }
>       );
>     });
>   }
> 
>   static allSettled(promiseList) {
>     return new VPromise((resolve) => {
>       const result = [];
>       (Array.isArray(promiseList) ? promiseList : []).forEach(
>         (promise, index) => {
>           if (promise instanceof VPromise) {
>             promise
>               .then(
>                 (value) => {
>                   result[index] = {
>                     status: VPromise.FULFILLED,
>                     value,
>                   };
>                 },
>                 (reason) => {
>                   result[index] = {
>                     status: VPromise.REJECTED,
>                     reason,
>                   };
>                 }
>               )
>               .then(
>                 () => result.length === promiseList.length && resolve(result)
>               );
>           } else {
>             result[index] = {
>               status: VPromise.FULFILLED,
>               value: promise,
>             };
>             result.length === promiseList.length && resolve(result);
>           }
>         }
>       );
>     });
>   }
> 
>   static race(promiseList) {
>     return new VPromise((resolve, reject) => {
>       (Array.isArray(promiseList) ? promiseList : []).forEach(
>         (promise) =>
>           promise instanceof VPromise && promise.then(resolve, reject)
>       );
>     });
>   }
> 
>   static any(promiseList) {
>     return new VPromise((resolve, reject) => {
>       const result = [];
>       (Array.isArray(promiseList) ? promiseList : []).forEach(
>         (promise, index) => {
>           if (promise instanceof VPromise) {
>             promise.then(resolve, (reason) => {
>               result[index] = reason;
>               result.length === promiseList.length && reject(result);
>             });
>           }
>         }
>       );
>     });
>   }
> 
>   static withResolvers() {
>     let resolve;
>     let reject;
>     const promise = new VPromise((res, rej) => {
>       resolve = res;
>       reject = rej;
>     });
>     return { promise, resolve, reject };
>   }
> }
> 
> ```



**66.Promise.all和Promise.race的区别？**

> Promise.all和Promise.race都是接收一个数组。Promise.all等到所有Promise解决再返回一个数组，存储所有解决值，或者等到第一个Promise被拒绝，返回拒绝值。Promise.race返回第一个解决或拒绝的Promise的解决或拒绝值。



**67.Promise.any方法如何使用？**

> Promise.any接收一个数组，包含若干个Promise实例。返回第一个解决的Promise的解决值。



**68.Promise.allSettled方法如何使用？**

> Promise.allSettled方法接受一个数组，包含若干个Promise实例。等到所有Promise解决或拒绝后，返回所有Promise的解决值或拒绝值。
>
> ```typescript
> interface Res {
>     status: 'fulfilled' | 'rejected'
>     value?: any
>     reason?: any
> }
> ```



**69.说一下对生成器的理解？**

> 1.与迭代器不同，生成器的yield是双向通信的。
>
> * 每次调用生成器的next方法时都可以传一个值作为当前yield表达式的值。
> * 要注意next传入的值与yield的对应关系。对yield的调用可以看做是遍历链表，最初在内容为空的头结点。调用next函数会先生成值，然后再调用yield抛出指定内容
>
> ```javascript
> function* generatorMaker() {
>   let ans1 = yield 1
>   console.log(ans1)
>   let ans2 = yield 2
>   console.log(ans2)
>   return "完成" // 最后一个yield或return都可以进行终止
> }
> let gen = generatorMaker();
> console.log(gen.next().value)
> console.log(gen.next("Vanghua").value)
> console.log(gen.next("Danny").value)
> // 1 Vanghua 2 Danny 完成
> ```
>
> 2. 生成器可以实现async和await机制
>
> * 生成器函数作为async函数，里面的yield相当于await，等待promise解决或者拒绝后才进行yield，否则yield后面的语句不会执行。



**69.async和await如何使用？**

> （1）await只能在声明时前面加上async的函数中使用。await等待Promise，await表达式的值是Promise的解决值或拒绝值。await会阻塞函数内后续操作。
>
> （2）声明时前面加上async的函数返回值是一个Promise，如果函数内部返回Promise那么async返回的Promise就是该Promise，否则返回一个已经解决的Promise，解决值是函数返回值。



### 9.垃圾回收机制

**72.垃圾回收有哪些方式？**

> （1）引用计数。针对每个引用类型，都会有一个引用次数计数器，当计数器为0时立即垃圾回收。当引用赋值为null或执行上下文出栈时，引用次数会减一。优点是：能实时垃圾回收。缺点是：无法回收循环引用的情况。
>
> （2）标记清理。垃圾回收程序运行时，遍历所有引用类型，打上待清理的标记。再次遍历所有引用类型，如果当前执行栈中还能访问到某些对象，那么清除标记。遍历结束后清理所有有标记的对象。优点：能解决循环引用问题。缺点：容易造成内存碎片化。
>
> （3）标记整理。在标记清理基础上多一步对碎片化内存整理，整理成连续内存。优点：不存在内存碎片化。缺点：时间开销大。
>
> （4）复制回收。在内存开辟两片相同区域，分为to和from。比如先在from中存储数据，当from中数据满时，将执行栈中能访问到的数据加入to区，然后清理from区，最后交换to和from区的内容。
>
> （5）增量回收。使得垃圾回收程序能和主程序并行进行（时间片上交替）。



**73.既然了解垃圾回收，那么怎样合理使用内存？**

> （1）对象不使用时赋值为null。变量不使用时赋值为null，能提前对象被垃圾回收的时间。
>
> （2）使用块级作用域。块级作用域最晚被销毁后会进行垃圾回收，如果用var声明对象，那么是函数作用域，最晚在函数运行完毕时才会垃圾回收。
>
> （3）考虑隐藏类。用构造函数创建对象时，JavaScript默认它们属于同一个类，如果再次添加删除对象属性的话，JavaScript会认为该对象属于一个新类，会新创建一个类消耗内存。所以要考虑隐藏类，使用严格的面向对象技术。
>
> （4）合理使用闭包。内函数持有外函数对象的引用，但可能仅需要使用其中某一个属性，那么内函数只需要引用该属性即可。例如内函数引用了外函数中获取的DOM对象，但只使用其id。那么只用新创建一个变量赋值一下id即可存储在栈内存，这样就释放了对DOM对象的引用。



**74.V8引擎如何进行垃圾回收？**

> （1）将内存分为新生代和老生代，新生代较小，又分为to区和from区。先在from区存储，当from区满时，将所有执行栈能访问的对象都移入to区。
>
> （2）如果to区使用率超过25%，则判断这些对象是否经过一轮垃圾回收，如果经历过，则加入老生代，否则加入to区。完成后清理from区，交换from和to。
>
> （3）老生代不时进行标记清理和标记整理垃圾回收。



**75.V8引擎编译器怎样进行优化？**

> V8使用JIT优化。如果发现某段代码运行次数过多，例如for循环中的语句，那么就会给该语句打上warm标记，交给基线编译器对该代码编译提升运行速度。由于JavaScript是弱类型语言，变量类型不确定，因此基线编译器会编译变量取不同类型的所有情况。如果某段代码执行次数更多，那么就会打上hot标记，交给优化编译器处理，优化编译器不会编译变量取所有类型的情况，而是从中推测一种最有可能发生的情况进行编译。如果优化编译器推测失败次数过多，那么会回退到基线编译器，回退次数过多时不会再开启优化编译器。



### 10.渐进式web应用

**76.请简述你对PWA的理解：**

> PWA是普通web应用程序的增强版本，让用户在不同的平台/操作系统上有接近对应平台/操作系统的原生应用程序的良好体验。
>
> 如果想把一个普通web应用程序改进为PWA，那么至少需要支持PWA的这些特性：
>
> * **可安装：** 配置manifest文件。配置图标，是否可以全屏显示等等。
> * **离线操作：** 
>   * 在service worker中拦截各种请求并缓存，离线时发送失败的请求可以被捕获，然后有网络时重新发送。因为Cache Storage是存储在主存储器上。
> * **推送服务：** Notification对象在window上，可以用来推送。后端将消息推送到谷歌中转服务器，然后谷歌服务器推送给web程序。缺点是默认使用谷歌的推送服务，需要翻墙。
> * **平台支持性好：** 应该支持响应式设计，隐藏url栏，工具栏等交互操作。



**77.请阐述一下服务线程的生命周期？**

> **正常服务线程的生命周期：**
>
> 这并不是一个线性的生命周期，在parsed之后的每个周期，都有可能因为发生错误后进入redunant周期。
>
> * parsed：解析完毕
> * installing：安装中
> * installed：安装完毕
> * activating：激活中
> * activatied：激活完毕
> * redunant：失效
>
> **服务线程工作中生命周期的表现：**
>
> * 页面规定只有一个服务线程，此时没有其它服务线程
>   * 第一次导航事件：正常经历生命周期
>   * 至少第二次导航事件及以后：开始接管程序。第一次导航事件发生后页面可能还有数据没有加载完成，直接接管程序可能造成逻辑错误。
> * 页面规定只有一个服务线程，上次的服务线程未销毁
>   * 第一次导航事件：正常经历生命周期，销毁上个服务线程
>   * 同上
