import styles from './login.module.scss';

export default class {

  constructor($mdDialog, toastr, LoginService, $stateParams, $state) {
    'ngInject';
    this.styles = styles;
    this.$mdDialog = $mdDialog;
    this.toastr = toastr;
    this.loginService = LoginService;
    this.logging = false;
    this.stateParams = $stateParams;
    this.state = $state;
  }

  login(event, usuario, senha) {
    event.preventDefault();
    this.logging = true;
    this.loginService.login(usuario, senha)
      .then((token) => {
        this.loginService.successLogin(token);
        if(this.stateParams.redirectTo) {
          this.state.go(this.stateParams.redirectTo);
        } else {
          this.state.go('dashboard');
        }
      })
      .catch((err) => {
        alert = this.$mdDialog.alert({
          title: 'Ops!',
          textContent: 'Não foi possível efetuar login, verifique os dados informados e tente novamente!',
          ok: 'Fechar'
        });
  
        this.$mdDialog
          .show( alert )
          .finally(function() {
            alert = undefined;
          });
      })
      .finally(() => {
        this.logging = false;
      })
  }

  recuperarSenha(ev){
    
    let confirm = this.$mdDialog.prompt()
      .title('Esqueceu sua senha?')
      .textContent('Informe seu e-mail para recuperar sua senha:')
      .placeholder('E-mail')
      .targetEvent(ev)
      .ok('Enviar')
      .cancel('Cancelar');

    this.$mdDialog.show(confirm).then((result) => {
      this.toastr.success('E-mail enviado com sucesso!');
    });

  };

  $onInit() {
    document.querySelector("body").classList.add(this.styles.login);
  }

  $onChanges() {
  }

  $onDestroy() {
    document.querySelector('body').classList.remove(this.styles.login);
  }

}
