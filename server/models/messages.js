// var db = require('../db').dbConnection;
// var mysql = require('mysql2');

// ==============================
//   Sequelize Refactor Logic
// ==============================
var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'root', '', { dialect: 'mysql'});

var Messages = db.define('Messages', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  msg: Sequelize.STRING,
  username: Sequelize.STRING,
  roomname: Sequelize.STRING,
  createdAt: {
    field: 'created_at',
    type: Sequelize.DATE,
  },
  updatedAt: {
    field: 'updated_at',
    type: Sequelize.DATE,
  },
});

module.exports = {

  // Messages.sync()
  // .then(function() {
  //   return Messages.create( /* .  */ )
  // })
  getAll: function (done) {
    Messages.sync()
      .then(function() {
        // return Messages.create({username})
        return Messages.findAll();
      })
      .then((messages) => {
        done(messages);
      })
      .catch(function(err) {
        console.error(err);
        // db.close();
      });


    // db.connect(function(err) {
    //   if (err) {
    //     console.log('err?', err);
    //   }
    //   console.log('Connected!');
    // });

    // db.query('SELECT * FROM messages', function(err, results) {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     // console.log('---> getAll test', results[0]);
    //     done(results);
    //   }
    // });
  }, // a function which produces all the messages
  create: function (text, username, roomname) {

    Messages.sync({ alter: true })
      .then(function() {
        var today = new Date();
        return Messages.create({ text, username, roomname, today, today});
      })
      .then(function() {
        return Messages.findAll({ where: { username: username } });
      })
      .then(function(messages) {
        messages.forEach(message => {
          console.log(message.msg + 'was created!');
        });
      })
      .catch(function(err) {
        console.error(err);
        // db.close();
      });
    // =========

    // var queryStr = `INSERT INTO messages (id, msg, username, roomname) VALUES (${db.escape(id)}, ${db.escape(text)}, ${db.escape(username)}, ${db.escape(roomname)})`;

    // db.connect(function(err) {
    //   if (err) {
    //     console.log('err?', err);
    //   }
    //   console.log('Connected!');
    // });

    // db.query(queryStr, function (err, results) {
    //   if (err) {
    //     console.log(err);
    //   }
    // });
  } // a function which can be used to insert a message into the database
};