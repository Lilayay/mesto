import { initialCards, obj } from "../utils/constants.js";
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import './index.css';

const profileEditBtn = document.querySelector(".profile__edit-button");
const cardAddBth = document.querySelector(".profile__add-button");
const avatarBth = document.querySelector(".profile__avatar-button");

const formElementAdd = document.querySelector(".popup__container_add");
const formElementEdit = document.querySelector(".popup__container_edit");
const formElementAvatar = document.querySelector(".popup__container_avatar");

const inputName = document.querySelector(".popup__text_type_name");
const inputAbout = document.querySelector(".popup__text_type_about");

let userId;

//Добавить Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-54',
  headers: {
    authorization: '20f9b43a-5700-4f5b-a8d7-cf362f4636a0',
    'Content-Type': 'application/json'
  }
});

//Работа с сервером
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cardData, userData]) => {
    userId = userData._id;
    cardsList.renderItems(cardData);
    userInfo.setUserInfo(userData);
  })
  .catch((err) => {
    console.log('Ошибка при загрузке исходных данных: ', err);
  });

//Валидация
const formValidatorEdit = new FormValidator(obj, formElementEdit);
formValidatorEdit.enableValidation();

const formValidatorAdd = new FormValidator(obj, formElementAdd);
formValidatorAdd.enableValidation();

const formValidatorAvatar = new FormValidator(obj, formElementAvatar);
formValidatorAvatar.enableValidation();

//Редактировать профиль
const popupEdit = new PopupWithForm({
  popupSelector: '.popup-edit',
  handleSubmit: (userData) => {
    popupEdit.loading(true);
    return api
      .changeUserInfo(userData)
      .then((userData) => {
        userInfo.setUserInfo(userData);
        popupEdit.closePopup();
      })
      .catch((err) => {
        console.log('Ошибка при изменении данных пользователя: ', err);
      })
      .finally(() => {
        popupEdit.loading(false);
      })
  }
});

popupEdit.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__subtitle",
  avatarSelector: ".profile__avatar"
});

profileEditBtn.addEventListener('click', () => {
  inputName.value = userInfo.getUserInfo().name;
  inputAbout.value = userInfo.getUserInfo().about;
  popupEdit.openPopup();
  formValidatorEdit.resetValidation();
});

//Изменение аватара
const popupAvatar = new PopupWithForm({
  popupSelector: '.popup-avatar',
  handleSubmit: (userData) => {
    popupAvatar.loading(true);
    return api
      .changeAvatar(userData)
      .then((userData) => {
        userInfo.setUserInfo(userData);
        popupAvatar.closePopup();
      })
      .catch((err) => {
        console.log('Ошибка при изменении аватара: ', err);
      })
      .finally(() => {
        popupAvatar.loading(false);
      })
  }
});
popupAvatar.setEventListeners();

avatarBth.addEventListener('click', () => {
  popupAvatar.openPopup();
  formValidatorAvatar.resetValidation();
})

//Добавить карточку
const popupAdd = new PopupWithForm({
  popupSelector: '.popup-add',
  handleSubmit: (cardData) => {
    popupAdd.loading(true);
    return api
      .addCard(cardData)
      .then((cardData) => {
        cardsList.addItem(makeCard(cardData));
        popupAdd.closePopup();
      })
      .catch((err) => {
        console.log('Ошибка при создании карточки: ', err);
      })
      .finally(() => {
        popupAdd.loading(false);
      })
  }
});

popupAdd.setEventListeners();

cardAddBth.addEventListener('click', () => {
  popupAdd.openPopup();
  formValidatorAdd.resetValidation();
})

//Открыть картику
const popupWithImage = new PopupWithImage('.popup-image');
popupWithImage.setEventListeners();

//Удалить карточку
const popupDelete = new PopupWithConfirmation('.popup-delete');
popupDelete.setEventListeners();

//Создать карточку
const makeCard = (cardData) => {
  const card = new Card({
    cardData, userId: userId,

    handleCardClick: (name, link) => {
      popupWithImage.openPopup(name, link);
    },

    handleDeleteClick: () => {
      popupDelete.openPopup();
      popupDelete.handleSubmit(() => {
        api.deleteCard(cardData._id)
          .then(() => {
            card.deleteCard();
            popupDelete.closePopup();
          })
          .catch((err) => {
            console.log('Ошибка при удалении карточки: ', err);
          });
      });
    },
    handleCardLike: (cardId) => {
      api.cardLike(cardId)
        .then((data) => {
          card.cardLike(data);
        })
        .catch((err) => {
          console.log('Ошибка при установке лайка: ', err);
        });
    },
    handleCardLikeDelete: (cardId) => {
      api.cardLikeDelete(cardId)
        .then((data) => {
          card.cardLike(data);
        })
        .catch((err) => {
          console.log('Ошибка при удалении лайка: ', err);
        });
    },
    templateSelector: '.template'
  });

  return card.createCard();
}

//Лайк



//Отрисовать галерею
const cardsList = new Section({
  renderer: (cardData) => {
    cardsList.addItem(makeCard(cardData));
  }
}, '.gallery__elements')
