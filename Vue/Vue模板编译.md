# 1.模板编译流程

### 1.1 模板编译在整个渲染过程中的位置

![](assests/compile.PNG)

### 1.2 模板编译的流程

![](assests/templateCompile.PNG)

#### 1.2.1 解析器：

**HTML解析器：** 解析HTML代码。明确标签的父子节点（使用栈来维护父子节点关系，详细介绍可以参考另一篇博客“浏览器渲染”），明确有哪些标签，明确标签有哪些属性等等。

**文本解析器：** 普通文本并不需要解析，这是用来解析模板中动态绑定的数据。

**过滤器解析器：** 解析Vue使用的过滤器。

**解析器的输出：** 解析器输出抽象语法树AST来描述节点信息和父子节点关系（关于AST的介绍可以参考另一篇博客“解释器和编译器”）



#### 1.2.2 优化器： 

**优化器的输出：** 优化器输出优化后的抽象语法树AST。优化器给AST中的静态节点打上标记，在新旧虚拟DOM对比时，具有静态节点标记的vnode只需要克隆即可，不需要节点更新。



#### 1.2.3 代码生成器：

**代码生成器的输出：** 代码生成器输出字符串渲染函数。

**代码生成器输出举例：**

假设模板中有如下代码：

```html
<div id="el">Hello {{name}}</div>
```

该代码经过解析器和优化器后可得到如下AST：

```javascript
{
    "type": 1,
     "tag": "div",
     "attrsList": [
         {
             "name": "id",
             "value": "el"
         }
     ],
     "attrsMap": {
         "id": "el"
     },
    "children": [
        {
            "type": 2,
            "expression": "'Hello '+_s(name)", // _s()表示{{}}
            "text": "Hello {{name}}",
            "static": "false" // 表示是否是静态节点
        }
    ],
    "plain": false,
    "attrs": [
        {
            "name": "id",
            "value": "el"
        }
    ],
    "static": false,
    "staticRoot": false
}
```

代码生成器会遍历上述的AST，生成一个能产生虚拟DOM节点的函数，并将其包裹在字符串中。

```javascript
`with(this) {
    return _c(
    	"div",
        {
            attrs: {"id": "el"}
        },
        [
            _v("Hello "+_s(name))
        ]
    )
}`
// _c函数表示生成一个虚拟DOM节点，\_v函数表示生成一个虚拟DOM文本节点，\_c函数表示生成一个虚拟DOM注释节点
```

在Vue实例被创建时将会使用上述字符串函数，生成渲染函数从而来获取虚拟DOM

```javascript
let s = `with(this) {
    return _c(
    	"div",
        {
            attrs: {"id": "el"}
        },
        [
            _v("Hello "+_s(name))
        ]
    )
}`
// 生成渲染函数
let hello = new Function(s)
// 调用渲染函数生成虚拟DOM节点
hello()
```

