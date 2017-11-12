export default class {

  constructor($http) {
    'ngInject';

    this.http = $http;
  }

  getEnderecoByCep(cep) {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`, { headers: { 'X-Remove-Authorization': true } })
      .then((response) => response.data);
  }
}