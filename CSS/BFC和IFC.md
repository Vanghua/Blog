参考&翻译：https://www.w3.org/TR/CSS2/visuren.html 可视化盒模型

# 1.BFC

### 1.1 BFC概念：

BFC： Block Formatting Context 块级格式化上下文

### 1.2 BFC触发：

在某个元素上设置以下属性，那么该元素内部将成为一个BFC空间

1. overflow属性不是visible，通常设置为auto
2. float属性不是none
3. position属性不是relative和static
4. display为inline-block或table-cell或table-caption 

> Floats, absolutely positioned elements, block containers (such as inline-blocks, table-cells, and table-captions) that are not block boxes, and block boxes with 'overflow' other than 'visible' (except when that value has been propagated to the viewport) establish new block formatting contexts for their contents.

### 1.3 BFC布局规则：

1. **(布局规则)** 盒子一个接一个垂直排列，每个盒子的左边紧贴容器左边，都独占一行

   > In a block formatting context, boxes are laid out one after the other, vertically, beginning at the top of a containing block.
   >
   > Each box's left outer edge touches the left edge of the containing block (for right-to-left formatting, right edges touch).

2. **(外边距折叠)** 盒子间的空隙由margin决定，盒子垂直方向的margin会发生折叠行为

   > The vertical distance between two sibling boxes is determined by the 'margin' properties. Vertical margins between adjacent block-level boxes in a block formatting context collapse.

3. **(不会被float覆盖)** 内部开启BFC的元素不会被浮动元素覆盖
4. **(清除浮动)** 内部开启BFC的元素在计算高度时浮动元素也参与
5. **(独立空间)** BFC空间是一个独立空间，和外界和不干扰

注：1.3中提到的盒子都是块级盒子，BFC空间内可以有内联元素，行内块元素。但是会被匿名块级盒子(详情见下)包裹，参与BFC布局的都是块级盒子。

# 2.IFC

### 2.1 IFC概念：

IFC： Inline Formatting Context 内联格式化上下文

### 2.2 IFC触发：

在内联元素中布局时触发 (注：w3c没有给出IFC触发的条件，但是根据所给示例能够确定是在内联元素中布局时触发)

### 2.3 IFC布局规则：

1. **(布局规则)** 盒子一个接一个水平排列，在垂直方向上盒子的排列取决于对齐方式。
2. **(行框的宽高)** 每一行都存在一个行框，能够放下所有盒子，行框的高度是由盒子的高度和垂直对齐方式决定的，宽度是当前包含块的宽度减去浮动元素的宽度。
3. **(行框溢出)** 当盒子宽度超出了行框时，盒子的内容会被分割到下一个行框中。如果不允许换行或某些词无法分割，将会溢出行框。

注：2.3中提到的盒子都是内联盒子



# 3.可替换元素和不可替换元素

### 可替换元素：

这些元素的渲染效果是独立于css的，元素内容由标签类型和标签属性决定。比如video，img，iframe，input，textarea等等。这些元素实际上是通过web组件技术得来的，由不可替换元素组装得到，详情可以参考<<JavaScript权威指南(第7版)>>

**注：请注意网上会有错误说法，img是内联元素，是行内块元素等等。**

### 不可替换元素：

渲染效果由css控制，常用的元素基本上都是不可替换元素。比如div，p，span等等。



# 4.块级元素和块级盒子

### block-level elements(块级元素)：

源文档中被格式化为块的元素；块级元素会产生块级盒子

**举例：div，p是块级元素。**

### block-level boxes(块级盒子)：

元素的display是block(常用就是这个)；盒子自己参与BFC；

**举例：div，p在布局中产生块级盒子。**

### block container boxes(块级容器盒子)：

不可替代元素的display是block，inline-block(常用这两个)产生块级容器盒子；盒子后代参与BFC；内容只允许有块级盒子和内联盒子中的一种。

**举例：假设div，p产生的块级盒子中存在其它盒子，这些盒子的父元素可以称之为块级容器盒子。**

### anonymous block boxes(匿名块级盒子)：

由于块级容器盒子的限定，当块级盒子的后代中既有块级盒子又有内联盒子时，会自动生成匿名块级盒子包裹内联盒子

**举例：div产生的块级盒子中存在div和span，那么匿名块级盒子会包裹span产生的内联盒子。**

> 注：块级盒子和块级容器盒子也可以统称为block boxes
>
> 参考：https://www.w3.org/TR/CSS2/visuren.html#block-boxes



# 5.内联元素和内联盒子

### inline-level elements(内联元素)：

源文档中没有被格式化为块的元素；内联元素会产生内联盒子

**举例：span是内联元素。**

### atomic inline-level boxes(原子内联盒子)：

元素的display是inline，inline-block(主要就是这两个)会产生内联盒子；而且这些盒子自己会参与IFC；

### inline boxes(内联盒子)：

不可替代元素的display是inline(常用就是这个)产生原子内联盒子；盒子自己和后代都参与IFC；内容只允许有原子内联盒子一种。内联盒子是原子内联盒子的一种特例。

### anonymous inline boxes(匿名内联盒子)：

由于BFC限制，块级容器盒子中只能有块级盒子或者内联盒子的一种，当后代只有内联盒子时又出现了文本，会自动生成匿名内联盒子包裹文本；当原子内联盒子中出现块级盒子时，破坏了IFC，此时会在块级盒子出中断，然后块级盒子上下的内联盒子会自动被匿名内联盒子包裹。



# 6.BFC中的外边距折叠

> 参考：https://www.w3.org/TR/CSS2/box.html#collapsing-margins
>
> 下述规则为w3c文档的概述

### 不发生外边距折叠的情况：

1. **(防止兄弟元素外边距合并)** 设置了非默认值的float或position属性的元素(已经脱离文档流)不会和其它元素的外边距发生合并行为
2. **(BFC防止子元素外边距合并)** 开启了内部BFC环境的盒子不会和它在文档流中的孩子盒子发生外边距合并行为。
3. **(防止兄弟元素外边距合并)** display为inline-block的盒子不会和其它兄弟盒子发生外边距合并，也不会和自己的在文档流中的孩子盒子发生外边距合并。

### 发生外边距折叠的情况：

1. **(自己和子元素上外边距合并)** 一个在文档流中的块级盒子的上外边距会和它的第一个在文档流中的块级盒子孩子的上外边距合并。除非它设置了边框或上内边距或这个孩子上方有空隙。

2. **(自己下外边距和兄弟上外边距合并)** 一个在文档流中的块级盒子的下外边距总会和它的下一个在文档流中的块级盒子兄弟的上外边距合并。除非它的兄弟上方有空隙。

3. **(自己和子元素下外边距合并)** 一个在文档流中的块级盒子的height设置为auto时，它的下外边距会和它的最后一个在文档流中的块级盒子孩子的下外边距合并。除非它设置了边框或下内边距。

4. **(自己上下外边距合并)** 一个在文档流中的块级盒子min-height为0，且height为0或auto，且后代只有块级盒子(如果有后代)，且后代的外边距也发生塌陷(如果有后代(递归定义))，此时它自己的上下外边距合并。