export default class {

  constructor($http, SettingsService) { //inetar
    'ngInject';

    this.$http = $http; // injetar
    this.settings = SettingsService; // injetar

    this.apiUrl = this.settings.getApiUrl();
  }

  obterTodos() {
    return this.$http.get(`${this.apiUrl}/users`);
  }

  
}