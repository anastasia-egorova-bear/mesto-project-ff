// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');


function renderCard() {
  initialCards.forEach(({name, link}) => {
  const card = addCard({name, link});
  })
};

function addCard({name, link}){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__title').textContent = name;
 
  placesList.append(cardElement);
  
};

function deleteCard() {
  const deleteButton = content.querySelectorAll('.card__delete-button');
  deleteButton.forEach((element) => {element.addEventListener('click', function (){
  const listItem = element.closest('.places__item');
  listItem.remove()
})})};

renderCard();
deleteCard();