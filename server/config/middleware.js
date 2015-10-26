var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports = function (app, express) {
  // set up basic middleware
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname + '/../../client')));

  // define routers
  var carsRouter = express.Router();

  // api paths for various routes
  app.use('/api/cars', carsRouter);

  // require necessary route files
  require('../api/cars/carRoutes.js')(carsRouter);
};