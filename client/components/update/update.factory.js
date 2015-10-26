/* home.factory.js */
(function() {

  angular
    .module('app')
    .factory('updateFactory', updateFactory);

    /**
     * ferdFactory
     * 
     * @description Factory for interfacing with FerdX server for all available
     *   modules with MegaFerd server.
     * @return {Object} The factory
     */
    function updateFactory($q, $http) {

      var factory = {
        update: update
      };

      return factory;

      ////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////

      function update(interval) {
        return $http.post('/api/cars/update')
          .then(function(response) {
            return response;
          })
          .catch(function(error) {
            throw error.data;
          });
      }
    }

})();
