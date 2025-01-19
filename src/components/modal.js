export { openModal, closeModal, openPopupImage };
import { popupOverlay } from '../index.js'

function openModal(popupContent) {
  popupContent.classList.add('popup_is-opened');
  
  document.addEventListener('keyup', closeDownEscape);
  document.addEventListener('mousedown', overlayMouseDown);
};

function closeModal() {
  popupOverlay.forEach( s => s.classList.remove('popup_is-opened'));

  document.removeEventListener('keyup', closeDownEscape);
  document.removeEventListener('mousedown', overlayMouseDown);
}

//ОТКРЫТИЕ ПОПАПА С КАРТИНКОЙ
function openPopupImage(imagePopup) {
  const popImageDoc = document.querySelector('.popup_type_image');
  const image = popImageDoc.querySelector('.popup__image');
  const captionValue = popImageDoc.querySelector('.popup__caption');

  image.src = imagePopup.src;
  image.alt = imagePopup.alt;
  captionValue.textContent = imagePopup.alt;
  openModal(popImageDoc);
}

// ЗАКРЫТИЕ ПРИ КЛИКЕ НА ФОН
function overlayMouseDown(evt){
  if(!evt.target.classList.contains('popup_is-opened')) return;
  closeModal(evt.target); 
}

//ЗАКРЫТИЕ НА ESC
function closeDownEscape (evt) {
  if (evt.key === 'Escape') {
    closeModal();
  }
};

