if (window.matchMedia("(min-width: 1360px )").matches) {
  $(".header__burger").on("click", function () {
    $(".header__burger").toggleClass("closed");
    $(".asside__bar").toggleClass("close");
  });
}
if (window.matchMedia("(max-width: 1360px ) and (min-width:830px)").matches) {
  $(".header__burger").removeClass("closed");
  $(".asside__bar").hide();
  $(".header__burger").on("click", function () {
    $(".header__burger").toggleClass("closed");
    $(".asside__bar").show().addClass("medium");
    $(this).on("click", function () {
      $(".asside__bar").removeClass("medium").addClass("close");
    });
    
  });
}

// if (window.matchMedia("(min-width: 1360px)").matches) {
//   $(".header__burger").on("click", function () {
//     $(".header__burger").toggleClass("active");
//     $(".asside__bar").toggleClass("active");
//   });
// }

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

  $("#menu").on("click", "a", function (event) {
    //отменяем стандартную обработку нажатия по ссылке
    event.preventDefault();

    //забираем идентификатор бока с атрибута href
    var id = $(this).attr("href"),
      //узнаем высоту от начала страницы до блока на который ссылается якорь
      top = $(id).offset().top;

    //анимируем переход на расстояние - top за 1500 мс
    $("body,html").animate({ scrollTop: top }, 1500);
  });
});
