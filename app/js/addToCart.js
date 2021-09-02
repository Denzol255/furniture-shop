// Render product cart

let productList = [];

const productsWrapper = document.querySelector('.cart-header__body');
const productsUl = document.createElement('ul');
const checkoutBtn = document.createElement('a');

const createEmptyCart = () => {
  productsUl.classList.add('cart-header__list', 'cart-list');
  checkoutBtn.setAttribute('href', '#');
  checkoutBtn.classList.add('cart-header__checkout');
  checkoutBtn.textContent = 'Checkout';
  productsWrapper.insertAdjacentHTML(
    'beforeend',
    `   <div class="cart-header__empty empty-cart">
        <p class="empty-cart__text">There is no products here</p>
        <a class="empty-cart__to-products" data-goto=".products">Go to products</a>
      </div>
      `
  );
};

createEmptyCart();

const renderProducts = (data) => {
  if (!productsWrapper.classList.contains('_not-empty')) {
    productsWrapper.classList.add('_not-empty');
    productsWrapper.textContent = '';
    document.querySelector('.cart-header__body').append(checkoutBtn);
    document.querySelector('.cart-header__body').prepend(productsUl);
  }

  productsUl.textContent = '';

  data.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('cart-list__item', 'item-list');
    li.insertAdjacentHTML(
      'beforeend',
      `
				<a href="#" class="item-list__title">${item.title}</a>
        <span class="item-list__quantity">${item.quantity}</span>
				<span class="item-list__price">${item.price}</span>

			`
    );
    productsUl.append(li);
    // localStorage.setItem('cart', JSON.stringify(data));
  });
};

// const oldData = localStorage.getItem('cart');
// if (oldData) {
//   productList = JSON.parse(oldData);
//   renderProducts(productList);
// }

const addFlyingEffect = (product, target) => {
  const cartHeaderIcon = document.querySelector('.cart-header__icon');
  const productImage = product.querySelector('.item-product__image');
  const productImageFly = productImage.cloneNode(true);
  const productImageFlyWidth = productImage.offsetWidth;
  const productImageFlyHeight = productImage.offsetHeight;
  const productImageFlyTop = productImage.getBoundingClientRect().top;
  const productImageFlyLeft = productImage.getBoundingClientRect().left;

  target.classList.add('_fly');

  productImageFly.setAttribute('class', '_flyImage _ibg');
  productImageFly.style.cssText = `
            left: ${productImageFlyLeft}px;
            top: ${productImageFlyTop}px;
            width: ${productImageFlyWidth}px;
            height: ${productImageFlyHeight}px;
            `;

  document.body.append(productImageFly);

  const cartFlyLeft = cartHeaderIcon.getBoundingClientRect().left;
  const cartFlyTop = cartHeaderIcon.getBoundingClientRect().top;

  productImageFly.style.cssText = `
            left: ${cartFlyLeft}px;
            top: ${cartFlyTop}px;
            width: 0px;
            height: 0px;
            opacity: 0;
            `;

  productImageFly.addEventListener('transitionend', () => {
    if (target.classList.contains('_fly')) {
      productImageFly.remove();
      target.classList.remove('_fly');
      target.classList.remove('_hold');
    }
  });
};

const changeCartQuantity = () => {
  const cart = document.querySelector('.cart-header');
  const cartQuantity = document.querySelector('.cart-header__quantity');

  if (cartQuantity) {
    cartQuantity.innerHTML = ++cartQuantity.innerHTML;
  } else {
    cart.insertAdjacentHTML(
      'beforeend',
      `<span class="cart-header__quantity">1</span>`
    );
  }
};

const addToCart = (target) => {
  const productCards = document.querySelectorAll('.item-product');

  productCards.forEach((item) => {
    if (target.dataset.btnpr === item.dataset.pr) {
      if (!target.classList.contains('_hold')) {
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
          quantity: 1,
        };
        let hasProduct = true;

        target.classList.add('_hold');
        addFlyingEffect(item, target);
        changeCartQuantity();
        if (productList.length > 0) {
          productList.forEach((product) => {
            if (product.id === newProduct.id) {
              product.quantity++;
              hasProduct = !hasProduct;
            }
          });
        }
        if (hasProduct) {
          productList.push(newProduct);
        }
        renderProducts(productList);
      }
    }
  });
};
