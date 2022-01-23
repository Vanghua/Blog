# 1.非持久的断点下载
###介绍：
在不关闭页面的情况下实现暂停，重传，暂停，重传...的行为。

###实现思路：
1. 使用的API是fetchAPI
2. 使用AbortController来终止Promise
3. 使用可控可读流和response.blob()实现多次暂停后的数据拼接，拼接操作blob()会完成，不需要自己写额外代码
4. 请求头维护Range字段，告知服务端已接收到的字节数


### 演示代码说明：
1. 演示代码以上传视频为例
2. 视频为mp4格式
3. 本地回路测试占用3000端口
### 客户端代码
```html
<button onclick="handleClick()">下载</button>
<button onclick="handleAbort()">终止请求</button>
<p>下载中</p>
<progress id="progress" value="0" ></progress>
<video id="video" style="display: block;" controls>
</video>
<script>
    let progress = document.querySelector("#progress")
    let video = document.querySelector("#video")
    let controller = null

    // 断点重传信息
    let sum = 0

    // 中断请求函数
    function handleAbort() {
        controller.abort()
    }

    // 发起请求函数
    function handleClick() {
        controller = new AbortController()
        let signal = controller.signal
        fetch("/test.mp4", {
            signal: signal,
            headers: {
                "Range": `bytes=${sum}`
            }
        })
            .then(res => {
                // 获取response.body的可读流的读锁
                let streamLock = res.body.getReader()
                // 进度条的总长度为数据总字节数
                progress.max = parseInt(res.headers.get("Content-Length"))
                // 创建可控可读流
                return new Response(new ReadableStream({
                    async start(control) {
                       while(true) {
                           // res.body.getReader().read()相当于调用异步迭代器的next()方法
                           let { done, value } = await streamLock.read()
                           if(done) {
                               // 可控可读流关闭
                               control.close()
                               break
                           } else {
                               // sum记录已读取的字节数，用于维护请求头的Range字段和进度条的进度
                               sum += value.length
                               progress.value = sum
                               // 加入可控可读流
                               control.enqueue(value)
                           }
                       }
                    }
                }))
            })
            .then(res =>  res.blob()) // response.blob可以自动拼接流中的数据，我们不需要处理分片
            .then(res => {
                // 下载完成后展示
                video.src = URL.createObjectURL(res)
            })
    }
</script>
```

### 服务端代码
```javascript
let fs = require("fs").promises
require("http").createServer((req, res) => {
    if(req.url.includes("html")) {
        fs.readFile("." + req.url).then(data => {
            res.writeHead(200, {
                "Content-Type": "text/html"
            })
            res.write(data)
            res.end()
        })
    } else if(req.url.includes("mp4")) {
        fs.readFile("." + req.url).then(data => {
            res.writeHead(200, {
                "Content-Type": "video/mp4",
                "Content-Length": data.length,
            })
            res.write(data)
            res.end()
        })
    } 
}).listen(3000)
```

