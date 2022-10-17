const obj = {
  formElement: '.popup__container',
  fieldSet: '.popup__input',
  inputElement: '.popup__text',
  buttonElement: '.popup__submit-btn',
  inactiveButton: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__text-error',
  errorElement: 'popup__input-error'
}

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(obj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.errorElement);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(obj.inputErrorClass);
  errorElement.classList.remove(obj.errorElement);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputElement));
  const buttonElement = formElement.querySelector(obj.buttonElement);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (obj) => {
  const formList = Array.from(document.querySelectorAll(obj.formElement));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(
      formElement.querySelectorAll(obj.fieldSet)
    );
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet);
    });
  });
};


const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    disableBtn(buttonElement);
  } else {
    buttonElement.classList.remove(obj.inactiveButton);
    buttonElement.disabled = false;
  }
};

function disableBtn(buttonElement) {
  buttonElement.classList.add(obj.inactiveButton);
  buttonElement.disabled = true;
}

enableValidation(obj);
