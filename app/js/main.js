function listenInputChanges(field) {
   field.addEventListener('input', function () {
      removeInvalidStatus(field);
   });
}
function removeInvalidStatus(field) {
   if (field.classList.contains('form-field-invalid')) {
      field.classList.remove('form-field-invalid')
   }
}
var overlay = document.querySelector('.modal-overlay');

// forms

var popupForm = document.querySelector('.modal-content-form');
if (popupForm) {

   var openForm = document.querySelector('.register__link');
   var loginForm = popupForm.querySelector('.login-form');
   var loginFormFields = document.querySelectorAll('.login-form-field');

   var closeForm = document.createElement('button');
   closeForm.classList.add('modal-content-close');
   closeForm.type = 'button';
   popupForm.appendChild(closeForm);
   openForm.addEventListener('click', function (event) {
      var focusFieldNum = 0;

      event.preventDefault();
      overlay.classList.add('modal-overlay-show');
      popupForm.classList.remove('modal-content-form-error');
      popupForm.classList.add('modal-content-form-show');

      for (var i = 0; i < loginFormFields.length; i++) {
         loginFormFields[i].classList.remove('form-field-invalid');

         if (!loginFormFields[i].value && (loginFormFields[focusFieldNum] != document.activeElement) && (i >= focusFieldNum)) {
            focusFieldNum = i;
            loginFormFields[focusFieldNum].focus();
         }
      }
   });


   loginForm.addEventListener('submit', function (event) {
      var invalidFieldNum = 0;

      for (var i = 0; i < loginFormFields.length; i++) {
         if (!loginFormFields[i].value) {
            event.preventDefault();
            loginFormFields[i].classList.add('form-field-invalid');

            if ((loginFormFields[invalidFieldNum] != document.activeElement) && (i >= invalidFieldNum)) {
               invalidFieldNum = i;
               loginFormFields[invalidFieldNum].focus();
            }

            popupForm.classList.remove('modal-content-form-error');
            setTimeout(function () {
               popupForm.classList.add('modal-content-form-error')
            }, 1);
         }
      }
   });

   for (var i = 0; i < loginFormFields.length; i++) {
      listenInputChanges(loginFormFields[i]);
   }


   closeForm.addEventListener('click', function (event) {
      event.preventDefault();
      overlay.classList.remove('modal-overlay-show');
      popupForm.classList.remove('modal-content-form-show');
   });

   overlay.addEventListener('click', function (event) {
      event.preventDefault();
      overlay.classList.remove('modal-overlay-show');
      popupForm.classList.remove('modal-content-form-show');
   });

   window.addEventListener('keydown', function (event) {
      if (event.keyCode === 27) {
         overlay.classList.remove('modal-overlay-show');
         popupForm.classList.remove('modal-content-form-show');
      }
   });

}

////// gallery 
var indexGallery = document.querySelector('.gallery');

