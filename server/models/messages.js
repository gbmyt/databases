var db = require('../db');
var conn = db.conn;

module.exports = {
  getAll: function () {
    var data = conn('SELECT * FROM messages');
    console.log('data?', data);
  }, // a function which produces all the messages
  create: function () {} // a function which can be used to insert a message into the database
};