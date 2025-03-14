import './pages/index.css'; 
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getAboutUser, getCardList, editProfile, handleaddCard, createAvatar} from './components/api.js'

const content = document.querySelector('.content');
export const cardTemplate = document.querySelector('#card-template').content;
const placesList = content.querySelector('.places__list');

const profileButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupEditContent = document.querySelector('.popup_type_edit');
const popupAddContent = document.querySelector('.popup_type_new-card');
const popupOverlayList = document.querySelectorAll('.popup');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupImageCaption = popupTypeImage.querySelector('.popup__caption');
const popupCloseList = document.querySelectorAll('.popup__close');
const formElementProfile = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = formElementProfile.querySelector('.popup__input_type_name');
const jobInput = formElementProfile.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formElementPlace = document.querySelector('.popup__form[name="new-place"]')
export const placeNameInput = formElementPlace.querySelector('.popup__input_type_card-name');
export const linkImageInput = formElementPlace.querySelector('.popup__input_type_url');

const profileImage = document.querySelector('.profile__image');
const popupAvatarContent = document.querySelector('.popup_type_avatar');
const formElementAvatar = document.querySelector('.popup__form[name="edit-avatar"]');
const urlAvatarInput = formElementAvatar.querySelector('.popup__input_type_avatar')

let userId = null;

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//ФУНКЦИЯ COХРАНЕНИЯ
const renderLoading = (isLoading, formElement) => {
	const buttonElement = formElement.querySelector('.popup__button')
	if (isLoading) {
		buttonElement.setAttribute('data-text', buttonElement.textContent)
		buttonElement.textContent = 'Сохранение...'
	} else {
		buttonElement.textContent = buttonElement.getAttribute('data-text')
		buttonElement.removeAttribute('data-text')
	}
}

function openPopupImage(image) {
  popupImage.src = image.src;
  popupImage.alt = image.alt;
  popupImageCaption.textContent = image.alt;
  openModal(popupTypeImage);
}

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, formElementProfile);

  editProfile(nameInput.value, jobInput.value)
		.then(userData => {
			profileTitle.textContent = userData.name,
			profileDescription.textContent = userData.about,
			closeModal(popupEditContent);
		})
		.catch(err => console.log(err))
		.finally(() => {
			renderLoading(false, formElementProfile)
		})
}

function handleAddCardSubmit(evt) {
  evt.preventDefault(validationConfig);
  renderLoading(true, formElementPlace);

  const name = placeNameInput.value;
  const link = linkImageInput.value;

  handleaddCard(name, link)
  .then((cardData) => {
    placesList.prepend(createCard(cardData, deleteCard, likeCard, openPopupImage, userId));
    closeModal(popupAddContent);
  })
  .catch(err => console.log(err))
  .finally(() => {
    renderLoading(false, formElementPlace)
  })
}

function handleEditAvatarSubmit (evt) {
  evt.preventDefault(validationConfig);
  renderLoading(true, formElementAvatar);

  const avatarUrl = urlAvatarInput.value;

  createAvatar(avatarUrl)
  .then((userData) => {
    profileImage.style.backgroundImage = `url(${userData.avatarUrl})`;
    closeModal(popupAvatarContent);
  })
  .catch(err => console.log(err))
  .finally(() => {
    renderLoading(false, formElementAvatar)
  })
}

popupOverlayList.forEach(popup => popup.classList.add('popup_is-animated'));

popupCloseList.forEach(button => button.addEventListener('click', () => { 
  const popup = button.closest('.popup');  
  closeModal(popup);
}));

formElementProfile.addEventListener('submit', handleEditProfileSubmit); 
formElementPlace.addEventListener('submit', handleAddCardSubmit); 
formElementAvatar.addEventListener('submit', handleEditAvatarSubmit);

profileButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(popupEditContent, validationConfig);
  openModal(popupEditContent);
});

addButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  formElementPlace.reset();
  clearValidation(popupAddContent, validationConfig);
  openModal(popupAddContent);
});

profileImage.addEventListener('click', () => {
  formElementAvatar.reset();
  clearValidation(popupAvatarContent, validationConfig);
  openModal(popupAvatarContent);
})

enableValidation(validationConfig);

Promise.all([getAboutUser(), getCardList()])
.then(([userData, initialCards]) => {
  userId = userData._id
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileImage.style.backgroundImage = `url(${userData.avatar})`;
 
  initialCards.forEach((cardData) => {
    placesList.append(createCard(cardData, deleteCard, likeCard, openPopupImage, userId))})
})
.catch(err => console.log(err))