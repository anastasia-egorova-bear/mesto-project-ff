import './pages/index.css'; 
import { createCard, deleteCard, toggleIsLiked } from './components/card.js';
import { initialCards } from './scripts/cards.js'
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
export { cardTemplate };

const content = document.querySelector('.content');
const cardTemplate = document.querySelector('#card-template').content;
const placesList = content.querySelector('.places__list');

const profileButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupEditContent = document.querySelector('.popup_type_edit');
const popupAddContent = document.querySelector('.popup_type_new-card');
const popupOverlayList = document.querySelectorAll('.popup');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');
const popupCloseList = document.querySelectorAll('.popup__close');
const formElementProfile = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = formElementProfile.querySelector('.popup__input_type_name');
const jobInput = formElementProfile.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formElementPlace = document.querySelector('.popup__form[name="new-place"]')
const placeNameInput = formElementPlace.querySelector('.popup__input_type_card-name');
const linkImageInput = formElementPlace.querySelector('.popup__input_type_url');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

function renderCard() {
  initialCards.forEach(({ name, link }) => {
    placesList.append(createCard({ name, link }, deleteCard, toggleIsLiked, openPopupImage));
  });
}

function openPopupImage(image) {
  popupImage.src = image.src;
  popupImage.alt = image.alt;
  popupCaption.textContent = image.alt;
  openModal(popupTypeImage);
}

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  const popupIsOpened = document.querySelector('.popup_is-opened');

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModal(popupIsOpened);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault(validationConfig);

  const popupIsOpened = document.querySelector('.popup_is-opened');
  const name = placeNameInput.value;
  const link = linkImageInput.value;

  placesList.prepend(createCard({name, link}, deleteCard, toggleIsLiked, openPopupImage));

  closeModal(popupIsOpened);
}

popupOverlayList.forEach(popup => popup.classList.add('popup_is-animated'));

popupCloseList.forEach(button => button.addEventListener('click', () => { 
  closeModal(document.querySelector('.popup_is-opened')); 

}));

formElementProfile.addEventListener('submit', handleEditProfileSubmit); 
formElementPlace.addEventListener('submit', handleAddCardSubmit); 

profileButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  clearValidation(popupEditContent, validationConfig);
  openModal(popupEditContent);

});

addButton.addEventListener('click', () => {
  clearValidation(popupAddContent, validationConfig);
  formElementPlace.reset();
  openModal(popupAddContent);
});

renderCard();

//НАСТРАИВАЕМ ОБРАБОТЧИКИ ЗАКРЫТИЯ ПОПАПОВ

//ВКЛЮЧАЕМ ВАЛИДАЦИЮ
// enableValidation(ValidationConfig);
enableValidation(validationConfig);
/*
ЗАГРУЖАЕМ ДАННЫЕ И ОТРИСОВЫВАЕМБ ТК ДЛЯ ОТОБРАДЕНИЯ НУЖЕН id пользователя
то обязательно нужен Promise.all, но допукается 
использование  вложенного запроса*/


