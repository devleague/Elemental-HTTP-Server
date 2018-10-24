const http = require('http');
const fs = require('fs');
//const public = require('./public')

const PORT = process.env.PORT || 3000;

function reqResp(uri, res) {
  fs.readFile(`./public${uri}`, (err, data) => {
    if (err) {
      fs.readFile('./public/error.html', (err, data) => {
        if (err) throw 'error';
        res.setHeader('Content-Type', '[text/html, utf8]')
        res.writeHead(404, 'ERROR')
        res.write(data)
        res.end();
    }
    )
  }else {
      res.setHeader('Content-Type', contType(uri))
      res.writeHead('200', 'OK')
      res.write(data)
      res.end();
    }
  })
}
function contType(uri) {
 const type = uri.split('.')
return 'text/' + type[type.length-1]
}



const server = http.createServer((request, response) => {
  const uri = request.url;
  const reqMeth = request.method;
  const res = response;

  switch (reqMeth) {
    case 'GET':
      reqResp(uri, res);
      break;
    case 'POST':
    break;
    default:
      break;
  }
})

server.listen(PORT, () => {
  console.log(`Server is listening in on ${PORT}.`)
});

