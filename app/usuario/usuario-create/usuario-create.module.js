import usuarioCreateComponent from './usuario-create.component';

const module = angular.module('front.app.usuario.usuario-create', []);

module.component('usuarioCreate', usuarioCreateComponent);

//configure component states
module.config(($stateProvider) => {
  'ngInject';

  $stateProvider
    .state('usuario-create', {
      url: '/usuarios/novo',
      template: '<usuario-create></usuario-create>'
    });
});

export default module.name;
