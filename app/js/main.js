const assideBar = (menuSelector, assideBarSelector)=>{
  const  burger = document.querySelector(menuSelector),
         asside = document.querySelector(assideBarSelector),
         menuBtn = document.querySelectorAll(".asside__bar-menu-list li a");

     menuBtn.forEach(item =>{
      item.addEventListener('click', (e)=>{
        if (window.matchMedia("(max-width: 830px )").matches && burger.classList.contains('unactive')){
          burger.classList.remove('unactive');
          asside.classList.add('unactive');
          document.querySelector('body').style.overflow='';
        } 
      });
     });

     function menuTriggle (){
      if (window.matchMedia("(max-width: 1940px ) and (min-width:830px)").matches ){
        burger.classList.add('unactive');
        asside.classList.remove('unactive');

        burger.addEventListener('click', ()=>{
          if (burger.classList.contains('unactive')){
            burger.classList.remove('unactive');
            asside.classList.add('unactive');
          } else if (asside.classList.contains('unactive')){
            asside.classList.remove('unactive');
            burger.classList.add('unactive');
          }
        });
      }
      if (window.matchMedia("(max-width: 830px )").matches){
        burger.classList.remove('unactive');
        asside.classList.add('unactive');
        burger.addEventListener('click', ()=>{
          if (asside.classList.contains('unactive')){
            asside.classList.remove('unactive');
            burger.classList.add('unactive');
            document.querySelector('body').style.overflow = "hidden";
          } else if (burger.classList.contains('unactive')){
            burger.classList.remove('unactive');
            asside.classList.add('unactive');
            document.querySelector('body').style.overflow = "";
          }
        });
      }
     }
menuTriggle();

};
assideBar('.header__burger','.asside__bar');




  const scrolling = (upSelector)=>{
    const upBtn = document.querySelector(upSelector);
    window.addEventListener('scroll', ()=>{
      if (document.documentElement.scrollTop > 900){
        upBtn.classList.add('animate__animated', 'animate__fadeIn','animate__fast','animate__infinite');
        upBtn.classList.remove('animate__fadeOut');
      } else{
        upBtn.classList.add('animate__fadeOut');
        upBtn.classList.remove('animate__fadeIn','animate__fast','animate__infinite');
      }
    });


        // Scrolling with raf

        let links = document.querySelectorAll('[href^="#"]'),
        speed = 0.65;
    
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            let widthTop = document.documentElement.scrollTop,
                hash = this.hash,
                toBlock = document.querySelector(hash).getBoundingClientRect().top,
                start = null;

            requestAnimationFrame(step);

            function step(time) {
                if (start === null) {
                    start = time;
                }

                let progress = time - start,
                    r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : Math.min(widthTop + progress/speed, widthTop + toBlock));

                    document.documentElement.scrollTo(0, r);

                if (r != widthTop + toBlock) {
                    requestAnimationFrame(step);
                } else {
                    location.hash = hash;
                }
            }
        });
    });

    /* Pure js scrolling */

    // const element = document.documentElement,
    //       body = document.body;
    // const calcScroll = () => {
    //   upBtn.addEventListener('click', function (e){
    //     let scrollTop = Math.round(body.scrollTop || element.scrollTop);

    //     if (this.hash !== ''){
    //       e.preventDefault();
    //       let hashElement = document.querySelector(this.hash),
    //           hashElementTop = 0;
    //       while (hashElement.offsetParent){
    //         hashElementTop += hashElement.offsetTop;
    //         hashElement = hashElement.offsetParent;
    //       } 
    //       hashElementTop =Math.round(hashElementTop);
    //       smoothScroll(scrollTop,hashElementTop,this.hash); 

    //     }
    //   });
    // };  
    // const smoothScroll = (from, to, hash) =>{
    //   let timeInterval = 1,
    //       prevScrollTop,
    //       speed;
    //   if (to > from){
    //     speed = 8;
    //   } else{
    //     speed = -8;
    //   }    

    //   let move = setInterval(function (){
    //     let scrollTop = Math.round(body.scrollTop || element.scrollTop);
    //     if (
    //       prevScrollTop === scrollTop || (to > from && scrollTop >= to) || (to < from && scrollTop <= to)
    //     ){
    //       clearInterval(move);
    //       history.replaceState(history.state,document.title, location.href.replace(/#.*$/g,'')+hash);
    //     }else{
    //       body.scrollTop += speed;
    //       element.scrollTop += speed;
    //       prevScrollTop = scrollTop;
    //     }
    //   },timeInterval);
    // };    
    // calcScroll();
  };
   scrolling('.pageup');



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
  $(function () {
  try {
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
  } catch (e) {}

});
