import Shell from './shell/shell.module';

import Services from './services/services.module';

const module = angular.module('front.common', [
    Shell,
    Services
]);

export default module.name;