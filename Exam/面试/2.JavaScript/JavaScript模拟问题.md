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
> **语义：** null表示一个空对象，只有栈内存没有堆内存。undefined表示变量已声明但未赋值。
>
> **类型判断：** 第一版JavaScript规定了存储数据的低三位用于类型判断，对象和null低三位都是0，在使用typeof时null会被误判为对象。undefined不会出现这种问题。
>
> **类型判断：** 使用宽松相等判断null==undefined时会返回true，使用严格相等时会返回false。

#### 常规类型转换

> | 常用类型类型          | 数值     | 字符串          |
> | --------------------- | -------- | --------------- |
> | undefined：undefined  | NaN      | "undefined"     |
> | null：null            | 0        | "null"          |
> | Symbol：Symbol("xxx") | 不能转换 | "Symbol('xxx')" |
> | BigInt：123n          | 123      | "123"           |

#### 数字字面量和字符串转换

> **数值字面量：**
>
> > ±0
> >
> > 无限值
> >
> > 普通数值
> >
> > 非十进制数
> >
> > 科学计数法数
>
> **数值到字符串：**
>
> > **场景1—字符串行为—零特殊处理：** 
> >
> > ±0转换成0。
> >
> > **场景2—数值自身行为—数值字面量格式化后再转换：**
> >
> > * <font color=blue>**非十进制数： 负数不格式化，不转换成补码表示**</font>
> > * <font color=blue>**无限值： 负数格式化，NaN先和符号运算得到NaN**</font>
> > * <font color=blue>**普通数值： 指数不在-6到20范围内的数默认转成科学计数法**</font>
> > * <font color=blue>**科学计数法： 指数在-6到20范围内的数默认转成非科学计数法**</font>
>
> **字符串到数值：**
>
> > **场景1—字符串行为—空格处理**
> >
> > 转换时数值字面量前后的空格被忽略
> >
> > **场景2—字符串行为—空串处理**
> >
> > 空串转换为零
> >
> > **场景3—字符串行为—非数值字面量处理**
> >
> > 非数值字面量转换为NaN
> >
> > **场景4—数值自身行为—转换后再数值字面量格式化：**
> >
> > 直接转换为数值之后再进行数值字面量格式化

#### 隐式数据类型转换行为

> **一元运算符：**
>
> > **场景1:—数值运算符—+A和-A：**
> >
> > 转为数值，并进行数值字面量格式化
> >
> > **场景2—布尔运算符—!!A：**
> >
> > 转为布尔值
> >
> > **场景3—位运算运算符—~~A：**
> >
> > 转为数值，并进行位运算字面量格式化
> >
> > * <font color=blue>**0： 转为0**</font>
> >
> > * <font color=blue>**无限值： 转为0**</font>
> >
> > * <font color=blue>**其它情况： 直接取整数不分，超过2^32范围直接截断**</font>
>
> **二元运算符**
>
> > **场景1—数值运算符—A-B和A%B和A/B和A*B：**
> >
> > 转为数值，并进行数值字面量格式化
> >
> > **场景2—数值运算符—A+B：**
> >
> > 对象按偏好算法转换
> >
> > 存在字符串时转为字符串
> >
> > 默认转为数值，并进行数值字面量格式化
> >
> > **场景3—位运算运算符—A^B和A|B和A&B：**
> >
> > 转为数值，并进行位运算字面量格式化
> >
> > **场景3—相等运算符—A==B和A!=B：**
> >
> > +0和-0相等
> >
> > NaN和NaN不相等
> >
> > undefined和null相等
> >
> > 对象按偏好算法转换
> >
> > 默认转为数值，并进行数值字面量格式化
> >
> > **场景4—比较运算符—A>B和A<B和A>=B和A<=B：**
> >
> > 对象按偏好算法转换
> >
> > 存在字符串时转为字符串
> >
> > 默认转为数值，并进行数值字面量格式化
>
> **对象键值：**
>
> > 转换为字符串

#### 显示数据类型转换函数

> #### <font color=blue>字符串到数值</font>
>
> **parseFloat(string)**
>
> > **字符串—类型转换**
> >
> > 非string类型先隐式类型转换
> >
> > **字符串空值—拒绝处理**
> >
> > 空串返回NaN
> >
> > **字符串混合值—尝试处理**
> >
> > 取首字符开始的最长数值
> >
> > **字符串数值字面量—拒绝处理**
> >
> > Infinity，NaN，科学计数法等数值字面量字符串不会考虑特殊含义
>
> **parseInt(string, radix)**
>
> > **string**
> >
> > 处理同parseFloat
> >
> > **radix**
> >
> > 0默认为10进制
> >
> > 2~36是合法进制
> >
> > 其它进制返回NaN
>
> #### <font color=blue>数值到字符串</font>
>
> **toFixed(digit)**
>
> > **数值补零—精度丢失**
> >
> > 数值小数位不够时补零过多会导致精度丢失，转成字符串后补充位置变成其它数字
> >
> > **数值四舍五入—精度丢失**
> >
> > 数值做四舍五入会放大存储时的误差，例如2.55四舍五入到1为小数后是2.5
> >
> > **数值字面量—部分拒绝处理**
> >
> > 科学计数法不会被转成科学计数法的字符串
>
> **toString(radix)**
>
> > **数值进制—超出范围报错**
> >
> > 进制合法值是2~36，超出范围报错

#### 数据运算不精准原因

> **存储**
>
> > 存储时使用IEEE754 64位标准表示，无法精确表示小数部分。
> >
> > **误差来源于：** IEEE754默认舍入方式是向偶数舍入，即超出存储限度的部分只要第一位是1就向前进1，否则不进位
>
> **运算**
>
> > 运算时导致存储误差被放大会抵消。
> >
> > **误差举例：** 2.55存储是2.54499...所以2.55.toFixed(1)是2.5；0.1+0.2不是0.3；0.2+0.3是精确的0.5
>
> **显示**
>
> > 显示时进行有限近似处理。
> >
> > **误差举例：** 0.2无法精确表示，但是浏览器可以输出0.2。0.1+0.2无法精确表示，但是浏览器输出的不是0.3，超出了近似处理范围

#### 运算符优先级

> **从低到高**
>
> 1. 逗号
>2. 赋值运算
> 3. 条件三目运算
>4. 逻辑或和空值合并运算
> 5. 逻辑与运算
>5. 按位或运算
> 5. 按位异或预算
>5. 按位与预算
> 5. 相等运算
> 5. 比较运算（in，instanceOf）
> 5. 位移运算
> 5. 加减运算
> 5. 乘除模运算
> 5. 幂运算
> 5. 一元运算（await，delete，void，!，~，+，++a）
> 5. 后置运算（a++）
> 5. new
> 5. 函数调用，属性访问
> 5. 括号
>
> **逗号最低别忘掉，赋值运算也重要。**
> **条件三目看仔细，逻辑或来空值并。**
> **逻辑与后位运算，或异与来要分明。**
> **相等比较别混淆，ins实例也要清。**
> **位移加减心中留，乘除模来不可丢。**
> **幂运一元最高级，await删空要牢记。**
> **前置后置紧随后，new运算也跑不掉。**
> **函数调用别忘掉，对象属性分高低。**
> **括号分组最优先，优先级排最前端。**

#### 后置运算符滞后性

> 在同一个语句中，一个变量后置自增后再次访问该变量可以获取后置自增的最新值。
>
> ```let b = 1; console.log(++b + b++ + b++ + ++b); // 2 + 2 + 3 + 5 = 12```



### 2.对象

#### 堆内存和栈内存

> **栈内存：** 执行上下文的变量或者参数
>
> **堆内存：** 对象

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

#### new实现

> （1）创建一个空对象
>
> （2）绑定构造函数的this指向该对象
>
> （3）绑定该对象的prototype指向构造函数的原型
>
> （4）判断构造函数返回值类型，如果是引用类型则返回引用类型，如果是基本类型则返回该对象

#### 原型链

> **含义：**
>
> 一条用\_\_proto\_\_属性连接对象直到null的用来继承的链。
>
> **继承：**
>
> JavaScript仅支持通过原型（prototype属性）进行继承。
>
> **<font color=red>（注：面向对象分析OOA中的继承指的是成员和方法都继承，即B is A）</font>**

#### ES5模拟继承

