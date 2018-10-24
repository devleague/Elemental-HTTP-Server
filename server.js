const http = require('http');
const fs = require('fs');
const PORT = process.env.PORT || 8080;

//404 Response
function send404(response) {
  response.writeHead(404, { 'Content-Type': 'text/plain' });
  response.write('404: page not found');
  response.end();
}

const server = http.createServer((request, response) => {
  let url = request.url;
  switch (meth) {
    case ('GET'):
      fileFetch(url, response);
      break;
    case ('POST'):
      if (url !== 'public/elements') {
        response.writeHead(400, 'Bad Request', { 'content-type': 'text/plain' });
        response.end();
        break;
      }

      let requestBod = " ";

      request.on('data', function (chunk) {
        console.log(chunk)
        requestBod += chunk;
      })
  }

}) 
    server.listen(PORT, () => {
      console.log(`server listening on port: ${PORT}`)
});

