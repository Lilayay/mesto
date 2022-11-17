import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageFull = this._popup.querySelector('.popup__image-full');
    this._imageName = this._popup.querySelector('.popup__description');
  }

  openPopup(cardName, link) {
    this._imageFull.src = link;
    this._imageFull.alt = cardName;
    this._imageName.textContent = cardName;
    super.openPopup();
  }
}