> **组合模式：**
>
> > **实现：**
>>
> > 构造函数中调用父类构造函数。原型调用父类构造函数。
> >
> > **缺点：**
> >
> > 浪费空间。父类属性存储两遍，一次在子类实例，一次在原型。
> 
> **寄生组合模式：**
> 
> > **实现：**
>>
> > 原型不调用父类构造函数。中间类的原型指向父类原型。子类原型为中间类实例。
>>
> > **优化：** 
> >
> > 优化了原型调用两次父类构造函数的问题。
> 

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
> > 注意：arguments无法接收初始值实参。
> >
> > 注意：不写形参不影响arguments接收实参。
> >
> > **表示—函数引用：**
> >
> > arguments.callee指向当前函数，深拷贝函数时处理递归可以使用该属性。
>>
> > 注意：严格模式下无法接收callee。
>
> **修改同步性：**
> 
> > 修改“解构，初始值，剩余参数”时，arguments无法获取修改后的最新值。

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

#### 对象浅拷贝

> **Object.assign**
>
> > **概念：** 把若干个对象拷贝到一个目标对象上。
> >
> > **行为：** 复制自有可枚举属性和符号属性。
>
> **展开语法**
>
> > **概念：** 把若干个对象拷贝到一个新对象上。
> >
> > **行为：** 复制自有可枚举属性和符号属性。
>
> **访问器属性**
>
> > **特性不可拷贝：** 属性拷贝时访问器特性不会被拷贝，只能通过Object.defineProperty设置。
> >
> > **特性可丢失：** 属性重名时Object.assign不会导致访问器特性丢失，展开语法会导致访问器特性丢失。
> >
> > **值可覆盖：** 属性重名时属性值会被覆盖。

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

#### 对象特性

> **<font color=red>注：使用Object.defineProperty定义属性时，如果不特殊设置，对象特性全部为false</font>**
>
> **enumerable**
>
> > 控制属性是否可枚举，即是否可以出现在for in，Object.keys等可枚举操作中。
>
> **writable**
>
> > 控制属性是否可被静态运算符修改。
>
> **configurable**
>
> > 控制属性是否可被删除。
> >
> > 控制其它特性是否可被修改，**<font color=blue>特例是configurable为false时writable可以修改false</font>**。
>
> **get**
>
> > 访问器属性，获取对象属性值
>
> **set**
>
> > 访问器属性，设置对象属性值

#### 对象冻结

> ```Object.freeze()``` 保障对象属性值不可修改，不可扩展，特性不可修改
>
> **性能提升：**
>
> > Vue的data中的数据设置为冻结则整个对象不论深浅都不会添加上响应式。
>
> **冻结效果：**
>
> > 对象特性的configurable为false，writable为false。
>
> **浅层冻结：**
>
> > ```Object.freeze()``` 只冻结对象浅层属性和自有属性
>
> **判断冻结：**
>
> > ```Object.isForzen()```
>
> **对象解冻：**
>
> > 不可逆操作，不能解冻

#### 对象密封

> ```Object.seal()``` 保障对象属性不可扩展，特性不可修改
>
> **密封效果：**
>
> > 对象属性不能增加，对象特性的configurable为false
>
> **浅层密封：**
>
> > ```Object.seal()``` 只密封对象浅层属性和自有属性
>
> **判断密封：**
>
> > ```Object.isSealed()```
>
> **对象解封：**
>
> > 不可逆操作，不能解封

#### 对象防扩展

> ```Object.preventExtension``` 保障对象属性不可扩展
>
> **防扩展效果：**
>
> > 对象属性不能增加
>
> **浅层防扩展：**
>
> > ```Object.preventExtensions()``` 只防止对象浅层属性和自有属性
>
> **判断扩展性：**
>
> > ```Object.isExtensiable()```
>
> **对象可扩展：**
>
> > 不可逆操作，不能解封

#### Object键的顺序

> **优先级顺序如下：**
>
> > **自然数：** 大小顺序。
> >
> > **普通字符串：** 插入顺序。
> >
> > **符号：** 插入顺序。

#### Object和Map区别

> **键原型：** Map中默认不包含键，Object中默认包含原型链上的键。
>
> **键类型：** Map中键可以是任意类型，Object中键只能是String或Symbol类型。
>
> **键顺序：** Map中的键是依据插入顺序的，Object中的键有特殊顺序。
>
> **键数量：** Map中键的个数可以用size获取，Object中的键的个数不能直接获取。
>
> **键优化：** Map对频繁增删键值对情景有优化，Object对频繁增删键值对情景无优化。
>
> **键迭代：** Map是可迭代对象，Object必须有迭代器协议才能迭代。

#### Map和WeakMap区别

> **键类型：** Map中的键可以是任意类型，WeakMap中的键只能是引用类型。
>
> **键迭代：** Map中的键可迭代，WeakMap中的键可能被垃圾回收不可迭代。
>
> **键回收：** Map中的键不可被回收，WeakMap中的键可以被垃圾回收。

#### Slice

> **起始位置：**
>
> > **空值：** 全切割。
> >
> > **合理索引：** 支持0~length-1和-length~-1的正负索引。
> >
> > **非法负索引：** 修正索引到0。
> >
> > **非法正索引：** 不切割。
>
> **终止位置：**
>
> > **空值：** 切割起始位置到末尾。
> >
> > **合理索引：** 支持大于起始位置的合理正负索引。
> >
> > **非法负索引：** 修正索引到0。
> >
> > **非法正索引：** 切割起始位置到末尾。
> >
> > **非法小于等于起始位置： ** 不切割。

#### Splice

> **删除位置**
>
> > **空值：** 不删除。
> >
> > **合理索引：** 支持0~length-1和-length~-1的正负索引。
> >
> > **非法负索引：** 删除，修正索引到0。
> >
> > **非法正索引：** 不删除，添加元素。
>
> **删除数量**
>
> > **空值：** 全删除。
> >
> > **合理数量：** 支持从删除位置到末尾的数量。
> >
> > **非法负数量：** 不删除。
> >
> > **非法正数量：** 全删除。
>
> **添加元素**
>
> > 值不限制

#### 数组API传参

> **首尾操作：**
>
> > push： 一个或多个新增元素
> >
> > unshift： 一个或多个新增元素
>
> **增删操作：**
>
> > splice： 见上
>
> **切割操作：**
>
> > slice： 见上
>
> **扁平操作：**
>
> > flat： 一个元素，默认为1。表示扁平化层数。

#### 数组API返回值

> **首尾操作：**
>
> > push： 返回数组长度
> >
> > unshift： 返回数组长度
> >
> > pop： 返回删除值
> >
> > shift： 返回删除值
>
> **排序操作：**
>
> > sort： 返回排序后原数组的引用
> >
> > reverse： 返回排序后原数组的引用
>
> **增删操作：**
>
> > splice： 返回被删除的元素组成的数组
>
> **拼接操作：**
>
> > concat： 返回拼接后的新数组

#### 数组API原地操作

> **首尾操作：** push，pop，unshift，shift
>
> **排序操作：** sort，reverse
>
> **增删操作：** splice

#### 数组API处理逻辑

> **排序操作：**
>
> > sort： 默认转成字符串按字典序排序
>
> **判别操作：**
>
> > every： 空数组时默认返回true

#### 常见编码模式

> **Unicode编码**
>
> > 给世界上所有字符提供编码。
> >
> > js可以直接通过字符串打印 ```\uXXXX``` （一次只能输入一个2字节unicode编码）或 ```\u{XXXX}``` （任意unicode编码）。
> >
> > * **UTF-8：** 1~4字节变长存储。
> >
> > * **UTF-16：** 2或4字节变长存储。
> >
> > * **UTF-32：** 4字节定长存储。
>
> **ASCII编码**
>
> > 支持127个基本字符编码。

#### 码点和码元

> JavaScript默认使用UTF-16编码
>
> **码点：**
>
> > 一个码点中包含2个字节编码
> >
> > 获取码点：  ```str.charCodeAt(index)```
> >
> > 生成码点： ```String.fromCharCode(Number)```
>
> **码元：**
>
> > 一个码元中包含完整的unicode编码
> >
> > 获取码元： ```str.codePointAt(index)```
> >
> > 生成码元： ```String.fromCodePoint(Number)```
>
> **获取字符串码元长度**
>
> ```javascript
> const getLength = (str) => {
>   let length = 0;
>   const maxSize = 2 ** 16;
>   for (let index = 0; index < str.length; ) {
>     index += 1 + (str.codePointAt(index) >= maxSize);
>     length++;
>   }
>   return length;
> };
> ```



### 3.执行上下文

#### 死循环和无限递归

> **死循环：** 主线程卡死。
>
> **无限递归：** 溢栈报错。
>
> **死循环+await异步微任务：** 主线程卡死。
>
> **死循环+await异步宏任务：** 正常。
>
> **无限递归+await异步微任务：** 主线程卡死。
>
> **无限递归+await异步宏任务：** 正常。

#### 闭包