# 2.大文件切片上传
### 2.1 客户端操作
1. 参考“客户端JavaScript的IO操作”打开文件
```javascript
// input文件选择事件，此函数对应input的onchange属性的绑定
function handleChanged() {
    // 获取打开的文件(input标签设置只能选择打开一个文件，所以是files[0])，file是全局变量。
    file = event.target.files[0]
    // 假设打开一个视频。在video标签中预览视频，video是video元素的引用，是全局变量。
    video.src = URL.createObjectURL(file)
}
```
2. 文件切片
```javascript
// 每一个切片大小限制为5MB
const SLICE_SIZE = 5 * 1024 * 1024
// 文件切片，传入的参数file是input标签打开的文件
function fileSlice(file) {
    let pos = 0
    let chunks = []
    while(pos < file.size) {
        // slice可以自动处理第二个参数越界
        chunks.push(file.slice(pos, pos + SLICE_SIZE))
        pos += SLICE_SIZE
    }
    return chunks
}
```
3. 为每个切片都创建一个进度条并插入DOM
```javascript
// progresses是全局变量，一个数组，用于存储这些进度条的引用
let progresses = []
// 为每一个切片创建一个进度条并插入DOM
function makeProgress(length) {
    let ar = []
    // 创建元素
    for(let i = 0; i < length; i ++) {
        let div = document.createElement("div")
        let span = document.createElement("span")
        span.textContent = `${file.name}-${i}切片`
        let progress = document.createElement("progress")
        progress.value = 0
        div.prepend(span)
        div.append(progress)
        ar.push(div)
    }
    // 插入DOM并更新切片进度条的引用
    ar.forEach((div, index) => {
        video.before(div)
        // progresses是全局变量，一个数组，用于存储这些进度条的引用
        progresses[index] = div.lastElementChild
    })
}
```
4. 切片进行并发上传，并且监听上传进度，为此封装一个特殊格式的网络请求。在监听进度时会更新进度条的进度信息。
```javascript
// 分片上传的网络请求的封装，最后一个参数为已经切好的文件片段数组，倒数第二个参数为这些分片共用的标识名称，就像IP数据报中的标识字段
function sliceRequestMaker(method, url, name, chunkList) {
    let promises = []
    chunkList.forEach((chunk, index) => {
        let xhr = new XMLHttpRequest()
        // 用promise封装xhr，以便于使用all方法，使用xhr而不用fetch是用于获取上传进度
        promises.push(new Promise((res, rej) => {
            xhr.open(method, url)
            let fd = new FormData
            // body为chunk分片和分片的序号和文件名称
            fd.append("chunk", chunk)
            fd.append("index", index)
            fd.append("name", name)
            // 监听每一个分片的上传事件，并记录上传进度，监听事件要在xhr.send之前
            xhr.upload.onprogress = function(event) {
                // progresses和progress都是全局变量，progress为总进度条元素的引用，progresses[index]为当前切片上传进度条的引用
                progresses[index].max = event.total
                progresses[index].value = event.loaded
                // 更新总进度条的进度为所有切片已上传的进度
                progress.value = progresses.reduce((a, b) => a + b.value, 0)
            }
            xhr.onload = function() {
                if(xhr.readyState === 4 && xhr.status === 200)
                    res(xhr.response)
                else
                    rej("请求失败")
            }

            xhr.send(fd)
        }))
    })
    return promises
}
```
5. 获取封装好的网络请求进行切片上传，上传完毕后再发送一个切片合并请求合并切片
```javascript
// 上传事件
async function handleUpload() {
    // 获取文件的切片
    let chunks = fileSlice(file)
    // 为每一个切片创建一个进度条
    makeProgress(chunks.length)
    // 更新总进度条总量
    progress.max = file.size
    // 获取封装好的网络请求数组，/sliceUpload是切片上传接口
    let promises = sliceRequestMaker("post", "/sliceUpload", file.name, chunks)
    // 并行处理
    await Promise.all(promises).then(console.log, console.log)
    // 最后发送一个合并分片请求，/sliceMerge是切片合并接口
    await fetch("/sliceMerge", {
        method: "post",
        body: JSON.stringify({
            // 携带内容时文件名，让服务端明确要合并哪个文件的所有切片
            name: file.name,
            // 携带此文件的分片大小，用于服务端读写依据
            size: SLICE_SIZE
        })
    })
}
```

