@[toc](Flex布局练习-其它布局)
学习来源：阮一峰的flex布局实战

# 1.实现圣杯布局效果
```html
<style type="text/css">
	/*圣杯容器*/
	.HolyGail{
		height: 100px;
		width: 120px;
		display: flex;
		display: -webkit-flex;
		display: -moz-flex;
		flex-wrap: wrap;
		flex-direction: column;
	}
	/*头部导航栏*/
	header{
		height: 20px;
		background-color: red;
	}
	/*圣杯内部容器，容纳中间的三个竖栏*/
	.HolyGail-body{
		height: 60px;
		display: flex;
		display: -webkit-flex;
		display: -moz-flex;
		background-color: gold;
	}
	/*页面左边的导航栏*/
	.Holy-nav{
		flex: 0 0 20px;
		background-color: yellow;
	}
	/*页面中间的主栏*/
	.Holy-content{
		flex-grow: 1;
		background-color: blue;
	}
  	/*页面右边的广告栏*/
	.Holy-ads{
		flex: 0 0 20px;
		background-color: grey;
	}
	/*底部导航栏*/
	footer{
		height: 20px;
		background-color: green;
	}
</style>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/2021030815261137.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NDY0ODc4,size_16,color_FFFFFF,t_70#pic_center)
```html
<div class="HolyGail">
	<header></header>
	<div class="HolyGail-body">
		<nav class="Holy-nav"></nav>
		<main class="Holy-content"></main>
		<aside class="Holy-ads"></aside>
	</div>
	<footer></footer>
</div>
```
	如果是刚刚看完网格布局，再来看这个圣杯布局，就不需要过多解释了


# 2.输入框布局
```html
<style type="text/css">
	/*container指的是包裹提示信息，输入框，图标按钮的容器*/
	.container{
		display: flex;
		display: -webkit-flex;
		display: -moz-flex;
		width: 120px;
		height: 16px;
	}
</style>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/2021030815291476.png#pic_center)
```html
<div class="container">
	<span style="flex: 0 0 50px; font-size: 5px; display: inline-block; text-align: center; line-height: 14px; border: 1px solid black; border-right: 0px; box-sizing: border-box;">请输入您的地址</span>
	<input type="text" style="flex-grow: 1; border: 1px solid black; outline: none;">
	<div style="width: 16px; height: 16px; border: 1px solid black; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; border-left: 0px;">
		<img src="./launch/map.png" width="14px" height="14px" style="vertical-align: top;">
	</div>
</div>
```
	这上面采用的是P标签+input标签+div嵌套img标签来实现
	当时遇到的问题(不是布局相关):
	img在嵌套进div时发现上面总会有些间隙。
	解决问题:
	1.首先说明一下之前概念出错了，上了不知名网课导致概念乱讲。
	h5中元素分为inline 和 block(当然不全，会总结一个专题来捋清楚)。大多数人称为行内元素和块级元素。
	行内元素和块级元素具体区别在此不做赘述。
	只不过有一些行内元素宽度高度是可以设置的，如img，button等等
	注意：img不是inline-block元素(MDN原话)
	(上面是待解决问题)
	
	2.行内元素在垂直对齐上默认是按照文字基线baseline来对齐的，这也就是为什么顶部会有空隙的原因
	解决方案有很多。可以设置容器文字大小为0px，可以把img设置成块级元素，
	可以把img的垂直对齐方式设置为top等等

# 3.悬挂布局
```html
<style type="text/css">
	p{
		padding: 0px;
		margin: 0px;
	}
</style>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210308154924832.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NDY0ODc4,size_16,color_FFFFFF,t_70#pic_center)
```html
<div style="display: flex; flex-wrap: wrap; flex-direction: column; width: 300px; height: 300px; background-color: grey;">
	<p style="height: 30px;">Basic Examples</p>
	<div style="display: flex; height: 150px; width: 300px;">
		<div style="flex-grow: 1; padding: 10px; padding-right: 0px; display: flex;">
			<div style="flex: 0 0 16px; background-color: yellow;">
				
			</div>
			<div style="flex-grow: 1; background-color: purple;">
				
			</div>
		</div>
		<div style="flex-grow: 1; padding: 10px; display: flex;">
			<div style="flex: 0 0 16px; background-color: gold;">
				
			</div>
			<div style="flex-grow: 1; background-color: red;">
				
			</div>
		</div>
	</div>
```

	在这里也要再提一下，大多数时候使用flex布局会让你像上面一样项目之间具有间隙。
	可以这样解决
	1.设置好flex-basis的百分比之后再将justify-content调整为space-around或者space-between
	2.可以在项目之间设置空白占位项目
	3.可以设置margin，padding