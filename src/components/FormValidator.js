import { obj } from "./object.js";

export default class FormValidator {
  constructor(obj, formElement) {
    this._obj = obj;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(this._obj.inputElement));
    this._submitBtn = this._formElement.querySelector(this._obj.buttonElement);
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._obj.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._obj.errorElement);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._obj.inputErrorClass);
    errorElement.classList.remove(this._obj.errorElement);
    errorElement.textContent = ' ';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState() {
    this._submitBtn.disabled = !this._formElement.checkValidity();
    this._submitBtn.classList.toggle(this._obj.inactiveButton, !this._formElement.checkValidity());
  };

  _preventDefaultSubmit(evt) {
    evt.preventDefault();
  }

  _addFormListeners() {
    this._toggleButtonState();
    this._formElement.addEventListener('submit', this._preventDefaultSubmit);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      })
    })
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    })
    this._submitBtn.classList.add(this._obj.inactiveButton);
    this._submitBtn.disabled = true;
  }

  enableValidation() {
    this._addFormListeners(this._formElement);
  }
}

export { obj };
