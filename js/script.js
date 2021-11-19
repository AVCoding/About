
function openNav(e) {
  $(".left-sb-wrapper").css("left",  "0");
  $('body').addClass('disable-body-scroll');
}

function closeNav(e) {
  $(".left-sb-wrapper").css("left",  "-100%");
  $('body').removeClass('disable-body-scroll');
}

document.addEventListener(
  "click",
  function(event) { 
    event.stopPropagation();
    if (event.target.matches(".left-sb-wrapper") ) {
      closeNav();
    }
  }
)

$(document).ready(function(){
    // Mobile nav touch
    $('.left-sb-wrapper').on("swipeleft", closeNav);

    $('body').on("swiperight", function(){
      if ($(window).width() <= 768) {
        openNav();
      }
    });

    // Show test button
    $('.seller').on('click', function(){
      if ($(this).hasClass('sl-last')) {
        return;
      }
      else{
        $(this).removeClass('show').next().addClass('show');
      }
    });

	 $('.tools li, .soon li').on('click', function(){

    $('.tools li, .soon li').find('.check').removeClass('green-border');
    $('.tools li, .soon li').find('.check span').removeClass('green-bg');
    $('.tools li, .soon li').find('span').removeClass('green');

    $(this).find('.check').addClass('green-border');
    $(this).find('.check span').addClass('green-bg');
    $(this).find('span').addClass('green');

    // Change content
    $('.container .content').removeClass('show-content');
    $('.container .content[data-content='+ $(this).attr('class') +']').addClass('show-content');

	});


   // Countdown

      // Set the date we're counting down to
      var countDownDate = new Date("Jun 25, 2022 16:23:00").getTime();

      // Update the count down every 1 second
      var x = setInterval(function() {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id
        if (days < 10) {
          days = '0' + days;
        }
        if (hours < 10) {
          hours = '0' + hours;
        }
        if (minutes < 10) {
          minutes = '0' + minutes;
        }
        if (seconds < 10) {
          seconds = '0' + seconds;
        }
        $("#days").html(days);
        $("#hours").html(hours);
        $("#minutes").html(minutes);
        $("#seconds").html(seconds);

        // If the count down is finished, write some text 
        if (distance < 0) {
          clearInterval(x);

          $("#days").html('0');
          $("#hours").html('0');
          $("#minutes").html('0');
          $("#seconds").html('0');
          $("#countdown").html('ПУСК');
          $('.discount-wrapper').css('display','none');
          return;
        }
      }, 1000);

    // End Countdown

});

// Chat
$(function() {
  var INDEX = 0; 
  $("#chat-submit").click(function(e) {
    e.preventDefault();
    var msg = $("#chat-input").val(); 
    if(msg.trim() == ''){
      return false;
    }
    generate_message(msg, 'self');
    var buttons = [
        {
          name: 'Existing User',
          value: 'existing'
        },
        {
          name: 'New User',
          value: 'new'
        }
      ];
    setTimeout(function() {      
      generate_message(msg, 'user');  
    }, 1000)
    
  })
  
  function generate_message(msg, type) {
    INDEX++;
    var str="";
    str += "<div id='cm-msg-"+INDEX+"' class=\"chat-msg "+type+"\">";
    // str += "          <span class=\"msg-avatar\">";
    // str += "            <img src=\"https:\/\/image.crisp.im\/avatar\/operator\/196af8cc-f6ad-4ef7-afd1-c45d5231387c\/240\/?1483361727745\">";
    // str += "          <\/span>";
    str += "          <div class=\"cm-msg-text\">";
    str += msg;
    str += "          <\/div>";
    str += "        <\/div>";
    $(".chat-logs").append(str);
    $("#cm-msg-"+INDEX).hide().fadeIn(300);
    if(type == 'self'){
     $("#chat-input").val(''); 
    }    
    $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);    
  }  
  
  function generate_button_message(msg, buttons){    
    /* Buttons should be object array 
      [
        {
          name: 'Existing User',
          value: 'existing'
        },
        {
          name: 'New User',
          value: 'new'
        }
      ]
    */
    INDEX++;
    var btn_obj = buttons.map(function(button) {
       return  "              <li class=\"button\"><a href=\"javascript:;\" class=\"btn btn-primary chat-btn\" chat-value=\""+button.value+"\">"+button.name+"<\/a><\/li>";
    }).join('');
    var str="";
    str += "<div id='cm-msg-"+INDEX+"' class=\"chat-msg user\">";
    // str += "          <span class=\"msg-avatar\">";
    // str += "            <img src=\"https:\/\/image.crisp.im\/avatar\/operator\/196af8cc-f6ad-4ef7-afd1-c45d5231387c\/240\/?1483361727745\">";
    // str += "          <\/span>";
    str += "          <div class=\"cm-msg-text\">";
    str += msg;
    str += "          <\/div>";
    str += "          <div class=\"cm-msg-button\">";
    str += "            <ul>";   
    str += btn_obj;
    str += "            <\/ul>";
    str += "          <\/div>";
    str += "        <\/div>";
    $(".chat-logs").append(str);
    $("#cm-msg-"+INDEX).hide().fadeIn(300);   
    $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);
    $("#chat-input").attr("disabled", true);
  }
  
  $(document).delegate(".chat-btn", "click", function() {
    var value = $(this).attr("chat-value");
    var name = $(this).html();
    $("#chat-input").attr("disabled", false);
    generate_message(name, 'self');
  })
  
  $("#chat-circle").click(function() {    
    $("#chat-circle").toggle('scale');
    $(".chat-box").toggle('scale');
  })
  
  $(".chat-box-toggle").click(function() {
    $("#chat-circle").toggle('scale');
    $(".chat-box").toggle('scale');
  })  
})