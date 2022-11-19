var mysql = require('mysql2');

// Create a database connection and export it from this file.
// Confirm that the credentials supplied for the connection are correct.
// On Campus at pairing stations you'll use
// user: 'student', password: 'student'
// On your personal computer supply the correct credentials for your mySQL account -- likely
// user: 'root', password: ''
// OR
// user: 'root', password: 'some_password_you_created_at_install'

// var conn = function(queryStr) {
const dbConnection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'chat',
});

// dbConnection.connect(function(err) {
//   if (err) {
//     console.log('err?', err);
//   }

//   const tablename = 'messages';

//   // /* Empty the db table before all tests so that multiple tests
//   // 	* (or repeated runs of the tests)  will not fail when they should be passing
//   // 	* or vice versa */
//   dbConnection.query(`truncate ${tablename}`, function(err, results) {
//     if (err) {
//       console.log(err);
//     }
//     console.log(results);
//   });
// });
// };


// Proof that we can query our db successfully
// dbConnection.query('DESCRIBE messages;', function(err, results) {
//   if (err) {
//     console.log(err);
//   }
//   console.log(results);
// });

// dbConnection.end();

exports.dbConnection = dbConnection; // conn("SELECT * FROM messages")











// Potential async syntax for our db connection?
// async function connect() {
// 	try {
// 		 await con.connect();
// 		 console.log("Connected to MySql!");
// 	} catch (err) {
// 		 console.log(err);
// 	}
// }
