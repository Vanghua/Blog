@[toc](Flex布局)
学习来源：runoob，阮一峰的flex布局
flex布局时flexible box缩写，可以称之为弹性布局。
# 注：下面略去了flex布局主轴侧轴的介绍，这方面可以直接去阮一峰介绍flex布局博客上看(图画的好）
# 1.CSS flex布局属性

## 启用flex布局
    选择一个容器，在容器上设置css样式
    display: flex;(设置flex默认生成块级元素，如果是inline-flex则是行内元素)
    display: -webkit-flex;
    display: -moz-flex;
##### (1)==display==
说明：这里指的是控制是否启用flex布局。前缀是为了适配不同内核的浏览器
<br>
## 容器上的属性
	容器上有6个属性:
	flex-direction,flex-wrap,flex-flow,justify-content,align-items,align-content

 ##### (1)==flex-direction==
 说明：控制主轴上项目的排列规则
 取值：
 * row: 默认值，默认主轴是横轴，方向是从左到右，项目沿着从左到右排列
 * row-reverse: 项目从右到左排列
 * column: 项目从上到下排列
 * column-reverse: 项目从下到上排列
##### (2)==flex-wrap==
说明：控制是否将所有项目排在一行(没有特别说明，下面都按主轴方向是默认值)
取值：
* nowrap: 默认值，不换行，若项目过多则对项目进行挤压排在一行
* wrap: 换行，下一行按照flex-direction排列规则排在下一行
* wrap-reverse: 换行，下一行按照flex-direction排列规则排在上一行

##### (3)==flex-flow==
说明：这是前两个属性的缩写
取值： flex-flow: flex-direction |flex-wrap

##### (4)==justify-content==
说明：控制项目在主轴方向上的对齐方式
取值：
* flex-start: 左对齐(主轴方向是默认值时)
* flex-between: 右对齐
* center: 居中对齐
* space-between: 左右对齐，其余项目之间间隔相等
* space-around: 每个项目两侧距离相等，所以项目之间的间隔比与边框的间隔大一倍

##### (5)==align-items==
说明：控制项目在侧轴方向上的对齐方式
取值：
* flex-start: 上对齐(侧轴是默认方向) 
* flex-end: 下对齐
* center: 居中对齐
* baseline: 按文字基线对齐
* stretch: 默认值，在侧轴上占满整个侧轴

##### (6)==align-content==
说明：控制换行时侧轴上的对齐方式(如果不换行那么使用align-items即可)
取值：
* flex-start: 上对齐
* flex-end: 下对齐
* center: 居中对齐
* space-between: 两端对齐，中间项目之间间隔相等
* space-around: 项目间间隔相等，所以项目之间间隔是与边框间隔的两倍
* stretch: 默认值，占满整个侧轴

## 子元素上的属性
	子元素就是指的上文中的项目，子元素也有6个属性：
	order,flex-grow,flex-shrink,flex-basis,flex,align-self

 ##### (1)==order==
 说明：项目的权重，权重小的排在前面
 取值： 数值
##### (2)==flex-grow==
说明：项目的放大比例
取值：数值。默认值为0，不参与放大。设置非0值会放大并按比例自动分配剩余空间。
常用方式：所有项目设置放大比例，则项目在主轴上的宽度将按照放大比例决定某些项目设置固定宽度，选择一个项目设置放大比例为1那么将参与缩放，自动占满剩余空间

##### (3)==flex-shrink==
说明：项目的缩小比例
取值：数值。默认值为1，当主轴控件不够且不换行，那么项目会按照设置的缩小比例压缩。设置为0则不参与缩小，保持原有宽度。
常用方式：和flex-grow共同在自适应布局中使用。设置放大比例和缩小比例为0再设置flex-basis固定值表示固定宽度栏，之后再设置一个项目放大比例为1作为自适应栏。

##### (4)==flex-basis==
说明：项目占据主轴的空间，优先级比width要高，会覆盖
取值：和width一样
常用方式：如上

##### (5)==flex==
说明：上述三个属性的简写
取值： flex-grow | flex-shrink | flex-basis。默认值为auto表示参照项目原有宽度
技巧取值：取值为auto(1 1 auto)或none(0 0 auto)为快捷设置

##### (6)==align-self==
说明：项目在侧轴上独立的对齐方式，如果是换行那么本属性不起作用
取值：和align-items一样