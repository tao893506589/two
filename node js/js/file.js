// node.js   有三种引入方式      第一种为直接引用     第二种是先下载   在引用           第三种是加路径   在引用      都需要用到require()进行引用
//                              内置原生模块                第三方模块                  自定义模块

// 先看使用说明   配置环境

// 原生模块  ----file    文件的操作有两种  一种同步 readFileSync      另一种是异步 readFile


/*
    原生模块  文件操作  fs   的一些操作
        readFile()       异步请求文件    配合promise使用        三个参数  第一个为地址   第二个为编码方式   第三个为回调函数
        readFileSync()   同步请求文件       两个参数   第一个为路径   第二个为编码方式
        renameSync()     文件改名操作       两个参数   第一个为原来的文件名    第二个参数为修改后的文件名
        writeFileSync()     重写文件内容    两个参数   第一个参数为文件路径    第二个参数为要修改的内容
        appendFileSync()    添加文件内容    两个参数   第一个参数为要添加的文件路径        第二个为要添加的内容
        unlinkSync()        删除文件        参数为要删除的文件路径
        rmdirSync()         删除文件夹      参数为要删除的文件夹的路径    为空才可以删除
*/ 



// 引入模块 
const fs = require("fs");
// console.log(fs);


// 先将异步获取封装为函数
function getfile(url){
    return new Promise(function(resolve,reject){
        fs.readFile(url,"utf-8",function(err,date){     // 三个参数  第一个为地址   第二个为编码方式   第三个为回调函数
            if(!err){
                resolve(date)
            }
        })
    })
}



// 进行调用    调用html文件夹下的a.html文件

// 第一种方式   通过then
// getfile("../html/a.html").then(function(res){
//     console.log(res);
// })


// 第二种方式  通过立即函数     进行async 和await  进行捕获
// (async function(){
//     const res = await getfile("../html/a.html")
//     console.log(res);
// })()




// 文件的同步写法   在读完文件后还需要做一些别的操作的时候使用
// 后续代码可能出现问题  所以放在  try-catch语句中处理异常

// try{
//     const res = fs.readFileSync("../html/a.html","utf-8")
//     console.log(res);
// }catch(err){
//     console.log(err);
// }
// console.log(123);




// 文件夹的删除操作



// 判断文件夹是否为空的操作
// fs.readdir("./",function(err,data){   // readdir   只查找一层文件   第二个 参数为回调函数     回调函数中的err为出错时的信息
//     // 进行循环         此时的data存放的是./上一层文件形成的数组
//         data.forEach(function(value,index){     // 此时的value为获取到的文件名
//             fs.stat(`./${value}`,function(err,start){
//                 console.log(value +" is "+(start.isFile()?"file":"directory"));     // 通过isfile()进行判断是否为文件   要不然为文件夹
//             })          //   想要查询文件夹 中是否有文件时需要利用递归    得到结果后也可以集训进行判断然后删除文件或者文件夹 
//         })
// })
