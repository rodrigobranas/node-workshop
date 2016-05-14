#Node.js Workshop

## Exercício 1 @ 10 minutos

1. Crie um módulo chamado index (index.js), ele será o entry-point.

2. Dentro do módulo index, crie:

* Uma função construtora chamada Livro contendo as propriedades titulo, autor, isbn, editora, paginas, ano, assunto, idioma.

* Um array de livros, incluindo alguns livros diretamente dentro do array.

* Utilizando a função forEach, percorra o array de livros exibindo cada um deles.

## Exercício 2 (Sistema de Módulos) @ 30 minutos

1. Crie uma pasta chamada server.
2. Dentro da pasta server, crie uma pasta chamada domain e lá crie:

* Um módulo chamado livro (livro.js)
* Mova a função construtora Livro para lá, exportando-a na forma de uma função.

###Exemplo (livro.js):

```javascript

  var Livro = function (titulo, ...) {
	this.titulo = titulo;
	...
  }; 

  module.exports = Livro;
  ``

3. Dentro da pasta server, crie uma pasta chamada data e lá crie:

* Um módulo chamado livros (livros.js)
* Mova o array de livros para lá, utilizando a função require para importar a função construtora Livro.

Exemplo (livros.js):

var Livro = require('../domain/livro');

var livros = [
  new Livro(...),
  ...
];

4. No módulo index utilizar a função require para importar o módulo livros. Não se esqueça de exportar o array de livros dentro do módulo livros.

Exemplo (livros.js):

module.exports = livros;

Exemplo (index.js):

var livros = require('./server/data/livros');

5. Não acesse a camada data diretamente.

* Dentro da pasta server crie uma pasta chamada service.
* Crie um módulo chamado livrosService (livrosService.js).
* Mova a função forEach para dentro de uma função chamada exibirLivros, responsável por percorrer o array de livros e exibir seus detalhes.
* No módulo index, faça o require do módulo livrosService e invoque a função exibirLivros.

> Exercício 3 (Global Objects) @ 20 minutos


a) No módulo index, faça a leitura do teclado e imprima tudo que é digitado.

Exemplo (index.js):

process.stdin.on('readable', function () {
	var data = process.stdin.read();
	if (data) console.log(data.toString());
});

b) No módulo livrosService, crie uma função para exibirLivrosPorTitulo, utilizando o que foi digitado para realizar a busca.

Exemplo (livrosService.js):

var livrosEncontrados = livros.filter(function (livro) {
	return livro.titulo.indexOf(titulo) > -1;
});

b) Dentro da pasta server, crie uma pasta chamada infra.
c) Crie um módulo chamado teclado (teclado.js).
d) Mova a função de leitura do teclado para o módulo teclado, recebendo um callback que será executado sempre que algo for digitado.

Exemplo (index.js):

teclado.aoDigitar(function (linha) {
	livrosService.exibirLivrosPorTitulo(linha);
});

Exemplo (teclado.js):

var aoDigitar = function (callback) {
	process.stdin.on('readable', function () {
		var data = process.stdin.read();
		var linha = (data) ? data.toString() : '';
		linha = linha.replace(/\n/, '');
		if (linha) callback(linha);
	});
};

e) Para sair, digite /q e invoque a função process.exit

Exemplo (index.js):

teclado.aoDigitar(function (linha) {
	if (linha === '/q') process.exit();
	livrosService.exibirLivrosPorTitulo(linha);
});

f) Para dar a impressão que a busca está sendo realizada, faça com que a função exibirLivrosPorTitulo seja invocada com um atraso de 1000ms.

> Exercício 4 (Code Module) @ 15 minutos

a) A lista de livros está em um arquivo .csv, leia o arquivo utilizando o módulo fs e a função readFile e crie o array de livros.

Exemplo (livros.js)

var carregarLivros = function () {
	fs.readFile('./server/data/livros.csv', 'utf8', function (err, csv) {
		if (err) {
			console.log(err);
			return;
		}
		var linhas = csv.split('\n');
		linhas.forEach(function (linha) {
			var propriedades = linha.split(';');
			var livro = Livro.fromProperties(propriedades);
			livros.push(livro);
		})
	});
};

b) Utilize o módulo zlib para zipar o csv. (opcional)

Exemplo:

var fs = require('fs');
var path = require('path');
var gzip = require('zlib').createGzip();
  
var inp = fs.createReadStream(path.join(__dirname, '/livros.csv'));
var out = fs.createWriteStream(path.join(__dirname, '/livros.zip'));
inp.pipe(gzip).pipe(out);

c) Abrir o csv zipado. (opcional)

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

> Exercício 5 (Express)

