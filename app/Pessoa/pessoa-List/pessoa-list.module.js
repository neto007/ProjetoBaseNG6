import pessoaListComponent from './pessoa-list.component';

const module = angular.module('front.app.Pessoa.pessoa-List', []);

module.component('pessoaList', pessoaListComponent);

//configure component states
module.config(($stateProvider) => {
    'ngInject';

    $stateProvider
        .state('pessoa-list', {
            url: '/pessoa/list',
            template: '<pessoa-list></pessoa-list>'
        });
});

export default module.name;