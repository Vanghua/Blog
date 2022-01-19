@[toc](Grid布局练习-汇总)

# 骰子布局

```css
/*网格外层容器*/
.container{
			width: 90px;
			height: 90px;
			display: grid;
			grid-template-rows: repeat(3, 30px);
			grid-template-columns: repeat(3, 30px);
			background-color: grey; 
		}
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210317174208909.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NDY0ODc4,size_16,color_FFFFFF,t_70#pic_center)
```html
<div class="container" style="grid-template-areas: '. . .''. a .''. . .';">
	<div style="grid-area: a; background-color: black;"></div>
</div>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/2021031717442677.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NDY0ODc4,size_16,color_FFFFFF,t_70#pic_center)
```html
<div class="container" style="grid-template-areas: 'a . .''. b .''. . .'; ">
	<!-- 注意这里指定区域是给一个div块,所以划分的区域一定是长方形,像L型这样的就不可行 -->
	<div style="grid-area: a; background-color: black;"></div>
	<div style="grid-area: b; background-color: black;"></div>
</div>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210317174528410.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NDY0ODc4,size_16,color_FFFFFF,t_70#pic_center)
```html
<div class="container" style="grid-template-areas: 'a . b''. . .''c . d';">
	<div style="grid-area: a; background-color: black;"></div>
	<div style="grid-area: b; background-color: black;"></div>
	<div style="grid-area: c; background-color: black;"></div>
	<div style="grid-area: d; background-color: black;"></div>
</div>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210317174632499.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NDY0ODc4,size_16,color_FFFFFF,t_70#pic_center)
```html
<div class="container" style="grid-template-areas:'a a a''. b .''c . d';">
	<div style="grid-area: a; background-color: black;"></div>
	<div style="grid-area: b; background-color: black;"></div>
	<div style="grid-area: c; background-color: black;"></div>
	<div style="grid-area: d; background-color: black;"></div>
</div>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210317174727327.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NDY0ODc4,size_16,color_FFFFFF,t_70#pic_center)
注：上面的骰子布局都是通过划分小网格然后指定区域来实现布局的,现在要实现下面的多个错位色块布局,先思考了一下使用上面的方法,感觉存在一个不太方便的地方。上面是指定位置的方法,即给子元素设置grid-area属性。这无非两种可能,第一是指定某些相连的网格(可以给网格起名称或者利用span来指定跨网格数量),第二是指定起始线和终止线。这就是说网格就是最小的单位。所以我的网格必须足够小,才能满足指定区域的时候不会出现"需要跨半个网格,需要跨三分之一网格"这样的情况。网格越小管理越不便。所以这里试着使用一下在flex布局实战中用的嵌套,把复杂问题拆分成小块
```html
<div style="width: 100px; height: 100px; display: grid; grid-template-rows: repeat(2, 20%) 60%; color: white; font-size: 10px;">
	<!-- 嵌套形式是大容器里第一行为一个小grid容器,第二行也是单独的grid容器,第三行和第四行发现容易通过直接指定区域来进行实现,所以第三行和第四行作为一个grid容器 -->
	<div style="display: grid; grid-template-columns: repeat(2, 50%);">
		<div style="background-color: red;">50%</div>
		<div style="background-color: green;">50%</div>
	</div>
	<div style="display: grid; grid-template-columns: repeat(3, 1fr);">
		<div style="background-color: teal;">33%</div>
		<div style="background-color: yellow">33%</div>
		<div style="background-color: gold;">33%</div>
	</div>
	<div style="display: grid; grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(3, 1fr); grid-template-areas: 'a b c d' 'e e f f' 'e e f f';">
		<div style="background-color: pink; grid-area: a;">25%</div>
		<div style="background-color: purple; grid-area: b;">25%</div>
		<div style="background-color: blue; grid-area: c;">25%</div>
		<div style="background-color: black; grid-area: d;">25%</div>
		<div style="background-color: red; grid-area: e;">50%</div>
		<div style="background-color: green; grid-area: f;">50%</div>
	</div>
</div>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210317174915223.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NDY0ODc4,size_16,color_FFFFFF,t_70#pic_center)
```html
<div style="width: 100px; height: 90px; display: grid; grid-template-rows: repeat(3, 30%); color: white; font-size: 10px;">
	<div style="display: grid; grid-template-columns: 50% 1fr 1fr;">
		<div style="background-color: red;">50%</div>
		<div style="background-color: green;">自适应</div>
		<div style="background-color: blue;">自适应</div>
	</div>
	<div style="display: grid; grid-template-columns: 1fr 33.33%;">
		<div style="background-color: gold;">自适应</div>
		<div style="background-color: teal">33%</div>
	</div>
	<div style="display: grid; grid-template-columns: 25% 1fr 33.33%;">
		<div style="background-color: pink;">25%</div>
		<div style="background-color: black;">自适应</div>
		<div style="background-color: orange;">33%</div>
	</div>
</div>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210317175014303.png#pic_center)
```html
<div style="display: grid; grid-template-columns: 1fr 2fr 20px; width: 350px; height: 20px; font-size: 10px;">
	<p style="margin: 0px; padding: 0px; border: 1px solid black; border-right: 0px; border-radius: 2px 0px 0px 2px; text-align: center; line-height: 20px;">请输入位置信息</p>
	<input type="text" style="outline: none; border: 1px solid black;">
	<img src="./map.png" width="20px" height="20px" style="border: 1px solid black; border-left: 0px; border-radius: 0px 2px 2px 0px; display: block;">
</div>
```