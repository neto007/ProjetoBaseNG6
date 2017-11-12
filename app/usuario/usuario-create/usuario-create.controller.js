import styles from './usuario-create.module.scss';

export default class {

  constructor() {
    'ngInject';

    // css-modules (https://github.com/webpack/css-loader#css-modules)
    this.styles = styles;
    console.log(styles);
  }

  $onInit() {
  }

  $onChanges() {
  }

  $onDestroy() {
  }
}
