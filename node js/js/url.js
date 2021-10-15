//   url 的内置模块    处理url字符串
const url = require("url")
let urlstr = "https://localhost:8080/a.html?username=haha&password=123"
/*
    url.parse()   转为一个url对象     第一个参数为地址   第二个参数为布尔值    可以查看信息  也可以调用
    url.parse().query   转为一个json对象    可以直接获取到?后的信息，返回的是一个对象   可以之间.属性名进行调用
    url.format(urlobj)   可以将urlobj转为urlstr

*/ 

// 获取url的一些信息
let urlobj = url.parse(urlstr,true);
console.log(urlobj,urlobj.query);



// 转为url的字符串形式
console.log(url.format({
    protocol: 'https:',
    slashes: true,
    auth: null,
    host: 'localhost:8080',
    port: '8080',
    hostname: 'localhost',
    hash: null,
    search: '?username=haha&password=123',
    query: { username: 'haha', password: '123' },
    pathname: '/a.html',
    path: '/a.html?username=haha&password=123',
    href: 'https://localhost:8080/a.html?username=haha&password=123'
}));
