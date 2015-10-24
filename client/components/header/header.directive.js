/* header.directive.js */
(function() {

  'use strict';

  /**
   * headerDirective
   * 
   * @description The header directive is used for displaying the header with
   *   dynamic navigation links, depending on user auth state.
   * @return {Object} The directive
   */
  angular
    .module('app')
    .directive('headerDirective', headerDirective);

  function headerDirective() {
    var directive = {
      restrict: 'EA',
      scope: {
        header: '='
      },
      templateUrl: 'components/header/header.directive.html',
      link: link
    };

    return directive;

    function link(scope, elem, attrs) {
      var geoTable = document.querySelector('.geoTable');
      var dbUpdate = document.querySelector('.dbUpdate');

      geoTable.addEventListener('click', function(e) {
        e.preventDefault();
        var c = dbUpdate.classList.contains('active');
        if (c) {
          dbUpdate.classList.remove('active');
          geoTable.classList.add('active');
        }
      });

      dbUpdate.addEventListener('click', function(e) {
        e.preventDefault();
        var c = geoTable.classList.contains('active');
        if (c) {
          geoTable.classList.remove('active');
          dbUpdate.classList.add('active');
        }
      });
    }
  }

})();