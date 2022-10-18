const editBtn = document.querySelector(".profile__edit-button");
const addBtn = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup-add");
const popupEdit = document.querySelector(".popup-edit");
const gallery = document.querySelector(".gallery__elements");
const template = document.querySelector(".template");
const card = document.querySelector(".gallery__element");
const formElementAdd = document.querySelector(".popup__container_add");
const inputImageTitle = document.querySelector(".popup__text_type_title");
const inputImageLink = document.querySelector(".popup__text_type_link");
const popupImage = document.querySelector(".popup-image");
const fullImage = document.querySelector(".popup__image-full");
const popupDescription = document.querySelector(".popup__description");
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
    const popupToclose = currentPopup.closest(".popup");
    closePopup(popupToclose);
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
  hideInputError(formElementEdit, inputName);
  hideInputError(formElementEdit, inputJob);
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
  hideInputError(formElementAdd, inputImageTitle);
  hideInputError(formElementAdd, inputImageLink);
}
addBtn.addEventListener("click", openPopupAdd);

function addFormCard(e) {
  e.preventDefault();
  const inputLink = inputImageLink.value;
  const inputTitle = inputImageTitle.value;
  let data = {
    name: inputTitle,
    link: inputLink,
  };
  const newCard = createCard(data);
  gallery.prepend(newCard);
  closePopup(popupAdd);
  formElementAdd.reset();
  const buttonElement = popupAdd.querySelector(".popup__submit-btn");
  disableBtn(buttonElement);
}

function renderGallery() {
  const cardsSet = initialCards.map(createCard);
  gallery.append(...cardsSet);
}

function createCard(card) {
  const newCard = template.content.cloneNode(true);
  const cardTitle = newCard.querySelector(".gallery__title");
  const cardLink = newCard.querySelector(".gallery__image");
  cardTitle.textContent = card.name;
  cardLink.setAttribute("src", card.link);
  cardLink.setAttribute("alt", card.name);
  setListenersForcard(newCard);
  return newCard;
}

formElementAdd.addEventListener("submit", addFormCard);

function setListenersForcard(card) {
  const deleteButton = card.querySelector(".gallery__delete-button");
  deleteButton.addEventListener("click", deleteCard);
  const likeBtn = card.querySelector(".gallery__like-button");
  likeBtn.addEventListener("click", likeCard);
  const cardImage = card.querySelector(".gallery__image");
  cardImage.addEventListener("click", openImage);
}

function deleteCard(e) {
  const choosenElement = e.target;
  const choosenCard = choosenElement.closest(".gallery__element");
  choosenCard.remove();
}

function likeCard(e) {
  e.preventDefault();
  e.target.classList.toggle("gallery__like-button_active");
}

function openImage(e) {
  e.preventDefault();
  openPopup(popupImage);
  fullImage.src = this.src;
  fullImage.alt = this.alt;
  popupDescription.innerHTML = this.alt;
}

renderGallery();
