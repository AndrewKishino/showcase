var _mysql = require('mysql');
var request = require('request');

var HOST = 'us-cdbr-iron-east-03.cleardb.net';
var PORT = 3306;
var MYSQL_USER = 'b6420de503b9cf';
var MYSQL_PASS = '3f0cd0fa';
var DATABASE = 'heroku_7e8df031dcb152c';
var TABLE = 'cars';

var mysql;

function handleDisconnect() {
  mysql = _mysql.createConnection({
    host: HOST,
    port: PORT,
    user: MYSQL_USER,
    password: MYSQL_PASS
  });

  mysql.connect(function(err) {
    if(err) {
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); 
    }
  }); 

  mysql.query('use ' + DATABASE);

  mysql.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

module.exports = {

  /**
   * update
   *
   * @description Updates a user details. 
   * @param {Object} req The request object sent from the client
   * @param {Object} res The response object
   * @param {Function} next The next function
   * @return {Object} Returns user data on success, error on fail
   */
  update: function(req, res, next) {
    var data = req.body;

    var getRandLat = function() {
      return Math.random() * (50 - 30) + 30;
    };

    var getRandLon = function() {
      return Math.random() * (120 - 80) + 80;
    };

    for(var i = 1; i <= 20; i++) {
      mysql.query('UPDATE cars SET lat=' + 
                  getRandLat() + ', lon=-' + 
                  getRandLon() + ' WHERE id=' + i);
    }

    data = {};
    return res.status(201).send(data);
  },

  /**
   * getLocations
   * 
   * @description Gets the available modules.
   * @param {Object} req The request object sent from the client
   * @param {Object} res The response object
   * @param {Function} next The next function
   * @return {Object} 
   */
  getLocations: function(req, res, next) {
    mysql.query('SELECT * from cars', function(err, rows) {
      if (!err) {
        res.send(rows);
      } else
        console.log('Error while performing Query.');
    });
  }
};
