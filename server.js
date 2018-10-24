const http = require('http');
const fs = require('fs');
const PORT = process.env.PORT || 8080;


const server = http.createServer((request, response) => {
  let method = request.method;
  let url = request.url;

  if (url.indexOf('public') < 1) { //Add public to url
    url = 'public' + request.url;
  }

  console.log(url);
  console.log('Method: ', method);

  switch (url) {
    case 'public/':
      fs.readFile('public/index.html', (err, data) => {
        let data2 = data.toString();
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.write(data2)
        response.end();
      });
      break;
    case `public${request.url}`:
      fs.readFile(url, (err, data) => {
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.write(data)
        response.end();
      })
      break;
  }
  ///////POST////////////

});

server.listen(PORT, () => {
  console.log(`server listening on port: ${PORT}`)
});

