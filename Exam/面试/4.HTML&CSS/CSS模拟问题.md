### 视觉格式化模型

#### 瀑布流布局

> 

#### 弹性布局伸缩规则

> **计算空间：**
>
> 先根据flex-basis计算空间是否剩余或者溢出
>
> **伸缩：**
>
> 根据是否剩余或者溢出再根据flex-grow或flex-shrink分配空间

#### 弹性布局布局属性说明

> **初始空间计算**
>
> flex-basis
>
> *\<percentage>：* 设置针对弹性盒容器宽度
>
> *\<width>：* 设置宽度值
>
> *auto：* 设置宽度值和内部元素一致
>
> **空间分配与对齐**
>
> *justify-content：* 主轴上空间分配方式
>
> *align-content：* 侧轴上空间分配方式
>
> *align-items：* 元素在侧轴对齐方式
>
> *align-self：* 精确到某个元素在侧轴对齐方式
>
> **空间分配属性取值**
>
> *space-between：* 边界项目贴边界，其它项目间隔相等
>
> *space-around：* 所有项目margin相等
>
> *space-evenly：* 所有项目间隔相等

#### 弹性布局flex取值说明

> **单值语法**
>
> *number：* ```flex-grow: <number>; flex-shrink: 1; flex-basis: 0;```
>
> *length：* ```flex-grow: 0; flex-shrink: 1; flex-basis: <length>;```
>
> **关键字语法**
>
> *initial：* ```flex-grow: 0; flex-shrink: 1; flex-basis: auto;```
>
> *auto：* ```flex-grow: 1; flex-shrink: 1; flex-basis: auto;```
>
> *none：* ```flex-grow: 0; flex-shrink: 0; flex-basis: auto;```

#### 多种常规布局方式

> **基础布局—流式布局：**
>
> 布局按设计稿采用百分比相对单位。(例如：bootstrap栅格系统)
>
> **基础布局—静态布局：**
>
> 布局按设计稿采用绝对单位。
>
> **组合布局—自适应布局：**
>
> 媒体查询+多套静态布局叠加。(例如：京东/淘宝首页)
>
> **组合布局—响应式布局：**
>
> 媒体查询+流式布局+相对单位。(例如：加入断点的bootstrap栅格系统；使用vw/vh/em/rem)

#### 响应式布局rem和vw区别

> https://juejin.cn/post/6844903693020758029?searchId=2025031920371393C514FDAECA877CBCA5

#### 响应式布局媒体查询配置

> **CSS内部配置**
>
> ```@media screen and (min-width: 1024px) and (max-width: 1440px) {  ... }```
>
> **Link标签**
>
> ```<link rel="stylesheet" type="text/css" href="style.css" media="handheld and (max-width:480px), screen and (min-width:960px)" />```

#### 响应式布局meta配置

> ```<meta name="viewport" content="width=device-width, initial-scale=1.0">```
>
> *width：* 设置宽度为移动设备宽度，而不是较大的默认宽度。
>
> *initial-scale：* 设置屏幕缩放比为1，即移动设备屏幕大小。

#### 水平垂直居中方式

> *flex布局：* 定宽高/不定宽高
>
> *margin设置auto：* 定宽高(auto只能水平居中)
>
> *绝对定位+偏移：* 定宽高
>
> *绝对定位+margin：* 定宽高
>
> *绝对定位+transform：* 定宽高/不定宽高
>
> *vertical-align和text-align：* 行盒
>
> <font color=red>**注：vertical-align需要一个height100%的参考元素**</font>

#### 变换居中高效原因

> **回流与重绘：**
>
> transform改变会引起重绘，margin改变会引起回流。
>
> **光栅化：**
>
> 在animation中用transform在光栅化线程中处理，不应主线程，不触发回流和重绘，
>
> 在animation中用margin会正常触发回流。

#### BFC特点

> **排列方式：** 
>
> 容器内盒子垂直方向从上到下排列，水平方向从左到右排列，左侧紧贴容器边框。
>
> **边距：** 
>
> 容器内盒子垂直方向外边距会折叠。
>
> **浮动：**
>
> 容器内浮动元素参与高度计算。
>
> **沙箱：**
>
> 容器内外布局互不干扰

#### BFC条件

> *float：* left或right
>
> *display：* inline-block
>
> *position：* fixed或absolute
>
> *overflow：* auto或scroll或hidden

#### BFC应用

> **解决浮动布局问题**
>
> 浮动布局容器外壳开启BFC。解决容器高度塌陷，内容丢失，容器贴靠问题。
>
> **解决外边距折叠问题**
>
> 外边距折叠的两个元素上开启BFC。

#### IFC特点

> **排列方式**
>
> 容器内盒子水平方向从左到右排列，左侧紧贴容器。垂直方向上通过vertical-align对齐。
>
> **边距**
>
> 容器内盒子外边距在垂直方向上无效。
>
> **样式截断**
>
> 容器内盒子换行时padding/margin/border无法作用在换行位置。
>
> *解决方案：* 设置```box-decoration-break: clone; -webkit-box-decoration-break: clone;```

#### 层叠上下文优先级

> *1：* background/border
>
> *2：* zIndex负值
>
> *3：* block盒子
>
> *4：* float盒子
>
> *5：* inline/inline-block盒子
>
> *6：* zIndex零/transform,opacity,filter等生成层叠上下文的属性
>
> *7：* zIndex正值

#### 行内块布局问题

> <font color=red>**注：inline-block布局问题通常指：布局外壳正常设置，布局内部使用inline-block实现同行多元素效果**</font>
>
> **布局产生空隙**
>
> 布局空隙来源于代码中的空格。
>
> **解决方案**
>
> *注释：* 代码之间通过注释取消空格
>
> *字体：* 字体大小设置为0，inline-block内再重置字体
>
> *其它布局：* 换成flex布局，不用inline-block/float布局

#### 浮动布局问题

> <font color=red>**注：浮动布局问题通常指：布局外壳正常设置，布局内部使用float实现同行多元素效果**</font>
>
> **布局高度丢失**
>
> 布局容器内部，浮动元素无法撑起布局容器高度。
>
> **布局内容丢失**
>
> 布局容器内部，浮动元素后面使用普通元素，普通元素被浮动元素覆盖。
>
> **布局位置破坏**
>
> 多个内部使用浮动布局的容器同时使用，布局容器会贴靠到一行。

#### 浮动三栏布局

> **圣杯布局**
>
> ```html
> <html>
>   <body>
>     <div style="height: 300px; background: green; padding: 0px 150px">
>       <div
>         style="float: left; height: 300px; width: 100%; background: blue"
>       ></div>
>       <div
>         style="
>           float: left;
>           width: 150px;
>           left: -150px;
>           height: 300px;
>           background: red;
>           margin-left: -100%;
>           position: relative;
>         "
>       ></div>
>       <div
>         style="
>           float: left;
>           width: 150px;
>           height: 300px;
>           right: -150px;
>           position: relative;
>           background: gold;
>           margin-left: -150px;
>         "
>       ></div>
>     </div>
>   </body>
> </html>
> ```
>
> **双飞翼布局**
>
> ```html
> <html>
>   <body>
>     <div style="height: 300px; background: green">
>       <div style="float: left; width: 100%">
>         <div style="height: 300px; margin: 0px 150px; background: red"></div>
>       </div>
>       <div
>         style="
>           float: left;
>           width: 150px;
>           height: 300px;
>           margin-left: -100%;
>           background: blue;
>         "
>       ></div>
>       <div
>         style="
>           float: left;
>           width: 150px;
>           height: 300px;
>           background: gold;
>           margin-left: -150px;
>         "
>       ></div>
>     </div>
>   </body>
> </html>
> ```
>
> <font color=red>**常见问题**</font>
>
> <font color=red>*背景：* CSS2只能用浮动布局，实现该布局时不要使用CSS3属性。</font>
>
> <font color=red>*布局空白：* 使用CSS2偏移属性使元素偏移来调整子元素间空白大小。</font>
>
> <font color=red>*布局元素：* 类似FFC布局，布局容器中所有元素都是浮动元素实现换行。</font>
>
> <font color=red>*布局策略：* 使用相对定位偏移元素：圣杯布局。使用margin偏移元素：双飞翼布局。</font>

#### 清除浮动方式

> **BFC**
>
> 布局容器外壳开启BFC。
>
> **clear**
>
> 布局容器内末尾设置空元素设置左右都不许存在浮动。

#### 定位规则

