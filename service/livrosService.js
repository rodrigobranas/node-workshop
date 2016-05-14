var livros = require('../data/livros');

var exibirLivros = function () {
	livros.forEach(function (livro) {
	  console.log(livro);
	});
};

var exibirLivrosPorTitulo = function (titulo) {
	console.log('Buscando por: ' + titulo);
	var livrosEncontrados = livros.filter(function (livro) {
	  return livro.titulo.indexOf(titulo) > -1;
	});
	if (livrosEncontrados.length === 0) {
		console.log("Nenhum livro foi encontrado!");
		return;
	}
	console.log(livrosEncontrados.length + ' foram encontrados');
	livrosEncontrados.forEach(function(livro) {
		console.log(livro);
	});
};

module.exports = {
	exibirLivros: exibirLivros,
	exibirLivrosPorTitulo: exibirLivrosPorTitulo
};