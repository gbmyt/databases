// var db = require('../db');
var db = require('../db').dbConnection;

module.exports = {
  getAll: function () {
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
        console.log('models/users/getAll works', results);
      }
    });
  },
  create: function () {
    db.connect(function(err) {
      if (err) {
        console.log('err?', err);
      }
      console.log('Connected!');
    });

    db.query(`INSERT INTO users (id, username) VALUES (1, "Jason")`, function (err, results) {
      if (err) {
        console.log(err);
      }
      console.log('models/users/create works - Created a user', results);
    });
  }
};
