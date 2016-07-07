var http = require('http');
var CONFIG = require('./config');
var fs = require('fs');
var querystring = require('querystring');

var heliumHTML = fs.readFile('./public/helium.html', function(err, data) {
  heliumHTMLString = data.toString();
  console.log(heliumHTMLString);
});

var htmlToSend = "";

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

var server = http.createServer(function(request, response) {
  console.log("\nSanity check");

  console.log(request.method);
  console.log(request.headers);
  //console.log(req.data);
  //console.log(res.output);

  request.on('data', function(data) {
    console.log("Data coming in");
    var dataInput = data.toString();
    var dataObjects = querystring.parse(dataInput);
    console.log(dataObjects);

    var outputFile = dataObjects.elementName + '.html';

    console.log('Start reading file.');

    var DOCTYPE = "<!DOCTYPE html>\n";
    htmlToSend += DOCTYPE;

    var html = '<html lang="en">\n';
    htmlToSend += html;

    var head = "<head>\n";
    htmlToSend += head;

    var meta = '  <meta charset="UTF-8">\n';
    htmlToSend += meta;

    var title = "  <title>The Elements - " + dataObjects.elementName + "</title>\n";
    htmlToSend += title;

    var link = '  <link rel="stylesheet" href="/css/styles.css">\n';
    htmlToSend += link;

    var headEnd = "</head>\n";
    htmlToSend += headEnd;

    var body = "<body>\n";
    htmlToSend += body;

    var h1 = "  <h1>" + dataObjects.elementName + "</h1>\n";
    htmlToSend += h1;

    var h2 = "  <h2>" + dataObjects.elementSymbol + "</h2>\n";
    htmlToSend += h2;

    var h3 = "  <h3>" + dataObjects.elementAtomicNumber + "</h3>\n";
    htmlToSend += h3;

    var p = "  <p>" + dataObjects.elementDescription + "</p>\n";
    htmlToSend += p;

    var p2nd = '  <p><a href="/">back</a></p>\n';
    htmlToSend += p2nd;

    var bodyEnd = "</body>\n";
    htmlToSend += bodyEnd;

    var htmlEnd = "</html>";
    htmlToSend += htmlEnd;

    fs.writeFile('./public/' + outputFile, htmlToSend, 'utf8', function (err) {
      if (err) throw err;
      console.log('File Successfully written');
    });
  });
});

server.listen(CONFIG.PORT, function() {
  var PORT = server.address().port;
  console.log('Opened server on %j', PORT);
});