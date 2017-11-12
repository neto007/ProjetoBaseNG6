import usuarioListComponent from './usuario-list.component';

const module = angular.module('front.app.usuario.usuario-list', []);

module.component('usuarioList', usuarioListComponent);

//configure component states
module.config(($stateProvider) => {
  'ngInject';

  $stateProvider
    .state('usuario-list', {
      url: '/usuarios',
      template: '<usuario-list></usuario-list>'
    });
});

export default module.name;
