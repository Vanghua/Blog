@[toc](Grid 布局)
注：学习来源：菜鸟教程，MDN，阮一峰的博客

# Grid布局思想
注：这个部分和Flex布局总结一样，推荐去看阮一峰的博客(图画的好)，就不盗图了。[阮一峰的Grid布局](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)

# 父元素属性
	父元素上有18个属性
	display,grid-template-rows,grid-template-columns,grid-template-areas,grid-template,
	grid-auto-rows,grid-auto-columns,grid-auto-flow,grid,grid-row-gap,grid-column-gap,gap,
	justify-content,align-content,place-content,justify-items,align-items,place-items
##### (1)==display==:
说明：控制开启grid布局
取值：
* grid
* inline-grid：表示容器也就是父元素将会是行内元素
##### (2)==grid-template-rows和grid-template-columns==
说明：控制容器中网格的划分rows表示每行的高度，columns表示每列的宽度
取值：
* 像素值：略(就是设置宽高) grid-template-rows: 100px 60px 70px;表示有三行，宽度分别为这些值。
* 百分值：略(就是继承父元素容器的宽高) 规则同上。
* repeat：使用repeat可以快速设置宽高。
  
      repeat(3, 100px)表示有三行且每行行高为100px
      repeat(3, 100px 60px 80px)表示这个规则重复三次，表示有九行，每三行的行高为100px 60px 80px
      repeat(auto-fill,100px)表示行数不确定每行行高100px，此时可以给列数确定下来，这样就是列数一定的情况下，从左到右从上到下依次放置项目，直到放置完毕
* fr: 表示弹性系数，类似于flex布局中子元素的flex-grow。grid-template-rows: 1fr 2fr 2fr表示有三行，自动分配整个父元素的空间并按照1:2:2设置行高。当然repeat中也可以使用。
* minmax：设置为grid-template-rows为minmax(下界,上界)表示行高的取值范围为minmax
* auto：设置grid-template-rows和columns为auto表示自动调整网格的宽高，如果没有内容则塌陷。
* 可以设置网格线名称(配合grid-template-areas使用，指定项目占用网格的范围)：grid-template-rows：[r1] 100px [r2] 60px [r3] 80px [r4]三行产生4行级网格线。

##### (3)==grid-template-area==
说明：设置项目占用网格的范围
取值：
* 矩阵格式grid-template-area：'a a a' 'b b b' 'c c c'表示把一个3x3的网格区域分成三个部分，之后在子元素里指定对应的划分即可。要注意的是划分一定是长方形(div)，'a b b' 'b a a' 'c c c'这样a和b区域并不是一个长方形在子项目中指定对应的划分之后是无法对应上。要注意的另一点是'a . b' 'c . d' ' e e e'其中点表示不计入划分。

##### (4)==grid-template==
说明：是上面三个属性的便捷写法
取值：
grid-template：grid-template-rows | grid-template-columns | grid-template-area

##### (5)==grid-auto-rows和grid-auto-columns==
说明：表示设置自动生成的网格的行和列的参数。注：什么叫自动生成？这个牵扯到子元素属性中的属性，子元素可以指定自己位于某个网格处，如果这个网格超出了原来规划的网格范围，这时候就会自动生成网格，而这两个属性就是控制新生成的网格的高和宽。
取值：取值和grid-template-rows和columns取值一样就是没有repeat选项

##### (6)==grid-auto-flow==
说明：表示控制项目填充网格的规则
取值：
* row：先行后列将项目填充进网格
* row dense：先行后列将项目填充进网格，并尽量不留空网格。上面grid-template-areas中指出可以指定任意矩形区域填充项目。如果有些区域未指定就会出现空网格，那么如果后面的项目恰好能填进空网格，那么就优先填入填补空缺，之后再考虑先行后列的规则。
* column：先列后行将项目填充进网格
* column dense：解释和row dense一样，在尽可能填充空格的基础上进行先列后行填充。

