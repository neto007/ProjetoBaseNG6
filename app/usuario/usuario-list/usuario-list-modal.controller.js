import styles from './usuario-list.module.scss';

export default class {

  constructor($mdDialog) {
    'ngInject';

    this.styles = styles;
    this.mdDialog = $mdDialog;
  }

  hide() {
    this.mdDialog.hide();
  };

 excluir() {
    console.log(this.onRemove);
    this.mdDialog.hide();
    this.onRemove();
  };

}