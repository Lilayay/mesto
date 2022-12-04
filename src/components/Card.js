export default class Card {
  constructor({ cardData, userId, handleCardClick, handleDeleteClick, handleCardLike, handleCardLikeDelete, templateSelector }) {
    this._cardId = cardData._id;
    this._ownerId = cardData.owner._id;
    this._userId = userId;

    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleCardLike = handleCardLike;
    this._handleCardLikeDelete = handleCardLikeDelete;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".gallery__element")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

    this._likeBtn.addEventListener('click', () => {
      if (this._likeBtn.classList.contains('gallery__like-button_active')) {
        this._handleCardLikeDelete(this._cardId);
      } else {
        this._handleCardLike(this._cardId);
      }
    });

    this._deleteBtn.addEventListener("click", () => {
      this._handleDeleteClick();
    });
  }

  _isLiked() {
    if (this._likes.some((user) => {
      return this._userId === user._id;
    })) {
      this._likeBtn.classList.add('gallery__like-button_active');
    }
  }

  cardLike(data) {
    this._likes = data.likes;
    this._likeCounter.textContent = this._likes.length;
    this._likeBtn.classList.toggle('gallery__like-button_active');
  }

  _handleDeleteBtnActivity() {
    if (this._userId !== this._ownerId) {
      this._deleteBtn.remove();
    }
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  createCard() {
    this._element = this._getTemplate();

    this._deleteBtn = this._element.querySelector(".gallery__delete-button");
    this._likeBtn = this._element.querySelector(".gallery__like-button");
    this._cardImage = this._element.querySelector(".gallery__image");
    this._likeCounter = this._element.querySelector('.gallery__like-counter');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".gallery__title").textContent = this._name;

    this._setEventListeners();
    this._handleDeleteBtnActivity();
    this._isLiked();
    this._likeCounter.textContent = this._likes.length;

    return this._element;
  }
}