> **含义：**
>
> > 函数环境下，函数+声明时的词法环境
>
> **应用：**
>
> > **访问函数内部变量：**
> >
> > 函数返回一个函数，使外部可以通过返回值访问函数内部变量。
> >
> > **保存数据：**
> >
> > 节流防抖函数，柯里化函数。
> >
> > **作用域隔离：**
> >
> > 函数嵌套一个函数，嵌套函数作为模块，内部声明变量，被嵌套函数执行逻辑。例如一段代码外面包裹IIFE。
>
> **内存泄漏：**
>
> > 见后续总结
> >
> > **存在泄漏：** 游离内存和返回不必要的内容
> >
> > **不存在泄漏：**

#### 提权漏洞

> **背景：**
>
> > **背景：通过代理暴露闭包内对象** 
> >
> > 函数内存储对象，通过一层代理对外暴露访问对象属性的方法，避免其它第三方库误修改该对象。
> >
> > **漏洞：闭包内代理保护的对象可被修改** 
> >
> > 虽然使用代理避免对象引用对外泄漏，但是对象的引用还是可以被获取。
> >
> > ```javascript
> > const obj = (() => {
> >   const obj = {
> >     a: 1,
> >     b: 2,
> >   };
> >   return {
> >     get(key) {
> >       return obj[key];
> >     },
> >   };
> > })();
> > ```
>
> **攻击思路：**
>
> > 调用被保护对象上的方法，可以直接通过this获取被保护对象的引用。
> >
> > **攻击1—间接调用：**
> >
> > 对象的valueOf方法默认返回自身。```obj.get('valueOf')()``` 无效，因为是间接调用，不是闭包内obj调用，所以this指向导致无法获取闭包内被代理保护的变量。
> >
> > **攻击2—访问器属性：**
> >
> > 访问器属性在调用时可以通过this访问源对象。给对象原型设置访问器访问方法A，再通过obj.get调用该属性即可自动触发访问器方法获取this。
>
> **保护思路：**
>
> > **原型保护**
> >
> > 通过Object.setPrototypeOf重置被保护对象的原型

#### 节流防抖

> **节流：**
>
> >**概念：**
> >
> >一段时间只执行一次。王者荣耀放技能。
> >
> >**应用：**
> >
> >滚动事件；窗口大小变化。
>
> **防抖：**
>
> >**概念：**
> >
> >延迟执行。王者荣耀回城。
> >
> >**应用：**
> >
> >搜索框搜索；表单提交；按钮点击。

#### eval

> **低效率**
>
> > eval执行的语句必须调用JavaScript解释器，无法被宿主环境优化，例如V8引擎通常使用JIT技术进行局部编译。
>
> **可移植**
>
> > eval函数参数是字符串，可以直接移植到new Function中。
>
> **作用域**
>
> > eval父级作用域是：直接调用是当前作用域，间接调用是全局作用域。
> >
> > new Function作用域是：全局作用域。
> >
> > **<font color=blue>联想：webpack为什么source-map存在eval模式而不存在new Function模式，可能由于作用域问题。</font>**
> >
> > ```javascript
> > // 浏览器环境测试
> > const a = 123
> > (function() {
> >  const a = 456
> >  const evil = eval;
> >  // 间接调用：全局作用域：123
> >  evil("console.log(a)") 
> >  // 直接调用：当前作用域：456
> >  eval("console.log(a)")
> >  // 直接调用：全局作用域：123
> >  new Function("console.log(a)")()
> > })()
> > ```
>

#### 作用域

> **主要：**
>
> 全局作用域，函数作用域，块级作用域。
>
> **选择回答：**
>
> eval作用域，模块作用域等等。

#### 词法环境

> <font color=red>**注：执行上下文包含词法环境；词法环境对应作用域。**</font>
>
> **概念** 
>
> > **创建：** 对应五种环境记录场景运行时创建。简述是运行到函数或块中时创建。
> >
> > **含义：** 记录标识符到变量值的映射。
> >
> > **组成：** 环境记录和外部引用。
>
> **环境记录**
>
> > **对象环境记录：** with中访问的对象属性。
> >
> > **声明环境记录：** 函数声明，变量声明。
> >
> > **函数环境记录：** 基于声明环境记录，添加了函数专用属性。例如：this的值，函数是否通过new调用，函数是否是箭头函数。
> >
> > **模块环境记录：** 基于声明环境记录，添加了模块专用属性。例如：模块导入导出值。
> >
> > **全局环境记录** 
> >
> > * **全局对象环境记录：** var声明变量，函数声明，默认全局函数
> > * **全局声明环境记录：** let/const/class声明的变量
>
> **外部引用**
>
> > 对父级词法环境的引用，可以访问父级词法环境的变量。
>
> **声明环境记录的创建：**
>
> > **注：声明环境记录在记录var声明变量和声明式函数时，可以穿透所有嵌套的非函数声明环境记录（穿透块级作用域，不穿透eval作用域）**
> >
> > 记录var声明和形参声明
> >
> > 记录let和const声明
> >
> > 带入实参值到形参记录
> >
> > 记录声明式函数和值
>

#### 执行上下文

> **执行上下文概念：**
>
> > 函数执行时创建。
>
> **执行上下文创建：**
>
> > **<font color=red>注：创建词法环境和变量环境。变量环境是特殊词法环境，类似于声明式环境记录，但是只能存在var声明变量。（个人理解：对应块级作用域中的var提升，不提块里的function恰好对应后文的块级函数场景）</font>**
> >
> > **创建函数词法环境记录**
>>
> > * **绑定函数式词法环境记录特有属性：**
>>   * 函数调用方式new
> >   * 实参arguments
> >   * 函数名name
> >   * 函数this
> > * **绑定声明式词法环境记录基础属性：** 
> >   * var声明和形参声明，值为undefined，加入变量环境（穿透局部词法环境）。
> >   * let声明和const声明，值为undefined，加入变量环境。
> >   * 实参带入，给形参赋值。
> >   * 声明式函数，加入变量环境（穿透局部词法环境）。
> >
> > **创建词法环境外部引用**
> >
> > 绑定父级词法环境，构造作用域链以确认能访问到的变量。

#### 块级函数

> 不应该在局部（块级）作用域中声明式定义函数。
>
> 这是非ESM标准做法，在不同浏览器下词法环境绑定变量的操作将变得不确定。
>
> **举例：** 
>
> * 老IE浏览器在局部作用域声明式定义函数可以穿透作用域提升到函数作用域，直接可以访问。
> * chrome浏览器会穿透作用域提升到函数作用域，但是初始值为undefined。
> * chrome浏览器会穿透作用域提升到函数作用域，但是预解析时已经实现穿透声明，但是执行时还会执行声明语句。

#### 栈溢出

> **说明：** 异步调用不会导致溢栈。因为主任务结束后主任务执行上下文回收。异步回调时才将上下文重新推入主线程。
>
> **举例：** 递归实现请求并发控制，setTimeout调用自己的递归函数。

#### 定时器不精确原因

> **硬件**
>
> > 没有绝对精确的计时硬件（除原子钟，误差可以忽略不计）。
> >
> > 例如：Intel芯片存在幽灵漏洞，高精度计时器很容易从JS层面利用漏洞获取访问权限外的数据。
>
> **系统**
>
> > C++给JavaScript提供的系统调用中的定时器调用不是精确的。
> >
> > 例如：操作系统计时会受到进程切换，CPU超频等事件影响，影响操作系统精度。
>
> **标准**
>
> > W3C规定计时器嵌套层级大于等于5层时，计时器时间延迟最小为4ms。
>
> **事件循环**
>
> > 受事件循环影响，计时器回调必须等到执行栈清空后才能执行。
>

#### 零时刻定时器执行时时机

> 执行栈清空后才能执行。需要经历主线程任务先执行完，再经历微任务执行完。

#### 高精度定时器实现方式

> **背景描述：**
>
> 定时器计时，用户点击时如果恰好是某个时间点则执行特定任务。
>
> **实现—高精度执行间隔：**
>
> > **requestAnimationFrame：** 回调函数第一个参数可以获取距离第一次执行的时间差。但是执行时机要考虑（1）刷新率（2）执行时机没有阻塞，所以真正执行的时机会有一定误差，60hz下不能保证16.7ms执行一次。
> >
> > **setInterval/setTimeout：** 每次都可能比预期超出一小段时间，计时越久误差越大。
> >
> > **setTimeout补偿：** 每次回调时分析误差，根据误差主动调整下次的执行时间，可以使误差尽量小 **（推荐）**。
>
> **实现—高精度时间戳：**
>
> > **SharedArrayBuffer：** 工作线程中不停执行for循环，index写入SharedArrayBuffer。获取循环执行相邻两次的index的时间通过Date.now或Performance.now大部分时间都是0（100次循环前后Date.now仅相差7ms）。这种时间戳精度远高于JavaScriptAPI。

