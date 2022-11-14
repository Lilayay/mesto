export default class Card {
  constructor(name, link, templateSelector, handleCardClick) {
    this._name = name;
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
    const cardImage = this._element.querySelector(".gallery__image");
    const likeBtn = this._element.querySelector(".gallery__like-button");
    const deleteButton = this._element.querySelector(".gallery__delete-button");

    cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

    likeBtn.addEventListener("click", () => {
      this._cardLike();
    });

    deleteButton.addEventListener("click", () => {
      this._cardDelete();
    });
  }

  _cardLike() {
    this._element
      .querySelector(".gallery__like-button")
      .classList.toggle("gallery__like-button_active");
  }

  _cardDelete() {
    this._element.remove();
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".gallery__image").src = this._link;
    this._element.querySelector(".gallery__title").alt = this._name;
    this._element.querySelector(".gallery__title").textContent = this._name;
    return this._element;
  }
}
