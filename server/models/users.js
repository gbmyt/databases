// var db = require('../db');
var db = require('../db').dbConnection;

module.exports = {
  getAll: function (done) {
    db.connect(function(err) {
      if (err) {
        console.log('err?', err);
      }
      console.log('Connected (GET)!');
    });

    db.query('SELECT * FROM users', function(err, results) {
      if (err) {
        console.log(err);
      } else {
        // console.log('models/users/getAll works', results);
        done(results);
      }
    });
  },
  create: function (id, username, cb) {
    db.connect(function(err) {
      if (err) {
        console.log('err?', err);
      }
      console.log('Connected!');
    });

    var queryStr = `INSERT INTO users (id, username) VALUES (${db.escape(id)}, ${db.escape(username)})`;

    db.query(queryStr, function (err, results) {
      if (err) {
        console.log(err);
      }
      // console.log('models/users/create works - Created a user', results);
      cb(results);
    });
  }
};
