// Gallary
const gallery = document.querySelector('._gallery');
const galleryPopup = document.querySelector('.gallery-popup');
const galleryImages = document.querySelectorAll('._gallery img');
const galleryPopupContent = document.querySelector('.gallery-popup__content');

const galleryOpen = (target) => {
  target.classList.add('_current-gallery-image');
  if (!gallery.classList.contains('_gallery-created')) {
    galleryImages.forEach((image, i) => {
      image.setAttribute('data-gallery', `${i}`);
      const popupImageWrapper = document.createElement('div');
      const popupImage = document.createElement('img');
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

const galleryNextImage = () => {
  const galleryPopupContentImages = document.querySelectorAll(
    '.gallery-popup__content img'
  );
  const firstImage = document.querySelector('[data-pg="0"]');
  let currentImage = document.querySelector('._current-popup-gallery-image img')
    .dataset.pg;
  let nextImage = null;
  if (+currentImage >= galleryPopupContentImages.length - 1) {
    nextImage = 0;
    firstImage.parentNode.classList.add('_current-popup-gallery-image');
  } else {
    nextImage = ++currentImage;
  }
  console.log('nextimg', nextImage);
  console.log('legnth', galleryPopupContentImages.length);
  removeCurrentImageClass();
  galleryPopupContentImages.forEach((image) => {
    if (+image.dataset.pg === nextImage) {
      image.parentNode.classList.add('_current-popup-gallery-image');
    }
  });
};

// const galleryPrevImage = () => {
//   const allGalleryImages = document.querySelectorAll('._gallery img');
//   console.log(allGalleryImages);
//   const imagesURL = [];
//   allGalleryImages.forEach((image) => {
//     imagesURL.push(image.getAttribute('src'));
//   });
//   console.log('', imagesURL);
// };
