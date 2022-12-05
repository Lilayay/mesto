import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmit }) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._formElement = this._popup.querySelector('.popup__container');
    this._saveBtn = this._formElement.querySelector('.popup__submit-btn');
    this.inputs = this._popup.querySelectorAll('.popup__text');
    this._inputValues = {};
  }

  _getInputValues() {
    this.inputs.forEach((input) => {
      this._inputValues[input.name] = input.value;
    })
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    })
  }

  closePopup() {
    super.closePopup();
    this._formElement.reset();
  }

  loading(isLoading) {
    if (isLoading) {
      this._saveBtn.textContent = "Сохранение...";
    } else {
      this._saveBtn.textContent = "Сохранить";
    }
  }
}
