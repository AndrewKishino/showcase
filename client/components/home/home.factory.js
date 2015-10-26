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
        getLocations: getLocations,
        verifyKey: verifyKey
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

      /**
       * ferdFactory.verifyKey
       * 
       * @description Verifies if slack api key is valid and if it is, that it
       *   belongs to the same org as user's submission.
       * @param {String} apikey The API key to check
       * @return {Object} A promise object
       */
      function verifyKey(apikey) {
        var url = 'https://slack.com/api/rtm.start?token=' + apikey;
        return $http.get(url)
          .then(function(response) {
            return $q(function(resolve, reject) {
              if(response.data && response.data.team &&
                response.data.team.domain === authFactory.authUser.slackOrganization) {
                resolve(true);
              } else {
                reject(false);
              }
            });
          })
          .catch(function(error) {
            throw error.data;
          });
      }

    }

})();
