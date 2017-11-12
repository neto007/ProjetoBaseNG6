export default class {

  constructor($http) {
    'ngInject';

    this.http = $http;
  }

  transformRequest(url, data) {
    return this.http({
      method: 'POST',
      url: url,
      headers: {
          'Content-Type': 'multipart/form-data'
      },
      data,
      transformRequest: function (data, headersGetter) {
          var formData = new FormData();
          angular.forEach(data, function (value, key) {
              formData.append(key, value);
          });

          headers()['Content-Type'] = 'multipart/form-data';
          
          //delete headers['Content-Type'];

          return formData;
      }
    })
  }
}