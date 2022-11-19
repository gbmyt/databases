// var db = require('../db');
var db = require('../db').dbConnection;
var mysql = require('mysql2');

module.exports = {
  getAll: function (done) {
    db.connect(function(err) {
      if (err) {
        console.log('err?', err);
      }
      console.log('Connected!');
    });

    db.query('SELECT * FROM messages', function(err, results) {
      if (err) {
        console.log(err);
      } else {
        // console.log('---> getAll test', results[0]);
        done(results);
      }
    });
  }, // a function which produces all the messages
  create: function (id, text, username, roomname) {

    var queryStr = `INSERT INTO messages (id, msg, username, roomname) VALUES (${db.escape(id)}, ${db.escape(text)}, ${db.escape(username)}, ${db.escape(roomname)})`;

    db.connect(function(err) {
      if (err) {
        console.log('err?', err);
      }
      console.log('Connected!');
    });

    db.query(queryStr, function (err, results) {
      if (err) {
        console.log(err);
      }
    });
  } // a function which can be used to insert a message into the database
};