export class Card {
  constructor(template) {
    this._template = template;
    this._title = data.name;
    this._description = data.description;
    this._image = data.link;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._template)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _handleOpenPopup() {
    fullImage.src = this.src;
    fullImage.alt = this.alt;
    popupDescription.innerHTML = this.alt;
    popup.classList.add('popup_opened');
  }

  _handleClosePopup() {
    popupElement.classList.remove('popup_opened');
  }

  _setEventListeners() {
    this._element.addEventListener('click', () => {
      this._handleOpenPopup();
    });

    popupCloseButton.addEventListener('click', () => {
      this._handleClosePopup();
    });
  }

  createCard() {
    this._element = element._getTemplate();
    this.__element.querySelector(".gallery__title").textContent = this._title;
    this.__element.querySelector(".gallery__image").src = this._image;
    element._setEventListeners();
    return this._element;
  }
}


