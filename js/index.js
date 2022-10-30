import { Card } from './card.js';
import { obj } from "./formValidator.js";
import { FormValidator } from './formValidator.js';

const editBtn = document.querySelector(".profile__edit-button");
const addBtn = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup-add");
const popupEdit = document.querySelector(".popup-edit");
const gallery = document.querySelector('.gallery__elements');
const formElementAdd = document.querySelector(".popup__container_add");
const inputImageTitle = document.querySelector(".popup__text_type_title");
const inputImageLink = document.querySelector(".popup__text_type_link");
const title = document.querySelector(".profile__title");
const about = document.querySelector(".profile__subtitle");
const inputName = document.querySelector(".popup__text_type_name");
const inputJob = document.querySelector(".popup__text_type_about");
const formElementEdit = document.querySelector(".popup__container_edit");
const closeBtns = document.querySelectorAll(".popup__close");

function openPopup(popup) {
  popup.classList.add("popup_opened");
  window.addEventListener('keydown', closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  window.removeEventListener('keydown', closeByEsc(popup));
}

function closeByEsc(event) {
  if (event.key === 'Escape') {
    const popupToClose = document.querySelector('.popup_opened');
    closePopup(popupToClose);
  }
}

function setCloseBtn(e) {
  e.addEventListener("click", function (e) {
    e.preventDefault();
    const currentPopup = e.target;
    const popupToClose = currentPopup.closest(".popup");
    closePopup(popupToClose);
  });
}

closeBtns.forEach(setCloseBtn);

window.onclick = function (e) {
  const currentPopup = e.target;
  const popupContent = currentPopup.closest(".popup__container");
  if (e.target !== popupContent) {
    closePopup(currentPopup);
  }
};

function openPopupEdit(e) {
  e.preventDefault();
  inputName.value = title.textContent;
  inputJob.value = about.textContent;
  openPopup(popupEdit);
  const formValidatorEdit = new FormValidator(obj, formElementEdit);
  formValidatorEdit.enableValidation();
  formValidatorEdit.resetValidation();
}

editBtn.addEventListener("click", openPopupEdit);

function changeForm(e) {
  e.preventDefault();
  title.textContent = inputName.value;
  about.textContent = inputJob.value;
  closePopup(popupEdit);
}

formElementEdit.addEventListener("submit", changeForm);

function openPopupAdd(e) {
  e.preventDefault();
  openPopup(popupAdd);
  formElementAdd.reset();
  const formValidatorAdd = new FormValidator(obj, formElementAdd);
  formValidatorAdd.enableValidation();
  formValidatorAdd.resetValidation();
}

addBtn.addEventListener("click", openPopupAdd);

function addFormCard(e) {
  e.preventDefault();
  const inputLink = inputImageLink.value;
  const inputTitle = inputImageTitle.value;
  const newCard = makeCard(inputTitle, inputLink)
  gallery.prepend(newCard);
  closePopup(popupAdd);
  formElementAdd.reset();
}

function makeCard(name, link) {
  const card = new Card(name, link, '.template')
  const cardElement = card.createCard();
  return cardElement;
}


function renderGallery() {
  const cardsSet = initialCards.map(card => makeCard(card.name, card.link));
  gallery.append(...cardsSet);
}

formElementAdd.addEventListener("submit", addFormCard);


renderGallery();
export { openPopup };
