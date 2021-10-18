//  在此模块使用add模块         define定义
define(["add"],function(add){       
    function jian(x,y){
        let totle = add.outadd(x,y)
        totle = totle - x - y
        return totle
    }
    return{
        outjian:jian
    }
})