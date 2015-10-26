/* home.factory.js */
(function() {

  angular
    .module('app')
    .factory('homeFactory', homeFactory);

    /**
     * ferdFactory
     * 
     * @description Factory for interfacing with FerdX server for all available
     *   modules with MegaFerd server.
     * @return {Object} The factory
     */
    function homeFactory($q, $http) {

      var factory = {
        getLocations: getLocations
      };

      return factory;

      ////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////

      /**
       * ferdFactory.getAvailableModules
       *
       * @description Sends a GET request to server for all available modules.
       * @return {Object} response data
       */
      function getLocations() {
        return $http.get('/api/cars/locations')
          .then(function(response) {
            return response.data;
          });
      }
    }

})();
