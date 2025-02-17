// import { ValidationConfig } from '../index.js'
export { enableValidation, clearValidation }

  const showInputError = (formElement, inputElement, errorMessage) => {
    // const errorElement = document.querySelector(`.${inputElement.id}-error`)
  const errorElement = document.getElementById(`${inputElement.id}-error`);
  // const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  // console.log("showInputError", formElement);
  // console.log("showInputError", errorElement);
  // console.log("showInputError", errorMessage);
  // console.log("showInputError", `.${inputElement.id}-error`);
  errorElement.classList.add('popup__error_visible');
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = document.getElementById(`${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__error_visible');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
  inputElement.setCustomValidity(inputElement.dataset.errorMessage);
} else {
  inputElement.setCustomValidity('');
}
if (!inputElement.validity.valid) {
  showInputError(formElement, inputElement, inputElement.validationMessage);
} else {
  hideInputError(formElement, inputElement);
}
}; 

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__button_disabled');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__button_disabled');
  }
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function enableValidation() {
  const formList = Array.from(
    document.querySelectorAll('.popup__form')
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

const clearValidation = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll('.popup__input')
  );
  const buttonElement = formElement.querySelector('.popup__button');
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
  toggleButtonState(inputList, buttonElement)
}