> **相对定位**
>
> *宽高变化：* 不变
>
> *定位祖先：* 自身
>
> *文档流：* 不脱离
>
> **粘性定位**
>
> *宽高变化：* 不变
>
> *定位祖先：* 包含块的填充盒
>
> *文档流：* 不脱离
>
> *偏移量：* 不产生滚动时和相对定位效果相同；产生滚动并存在偏移量和固定定位相同
>
> **绝对定位**
>
> *宽高变化：* 行盒变成块盒；块盒失去默认宽度100%效果
>
> *定位祖先：* 包含块的填充盒
>
> *文档流：* 脱离文档流
>
> *偏移量：* 定位祖先是html时使用bottom偏移量，是针对视口底部而不是html底部
>
> **固定定位**
>
> *宽高变化：* 行盒变成块盒；块盒失去默认宽度100%效果
>
> *定位祖先：* 包含块的填充盒
>
> *文档流：* 脱离文档流

#### 隐藏元素方式

> **完全隐藏**
>
> 设置 ```display: none``` 或hidden属性不会加入Layout树。
>
> **视觉隐藏：不占位**
>
> 设置层叠条件并设置zIndex为负数。
>
> 设置绝对或固定定位并移出视口。
>
> 设置元素宽高为0。
>
> **视觉隐藏：占位**
>
> 设置visibility为hidden。
>
> 设置opacity为0。

#### 隐藏元素属性对比

> <font color=blue>**核心回答：**</font>
>
> display不在布局树，visibility和opacity在布局树。
>
> **空间占用： **
>
> display不占空间；visibility和opacity占空间。
>
> **回流重绘：**
>
> display触发回流；visibility和opacity触发重绘。
>
> **事件触发：**
>
> display和visibility不能触发事件； opacity可以触发事件。
>
> **继承性： **
>
> visibility可以继承；display和opacity不能继承。

#### 滚动和CSS属性关系

> 定位和变换等属性在视觉上超出了其包含块即可触发包含块的滚动。
>
> *举例1：* 超长元素绝对定位到包含块外不会触发包含块滚动条；定位到包含块内会触发包含块滚动条。
>
> *举例2：* 超长元素变换到元素外部不会触发包含块滚动条；定位到元素内部或放大若干倍会触发包含块滚动条。

#### 滚动条显隐导致页面抖动

> 

#### 滚动吸附方式

> **简述**
>
> 滚动吸附是滚动到一定程度时，松手后自动滚动到某个指定为止。
>
> **css实现**
>
> *滚动容器设置：* ```scroll-snap-type: x mandatory``` 吸附方向配置是：x横向吸附，mandatory在松手时必须吸附。
>
> *滚动元素设置：* ```scroll-snap-stop: always``` always吸附停止条件是：不能跳过元素吸附，需要吸附相邻元素。
>
> *滚动元素设置：* ```scroll-snap-align: start``` start吸附对齐方式是：吸附到元素起始位置。

#### 滚动平滑方式

> **css**
>
> 设置 ```scroll-behavior: smooth``` 在滚动范围
>
> **JS**
>
> 设置 ```window.scrollTo({ top: 0, behavior: smmoth })```

#### 文本省略方式

> **单行省略**
>
> ```css
> .overflow {
>     overflow: hidden;
>     white-space: nowrap;
>     text-overflow: ellipsis;
> }
> ```
>
> **多行省略**
>
> ``` css
> .overflow {
>     overflow: hidden;
> 	display: -webikit-box;
> 	-webkit-line-clamp: 2;
> 	-webkit-box-orient: vertical;
> }
> ```
>
> **兼容省略1**
>
> *css：* 透明占位块占位空出最后一行，省略号设置右侧浮动。
>
> *js：* 需要js判断是否溢出指定行数再决定是否有省略号和透明块高度。
>
> ```css
> <html>
>   <body>
>     <div
>       style="line-height: 20px; height: 60px; width: 250px; overflow: hidden"
>     >
>       <div style="height: 40px; width: 250px"></div>
>       <div style="float: right">...</div>
>       <div style="margin-top: -40px; word-break: break-all">
>         测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案
>       </div>
>     </div>
>   </body>
> </html>
> 
> ```
>
> **兼容省略2**
>
> *针对问题：* font-size是参考线高度不是字体宽度，字体宽度和字体(font-family)和文字类型(中文/英文)有关，不能以此计算。
>
> *js：* 文本写入canvas通过measureText一个个测量字符宽度，手动计算每次换行位置，直到最后一行换行边界。可知插入文字数量。
>
> **兼容省略3(Antd)**
>
> *针对问题：* font-size是参考线高度不是字体宽度，字体宽度和字体(font-family)和文字类型(中文/英文)有关，不能以此计算。
>
> *js：* 文本写入固定宽高的隐藏div通过计算属性高度一个个测量是否溢出，达到溢出条件时即可知道插入文字数量。
>
> *结构：* ```<div style={{height: 40, width: 200, lineHeight: '20px'}}><span>{插入的文字数量}</span><span>...</span></div>```

#### 文本换行方式

> 文本默认在空白处允许换行，white-space控制空白合并和换行行为。
>
> **white-space常用属性**
>
> *normal：* 合并空白；按需换行
>
> *nowrap：* 合并空白；只有br才会换行
>
> *pre：* 不合并空白；只有br才会换行
>
> *break-spaces：* 不合并空白；按需换行

#### 文本截断方式

> 文本默认不截断，word-break/word-wrap控制文本截断行为。
>
> <font color=red>**注：使用文本截断场景：单个单词长度超出容器宽度，仅凭white-space换行不能满足样式需求，最好携带word-break。**</font>
>
> **word-break**
>
> *适用于任何盒子*
>
> *noraml：* 字符串空白位置可以换行。
>
> *break-all：* 字符串任意位置可以换行。
>
> **word-wrap**
>
> *适用于行盒*
>
> *noraml：* 字符串空白位置可以换行。
>
> *break-word：* 字符串任意位置可以换行。

#### 文本最小字体

> **最小字体**
>
> chrome默认最小字体12px，chrome118之后解除最小字体限制。
>
> **设置更小字体**
>
> *transform:scale：* 使用缩放。
>
> *svg：* svg中添加文本；svg内部不支持文本换行。

#### 文本行高默认值

> **line-height：normal**
>
> noraml和字体font-family有关，一般chrome/firefox默认字体下normal值为1.2。

#### 文本字体族应用场景

> **@font-face指令**
>
> 允许从本地或网络加载字体。可以用于字体图标。
>
> **场景选择：**
>
> *高分辨率：* font-face矢量图不失真。雪碧图准备多套倍图。
>
> *变色：* font-face支持简单单色变色。雪碧图支持复杂变色例如多色彩，渐变等。
>
> *体积：* font-face体积小。雪碧图体积大。
>
> *动画：* font-face不适合动画。雪碧图可以通过调整位置实现动画。

#### 可替换元素内容设置

> **常见可替换元素：**
>
> iframe，video，img
>
> **object-fit：设置内容宽高**
>
> *fill：* 覆盖容器，不按宽高比拉伸
>
> *cover：* 覆盖容器，按宽高比裁剪
>
> *contain：* 适应容器，按宽高比缩放
>
> **object-position：设置内容位置**
>
> 设置内容在元素中水平垂直方向距离
>
> <font color=red>**注：object-fit只对video和img生效**</font>

#### Canvas/Img内容不清晰

> 原始尺寸 = 样式尺寸 × 缩放倍率
>
> naturalWidth/ naturalHeight = width/height × devicePixelRatio
>
> **调整原始尺寸**
>
> *监听屏幕大小变化：* UI提供多种倍数的原始尺寸图片，例如1倍图，2倍图，3倍图。
>
> **调整样式尺寸**
>
> *监听屏幕大小变化：* 根据原始尺寸和缩放倍率调整样式尺寸。
>
> <font color=red>**注：devicePixelRatio不同设备不一样，dPR变化时屏幕缩放通常变化。手动缩放浏览器不会改变DPR，可以手动调整模拟更换设备。**</font>

#### Canvas和SVG比较

> **交互能力**
>
> *事件交互：* svg可以直接绑定事件处理函数。canvas内部图像没有事件处理系统，需要手动判断鼠标落点分发事件。
>
> *举例：* 地图用canvas渲染海量点时，点击事件必须判断鼠标落点。
>
> *保存交互：* svg不支持直接保存为图片。canvas可以直接保存为图片。
>
> *举例：* 页面上的svg图像不能保存，canvas画板中的内容可以右键保存图片。
>
> **绘制能力**
>
> *图像绘制：* svg基于矢量图绘制放大不失真。canvas基于像素绘制，需要实时考虑逻辑像素和物理像素的比例关系。
>
> *举例：* 在不同设备展示canvas画板时，避免模糊需要让绘制单位都和DPR绑定。
>
> *文本绘制：* svg和canvas绘制文本能力不佳，不遵守盒模型
>
> *举例：* 实现文本自动换行都需要一个个字符判断宽度是否超出
>
> **性能表现**
>
> svg不适合大量图形绘制。canvas适合大量图形绘制，canvas和svg都是单独图层渲染只触发layer阶段但是canvas只需要一个DOM节点。
>
> *举例：* 地图用canvas渲染海量点时，缩放地图不触发回流重绘，只用1个canvas节点占用内存少。

