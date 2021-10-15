$(function(){

    var sum = 0;
    var time = null;
    var $yuan = $("#banner ol li")
    var $ul = $("#banner ul")


    // 启动定时器
    time = setInterval(function(){
        sum++
        dong()
    },2000)

    // 当鼠标进入盒子时  清楚定时器  离开在设置
    $("#banner").mouseenter(function(){
        clearInterval(time)
    }).mouseleave(function(){
        time = setInterval(function(){
            sum++
            dong()
        },2000)
    })




    // banner的变化封装成函数
    function dong(){
        $yuan.attr("class","").eq(sum).attr("class","a")
        if(sum === $yuan.size()){
            $yuan.eq(0).attr("class","a")
        }
        // 让ul动
        $ul.animate({
            top : -600*sum
        },500,function(){
            // 回到函数判断是否为最后一张
            if(sum === $yuan.size()){
                sum =0
                $ul.css("top",0)
            }
        })
    }
    // 点击小圆点，获取当前下标，赋给sum
    $yuan.click(function(){
        sum = $(this).index()
        dong()
    })


})