$(function () {
  const burgerMenu = document.querySelector(".header__burger"),
    assideBar = document.querySelector(".asside__bar"),
    menuButton = document.querySelectorAll(".asside__bar-menu-list li a");

  function closeAsside() {
    burgerMenu.classList.remove("unactive");
    assideBar.classList.add("unactive");
  }
  function openAsside() {
    burgerMenu.classList.add("unactive");
    assideBar.classList.remove("unactive");
  }

  function assideBarTriggle() {
    burgerMenu.addEventListener("click", () => {
      if (assideBar.classList.contains("unactive")) {
        openAsside();
      } else {
        closeAsside();
      }
    });
  }
  assideBarTriggle();

  if (window.matchMedia("(min-width: 1360px )").matches) {
    openAsside();
  }
  if (window.matchMedia("(max-width: 1360px ) and (min-width:830px)").matches) {
    openAsside();
  }

  if (window.matchMedia("(max-width: 830px )").matches) {
    closeAsside();
    const body = document.querySelector("body");
    burgerMenu.addEventListener("click", () => {
      body.classList.toggle("block");
    });
    menuButton.forEach((item) => {
      item.addEventListener("click", () => {
        closeAsside();
      });
    });
  }

  $(".portfolio__items.main").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow:
      '<button type="button" class="slick-btn slick-prev icon-arrow-left">',
    // /* Right btn */
    nextArrow:
      '<button type="button" class="slick-btn slick-next icon-arrow-right">',
    responsive: [
      {
        breakpoint: 1074,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          fade: true,
        },
      },
    ],
  });

  (function () {
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

  /*  Scroll to function (menu)*/

  const anchors = document.querySelectorAll("a.scroll");

  for (let anchor of anchors) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const blockID = anchor.getAttribute("href");
      document.querySelector(blockID).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }
  /* End Scroll to function */

  const forms = document.querySelectorAll("form");
  const message = {
    loading: "img/spiner.svg",
    succes: "Thanks, for contacting me. I will contact you soon!",
    failure: "Error.Please try again",
    input: "Please fill the form",
  };

  forms.forEach((item) => {
    postData(item);
  });

  function postData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMesage = document.createElement("img");
      statusMesage.src = message.loading;
      statusMesage.style.cssText = `
      display:block;
      margin: 0 auto;
      weidth:30px;
      height:30px;
      position:absolute;
      `;
      form.append(statusMesage);

      const request = new XMLHttpRequest();
      request.open("POST", "mail.php");
      // request.setRequestHeader('content-type', 'multipart/form-data');
      const formData = new FormData(form);
      request.send(formData);
      request.addEventListener("load", () => {
        if (request.status === 200) {
          console.log(request.response);
          showThanksModal(message.succes);
          form.reset();
          statusMesage.remove();
        } else {
          showThanksModal(message.failure);
        }
      });
    });
  }

  const modal = document.querySelector(".modal"),
    modalClose = document.querySelector("[data-close]");

  function closeModal() {
    modal.style.display = "none";
    document.body.classList.remove("block");
  }
  function openModal() {
    modal.style.display = "block";
    document.body.classList.add("block");
  }

  function ModelTriger() {
    const open = document.querySelector("[data-open]");
    open.addEventListener("click", openModal);

    modalClose.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }
  ModelTriger();

  function showThanksModal(message) {
    const prevModalBox = document.querySelector(".modal__dialog");
    modal.style.display = "block";
    prevModalBox.style.display = "none";
    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
          <div class="modal__content">
          <div class="modal__title">
          ${message}</div></div>
          `;
    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalBox.style.display = "block";
      modal.style.display = "none";
      closeModal();
    }, 4000);
  }

  // var mixer = mixitup(".portfolio__items");

  let offsetTop = $("#skills").offset().top;
  $(window).scroll(function () {
    var height = $(window).height();
    if ($(window).scrollTop() + height > offsetTop) {
      jQuery(".skillbar").each(function () {
        jQuery(this)
          .find(".skillbar-bar")
          .animate(
            {
              width: jQuery(this).attr("data-percent"),
            },
            3000
          );
      });
    }
  });
});