#### transition属性

> **transition属性**
>
> ```transition: transition-property transition-duration transition-timing-function transition-delay```
>
> *transition-property：* 过渡属性
>
> *transition-duration：* 过渡时间
>
> *transition-timing-function：* 过渡函数(描述过渡速度，例如先快后慢)
>
> *transition-delay：* 过渡延迟时间

#### animation属性

> **animation属性**
>
> *animaiton-name：* 动画名称
>
> *animation-duration：* 动画持续时间
>
> *animation-timing-function：* 动画函数
>
> *animation-delay：* 动画延迟时间
>
> 
>
> *animation-iteration-count：* 动画执行次数
>
> *animation-direction：* 动画播放方向正向/反向播放
>
> *animation-fill-mode：* 动画不播放时的样式
>
> *animation-play-state：* 动画播放状态(播放/暂停)

#### 动画和过渡应用场景

> **包含关系：**
>
>  过渡场景动画都可以实现；动画场景过渡不一定能实现。
>
> **场景选择：**
>
> *触发场景：* 状态伪类触发适合过渡。其它场景触发适合动画。
>
> *内容场景：* 不处理内容适合过渡。处理内容关键帧适合动画。
>
> *播放场景：* 一次性播放适合过渡。多次播放，特定方向播放，启停播放等适合动画。
>
> *其它场景：* 动画和过渡一般可以相互替代。

#### JS动画和CSS动画应用场景

> **场景选择：**
>
> *交互场景：* 实时交互(键盘鼠标事件)或动态计算的交互适合JS动画。

#### 动画RAF和SetInterval控制

> *帧稳定：* 定时器不精确，因此动画函数可能一个帧内多次执行，跨好几个帧执行。RAF保证每个帧内执行一次。
>
> *性能：* 页签失活时定时器延迟执行，例如chrome将小于1秒的定时器延迟都提升到1秒。页签失活时RAF自动暂停。

#### 动画性属性

> *动画性：* CSS动画性属性可以用于transition或animation。
>
> *离散与连续：* 值是连续的不是离散的的CSS属性具有动画性（例如：颜色，透明度，宽高等等）。

#### CSS-Houdini简述

> **简述：** 
>
> 提升CSS的可扩展性，暴露整个CSS渲染管线给JS操作。
>
> **举例：**
>
> 可以通过有意义的类型读写CSS属性。
>
> 可以自定义CSS绘制方式。
>
> 可以扩展CSSPolyfill。
>
> 可以自定义布局或动画函数计算方式。

#### CSS-Houdini

> **CSS属性计算**
>
> *简述：* 支持CSSOM转换成有类型意义的Javascript值，而不是纯字符串。支持自定义CSS属性。
>
> *提高性能：* 读取全部返回JS对象。
>
> ```js
> element.style // 返回普通对象，值是字符串
> element.computedStyleMap // 返回map对象，值是对象，分离了值和单位
> ```
>
> *提高语义化：* 修改全部采用JS运算。
>
> ```js
> const marginBottomValue = new CSSUnitValue(30, 'px');
> element.attributeStyleMap.set('margin-bottom', marginBottomValue);
> ```
>
> *提高语义化：* 自定义属性采用JS运算。
>
> ```js
> window.CSS.registerProperty({
> name: "--my-color",
> syntax: "<color>",
> inherits: false,
> initialValue: "#c0ffee",
> });
> ```
>
> **Paint**
>
> *简述：* 支持使用canvas风格定义css渲染内容。
>
> **Worklet**
>
> *简述：* 通过主线程或工作线程实现自定义布局，动画等复杂功能。
>
> *AnimationWorklet：* 支持JS控制动画函数。
>
> *LayoutWorklet：* 支持自定义布局算法，可以实现瀑布流，Flex等布局效果。



### CSS属性计算过程

#### CSS属性计算过程

> **确定声明值**
>
> 非几何信息的相对单位计算为绝对单位
>
> 寻找作者样式和浏览器样式没有冲突的值作为计算值
>
> **层叠**
>
> 比较源重要性：作者样式优先于浏览器样式
>
> 比较选择器优先级： 选择器权重高的优先
>
> 比较声明次序： 声明次序靠前的有限
>
> **继承：**
>
> 尝试使用继承值
>
> **默认值：** 
>
> 都不满足时使用默认值

#### CSS继承规则

> **常见继承属性：**
>
> *字体属性：* font-size，font-family等
>
> *行高间距属性：* line-height，letter-spacing，word-spacing等
>
> *其它属性：* visibility，cursor等
>
> **继承规则：**
>
> *inherit：* 使用继承样式；没有则使用浏览器默认样式。
>
> *unset：* 使用继承样式；没有则使用W3C默认样式。
>
> *initial：* 使用W3C默认样式；没有则使用继承样式。
>
> *revert：*  使用浏览器默认样式。

#### CSS选择器

> **选择器：**
>
> **：* 命中所有选择器
>
> *元素/类/id：* 命中指定类型
>
> *A, B：* 命中任意一个选择器
>
> **组合器：**
>
> *A B：* 所有后代
>
> *A \> B：* 直接后代
>
> *A \~ B：* 所有兄弟
>
> *A + B：* 相邻兄弟
>
> **叠加**
>
> *ABC：* 同一个元素上同时满足A和B和C选择器或组合器

#### CSS选择器权重

> **权重计算**
>
> *内联样式：* 1000
>
> *id选择器：* 100
>
> *属性/类/伪类选择器：* 10
>
> *元素/伪元素选择器：* 1
>
> **其它场景**
>
> *!important：* 最高
>
> *其它选择器/组合器：* 0

#### CSS覆盖内联!imporatant

> **CSS：寻找其它属性**
>
> 如果是几何属性width。可以使用max-width约束，或者transform形变强制修改
>
> **JS：强制修改**
>
> JS强制设置属性

#### CSS伪类选择器

> **伪类含义**
>
> 选择元素状态
>
> **逻辑伪类**
>
> *A:is(B,C,D)：* ,列表选择器的升级。内部列表可容错。保持内部选择器权重。命中任何一个内部选择器。
>
> *A:where(B,C,D)：* ,列表选择器的升级。内部列表可容错。清空内部选择器权重。命中任何一个内部选择器。
>
> *A:not(B,C,D)：* 平级过滤元素。内部列表不可容错。保持内部选择器权重。命中没有B的A。
>
> *A:has(B,C,D)：* 根据后代过滤当前元素。内部列表不可容错。保持内部选择器权重。命中有后代B的A。
>
> **列表伪类**
>
> *A:first-child：* A命中元素中第一个兄弟元素。
>
> *A:last-child：* A命中元素中最后一个兄弟元素。
>
> *A:nth-child(an+b)：* A命中元素中符合an+b规则的兄弟元素。
>
> *A:fitst-of-type：* A类型元素中第一个兄弟元素。
>
> *A:last-of-type：* A类型元素中最后一个兄弟元素。
>
> *A:nth-of-type(an+b)：* A类型元素中符合an+b规则的兄弟元素。
>
> **状态伪类**
>
> *:link：* 命中尚未访问的元素(a元素或area元素)。
>
> *:visited：* 命中访问过的元素(a元素或area元素)。
>
> *:hover：* 命中鼠标悬停元素。
>
> *:active：* 命中鼠标按下和松开之间的时间，激活状态元素(a元素和button元素)。
>
> *lovehate原则：* 同时存在状态伪类是顺序是，link/visited/hover/active。原因是link和visited互斥，hover和active互斥。
>
> :focus： 命中聚焦元素。
>
> :disabled：命中设置disabled属性元素。
>
> :checked：命中被选中元素(option元素或radio类型input元素)。

#### CSS伪类技巧

> **提升选择器权重**
>
> 通过一个不存在的id选择器提升权重：#A:not(#B)的权重大于#A的权重，同理其它逻辑伪类也可以实现此效果。
>
> **选择父类元素**
>
> 通过A:has(B)命中父级或祖先级元素：A:has(B)命中有B的A，不借助has其它选择无法反向选择父级。

#### CSS伪元素选择器

