import UsuarioService from './usuario/usuario.service';
import SettingsService from './settings/settings.service';
import LoginService from './login/login.service';
import RequestService from './request/request.service';
import ViacepService from './viacep/viacep.service';

const module = angular.module('front.services', []);

module.service('SettingsService', SettingsService);
module.service('UsuarioService', UsuarioService);
module.service('LoginService', LoginService);
module.service('RequestService', RequestService);
module.service('ViacepService', ViacepService);


export default module.name;