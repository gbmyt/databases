/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

const mysql = require('mysql2');
const axios = require('axios');

const dbConnect = require('../db/index.js');

const API_URL = 'http://127.0.0.1:3000/classes';

describe('dbConnect should exist', () => {
  expect(dbConnect).not.toEqual(undefined);
});

describe('Persistent Node Chat Server', () => {
  const dbConnection = mysql.createConnection({
    user: 'root',
    password: '',
    database: 'chat',
  });

  beforeAll((done) => {

    // jest.setTimeout(100000);
    dbConnection.connect();

    const tablename = 'messages'; // TODO: fill this out

    /* Empty the db table before all tests so that multiple tests
     * (or repeated runs of the tests)  will not fail when they should be passing
     * or vice versa */
    dbConnection.query(`truncate ${tablename}`, done);
  }, 6500);

  afterAll(() => {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', (done) => {
    const username = 'Valjean';
    const msg = 'In mercy\'s name, three days is all I need.';
    const roomname = 'Hello';

    // Create a user on the chat server database.
    axios.post(`${API_URL}/users`, { username })
      .then(() => {
        // Post a message to the node chat server:
        return axios.post(`${API_URL}/messages`, { username, msg, roomname });
      })
      .then(() => {
        // Now if we look in the database, we should find the posted message there.

        /* TODO: You might have to change this test to get all the data from
         * your message table, since this is schema-dependent. */
        const queryString = 'SELECT * FROM messages';
        const queryArgs = [];

        dbConnection.query(queryString, queryArgs, (err, results) => {
          if (err) {
            throw err;
          }
          expect(results.length).toEqual(1);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].msg).toEqual(msg);
          done();
        });
      })
      .catch((err) => {
        throw err;
      });
  });

  it('Should output all messages from the DB', (done) => {
    const username = 'Valjean';
    const msg = 'In mercy\'s name, three days is all I need.';
    const roomname = 'Hello';
    // Let's insert a message into the db
    dbConnection.query('truncate messages');

    const queryString = 'INSERT INTO messages (id, msg, username, roomname) VALUES (null, "In mercy\'s name, three days is all I need.", "Valjean", "Hello")';
    const queryArgs = [];
    /* TODO: The exact query string and query args to use here
     * depend on the schema you design, so I'll leave them up to you. */
    dbConnection.query(queryString, queryArgs, (err) => {
      if (err) {
        throw err;
      }

      // Now query the Node chat server and see if it returns the message we just inserted:
      axios.get(`${API_URL}/messages`)
        .then((response) => {
          const messageLog = response.data;

          expect(messageLog[0].msg).toEqual(msg);
          expect(messageLog[0].roomname).toEqual(roomname);
          done();
        })
        .catch((err) => {
          throw err;
        });
    });
  });


  it('Should insert posted username to the DB', (done) => {
    const username = 'James';
    axios.post(`${API_URL}/users`, { username })
      .then(() => {
        const queryUser = 'SELECT * FROM users';
        const queryArgs = [];

        dbConnection.query(queryUser, queryArgs, (err, results) => {
          if (err) {
            throw err;
          }
          // expect(results.length).toEqual(1);
          // console.log('spec username', results);
          expect(results[results.length - 1].username).toEqual(username);
          done();
        });
      })
      .catch((err) => {
        throw err;
      });
  });



  it('should output all users from the Users table', function(done) {
    dbConnection.query('truncate messages');
    const username = 'Test User';

    const queryString = `INSERT INTO users (id, username) VALUES (null, ${dbConnection.escape(username)})`;

    dbConnection.query(queryString, (err) => {
      if (err) { throw err; }

      axios.get(`${API_URL}/users`)
        .then((response) => {
          const messageLog = response.data;
          // console.log('messageLog', messageLog[messageLog.length - 1].username);
          expect(messageLog[messageLog.length - 1].username).toEqual(username);
          done();
        })
        .catch((err) => {
          throw err;
        });
    });

  });
});
