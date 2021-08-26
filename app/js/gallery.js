// Gallary Opener
const galleryOpen = (href, target) => {
  const gallery = document.querySelector('.gallery-popup');
  const popupImage = document.querySelector('.gallery-popup__image img');
  popupImage.setAttribute('src', href);
  gallery.classList.add('_active');
};
