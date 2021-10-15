$(function(){
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




