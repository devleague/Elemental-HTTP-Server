console.log('Pray For Me');
const http = require('http');
const fs = require('fs');
const PORT = process.env.PORT || 8080;
const qs = require('querystring')

function getType(url) {
  let uriArr = url.split('.');
  let index = uriArr.length - 1;
  let type = uriArr[index];
  return type
};
function getHandler(request, response) {
  let req = request.url;
  let met = response.method;
  req = (req === '/') ? '/index.html' : req;
  let type = getType(req);
  fs.readFile('./public' + req, (err, data) => {
    if (err) {
      fs.readFile('./public/404.html', 'utf8', (err, data) => {
        response.setHeader('Content-Type', 'text/html')
        response.writeHead(404, 'Bad Request')
        response.write(data);
        response.end();
      })
    }
    else {
      response.setHeader('Content-Type', `text/${type}`)
      response.writeHead(200, 'Request Complete', )
      response.write(data);
      response.end();
    }
  });
}

function postHandler(request, response) {

  request.on('data', (chunk) => {
    let body = qs.parse(`${chunk}`);
    let datas = `<!DOCTYPE html>
 <html lang="en">
 <head>
   <meta charset="UTF-8">
   <title>The Elements - ${body.elementTitle}</title>
   <link rel="stylesheet" href="/css/styles.css">
 </head>
 <body>
   <h1>${body.elementName}</h1>
   <h2>${body.elementSymbol}</h2>
   <h3>${body.elementAtomicNumber}</h3>
   <p>${body.elementDescription}</p>
   <p><a href="/">back</a></p>
 </body>
 </html>`;
    // console.log(datas)
    fs.writeFile('./public/' + `${body.elementName}.html`, datas, (err) => {
     if (err) {
    response.end('404 not found');
  } else {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ "success": 'true' }));

        fs.readdir('./public', 'utf8', (err, files) => {
          let lastFile = files[files.length - 1]
          console.log('this is', lastFile)
          let ul = '<ul>'
          if (err) throw err;
          console.log('KAKAKAKAKA', files);
          let newIndex = `<!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>The Elements</title>
            <link rel="stylesheet" href="/css/styles.css">
          </head>
          <body>
            <h1>The Elements</h1>
            <h2>These are all the known elements.</h2>
            <h3>These are 2</h3>
            <ol>
              <li>
                <a href="/hydrogen.html">Hydrogen</a>
              </li>
              <li>
                <a href="/helium.html">Helium</a>
                </li>  
               <li>
               <a href = "/${lastFile}">${lastFile}</a>
                </ol>
                </body>
                </html>`
                console.log(newIndex)
        })
      }
    })
  })
}

const server = http.createServer((request, response) => {
  let method = request.method;
  let url = request.url;

  switch (request.method) {
    case 'GET':
      getHandler(request, response)
  }

  switch (request.method) {
    case 'POST':
      postHandler(request, response);
  }
});




server.listen(PORT, () => {
  console.log(`server listening on port: ${PORT}`)
});

