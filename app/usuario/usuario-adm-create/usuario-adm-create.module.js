import usuarioAdmCreateComponent from './usuario-adm-create.component';

const module = angular.module('front.app.usuario.usuario-adm-create', []);

module.component('usuarioAdmCreate', usuarioAdmCreateComponent);

//configure component states
module.config(($stateProvider) => {
  'ngInject';

  $stateProvider
    .state('usuario-adm-create', {
      url: '/usuarios-adm/novo',
      template: '<usuario-adm-create></usuario-adm-create>',
      noShell: true
    });
});

export default module.name;
