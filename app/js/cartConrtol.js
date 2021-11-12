// Render product cart

let productList = JSON.parse(localStorage.getItem('cart')) ?? [];
const quantityAllItems =
  productList.length > 0
    ? productList.reduce((acc, current) => acc + current.quantity, 0)
    : 0;

const productsWrapper = document.querySelector('.cart-header__body');
const productsUl = document.createElement('ul');
const cartControlsBlock = document.createElement('div');
const clearCartBtn = document.createElement('button');
const checkoutBtn = document.createElement('a');

productsUl.classList.add('cart-header__list', 'cart-list');
cartControlsBlock.classList.add('cart-header__controls');
clearCartBtn.classList.add('cart-header__clear-cart');
checkoutBtn.setAttribute('href', '#');
checkoutBtn.classList.add('cart-header__checkout');
checkoutBtn.textContent = 'Checkout';

const createEmptyCart = () => {
  productsWrapper.textContent = '';
  productsWrapper.classList.remove('_not-empty');
  productsWrapper.insertAdjacentHTML(
    'beforeend',
    `   <div class="cart-header__empty empty-cart">
        <p class="empty-cart__text">There is no products here...</p>
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
    productsWrapper.append(cartControlsBlock);
    productsWrapper.prepend(productsUl);
    cartControlsBlock.append(clearCartBtn, checkoutBtn);
    clearCartBtn.innerHTML = `<img src="img/icons/delete.svg" alt="" />`;
  }

  productsUl.textContent = '';

  data.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('cart-list__item', 'item-list');
    li.setAttribute('data-product', item.id);
    li.insertAdjacentHTML(
      'beforeend',
      `
				<a href="#" class="item-list__title">${item.title}</a>
        <span class="item-list__quantity">${item.quantity}</span>
				<span class="item-list__price">Rp ${item.price}</span>
        <button type="button" class ="item-list__delete"><span></span></button>
			`
    );
    productsUl.append(li);
    localStorage.setItem('cart', JSON.stringify(data));
    console.log(data);
  });
};

productList.length > 0 ? renderProducts(productList) : null;

const createCartQuantity = (quantity) => {
  if (quantity) {
    document
      .querySelector('.cart-header')
      .insertAdjacentHTML(
        'beforeend',
        `<span class="cart-header__quantity">${quantity}</span>`
      );
  }
};

createCartQuantity(quantityAllItems);

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

const changeCartQuantity = (changing) => {
  const cart = document.querySelector('.cart-header');
  const cartQuantity = document.querySelector('.cart-header__quantity');
  if (cartQuantity && changing === '++') {
    cartQuantity.innerHTML = ++cartQuantity.innerHTML;
  } else if (cartQuantity && changing === '--') {
    cartQuantity.innerHTML = --cartQuantity.innerHTML;
  } else if (cartQuantity && changing === 'remove') {
    cartQuantity.remove();
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
        let numberOfProductPrice = productPrice.split(' ')[1];
        numberOfProductPrice = +numberOfProductPrice
          .split('')
          .filter((item) => item !== '.')
          .join('');
        const productId = item.dataset.pr;
        const newProduct = {
          id: productId,
          title: productTitle,
          price: numberOfProductPrice,
          quantity: 1,
        };
        let hasProduct = true;

        target.classList.add('_hold');
        addFlyingEffect(item, target);
        changeCartQuantity('++');
        if (productList.length > 0) {
          productList.forEach((product) => {
            if (product.id === newProduct.id) {
              product.quantity++;
              product.price += numberOfProductPrice;
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

const deleteCartItem = (target) => {
  if (productList.length > 0) {
    const cartProductLiDataset =
      target.parentNode.parentNode.dataset.product ??
      target.parentNode.dataset.product;
    const indexOfProduct = productList.findIndex(
      (el) => el.id === cartProductLiDataset
    );
    // To find price of 1 product -- totalPrice / totalQuantity, variable assignment breaks code
    if (productList[indexOfProduct].quantity > 1) {
      productList[indexOfProduct].price =
        productList[indexOfProduct].price -
        productList[indexOfProduct].price /
          productList[indexOfProduct].quantity;
      productList[indexOfProduct].quantity--;
    } else {
      productList.splice(indexOfProduct, 1);
    }
    changeCartQuantity('--');

    if (productList.length <= 0) {
      changeCartQuantity('remove');
      createEmptyCart();
      localStorage.removeItem('cart');
    } else {
      renderProducts(productList);
    }
  }
};

const clearCart = () => {
  productList = [];
  localStorage.removeItem('cart');
  changeCartQuantity('remove');
  createEmptyCart();
};

const showCheckoutWindow = () => {
  modal.classList.add('_active');
  loader.classList.add('_active');
  document.body.classList.add('_scroll--lock');
};

console.log(productList);
