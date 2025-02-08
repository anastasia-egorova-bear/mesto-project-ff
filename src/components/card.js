export { createCard, deleteCard, toggleIsLiked };
import { cardTemplate } from '../index.js';
// import { deleteCardApi, setLikeApi } from './api'

function createCard({ name, link }, deleteCard, toggleIsLiked, openPopupImage) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = { name, link }.link;
  cardImage.alt = { name, link }.name;
  cardTitle.textContent = cardImage.alt;

  deleteButton.addEventListener('click', () => deleteCard(cardElement));
  likeButton.addEventListener('click', () => toggleIsLiked(likeButton));
  cardImage.addEventListener('click', () => openPopupImage(cardImage));

  return cardElement;
}

//УДАЛЕНИЕ КАРТОЧКИ
function deleteCard(cardElement) {
  cardElement.remove();
}

//ЛАЙК КАРТОЧКЕ
function toggleIsLiked(likeButton) {
  likeButton.classList.add('.card__like-button_is-active');
  likeButton.classList.toggle('card__like-button_is-active');
}



