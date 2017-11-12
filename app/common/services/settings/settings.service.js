export default class {
  constructor() {
    'ngInject';
  }

  getApiUrl() {
    return 'http://localhost:8080';
  }

  getApiUrlWithEndpoint(endpoint) {
    return `${this.getApiUrl()}/${endpoint}`;
  }

  
}