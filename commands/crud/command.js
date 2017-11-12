var Command = require('ng6-cli').Command;

module.exports = Command.extend({

  init: function() {
    this._super.apply(this, arguments);

    this.description = 'The crud description has not yet been defined.';
    this.options = '';
    this.order = 100;

  },

  run: function(name) {
    if(!name) {
      console.log("Você precisa informar um nome para o CRUD!");
      return;
    }
    
    

  }
});
