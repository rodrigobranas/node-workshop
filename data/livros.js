var Livro = require('../domain/livro');
var fs = require('fs');
var zlib = require('zlib');

var livros = [];

var carregarLivros = function () {
	fs.readFile(__dirname + '/livros.zip', function (err, zip) {
		if (err) {
			console.log(err);
			return;
		}
		zlib.unzip(zip, function (err, data) {
			if (err) {
				console.log(err);
				return;
			}
			var csv = data.toString('utf8');
			var linhas = csv.split('\n');
			linhas.forEach(function (linha) {
				var propriedades = linha.split(';');
				var livro = Livro.fromProperties(propriedades);
				livros.push(livro);
			});
		});
	});
};

carregarLivros();

module.exports = livros;