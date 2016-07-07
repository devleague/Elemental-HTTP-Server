var http = require('http');
var CONFIG = require('./config');
var fs = require('fs');
var querystring = require('querystring');

var heliumHTML = fs.readFile('./public/helium.html', function(err, data) {
  heliumHTMLString = data.toString();
  console.log(heliumHTMLString);
});

var dataInput = "";

// var hydrogenHTML = fs.readFile('./public/hydrogen.html', function(err, data) {
//   hydrogenHTMLString = data.toString();
// });

// var indexHTML = fs.readFile('./public/index.html', function(err, data) {
//   indexHTMLString = data.toString();
// });

// var errorHTML = fs.readFile('./public/404.html', function(err, data) {
//   errorHTMLString = data.toString();
// });

// var stylesCSS = fs.readFile('./css/styles.css', function(err, data) {
//   //stylesCSSString = data.toString();
// });
//console.log("Sanity check");
// var postData = querystring.stringify({
//   'msg' : 'Hi'
// });

var options = {
  //hostname: "./public/helium.html",
  port: CONFIG.PORT,
  path: "./",
  method: 'POST'
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded',
  //   'Content-Length': Buffer.byteLength(postData)
  // }
};

var req = http.request(options, function (res) {
  console.log(res);
  // console.log("STATUS: " + res.statusCode);
  res.setEncoding('utf8');
  res.on('data', function(data){
    console.log("Body" + data);
  });
  res.on('end', function() {
    console.log('No more data');
  });
});

req.on('error', function(e) {
  console.log(e);
});

//req.write(postData);
req.end();

var server = http.createServer(function(req, res) {
  console.log("Sanity check");
  console.log("\nReq: " + Object.getOwnPropertyNames(req));
  console.log("\nRes: " + Object.getOwnPropertyNames(res));
  console.log(res.socket);
  console.log(req.method);
  console.log(req.headers);
  console.log(req.data);
  console.log(res.output);

  req.on('data', function(data) {

    console.log("Data coming in");
    var dataInput = data.toString();
    console.log(dataInput);

    var splitRequest = dataInput.split('&');
    console.log(splitRequest);

    // splitRequest.forEach()
    // var key = splitRequest.split('=');
    // console.log(key);
  });
});

server.listen(CONFIG.PORT, function() {
  var PORT = server.address().port;
  console.log('Opened server on %j', PORT);
});