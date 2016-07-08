var http = require('http');
var CONFIG = require('./config');
var fs = require('fs');
var querystring = require('querystring');

var htmlToSend = "";
var dataInput = "";
//var outputFile = "";
var dataObjects = "";
//var getFile = "";
var time = new Date();

var server = http.createServer(function(request, response) {
  console.log("\nSanity check");

  console.log(request.method);
  //console.log(request.headers);
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
      var date = "Date: " + time.toUTCString() + '\n';
      var postYES = "HTTP/1.0 200 OK\n" + date + "Content-Type: application/json\n" + 'Content-Body: { "success" : true }\n';
      console.log('\n*****POST*****');
      var outputFile = dataObjects.elementName + '.html';

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
        console.log("***Entering fs.writeFile***\n");
        console.log(request.method + " " + request.url + " " + postYES);
        if (err) throw err;
        console.log('File Successfully written');
      });
    }

    if(request.method === "GET") {
      console.log('\n*****GET*****');
      var getFile = "";

      fs.access('./public/' + request.url, 6, function(err) {
        console.log("***Entering fs.access***\n");
        if (err) {
          console.log(request.url + " does not exist");
          //console.log(err);
          //return getFile;
          //console.log(getFile);
          getFile = "/" + 404 + ".html";
          console.log("*End of fs.access*\n");
        }else {
          getFile = request.url;
          console.log(getFile);
          console.log("*End of fs.access*\n");
        }

        fs.readFile('./public' + getFile, function (err, data) {
          console.log("***Entering fs.readFile***\n");
          if (err) {
            //console.log(err);
            //console.log('./public' + getFile);
            getFile = 404 + ".html";
            console.log(getFile + " does not exist" );

            //getFile = 404 + ".html";
            //console.log(getFile);
            console.log(data);
            //fs.readFile();
            console.log("*End of fs.readFile*\n");
          }else{
            dataInput = data.toString();
            console.log(dataInput);
            console.log("*End of fs.readFile*\n");
          }
        });
      });
      //console.log(Object.getOwnPropertyNames(request));
      //console.log(request.url);
      //console.log(Object.getOwnPropertyNames(response));
      //console.log(response.output);
      //getFile = dataObjects.elementName;
      //console.log(getFile);
    }

    if(request.method === "PUT") {
      //var rewriteFile = "";
      console.log('\n*****PUT*****');
      console.log(Object.getOwnPropertyNames(request));
      console.log(Object.getOwnPropertyNames(response));
      console.log(dataObjects.elementName);
      console.log(request.url);

      // fs.access('./public/' + request.url, 6, function(err) {
      //   console.log("***Entering fs.access***\n");
      //   if (err) {
      //     console.log(err);
      //     console.log(request.url + " does not exist");
      //     rewriteFile = "/" + 404 + ".html";
      //     console.log("*End of fs.access*\n");
      //   }else {
      //     rewriteFile = request.url;
      //     console.log(rewriteFile);
      //     console.log("*End of fs.access*\n");
      //   }

      //   fs.writeFile('./public' + rewriteFile, htmlToSend, 'utf8', function (err) {
      //     console.log("***Entering fs.writeFile***\n");
      //     if (err) throw err;
      //     console.log('File Successfully written');
      //   });
      // });
    }
  });
});

server.listen(CONFIG.PORT, function() {
  var PORT = server.address().port;
  console.log('Opened server on %j', PORT);
});