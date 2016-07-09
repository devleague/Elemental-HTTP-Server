var http = require('http');
var port = 8080;
var concat = require ('concat-stream');
var body = [];

var server = http.createServer();

server.on('request', function(request, response) {

  var method = request.method;
  var url = request.url;
  (console.log(url));

  switch (method) {

    case 'GET':
    if (url === '/') {
      getHomepage(request, response);
    }
    else if (url) {
      getForm(request, response, url);
    }
    break;

    case 'POST':
    if (url === '/') {
      getPost(request, response);
    }
    break;

    default:
    get405(request, response);
    break;
  }
}).listen(port);

function getHomepage (request, response) {
  var fs = require('fs');

  fs.readFile('./public/index.html', function (err, data) {
    if (err) {
      get404(request, response);
    }
    else {
      response.writeHead(200, {
        'Content-Type': 'text/html'
      });
      response.write(data);
      response.end();
    }
  });
}

function getForm (request, response, url) {
  var fs = require('fs');

  fs.readFile('./public' + url, function(err, data){
    if (err){
      get404(request, response);
    }
    else {
      response.writeHead(200, {
        'Content-Type': 'text/html'
      });

      response.write(data, 'utf-8');
      response.end();
    }
  });
}

function getPost(request, response) {
  var method = request.method;
  var headers = request.headers;
  var url = request.url;

  request.on('data', function(chunk) {
    body.push(chunk);
  }).on('end', function() {
    body = Buffer.concat(body).toString();
  });

  response.writeHead(200, {'Content-Type': 'application/json'});

  var responseBody = {
    headers: headers,
    method: method,
    url: url,
    body: body
  };
  response.end(JSON.stringify(responseBody));
}

function get404 (request, response) {
  var fs = require('fs');

  fs.readFile('./public/404.html', function(err, data) {
    if (err) {
      throw err;
    }
    else {
      response.writeHead(404, {
        'Content-Type': 'text/html'
      });

      response.write(data);
      response.end();
    }
  });
}

function get405 (request, response) {
  response.writeHead(405, 'Method Not Supported', {
    'Content-Type': 'text/html'
  });
  response.write("<html><body>405: Method not supported. Go to <a href='/'>homepage</a></body></html>");
  response.end();
}


