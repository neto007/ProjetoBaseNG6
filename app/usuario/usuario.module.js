import UsuarioCreate from './usuario-create/usuario-create.module';
import UsuarioList from './usuario-list/usuario-list.module';

const module = angular.module('front.app.usuario', [
  UsuarioCreate,
  UsuarioList
]);

export default module.name;
