# 1.准备服务器和资源
### 1.1 服务器代码
服务器使用nodejs环境，3000端口为web服务器，4000端口为应用服务器，使用CORS解决跨域问题。
```javascript
// server.js
let fs = require("fs").promises
require("http").createServer(function(req, res) {
    if(req.url.indexOf("B.html") !== -1) {
        fs.readFile("." + req.url).then(data => {
            res.writeHead(200, {
                "Content-Type": "text/html"
            })
            res.write(data)
            res.end()
        })
    }
}).listen(3000, err => {
    if(err)
        console.log(err)
    else
        console.log("run in 3000")
})

require("http").createServer(function(req, res) {
    if(req.url.indexOf("html") !== -1) {
        fs.readFile("." + req.url).then(data => {
            res.writeHead(200, {
                "Content-Type": "text/html",
                "Access-Control-Allow-Origin": req.headers.origin
            })
            res.write(data)
            res.end()
        })
    }
}).listen(4000, err => {
    if(err)
        console.log(err)
    else
        console.log("run in 4000")
})
```
### 1.2 资源代码
资源代码和服务器代码在同一个文件夹下，在资源代码中配合服务器使用CORS跨域，并向服务器请求另一个资源C.html，C.html随便写就行
```html
// B.html
<html>
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <script>
        let t1 = fetch("http://localhost:4000/C.html", {
            headers: {
                origin: "http://localhost:4000",
                connection: "keep-alive"
            },
            method: "get",
            credentials: "same-origin"
        }).then(res => res).then(console.log)
    </script>
</body>
</html>
```

# 2.抓包与分析
### 2.1 运行服务器程序
![](./assests/run.PNG)

### 2.2 打开浏览器访问指定资源
在访问浏览器前前先打开wireshark，选择loopBack虚拟网卡进行环路测试，过滤器设置为```tcp.port == 300 or tcp.port == 4000```
![](./assests/visit.PNG)

### 2.3 分析B.html获取
1. 先进行TCP三次握手(TCP连接建立的细节字段不是本次重点)，127.0.0.1的63395端口与127.0.0.1的3000端口建立TCP连接，就是如图所示的前三个TCP报文。 **(注：这个环路测试与访问互联网上的资源有所不同，详细见下解释)**
   ![](./assests/1.PNG)


2. 之后的三条报文表示进行了63396端口与3000端口的TCP连接，也是3次握手。 


3. 下一条报文表示HTTP报文，表示客户端向服务器请求资源，使用get方法，这个表示请求B.html的文档。点击详细内容发现，就是最初的63395端口向3000端口发送的HTTP请求。
    ![](./assests/1.1.PNG)


4. 紧接着下一条报文是TCP报文，长度64，数据部分长度为0，只有头部。这是一条确认报文，服务器发送给客户端，表示服务器已经接收到了客户端的HTTP请求。


5. 接下来两条报文实际是一起的，点开HTTP报文的详细内容。首先确认了是服务器3000端口向客户端63395端口发送的。之后发现这个报文占用了两个TCP报文进行传输。分别是上一条数据长度为1220的TCP报文，和当前HTTP报文所包含的TCP报文，数据部分长度为906。观察具体传输内容发现，传输的就是B.html的内容。
    ![](./assests/1.2.PNG)
    ![](./assests/1.3.PNG)


6. 接下来的一条TCP报文是客户端发给服务器表示客户端确认收到了HTTP请求的响应，是客户端63395端口向服务器3000端口发送。


7. 接下来三条报文属于下一个部分

### 2.4 分析C.html的获取
1. 首先三条TCP报文表示T客户端63397端口和服务端4000端口三次握手建立TCP连接。原因是刚刚客户端接收到B.html，完成解析与执行后（具体步骤参见“浏览器渲染原理”），脚本向服务器4000端口请求新的资源，所以先建立TCP连接。
    ![](./assests/2.PNG)


2. 接下来两条报文表示，客户端63397端口向服务器4000端口发送HTTP请求，请求C.html资源。紧接着服务器向客户端发送确认，表示已经收到HTTP请求。


3. 下面这条报文很特殊，是HTTP报文，是客户端的63395端口向服务器3000端口发送请求，请求B.html显示在浏览器标签栏的图标。这个请求比较靠后，是为了避免阻塞重要资源加载。这里可以看出HTTP1.1的特性，是持久连接的，仍旧使用63395端口和3000端口的TCP连接。


4. 下面两条报文就可以参考“B.html”中的分析，就是服务器的响应和客户端的确认


5. 下面四条报文表示客户端63397端口到服务器4000端口的TCP连接的释放。


### 2.5 分析HTTP1.1持久连接
1. 在2.4中已经遇到了第一个持久连接，就是最初的63395端口到3000端口的连接，该连接在上述报文分析中没有应用。


2. 如下截图表示了63396端口和3000端口的TCP连接的持久连接请求和最终维持一段时间后的释放，该连接用于服务器向客户端发送HTTP响应。
    ![](./assests/3.PNG)


3. 如下截图表示了最初的63395端口到3000端口的连接的持久连接请求，发现它一直没有释放，该连接用于客户端向服务端发送HTTP请求。
    ![](./assests/3.1.PNG)


### 2.6 在带有异步资源和多个AJAX请求的文档下重复实验
上面的代码只是给出了最简单的情况，可以进一步扩展探索，具体的代码和抓包分析演示就不再罗列了(否则内容过多)。   

结果：
1. 当存在异步资源时，例如上面2.4中的ico图标，或者文档中存在img图片，video视频等等，在**请求这些异步资源时会使用请求最初B.html所用的TCP连接**。当我们使用fetch实现AJAX时，会建立新的TCP连接，**当请求多时这些新的连接将会持久连接进行复用，由浏览器控制**。


2. **当存在6个以上的相同域名的TCP连接时，会被阻塞**。这里测试使用的是谷歌浏览器，谷歌浏览器所用的JavaScript是V8引擎，V8引擎的源码中规定了套接字池的最大值是6，最多在同一个域名的TCP连接下建立6个TCP连接。请求远大于6时，为了避免阻塞，浏览器会调控这6个TCP连接让其持久连接，而不是像2.4中直接释放。


3. 当在脚本中发起大量请求时，在wireshark中抓包发现是HTTP1.1的流水线工作形式，是一次性发出多个请求，不等待上一个请求的确认到达。

### 2.6 总结
在HTTP1.1中：

1. **(TCP复用规则)** 最初请求文档资源的TCP连接会让文档中请求异步资源的请求复用。脚本中的请求的TCP连接复用情况由浏览器控制，见下智能持久连接。


2. **(套接字限制)** V8引擎限制同一域名下的TCP连接数量是6.


3. **(智能持久连接)** 持久连接是“智能的”。最初请求资源的TCP连接会一直持久存在。脚本中的HTTP请求的TCP连接会由浏览器调控，当远超过6个时将会持久连接避免被阻塞。


4. **(流水线模式)** 测试中发现默认HTTP1.1使用了流水线模式。