> **伪元素含义**
>
> 选择元素位置(前面，后面，里面，整体等等)
>
> **常见伪元素**
>
> *::after：* 元素后面
>
> *::before：* 元素前面
>
> *::first-line：* 元素中第一行文本
>
> *::first-letter：* 元素中文本第一个字母
>
> *::placeholder：* 元素中提示文本
>
> *::-webkit-scrollbar：* 谷歌浏览器整个滚动条元素



### 包含块

#### 包含块

> **普通元素：** 
>
> 最近块盒的内容盒
>
> **固定定位：** 
>
> “根元素”或“设置transform/perspective/filter(形成新的层叠上下文)等属性的填充盒”
>
> **绝对定位：** 
>
> “最近设置过定位的填充盒”或“设置transform/perspective/filter等属性的填充盒”

#### 盒模型

> **按标准分类**
>
> *css标准盒模型：* content计算宽高
>
> *css怪异/IE盒：* content+padding+border计算宽高
>
> **按包含块分类**
>
> *css内容盒：* content计算宽高
>
> *css填充盒：* content+padding计算宽高
>
> *css边框盒：* content+padding+border计算宽高

#### 盒模型背景计算

> **background-clip：背景展示盒子**
>
> *content-box：* 内容盒。content。
>
> *padding-box：* 填充盒。content+padding。
>
> *border-box：* 边框盒。content+padding+border。默认值。
>
> **background-size：背景展示方式**
>
> *手动设置宽高：* 按手动设置值拉伸背景。
>
> *cover：* 背景覆盖盒子，按宽高比裁剪背景。
>
> *contain：* 盒子包含完整背景，按宽高比缩放背景。
>
> **background-position：背景展示位置**
>
> 描述水平垂直方向偏移，可以配合contain使背景完整并居中显示在盒子中。

#### 盒模型单位计算

> **vw/vh：**
>
> 相对于视口大小。
>
> **rem：**
>
> 相对于html根元素的字体大小。
>
> **em：**
>
> **vw/vh：**
>
> 相对于视口大小。
>
> **rem：**
>
> 相对于html根元素的字体大小。
>
> **em：**
>
> font-size相对于父元素字体大小；其它属性相对于本元素字体大小。
>
> **\<length>和\<percentage>：**
>
> 几何信息(width/height/padding/margin/top)等属性\<percentage>相对于包含块大小。\<length>是绝对大小。
>
> 行高间距(line-height/letter-spacing/word-spacing)等属性\<length>和\<percentage>相对于自身字体大小。
>
> <font color=red>**注：padding/margin取百分比针对包含块宽度。**</font>

#### 盒模型宽高计算

> **box-sizing属性：** 
>
> 描述盒子的宽高计算规则
>
> **content-box：** 
>
> 宽高计算包含content
>
> **border-box：** 
>
> 宽高计算包含content和padding和border
>

#### 盒模型宽高获取

> **getComputedStyle**
>
> 值精确到小数；值是有单位字符串；值是实时的。
>
> **offset/client/scroll尺寸**
>
> 值精确到整数；值是无单位数值。
>
> **getBoundingClientRect/getClientRects**
>
> 值精确到小数；值是无单位数值。

#### 盒模型尺寸计算

> **怪异盒模型**
>
> *offsetTop/offsetLeft：* 盒子到包含块的距离
>
> *offsetHeight/offsetWidth：* 按怪异盒模型计算盒子尺寸
>
> *getBoundingClinetRect/getClientRects：* 盒子到视口的距离 
>
> *getBoundingClinetRect/getClientRects：* 按怪异盒模型计算盒子尺寸
>
> **填充盒模型**
>
> *clinetTop/clientLeft：* 盒子边框的宽高
>
> *clientHeight/clientWidth：* 按填充盒模型计算盒子尺寸
>
> *scrollTop/scrollLeft：* 盒子滚动距离
>
> *scrollHeight/scrollWidth：* 按填充盒模型计算盒子和后代实际尺寸
>
> **内容盒模型**
>
> *getComputedStyle：* 按内容盒模型计算盒子实际尺寸

#### 事件的尺寸计算

> 事件对象上有如下属性描述尺寸信息
>
> **offsetX/offsetY**
>
> 鼠标距离事件源填充盒边缘的距离
>
> **clientX/clientY**
>
> 鼠标距离视口边缘的距离
>
> **screenX/screenY**
>
> 鼠标距离屏幕边缘的距离
>
> **pageX/pageY**
>
> 鼠标距离文档边缘的距离，包含滚动距离



### 场景实现

#### CSS可复用规范

> **CSS原子化**
>
> *规范目的：* CSS原子化指将CSS组成不可再分的子类，CSS不和功能绑定，业务拼装使用。
>
> *举例：* tailwind，windi，uno等库通过原子化实现CSS可复用；bg-white，flex-middle，flex-center。
>
> **CSS组件化**
>
> *规范目的：* CSS组件化指将CSS组成满足某种功能的组件，CSS和功能绑定，业务拼装使用。
>
> *举例：* antd，element，bootstrap等库通过组件化实现CSS可复用；\<Button />，\<Layout />。
>
> **组合使用：**
>
> CSS组件化将CSS和公用功能绑定，使用CSS原子化按业务功能微调样式。

#### CSS模块化规范

> *背景：* CSS可复用规范不能满足所有业务场景，业务需要业务CSS。
>
> **Block Element Modifier(BEM)**
>
> 通过命名解决模块冲突。命名设计：block__element--modifer。
>
> **CSS IN JS**
>
> 用js字符串描述css，构建时生成唯一类名注入元素。
>
> **CSS Modules**
>
> 正常写css并引入业务，构建时生成唯一类名注入元素。

#### CSS抽象化规范

> *背景：* 仅凭CSS模块化和CSS可复用不能满足复杂项目，项目需要抽象化CSS结构，提高复用和扩展能力。
>
> **Scalable Modular Architechure CSS(SMACSS)**
>
> *规范：* 结构规范。结构抽象为：默认样式-布局样式-组件样式-状态样式-主题样式
>
> ```
>project/
> ├── src/
> │   ├── styles/
> │   │   ├── base/
> │   │   │   ├── _reset.less
> │   │   │   ├── _typography.less
> │   │   │   └── ...
> │   │   ├── layout/
> │   │   │   ├── _grid.less
> │   │   │   ├── _header.less
> │   │   │   ├── _footer.less
> │   │   │   └── ...
> │   │   ├── modules/
> │   │   │   ├── _button.less
> │   │   │   ├── _card.less
> │   │   │   ├── _form.less
> │   │   │   └── ...
> │   │   ├── states/
> │   │   │   ├── _active.less
> │   │   │   ├── _disabled.less
> │   │   │   └── ...
> │   │   ├── themes/
> │   │   │   ├── _default-theme.less
> │   │   │   ├── _dark-theme.less
> │   │   │   └── ...
> │   │   ├── variables/
> │   │   │   ├── _colors.less
> │   │   │   ├── _typography-variables.less
> │   │   │   └── ...
> │   │   ├── mixins/
> │   │   │   ├── _border-radius.less
> │   │   │   ├── _box-shadow.less
> │   │   │   └── ...
> │   │   └── main.less
> │   └── ...
> └── ...
> ```
> 
> **Object Orient CSS(OOCSS)**
>
> *规范：* 结构规范。结构抽象为：结构-皮肤
>
> ```
>project/
> ├── src/
> │   ├── styles/
> │   │   ├── base/
> │   │   │   ├── _reset.less
> │   │   │   ├── _typography.less
> │   │   │   └── ...
> │   │   ├── layout/
> │   │   │   ├── _grid.less
> │   │   │   ├── _header.less
> │   │   │   ├── _footer.less
> │   │   │   └── ...
> │   │   ├── modules/
> │   │   │   ├── _button.less
> │   │   │   ├── _card.less
> │   │   │   ├── _form.less
> │   │   │   └── ...
> │   │   ├── skins/
> │   │   │   ├── _button-skins.less
> │   │   │   ├── _card-skins.less
> │   │   │   └── ...
> │   │   ├── variables/
> │   │   │   ├── _colors.less
> │   │   │   ├── _typography-variables.less
> │   │   │   └── ...
> │   │   ├── mixins/
> │   │   │   ├── _border-radius.less
> │   │   │   ├── _box-shadow.less
> │   │   │   └── ...
> │   │   └── main.less
> │   └── ...
> └── ...
> ```
> 
> **Inverted Triangle CSS(ITCSS)**
>
> *规范：* 结构规范。结构抽象为：样式变量-样式函数-默认样式-布局样式-组件样式-微调样式
>
> ```
>project/
> ├── src/
> │   ├── styles/
> │   │   ├── settings/
> │   │   │   ├── _colors.less
> │   │   │   ├── _typography.less
> │   │   │   └── ...
> │   │   ├── tools/
> │   │   │   ├── _mixins.less
> │   │   │   ├── _functions.less
> │   │   │   └── ...
> │   │   ├── generic/
> │   │   │   ├── _reset.less
> │   │   │   ├── _box-sizing.less
> │   │   │   └── ...
> │   │   ├── elements/
> │   │   │   ├── _body.less
> │   │   │   ├── _h1.less
> │   │   │   ├── _a.less
> │   │   │   └── ...
> │   │   ├── objects/
> │   │   │   ├── _container.less
> │   │   │   ├── _grid.less
> │   │   │   └── ...
> │   │   ├── components/
> │   │   │   ├── button/
> │   │   │   │   ├── button.less
> │   │   │   │   └── button__icon.less
> │   │   │   ├── header/
> │   │   │   │   ├── header.less
> │   │   │   │   ├── header__logo.less
> │   │   │   │   └── header__nav.less
> │   │   │   ├── footer/
> │   │   │   │   ├── footer.less
> │   │   │   │   ├── footer__copyright.less
> │   │   │   │   └── footer__social.less
> │   │   │   └── ...
> │   │   ├── utilities/
> │   │   │   ├── _text-align.less
> │   │   │   ├── _margin.less
> │   │   │   └── ...
> │   │   └── main.less
> │   └── ...
> └── ...
> ```

