
// NodeJS Docs: HTTP Transaction \\

/*var server = http.createServer(function (request, response) { // function is a request handler and server is an event emmiter

  // Method, URL and Headers

  var method = request.method;  // normal HTTP method
  var url = request.url;  // full URL without the server, protocol or port
  var headers = request.headers;  // headers = own object (all lowercase to simplify parsing task)
                                  // if headers are repeated ==> (https://nodejs.org/api/http.html#http_message_rawheaders)
  var userAgent = headers['user-agent']; // same as headers

  // Request Body (for POST/PUT)

  var body = [];
  request.on('data', function (chunk) { // readable stream interface ('data' and 'end')
    body.push(chunk);
  }).on('end', function() {
    body = Buffer.concat(body).toString(); // entire body stored as string now (npm install concat-stream to use)
  });

  // Errors (request is a readable stream so is also an event emitter)

  request.on('error', function (err) {  // https://nodejs.org/api/errors.html
    console.error(err.stack); // prints the error message and stack trace to `stderr`
  });

}).listen(8080); // listening on port 8080
*/



// just trying..

var http = require('http');
var fs = require('fs');
var port = 8080;

var server = http.createServer();

server.on('request', function(request, response) {

  var headers = request.headers;
  var method = request.method;
  var url = request.url;
  (console.log(url));

  switch (method) {

    case "GET":
    if (url === "/") {
      getHomepage(request, response);
    }
    else if (url) {
      getForm(request, response, url);
    }
    break;
  }
}).listen(port);

function getHomepage (request, response) {
  var fs = require('fs');
  fs.readFile("./public/index.html", function (err, data) {
    if (err) {
      throw err;
    }
    else {
      response.writeHead(200, {
        "Content-Type": "text/html"
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
      throw err;
    }
    else {
      response.writeHead(200, {
        "Content-Type": "text/html"
      });
      response.write(data);
      response.end();
    }
  });
}



