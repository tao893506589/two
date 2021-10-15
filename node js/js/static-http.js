//  搭建一个静态服务器   进行文件的读取
// 前端请求后返回一些数据


// 需要用到的模块    文件  url  服务器    query string

const http = require("http")
const url = require("url")
const fs = require("fs")
const qs = require("querystring")


// 创建服务器
const server = http.createServer(function(req,res){
    console.log(req.url);
    console.log(url.parse(req.url,true));
    if(req.url.indexOf('/favicon.ico') === -1){ // 忽略掉icon图标的请求
        // 将得到的url进行判断     此时得到的req.url是一个字符串    可以使用字符串方法进行判断
        if(req.url.indexOf("/api")!=-1){    //  判断动态接口，   如果地址中有api就认为是动态接口，否则就认为是静态资源
            // get方式   传递过来的参数
            const urlStr = url.parse(req.url,true)          //  此时的urlStr就是一个json的对象
            console.log(urlStr.query);      //  打印这个json对象的query    里面存放着url?后的东西  并且生成为对象的形式

            // post方式   传递过来的参数
            // 因为post方式可以传递很多，所以要进行分批获取，利用一个桶  将请求分成几次放进桶内，然后依次进行解决
        //    let str = "";
        //     req.on("data",chunk=>{
        //         str+=chunk;
        //     })
        //     req.on("end",()=>{
        //         console.log(qs.parse(data));
        //     })
        }else{      // 静态资源
            // 三目运算，   判断请求的url是否是 /   是的话就返回此时的页面    不是的话就返回请求的地址   此时的req.url是具体的。
            let path = req.url ==='/'?"/a.html":req.url
            let data = fs.readFileSync("./www"+path,"utf-8")
            // console.log(123);
            res.write(data)
        }
        res.end()
    }
})
server.listen(8080)   // 监控8080端口
