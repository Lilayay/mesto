let editBtn = document.querySelector(".profile__edit-button");
let closeBtn = document.querySelector(".popup__close");
let popup = document.querySelector(".popup");

function openPopup(e) {
  e.preventDefault();
  popup.classList.add("popup_opened");
}

function closePopup(e) {
  e.preventDefault();
  popup.classList.remove("popup_opened");
}

editBtn.addEventListener("click", openPopup);
closeBtn.addEventListener("click", closePopup);

let formElement = document.querySelector(".popup__container");
let inputName = document.querySelector(".popup__text_name");
let inputJob = document.querySelector(".popup__text_about");

function changeForm(evt) {
  evt.preventDefault();
  let title = document.querySelector(".profile__title");
  let about = document.querySelector(".profile__subtitle");
  title.textContent = inputName.value;
  about.textContent = inputJob.value;
}
formElement.addEventListener("submit", changeForm);


window.addEventListener('DOMContentLoaded', (event) => {
  [...document.querySelectorAll(".gallery__like-button")].forEach(el => el.addEventListener('click', function (e) {
    e.preventDefault();
    this.classList.toggle("gallery__like-button_active");
  }))
});
