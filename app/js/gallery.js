// Gallary

const galleryPopup = document.querySelector('.gallery-popup');
const galleryPopupContent = document.querySelector('.gallery-popup__content');

const galleryOpen = (target, gallery) => {
  const galleryImages = gallery.querySelectorAll('img');
  target.classList.add('_current-gallery-image');
  if (!gallery.classList.contains('_gallery-created')) {
    galleryImages.forEach((image, i) => {
      const popupImageWrapper = document.createElement('div');
      const popupImage = document.createElement('img');

      image.setAttribute('data-gallery', `${i}`);
      popupImageWrapper.classList.add('gallery-popup__image');
      popupImage.src = `${image.getAttribute('src')}`;
      popupImage.setAttribute('data-pg', `${i}`);
      i++;
      if (image.classList.contains('_current-gallery-image')) {
        popupImageWrapper.classList.add('_current-popup-gallery-image');
      }
      popupImageWrapper.append(popupImage);
      galleryPopupContent.append(popupImageWrapper);
    });
  } else {
    const galleryPopupContentImages = document.querySelectorAll(
      '.gallery-popup__content img'
    );
    galleryPopupContentImages.forEach((image) => {
      if (target.dataset.gallery === image.dataset.pg) {
        image.parentNode.classList.add('_current-popup-gallery-image');
      }
    });
  }
};

const removeCurrentImageClass = () => {
  document
    .querySelectorAll('._current-popup-gallery-image')
    .forEach(function (element) {
      element.classList.remove('_current-popup-gallery-image');
    });
};

const galleryLeafImages = (popupImages, arrow) => {
  let currentImage = document.querySelector(
    '._current-popup-gallery-image img'
  );
  let indexOfCurrentImage = currentImage.dataset.pg;

  if (arrow === 'next') {
    if (+indexOfCurrentImage >= popupImages.length - 1) {
      indexOfCurrentImage = 0;
    } else {
      ++indexOfCurrentImage;
    }
  } else {
    if (+indexOfCurrentImage <= 0) {
      indexOfCurrentImage = popupImages.length - 1;
    } else {
      --indexOfCurrentImage;
    }
  }
  removeCurrentImageClass();
  popupImages.forEach((image) => {
    if (+image.dataset.pg === indexOfCurrentImage) {
      image.parentNode.classList.add('_current-popup-gallery-image');
    }
  });
};
