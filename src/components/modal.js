export { openModal, closeModal };

function openModal(popupContent) { 
  popupContent.classList.add('popup_is-opened'); 
   
  document.addEventListener('keyup', closeDownEscape); 
  document.addEventListener('mousedown', overlayMouseDown); 
}; 

function closeModal(openPopup) {
  openPopup.classList.remove('popup_is-opened');

  document.removeEventListener('keyup', closeDownEscape);
  document.removeEventListener('mousedown', overlayMouseDown);
}

function overlayMouseDown(evt){
  if(!evt.target.classList.contains('popup_is-opened')) return;
  closeModal(evt.target); 
}

function closeDownEscape (evt) {
  if (evt.key === 'Escape') {
    const popupIsOpen = document.querySelector('.popup_is-opened');
    closeModal(popupIsOpen);
  }
};