### 2.2 服务端操作
1. 创建服务器，实现服务器基本功能。能够展示网页，并提前预留接口
```javascript
http.createServer(function(req, res) {
    if(req.url.includes("html")) {
        fs.readFile("." + req.url).then(data => {
            res.write(data)
            res.end()
        })
    } else if(req.url.includes("sliceUpload")) { // 分片上传接口
    } else if(req.url.includes("sliceMerge")) { // 分片合并接口
    }
}).listen("3000")
```
2. 实现分片上传接口，接收分片。在此使用multiparty包解析客户端FormData序列化的数据。
```javascript
// 设置一个promises全局变量，用于记录每个分片写入的完成情况，全部写入后才可合并
let promises = []
let multiparty = require("multiparty")
if(req.url.includes("sliceUpload")) { // 分片上传接口
    let form = new multiparty.Form()
    form.parse(req, async function (err, fields, files) {
        let chunk = files.chunk[0]
        let index = fields.index[0]
        let name = fields.name[0]
        // 处理分片，建立文件夹保存分片数据，进一步实现具体的分片处理函数
        let promise = await getSlices({chunk, index, name})
        promises.push(promise)
        // 清除该分片在C盘的缓存
        fss.unlinkSync(chunk.path)
        res.write("成功")
        res.end()
    })
}
```
2.1 进一步实现分片处理函数。分片处理函数的作用是将分片临时存储到临时文件夹中。
```javascript
// 处理分片函数
async function getSlices({chunk: chunk, index: index, name: name}) {
    // 在当前目录下创建一个存储分片文件的文件夹，在此之前先询问是否已存在此文件夹
    let path = "./" + name + "Temp"
    try {
        fss.statSync(path)
    } catch {
        await fs.mkdir(path)
    }
    //通过流读写，先从缓冲区读取分片信息
    let readStream = fss.createReadStream(chunk.path)
    let writeStream = fss.createWriteStream(path + "/" + index)
    readStream.pipe(writeStream)
    // 返回一个标识当前切片写入完成的promise。这样是应对一种情况，当合并请求被服务端接收时，分片写入仍未完成，那么必须等待写入完成后才能合并切片。
    return new Promise(res => {
        writeStream.on("finish", function() {
            res("完成")
        })
    })
}
```
3. 实现分片合并接口
```javascript
if(req.url.includes("sliceMerge")) { // 分片合并接口
    // 要合并某一个文件的分片，在此先获取这个文件的名称
    let data = ""
    req.on("data", function (chunk) {
        data += chunk
    })
    req.on("end", async function () {
        data = JSON.parse(data)
        // 等到所有切片都写入完成后再合并，还可以优化为一旦一个切片写入完成，那么立即合并一个
        // 这个promises就是上面第二步中提到的全局对象
        await Promise.all(promises)
        // 等到所有切片都合并完成后才能删除
        await Promise.all(await mergeSlice(data.name, data.size))
        // 合并完成后删除存储临时切片的文件夹
        await deleteSlice(data.name)
        promises = []
        res.write("ok")
    })
}
```
3.1 进一步实现分片合并函数
```javascript
// 合并分片函数，第一个参数是文件名，第二个参数是分片大小
async function mergeSlice(name, size) {
    // 该文件默认保存在以下路径中
    let path = name + "Temp"
    // 获取目录下的所有分片
    let files = await fs.readdir(path)
    // 分片命名时是按照顺序命名的，这里将其按从小到大排序
    files.sort()
    // promises用于记录每一个分片是否都被写入最终文件完成合并，当promises中的promise全兑现时服务端向客户端反馈完成。
    let promises = []
    // 临时存储分片的文件夹下的每一个分片都使用可读流读出，再统一写到一个新的文件
    files.forEach((filename, index) => {
        let readStream = fss.createReadStream(path + "/" + filename)
        let writeStream = fss.createWriteStream("./tt.mp4", {
            // 写流的写起点取决于分片大小(客户端传来的size)和分片的编号
            start: index * size
        })
        readStream.pipe(writeStream)
        promises.push(new Promise(res => {
            writeStream.on("finish", res)
        }))
    })
    return promises
}
```
3.2 进一步实现删除临时存储切片的文件夹函数
```javascript
// 删除临时存储切片的文件夹
async function deleteSlice(name) {
    // 该文件默认保存在以下路径中
    let path = name + "Temp"
    // 获取目录下的所有分片
    let files = await fs.readdir(path)
    // 删除切片文件
    let ps = []
    files.forEach(filename => ps.push(fs.rm(path + "/" + filename)))
    // 等待切片文件删除完成
    for await(let p of ps);
    // 文件夹为空时才可删除文件夹
    await fs.rmdir(path)
}
```

### 2.3 完整代码
### 网页代码
```html
<input style="display: none;" id="input" type="file" accept="video/mp4" onchange="handleChanged()"/>
    <button onclick="handleSelect()">选择文件</button>
    <button onclick="handleUpload()">上传</button>
    <p>上传进度</p>
    <progress value="0" id="progress"></progress>
    <video id="video" controls style="display: block;"></video>
    <script>
        let input = document.querySelector("#input")
        let video = document.querySelector("#video")
        let progress = document.querySelector("#progress")
        // 切片进度条的元素的引用
        let progresses = []
        let file = null
        // 每一个切片大小限制为5MB
        const SLICE_SIZE = 5 * 1024 * 1024

        // input文件选择事件
        function handleChanged() {
            file = event.target.files[0]
            video.src = URL.createObjectURL(file)
        }

        // 文件选择事件
        function handleSelect() {
            input.click()
        }

        // 为每一个切片创建一个进度条并插入DOM
        function makeProgress(length) {
            let ar = []
            // 创建元素
            for(let i = 0; i < length; i ++) {
                let div = document.createElement("div")
                let span = document.createElement("span")
                span.textContent = `${file.name}-${i}切片`
                let progress = document.createElement("progress")
                progress.value = 0
                div.prepend(span)
                div.append(progress)
                ar.push(div)
            }
            // 插入DOM并更新切片进度条的引用
            ar.forEach((div, index) => {
                video.before(div)
                progresses[index] = div.lastElementChild
            })
        }

        // 上传事件
        async function handleUpload() {
            // 获取文件的切片
            let chunks = fileSlice(file)
            // 为每一个切片创建一个进度条
            makeProgress(chunks.length)
            // 更新总进度条总量
            progress.max = file.size
            // 获取封装好的网络请求数组
            let promises = sliceRequestMaker("post", "/sliceUpload", file.name, chunks)
            // 并行处理
            await Promise.all(promises).then(console.log, console.log)
            // 最后发送一个合并分片请求
            await fetch("/sliceMerge", {
                method: "post",
                body: JSON.stringify({
                    name: file.name,
                    size: SLICE_SIZE
                })
            })
        }

        // 分片上传的网络请求的封装，最后一个参数为已经切好的文件片段数组，倒数第二个参数为这些分片共用的标识名称，就像IP数据报中的标识字段
        function sliceRequestMaker(method, url, name, chunkList) {
            let promises = []
            chunkList.forEach((chunk, index) => {
                let xhr = new XMLHttpRequest()
                // 用promise封装xhr，以便于使用all方法，使用xhr而不用fetch是用于获取上传进度
                promises.push(new Promise((res, rej) => {
                    xhr.open(method, url)
                    let fd = new FormData
                    // body为chunk分片和分片的序号和文件名称
                    fd.append("chunk", chunk)
                    fd.append("index", index)
                    fd.append("name", name)
                    // 监听每一个分片的上传事件，并记录上传进度，监听事件要在xhr.send之前
                    xhr.upload.onprogress = function(event) {
                        progresses[index].max = event.total
                        progresses[index].value = event.loaded
                        progress.value = progresses.reduce((a, b) => a + b.value, 0)
                    }
                    xhr.onload = function() {
                        if(xhr.readyState === 4 && xhr.status === 200)
                            res(xhr.response)
                        else
                            rej("请求失败")
                    }

                    xhr.send(fd)
                }))
            })
            return promises
        }

        // 文件切片
        function fileSlice(file) {
            let pos = 0
            let chunks = []
            while(pos < file.size) {
                // slice可以自动处理第二个参数越界
                chunks.push(file.slice(pos, pos + SLICE_SIZE))
                pos += SLICE_SIZE
            }
            return chunks
        }
    </script>
```

