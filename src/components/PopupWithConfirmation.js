import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._popup.querySelector('.popup__container');
  }

  handleSubmit(removeCard){
    this._handleSubmit = removeCard;
  }


  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      console.log(evt);
      evt.preventDefault();
      this._handleSubmit();
    });
  }
}
