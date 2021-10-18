

    // 使用define进行定义函数   闭包的结构   函数嵌套函数
    // 最后要对外暴露函数   return出去

define(function() {
    function add(x,y){
        return x+y
    }
    // 对外暴露add
    return {
        outadd:add
    }
});