### 服务端代码
```javascript
let fs = require("fs").promises
let fss = require("fs")
let http = require("http")
let multiparty = require("multiparty")
// 存储切片写入的promise数组
let promises = []

http.createServer(function(req, res) {
    if(req.url.includes("html")) {
        fs.readFile("." + req.url).then(data => {
            res.write(data)
            res.end()
        })
    } else if(req.url.includes("sliceUpload")) { // 分片上传接口
        let form = new multiparty.Form()
        form.parse(req, async function(err, fields, files) {
            let chunk = files.chunk[0]
            let index = fields.index[0]
            let name = fields.name[0]
            // 处理分片，建立文件夹保存分片数据
            let promise = await getSlices({chunk, index, name})
            promises.push(promise)
            // 清除该分片在C盘的缓存
            fss.unlinkSync(chunk.path)
            res.write("成功")
            res.end()
        })
    } else if(req.url.includes("sliceMerge")) { // 分片合并接口
        // 要合并某一个文件的分片，在此先获取这个文件的名称
        let data = ""
        req.on("data", function(chunk) {
            data += chunk
        })
        req.on("end", async function() {
            data = JSON.parse(data)
            // 等到所有切片都写入完成后再合并，还可以优化为一旦一个切片写入完成，那么立即合并一个
            await Promise.all(promises)
            // 等到所有切片都合并完成后才能删除
            await Promise.all(await mergeSlice(data.name, data.size))
            // 合并完成后删除存储临时切片的文件夹
            await deleteSlice(data.name)
            promises = []
            res.write("ok")
        })
    }
}).listen("3000")

// 处理分片函数
async function getSlices({chunk: chunk, index: index, name: name}) {
    // 在当前目录下创建一个存储分片文件的文件夹，在此之前先询问是否已存在此文件夹
    let path = "./" + name + "Temp"
    try {
        fss.statSync(path)
    } catch {
        await fs.mkdir(path)
    }
    //通过流读写，先从缓冲区读取分片信息
    let readStream = fss.createReadStream(chunk.path)
    let writeStream = fss.createWriteStream(path + "/" + index)
    readStream.pipe(writeStream)
    // 返回一个标识当前切片写入完成的promise
    return new Promise(res => {
        writeStream.on("finish", function() {
            res("完成")
        })
    })
}

// 合并分片函数，第一个参数是文件名，第二个参数是分片大小
async function mergeSlice(name, size) {
    // 该文件默认保存在以下路径中
    let path = name + "Temp"
    // 获取目录下的所有分片
    let files = await fs.readdir(path)
    // 分片命名时是按照顺序命名的，这里将其按从小到大排序
    files.sort()

    let promises = []
    files.forEach((filename, index) => {
        let readStream = fss.createReadStream(path + "/" + filename)
        let writeStream = fss.createWriteStream("./tt.mp4", {
            start: index * size
        })
        readStream.pipe(writeStream)
        promises.push(new Promise(res => {
            writeStream.on("finish", res)
        }))
    })
    return promises
}

// 删除临时存储切片的文件夹
async function deleteSlice(name) {
    // 该文件默认保存在以下路径中
    let path = name + "Temp"
    // 获取目录下的所有分片
    let files = await fs.readdir(path)
    // 删除切片文件
    let ps = []
    files.forEach(filename => ps.push(fs.unlink(path + "/" + filename)))
    // 等待切片文件删除完成
    for await(let p of ps);
    // 文件夹为空时才可删除文件夹
    await fs.rmdir(path)
}
```

# 3.断点上传
