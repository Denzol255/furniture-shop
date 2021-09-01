// Render product cart

let productList = [];

const productsWrapper = document.querySelector('.cart-header__body');
const productsUl = document.createElement('ul');
const checkoutBtn = document.createElement('a');

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
    localStorage.setItem('cart', JSON.stringify(data));
  });
};

// const oldData = localStorage.getItem('cart');
// if (oldData) {
//   productList = JSON.parse(oldData);
//   renderProducts(productList);
// }
