const onMenuLinkClick = (target, e) => {
  if (target.dataset.goto && document.querySelector(target.dataset.goto)) {
    const gotoBlock = document.querySelector(target.dataset.goto),
      gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - 70;
    // Фиксированное значение из-за измения выстоты шапки при скроле
    // document.querySelector('.header__wrapper').offsetHeight;
    window.scrollTo({
      top: gotoBlockValue,
      behavior: 'smooth',
    });
  }
};
