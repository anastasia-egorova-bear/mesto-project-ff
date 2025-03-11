import { cardTemplate } from "../index.js";
import { deleteCardApi, putLike, deleteLike } from "./api.js";

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
  const likeCountElement = cardElement.querySelector(
    ".card__like-button_counter"
  );

  likeCountElement.textContent = cardData.likes.length;
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardImage.addEventListener("click", () => openPopupImage(cardImage));

  // let isImLike;
  
  // cardData.likes.forEach(element => {
  //   isImLike = element._id === userId;
  // });

  // if (cardData.likes.length > 0 & isImLike) {
  //     likeButton.classList.toggle("card__like-button_is-active");
  // }

  const userHasLiked = cardData.likes.some(like => like._id === userId)
	if (userHasLiked) {
		likeButton.classList.add('card__like-button_is-active')
	}

  likeButton.addEventListener("click", () => {
    likeCard(likeButton, cardId, likeCountElement);
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
export function likeCard(likeButton, cardId, likeCountElement) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const likeMethod = isLiked ? deleteLike : putLike;

  likeMethod(cardId)
    .then((updatedCard) => {
      likeButton.classList.toggle("card__like-button_is-active");
      likeCountElement.textContent = updatedCard.likes.length;
    })
    .catch((err) => console.log(err));
}
