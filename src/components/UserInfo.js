export default class UserInfo {
  constructor({ titleSelector, aboutSelector }) {
    this._profileTitle = document.querySelector(titleSelector);
    this._profileAbout = document.querySelector(aboutSelector);

  }

  getUserInfo() {
    this._userData = {};
    this._userData.title = this._profileTitle.textContent;
    this._userData.about = this._profileAbout.textContent;

    return this._userData;
  }

  setUserInfo({ title: title, about: about }) {
    this._profileName.textContent = title;
    this._profileAbout.textContent = about;
  }
}
