export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  _closeByOverlay(evt) {
    if (evt.target === this._popup) {
      this.closePopup();
    }
  }
  setEventListeners() {
    const closeBtn = this._popup.querySelector('.popup__close');
    closeBtn.addEventListener('click', () => {
      this.closePopup();
    });

    this._popup.addEventListener('mousedown', (evt) => {
      this._closeByOverlay(evt);
    });
  }
}
