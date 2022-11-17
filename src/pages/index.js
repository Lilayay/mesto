import { initialCards, obj } from "../utils/constants.js";
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';

const profileEditBtn = document.querySelector(".profile__edit-button");
const cardAddBth = document.querySelector(".profile__add-button");

const formElementAdd = document.querySelector(".popup__container_add");
const formElementEdit = document.querySelector(".popup__container_edit");

const inputName = document.querySelector(".popup__text_type_name");
const inputJob = document.querySelector(".popup__text_type_about");

//Добавить карточку
const popupAdd = new PopupWithForm({
  popupSelector: '.popup-add',
  handleSubmit: (items) => {
    cardsList.addItem(makeCard(items.cardName, items.link));
    popupAdd.closePopup();
  }
});

popupAdd.setEventListeners();

cardAddBth.addEventListener('click', () => {
  popupAdd.openPopup();
  formValidatorAdd.resetValidation();
})

//Редактировать профиль
const popupEdit = new PopupWithForm({
  popupSelector: '.popup-edit',
  handleSubmit: (items) => {
    userInfo.setUserInfo(items.title, items.about);
    popupEdit.closePopup()
  }
});

popupEdit.setEventListeners();

const userInfo = new UserInfo({
  titleSelector: ".profile__title",
  aboutSelector: ".profile__subtitle"
});

profileEditBtn.addEventListener('click', () => {
  inputName.value = userInfo.getUserInfo().title;
  inputJob.value = userInfo.getUserInfo().about;
  popupEdit.openPopup();
  formValidatorEdit.resetValidation();
});

//Открыть картику
const popupWithImage = new PopupWithImage('.popup-image');
popupWithImage.setEventListeners();


//Валидация
const formValidatorEdit = new FormValidator(obj, formElementEdit);
formValidatorEdit.enableValidation();

const formValidatorAdd = new FormValidator(obj, formElementAdd);
formValidatorAdd.enableValidation();

//Создать карточку
const makeCard = (cardName, link) => {
  const card = new Card(cardName, link, '.template', handleCardClick);
  return card.createCard();
}

const handleCardClick = (cardName, link) => {
  popupWithImage.openPopup(cardName, link);
};

//Отрисовать галерею
const cardsList = new Section({
  items: initialCards,
  renderer: (cardName, link) => {
    cardsList.addItem(makeCard(cardName, link));
  }
}, '.gallery__elements')


cardsList.renderItems()
