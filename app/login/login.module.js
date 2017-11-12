import loginComponent from './login.component';

const module = angular.module('front.app.login', []);

module.component('login', loginComponent);

//configure component states
module.config(($stateProvider) => {
  'ngInject';

  $stateProvider
    .state('login', {
      url: '/login/:redirectTo',
      template: '<login></login>',
      noShell: true
    })
    .state('logout', {
      url: '/logout',
      isLogoutRoute: true
    })
});

export default module.name;
