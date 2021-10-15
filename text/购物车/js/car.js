const { json } = require("stream/consumers");

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
                $(moban).appendTo($(".good_box ul"))
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
        if(frist){
            // 说明此时时第一次添加商品    创建cookie进行暂存   通过数组进行传递
            var arr = [{"id":id,"num":num,"img":img,"title":title}]
            $.cookie("good",JSON.stringify(arr),{
                raw:true,
                expires:7
            })
        }else{
            // 此时代表不是第一次添加    要判断商品是否存在
            // 先获取cookie的值   通过id进行判断
            var cookiestr = $cookie("good");
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
                cookiearr.push({"id":id,"num":num,"img":img,"title":title})
            }
            // 更新cookie
            $.cookie("good",JSON.stringify(cookiearr),{
                raw:true,
                expires:7
            })
        }



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
            for(var i = 0;i<cookiestr.length;i++){
                var carsshu = $(`
                    <li id='${cookieArr[i].id}'>
                        <div class = 'sc_goodsPic'>
                            <img src="${cookieArr[i].img}" alt=""/>
                        </div>
                        <div class = 'sc_goodsTitle'>
                            <p>${cookieArr[i].title}</p>
                        </div>
                        <div class = 'sc_goodsBtn'>购买</div>
                        <div class = 'sc_goodsNum'>商品数量:${cookieArr[i].num}</div>
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
            var cookiestr = JSON.parse(cookiestr);
            var sum = 0;
            for(var i = 0; i<cookiestr.length;i++){
                sum += cookiearr[i].num;
            }
            $(".sc_num").html(sum);
        }else{
            $(".sc_num").html(0)
        }
    }





    

})