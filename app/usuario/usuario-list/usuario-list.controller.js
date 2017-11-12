import styles from './usuario-list.module.scss';
import usuarioListModalHtml from './usuario-list-modal.html';
import usuarioListModalController from './usuario-list-modal.controller';

export default class {

  constructor($mdDialog, toastr) {
    'ngInject';

    // css-modules (https://github.com/webpack/css-loader#css-modules)
    this.styles = styles;
    this.mdDialog = $mdDialog;
    this.toastr = toastr;
  }

desvincularUsuario(usuarioId) {

    this.mdDialog.show({
      controller: usuarioListModalController,
      controllerAs: '$ctrl',
      template: usuarioListModalHtml,
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      focusOnOpen: false
    });
  }

  $onInit() {
  }

  $onChanges() {
  }

  $onDestroy() {
  }
}
