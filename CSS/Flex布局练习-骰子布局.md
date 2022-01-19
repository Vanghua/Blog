@[toc](Flex布局练习-骰子布局)
学习来源：阮一峰的flex布局实战
# 骰子布局
```html
<style type="text/css">
        /*div1是父级元素*/
		.div1{
			height: 90px;
			width: 90px;
			background-color: grey;
			display: flex; 
			display: -moz-flex; 
			display: -webkit-flex;
			overflow: hidden;
		}
		/*div2是子元素*/
		.div2{
			height: 30px;
			width: 30px;
			background-color: black;
		}
	</style>
```
##### (1)单项目
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210308112916160.png#pic_center)
```html
<div class="div1" style="align-items: flex-end;">
	<div class="div2"></div>
</div>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210308112916158.png#pic_center)
```html
<div class="div1" style="justify-content: flex-end; align-items: flex-end;">
	<div class="div2"></div>
</div>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210308112916157.png#pic_center)
```html
<div class="div1" style="justify-content: flex-end; align-items: center;">
	<div class="div2"></div>
</div>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210308112916156.png#pic_center)
```html
<div class="div1" style="justify-content: center; align-items: flex-end;">
	<div class="div2"></div>
</div>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210308112916149.png#pic_center)
```html
<div class="div1" style="justify-content: center; align-items: center;">
	<div class="div2"></div>
</div>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210308112916139.png#pic_center)
```html
<div class="div1" style="justify-content: center;">
	<div class="div2"></div>
</div>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210308112916142.png#pic_center)
```html
<div class="div1" style="justify-content: flex-end;">
	<div class="div2"></div>
</div>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210308112916143.png#pic_center)
```html
<div class="div1" style="align-items: center;">
	<div class="div2"></div>
</div>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210308112916136.png#pic_center)
```html
<div class="div1">
	<div class="div2"></div>
</div>
```
##### (2)双项目
![在这里插入图片描述](https://img-blog.csdnimg.cn/2021030811520164.png#pic_center)
```html
<div class="div1" style="justify-content: space-between;">
	<div class="div2"></div>
	<div class="div2"></div>
</div>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/2021030811520168.png#pic_center)
```html
<div class="div1" style="flex-direction: column; justify-content: space-between;">
	<div class="div2"></div>
	<div class="div2"></div>
</div>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/2021030811520169.png#pic_center)
```html
<div class="div1" style="flex-direction: column; justify-content: space-between; align-items: center;">
	<div class="div2"></div>
	<div class="div2"></div>
</div>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/2021030811520165.png#pic_center)
```html
<div class="div1">
	<div class="div2"></div>
	<div class="div2" style="align-self: center;"></div>
</div>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210308115843403.png#pic_center)
```html
<div class="div1" style="flex-direction: column; justify-content: space-between; align-items: flex-end;">
	<div class="div2"></div>
	<div class="div2"></div>
</div>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210308115843404.png#pic_center)
```html
<div class="div1" style="justify-content: space-between;">
	<div class="div2"></div>
	<div class="div2" style="align-self: flex-end;"></div>
</div>
```

##### (3)三项目

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210308144029514.png#pic_center)
```html
<div class="div1">
	<div class="div2"></div>
	<div class="div2" style="align-self: center;"></div>
	<div class="div2" style="align-self: flex-end;"></div>
</div>
```

##### (4)四项目
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210308144350643.png#pic_center)
```html
<div class="div1" style="justify-content: space-between;">
	<div style="width: 30px; height: 90px; display: flex; flex-wrap: wrap; align-content: space-between;">
		<div class="div2"></div>
		<div class="div2"></div>
	</div>
	<div style="width: 30px; height: 90px; display: flex; flex-wrap: wrap; align-content: space-between;">
		<div class="div2"></div>
		<div class="div2"></div>
	</div>
</div>
```
	判断换行和使用嵌套：
	特别说一下上面的四项目，这个就是用到了嵌套。
	首先四个项目通过同方向且互相不重合的平移无法在一条直线上，
	这就表明了肯定不是通过不换行(flex-wrap)+项目自身侧轴对齐(align-self)这两个属性实现的。
	那就尝试一下用align-content+flex-wrap，通过换行来实现。align-content可以实现上下对齐的情况，
	但是考虑横向对齐时，不论怎样设置justify-content发现也无法实现上述效果。
	这里介绍了嵌套的思想，把第一行和第三行再看作是一个flex容器，这样就可以实现了。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210308144350640.png#pic_center)
```html
<div class="div1" style="flex-wrap: wrap; align-content: space-between;">
	<div class="div2"></div>
	<div class="div2"></div>
	<div class="div2"></div>
	<div class="div2"></div>
</div>
```

##### (5)六项目
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210308145454348.png#pic_center)
```html
<div class="div1" style="flex-wrap: wrap;">
	<div style="display: flex; width: 90px; height: 30px;">
		<div class="div2"></div>
		<div class="div2"></div>
		<div class="div2"></div>
	</div>
	<div style="display: flex; justify-content: center; width: 90px; height: 30px;">
		<div class="div2"></div>
	</div>
	<div style="display: flex; justify-content: space-between; width: 90px; height: 30px;">
		<div class="div2"></div>
		<div class="div2"></div>
	</div>
</div>
```
	很显然上面也是运用了嵌套的方法

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210308145454349.png#pic_center)
```html
<div class="div1" style="flex-wrap: wrap; align-content: space-between; flex-direction: column;">
	<div class="div2"></div>
	<div class="div2"></div>
	<div class="div2"></div>
	<div class="div2"></div>
	<div class="div2"></div>
	<div class="div2"></div>
</div>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210308145454354.png#pic_center)
```html
<div class="div1" style="flex-wrap: wrap; align-content: space-between;">
	<div class="div2"></div>
	<div class="div2"></div>
	<div class="div2"></div>
	<div class="div2"></div>
	<div class="div2"></div>
	<div class="div2"></div>
</div>
```

##### (6)九项目
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210308145903261.png#pic_center)
```html
<div class="div1" style="flex-wrap: wrap;">
	<div class="div2"></div>
	<div class="div2"></div>
	<div class="div2"></div>
	<div class="div2"></div>
	<div class="div2"></div>
	<div class="div2"></div>
	<div class="div2"></div>
	<div class="div2"></div>
	<div class="div2"></div>
</div>
```