#### 裁剪：三角形

> **border**
>
> ```html
> <html>
> <body>
>  <div
>    style="
>      height: 0px;
>      width: 0px;
>      border-width: 100px;
>      border-style: solid;
>      border-color: transparent;
>      border-left-color: red;
>      border-top-color: red;
>      transform: rotate(90deg);
>    "
>  ></div>
> </body>
> </html>
> ```
>
> **clipPath**
>
> ```html
> <html>
> <body>
>  <div
>    style="
>      height: 100px;
>      width: 100px;
>      background: red;
>      transform: rotate(90deg);
>      clip-path: polygon(50% 0, 100% 100%, 0 100%);
>    "
>  ></div>
> </body>
> </html>
> 
> ```
>
> **svg**
>
> 略

#### 裁剪：蜂巢布局效果

> **考察：**
>
> clip-path+偏移+鼠标事件
>
> ```html
> <html>
>   <head>
>     <style>
>       body {
>         margin: 0px;
>         padding: 0px;
>         overflow-x: hidden;
>       }
>       .row {
>         display: flex;
>         margin-top: -2.5vw;
>       }
>       .row:nth-child(2n + 1) {
>         margin-left: -5vw;
>       }
>       .row:first-child {
>         margin-top: 0px;
>       }
>       .item {
>         width: 10vw;
>         height: 10vw;
>         flex-shrink: 0;
>         cursor: pointer;
>         transition: 0.5s;
>         background: black;
>         clip-path: polygon(50% 5%, 95% 25%, 95% 75%, 50% 95%, 5% 75%, 5% 25%);
>       }
>     </style>
>   </head>
>   <body>
>     <div class="row">
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>     </div>
>     <div class="row">
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>     </div>
>     <div class="row">
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>     </div>
>     <div class="row">
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>     </div>
>     <div class="row">
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>     </div>
>     <script>
>       const divs = Array.from(document.querySelectorAll(".item"));
>       const reset = () => {
>         divs.forEach((div) => {
>           div.style.transform = "scale(1)";
>           div.style.background = "black";
>         });
>       };
>       document.body.addEventListener("mouseover", (e) => {
>         if (Array.from(e.target.classList).includes("item")) {
>           reset();
>           const divIndex = divs.findIndex((div) => div === e.target);
>           const focusDiv = divs[divIndex];
>           focusDiv.style.transform = "scale(1.1)";
> 
>           const rowNum = 11;
>           const row = Math.floor(divIndex / 11);
>           const distance = row % 2 ? rowNum : rowNum + 1;
>           const offset = row % 2 ? [0, 1] : [-2, -1];
>           const relatedDivs = [
>             divs?.[divIndex - 1],
>             divs?.[divIndex + 1],
>             divs?.[divIndex - distance],
>             divs?.[divIndex - distance + 1],
>             divs?.[divIndex + distance + offset[0]],
>             divs?.[divIndex + distance + offset[1]],
>           ].filter(Boolean);
>           relatedDivs.forEach((div) => {
>             div.style.transform = "scale(0.9)";
>             div.style.background = "red";
>           });
>         } else {
>           reset();
>         }
>       });
>     </script>
>   </body>
> </html>
> 
> ```

#### 滤镜：交融效果

> **filter：**
>
> *描述：* 交融效果。动画中元素相交时类似水滴和水面交融效果。
>
> *blur：* 高斯模糊。设置高斯模糊可以出现交融效果，但是产生模糊。
>
> *contrast：* 对比度。对比度基于亮度计算，设置底色白色并提升对比度使色差明显，消除相近颜色导致的模糊。
>
> ```html
> <html>
>   <head>
>     <style>
>       @keyframes move {
>         0% {
>           transform: translate(50px, 50px);
>         }
>         50% {
>           transform: translate(50px, -50px);
>         }
>         100% {
>           transform: translate(50px, 50px);
>         }
>       }
>     </style>
>   </head>
>   <body>
>     <div style="filter: contrast(20); background-color: white; padding: 100px">
>       <div
>         style="
>           width: 150;
>           height: 150px;
>           filter: blur(10px);
>           border-radius: 50%;
>           background-color: red;
>         "
>       ></div>
>       <div
>         style="
>           width: 50px;
>           height: 50px;
>           filter: blur(10px);
>           border-radius: 50%;
>           background-color: red;
>           animation: move 2s infinite linear;
>         "
>       ></div>
>     </div>
>   </body>
> </html>
> 
> ```

#### 滤镜：充电交融

> **filter**
>
> *blur：* 高斯模糊。效果同上。
>
> *contrast：* 对比度。效果同上。
>
> *hue-rotate：* 色相。颜色间转换，在色相盘上基于当前颜色旋转某个角度后得到一个新的颜色。
>
> ```html
> <html>
>   <head>
>     <style>
>       body {
>         display: flex;
>         background: black;
>         align-items: center;
>         justify-content: center;
>       }
>       @keyframes hueRotate {
>         0%, 100% {
>           filter: contrast(20) hue-rotate(0);
>         }
>         50% {
>           filter: contrast(20) hue-rotate(90deg);
>         }
>       }
>       @keyframes rotate {
>         from {
>           transform: rotate(0deg);
>         }
>         to {
>           transform: rotate(360deg);
>         }
>       }
>       @keyframes move {
>         from {
>           transform: translateY(0px);
>         }
>         to {
>           transform: translateY(-300px);
>         }
>       }
>       .core::after {
>         z-index: -1;
>         content: "";
>         width: 200px;
>         height: 200px;
>         display: block;
>         filter: blur(10px);
>         position: absolute;
>         background: blue;
>         border-radius: 42% 38% 62% 49%/ 45%;
>         animation: rotate 8s infinite linear;
>       }
>       .core {
>         width: 180px;
>         height: 180px;
>         display: flex;
>         color: white;
>         font-size: 24px;
>         font-weight: bold;
>         position: relative;
>         background: black;
>         border-radius: 90px;
>         align-items: center;
>         justify-content: center;
>       }
>       .container {
>         gap: 200px;
>         width: 100%;
>         height: 100%;
>         display: flex;
>         background: black;
>         align-items: center;
>         flex-direction: column;
>         justify-content: center;
>         animation: hueRotate 10s infinite linear;
>       }
>       .footer {
>         z-index: -1;
>         width: 180px;
>         height: 60px;
>         position: relative;
>         background: blue;
>         border-radius: 90px;
>       }
>       .footer::after {
>         content: "";
>         width: 100%;
>         height: 50%;
>         display: block;
>         margin-top: 30px;
>         position: relative;
>         background: black;
>       }
>     </style>
>   </head>
>   <body>
>     <div class="container">
>       <div class="core">98.7%</div>
>       <div class="footer"></div>
>     </div>
>     <script>
>       const container = document.querySelector(".footer");
> 
>       const getValue = (str) => {
>         if (!str) {
>           return 0;
>         }
>         const st = str.indexOf("(") + 1;
>         const ed = str.indexOf(")") - 2;
>         return Number(str.slice(st, ed));
>       };
> 
>       const start = () => {
>         const bubbles = Array.from({ length: 10 }).map((_, index) => {
>           const div = document.createElement("div");
>           const radius = 30 - Math.random() * 5;
>           const offsetX = 10 + Math.random() * 150;
>           div.style.background = "blue";
>           div.style.borderRadius = "50%";
>           div.style.position = "absolute";
>           div.style.filter = "blur(10px)";
>           div.style.width = `${radius}px`;
>           div.style.height = `${radius}px`;
>           div.style.marginLeft = `${offsetX}px`;
>           div.style.animation = `move 3s linear ${index * 0.6}s`;
>           return div;
>         });
>         bubbles.forEach((bubble, index) => {
>           container.append(bubble);
>           bubble.addEventListener("animationend", () => {
>             bubble.remove();
>           });
>         });
>       };
> 
>       start();
>       setInterval(start, 7000);
>     </script>
>   </body>
> </html>
> 
> ```

