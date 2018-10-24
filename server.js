console.log('DRIP TO HARD');
const http = require('http');
const fs = require('fs');
const PORT = process.env.PORT || 8080;
const qs = require('querystring')

function getType (url) {
  let uriArr = url.split('.');
  // console.log(type.length)
  let index = uriArr.length-1; //jus a num
  let type = uriArr[index]; //html 
  return type
};

function getHandler(request, response) {
  let req = request.url; // '/'
  let met = response.method;
  req = (req === '/') ? '/index.html': req; //terniary
  let type = getType(req);
  fs.readFile('./public' + req, (err, data) => {
    if (err) {
      fs.readFile('./public/404.html', 'utf8', (err, data) => {
        response.setHeader ('Content-Type', 'text/html')
        response.writeHead(404, 'Bad Request')
        response.write(data);
        response.end();
      })
    } 
    else {
      response.setHeader ('Content-Type', `text/${type}`)
      response.writeHead (200, 'Request Complete',)
      response.write(data);
      response.end();
    }
  });
}

function postHandler () {
  
}
const server = http.createServer((request, response) => {
  let method = request.method;
  let url = request.url;
  
  // console.log('KEYYYYY', url);
  // console.log('Method: ', method);
  ///////////////GET////////
  switch (request.method) {
    case 'GET':
    getHandler(request, response)
  }
});

server.listen(PORT, () => {
  console.log(`server listening on port: ${PORT}`)
});

