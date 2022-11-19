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
  get: function (request, response) {
    if (request.url === '/users' && request.method === 'GET') {
      response.writeHead(200, headers);

      console.log('GET data chunk', request.query);

      // response.end(JSON.stringify(data));
      // var data = models.users.getAll();
      console.log('models.users.getAll', models.users.getAll());
      // response.end(JSON.stringify(data));
      response.end('Success!');
    } else {
      response.writeHead(404);
      response.end('404 Page not found!');
    }
  },
  post: function (request, response) {
    if (request.url === '/users' && request.method === 'POST') {
      headers['Content-Type'] = 'application/JSON';
      response.writeHead(201, headers);

      console.log('POST data chunk', request.query);

      var data = models.users.create();
      // response.end(JSON.stringify(data));
      response.end('controllers/users/Post works');
    } else {
      response.writeHead(404);
      response.end('404 Page not found!');
    }
  }
};
