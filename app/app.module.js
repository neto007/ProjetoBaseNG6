console.log('application loading...');

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import animate from 'angular-animate';
import angularMaterial from 'angular-material';
import angularMessages from 'angular-messages';
import angularMaterialIcons from 'angular-material-icons';
import angularAria from 'angular-aria';
import angularTranslate from 'angular-translate';
import 'ng-material-datetimepicker/css/material-datetimepicker.css';
import uiMask from 'angular-ui-mask';
import base64Upload from 'angular-base64-upload'
import AppComponent from './app.component';
import Common from './common/common.module';
import AngularToastr from 'angular-toastr';
import 'ng-material-datetimepicker';
import 'angular-jwt'
import * as moment from 'moment';
import 'angular-material/angular-material.css';
import 'angular-toastr/dist/angular-toastr.css';
import 'angular-block-ui/dist/angular-block-ui.css'
import 'angular-block-ui/dist/angular-block-ui.js'
import Login from './login/login.module';
import Usuario from './usuario/usuario.module';
import UsuarioAdm from './usuario/usuario-adm-create/usuario-adm-create.module';
import Dashboard from './dashboard/dashboard.module';
import ngMap from 'ngmap';
import Pessoa from './Pessoa/pessoa.module';


window.moment = moment;
// create our app module and setup core dependencies
angular.module('app', [
    uiRouter,
    animate,
    angularMaterial,
    angularMaterialIcons,
    angularMessages,
    AngularToastr,
    angularTranslate,
    'ngMaterialDatePicker',
    'angular-jwt',
    'blockUI',
    base64Upload,
    Common,
    Login,
    Usuario,
    UsuarioAdm,
    Usuario,
    Dashboard,
    ngMap,
    Pessoa
])

//Verificar Rotas de Login
.factory('HttpRequestInterceptor', function($q, $location) {
    return {
        'responseError': function(rejection) {
            if (rejection.status === 401) {
                localStorage.removeItem('login_token');
                localStorage.removeItem('login_subject');
                //$state.go('login');                   
                window.location = '/login'; //Component de Login
                return;
            }

            if (rejection.status === 403) {
                alert("Operação negada!");
                window.location = '/login';
                return;
            }

            return $q.reject(rejection);
        },
        request: function(config) {

            if (localStorage.getItem('login_token') != null && !config.headers['X-Remove-Authorization']) {
                config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('login_token');
            }
            config.headers['Content-Type'] = 'application/json;charset=UTF-8';

            // remove special headers actions
            delete config.headers['X-Remove-Authorization'];

            return config;
        }
    }
})

/* istanbul ignore next */
.config(($urlRouterProvider, $locationProvider, blockUIConfig, $stateProvider, $mdThemingProvider, $translateProvider, $httpProvider) => {
    'ngInject';

    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};

    $httpProvider.interceptors.push('HttpRequestInterceptor');


    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    $locationProvider.html5Mode(true);

    blockUIConfig.message = "Carregando...";

    //Rota caso Logado seja verdadeiro
    $stateProvider.state('home', {
        url: '/',
        redirectTo: 'dashboard'
    });

    // setup default route
    $urlRouterProvider.otherwise('/');

    $mdThemingProvider.theme('default')

    .primaryPalette('purple', {
            'default': '800',
            'hue-1': 'A700'
        })
        .accentPalette('deep-purple', {
            'default': '800',
            'hue-1': 'A700'
        });


    //Traduzir elemmentos angular
    $translateProvider.translations('pt', {
        CANCEL: "Cancelar",
        TODAY: "Hoje"
    })
})

/* istanbul ignore next */
//Verifiacar Direcionamento das rotas Logado e Deslogado
.run(($rootScope, $state, LoginService, toastr) => {
    // inject shell
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {
        if (!LoginService.isLogged() && toState.name != 'login' && toState.name != 'usuario-adm-create') {
            event.preventDefault();
            $state.go('login', { redirectTo: toState.name }, { location: 'replace' })
        }

        if (LoginService.isLogged() && toState.name == 'login') {
            event.preventDefault();
            $state.go('dashboard', toParams, { location: 'replace' });
        }

        if (toState.hasOwnProperty('redirectTo')) {
            event.preventDefault();
            $state.go(toState.redirectTo, toParams, { location: 'replace' });
            return;
        }

        //deslogado
        if (toState.hasOwnProperty('isLogoutRoute')) {
            event.preventDefault();
            LoginService.logout();
            $state.go('login', { location: 'replace' });
            toastr.success("Você saiu do seu usuário!")
            return;
        }

        //Liberado elementos fora shell    
        if ((!toState.hasOwnProperty('noShell') || toState.noShell === false) && !(/\<shell\>/g).test(toState.template)) {
            toState.template = `<shell>${toState.template}</shell>`;
        }
    });
})

// setup root component
.component('app', AppComponent);