#### 切换页签对定时器影响

> **影响精度：**
>
> chrome切换页签时会降低循环定时器执行频率，例如小于1000ms的回调全部在1000ms执行。
>
> **解决副作用：**
>
> * **记录状态：** 切换页签前终止计时器，记录状态。回到原有页签时重启计时器，恢复状态。
> * **工作线程：** 在工作线程中设置定时器，不受浏览器对主线程优化的影响。

#### 跨页签通信

> #### <font color=blue>推荐做法：</font>
>
> **PostMessage**
>
> > 可以获取打开页签的window，从而使用postMessage。适合点对点通信，普遍兼容。
>
> **LocalStorage**
>
> > 存储的LocalStorage变化时，在所有打开的同源页签上触发Storage事件。适合广播通信。普遍兼容。
>
> **BroadCastChannel**
>
> > 多个页签注册一个相同值的BroadCastChannel可以实现广播通信。适合广播通信。普遍兼容。
>
> #### <font color=blue>考虑做法：</font>
>
> **SharedWorker：**
>
> > 用法类似BroadCastChannel可以实现广播通信。适合广播通信。兼容性一般，移动端一般不支持。
>
> #### <font color=blue>不推荐做法：</font>
>
> **IndexDB**
>
> > **无法主动触发通知：**
> >
> > 修改后不能主动通知其它页签，需要借助轮询等方式。
>
> **sessionStorage**
>
> > **无法主动触发通知：**
> >
> > 修改后不能主动通知其它页签，需要借助轮询等方式。
>
> **cookie**
>
> > **无法主动触发通知：**
> >
> > 修改后不能主动通知其它页签，需要借助轮询等方式。
> >
> > **语义不明确：**
> >
> > 一般做身份识别，容量很小，不应该传输页签通信数据。

#### 跨窗口通信

> 跨线程或同页签下跨窗口通信在上述七种方法上可以再考虑MessageChannel通信。

#### 严格模式

> **严格模式意义：**
>
> 严格模式实行更严格的错误处理机制，让代码更健壮
>
> **严格模式特点：**
>
> > * 变量必须先声明再赋值
> > * 不能删除不可删除属性
> > * 不能给只读属性赋值
> > * 函数中的形参名称不能重复
> > * 函数中的this默认指向undefined
> > * arguments不会同步实参的修改
> > * arguments.callee不能使用
> > * arguments被当做保留字
> > * eval被当做保留字
> > * with语句不能使用



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
> let/const是块级（局部）作用域，var是函数作用域。
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
> 没有prototype，arguments，super。特例是ES6对象增强型方法也没有prototype属性 **（注意：没有prototype属性，有原型）**。
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
> >
> > **解构赋值**

#### 常见异步方式对比

> **Callback**
>
> > 产生回调地狱，回调函数嵌套层级过深
>
> **Promise**
>
> > 长链式调用过长。特点是错误是逐层抛出，直到catch函数。
>
> **Generator**
>
> > 编写生成器代码较多。
>
> **Async**
>
> > 生成器语法糖。async代替*，await代替yield，方便书写，方便捕获错误。

#### 判断async函数方法

> async函数的原型链比常规函数在顶层多一了层AsyncFunction，但是该对象不直接暴露给JavaScript。
>
> 可以通过函数的Symbol.toStringTag来判断是否是AsyncFunction来区分。
>
> ```javascript
> (async () => {})[Symbol.toStringTag] // AsyncFunction
> (() => {})[Symbol.toStringTag] // undefined
> ```

#### async函数和普通返回异步函数区别

> async函数不论返回值是什么类型都会给返回值包裹Promise。
>
> 如果普通返回异步函数添加async前缀，那么返回值会进行“Promise”吸收，返回值和之前不同。
>
> ```javascript
> const promise = Promise.resolve()
> const getPromise = () => promise
> const getPromiseByAsync = async () => promise
> console.log(promise === getPromise()) // true
> console.log(promise === getPromiseByAsync()) // false
> ```

#### Promise吸收时的兑现时间

> **概念：** Promise吸收指Promise的解决值还是Promise实例。
>
> **兑现推迟：** 不论解决值是否已经兑现，上层Promise的兑现时间都会被推迟到后续若干轮微任务中。
>
> **举例：** 在V8和FireFox中都是推迟到后续第三轮微任务时兑现。
>
> ```javascript
> const p1 = Promise.resolve()
> 
> const p2 = new Promise((res) => res(p1));
> 
> p2.then(() => {
>   console.log("p2-1");
> })
>   .then(() => {
>     console.log("p2-2");
>   })
>   .then(() => {
>     console.log("p2-3");
>   })
>   .then(() => {
>     console.log("p2-4");
>   })
>   .then(() => {
>     console.log("p2-5");
>   });
> 
> p1.then(() => {
>   console.log("p1-1");
> })
>   .then(() => {
>     console.log("p1-2");
>   })
>   .then(() => {
>     console.log("p1-3");
>   })
>   .then(() => {
>     console.log("p1-4");
>   })
>   .then(() => {
>     console.log("p1-5");
>   });
> // p1-1
> // p1-2
> // p2-1 // p1已经兑现，并且p2.then先注册。说明p2兑现被推迟到第三轮微任务
> // p1-3
> // p2-2
> // p1-4
> // p2-3
> // p1-5
> // p2-4
> // p2-5
> ```

#### 消除异步传染性

> **背景：**
>
> 一个函数使用async和await会导致调用它的一些列函数也必须使用async和await造成异步污染。
>
> **解决方案：**
>
> * **检查缓存&立即失败：** 模仿React的Suspense，异步任务检查缓存值，没有缓存返回失败并且是Promise，禁止流程继续；有缓存则删除，继续进行流程。
>
> * **设置缓存&重新执行：** 当Promise兑现时设置缓存，调用入口函数重新走一遍流程。

#### 迭代器

> **可迭代对象：**
>
> > 遵守迭代协议的对象。
>
> **迭代协议：**
>
> > **可迭代协议**
> >
> > > 一个对象可迭代必须有Symbol.iterator方法，返回值是符合迭代器协议的迭代器对象。
> >
> > **迭代器协议**
> >
> > > * **IteratorResult结构：** 下列方法返回的标准对象，有value和done字段。
> > > * **next方法：** 迭代器遍历。
> > > * **return方法：** 迭代器终止。
> > > * **throw方法：** 迭代器抛出异常。
>
> **默认标准：**
>
> > 一般让迭代器对象也可以迭代。因此Symbol.iterator一般返回this。
>
> **异步迭代器：**
>
> > * next返回值整体被Promise包裹
> > * Symbol.iterator变成Symbol.asyncIterator

#### 生成器

> **概述：**
>
> > * **语法糖：** 迭代器的语法糖。
> >* **同步性：** 返回的是可迭代对象，不是异步可迭代对象。
> > * **默认标准：** 返回一个可迭代对象，并且遵守默认标准，它的迭代器也是可迭代对象。
>
> **启动和暂停：**
>
> > **yield：** 暂停生成器并抛出内容。
> >
> > **next：** 启动生成器，并传值给上次的yield语句。
>
> ```javascript
> function* getArray() {
>   const length = 10;
>   for (let index = 0; index < length; index++) {
>     const param = yield index;
>     console.log(param)
>   }
> }
> 
> const obj = getArray();
> 
> console.log(obj.next(123)) // { value: 0 }
> console.log(obj.next(456)) // 456 { value: 1 }
> console.log(obj.next(789)) // 789 { value: 2 }
> ```

#### 提前关闭迭代器

> **关闭迭代器：**
>
> 调用迭代器的return或者throw方法。
>
> 但是常见的内置迭代器都没有实现return和throw方法，无法提前关闭。
>
> **关闭生成器：**
>
> 生成器默认实现了return和throw方法。
>
> 调用生成器的return可以关闭生成器，throw方法可以抛出异常。
>
> **return：**
>
> 迭代完成后会触发迭代器的return方法。
>
> 该方法不会强制终止迭代器，除非此时通过某些操作让next方法下次返回done为true。
>
> **throw：**
>
> 迭代器默认没有场景主动触发throw方法。
>
> 该方法不会强制终止迭代器，除非此时通过某些操作让next方法下次返回done为true。

#### Reflect

> **概述：** 可以完成对象的基本操作。
>
> **基本操作：** ES262规范规定的对象上仅存在的操作，例如读取属性，设置属性等等。Reflect出现之前的对象方法都是在间接调用这些操作。
>
> **直接调用：** 直接调用不会存在预处理的逻辑。例如Object.keys默认逻辑是访问自有可枚举属性，通过Reflect获取对象键值不会有这个默认逻辑。

#### Proxy相比defineProperty好处

