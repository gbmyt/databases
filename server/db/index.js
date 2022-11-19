var mysql = require('mysql2');

var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'root', '', { dialect: 'mysql'});

// Create a database connection and export it from this file.
// Confirm that the credentials supplied for the connection are correct.
// On Campus at pairing stations you'll use
// user: 'student', password: 'student'
// On your personal computer supply the correct credentials for your mySQL account -- likely
// user: 'root', password: ''
// OR
// user: 'root', password: 'some_password_you_created_at_install'

// var conn = function(queryStr) {
// const dbConnection = mysql.createConnection({
//   user: 'root',
//   password: '',
//   database: 'chat',
// });

exports.db = db;











// Potential async syntax for our db connection?
// async function connect() {
// 	try {
// 		 await con.connect();
// 		 console.log("Connected to MySql!");
// 	} catch (err) {
// 		 console.log(err);
// 	}
// }