##### (7)==grid==
说明：这是上述六个属性的缩写
取值：grid-template-rows | grid-template-columns | grid-template-areas | grid-auto-rows | grid-auto-columns | grid-auto-flow

##### (8)==grid-row-gap和grid-column-gap==
说明：控制网格之间的间隙
取值：
* 百分值
* 数值

##### (9)==gap==
说明：上述两个属性的缩写
取值：grid-row-gap | grid-column-gap

##### (10)==justify-items和align-items==
说明：表示网格内部内容的对齐方式，justify表示水平对齐方式，align表示垂直对齐方式。这两个命名和取值都和flex布局中对应的属性很相似。
取值：
* start：左对齐(上对齐)
* end：右对齐(下对齐)
* center：居中对齐
* stretch：拉伸占满整个网格

##### (11)==place-items==
说明：上述两个属性的简写
取值：justify-items | align-items

##### (12)==justify-content和align-content==
说明：表示所有网格在容器里的对齐方式，justify表示水平，align表示垂直对齐方式。
取值：
* start：左对齐(上对齐)
* end：右对齐(下对齐)
* center：居中对齐
* stretch：占满整个容器
* space-evenly：每个网格之间的间距相等
* space-around：网格之间距离相等，等于左右(上下)端网格到边框距离的两倍
* space-between：网格两端对齐，中间的网格之间距离相等

##### (13)==place-content==
说明：上述两个属性的简写
取值：justify-content | align-content

	父元素属性可以大致这样划分
	1.控制启动grid布局的属性：display
	2.控制划分网格的属性：grid-template-rows | grid-template-columns | grid-template-areas | grid-template
	3.控制填充网格规则的属性：grid-auto-rows | grid-auto-columns | grid-auto-flow | grid
	4.控制网格间隙的属性：grid-row-gap | grid-column-gap | grid-gap
	5.控制网格对齐的属性：justify-items | align-items | place-items | justify-content | align-content | place-content
# 子元素属性
	子元素上有10个属性
	grid-row-start,grid-column-start,grid-row-end,grid-column-end,grid-row,grid-column,
	grid-area,justify-self,align-self,place-self

##### （1）==grid-row-start和grid-column-start和grid-row-end和grid-column-end==
说明：start表示当项目填充到某些网格时，这些网格的起始横线和起始纵线。end表示终止线。
取值：
* 数值：表示第几条线，取值从1开始
* 名称：可以通过线的名称来指定起止线(不需要加引号)，之前在grid-template-rows和columns中设置过的。
* span m：表示跨过m个网格。通常都是指定起止线中的某一个，另一个用span加数值表示，表示从某个线开始跨过几个网格就是另一条线。

##### (2)==grid-row和grid-column==
说明：上述属性的缩写
取值：
* grid-row为 grid-row-start | grid-row-end    
* grid-column为 grid-column-start | grid-column-end  

##### (3)==grid-area==
说明：这个属性和父元素中的grid-template-areas对应，表示为当前项目指定填充到某些网格
取值：
* 区域名：这个不用加引号，这是在gridtemplate-areas中指定的矩形区域名，为子元素指定区域名，就表示当前子元素(项目)就会填充到对应区域的网格中
* 起止线：grid-row-start | grid-column-start | grid-row-end | grid-column-end

##### (4)==justify-self和align-self==
说明：表示网格内的对齐方式，为子元素指定这个属性将会覆盖父元素中的justify-items和align-items
取值：和父元素的justify-items和align-items相同

##### (5)==place-self===
说明：上述两个属性的简写
取值：justify-self | align-self

	子元素的属性可以大致这样划分：
	1.为子元素指定填充区域的属性：grid-row-start | grid-column-start | grid-row-end | grid-column-end | grid-row | grid-column | grid-area
	2.指定子元素内的对齐方式：justify-items | align-items | place-items