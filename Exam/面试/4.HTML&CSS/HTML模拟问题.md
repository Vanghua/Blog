#### 声明：渲染模式

> *严格模式：* 按W3C标准渲染
>
> *混杂模式：* 按浏览器自己的规则渲染
>
> *开启严格模式：* ```<!DocType html>``` 指明按HTML5严格模式渲染

#### 声明：DocType作用

> **简述**
>
> ```<!DocType>``` 表示按照严格模式下W3C的哪种标准渲染页面

#### 元素：可替代元素

> **简述**
>
> 显示效果不由CSS控制。例如iframe，video，img。
>
> **可替代元素空隙**

#### 元素：行内元素和可替代元素

#### 元素：行内块元素

#### 元素：a元素作用

> *导航：* 页面内锚点导航
>
> *下载：* url无法直接解析或响应头配置-dsiposition会调用浏览器下载能力
>
> *唤起：* 使用特定格式超链接唤起第三方功能，例如手机端电话，邮件，迅雷下载

#### 元素：meta元素

> 

#### 元素：label元素

> 

#### 属性：alt

> **简述**
>
> 图像加载失败的备用文本描述。

#### 属性：crossorigin

> **简述**
>
> 对页面非AJAX请求提供跨域支持，配置crossorigin后请求头会携带origin。服务端可以依据origin字段进行跨域限制。

#### 属性：defer和async

> *defer：* 不阻塞dom解析，dom解析完成后顺序执行
>
> *async：* 不阻塞dom解析，下载完成后立即执行

#### 属性：href和src

> **href：** 
>
> *含义：* 表示超链接地址hyper reference。
>
> *取值：* 可以是浏览器支持的任何协议的地址。例如锚点，电话，邮件等。
>
> *场景：* 用于a或link标签引用其它超链接。
>
> **src：** 
>
> *含义：* 表示URL地址。
>
> *取值：* 可以是DataUrl，ObjectUrl，常规URL。
>
> *场景：* 用于img，iframe，video等可替换元素。
>
> <font color=red>**注意：**</font>
>
> <font color=red>**超链接和URL： 超链接包含URL，超链接可以是tel:xxx，mailto:xxx，在手机端可以直接唤起电话或邮件等功能。**</font>

#### 属性：无障碍属性

> 

#### 属性值：preload和prefetch

> **简述**
>
> 在link标签上使用 ```rel="preload"``` ，用于预加载资源。link标签可以加载符合MIME类型的资源。
>
> **区别**
>
> *preload：* 下载资源但不执行，浏览器立即下载
>
> *prefetch：* 下载资源但不执行，浏览器空闲时下载
>
> <font color=blue>**速记**</font>
>
> <font color=blue>**preload笔画比prefetch少，所以简单，所以可以立即下载**</font>

#### WEB标准三层结构

#### 页面可见性

#### 微格式

#### 语义化

#### SEO







### 5.HTML



**52.什么是HTML语义化？**

> （1）HTML语义化指正确的标签做正确的事。例如用div标签布局，而不是用span标签设置display为block来布局。常用的语义化标签有：header，nav导航栏，section区块（语义化的div），article，main，aside，footer等。
>
> （2）HTML语义化的好处是对开发者友好，增强代码的可读性。对机器优化，便于搜索引擎优化，便于爬虫搜索数据。



**53.DOCTYPE的作用是什么？**

> （1）DOCTYPE用于告知浏览器用哪种HTML规范或XHTML规范来解析文档。例如\<!DOCTYPE html>表示用html5规范来解析文档。（2）加上DOCTYPE会以严格模式解析渲染文档，如果不加上DOCTYPE，会以混杂模式，即浏览器自己的规范来解析文档。



**54.常用的meta标签有哪些？**

> （1）描述文档编码类型，\<meta charset="TUF-8">
>
> （2）用于适配移动端，name和content配置为\<meta name="viewport" content="width=device-width,initial-scale=1">
>
> （3）用于搜索引擎搜索优化，name和content配置为\<meta name="keywords" content="关键词">,\<meta name="description" content="页面描述内容">



**55.HTML5有哪些更新？**

> （1）新增了一些语义化标签，例如header，footer，main，article，section，aside，nav
>
> （2）新增了一些媒体标签，例如audio，video
>
> （3）新增了进度条标签，例如progress
>
> （4）新增了表单类型，例如email验证邮箱，url验证url，color颜色拾取器
>
> （6）新增了表单属性，例如placeholder提示信息，pattern正则表达式



**56.块级元素有哪些？**

> div，p，h系列，ul无序列表，ol有序列表，li



**57.行内元素有哪些？**

> a，span，b，strong



**58.空标签（没有闭合标签的标签）有哪些？**

> br换行，hr水平线，img，input，link，meta



**59.可替换和不可替换元素有哪些？**

> （1）可替换元素指元素的渲染效果独立于CSS，元素内容由标签类型和标签属性决定，例如video，img，iframe，input，textarea等。这些元素实际是由不可替换元素组装得到的。（源自JavaScript权威指南第7版）。
>
> （2）不可替换元素指元素的渲染效果由CSS控制。常用的标签div，span，p等都是不可替换元素。



**60.title与h1，b与strong，i与em有什么区别？**

> title只是表示标题，h1表示一级层次标题语义更明确。b只是加粗标签没有语义，strong表示加重语气并且加粗，有语义。i只是斜体标签没有语义，em表示强调并斜体，有语义。



**61.label的作用是什么，该怎么使用？**

> label标签与表单标签关联，当用户点击label时表单标签将自动获取焦点。有两种使用方式，第一种是label设置for属性，属性值可以设置为表单的id值。第二种使用方式是label直接嵌套表单标签。
>
> ```html
> <label for="mobile">Number:</label>
> <input type="text" id="mobile"/>
> ```
>
> ```html
> <label>Date:<input type="text"/></label>
> ```