if (indexGallery) {

   indexGallery.classList.add('gallery-js');
   var photos = indexGallery.querySelectorAll('.gallery__link');

   var firstphoto = indexGallery.querySelector('.gallery__link:first-of-type');
   firstphoto.classList.add('first-photo');
   firstphoto.classList.add('current-photo');

   var lastPhoto = indexGallery.querySelector('.gallery__link:last-of-type');
   lastPhoto.classList.add('last-photo');

   var currentPhoto = indexGallery.querySelector('.current-photo');


   var galleryNav = document.createElement('div');
   galleryNav.classList.add('gallery-nav');
   indexGallery.appendChild(galleryNav);
   var galleryPrev = document.createElement('button');
   galleryPrev.classList.add('btn');
   galleryPrev.type = 'button';
   galleryPrev.textContent = 'dříve';
   galleryNav.appendChild(galleryPrev);

   var galleryNext = document.createElement('button');
   galleryNext.classList.add('btn');
   galleryNext.type = 'button';
   galleryNext.textContent = 'Další';
   galleryNav.appendChild(galleryNext);


   galleryPrev.addEventListener('click', function () {
      if (currentPhoto.classList.contains('first-photo')) {
         lastPhoto.classList.add('current-photo');
      } else {
         currentPhoto.previousSibling.previousSibling.classList.add('current-photo');
      }
      currentPhoto.classList.remove('current-photo');
      currentPhoto = indexGallery.querySelector('.current-photo');
   });

   galleryNext.addEventListener('click', function () {
      if (currentPhoto.classList.contains('last-photo')) {
         firstphoto.classList.add('current-photo');
      } else {
         currentPhoto.nextSibling.nextSibling.classList.add('current-photo');
      }
      currentPhoto.classList.remove('current-photo');
      currentPhoto = indexGallery.querySelector('.current-photo');
   });

   var modalPhoto = document.querySelector('.modal-content-photo');

   var zoomedPhoto = document.createElement('img');
   zoomedPhoto.classList.add('zoomed-photo');
   modalPhoto.appendChild(zoomedPhoto);
   var closePhoto = document.createElement('button');
   closePhoto.classList.add('modal-content-close');
   closePhoto.type = 'button';
   modalPhoto.appendChild(closePhoto);

   var sliderPrev = document.createElement('button');
   sliderPrev.classList.add('gallery-slider-prev', 'gallery-slider-btn');
   sliderPrev.type = 'button';
   modalPhoto.appendChild(sliderPrev);

   var sliderNext = document.createElement('button');
   sliderNext.classList.add('gallery-slider-next', 'gallery-slider-btn');
   sliderNext.type = 'button';
   modalPhoto.appendChild(sliderNext);


   for (var i = 0; i < photos.length; i++) {
      photos[i].addEventListener('click', function (event) {
         event.preventDefault();
         overlay.classList.add('modal-overlay-show');

         zoomedPhoto.setAttribute("src", currentPhoto.getAttribute('href'));

         modalPhoto.classList.add('modal-content-photo-show');
         modalPhoto.style.marginTop = '-' + modalPhoto.offsetHeight / 2 + 'px';
         modalPhoto.style.marginLeft = '-' + modalPhoto.offsetWidth / 2 + 'px';
      });
   }
   sliderPrev.addEventListener('click', function () {
      if (currentPhoto.classList.contains('first-photo')) {
         lastPhoto.classList.add('current-photo');
      } else {
         currentPhoto.previousSibling.previousSibling.classList.add('current-photo');
      }
      currentPhoto.classList.remove('current-photo');
      currentPhoto = indexGallery.querySelector('.current-photo');
      zoomedPhoto.setAttribute("src", currentPhoto.getAttribute('href'));
   });

   sliderNext.addEventListener('click', function () {
      if (currentPhoto.classList.contains('last-photo')) {
         firstphoto.classList.add('current-photo');
      } else {
         currentPhoto.nextSibling.nextSibling.classList.add('current-photo');
      }
      currentPhoto.classList.remove('current-photo');
      currentPhoto = indexGallery.querySelector('.current-photo');
      zoomedPhoto.setAttribute("src", currentPhoto.getAttribute('href'));
   });


   closePhoto.addEventListener('click', function (event) {
      event.preventDefault();
      overlay.classList.remove('modal-overlay-show');
      modalPhoto.classList.remove('modal-content-photo-show');
   });

   overlay.addEventListener('click', function (event) {
      event.preventDefault();
      overlay.classList.remove('modal-overlay-show');
      modalPhoto.classList.remove('modal-content-photo-show');
   });

   window.addEventListener('keydown', function (event) {
      if (event.keyCode === 27) {
         overlay.classList.remove('modal-overlay-show');
         modalPhoto.classList.remove('modal-content-photo-show');
      }
   });

}



// Переключение фотографий в описании товара


var goodsItemGallery = document.querySelector('.product__gallery');

if (goodsItemGallery) {

   var itemPhotos = goodsItemGallery.querySelectorAll('.product__photo');
   var primaryPhoto = goodsItemGallery.querySelector('.product__photo--active');

   for (var i = 0; i < itemPhotos.length; i++) {
      clickPhoto(itemPhotos[i]);
   }

   function clickPhoto(itemPhoto) {
      itemPhoto.addEventListener('click', function () {
         getPhotoSrc(itemPhoto);
      });
   };

   function getPhotoSrc(itemPhoto) {
      var photoSrc = itemPhoto.getAttribute('src');
      primaryPhoto.setAttribute("src", photoSrc);
   };

}






// menu mobil 
$(function () {
   $(".header__btn").click(function () {
      $(".menu").toggleClass("menu-open");
   });




});

