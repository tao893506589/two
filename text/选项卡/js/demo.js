$(function(){

    // 前端元素太多  动态添加元素
    let sum = 1
    for(var i = 0;i<11;i++){
        sum++
        $(`<li>${sum}</li>`).appendTo($("#shop .left"))
        $(`<div><a href="">${sum}</a></div>`).appendTo($("#shop .right"))
    }






    // 鼠标进入左边时  让右边的选项显示
  var lis = $("#shop .left li");
  var divs = $("#shop .right div")
  $(lis).mouseenter(function(){
      var $num = $(this).index();
      $("#shop #play").css('display','none')
      // $("#shop .right div").css('display','none')
      $("#shop .right div").eq($num).css('display','block').mouseenter(function(){
          $(this).css('display','block');
          $("#shop #play").css('display','none')

      })
  }).mouseout(function(){
      $("#shop #play").css('display','block')
      $("#shop .right div").css('display','none').mouseout(function(){
          $(this).css('display','none');
          $("#shop #play").css('display','block')
      })
  })
})




