XMLHttpRequest的open方法，在<<JavaScript高级编程>>和MDN也中也没有详细介绍，只是提到说使用xhr前应先open，然后提到了相关参数。网上有的博客说该方法是建立一个http连接，实则不然。本人做出以下测试：

目的：验证open方法是否会创建一个http连接   
猜想：

### 客户端代码
```html
<script>
    let xhr = new XMLHttpRequest()
    xhr.open("get", "/test")
    // xhr.send()
</script>
```

### 服务端代码
```javascript
let http = require("http")
let fs = require("fs")
let fss = fs.promises

http.createServer(function(req, res) {
    if(req.url.includes("html")) {
        fss.readFile("." + req.url).then(data => {
            res.writeHead(200, {
                "Content-Type": "text/html"
            })
            res.write(data)
            res.end()
        })
    } else if(req.url.includes("test")) {
        res.write("ok")
        res.end()
    }
}).listen(3000)
```