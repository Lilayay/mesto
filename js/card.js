import { openPopup } from "./index.js";

class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.gallery__element')
      .cloneNode(true);
  }

  _setEventListeners() {
    const cardImage = this._element.querySelector('.gallery__image');
    const likeBtn = this._element.querySelector('.gallery__like-button');
    const deleteButton = this._element.querySelector('.gallery__delete-button');

    cardImage.addEventListener('click', () => {
      this._openImage();
    });

    likeBtn.addEventListener('click', () => {
      this._cardLike(this, this._likeBtn,);
    });

    deleteButton.addEventListener('click', () => {
      this._cardDelete();
    });
  }

  _cardLike() {
    this._element.querySelector('.gallery__like-button').classList.toggle("gallery__like-button_active");
  }

  _cardDelete() {
    const chosenCard = this._element.closest(".gallery__element");
    chosenCard.remove();
  }

  _openImage() {
    const popupImage = document.querySelector(".popup-image");
    document.querySelector(".popup__image-full").src = this._link;
    document.querySelector(".popup__image-full").alt = this._name;
    document.querySelector(".popup__description").innerHTML = this._name;
    openPopup(popupImage);
  }

  createCard() {

    this._element = this._getTemplate();
    this._setEventListeners()

    this._element.querySelector('.gallery__image').src = this._link;
    this._element.querySelector('.gallery__title').alt = this._name;
    this._element.querySelector('.gallery__title').textContent = this._name;

    return this._element;
  }
}

export { Card };
