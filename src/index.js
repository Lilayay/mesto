import { obj } from "./components/object.js";
import { initialCards } from "./components/initialCards.js";
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage';
import Section from './components/Section.js';
import UserInfo from './components/UserInfo.js';
import './pages/index.css';

const profileEditBtn = document.querySelector(".profile__edit-button");
const cardAddBth = document.querySelector(".profile__add-button");

const formElementAdd = document.querySelector(".popup__container_add");
const formElementEdit = document.querySelector(".popup__container_edit");

const inputCardTitle = document.querySelector(".popup__text_type_title");
const inputCardLink = document.querySelector(".popup__text_type_link");
const inputName = document.querySelector(".popup__text_type_name");
const inputJob = document.querySelector(".popup__text_type_about");

//Добавить карточку
const popupAdd = new PopupWithForm({
  popupSelector: '.popup-add',
  handleSubmit: handleSubmitAdd
});

function handleSubmitAdd(name, link) {
  const card = makeCard({ name: name, link: link });
  cardsList.addItem(card);
}

popupAdd.setEventListeners();

cardAddBth.addEventListener('click', () => {
  popupAdd.openPopup();
  formValidatorAdd.resetValidation();
})

//Редактировать профиль
const userInfo = new UserInfo({
  titleSelector: '.profile__title',
  aboutSelector: '.profile__subtitle'
});

const popupEdit = new PopupWithForm({
  popupSelector: '.popup-edit',
  handleSubmit: handleSubmitEdit
});

function handleSubmitEdit(title, about) {
  userInfo.setUserInfo({ title: title, about: about });
};

popupEdit.setEventListeners();

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
function makeCard({ name: name, link: link }) {
  const card = new Card(name, link, '.template', handleCardClick);
  const cardElement = card.createCard();
  cardsList.addItem(cardElement);
}

function handleCardClick(name, link) {
  popupWithImage.openImagePopup(name, link);
};

//Отрисовать галерею
const cardsList = new Section({
  items: initialCards,
  renderer: makeCard
}, '.gallery__elements')

cardsList.renderItems()
