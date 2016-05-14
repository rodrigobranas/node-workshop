var Livro = function (titulo, autor, isbn, paginas, ano, editora, idioma, assunto) {
	this.titulo = titulo;
	this.autor = autor;
	this.isbn = isbn;
	this.paginas = paginas;
	this.ano = ano;
	this.editora = editora;
	this.idioma = idioma;
	this.assunto = assunto;
};

Livro.fromProperties = function (properties) {
	return new Livro(properties[0], properties[1], properties[2], properties[3], properties[4], properties[5], properties[6], properties[7]);
};

module.exports = Livro;