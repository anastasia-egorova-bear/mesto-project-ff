/*export { enableValidation, clearValidation, ValidationConfig }

const ValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: '.popup__button_disabled',
  inputErrorClass: '.popup__input_type_error',
  errorClass: '.popup__error_visible'
};

const showInputError = (formElement, inputElement, errorMessage, ValidationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(ValidationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(ValidationConfig.errorClass);
};

const hideInputError = (formElement, inputElement, ValidationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(ValidationConfig.inputErrorClass);
  inputElement.setCustomValidity('')
  errorElement.classList.remove(ValidationConfig.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, ValidationConfig) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, ValidationConfig);
  } else {
    hideInputError(formElement, inputElement, ValidationConfig);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, ValidationConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(ValidationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(ValidationConfig.inactiveButtonClass);
  }
}

const setEventListeners = (formElement, ValidationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(ValidationConfig.inputSelector));
  const buttonElement = formElement.querySelector(ValidationConfig.submitButtonSelector);

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement, ValidationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, ValidationConfig);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement, ValidationConfig);
    });
  });
};

const enableValidation = (ValidationConfig) => {
  const formList = Array.from(document.querySelectorAll(ValidationConfig.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, ValidationConfig);
  });
}

const clearValidation = (formElement, ValidationConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(ValidationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(ValidationConfig.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, ValidationConfig);
  });
  toggleButtonState(inputList, buttonElement, ValidationConfig)
}*/
