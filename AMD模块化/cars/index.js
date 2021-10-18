define(['parabola','jquery','jquery-cookie'],function(parabola,$){
    function index(){
        $(function(){
			carsData() //执行购物车显示数据的方法
			carsNum()  //执行购物车显示总数的方法

			// 异步请求获取后端的商品信息，拼接到页面中进行显示
			$.ajax({
				url:'../data/data.json',
				success:function(res){
					res.forEach(item => {
						var node = `
							<li class = 'goods_item'>
								<div class = 'goods_pic'>
									<img src="${item.img}" alt=""/>
								</div>
								<div class = 'goods_title'>
									<p>${item.title}</p>
								</div>
								<div class = 'sc'>
									<div id = '${item.id}' class = "sc_btn">加入购物车</div>
								</div>
							</li>
						`
						$(node).appendTo('.goods_box ul')
					});
				}
			})


			// 点击按钮，进行添加商品到购物车操作(后续异步获取的数据希望有点击时间，需要通过事件委托方式实现)
			$('.goods_box ul').on('click','.sc_btn',function(){
				/*
					加入购物车 --> 商品的id是不一样的
					需要往cookie只存储购物车的数据
					[{id:0,title:'大闸蟹',img:'xxx',num:1},{xxx}]
				*/
				// 调用抛物线动画方法
				ballMove($(this))

				var first = $.cookie('goods') === null ? true : false 
				var id = this.id
				var img = $(this).closest('li').find('.goods_pic img').attr('src')
				var title = $(this).closest('li').find('.goods_title p').html()
				if(first){ //代表第一次添加商品
					// $.cookie('goods',`[{"id":,"num":1,"img":,"title":}]`)
					var arr = [{"id":id,"num":1,"img":img,"title":title}]
					$.cookie('goods',JSON.stringify(arr),{
						raw:true,
						expires:7
					})
				}else{ // 如果不是第一次添加商品，需要判断cookie中是否存在此商品
					var cookieStr = $.cookie('goods')
					var cookieArr = JSON.parse(cookieStr)
					var same = false  //假设cookie中没有此商品
					for(var i=0;i<cookieArr.length;i++){
						if(cookieArr[i].id === id){ //添加的是同一个商品
							same = true
							cookieArr[i].num++
							break;
						}
					}
					if(!same){ // 代表cookie中没有跟传递的id一样的商品
						cookieArr.push({"id":id,"num":1,"img":img,"title":title})
					}
					// 更新新的cookie数组
					$.cookie('goods',JSON.stringify(cookieArr),{
						raw:true,
						expires:7
					})
				}
				// 需要调用更新购物车的数据
				carsData()
				carsNum()
			})
		
		
			/*
				加载右侧购物车的数据
				从cookie的goods中获取数据
			*/
			function carsData(){
				// 需要清空上一次加载的数据
				$('.sc_right ul').empty()
				var cookieStr = $.cookie('goods')
				if(cookieStr){
					var cookieArr = JSON.parse(cookieStr)
					for(var i=0;i<cookieArr.length;i++){
						var node = $(`<li id='${cookieArr[i].id}'>
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
						</li>`)
						node.appendTo($('.sc_right ul'))
					}
				}
			}

			/*
				计算商品的总数
			*/
			function carsNum(){
				var cookieStr = $.cookie('goods')
				if(cookieStr){
					var cookieArr = JSON.parse(cookieStr)
					var sum = 0
					for(var i=0;i<cookieArr.length;i++){
						sum += cookieArr[i].num
					}
					$('.sc_num').html(sum)
				}else{
					$('.sc_num').html(0)
				}
			}

			// 右侧购物车添加移入移出事件 hover-->mouseover|mouseout
			$('.sc_right').mouseenter(function(){
				$(this).stop(true).animate({
					right:0
				},500)
			}).mouseleave(function(){
				$(this).stop(true).animate({
					right:-270
				},500)
			})

			// 抛物线运动的函数
			function ballMove(oBtn){
				// 将小球显示出来，并且小球的位置需要移动到oBtn添加购物车的位置
				$('#ball').css({
					display:'block',
					left:oBtn.offset().left + 30,
					top:oBtn.offset().top
				})

				// 计算抛物线运动的相对位置
				var X = $('.sc_right .sc_pic').offset().left - $('#ball').offset().left
				var Y = $('.sc_right .sc_pic').offset().top - $('#ball').offset().top

				// 调用插件的抛物线方法
				var bool = new Parabola({
					el:'#ball', //需要进行抛的物体
					// targetEl:'.sc_pic', //小球到达的位置(定位的时候如果使用left)
					offset: [X, Y], // 小球运动的相对的轨迹位置
					duration:600,   // 设置抛物线运动的时间
					curvature:0.0005, // 设置抛物线动画的曲度
					callback:function(){ // 抛物线运动完成后的回调函数
						$('#ball').hide()
					}
				})
				// 让ball小球开始发射
				bool.start()
			}

			// 清空购物车
			$('#removeCar').click(function(){
				$.cookie('goods',null)
				carsNum()
				carsData()
			})


			// 点击删除按钮
			$('.sc_right ul').on('click','.sc_deleteBtn',function(){
				// 获取删除的商品的id
				var id = $(this).closest('li').remove().attr('id')
				var cookieStr = $.cookie('goods')
				var cookieArr = JSON.parse(cookieStr)
				// 需要将cookie的对应的id商品进行删除
				for(var i=0;i<cookieArr.length;i++){
					if(cookieArr[i].id === id){
						cookieArr.splice(i,1) 
						break;
					}
				}
				// 判断数组是否为空
				if(!cookieArr.length){
					$.cookie('goods',null)
				}else{
					$.cookie('goods',JSON.stringify(cookieArr),{
						raw:true,
						expires:7
					})
				}
				// 更新购物车的数量
				carsNum()
			})

		
			// 点击加减操作
			$('.sc_right ul').on('click','button',function(){
				// 获取修改的商品的id
				var id = $(this).closest('li').attr('id')
				// 找到修改的商品cookie
				var cookieStr = $.cookie('goods')
				var cookieArr = JSON.parse(cookieStr)
				for(var i=0;i<cookieArr.length;i++){
					if(cookieArr[i].id === id){ // 点击的某一个商品，需要更改cookie里面的对应id商品的num值
						if($(this).html() === '+'){
							cookieArr[i].num++ 
							$(this).next().removeAttr("disabled"); // 只要增加商品，就需要让——按钮解除禁用状态
						}else{
							if(cookieArr[i].num === 1){
								// alert('数量为1，不能在减了')
								$(this).attr({"disabled":"disabled"});
								// 调用删除商品方法
							}else{
								$(this).removeAttr("disabled");
								cookieArr[i].num--
							}
						}
						// 设置页面最新数量
						$(this).prevAll('.sc_goodsNum').html('商品数量:'+cookieArr[i].num)
						// cookie更新
						$.cookie('goods',JSON.stringify(cookieArr),{
							raw:true,
							expires:7
						})
						break;
					}
				}
				// 重新计算购物车数量
				carsNum()
			})
		})
    }
    return {
        index
    }
})