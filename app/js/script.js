'use strict';

window.onload = () => {
  // Variables ============================================================================================
  const cartList = document.querySelector('.cart-header__body');
  const gallery = document.querySelector('._gallery');
  const galleryImages = gallery.querySelectorAll('img');
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

  // Add products
  const addProducts = () => {
    fetch('json/products.json')
      .then((responce) => {
        if (responce.status !== 200) {
          console.log(
            'Looks like there was a problem. Status Code: ' + response.status
          );
          return;
        }
        responce.json().then((data) => {
          if (document.querySelector('.products__items')) {
            for (const product of data.products) {
              const productItem = document.createElement('article');
              productItem.setAttribute('data-pr', product.id ? product.id : '');
              productItem.classList.add('products__item', 'item-product');
              productItem.insertAdjacentHTML(
                'afterbegin',
                `<a href="" class="item-product__image _ibg">
                <img src="img/products/${
                  product.image ? product.image : '01.jpg'
                }" alt="product ${product.id ? product.id : ''}">
              </a>
              <div class="item-product__body">
                <div class="item-product__content">
                  <h5 class="item-product__title">${
                    product.title ? product.title : 'Chair, sofa or table'
                  }</h5>
                  <p class="item-product__text">${
                    product.text
                      ? product.text
                      : 'The best choise in furniture collection'
                  }</p>
                </div>
                ${
                  product.price
                    ? `<div class="item-product__prices">
                    <span class="item-product__price item-product__price_real">Rp ${
                      product.price
                    }</span>
                    ${
                      product.priceOld
                        ? `<span class="item-product__price item-product__price_old">Rp ${product.priceOld}</span>`
                        : ''
                    }
                  </div>`
                    : ''
                }
                <div class="item-product__actions actions-product">
                  <div class="actions-product__body">
                    <a href="${product.url ? product.url : '#'}" data-btnpr=${
                  product.id
                } class="actions-product__button btn btn_white">Add to cart</a>
                    <a href="${
                      product.shareUrl ? product.shareUrl : '#'
                    }" class="actions-product__link _icon-share">Share</a>
                    <a href="${
                      product.likeUrl ? product.likeUrl : '#'
                    }" class="actions-product__link _icon-favorite">Like</a>
                  </div>
                </div>
              </div>`
              );
              if (product.labels) {
                const productLabelsWrapper = document.createElement('div');
                productLabelsWrapper.classList.add('item-product__labels');
                for (const label of product.labels) {
                  if (label.type === 'sale') {
                    productLabelsWrapper.insertAdjacentHTML(
                      'beforeend',
                      `
                  <span class="item-product__label item-product__label_${label.type}">${label.value}</span>
                `
                    );
                  } else if (label.type === 'new') {
                    productLabelsWrapper.insertAdjacentHTML(
                      'beforeend',
                      `
                  <span class="item-product__label item-product__label_${label.type}">${label.value}</span>
                `
                    );
                  }
                }
                productItem.prepend(productLabelsWrapper);
              }
              document.querySelector('.products__items').append(productItem);
            }
          }
        });
      })
      .catch((err) => {
        throw new Error('Fetch Error :-S', err);
      });
  };

  // Main script ==========================================================================================
  // Actions for click
  document.addEventListener('click', (e) => {
    e.preventDefault();
    const target = e.target;

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
    }

    // Click on button show more
    if (
      target.matches('.products__more') ||
      target.closest('.products__more')
    ) {
      addProducts();
      document.querySelector('.products__footer').remove();
    }

    // Click on add to cart button
    if (
      target.matches('.actions-product__button') ||
      target.closest('.actions-product__button')
    ) {
      const productCards = document.querySelectorAll('.item-product');
      productCards.forEach((item) => {
        if (target.dataset.btnpr === item.dataset.pr) {
          const productTitle = item.querySelector(
            '.item-product__title'
          ).textContent;
          const productPrice = item.querySelector(
            '.item-product__price_real'
          ).textContent;
          const productId = item.dataset.pr;

          const newProduct = {
            id: productId,
            title: productTitle,
            price: productPrice,
          };

          productList.push(newProduct);
          renderProducts(productList);
        }
      });
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

    // Click on checkout button
    if (target.matches('.cart-header__checkout')) {
    }

    // Click on gallary image
    if (gallery) {
      if (target.matches('._gallery img')) {
        galleryOpen(target);
        gallery.classList.add('_gallery-created');
        galleryPopup.classList.add('_active');
      }
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
      }
      if (target.matches('.gallery-popup__btn_right')) {
        galleryNextImage();
      }
    }
  });

  // Header scroll and changing header form
  const headerElem = document.querySelector('.header');

  const callback = (entries, observer) => {
    entries[0].isIntersecting
      ? headerElem.classList.remove('_scroll')
      : headerElem.classList.add('_scroll');
  };

  const headerObserver = new IntersectionObserver(callback);

  headerObserver.observe(headerElem);
};
