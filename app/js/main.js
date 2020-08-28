if (window.matchMedia("(min-width: 1360px )").matches) {
  $(".header__burger").on("click", function () {
    $(".header__burger, .asside__bar").toggleClass("unactive");
  });
}
if (window.matchMedia("(max-width: 1360px ) and (min-width:830px)").matches) {
  $(".header__burger").removeClass("unactive");
  $(".asside__bar").addClass("unactive");
  $(".header__burger").on("click", function (event) {
    $(".header__burger").addClass("unactive");
    $(".asside__bar").removeClass("unactive");
    $(this).on("click", function () {
      $(".header__burger,.asside__bar").toggleClass("unactive");
    });
  });
}
if (window.matchMedia("(max-width: 830px )").matches) {
  $(".header__burger").removeClass("unactive");
  $(".asside__bar").addClass("unactive");
  $(".header__burger").on("click", function (event) {
    $(".header__burger").addClass("unactive");
    $(".asside__bar").removeClass("unactive");
    $("body").addClass("block");
    $(this).on("click", function () {
      $(".header__burger,.asside__bar").toggleClass("unactive");
      $("body").toggleClass("block");
    });
    $('.asside__bar-menu-list li a').on('click',function(){
      $(".header__burger").removeClass("unactive");
      $(".asside__bar").addClass("unactive");
      $("body").removeClass("block");
    })
  });
}

$(function () {
  (function () {
    "use strict";

    // define variables
    var items = document.querySelectorAll(".timeline li");

    // check if an element is in viewport
    // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
    function isElementInViewport(el) {
      var rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    }

    function callbackFunc() {
      for (var i = 0; i < items.length; i++) {
        if (isElementInViewport(items[i])) {
          items[i].classList.add("in-view");
        }
      }
    }

    // listen for events
    window.addEventListener("load", callbackFunc);
    window.addEventListener("resize", callbackFunc);
    window.addEventListener("scroll", callbackFunc);
  })();

  jQuery(document).ready(function () {
    /*MODIFICATION START*/
    jQuery(document).on("scroll", function () {
      if (jQuery("html,body").scrollTop() > jQuery(".skills").height()) {
        /*MODIFICATION END*/
        jQuery(".progress-bar").each(function () {
          jQuery(this)
            .find(".progress-content")
            .animate(
              {
                width: jQuery(this).attr("data-percentage"),
              },
              8000
            );

          jQuery(this)
            .find(".progress-number-mark")
            .animate(
              {
                left: jQuery(this).attr("data-percentage"),
              },
              {
                duration: 8000,
                step: function (now, fx) {
                  var data = Math.round(now);
                  jQuery(this)
                    .find(".percent")
                    .html(data + "%");
                },
              }
            );
        });
        /*MODIFICATION START*/
      }
    });
    /*MODIFICATION END*/
  });
  $(document).ready(function () {
    //Плавно прокручивает страницу до id-ка
    //Ссылка должна быть с id на якорь и классом prokrutkaslide.
    $(".scroll").click(function () {
      var el = $(this).attr("href");
      el = el.replace(/[^\#]*/, ""); //вытаскиваем id из ссылки
      $("body,html").animate(
        {
          scrollTop: $(el).offset().top,
        },
        2000
      );
      return false;
    });
  });
  $(document).ready(function() {

    //E-mail Ajax Send
    $("form").submit(function() { //Change
      var th = $(this);
      $.ajax({
        type: "POST",
        url: "../mail.php", //Change
        data: th.serialize()
      }).done(function() {
        alert("Thank you!");
        setTimeout(function() {
          // Done Functions
          th.trigger("reset");
        }, 1000);
      });
      return false;
    });
  
  });
});
