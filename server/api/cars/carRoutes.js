var carController = require('./carController.js');

module.exports = function (app) {
  app.post('/update', carController.update);
  app.get('/locations', carController.getLocations);
};