#### 滤镜：毛玻璃效果

> **backdrop-filter：** 
>
> *描述：* 对元素下方背景的滤镜
>
> *条件：* 元素下方存在背景，元素自身半透明
>
> ```html
> <html>
>   <body>
>     <div
>       style="
>         width: 300px;
>         height: 300px;
>         display: flex;
>         align-items: center;
>         justify-content: center;
>         background-color: green;
>       "
>     >
>       <div
>         style="
>           width: 100px;
>           height: 100px;
>           border-radius: 16px;
>           backdrop-filter: blur(10px);
>           background-color: rgba(255, 255, 255, 0.3);
>         "
>       ></div>
>     </div>
>   </body>
> </html>
> 
> ```

#### 滤镜：多背景重合

> **mix-blend-mode**
>
> 当前元素和父元素内容混合模式
>
> *multiple：* 多张图片叠加
>
> ```html
> <html>
> <body>
>  <div
>    style="
>      width: 300px;
>      height: 300px;
>      position: relative;
>      background: url(./1.jpg) no-repeat center/cover;
>    "
>  >
>    <div
>      style="
>        width: 300px;
>        height: 300px;
>        position: relative;
>        mix-blend-mode: multiply;
>        background: url(./2.jpg) no-repeat center/cover;
>      "
>    ></div>
>  </div>
> </body>
> </html>
> 
> ```

#### 滤镜：故障风格效果

> **background-blend-mode**
>
> 背景图片和背景颜色混合模式
>
> *lighten：* 每个像素混合为背景和背景颜色中最亮的
>
> *darken：* 每个像素混合为背景和背景颜色中最暗的 
>
> **mix-blend-mode**
>
> 当前元素内容和父元素内容混合模式
>
> ```html
> <html>
>   <head>
>     <style>
>       @keyframes move {
>         0% {
>           transform: translateX(-10px);
>         }
>         50% {
>           transform: translateX(0px);
>         }
>         100% {
>           transform: translateX(-10px);
>         }
>       }
>     </style>
>   </head>
>   <body>
>     <div
>       style="
>         width: 300px;
>         height: 300px;
>         position: relative;
>         background-blend-mode: lighten;
>         background: url(./1.jpg) no-repeat #0ff center/cover;
>       "
>     >
>       <div
>         style="
>           width: 300px;
>           height: 300px;
>           position: relative;
>           mix-blend-mode: darken;
>           background-blend-mode: lighten;
>           animation: move 30ms infinite ease-in;
>           background: url(./1.jpg) no-repeat #f00 center/cover;
>         "
>       ></div>
>     </div>
>   </body>
> </html>
> 
> ```

#### 滤镜：倒影效果

> **box-reflect：** 
>
> 实现图片轴对称。非兼容属性，FireFox不兼容。
>
> ```html
> 
> <html>
>   <body>
>     <style>
>       img {
>         width: 200px;
>         -webkit-box-reflect: below;
>       }
>     </style>
>     <img src="./1.jpg" />
>   </body>
> </html>
> 
> ```

#### 遮罩：手电筒效果

> **mask：**
>
> *描述：* mask透明部分不可见，不透明部分可见。
>
> *条件：* mask需要是图片或者渐变值。
>
> ```html
> <html>
>   <body>
>     <div style="height: 100%; background-color: green"></div>
>     <script>
>       const div = document.querySelector("div");
>       div.addEventListener("mousemove", (e) => {
>         div.style.mask = `radial-gradient(circle at ${e.offsetX}px ${e.offsetY}px, white 80px, transparent 100px)`;
>       });
>     </script>
>   </body>
> </html>
> 
> ```

#### 遮罩：人物防遮挡

> **mask：**
>
> *描述：* mask透明部分不可见，不透明部分可见。
>
> *实现：* 弹幕本身覆盖于video上方，由单独div层组成。只需要实时识别视频中人物，并制作人物蒙层(人物部分透明，其余部分填充颜色)作用到弹幕div层即可。

#### 阴影：多层阴影效果

> **box-shadow**
>
> *描述：* x方向偏移量，y方向偏移量，模糊半径，扩散半径，阴影颜色。
>
> *实现：* 多个阴影可以叠加形成多级阴影。
>
> ```html
> <html>
>   <body style="padding: 50px">
>     <div
>       style="
>         width: 300px;
>         height: 300px;
>         border-radius: 150px;
>         background: rgb(234, 204, 8);
>         box-shadow: 0px 0px 10px 10px rgb(241, 204, 37), 0px 0px 20px 20px rgb(233, 237, 19);
>       "
>     ></div>
>   </body>
> </html>
> 
> ```

#### 动画：鼠标移动高亮边框

>  **动画实现**
>
>  考察使用transform实现动画
>
>  *第一层：* 卡片内容
>
>  *第二层：* 白色背景(实现高亮)
>
>  *第三层：* 卡片容器
>
>  ```html
>  <html>
>  <head>
>    <style>
>      .card {
>        width: 30%;
>        margin: 6px;
>        height: 250px;
>        overflow: hidden;
>        border-radius: 8px;
>        position: relative;
>        background: gray;
>      }
>      .item {
>        z-index: 2;
>        inset: 2px;
>        display: flex;
>        color: white;
>        border-radius: 8px;
>        position: absolute;
>        background: black;
>        align-items: center;
>        justify-content: center;
>      }
>      .bck {
>        z-index: 1;
>        width: 100%;
>        height: 100%;
>        transition: 30ms;
>        position: absolute;
>        border-radius: inherit;
>        background-color: white;
>        transform: translate(-1000px, -10000px);
>      }
>    </style>
>  </head>
>  <body>
>    <div
>      style="gap: 6px; display: flex; flex-wrap: wrap; background: black"
>      onmouseMove="handleMouseMove(event)"
>    >
>      <div class="card card-1">
>        <div class="item item-1">card-1</div>
>        <div class="bck bck-1"></div>
>      </div>
>      <div class="card card-2">
>        <div class="item item-2">card-2</div>
>        <div class="bck bck-2"></div>
>      </div>
>      <div class="card card-3">
>        <div class="item item-3">card-3</div>
>        <div class="bck bck-3"></div>
>      </div>
>      <div class="card card-4">
>        <div class="item item-4">card-4</div>
>        <div class="bck bck-4"></div>
>      </div>
>      <div class="card card-5">
>        <div class="item item-5">card-5</div>
>        <div class="bck bck-5"></div>
>      </div>
>      <div class="card card-6">
>        <div class="item item-6">card-6</div>
>        <div class="bck bck-6"></div>
>      </div>
>    </div>
>    <script>
>      const bcks = document.querySelectorAll(".bck");
>      const cards = document.querySelectorAll(".card");
>      const cardsRect = Array.from(cards).map((card) => {
>        return card.getBoundingClientRect();
>      });
>      function handleMouseMove(e) {
>        cardsRect.forEach((rect, index) => {
>          const x = e.pageX - rect.x;
>          const y = e.pageY - rect.y;
>          const transformValue = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
>          bcks[index].style.transform = transformValue;
>        });
>      }
>    </script>
>  </body>
>  </html>
>  
>  ```

#### 动画：FLIP排序动画效果

