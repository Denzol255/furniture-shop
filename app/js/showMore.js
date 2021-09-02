const showMore = () => {
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
