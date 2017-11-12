export default class {

    constructor($mdSidenav, LoginService) {
        'ngInject';

        this.$mdSidenav = $mdSidenav;

        this.user = LoginService.getUserBasicData();

        this.menu = [{
                title: 'Dashboard',
                link: 'dashboard',
                icon: 'dashboard'
            },
            {
                title: 'Pessoa',
                link: 'pessoa-list',
                icon: 'people'
            }

        ];


    }

    toggleLeftMenu() {
        console.log('hi');
        this.$mdSidenav('menuLeft').open();
    }
}