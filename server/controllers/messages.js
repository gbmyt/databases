var models = require('../models');
var dbConnection = require('../db/index.js');

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization',
  'access-control-max-age': 10 // Seconds.
};

var headers = defaultCorsHeaders;

module.exports = {
  get: function (request, response) { // a function which handles a get request for all messages
    if (request.url === '/messages' && request.method === 'GET') {
      response.writeHead(200, headers);

      var data = models.messages.getAll((data) => {
        response.end(JSON.stringify(data));
      });
    } else {
      response.writeHead(404);
      response.end('404 Page not found!');
    }
  },

  post: function (request, response) { // a function which handles posting a message to the database
    if (request.url === '/messages' && request.method === 'POST') {
      headers['Content-Type'] = 'application/JSON';
      response.writeHead(201, headers);
      var { username, msg, roomname } = request.body;

      var data = models.messages.create(null, msg, username, roomname);
      response.end('Created');
      // response.end('Created');
    } else {
      response.writeHead(404);
      response.end('404 Page not found!');
    }
  }
};

// else if (request.url === '/classes/messages' && request.method === 'OPTIONS') {
//   headers['Accept'] = 'GET, POST, OPTIONS';
//   response.writeHead(200, headers);
//   response.end('Allow: GET, POST, OPTIONS');
// }