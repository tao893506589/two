define(['jquery'],function($){
    function banner(){
        $(function(){
            var $olBtns = $('#play ol li')
            var $ul = $('#play ul')
            var timer = null //定时器
            var iNow = 0  // 记录当前图片的下标
    
            // 启动定时器
            timer = setInterval(function(){
            iNow++
            tab()
            },2000)
    
            // 鼠标划入到play的时候，需要清除定时器
            $('#play').mouseenter(function(){
            clearInterval(timer)
            }).mouseleave(function(){
            timer = setInterval(() => {
                iNow++
                tab()
            }, 2000);
            })
    
    
            function tab(){
            $olBtns.attr('class','').eq(iNow).attr('class','active')
            if(iNow === $olBtns.size()){ //到最后一张了，让第一个按钮激活
                $olBtns.eq(0).attr('class','active')
            }
            // 让ul运动起来
            $ul.animate({
                top:-150*iNow
            },500,function(){
                // 判断是否是最后一张图片
                if(iNow === $olBtns.size()){
                iNow = 0
                $ul.css('top',0) 
                }
            })
            }
    
            // 点击按钮的时候，获取当前点击的下标index,赋值iNow
            $olBtns.click(function(){
            iNow = $(this).index()
            tab()
            })
        })
    }
    return {
        banner
    }
})