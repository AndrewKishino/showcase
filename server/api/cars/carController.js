var _mysql = require('mysql');
var Q = require('q');
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
  });                                             // Recreate the connection, since
                                                  // the old one cannot be reused.

  mysql.connect(function(err) {                   // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  }); 

  mysql.query('use ' + DATABASE);                                    // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  mysql.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
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
    mysql.query('SELECT * from cars', function(err, rows, fields) {
      if (!err)
        console.log('The solution is: ', rows);
      else
        console.log('Error while performing Query.');
        
    });
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