> **FLIP动画**
>
> *First：* 记录起始位置
>
> *Last：* 记录终止位置
>
> *Invert：* 元素偏移到起始位置
>
> *Play：* 移除元素偏移并添加过渡
>
> **FLIP动画优点**
>
> 只需要指定操作，不需要计算固定偏移量。元素位置实时计算，不用预先指定位置。
>
> ```html
> <html>
>   <head>
>     <style>
>       .list {
>         margin: 50px;
>         padding: 12px;
>         width: fit-content;
>         border-radius: 12px;
>         border: 6px solid green;
>       }
>       .item {
>         height: 28px;
>         width: 200px;
>         display: flex;
>         color: black;
>         margin-block: 8px;
>         background: green;
>         border-radius: 14px;
>         align-items: center;
>         box-sizing: border-box;
>         justify-content: center;
>         border: 2px solid blue;
>       }
>     </style>
>   </head>
>   <body>
>     <div><button onclick="handleChange()">交换第一个</button></div>
>     <div class="list">
>       <div class="item" style="background: gold">item-1</div>
>       <div class="item" style="background: lemonchiffon">item-2</div>
>       <div class="item" style="background: yellow">item-3</div>
>       <div class="item" style="background: green">item-4</div>
>       <div class="item" style="background: lawngreen">item-5</div>
>       <div class="item" style="background: springgreen">item-6</div>
>     </div>
>     <script>
>       const handleChange = () => {
>         const container = document.querySelector(".list");
>         const list = Array.from(container.children);
>         // 重置
>         list.forEach((el) => {
>           el.style.transform = "none";
>           el.style.transition = "none";
>         });
>         const element = list[0];
>         // first：记录起点
>         const stRects = list.map((el) => el.getBoundingClientRect());
>         element.remove();
>         container.append(element);
>         // last：记录终点
>         const edRects = list.map((el) => el.getBoundingClientRect());
>         // invert：移动到start位置
>         list.forEach((el, index) => {
>           const diff = stRects[index].y - edRects[index].y;
>           el.style.transform = `translateY(${diff}px)`;
>         });
>         // play：播放动画时设置过渡，否则invert时也会产生动画效果
>         requestAnimationFrame(() => {
>           list.forEach((el) => {
>             el.style.transition = "2s";
>             el.style.transform = "none";
>           });
>         });
>       };
>     </script>
>   </body>
> </html>
> 
> ```

#### 渐变：动画多行文本打字机效果

> **单行打字机实现思路**
>
> 单行打字机效果实现简单，通过动画逐渐放宽文案宽度即可。
>
> **多行打字机实现思路**
>
> *思路：* 实现思路是文字遮罩，从不透明变成透明。
>
> *遮罩：* 遮罩通过覆盖一层相同的透明文字实现。
>
> *透明：* 透明度变化通过遮罩层渐变动画实现。
>
> **IFC**
>
> *遮罩：* 遮罩应该是行盒，因为行盒的样式(例如背景)会产生换行效果，并受行宽高影响。
>
> **Houdini**
>
> *变量动画：* CSS变量的变化无法触发动画，使用CSS-Houdini把变量转换成属性可以参与动画。
>
> **线性渐变**
>
> *渐变属性：* linear-gradient描述to right横向渐变。10%描述颜色渐变到10%。10%+30px表示下一个颜色从10%渐变到10%+30px。
>
> ```html
> <html>
> <head>
>  <style>
>    /* CSS变量转属性：只有属性才能参与动画 */
>    @property --p {
>      inherits: false;
>      initial-value: 0%;
>      syntax: "<percentage>";
>    }
>    body {
>      color: white;
>      background: black;
>    }
>    .container {
>      width: 600px;
>      margin: auto;
>      line-height: 24px;
>      letter-spacing: 2px;
>    }
>    .text {
>      color: transparent;
>      background: linear-gradient(
>        to right,
>        #0000 var(--p),
>        #000 calc(var(--p) + 30px)
>      );
>      animation: earse 3s linear forwards;
>    }
>    @keyframes earse {
>      from {
>        --p: 0%;
>      }
>      to {
>        --p: 100%;
>      }
>    }
>  </style>
> </head>
> <body>
>  <div class="container">
>    测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案
>  </div>
>  /* 文字渐变：透明到黑色 */
>  /* 渐变实现：原文字上覆盖一层相同的透明文字，使用背景渐变 */
>  <div class="container" style="position: relative; top: -192px">
>    <span class="text">
>      测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案
>    </span>
>  </div>
> </body>
> </html>
> 
> ```

#### 渐变：锯齿边缘效果

> **锥形渐变：**
>
> 锥形渐变，重复锥形渐变可以用于制作棋盘格。
>
> **线性渐变：**
>
> 线性渐变，线性渐变可以制作多个色差栅格。
>
> **渐变叠加：**
>
> 棋盘格锥形渐变叠加两个对角线的线性渐变，得到一小部分锯齿多边形。使用蒙层叠加取得部分交集。
>
> **裁剪：**
>
> clip-path裁剪出目标锯齿效果，其余部分丢弃。
>
> ```html
> <html>
>   <body>
>     <div
>       style="
>         width: 300px;
>         height: 300px;
>         background: url(./1.jpg) no-repeat center / cover;
>         mask: repeating-conic-gradient(red 0% 25%, transparent 25% 50%) 0 0 /
>             20% 20%,
>           linear-gradient(
>             45deg,
>             transparent 35%,
>             #000 25% 55%,
>             transparent 25%
>           ),
>           linear-gradient(
>             -45deg,
>             transparent 30%,
>             #000 25% 50%,
>             transparent 35%
>           );
>         -webkit-mask-composite: source-over, source-in;
>         clip-path: polygon(55% 35%, 85% 65%, 55% 95%, 25% 65%);
>       "
>     ></div>
>   </body>
> </html>
> 
> ```

#### 渐变：四角线框跟随移动

> **实现思路**
>
> *思路：* 四角边框可以参考鼠标移动高亮边框的多层级叠加；四角边框可以考虑使用锥形渐变。
>
> **锥形渐变**
>
> *方格：* 使用锥形渐变绘制四个角的方格。
>
> **遮罩**
>
> *遮罩：* 允许重复的锥形渐变产生四角方格，设置成滤镜对边框过滤。
>
> ```html
> <html>
>   <head>
>     <style>
>       body {
>         background: black;
>       }
>       .container {
>         display: flex;
>         flex-wrap: wrap;
>         justify-content: space-evenly;
>       }
>       .item {
>         width: 30%;
>         height: 300px;
>         cursor: pointer;
>         margin-top: 2.5%;
>         position: relative;
>         background-color: green;
>       }
>       .border {
>         transition: .2s;
>         position: absolute;
>         box-sizing: border-box;
>         width: calc(30% + 15px);
>         border: 5px solid white;
>         height: calc(300px + 20px);
>         transform: translate(-150%, -150%);
>         mask: conic-gradient(at 50px 50px, transparent 75%, red 75%) 0 0 /
>           calc(100% - 50px) calc(100% - 50px);
>       }
>     </style>
>   </head>
>   <body>
>     <div class="border"></div>
>     <div class="container">
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>       <div class="item"></div>
>     </div>
>     <script>
>       const border = document.querySelector(".border");
>       const container = document.querySelector(".container");
>       Array.from(container.children).forEach((el) => {
>         el.onmouseenter = (e) => {
>           const x = e.clientX - e.offsetX - 17.5;
>           const y = e.clientY - e.offsetY - 17.5;
>           border.style.transform = `translate(${x}px, ${y}px)`;
>         };
>       });
>     </script>
>   </body>
> </html>
> ```

#### 变换：0.5px线

> **box-shadow**
>
> **border-image线性渐变**
>
> **transform缩放**
>
> ```html
> <html>
> <style>
>  #div::after {
>    left: 0px;
>    bottom: 0px;
>    width: 100%;
>    height: 1px;
>    content: "";
>    display: block;
>    position: absolute;
>    background: #e3e4e5;
>    transform: scale(1, 0.5);
>  }
> </style>
> <body>
>  <div id="div" style="padding: 20px; width: 200px; position: relative">
>    <div
>      style="
>        height: 2.4em;
>        overflow: hidden;
>        line-height: 1.2em;
>        display: -webkit-box;
>        -webkit-line-clamp: 2;
>        -webkit-box-orient: vertical;
>      "
>    >
>      <span
>        >测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案</span
>      >
>    </div>
>  </div>
> </body>
> </html>
> 
> ```

#### 变换：卡片翻牌效果

> **实现思路**
>
> *结构：* 卡片容器内部包含正反面元素。
>
> *变换：* 翻牌时使卡片容器整体绕Y轴旋转。
>
> *结构：* 正面元素通过绝对定位覆盖在反面元素上面。
>
> **backface-visibility**
>
> 背面是否可见。3d变换时控制元素背面是否显示。
>
> **perspective**
>
> 观察者平面位置。0px的观察者平面无法产生3d效果。
>
> **transform-style**
>
> 子元素平面。父元素3d变换时设置preserve-3d指定子元素3d变换，否则无法正常显示。
>
> ```html
> <html>
>   <head>
>     <style>
>       .container {
>         margin: auto;
>         width: 200px;
>         height: 300px;
>         position: relative;
>         perspective: 1000px;
>       }
>       .container:hover .wrapper {
>         transform: rotateY(180deg);
>       }
>       .wrapper {
>         transition: 0.8s;
>         transform-style: preserve-3d;
>       }
>       .card {
>         width: 200px;
>         height: 300px;
>         cursor: pointer;
>         border-radius: 24px;
>       }
>       .front {
>         z-index: 1;
>         position: absolute;
>         background: green;
>         backface-visibility: hidden;
>       }
>       .back {
>         background: blue;
>         transform: rotateY(180deg);
>       }
>     </style>
>   </head>
>   <body>
>     <div class="container">
>       <div class="wrapper">
>         <div class="front card"></div>
>         <div class="back card"></div>
>       </div>
>     </div>
>   </body>
> </html>
> 
> ```

