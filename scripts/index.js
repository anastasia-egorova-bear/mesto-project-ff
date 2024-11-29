// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const content = document.querySelector('.content');
const cardTemplate = document.querySelector('#card-template').content;
const placesList = content.querySelector('.places__list');

function renderCard() {
  initialCards.forEach(({ name, link }) => {
    placesList.append(createCard({ name, link }, deleteCard));
  });
}

function createCard({ name, link }, deleteCard) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  cardImage.src = { name, link }.link;
  cardImage.alt = { name, link }.name;
  cardTitle.textContent = { name, link }.name;
  deleteButton.addEventListener('click', () => deleteCard(cardElement));
  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

renderCard();