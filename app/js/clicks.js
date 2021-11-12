'use strict';

window.onload = () => {
  // Variables ===========================================================================================

  const cartList = document.querySelector('.cart-header__body');
  const galleryPopup = document.querySelector('.gallery-popup');

  // Functions ============================================================================================
  // IE check
  function isIE() {
    ua = navigator.userAgent;
    var is_ie = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
    return is_ie;
  }
  // IBG (responsive images)
  function ibg() {
    if (isIE()) {
      let ibg = document.querySelectorAll('._ibg');
      for (var i = 0; i < ibg.length; i++) {
        if (
          ibg[i].querySelector('img') &&
          ibg[i].querySelector('img').getAttribute('src') != null
        ) {
          ibg[i].style.backgroundImage =
            'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
        }
      }
    }
  }

  ibg();
  // IsMobile
  const isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };

  // Remove classes
  function _removeClasses(el, class_name) {
    for (var i = 0; i < el.length; i++) {
      el[i].classList.remove(class_name);
    }
  }

  // Main script ==========================================================================================
  // Actions for click
  document.addEventListener('click', (e) => {
    const target = e.target;
    e.preventDefault();

    // Variables, which we get after click on needed target
    const galleryPopupContentImages = document.querySelectorAll(
      '.gallery-popup__content img'
    );
    const gallery = document.querySelector('._gallery');
    //============================================================================

    // Click on menu items to show the sub-menu list, if it is mobile device and width > 768
    if (window.innerWidth > 768 && isMobile.any()) {
      if (
        target.classList.contains('menu__arrow') ||
        target.closest('.menu__arrow')
      ) {
        target.closest('.menu__item').classList.toggle('_hover');
      } else if (
        !target.closest('.menu__sub-list') &&
        document.querySelectorAll('.menu__item._hover').length > 0
      ) {
        _removeClasses(
          document.querySelectorAll('.menu__item._hover'),
          '_hover'
        );
      }
    }

    // Click on mobile search icon
    if (target.classList.contains('search-form__icon')) {
      document.querySelector('.search-form').classList.toggle('_active');
    } else if (
      !target.closest('.search-form') &&
      document.querySelector('.search-form._active')
    ) {
      document.querySelector('.search-form').classList.remove('_active');
    }

    // Click on mobile menu icon
    if (target.closest('.icon-menu')) {
      document.querySelector('.menu__body').classList.toggle('active');
      document.querySelector('.icon-menu').classList.toggle('_active');
      document.body.classList.toggle('_scroll--lock');
    }

    // Click on button show more
    if (
      target.matches('.products__more') ||
      target.closest('.products__more')
    ) {
      showMore();
      document.querySelector('.products__footer').remove();
    }

    // Click on add to cart button
    if (
      target.matches('.actions-product__button') ||
      target.closest('.actions-product__button')
    ) {
      addToCart(target);
    }

    // Click on cart
    if (
      target.matches('.cart-header') ||
      target.matches('.cart-header__icon')
    ) {
      cartList.classList.toggle('_active-cart');
    }

    // Click on button to products, when cart is empty
    if (
      target.matches('.empty-cart__to-products') ||
      target.closest('.empty-cart__to-products')
    ) {
      onMenuLinkClick(target, e);
      cartList.classList.remove('_active-cart');
    }
    // Click on delete cart item
    if (
      target.matches('.item-list__delete') ||
      target.closest('.item-list__delete')
    ) {
      deleteCartItem(target);
    }

    //Click on clear-cart button
    if (
      target.matches('.cart-header__clear-cart img') ||
      target.closest('.cart-header__clear-cart img')
    ) {
      clearCart();
    }

    // Click on checkout button
    if (target.matches('.cart-header__checkout')) {
    }

    // Gallery
    if (gallery) {
      // Click on gallary image
      if (target.matches('._gallery img')) {
        galleryOpen(target, gallery, galleryPopupContent);
        gallery.classList.add('_gallery-created');
        galleryPopup.classList.add('_active');
        document.body.classList.add('_scroll--lock');
      }
      // Close gallery
      if (
        target.matches('.gallery-popup__close') ||
        target.matches('.gallery-popup') ||
        target.matches('.gallery-popup__content') ||
        target.closest('.gallery-popup__close')
      ) {
        document.querySelector('.gallery-popup').classList.remove('_active');
        document
          .querySelectorAll('._current-popup-gallery-image')
          .forEach(function (element) {
            element.classList.remove('_current-popup-gallery-image');
          });
        document.body.classList.remove('_scroll--lock');
      }
      // Click on gallery arrow next
      if (target.matches('.gallery-popup__btn_next')) {
        galleryLeafImages(galleryPopupContentImages, 'next');
      }
      // Click on gallery arrow prev
      if (target.matches('.gallery-popup__btn_prev')) {
        galleryLeafImages(galleryPopupContentImages, 'prev');
      }
    }
  });

  // Header scroll and changing header height
  const headerElem = document.querySelector('.header');

  const callback = (entries, observer) => {
    entries[0].isIntersecting
      ? headerElem.classList.remove('_scroll')
      : headerElem.classList.add('_scroll');
  };

  const headerObserver = new IntersectionObserver(callback);

  headerObserver.observe(headerElem);

  // Gallery mouse moving effect
  const furniture = document.querySelector('.furniture__body');
  if (furniture && !isMobile.any()) {
    const furnitureItems = document.querySelector('.furniture__items');
    const furnitureColumn = document.querySelectorAll('.furniture__column');

    // Animation speed
    const speed = furniture.dataset.speed;

    let positionX = 0;
    let coordXprocent = 0;

    function setMouseGalleryStyle() {
      let furnitureItemsWidth = 0;
      furnitureColumn.forEach((element) => {
        furnitureItemsWidth += element.offsetWidth;
      });

      const furnitureDifference = furnitureItemsWidth - furniture.offsetWidth;
      const distX = Math.floor(coordXprocent - positionX);

      positionX = positionX + distX * speed;

      let position = (furnitureDifference / 200) * positionX;

      furnitureItems.style.cssText = `transform: translate3d(${-position}px, 0, 0);`;

      if (Math.abs(distX) > 0) {
        requestAnimationFrame(setMouseGalleryStyle);
      } else {
        furniture.classList.remove('_init');
      }
    }

    furniture.addEventListener('mousemove', (e) => {
      // Width of visible part
      const furnitureWidth = furniture.offsetWidth;

      // The middle of visible part === 0
      const coordX = e.pageX - furnitureWidth / 2;

      // Getting percents
      coordXprocent = (coordX / furnitureWidth) * 200;

      if (!furniture.classList.contains('_init')) {
        requestAnimationFrame(setMouseGalleryStyle);
        furniture.classList.add('_init');
      }
    });
  }
};
