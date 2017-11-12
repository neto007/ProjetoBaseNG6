import estabelecimentoCreateComponent from './estabelecimento-create.component';

const module = angular.module('front.app.estabelecimento.estabelecimento-create', []);

module.component('estabelecimentoCreate', estabelecimentoCreateComponent);

//configure component states
module.config(($stateProvider) => {
  'ngInject';

  $stateProvider
    .state('estabelecimento-create', {
      url: '/estabelecimento/novo',
      template: '<estabelecimento-create></estabelecimento-create>'
    });
});

export default module.name;