> **属性遍历：** defineProperty需要深度遍历给对象每个属性设置监听；proxy监听整个对象不深度遍历。
>
> **属性增删：** defineProperty无法监听对象属性的新增和删除；proxy由于监听对象所以可以监听属性新增删除。
>
> <font color=red>**注：不深度遍历的意思：proxy只需要在get读到某个属性是对象时再对这个对象做proxy监听即可**</font>

#### 元编程特点

> **代理原理：** Object.defineProperty通过访问器属性拦截和代理对属性的修改。Proxy通过第二个参数注册事件函数，针对对象或属性的事件触发后使用Reflect代理。
>
> **代理自身：** Object.defineProperty可以代理到自身或其它对象。Proxy和Reflect只能拦截和代理到Proxy实例化时传入对象。
>
> **代理局限性：** Object.defineProperty只能代理访问器属性，是属性层面。Proxy和Reflect可以拦截和代理属性和方法，有属性层面也有对象层面。例如数组的push和pop方法。

#### 尾调用优化

> **概念：** 尾调用优化指提前让执行上下文出栈来降低空间复杂度。
>
> **开启条件：** 目前Safari支持；严格模式开启。当前函数和父级函数返回值相同。

#### Symbol属性

> **Symbol.toStringTag**
>
> > 用于自定义对象toString方法返回值，调用时触发类实例的访问器方法
> >
> > ```javascript
> > class Test {
> >   get [Symbol.toStringTag]() {
> >     // "[object Test]"
> >     return 'Test'
> >   }
> > }
> > ```
>
> **Symbol.toPrimitive**
>
> > 用于自定义对象向基本类型转化规则，显隐转换时触发对象的方法
> >
> > ```javascript
> > const obj = {
> > [Symbol.toPrimitive](hint) {
> >  console.log(hint)
> >  switch (hint) {
> >    case "number":
> >      return 123;
> >    case "string":
> >      return 'obj';
> >    case "default":
> >      return 233;
> >    default:
> >    	 throw new Error("invalid hint")      
> >  }
> > },
> > };
> > ```
>
> **Symbol.hasInstance**
>
> > 用于自定义instanceOf结果，调用时触发类的静态方法
> >
> > ```javascript
> > class Test {
> >   // instance左值 instanceOf Test右值
> >   static [Symbol.hasInstance](instance) {
> >     return true;
> >   }
> > }
> > ```
>
> **stringTag访问器**
>
> **primitive实例法**
>
> **instance静态类**

#### ESM符号绑定

> **引用传递：** ESM中export导出的内容是传递引用。
>
> **引用不可修改：** ESM中export导出的内容即使不是const声明，也不允许修改。
>
> **引用实时变化：** ESM中export导出的内容变化时，接收它的模块也能感知到变化。

#### ESM和CJS的区别

> **导出值：** 
>
> > * ESM导出值的引用。
> > * CJS导出值的拷贝。
>
> **导入值：** 
>
> > * ESM可以用import函数异步导入，import会被默认提升。
> > * CJS只能同步导入，require不会被提升。
>
> **动态性：** 
>
> > * ESM的导入和导出可以静态分析。import函数式导入除外。方便做打包优化，例如Tree Shaking。
> > * CJS的导入和导出是动态的。require位置可以在条件语句，循环语句；require内容可以变量。不方便做优化。

#### ESM和CJS处理循环引用的区别

> **综述：**
>
> ESM和CJS都不会循环加载模块陷入死循环，是返回模块当前解析的结果。
>
> **ESM：**
>
> 返回一个未解析的引用。由于ESM有import提升，所以export一定在import后。直接访问会导致报错，“访问一个未初始化的变量”。
>
> **CJS：**
>
> 返回一个变量。如果在require前exports那么可以正常访问，否则直接访问会变成undefined。

#### CJS的exports和module.exports区别

> **引用：** exports是module.exports的引用。但是不能赋值，只能通过挂载 ```exports.xxx = xxx``` 属性导出。
>
> **覆盖：** module.exports覆盖性赋值后会导致之前exports导出内容失效。



### 5.垃圾回收

#### JIT

> V8引擎会尝试对多次重复执行的语句进行编译。
>
> **基线编译器** 
>
> > **标记：** 执行次数一般多，打上warm标记。
> >
> > **枚举编译：** 对于简单语句，在语义分析阶段枚举所有可能的类型进行编译。
>
> **优化编译器**
>
> > **标记：** 执行次数更多，打上hot标记。
> >
> > **推测编译：** 在语义分析阶段用决策树选择最有可能的类型进行编译。
> >
> > **去优化：** 类型出错后会回退，如果出错次数过多不会再使用优化编译器。

#### 闭包内存泄漏场景

> **闭包内存泄漏：**
>
> > 内存泄漏指“不需要使用”的变量无法被回收。如何定义“不需要使用”：
> >
> > （1）闭包返回的函数销毁后 => *闭包本身不存在内存泄漏，触发其它内存泄漏场景才会导致泄漏*
> >
> > （2）闭包本身的函数销毁后 => *闭包存在内存泄漏，存在无效内存和游离内存场景*
>
> **<font color=blue>场景1—无效内存：</font>**
>
> > 返回闭包内对象，但是只使用部分属性。导致整个对象到返回的函数被销毁时才销毁。
> >
> > ```javascript
> > function test() {
> >   const obj = {
> >     a: 1,
> >     b: 2,
> >     c: 3,
> >   };
> >   return function () {
> >     obj
> >   };
> > }
> > const func = test();
> > // 产生无效内存b和c
> > const a = func().a;
> > ```
>
> **<font color=blue>场景2—游离内存：</font>**
>
> > 非返回函数引用闭包内对象。导致整个对象到返回的函数被销毁时才销毁。
> >
> > ```javascript
> > const createInstance = () => {
> > const obj = {
> >  string: Array.from({ length: 100_000 })
> >    .map((_, index) => index)
> >    .join(""),
> > };
> > // 产生游离内存obj
> > const temp = () => {
> >  obj;
> > };
> > function instance() {}
> > return instance;
> > };
> > ```

#### 常见内存泄漏场景

> **综述：垃圾回收场景（选择性回答）**
>
> > **IE浏览器：** IE8之前BOM和DOM对象还是使用引用计数垃圾回收。JavaScript已经使用标记清理。
> >
> > **NetSpace浏览器：** NetSpace Navigator 3.0对JavaScript使用引用计数垃圾回收。
> >
> > **现代浏览器：** 基于标记清理的复杂方式。
> >
> > 下文只讨论现代浏览器的基于标记清理的内存泄漏场景。
>
> **综述：**
>
> > 内存泄漏指“不需要使用”的变量无法被回收。
> >
> > 函数执行上下文销毁后定义“不需要使用”，有以下四种场景。
> >
> > 闭包本身的函数执行上下文销毁后定义“不需要使用”，还有上文提到的两种场景。
>
> **<font color=blue>场景1：意外全局变量</font>**
>
> > 直接给某个未声明的变量赋值挂载到window上 *=>全局对象无法回收*。
> >
> > **解决方式：** 开启严格模式。
>
> **<font color=blue>场景2： 定时器和监听器</font>**
>
> > 忘记回收的循环定时器和不会永远生效的事件监听器 *=>相关词法环境无法回收*。
> >
> > **解决方式：** 及时卸载定时器和事件监听器。
>
> **<font color=blue>场景3： console.log</font>**
>
> > 被console.log等API输出的对象 *=>被输出的对象无法回收*。
> >
> > **解决方式：** 不使用console.log输出。
>
> **<font color=blue>场景4： 循环引用</font>**
>
> > DOM/BOM对象和JavaScript对象在函数作用域中循环引用 *=>双方对象无法回收*。
> >
> > **解决方式：** 等待DOM对象被移除页面；手动断开循环引用。
>

#### 常见垃圾回收机制

> **引用计数**
>
> > **原理**
> >
> > GC运行时检查堆内存引用次数，引用次数为零时执行垃圾回收。
> >
> > **缺点—循环引用** 
> >
> > 无法解决循环引用问题。
> >
> > **缺点—计数器开销**
> >
> > 记录每个堆内存引用次数开销大。
>
> **标记清理**
>
> > **原理** 
> >
> > GC运行时给内存中所有堆内存打上垃圾回收的标记，寻找能访问到的堆内存去除标记，最后对有标记的变量做GC。
> >
> > **衍生机制—标记整理**
> >
> > 标记清理容易产生碎片化内存，标记整理用于整理碎片内存。
> >
> > **衍生机制—复制回收**
> >
> > 内存分为两个区，一个区满时执行标记清理，并移动可访问堆内存到另一个区。
> >
> > **衍生机制—分代回收**
> >
> > V8引擎的回收机制。

