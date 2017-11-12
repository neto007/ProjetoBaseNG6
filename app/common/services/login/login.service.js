export default class {

  constructor($http, SettingsService, jwtHelper) { //inetar
    'ngInject';

    this.$http = $http; // injetar
    this.settings = SettingsService; // injetar

    this.url = this.settings.getApiUrlWithEndpoint("login");
    this.jwtHelper = jwtHelper;
  }

  // Isso vai retornar uma promise!
  login(usuario, senha) {
    return this.$http.post(this.url, {
      "username": usuario,
      "password": senha
    }).then((response) => response.data);
  }

  successLogin(loginObject) {
    localStorage.setItem("login_token", loginObject.token);
    localStorage.setItem("login_subject", loginObject.subject);
  } 

  getUserBasicData() {
    let tokenDecoded = this.jwtHelper.decodeToken(localStorage.getItem('login_token'));

    return tokenDecoded._user;
  }

  logout() {
    localStorage.removeItem("login_token");
    localStorage.removeItem("login_subject");
  }

  isLogged() {
    return localStorage.getItem('login_token') != null;
  }
}