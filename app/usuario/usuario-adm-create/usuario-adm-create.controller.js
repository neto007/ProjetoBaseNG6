import styles from './usuario-adm-create.module.scss';

export default class {

  constructor(toastr, $state) {
    'ngInject';
    this.styles = styles;
    this.toastr = toastr;
    this.$state = $state;
  }

  salvar(isValid){
     if(!isValid) {     
      this.toastr.error('Existem erros no seu formulário, verifique e tente novamente', 'Ops! Ocorreu um erro');
      return;
    }

    let usuarioAdm = angular.copy(this.usuarioAdm);
    if(usuarioAdm.senha != usuarioAdm.confSenha){
      this.toastr.error('Senhas não conferem', 'Ops! Ocorreu um erro');
      return;
    }

    this.toastr.success('Cadastro realizado com sucesso!');
    this.$state.go('login');
  }

  $onInit() {
    document.querySelector("body").classList.add(this.styles.login);
  }

  $onChanges() {
  }

  $onDestroy() {
    document.querySelector('body').classList.remove(this.styles.login);
  }
}
