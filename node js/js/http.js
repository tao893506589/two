//   原生的模块   服务器  http   提供文件的读写和建立web服务求等

const http = require("http")

// 创建server服务 
const server  = http.createServer(function(req,res){
    // 告知浏览以什么方式解析 
    res.writeHead("200",{
        "content-type":"text/html;charset=utf-8"
    })

    // 后端给浏览器返回的一些数据
    res.write("haha");

    // 最后结束响应
    res.end()
})


// 创建的服务需要有一个端口进行监听
server.listen(8080,function(){
    console.log("8080监听中.....");
})