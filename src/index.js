import './pages/index.css'; 
import { createCard, deleteCard, toggleIsLiked } from './components/card.js';
import { initialCards } from './scripts/cards.js'
import { openModal, closeModal, openPopupImage } from './components/modal.js';
export { popupContent, popupOverlay, cardTemplate };

const content = document.querySelector('.content');
const cardTemplate = document.querySelector('#card-template').content;
const placesList = content.querySelector('.places__list');

const profileButton = document.querySelector('.profile__edit-button'); 
const popupClose = document.querySelectorAll('.popup__close'); 
const popupContent = document.querySelector('.popup__content')
const popupEditContent = document.querySelector('.popup_type_edit'); 
const popupAddContent = document.querySelector('.popup_type_new-card');
const popupOverlay = document.querySelectorAll('.popup');
const addButton = document.querySelector('.profile__add-button'); 

const formElementProfile = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = formElementProfile.querySelector('.popup__input_type_name');
const jobInput = formElementProfile.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formElementPlace = document.querySelector('.popup__form[name="new-place"]')
const placeNameInput = formElementPlace.querySelector('.popup__input_type_card-name');
const linkImageInput =formElementPlace.querySelector('.popup__input_type_url');

function renderCard() {
  initialCards.forEach(({ name, link }) => {
    placesList.append(createCard({ name, link }, deleteCard, toggleIsLiked, openPopupImage));
  });
}

renderCard();

popupOverlay.forEach(popup => popup.classList.add('popup_is-animated'));

profileButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openModal(popupEditContent);
});

addButton.addEventListener('click', () => {
  openModal(popupAddContent);
});

popupClose.forEach(button => button.addEventListener('click', () => {
  closeModal();
}));

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModal();
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const name = placeNameInput.value;
  const link = linkImageInput.value;

  placesList.prepend(createCard({name, link}, deleteCard, toggleIsLiked, openPopupImage));

  formElementPlace.reset();
  closeModal();
}

formElementProfile.addEventListener('submit', handleFormSubmit); 
formElementPlace.addEventListener('submit', handleAddCardSubmit); 






