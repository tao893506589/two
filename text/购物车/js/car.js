$(function(){
    
    // 先利用ajax请求json数据

    $.ajax({
        type:"get",
        url:"../json/data.json",
        success:function(data){
            data.forEach(ele =>{   //  请求成功后通过循环上树
                var moban = `
                            <li class = 'goods_item'>
								<div class = 'goods_pic'>
									<img src="${ele.img}" alt=""/>
								</div>
								<div class = 'goods_title'>
									<p>${ele.title}</p>
								</div>
								<div class = 'sc'>
									<div id = '${ele.id}' class = "sc_btn">加入购物车</div>
								</div>
							</li>
                        `
                $(moban).appendTo($(".goods_box ul"))
            });
        }
    })








    // 点击事件    点击加入购物车按钮讲商品加入到购物车界面
    $(".goods_box ul").on("click",".sc_btn",function(){    //这里用到事件委托
        // 先将得到的数据取出来
        var first = $.cookie("good") === null?true:false;
        var id = this.id;
        var img = $(this).closest("li").find('.goods_pic img').attr("src")          //先向上找到li    然后在找到img    然后获取属性为src的值
        var title = $(this).closest("li").find('.goods_title p').html()             //先向上找到li   然后找到p标签   通过html()获取到内容

        // 进行判断是否第一次添加商品    在判断是否第一次添加该商品
        if(first){
            // 说明此时时第一次添加商品    创建cookie进行暂存   通过数组进行传递
            var arr = [{"id":id,"num":1,"img":img,"title":title}]
            $.cookie("good",JSON.stringify(arr),{
                raw:true,
                expires:7
            })
        }else{
            // 此时代表不是第一次添加    要判断商品是否存在
            // 先获取cookie的值   通过id进行判断
            var cookiestr = $.cookie("good");
            var cookiearr = JSON.parse(cookiestr);
            var one = false;   // 判断商品是否存在
            for(var i = 0;i<cookiearr.length;i++){
                if(cookiearr[i].id === id){
                    one = true;
                    cookiearr[i].num += 1;
                    break;
                }
            }
            if(!one){
                // 此时代表没有id与此时的cookie数据中一样的   则将数据添加到cookie中
                cookiearr.push({"id":id,"num":1,"img":img,"title":title})
            }
            // 更新cookie
            $.cookie("good",JSON.stringify(cookiearr),{
                raw:true,
                expires:7
            })
        }

        

    // 执行得到数据后的上树函数
    carshu()
    // 执行购物车数字的函数
    carnum()
    // 调用球的曲线
    qiu($(this))



    })

    // 右侧购物车的信息封装成一个函数
    function carshu(){
        // 每次将数据上树到购物车前要清空
        $(".sc_right ul").empty()
        // 获取cookie的数据
        var cookiestr = $.cookie("good");
        // 进行判断
        if(cookiestr){      //  判断此时的cookie是否有值，然后循环上树
            var cookiearr = JSON.parse(cookiestr);
            // console.log(cookiearr);
            for(var i = 0;i<cookiearr.length;i++){
                var carsshu = $(`
                    <li id='${cookiearr[i].id}'>
                        <div class = 'sc_goodsPic'>
                            <img src="${cookiearr[i].img}" alt=""/>
                        </div>
                        <div class = 'sc_goodsTitle'>
                            <p>${cookiearr[i].title}</p>
                        </div>
                        <div class = 'sc_goodsBtn'>购买</div>
                        <div class = 'sc_goodsNum'>商品数量:${cookiearr[i].num}</div>
                        <div class='sc_deleteBtn'>删除</div>
                        <button>+</button>
                        <button id='reduce'>-</button>
                    </li>
                `)
                carsshu.appendTo($(".sc_right ul"))
            }
        }

    }


    // 购物车数字的问题  封装为函数
    function carnum(){
        // 先获取cookie   然后循环将里面的数值加起来
        var cookiestr = $.cookie("good")
        if(cookiestr){   // 判断此时cookie是否为空  然后通过循环累加数据的每一个num值，最后赋值
            var cookiearr = JSON.parse(cookiestr);
            var sum = 0;
            for(var i = 0; i<cookiearr.length;i++){
                sum += cookiearr[i].num;
            }
            $(".sc_num").html(sum);
        }else{
            $(".sc_num").html(0)
        }
    }



    // 给右侧的购物车添加移入移除事件
    $('.sc_right').mouseenter(function(){
        $(this).stop(true).animate({
            right:0
        },500)
    }).mouseleave(function(){
        $(this).stop(true).animate({
            right:-270
        },500)
    })


    // 点击加入购物车时的一个曲线动画
    // 使用的是一个插件  需要new一个实例  并且传参
    function qiu(btn){
        // 先让球显示出来   显示在鼠标点击的位置
        $('#ball').css({
            display:'block',
            left:btn.offset().left + 30,
            top:btn.offset().top
        })
        // 计算球从点击的位置到购物车位置的曲线     因为此时的小球显示出来了   可以计算小球的位置    （也可以用传进来的参数的位置   待定）
        var X = $('.sc_right .sc_pic').offset().left - $('#ball').offset().left
        var Y = $('.sc_right .sc_pic').offset().top - $('#ball').offset().top


        // 因为使用的是插件   所以要用构造函数的用法   去new一个实例出来  
        var dong = new Parabola({
            el:'#ball', //需要进行抛的物体
            // targetEl:'.sc_pic', //小球到达的位置(定位的时候如果使用left)
            offset: [X, Y], // 小球运动的相对的轨迹位置
            duration:600,   // 设置抛物线运动的时间
            curvature:0.0005, // 设置抛物线动画的曲度
            callback:function(){ // 抛物线运动完成后的回调函数
                $('#ball').hide()
            }
        })
        // 调用球动起来的方法
        dong.start()
    }
    



// 购物车里面的按钮事件


    // 清空购物车按钮的操作
        $("#removeCar").click(function(){
            // 将cookie清空   然后执行封装的两个函数
            $.cookie("good",null);
            carshu();
            carnum()
        })
    


    // 购物车的删除按钮
        $(".sc_right ul").on("click",".sc_deleteBtn",function(){
            // 通过商品的id进行删除
            var id = $(this).closest("li").remove().attr("id")
            var cookiestr = $.cookie("good")
            var cookiearr = JSON.parse(cookiestr)
            // 通过循环判断    删除cookie中此商品的id
            for(var i = 0; i<cookiearr.length;i++){
                if(cookiearr[i].id === id){
                    cookiearr.splice(i,1);
                    break
                }
            }
            // 判断数组是否为空   空的话清除cookie   不为空就更新cookie
            if(!cookiearr.length){
                $.cookie("good",null)
            }else{
                $.cookie("good",JSON.stringify(cookiearr),{
                    raw:true,
                    expires:7
                })
            }
            // 更新购物车的数字显示
            carnum()
        })




    // 购物车中的加减操作
    $(".sc_right ul").on("click","button",function(){
        // 先获取需要修改的商品id   通过id进行操作
        var id = $(this).closest("li").attr("id")
        var cookiestr = $.cookie("good");
        var cookiearr = JSON.parse(cookiestr)
        // 通过循环判断id是否相同
        for(var i = 0;i<cookiearr.length;i++){
            if(cookiearr[i].id === id){
                // 判断点击的是哪个按钮
                if($(this).html() === '+'){
                    cookiearr[i].num++;
                    // 只要增加商品  就解除减少商品按钮的禁用状态
                    $(this).next().removeAttr("disabled")
                }else{
                    if(cookiearr[i].num === 1){
                        $(this).attr("disabled","disabled")
                    }else{
                        $(this).removeAttr("disabled")
                        cookiearr[i].num--
                    }
                }
            // 跟新页面的数量
            $(this).prevAll(".sc_goodsNum").html(`商品数量：${cookiearr[i].num}`)
            // 更新cookie
            $.cookie("good",JSON.stringify(cookiearr),{
                raw:true,
                expires:7
            })
            break
            }
        }
        // 更新购物车的数字信息
        carnum()
    })

})