#### 变换：鼠标滚轮横向滑动轮播效果

> **实现思路**
>
> 滚轮竖向滚动触发横向滚动是由旋转变换90度得到。逆向旋转90度可以得到原始滚动容器。
>
> 滚动容器被内容撑起出现滚动，为抵消刚刚的旋转，子元素绝对定位后再正向旋转90度可得到该效果。
>
> **变换与滚动**
>
> 旋转变换不影响滚动行为
>
> **CSS属性与滚动**
>
> 元素在视觉上超出包含块即可触发包含块滚动
>
> ```html
> <html>
>   <head>
>     <style>
>       .container {
>         width: 500px;
>         margin: auto;
>         height: 300px;
>         overflow: hidden;
>         border-radius: 12px;
>         background: #e3e4e5;
>         border: 10px solid #e3e4e4;
>       }
>       .scroll-block {
>         width: 300px;
>         height: 500px;
>         overflow: auto;
>         position: relative;
>         transform-origin: 0 0;
>         transform: rotate(270deg) translateX(-300px);
>       }
>       .item {
>         flex: none;
>         width: 500px;
>         height: 300px;
>         border-radius: 12px;
>       }
>       .list {
>         left: 100%;
>         display: flex;
>         position: absolute;
>         transform-origin: 0 0;
>         transform: rotate(90deg);
>       }
>     </style>
>   </head>
>   <div class="container">
>     <div class="scroll-block">
>       <div class="list">
>         <div class="item" style="background: red"></div>
>         <div class="item" style="background: blue"></div>
>         <div class="item" style="background: green"></div>
>         <div class="item" style="background: gold"></div>
>         <div class="item" style="background: yellowgreen"></div>
>         <div class="item" style="background: pink"></div>
>         <div class="item" style="background: purple"></div>
>         <div class="item" style="background: paleturquoise"></div>
>         <div class="item" style="background: fuchsia"></div>
>         <div class="item" style="background: salmon"></div>
>       </div>
>     </div>
>   </div>
> </html>
> 
> ```

#### 滚动：长列表无缝轮播效果

> **效果描述**
>
> 大量轮播图。滑动滚轮切换轮播图，可以通过过渡动画实现上下循环切换。
>
> **实现思路**
>
> 视差加载。只保留三个节点，滚动是控制当前节点和相邻节点同时进行高度渐变动画模拟滚动。滚动结束后强制重置节点内容。
>
> ```html
> <html>
>   <head>
>     <style>
>       .card {
>         width: 100%;
>         height: 100%;
>       }
>       .container {
>         width: 100%;
>         height: 100%;
>         background: black;
>       }
>       .pre,
>       .nxt {
>         height: 0%;
>       }
>       .cur {
>         height: 100%;
>       }
>       .scroll-up > .cur {
>         height: 0%;
>         transition: 1.5s;
>       }
>       .scroll-up > .pre {
>         height: 100%;
>         transition: 1.5s;
>       }
>       .scroll-down > .cur {
>         height: 0%;
>         transition: 1.5s;
>       }
>       .scroll-down > .nxt {
>         height: 100%;
>         transition: 1.5s;
>       }
>     </style>
>   </head>
>   <body>
>     <div class="container">
>       <div class="pre card"></div>
>       <div class="cur card"></div>
>       <div class="nxt card"></div>
>     </div>
>     <script>
>       const data = ["red", "blue", "green", "gold", "pink", "purple"];
>       const container = document.querySelector(".container");
>       const [pre, cur, nxt] = container.children;
>       let curIndex = 0;
>       let lock = false;
> 
>       const init = () => {
>         cur.style.background = data[curIndex];
>         nxt.style.background = data[(curIndex + 1) % data.length];
>         pre.style.background = data[(curIndex + data.length - 1) % data.length];
>       };
> 
>       // 监听：滚动
>       window.addEventListener("wheel", (e) => {
>         if (lock) {
>           return;
>         }
>         lock = true;
>         if (e.deltaY > 0) {
>           container.classList.add("scroll-down");
>           curIndex = (curIndex + 1) % data.length;
>         } else {
>           container.classList.add("scroll-up");
>           curIndex = (curIndex + data.length - 1) % data.length;
>         }
>       });
> 
>       // 监听：动画结束
>       cur.addEventListener("transitionend", (e) => {
>         container.classList.remove("scroll-up");
>         container.classList.remove("scroll-down");
>         init();
>         lock = false;
>       });
> 
>       init();
>     </script>
>   </body>
> </html>
> 
> ```

#### 滚动：短列表无缝轮播效果

> **效果描述**
>
> 少量轮播图。点击按钮切换轮播图，可以通过过渡动画实现左右循环切换。
>
> **实现思路**
>
> 强制渲染。左右边界过渡动画处理，轮播列表左右插入额尾首节点，到达额外节点时立即强制渲染到原节点，再进行动画。
>
> ```html
> <html>
> <head>
>  <style>
>    .container {
>      margin: auto;
>      width: 500px;
>      height: 300px;
>      overflow: hidden;
>      position: relative;
>      border-radius: 16px;
>      background: #e3e4e5;
>      border: 10px solid #e3e4e5;
>    }
>    .btn {
>      z-index: 2;
>      opacity: 0;
>      width: 50px;
>      height: 50px;
>      cursor: pointer;
>      border-radius: 25px;
>      transform: translateY(-50%);
>      background: rgb(0, 0, 0, 0.15);
>    }
>    .btn:hover {
>      opacity: 1;
>    }
>    .list {
>      height: 100%;
>      display: flex;
>      transition: 0.5s;
>      transform: translateX(-500px);
>    }
>    .right {
>      top: 50%;
>      right: 20px;
>      position: absolute;
>    }
>    .left {
>      top: 50%;
>      left: 20px;
>      position: absolute;
>    }
>    .item {
>      flex: none;
>      height: 100%;
>      width: 500px;
>      cursor: pointer;
>      border-radius: 16px;
>    }
>  </style>
> </head>
> <body>
>  <div class="container">
>    <div class="btn left" onclick="handleLeft()"></div>
>    <div class="list">
>      <div class="item" style="background: green"></div>
>      <div class="item" style="background: red"></div>
>      <div class="item" style="background: blue"></div>
>      <div class="item" style="background: green"></div>
>      <div class="item" style="background: red"></div>
>    </div>
>    <div class="btn right" onclick="handleRight()"></div>
>  </div>
> </body>
> <script>
>  const list = document.querySelector(".list");
>  const length = list.children.length;
>  let index = 1;
> 
>  const handleLeft = () => {
>    index--;
>    if (index === 0) {
>      list.style.transform = `translate(-${(length - 1) * 500}px, 0px)`;
>      list.style.transition = "none";
>      // 强制渲染到最后一个  
>      list.clientHeight;
>      moveTo(length - 2);
>      index = length - 2;
>      return;
>    } else {
>      moveTo(index)
>    }
>  };
> 
>  const moveTo = (index) => {
>    list.style.transition = ".5s";
>    list.style.transform = `translate(-${index * 500}px, 0px)`;
>  };
> 
>  const handleRight = () => {
>    index++;
>    if (index === length - 1) {
>      list.style.transform = `translate(0px, 0px)`;
>      list.style.transition = "none";
>      // 强制渲染到第一个
>      list.clientHeight;
>      moveTo(1);
>      index = 1;
>    } else {
>      moveTo(index);
>    }
>  };
> </script>
> </html>
> 
> ```

#### 滚动：长列表虚拟列表效果

> 

#### 滚动：钉钉视差动画效果

> **实现思路**
>
> **坐标系**
>
> 常规动画坐标系是“time\*value”，视差动画坐标系是“position\*value”

#### 滚动：手机端列表惯性回弹效果

> 

#### 滚动：手机端列表上下拉刷新效果

> 

#### 滚动：手机端列表无限滚动效果

> 

### -------------------------------------------



#### 头像裁剪实现思路

#### 拖拽库实现思路与碰撞检测

#### CSS完美拖拽和碰撞检测
