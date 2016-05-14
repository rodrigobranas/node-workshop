var livros = require('../data/livros');

var exibirLivros = function () {
	livros.forEach(function (livro) {
	  console.log(livro);
	});
};

var getLivros = function () {
	return livros;
};

var getLivrosPorTitulo = function (titulo) {
	if (!titulo) return livros;
	return livros.filter(function (livro) {
	  return livro.titulo.indexOf(titulo) > -1;
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
	getLivros: getLivros,
	getLivrosPorTitulo: getLivrosPorTitulo,
	exibirLivros: exibirLivros,
	exibirLivrosPorTitulo: exibirLivrosPorTitulo
};