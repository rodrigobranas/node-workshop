var Livro = require('../domain/livro');
var fs = require('fs');

var livros = [];

var carregarLivros = function () {
	fs.readFile(__dirname + '/livros.csv', 'utf8', function (err, data) {
		if (err) {
			console.log(err);
			return;
		}
		var linhas = data.split('\n');
		linhas.forEach(function (linha) {
			var propriedades = linha.split(';');
			var livro = Livro.fromProperties(propriedades);
			livros.push(livro);
		})
	});
};

carregarLivros();

module.exports = livros;