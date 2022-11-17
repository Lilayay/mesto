export default class UserInfo {
  constructor({ titleSelector, aboutSelector }) {
    this._profileTitle = document.querySelector(titleSelector);
    this._profileAbout = document.querySelector(aboutSelector);
    this._formData = {};
  }

  getUserInfo() {
    this._formData.title = this._profileTitle.textContent;
    this._formData.about = this._profileAbout.textContent;
    return this._formData;
  }


  setUserInfo(title, about) {
    this._profileTitle.textContent = title;
    this._profileAbout.textContent = about;
  }
}
