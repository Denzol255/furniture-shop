// Gallary
const gallery = document.querySelector('._gallery');
const galleryPopup = document.querySelector('.gallery-popup');
const galleryImages = document.querySelectorAll('._gallery img');
const galleryPopupContent = document.querySelector('.gallery-popup__content');

const galleryOpen = (href, target) => {
  target.classList.add('_current-gallery-image');
  if (!gallery.classList.contains('_gallery-created')) {
    // const popupImage = document.querySelector('.gallery-popup__image img');
    // popupImage.setAttribute('src', href);

    galleryImages.forEach((image, i) => {
      image.setAttribute('data-gallery', `gallery-image-${i}`);
      const popupImageWrapper = document.createElement('div');
      const popupImage = document.createElement('img');
      popupImageWrapper.classList.add('gallery-popup__image');
      popupImage.src = `${image.getAttribute('src')}`;
      popupImage.setAttribute('data-pg', `gallery-image-${i}`);
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

// const galleryPrevImage = () => {
//   const allGalleryImages = document.querySelectorAll('._gallery img');
//   console.log(allGalleryImages);
//   const imagesURL = [];
//   allGalleryImages.forEach((image) => {
//     imagesURL.push(image.getAttribute('src'));
//   });
//   console.log('', imagesURL);
// };
