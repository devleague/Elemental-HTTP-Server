var http = require('http');
var CONFIG = require('./config');
var fs = require('fs');
var querystring = require('querystring');

var htmlToSend = "";
var dataInput = "";
var outputFile = "";
var dataObjects = "";
//var getFile = "";

var server = http.createServer(function(request, response) {
  console.log("\nSanity check");

  console.log(request.method);
  console.log(request.headers);
  //console.log(req.data);
  //console.log(res.output);

  request.on('data', function(data) {
    console.log("Data coming in");
    dataInput = data.toString();
    dataObjects = querystring.parse(dataInput);
    console.log(dataObjects);
  });

  request.on('end', function () {
    //POST Method

    if (request.method === "POST") {
      outputFile = dataObjects.elementName + '.html';
      console.log('Creating the file.');

      htmlToSend += "<!DOCTYPE html>\n";
      htmlToSend += '<html lang="en">\n';
      htmlToSend += "<head>\n";
      htmlToSend += '  <meta charset="UTF-8">\n';
      htmlToSend += "  <title>The Elements - " + dataObjects.elementName + "</title>\n";
      htmlToSend += '  <link rel="stylesheet" href="/css/styles.css">\n';
      htmlToSend += "</head>\n";
      htmlToSend += "<body>\n";
      htmlToSend += "  <h1>" + dataObjects.elementName + "</h1>\n";
      htmlToSend += "  <h2>" + dataObjects.elementSymbol + "</h2>\n";
      htmlToSend += "  <h3>" + dataObjects.elementAtomicNumber + "</h3>\n";
      htmlToSend += "  <p>" + dataObjects.elementDescription + "</p>\n";
      htmlToSend += '  <p><a href="/">back</a></p>\n';
      htmlToSend += "</body>\n";
      htmlToSend += "</html>";

      fs.writeFile('./public/' + outputFile, htmlToSend, 'utf8', function (err) {
        if (err) throw err;
        console.log('File Successfully written');
      });
    }

    if(request.method === "GET") {
      var getFile = "";
      console.log('Getting the header');

      fs.access('./public/' + request.url, 6, function(err) {
        if (err) {
          console.log(request.url + " does not exist");
          console.log(err);
          getFile = 404 + ".html";
          console.log(getFile);
        }
        getFile = request.url;
        console.log(getFile);

        fs.readFile('./public' + getFile, function (err, data) {
          if (err) {
            console.log(err);
            console.log('./public' + getFile);
            console.log(getFile + " does not exist" );
            return;
          }
          dataInput = data.toString();
          console.log(dataInput);
        });
      });
      //console.log(Object.getOwnPropertyNames(request));
      //console.log(request.url);
      //console.log(Object.getOwnPropertyNames(response));
      //console.log(response.output);
      //getFile = dataObjects.elementName;
      //console.log(getFile);
    }
  });
});

server.listen(CONFIG.PORT, function() {
  var PORT = server.address().port;
  console.log('Opened server on %j', PORT);
});