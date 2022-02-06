> 参考并修改：
>
> https://blog.csdn.net/fyyyr/article/details/83657828
>
> https://webpack.js.org/configuration/resolve/
>
> https://www.webpackjs.com/configuration/resolve/
>
> https://www.cnblogs.com/goloving/p/8889585.html

# 引言

在ES6的模块系统中import from后跟的是路径+文件名，文件名必须带上js后缀。在CommonJS规范中文件名的js后缀可以省略。但是Vue+webpack的项目中在ES6模块系统上做出了修改，允许省略import from后的部分内容。

# 1.import from无后缀文件名

### 1.1 省略原因

修改webpack配置：(vue.config.js或webpack.base.conf.js)

```javascript
module.exports = {
  resolve: {
    // 在文件名后缀省略时，将会按如下顺序尝试加上后缀并寻找文件
    extensions: ['.js', '.vue', '.json'],
    // 在import from后可以使用@代替src
    alias: {
      '@': resolve('src')
    }
  }
...
}
```

webpack官网对extension的解释如下：

> Attempt to resolve these extensions in order. If multiple files share the same name but have different extensions, **webpack will resolve the one with the extension listed first in the array and skip the rest.**

### 1.2 省略效果

```import test from @/test.js ``` 等价于 ```import test from @/test```

```import test from @/test.vue``` 等价于 ```import test from @/test```

```import test from @/test.json``` 不等价于 ```import test from @/test```  

注：JSON文件不可省略，因为JSON文件不支持ES6导出，```import test from @/test.json``` 就会失败。

# 2.import from文件夹

### 2.1 省略原因

1. import from实际上也可以直接跟上文件夹，在<<JavaScript权威指南>>和<<JavaScript高级程序设计>>中没有提到这个问题，只是说明了文件名后缀的js不可省略。

2. import from跟文件夹是文件系统约定俗称的规范。提到这一点会想到<<JavaScript权威指南>>或<<深入浅出NodeJs>>中提到的CommonJS模块机制，在其中讲解实现原理时提到了require("")中的参数是文件夹时的情况，具体也可以参考另一篇博客“ES6+新增常用知识点”

### 2.2 约定俗成的文件系统规则

> 1.拿到路径,进行解析绝对路径
>
> 2.判断路径里是路径还是文件名,如果是文件名的话查找文件
>
> 3.如果没有文件名,则进行模块化加载:查找同名文件夹下的package.json || index.js，继续后续操作
>
>  4.如果有文件名,则确定是一个文件, 继续后续操作

### 2.3 文件系统规则举例

下面给出了CommonJS模块系统的伪实现，关于CommonJS的介绍可以参考“ES6+新增常用知识点”中的模块系统。

```javascript
//一个模块外边给你加了一个闭包(function (exports, require, module, __dirname, __filename) {})
//模块可以省略后缀 如果是js或者json或者node文件可以省略后缀
console.time('school');
// let res = require('./school')
// 同步读取，并且为了节约性能，还有缓存，将 module.exports 后边的结果进行缓存， 如果又缓存，直接返回结果
//引入需要的模块
let path = require('path')
let fs = require('fs')
let vm = require('vm')
//1.定义模块
function Module (filename) {
    this.filename = filename
    this.exports = {}
}
//2.设置模块可以解析的文件后缀
Module._extentions = ['.js', '.json', '.node']
//3.创建缓存对象
Module._cache = {}

/**
 * #desc 文件路径处理模块
 * @param  {string} filename 解析的文件名或文件名+路径
 * @return {none}
 */
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

/**
 * @desc js文件读取模块
 * @param  {object} module 文件引用对象,
 * @return {none}     没有返回值
 */
Module._extentions['js'] = module => {
    // 1.读取js文件的内容
    let script = fs.readFileSync(module.filename, {charset:'utf-8'});
    // 2.使用wrap方法拼接成一个字符串function
    let fnStr = Module.wrap(script)

    //3.在这里拿到函数执行后的结果通过
    //module.exports 当前方法执行的上下文对象
    //module.exports 解析后的值赋值给这个对象那个
    //req 文件加载方法，相当于require
    //module 当前的实例对象
    vm.runInThisContext(fnStr).call(module.exports, module.exports,req, module)

}
/**
 * @desc module 模块解析json文件的方法
 * @param  {object} module 当前的module实例
 * @return {string}        module.exports对象
 */
Module._extentions['json'] = module => {
    // 1.使用fs读取到文件内容
    let script = fs.readFileSync(module.filename);
    // 2.使用JSON的parse方法将字符串转为对象并且赋值给module.expors对象
    module.exports = JSON.parse(script)
    return module.exports
} j
/**
 * @desc 函数执行字符串拼接使用的字符串
 * @type {Array}
 */
Module.wrapper = [
    '(function (exports, require, module, __dirname, __filename) {', '})'
]
/**
 * @desc 包裹函数，用来封装执行js的函数
 * @param  {string} script js文件代码
 * @return {string} 拼接好的字符串function
 */
Module.wrap = script => {
    return `${Module.wrapper[0]}${script}${Module.wrapper[1]}`
}
/**
 * @desc 文件引入方法
 * @param  {string} filename 文件名或者文件名+路径
 * @return {none}
 */
Module.prototype.load = function (filename) {
    //模块可能是json 也有可能是js
    let ext = path.extname(filename).slice(1) //去掉拿到文件后缀名上多余的. .js || .json
    //这里的this是Module的实例对象, 根据不同的文件后缀，调用不同的解析方法
    Module._extentions[ext](this)
}

/**
 * @desc 文件引用方法
 * @param  {string} filename 文件名或者文件名+路径
 * @return {object}          返回module,exports对象
 */
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
    module.load(filename)
    //4.把加载好的模块加入缓存
    Module._cache[filename] = module
    return module.exports
}

// let str = req('./school')
let json = req('./school.json')
console.log(json);
console.time('school');

```

其中涉及到路径解析的代码如下：使用了上述2.2中提到的规则

```javascript
// 实现路径解析的函数
Module.resolvePathName = filename => {
   // 1.拿到路径,进行解析绝对路径
   let p = path.resolve(__dirname, filename)
   // 2.判断路径里是路径还是文件名,如果是文件名的话查找文件
   if(!path.extname(p)) {
      // 4.如果有文件名,则确定是一个文件,开始
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



# 3. 总结

### 省略形式：

1. 省略文件后缀，只写文件名
2. 省略文件名，只写文件夹

### 省略原因：

1. webpack配置的规则
2. 约定俗成的文件系统实现规则