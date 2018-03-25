$(document).ready(function (){
  (function bindInputFocusEvents() {
    $("input").focus(function (){
      $(this).prev("label").addClass("focus");
    });
    $("input").blur(function (){
      $(this).prev("label").removeClass("focus");
    });
    $("textarea").focus(function (){
      $(this).prev("label").addClass("focus");
    });
    $("textarea").blur(function (){
      $(this).prev("label").removeClass("focus");
    });
  })();
  
  var scroller = (function scroller(callback){
    var timer = 0;
    var speed = 0;
    var acceleration = 0.5;
    var fps = 60;
    
    function reset() {
      speed = 0;
      clearTimeout(timer);
    }
    
    function animate(target) {
      var targetId = $(target).data("target");
      var targetPosition = $("#" + targetId).offset().top === 0 ? 0 : $("#" + targetId).offset().top - 72;
      var currentPosition = $("html").scrollTop();
      var distance = targetPosition - currentPosition;
      
      if(distance >= 0) {
        speed += acceleration;
      } else {
        speed -= acceleration;
      }
      if(Math.abs(distance) <= Math.abs(speed)) {
        $("html").scrollTop(targetPosition);
        callback(target);
        reset();
      } else {
        $("html").scrollTop(currentPosition + speed);
        timer = setTimeout(animate, 1000 / fps, target);
      }
      // if(distance >= 0){
      //   speed += acceleration;
      //   if(distance <= speed) {
      //     $("html").scrollTop(targetPosition);
      //     callback(target);
      //   } else {
      //     $("html").scrollTop(currentPosition + speed);
      //     timer = setTimeout(animate, 1000 / fps, target);
      //   }
      // } else {
      //   speed -= acceleration;
      //   if(distance >= speed) {
      //     $("html").scrollTop(targetPosition);
      //     callback(target);
      //   } else {
      //     $("html").scrollTop(currentPosition + speed);
      //     timer = setTimeout(animate, 1000 / fps, target);
      //   }
      // }
    }
    
    function start(e) {
      e.preventDefault();
      reset();
      animate(this);
    }
    
    return start;
  })(handleNavigationActivity);
  
  (function bindNavigationClickEvents(){
    $("#mainNavbar ul li a").click(scroller);
  })();
    
  function handleNavigationActivity(target) {
    $(target).parent().siblings().removeClass("active");
    $(target).parent().addClass("active");
  }
});