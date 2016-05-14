var http = require('http');
var livrosService = require('../service/livrosService');
  
var server = http.createServer(function (req, res) {
  	res.writeHead(200, {
    	'Content-Type': 'text/html;charset=UTF-8'
  	});
  	res.write("<h1>Livros</h1>")
  	var livros = livrosService.getLivros();
	livros.forEach(function (livro) {
		res.write("<h4>" + livro.titulo + "</h4>");
		res.write("<h5>" + livro.autor + "</h5><br/>");
	});
	res.end();
});
server.listen(3000);