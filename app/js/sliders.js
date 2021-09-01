//Main slider
if (document.querySelector('.slider-main__body')) {
  new Swiper('.slider-main__body', {
    // Optional parameters
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 32,
    watchOverflow: true,
    speed: 800,
    loop: true,
    loopAdditionalSlides: 5,
    preloadImages: false,
    parallax: true,

    // If we need pagination
    pagination: {
      el: '.controls-slider-main__dotts',
      clickable: true,
    },

    // Navigation arrows
    navigation: {
      nextEl: '.slider-main .slider-arrow_next',
      prevEl: '.slider-main .slider-arrow_prev',
    },
  });
}
//Rooms slider
if (document.querySelector('.slider-rooms__body')) {
  new Swiper('.slider-rooms__body', {
    observer: true,
    observeParents: true,
    slidesPerView: 'auto',
    spaceBetween: 24,
    speed: 800,
    loop: true,
    watchOverflow: true,
    loopAdditionalSlides: 5,
    preloadImages: false,
    parallax: true,
    // Dotts
    pagination: {
      el: '.slider-rooms__dotts',
      clickable: true,
    },
    // Arrows
    navigation: {
      nextEl: '.slider-rooms .slider-arrow_next',
      prevEl: '.slider-rooms .slider-arrow_prev',
    },
  });
}

//Tips slider
if (document.querySelector('.slider-tips__body')) {
  new Swiper('.slider-tips__body', {
    observer: true,
    observeParents: true,
    slidesPerView: 3,
    spaceBetween: 32,
    speed: 800,
    loop: true,
    watchOverflow: true,
    // Dotts
    pagination: {
      el: '.slider-tips__dotts',
      clickable: true,
    },
    // Arrows
    navigation: {
      nextEl: '.slider-tips .slider-arrow_next',
      prevEl: '.slider-tips .slider-arrow_prev',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1.1,
        spaceBetween: 15,
      },
      // when window width is >= 768px
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      // when window width is >= 992px
      992: {
        slidesPerView: 3,
        spaceBetween: 33,
      },
    },
  });
}
