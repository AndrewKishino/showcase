/* update.controller.js */
(function() {

  'use strict';

  /**
   * Require the base level module and controller
   */
  angular
    .module('app')
    .controller('UpdateController', UpdateController);

  /**
   * UpdateController
   *
   * @description Contains all the functionality for the UpdateController. Returns
   *   nothing.
   */
  function UpdateController(updateFactory) {
    var vm = this;

    vm.update = update;

    function update(interval) {
      updateFactory.update();
    }
  }

})();