var http = require('http');
var url = require('url');
var livrosService = require('../service/livrosService');
  
var server = http.createServer(function (req, res) {
	var titulo = url.parse(req.url, true).query.titulo;
  	res.writeHead(200, {
    	'Content-Type': 'text/html;charset=UTF-8'
  	});
  	res.write('<h1>Livros: '+ titulo + '</h1>');
  	var livros = livrosService.getLivrosPorTitulo(titulo);
	livros.forEach(function (livro) {
		res.write('<h4>' + livro.titulo + '</h4>');
		res.write('<h5>' + livro.autor + '</h5><br/>');
	});
	res.end();
});

module.exports = server;