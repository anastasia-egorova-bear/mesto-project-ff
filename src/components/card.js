import { cardTemplate } from "../index.js";
import { deleteCardApi, putLike, deleteLike} from "./api.js";

export function createCard(
  cardData,
  deleteCardCallback,
  likeCard,
  openPopupImage,
  userId
) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardId = cardData._id;
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCountElement = cardElement.querySelector(".card__like-button_counter");

  likeCountElement.textContent = cardData.likes.length;
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardImage.addEventListener("click", () => openPopupImage(cardImage));

  likeButton.addEventListener("click", () => {
    likeCard(likeButton, cardData, likeCountElement);
  });

  if (userId === cardData.owner._id) {
    deleteButton.addEventListener("click", () => {
      deleteCardApi(cardId)
        .then(() => {
          deleteCardCallback(cardElement);
        })
        .catch((err) => console.log(err));
    });
  } else {
    deleteButton.remove();
  }
  return cardElement;
}

// УДАЛЕНИЕ КАРТОЧКИ
export function deleteCard(cardElement) {
  cardElement.remove();
}

// ЛАЙК КАРТОЧКЕ
export function likeCard(likeButton, cardData, likeCountElement) {  
  const isLiked = likeButton.classList.toggle('card__like-button_is-active');
  const likeMethod = isLiked ? putLike : deleteLike;  

  likeMethod(cardData._id)   
      .then(updatedCard => {  
          likeCountElement.textContent = updatedCard.likes.length;   
      })  
      .catch(err => console.log(err));  
}   