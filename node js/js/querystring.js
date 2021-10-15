//  内置模块   转为对象的操作     parse()方法   将字符串转为对象形式

const qs = require("querystring")
const str = 'name=张三&age=18'
console.log(qs.parse(str));      