#### JavaScript垃圾回收机制

> **分代回收**
>
> 分为新生代和老生代。
>
> **新生代** 
>
> 新生代存储活跃对象，采用基于标记清理的复制回收。当一块堆内存长期处于新生代无法被回收时会尝试加入老生代。
>
> **老生代**
>
> 老生代存储不活跃对象，采用基于标记清理的标记整理。当老生代内存满时使用标记清理和标记整理回收。



### 6.WebAPI

#### RAF

> **执行时机**
>
> > 浏览器下次重绘前调用。下次重绘的时机是（1）到达屏幕刷新频率点（2）此时任务队列没有阻塞
> >
> > **<font color=red>注：在React中延迟执行存在风险，无法保证每次屏幕刷新时任务队列一定不阻塞，在setTimeout触发前后都有可能执行。并且不能保证一定在状态更新完毕后触发。</font>**

#### 获取拖拽文件

> **拖拽文件类型：** event.dataTransfer.files获取原生文件
>
> **拖拽属性：** event.dataTransfer的setData和getData方法自定义属性，可以标记拖拽的文件

#### 原生拖拽和模拟拖拽主要区别

> **<font color=red>注： 使用react-sortable-hoc作为模拟拖拽例子，主要场景是列表或栅格</font>**
>
> **拖拽元素位置**
>
> > 原生拖拽在列表中拖拽时会保留原有位置，无法实现拖拽时自动填充位置。模拟拖拽可以拖拽时填充位置。
>
> **拖拽元素手柄**
>
> > 原生拖拽在列表中只能拖动当前元素。模拟拖拽可以通过拖拽某个元素触发另一个元素的拖拽。
>
> **拖拽元素方向**
>
> > 原生拖拽在列表中可以在任意方向拖拽。模拟拖拽可以锁定拖拽方向。
>
> **拖动容器滚动条**
>
> > 原生拖拽在列表中不能触发滚动条滚动。模拟拖拽可以触发滚动条滚动。

#### ClipBoard

> **<font color=red>注：推荐使用第三方库解决兼容性问题</font>**
>
> **写入剪切板**
>
> > 写入任意数据（图片，文本等） ```navigator.clipboard.write```
>
> **读取剪切板**
>
> > 读取任意数据（图片，文本等） ```navigator.clipboard.read```

#### ResizeObserver

> **作用：**
>
> > 元素大小变化
>
> **回调执行时机：** 
>
> > 不确定，微任务宏任务都有可能
>
> **应用场景：**
>
> > **antd表格高度自适应： ** 检测外层容器高度变化，变化后再调整antd高度变化，中间采用节流。
> >
> > **虚拟列表模拟滚动条高度： ** 高度受到长列表高度影响，并且滚动条和长列表层级不同。

#### MutationObserver

> **作用：**
>
> > 元素属性变化
> >
> > 元素文本变化
> >
> > 子树增删变化
>
> **回调执行时机：**
>
> > 微任务
> >
> > <font color=red>**注：W3C规范准确声明是浏览器支持微任务队列时才放入，但是一般浏览器都支持；Vue的nextTick有使用MutationObserver。**</font>
>
> **应用场景：**
>
> > **防止修改水印： ** canvas水印被删除后立即重新添加。
> >
> > **Vue.nextTick： ** 略。

#### IntersectionObserver

> **作用：**
>
> > 元素是否到达指定视口
>
> **回调执行时机：**
>
> >  宏任务
>
> **应用场景：**
>
> > **懒加载： ** 元素进入视窗后再设置src进行加载。
> >
> > **无限滚动： ** 移动端列表底部设置空元素，空元素进入视窗后再向列表添加元素。

#### PerformanceObserver

> **作用：**
>
> > 检测页面渲染性能

#### Fetch和XHR区别

> | 能力                | Fetch       | XHR      |
> | ------------------- | ----------- | -------- |
> | 监控上传进度        | 不支持      | 支持     |
> | 监控下载进度        | 支持        | 支持     |
> | 应用于ServiceWorker | 支持        | 不支持   |
> | 控制Cookie携带      | 支持        | 不支持   |
> | 控制重定向          | 支持        | 不支持   |
> | 自定义referer       | 支持        | 不支持   |
> | 使用流              | 支持        | 不支持   |
> | 风格                | Promise风格 | 事件风格 |
> | 活跃度              | 不断更新    | 不更新   |
>
> **控制cookie携带：** Fetch的credentials比XHR的withCredentials控制更细致。配置可以精确到同源时携带。
>
> **控制重定向：** Fetch的rediect可以控制是否重定向或收到重定向字段后手动控制重定向。XHR只能遵从重定向。

#### URI和URL区别

> URI包含URL。
>
> **URL：** 
>
> > 统一资源定位符。标识资源访问位置。不保证资源是否有变化。
>
> **URN：**
>
> > 统一资源名称。标识资源名称。不关注资源的位置。
>
> **URI：**
>
> > 统一资源标识符。标识资源名称或访问位置或都标识，是URL和URN统称。

#### URI编码

> * **字符集：** URI中只允出现ASCII字符集中的部分字符。例如空格不允许出现。
> * **非法字符：** URL中出现中文时不会改变显示效果，但是通过location访问时Chrome浏览器层面已经通过encodeURI进行了转义。
>
> **<font color=red>注：默认的encodeURI转义有较多字符不转义，所以出现特殊字符最好还是手动转义或通过encodeURIComponent转义</font>**

#### URI编码区别

> **escape：**
>
> > **场景：** 被废弃。
> >
> > **设计：** 符合JavaScript编码规则。
> >
> > **行为：** 
> >
> > * ***“特殊字符”*** 不编码（@*_+-./）
> > * 其它字符编码成形如 ```%XXXX``` UTF8编码。
>
> **encodeURI：**
>
> > **场景：** 不推荐。
> >
> > **设计：** 对整个URL转义编码。
> >
> > **行为：** 
> >
> > * ***“#号”*** 和 ***“数字字母”*** 和 ***”保留字符“*** 和 ***”不转义字符“*** 不编码（#和数字字母和;,/?:@&=+$和-_.!~*'()）。
> > * 其它字符编码成形如 ```%XXXX``` UTF8编码。
>
> **encodeURIComponent：**
>
> > **场景：** 推荐。
> >
> > **设计：** 对URL查询参数编码。
> >
> > **行为：** 
> >
> > * ***“数字字母“*** 和 ***”不转义字符“*** 不编码（数字字母和-_.!~*'()）。
> > * 其它字符编码成形如 ```%XXXX``` UTF8编码。

#### 编码特殊字符方式

> **无法编码字符：** encodeURI和encodeURIComponent都存在不编码的字符。
>
> **解码字符：** decodeURI和decodeURIComponent在解码时不会考虑特殊字符，会尝试从UTF-8做转换。
>
> **主动编码：** 手动UTF-8编码被忽视的字符即可，并且不会影响解码。

#### 解码未知次数URI编码的字符串

> **判断字符串是否被URI编码：** 两次解码结果相同则未被编码。
>
> **判断方式：** 递归判断，边界是两次解码结果相同。

#### Atob和Btoa使用限制

> **使用限制：** 只能在ASCII与Latin-1编码和Base64编码之间转换。
>
> **突破限制：** 编码非ASCII和Latin-1字符集时可以借助TextEncoder和TextDecoder将符号编码到UTF-8或UTF-8解码到符号，在调用atob和btoa，因为UFT-8编码的符号属于ASCII。
>
> ```javascript
> // 任意符号到base64编码
> console.log(btoa(new TextEncoder().encode("你好李焕英")));
> 
> const base64Result =
> "MjI4LDE4OSwxNjAsMjI5LDE2NSwxODksMjMwLDE1NywxNDIsMjMxLDEzMiwxNDksMjMyLDEzOSwxNzc=";
> 
> // base64到任意符号
> console.log(new TextDecoder().decode(Uint8Array.from(atob(base64Result).split(","))));
> ```



### 7.设计模式

#### 编程范式

> **面向过程编程**
>
> > 程序通过指令集合构成。
> >
> > **举例：** C。
>
> **事件驱动编程**
>
> > 程序通过事件处理函数构成。
> >
> > **举例：** C# WinForm，Java Swing Window Builder。
>
> **面向对象编程**
>
> > 程序通过对象组合构成。
> >
> > **特点：**
> >
> > * 类
> > * 对象
> > * 继承
> > * 多态（重载）
> > * 封装（数据和操作进行绑定）
>
> **函数式编程**
>
> > 程序通过函数组合构成，函数没有副作用，输出只受输入影响。
> >
> > **特点：**
> >
> > * 函数可以返回函数。
> >
> > * 函数可以被当成参数传递。
> >
> > * 函数可以保存在数据结构中。

