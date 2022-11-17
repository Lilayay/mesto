export default class Card {
  constructor(cardName, link, templateSelector, handleCardClick) {
    this._name = cardName;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".gallery__element")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._likeBtn = this._element.querySelector(".gallery__like-button");
    this._deleteButton = this._element.querySelector(".gallery__delete-button");
    this._cardImage = this._element.querySelector(".gallery__image");
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

    this._likeBtn.addEventListener("click", () => {
      this._cardLike();
    });

    this._deleteButton.addEventListener("click", () => {
      this._cardDelete();
    });
  }

  _cardLike() {
    this._likeBtn.classList.toggle("gallery__like-button_active");
  }

  _cardDelete() {
    this._element.remove();
    this._element = null;
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._cardImage = this._element.querySelector(".gallery__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".gallery__title").textContent = this._name;
    return this._element;
  }
}
