import { Card } from './Card.js';
import { obj } from "./object.js";
import { FormValidator } from './FormValidator.js';

const profileEditBtn = document.querySelector(".profile__edit-button");
const cardAddBth = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup-add");
const popupEdit = document.querySelector(".popup-edit");
const gallery = document.querySelector('.gallery__elements');
const formElementAdd = document.querySelector(".popup__container_add");
const inputImageTitle = document.querySelector(".popup__text_type_title");
const inputImageLink = document.querySelector(".popup__text_type_link");
const profileName = document.querySelector(".profile__title");
const profileAbout = document.querySelector(".profile__subtitle");
const inputName = document.querySelector(".popup__text_type_name");
const inputJob = document.querySelector(".popup__text_type_about");
const formElementEdit = document.querySelector(".popup__container_edit");
const closeBtns = document.querySelectorAll(".popup__close");
const popupImage = document.querySelector(".popup-image");

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}


function closeByEsc(e) {
  if (e.key === 'Escape') {
    const popupToClose = document.querySelector('.popup_opened');
    closePopup(popupToClose);
  }
  document.removeEventListener('keydown', closeByEsc);
}

function setCloseBtn(closeBtn) {
  closeBtn.addEventListener("click", function (e) {
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

const formValidatorEdit = new FormValidator(obj, formElementEdit);
formValidatorEdit.enableValidation();

const formValidatorAdd = new FormValidator(obj, formElementAdd);
formValidatorAdd.enableValidation();

function openPopupEdit(e) {
  e.preventDefault();
  inputName.value = profileName.textContent;
  inputJob.value = profileAbout.textContent;
  openPopup(popupEdit);
  formValidatorEdit.resetValidation();
}
profileEditBtn.addEventListener("click", openPopupEdit);

function changeForm(e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputJob.value;
  closePopup(popupEdit);
}

formElementEdit.addEventListener("submit", changeForm);

function openPopupAdd(e) {
  e.preventDefault();
  openPopup(popupAdd);
  formElementAdd.reset();
  formValidatorAdd.resetValidation();
}

cardAddBth.addEventListener("click", openPopupAdd);

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
  return card.createCard();
}

function renderGallery() {
  initialCards.forEach(card => gallery.append(makeCard(card.name, card.link)))
}

formElementAdd.addEventListener("submit", addFormCard);


renderGallery();

export { openPopup };
export { popupImage };