#### 单例模式

> **概念：** 一个类只能有一个实例。
>
> **举例： ** 大文件上传存在连接池或任务池调度，应该对池实例采用单例模式，当自定义表单在一个页面上配置了多个大文件上传控件时会导致并发请求超出设置。antd的message，seedsui的toast，loading控件等等。

#### 代理模式

> **理解：** 不需要给模块附加新功能。模块功能可以复用，但是有一定限制。
>
> **举例：** 商品智能识别控件，OCR识别控件，手写签名控件基于照片上传控件。

#### 策略模式

> **理解：** 复杂分支逻辑通过策略进行配置，由封装的处理器统一执行。
>
> **举例：** Antd表单校验库async-validator；拜访业务复杂的逻辑判断和函数之间的调用关系应该通过配置实现，函数中只处理逻辑，不处理复杂分支对应的页面跳转和函数调用。

#### 装饰器模式

> **理解：** 动态并且无侵入地向模块前后添加内容。
>
> **举例：** JavaScript装饰器提案实现core-decorator；上传控件接入大文件上传，批量下载等扩展功能；模块接入日志；模块接入数据格式化。

#### 适配器模式

> **理解：** 多种场景转为单一场景。
>
> **举例：** 组件或页面只接收固定数据结构，存在多场景数据来源时需要通过装饰器或工具函数做数据结构适配。

#### 职责链模式

> **理解：** 让模块逻辑可以自定义链式调用。
>
> **举例：** utils或api中的请求中不处理数据格式化，不设置loading逻辑。即使需要处理，也应该有单独的原子请求函数暴露，可以让业务自定义请求的链式调用和数据处理。

#### 订阅发布模式

> **理解：** 一个模块变动后需要通知多个模块。
>
> **举例：** Vuex，Redux，Zustand。



### 8.代码实现

#### new

> ```javascript
> function _new(constructor, ...args) {
> // 1.创建空对象
> const target = {};
> // 2.绑定this
> const result = constructor.call(target, ...args);
> const object = typeof result === "object" && result ? result : target;
> // 3.绑定prototype
> Object.setPrototypeOf(object, constructor.prototype);
> // 4.返回this或新对象
> return object;
> }
> ```

#### curry

> ```javascript
> const curry = (func) => {
> return (...args) => {
>  if (args.length >= func.length) {
>    return func(...args);
>  } else {
>    return curry(func.bind(null, ...args));
>  }
> };
> };
> ```

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

#### bind和call

> **call**
>
> ```javascript
> Function.prototype._call = function (context, ...args) {
> let contextObj;
> // 1.格式化上下文
> if (context === null || context === void 0) {
>  contextObj = globalThis;
> } else if (typeof context !== "object" && typeof context !== "function") {
>  contextObj = Objec(context);
> } else {
>  contextObj = context;
> }
> // 2.上下文定义方法
> const propName = Symbol("");
> Object.defineProperty(contextObj, propName, {
>  value: this,
> });
> // 3.上下文调用函数
> const result = contextObj[propName](...args);
> delete contextObj[propName];
> return result
> };
> ```
>
> **bind**
>
> ```javascript
> Function.prototype._bind = function (context, ...args) {
> return (...rest) => {
>  return this.call(context, ...args, ...rest);
> };
> };
> ```

#### 模拟微任务队列

> ```javascript
> /**
>  * @description （腾讯）模拟微队列。考察点：Vue中nextTick
>  * @description 异步执行一个函数。如果可以，尽量将函数放入微队列
>  */
> function asyncRun(func) {
>   // 注：兼容性判断都用typeof xxx !== 'undefined'判断
>   // 注：直接判断xxx是否存在会报错xxx is not defined
>   if (typeof queueMicrotask === "function") {
>     queueMicrotask(func);
>   } else if (typeof Promise !== "undefined") {
>     Promise.resolve().then(func);
>   } else if (typeof MutationObserver !== "undefined") {
>     const ob = new MutationObserver(func);
>     const textNode = document.createTextNode("");
>     ob.observe(textNode, { characterData: true });
>     textNode.data += " ";
>   } else {
>     setTimeout(func);
>   }
> }
> ```

#### ES5模拟类

> **组合模式**
>
> ```javascript
> function Student(school, grade) {
>   if(!new.target) {
>     throw new Error('use new')
>   }
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
> 
> console.log(new Student())
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

#### 对象拷贝

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

#### 对象属性

> ```javascript
> /**
>  * @description (字节)实现类似lodash.get的get函数
>  * get函数用于访问对象属性，可以解决?.运算符滥用导致的打包体积激增问题
>  * @example
>  * const object = { a: [{ b: { c: 3 } }] }
>  * console.log(get(object, "a[0].b.c")) // 3
>  * console.log(get(object, ["a", "0", "b", "c"])) // 3
>  * console.log(get(object, "a.b.c", "default")) // default
>  */
> const get = function (object, path, defaultValue) {
>   let formatPath = path;
>   // 通过转化[]到.来规避复杂分支或复杂正则表达式
>   if (!Array.isArray(path)) {
>     formatPath = path.replaceAll("[", ".").replaceAll("]", "").split(".");
>   }
>   return formatPath.reduce((object, prop) => {
>     return object ? object[prop] : defaultValue;
>   }, object);
> };
> ```

#### 函数重载

> ```javascript
> /**
>  * @description （网易）实现JQuery风格的JavaScript函数重载
>  * 函数名称相同但是参数不同
>  * 实现一个Overload工厂函数，实例返回一个空函数，通过addImpl(参数类型描述, func)方法实现重载
>  * @example
>  * const func = Overload()
>  * func.addImpl('number', 'number', (a, b) => a + b)
>  * func.addImpl(() => console.log('emptyFunction'))
>  * func.addImpl('object', 'string', 'object', Object.defineProperty)
>  * func(1, 2)
>  * func()
>  * func({}, test, { get() { return 666 } })
>  */
> function Overload() {
>   funcMap = new Map();
>   function overload(...args) {
>     const key = args.map((arg) => typeof arg).join(",");
>     if (funcMap.has(key)) {
>       return funcMap.get(key).call(this, ...args);
>     }
>   }
>   overload.addImpl = function (...args) {
>     const func = args.pop();
>     funcMap.set(String(args), func);
>   };
>   return overload;
> }
> ```

#### 函数记忆

> ```javascript
> /**
>  * @description (某大厂)实现一个记忆化高阶函数
>  * 目标函数传入一个对象，记忆化后再次传入地址相同的对象会直接输出缓存结果
>  * 记忆化后的函数可以通过cache字段设置缓存的结果
>  * @example
>  * const obj = { a: 1, b: 2 }
>  * const memoFunc = memorize((object) => Object.values(object))
>  * console.log(memoFunc(obj)) // [1, 2]
>  * obj.b = 3
>  * console.log(memoFunc(obj)) // [1, 2]
>  * memoFunc.cache.set(obj, ['a', 'b'])
>  * console.log(memoFunc(obj)) // ['a', 'b']
>  */
> class MemorizeMap {
>   constructor() {
>     this.map = new Map();
>     this.weakMap = new WeakMap();
>   }
>   getMap(value) {
>     return typeof value === "object" && value ? this.weakMap : this.map;
>   }
>   get(key) {
>     return this.getMap(key).get(key);
>   }
>   set(key, value) {
>     return this.getMap(key).set(key, value);
>   }
>   has(key) {
>     return this.getMap(key).has(key);
>   }
> }
> 
> function memorize(func, resolver) {
>   const memorizeMap = new MemorizeMap();
>   const wrapFunc = function (...args) {
>     const key = typeof resolver === "function" ? resolver(args) : args?.[0];
>     if (memorizeMap.has(key)) {
>       return memorizeMap.get(key);
>     } else {
>       const value = func.call(this, ...args);
>       memorize.set(key, value);
>       return value;
>     }
>   };
>   wrapFunc.cache = memorizeMap;
>   return wrapFunc;
> }
> 
> ```

#### 函数休眠

> ```javascript
> // 同步风格
> const sleep = (time) => {
>   const start = Date.now();
>   while (Date.now() - start < time);
> };
> ```

#### 函数链式

> ```javascript
> /**
>  * @description （百度）实现一个链式和延迟调用函数arrange
>  * 1.arrange方法传参会进行通知，并返回可链式调用对象
>  * 2.execute方法表示立即执行
>  * 3.do方法表示添加一个任务
>  * 4.wait方法表示等待一段时间
>  * 5.waitFirst方法表示一开始等待一段时间
>  * @example
>  * arrange("Mike").execute() // Mike is notified.
>  * arrange("Mike").do("commit").execute() // Mike is notified. Start to commit.
>  * arrange("Mike").wait(5000).do("commit").execute() // Mike is notified. 等待5秒. Start to commit.
>  * arrange("Mike").waitFirst(5000).do("push").execute() // 等待5秒. Mike is notified. Start to push.
>  */
> function arrange(name) {
>   const taskList = [];
>   taskList.push(() => console.log(`${name} is notified`));
> 
>   const target = {
>     do(job) {
>       taskList.push(() => console.log(`Start to ${job}`));
>       // 链式调用通过返回this实现 
>       return this;
>     },
>     wait(delay) {
>       taskList.push(() => new Promise((resolve) => setTimeout(resolve, delay)));
>       return this;
>     },
>     waitFirst(delay) {
>       taskList.unshift(
>         () => new Promise((resolve) => setTimeout(resolve, delay))
>       );
>       return this
>     },
>     async execute() {
>       for (let index = 0; index < taskList.length; index++) {
>         await taskList[index]();
>       }
>       return this;
>     },
>   };
> 
>   return target;
> }
> 
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

