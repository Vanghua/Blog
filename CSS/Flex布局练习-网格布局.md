@[toc](Flex布局练习-网格布局)
学习来源：阮一峰的flex布局实战
网格布局

```html
<style type="text/css">
		/*设置最外层父元素*/
		.div1{
			width: 100px;
			height: 100px;
			background-color: grey;
			display: flex;
			display: -moz-flex;
			display; -webkit-flex;
		}
		/*设置显示字体*/
		div{
			font-size:10px;
			color: white;
		}
	</style>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210308150430113.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NDY0ODc4,size_16,color_FFFFFF,t_70#pic_center)
```html
<div class="div1" style="flex-wrap: wrap; align-content: flex-start;">
	<div style="display: flex; width: 100px; height: 20px;">
		<div style="flex-grow: 1; background-color: red; height: 20px;">50%</div>
		<div style="flex-grow: 1; background-color: green; height: 20px;">50%</div>
	</div>
	<div style="display: flex; width: 100px; height: 20px;">
		<div style="flex-grow: 1; background-color: teal; height: 20px;">33%</div>
		<div style="flex-grow: 1; background-color: gold; height: 20px;">33%</div>
		<div style="flex-grow: 1; background-color: orange; height: 20px;">33%</div>
	</div>
	<div style="display: flex; width: 100px; height: 20px;">
		<div style="flex-grow: 1; background-color: pink; height: 20px;">25%</div>
		<div style="flex-grow: 1; background-color: purple; height: 20px;">25%</div>
		<div style="flex-grow: 1; background-color: blue; height: 20px;">25%</div>
		<div style="flex-grow: 1; background-color: black; height: 20px;">25%</div>
	</div>
	<div style="display: flex; width: 100px; height: 40px;">
		<div style="flex-grow: 1; height: 40px; background-color: red;">50%</div>
		<div style="flex-grow: 1; height: 40px; background-color: green;">50%</div>
	</div>
</div>
```
	上面的实现思路就是使用子元素属性中的flex-grow来实现，调整flex-grow值来设置属性
，![在这里插入图片描述](https://img-blog.csdnimg.cn/20210308150429754.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NDY0ODc4,size_16,color_FFFFFF,t_70#pic_center)
```html
<div class="div1" style="flex-wrap: wrap; align-content: flex-start; height:90px;">
	<div style="width: 100px; height: 30px; display: flex;">
		<div style="flex: 0 0 50%; height:30px; background-color: red;">50%</div>
		<div style="flex-grow: 1; height: 30px; background-color: green;">自适应</div>
		<div style="flex-grow: 1; height: 30px; background-color: blue;">自适应</div>
	</div>
	<div style="width: 100px; height: 30px; display: flex;">
		<div style="flex-grow: 1; height: 30px; background-color: orange;">自适应</div>
		<div style="flex-grow: 0; flex-shrink: 0; flex-basis: 33.3333%; height: 30px; background-color: teal;">33%</div>
	</div>
	<div style="width: 100px; height: 30px; display: flex;">
		<div style="height: 30px; background-color: pink; flex: 0 0 25%;">25%</div>
		<div style="height: 30px; background-color: black; flex-grow: 1;">自适应</div>
		<div style="height: 30px; background-color: gold; flex-grow: 0; flex-shrink: 0; flex-basis: 33.3333%;">33%</div>
	</div>
</div>
```
	上述案例是部分固定，剩余自适应。固定的话，设置flex-grow和flex-shrink都为0不参与放大和缩小，
	设置flex-basis为固定值即可。对于自适应的部分，将flex-grow调为1即可，会自动分配剩余空间。