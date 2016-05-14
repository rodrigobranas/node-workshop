var http = require('http');
  
var server = http.createServer(function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
	res.write('<b>Livros</b>');
	res.end();
});
server.listen(3000);