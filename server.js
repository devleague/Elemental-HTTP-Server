const http = require('http');
const fs = require('fs');
const PORT = process.env.PORT || 8080;
const qs = require('querystring');

const server = http.createServer((request, response) => {
  let method = request.method;
  let url = request.url;

  if (request.url.indexOf('public') < 1) { //Add public to url
    url = 'public' + request.url;
  }

  console.log(url);
  console.log('Method: ', method);

  switch (url) {
    case ('public/index.html'):
      fs.readFile('./public/index.html', 'utf-8', (err, data) => {
        if (err) {
          fs.readFile('./public/404.html', 'utf-8', (err, data) => {
            console.log('!!!!!!!', data)
            response.writeHead(404, { 'content-type': 'text/html' });
            response.write(data);
            response.end();
          })
        } else {
          response.writeHead(200, { 'content-type': 'text/html' });
          response.write(data);
          response.end();
        }
      });
      break;
    case ('public/css/styles.css'):
      fs.readFile('./public/css/styles.css', 'utf-8', (err, data) => {
        response.setHeader('Content-Type', 'text/css')
        response.writeHead(200, 'OK');
        response.write(data);
        response.end();
      });
      break;
    case ('public/hydrogen.html'):
      fs.readFile('./public/hydrogen.html', 'utf-8', (err, data) => {
        response.writeHead(200, { 'content-type': 'text/html' });
        response.write(data);
        response.end();
      });
      break;
    case ('public/helium.html'):
      fs.readFile('./public/helium.html', 'utf-8', (err, data) => {
        response.writeHead(200, { 'content-type': 'text/html' });
        response.write(data);
        response.end();
      });
      break;
    case (`/public/${req.url}`):
      fs.readFile(`./public/${request.url}`, 'utf-8', (err, data) => {
        response.writeHead(200, { 'content-type': 'text/html' });
        response.write(data);
        response.end();
      });
  }
});

server.listen(PORT, () => {
  console.log(`server listening on port: ${PORT}`)
});

