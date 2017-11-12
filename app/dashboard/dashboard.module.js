import dashboardComponent from './dashboard.component';

const module = angular.module('front.app.dashboard', []);

module.component('dashboard', dashboardComponent);

//configure component states
module.config(($stateProvider) => {
  'ngInject';

  $stateProvider
    .state('dashboard', {
      url: '/dashboard',
      template: '<dashboard></dashboard>'
    });    
});

export default module.name;
