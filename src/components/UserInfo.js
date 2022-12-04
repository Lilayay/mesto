export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._profileName = document.querySelector(nameSelector);
    this._profileAbout = document.querySelector(aboutSelector);
    this._profileAvatar = document.querySelector(avatarSelector);
    this._userData = {};
  }

  getUserInfo() {
    this._userData.name = this._profileName.textContent;
    this._userData.about = this._profileAbout.textContent;
    return this._userData;
  }


  setUserInfo(userData) {
    this._profileName.textContent = userData.name;
    this._profileAbout.textContent = userData.about;
    this._profileAvatar.src = userData.avatar;
  }
}