#### 数组转树

> ```javascript
> /**
>  * @description（知乎）O(1)时间复杂度把父节点表示法的数组转成树
>  * @description 当前数组数据结构 {id: any, value: any, parent: any }[]
>  * @description 目标树的数据结构 {id: any, value: any, children: object[]}
>  * @example 转换前：
>  * [
>  *  { id: 1, value: 1, parent: null },
>  *  { id: 2, value: 2, parent: 1 },
>  *  { id: 3, value: 3, parent: 2 },
>  *  { id: 4, value: 4, parent: 1 },
>  * ];
>  * @example 转换后：
>  * const root = {
>  *  id: 1,
>  *  value: 1,
>  *  children: [
>  *    {
>  *      id: 2,
>  *      value: 2,
>  *      children: [
>  *        {
>  *          id: 3,
>  *          value: 3,
>  *          children: [],
>  *        },
>  *      ],
>  *    },
>  *    {
>  *      id: 4,
>  *      value: 4,
>  *      children: [],
>  *    },
>  *  ],
>  * };
>  */
> 
> function arrayToTree(array) {
>   let root = null;
>   const map = new Map();
>   array.forEach((node) => {
>     if (!node.parent) {
>       root = node;
>     }
>     node.children = [];
>     map.set(node.id, node);
>   });
>   array.forEach((node) => {
>     if (node !== root) {
>       map.get(node.parent).children.push(node);
>     }
>   });
>   return root;
> }
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

#### 元编程代理

> ```javascript
> // （滴滴）使用Proxy实现对arr[-1]的访问
> const getProxyArray = (arr) => {
>   return new Proxy(arr, {
>     get(target, key) {
>       const index = Number(key);
>       if (index < 0) {
>         const targetIndex = target.length - (-index % target.length);
>         return Reflect.get(target, targetIndex);
>       } else {
>         return Reflect.get(target, key);
>       }
>     },
>   });
> };
> ```

#### async/await

> ```javascript
> /**
>  * @description （契约锁）用生成器实现async和await，填补ES6和ES7之间的空白
>  * @example
>  * 生成器*函数模拟async，生成器yield模拟await
>  * 实现一个高阶函数，通过自动执行来模拟async await
>  */
> const run = (generatorMaker) => {
>   const gen = generatorMaker();
>   return new Promise((resolve) => {
>     const next = (param) => {
>       try {
>         const iteratorResult = gen.next(param);
>         if (iteratorResult.done) {
>           resolve(iteratorResult.value);
>         } else {
>           // Promise.resolve：保护await后是非thenable对象场景
>           Promise.resolve(iteratorResult.value)
>             .then(next)
>             .catch((err) => {
>               throw err;
>             });
>         }
>       } catch (err) {
>         gen.throw(err);
>       }
>     };
>     next();
>   });
> };
> ```

#### Promise.all

> ```javascript
> /**
>  * @description 实现Promise.all
>  * @example
>  * 输入条件1：数组可能是空数组
>  * 输入条件2：数组元素不一定是Promise实例
>  */
> Promise._all = (arr) => {
>   return new Promise((res, rej) => {
>     let count = 0;
>     const result = [];
>     // 注意1：空数组
>     if (Array.isArray(arr) && arr.length === 0) res([]);
>     // 注意2：不对数组做保护
>     arr.forEach((promise, index) => {
>       // 注意3：数组元素不一定是Promise  
>       if (promise instanceof Promise) {
>         promise.then(
>           (value) => {
>             result[index] = value;
>             ++count === arr.length && res(result);
>           },
>           (err) => {
>             rej(err);
>           }
>         );
>       } else {
>         result[index] = promise;
>         ++count === arr.length && res(result);
>       }
>     });
>   });
> };
> 
> ```

#### Promise.any

> ```javascript
> /**
>  * @description 实现Promise.any
>  * Promise.any的返回场景恰好和Promise.all相反
>  * @example
>  * 输入条件1：数组可能是空数组
>  * 输入条件2：数组元素不一定是Promise实例
>  * 输出条件1：收集错误用AggregateError表示
>  */
> Promise._any = function (arr) {
>   return new Promise((res, rej) => {
>     if (Array.isArray(arr) && arr.length === 0) {
>       return rej(new AggregateError([]));
>     }
>     let count = 0;
>     const rejectResult = [];
>     arr.forEach((item, index) => {
>       if (item instanceof Promise) {
>         item.then(
>           (value) => {
>             res(value);
>           },
>           (err) => {
>             rejectResult[index] = err;
>             ++count === arr.length && rej(new AggregateError(rejectResult));
>           }
>         );
>       } else {
>         res(item);
>       }
>     });
>   });
> };
> ```

#### Promise.race

> ```javascript
> /**
>  * @description 实现Promise.race
>  * @example
>  * 输入条件1：数组可能是空数组
>  * 输入条件2：数组元素不一定是Promise实例
>  */
> Promise._race = function (arr) {
>   return new Promise((res, rej) => {
>     arr.forEach((item) => {
>       if (item instanceof Promise) {
>         item.then(res, rej);
>       } else {
>         res(item);
>       }
>     });
>   });
> };
> ```

#### Promise.allSettled

> ```javascript
> /**
>  * @description 实现Promise.allSettled
>  * @example
>  * 输入条件1：数组可能是空数组
>  * 输入条件2：数组元素不一定是Promise实例
>  */
> Promise._allSettled = function (arr) {
>   return new Promise((res) => {
>     if (Array.isArray(arr) && arr.length === 0) res([]);
>     let count = 0;
>     const result = [];
>     arr.forEach((item, index) => {
>       if (item instanceof Promise) {
>         item
>           .then((value) => {
>             result[index] = {
>               status: "fulfilled",
>               value,
>             };
>             ++count === arr.length && res(result);
>           })
>           .catch((reason) => {
>             result[index] = {
>               status: "rejected",
>               reason,
>             };
>             ++count === arr.length && res(result);
>           });
>       } else {
>         result[index] = {
>           status: "fulfilled",
>           value: item,
>         };
>         ++count === arr.length && res(result);
>       }
>     });
>   });
> };
> ```

#### 订阅发布

> ```javascript
> /**
>  * @description （字节跳动）实现事件订阅发布机制
>  * 多种事件：需要订阅的事件存在多种
>  * 订阅格式：订阅者只会提供回调函数
>  * 多次订阅：暂时不考虑一个函数多次订阅同一事件
>  * @example
>  * on：实现事件订阅函数
>  * emit：实现事件发布函数
>  * off：实现事件取消订阅函数
>  * once：实现事件只订阅一次函数
>  */
> class EventEmitter {
>   queue = [];
> 
>   getTargetEvent(eventName) {
>     return this.queue.find((event) => event.name === eventName);
>   }
> 
>   on(eventName, callback) {
>     const targetEvent = this.getTargetEvent(eventName);
>     if (targetEvent) {
>       targetEvent.callbacks.push(callback);
>     } else {
>       this.queue.push({
>         name: eventName,
>         callbacks: [callback],
>       });
>     }
>   }
> 
>   emit(eventName) {
>     const targetEvent = this.getTargetEvent(eventName);
>     if (targetEvent) {
>       targetEvent.callbacks.forEach((callback) => callback());
>     }
>   }
> 
>   off(eventName, callback) {
>     const targetEvent = this.getTargetEvent(eventName);
>     const targetIndex = targetEvent.callbacks.findIndex((func) => {
>       return func === callback;
>     });
>     targetIndex !== -1 && this.queue.splice(targetIndex, 1);
>   }
> 
>   once(eventName, callback) {
>     this.on(eventName, () => {
>       callback();
>       this.off(eventName, callback);
>     });
>   }
> }
> ```
