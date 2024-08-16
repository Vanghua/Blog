**1.为什么使用webpack？**

> （1）提升项目运行效率。未编译的项目文件很多，直接运行会导致多次发起http请求来请求资源，运行效率较低。未编译的项目体积很大，代码中的空格换行回车占用了不少的内存，通过webpack打包可以压缩项目大小，甚至可以将项目文件编译后转化为浏览器可解析的压缩文件例如.gz文件，进一步压缩项目大小。
>
> （2）便于解决兼容性问题。例如有些低版本浏览器不支持ES6语法，现在浏览器引入module属性的脚本可以支持ES6语法，那么可以使用babel编译器解决这种问题。babel编译器可以在webpack中使用，webpack为解决兼容性的编译器提供了平台。



**2.Loader有什么作用？**

>（1）loader相当于编译器的功能。
>
>（2）例如babel-loader将ES6规范的JavaScript代码转为ES5规范的JavaScript代码。style-loader和css-loader将css转换为JavaScript字符串。
>
>（3）loader一般在webpack.config.js的module对象中的rules中进行配置，设置在遇到不同类型文件时使用哪一种loader。



**3.Plugin配置项有什么作用？**

> （1）plugin用于扩展webpack的功能。
>
> （2）例如html-webpack-plugin，打包后生成html文件，将打包的js文件自动引入。clean-webpack-plugin，打包时先清除上次打包的内容。mini-css-extract-plugin将打包后的css从js中抽离出来。



**4.项目部署时为什么要设置webpack的publicPath？**

> publicPath默认值是"/"，在开发模式下运行，默认将打包的项目放到webpack-dev-server服务器根目录下。在生产模式下运行，项目在dist文件下，publicPath应为"./"，在请求资源时会在dist文件夹下请求。



**5.在项目中用到了哪些webpack配置？**

> （1）在开发环境下配置devServer的proxy设置代理服务器地址。
>
> （2）在生产环境下配置publicPath，设置为相对路径，因为生产环境下项目打包进了dist文件夹，应在dist文件夹下请求资源。
>
> （3）在生产环境下配置plugin，引入compress-webpack-plugin，把打包后过大的js，css文件压缩为能被浏览器解析的.gz压缩文件。



**6.有哪些常用webpack配置？**

> （1）配置项目编译时模式mode，选择开发模式或生产模式
>
> （2）配置项目编译时入口entry，vue-cli搭建的项目中是main.js
>
> （3）配置项目编译后输出路径output，其中配置输出路径path和输出js脚本名称filename
>
> （4）配置项目编译时用到的编译器loader，在module中的rules数组中配置
>
> （5）配置项目编译时用到的插件plugin，在plugins数组中配置



**7.webpack对项目打包做了哪些优化？**

> （1）自己配置webpack，引入compression-webpack-plugin插件，打包时将过大的文件打包成.gz文件，.gz文件可以直接被浏览器解析。同时在代理服务器中开启gzip压缩。
>
> （2）vue-cli搭建项目时已经存在的配置webpack配置，当打包的文件过大时将文件拆分成若干个chunk文件，避免页面加载时一次性下载过大的文件造成阻塞。



**8.列举一些项目开发时常用的git指令？**

> （1）git add .：把所有文件从工作区添加到暂存区
>
> （2）git commit -m 注释：把暂存区的文件添加到当前head指向分支中 
>
> （3）git push 远程仓库地址 本地分支名 远程分支名：把本地仓库版本库中的当前分支提交给远程仓库目标分支
>
> （4）git fetch 远程仓库地址 远程分支名：把远程仓库目标分支下载到本地仓库的版本库中
>
> （5）git pull 远程仓库地址 远程分支名 本地分支名：把远程仓库目标分支下载到本地仓库的版本库中，并对本地对应分支的低版本修改进行覆盖
>
> （6）git merge 分支名：把本地仓库当前head指向的分支和fetch_head指向的分支进行合并
>
> （7）git stash：将当前未提交commit的修改缓存到栈中



**9.git提交时为什么会发生冲突，发生冲突该如何解决？**

> （1）发生冲突的原因是多个人修改同一个文件，提交时，有些人已经完成提交，你提交的版本落后于远程仓库上的版本。
>
> （2）解决冲突的办法是先使用git stash将当前修改放入缓存栈中，再使用git pull下拉合并远程仓库中的代码，此时自己的修改会被远程仓库的版本覆盖，再使用git stash pop或git stash apply用保存在缓存栈中的修改覆盖远程仓库的版本。



**10.说一下git中HEAD，工作树，索引之间的关系？**

> HEAD文件中包含当前分支的引用，HEAD指针指向分支指针，分支指针指向当前最新的commit提交。
>
> 工作树（工作区）是项目的目录结构。
>
> 索引（暂存区）用于存储工作区提交的文件。使用git add .将把工作区文件添加到索引中。



**11.git中如果提交时误操作，如何撤销提交?**

> （1）git reset HEAD -- 文件名全称带后缀。表示撤销git add .提交到索引的文件，不影响工作区
>
> （2）git reset --soft 版本号。表示回退到之前某一次的提交，先使用git log --oneline查看之前的commit提交记录以及版本号。回退之后只是修改了提交内容，不会修改工作区和索引的内容。
>
> （3）git reset --hard 版本号。表示回退到之前某一次的提交，和--soft操作类似，区别是除了提交记录的回退，工作区和索引也会回退。



**12.如何查看分支提交的历史记录？**

> 使用git log查看提交记录。
>
> （1）不添加任何参数会展示详细提交记录，按q退出
>
> （2）--oneline参数表示简洁化展示提交记录
>
> （3）-number参数表示查看最近的number个提交记录



**13.git merge和git rebase有什么区别？**

> git merge合并是添加一个新的提交记录，相当于合并原有分支和新分支的最后一次提交，创建一个新的提交记录。git rebase合并是找到原有分支和新分支的最早公共祖先，从此把新分支合并到老分支上，不创建新的提交记录。



**14.在项目开发中有些配置文件不希望被git提交，应该怎么做？**

> 创建.gitignore文件，在.gitignore文件中添加不希望被git提交的文件。



**15.如何把本地仓库的内容推向一个空的远程仓库？**

> （1）先添加远程仓库地址。git remote add origin xxx
>
> （2）提交本地仓库到远程仓库的目标分支。git push -u origin master。-u表示以后使用git push即默认指定把本地的master分支提交到远程仓库的master分支



**16.如何创建或切换git分支？**

> 切换分支：git checkout 分支名
>
> 创建分支：git branch 分支名