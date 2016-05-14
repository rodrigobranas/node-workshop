#Node.js Workshop

## Exercício 1 @ 10 minutos

1 - Crie um módulo chamado index (index.js), ele será o entry-point.

2 - Dentro do módulo index, crie uma função construtora chamada Livro contendo as propriedades titulo, autor, isbn, editora, paginas, ano, assunto, idioma.

3 - Crie também um array de livros, incluindo alguns livros diretamente dentro do array.

4 - Por fim, utilizando a função forEach, percorra o array de livros exibindo cada um deles.

## Exercício 2 (Sistema de Módulos) @ 30 minutos

1 - Crie uma pasta chamada domain e lá crie um módulo chamado livro (livro.js).

2 - Mova a função construtora Livro para lá, exportando-a na forma de uma função.

**Exemplo (livro.js):**

```javascript
  var Livro = function (titulo, ...) {
	this.titulo = titulo;
	...
  }; 

  module.exports = Livro;
```

3 - Crie uma pasta chamada data e lá crie um módulo chamado livros (livros.js)

4 - Mova o array de livros para lá, utilizando a função require para importar a função construtora Livro.

**Exemplo (livros.js):**

```javascript
var Livro = require('../domain/livro');

var livros = [
  new Livro(...),
  ...
];

module.exports = livros;
```

5 - No módulo index utilize a função require para importar o módulo livros.

**Exemplo (index.js):**

```javascript
var livros = require('./data/livros');
```

5 - Crie uma pasta chamada service e dentro crie um módulo chamado livrosService (livrosService.js).

6 - Mova a função forEach para dentro de uma função chamada exibirLivros, responsável por percorrer o array de livros e exibir seus detalhes.

7 - Por fim, no módulo index, faça o require do módulo livrosService e invoque a função exibirLivros.

## Exercício 3 (Global Objects) @ 20 minutos


1 - No módulo index, faça a leitura do teclado e imprima tudo que é digitado.

###Exemplo (index.js):

```javascript
process.stdin.on('readable', function () {
	var data = process.stdin.read();
	if (data) console.log(data.toString());
});
```

2 - No módulo livrosService, crie uma função para exibirLivrosPorTitulo, utilizando o que foi digitado para realizar a busca.

###Exemplo (livrosService.js):

```javascript
var livrosEncontrados = livros.filter(function (livro) {
	return livro.titulo.indexOf(titulo) > -1;
});
```

3 - Crie uma pasta chamada infra e crie um módulo chamado teclado (teclado.js).

4 - Mova a função de leitura do teclado para o módulo teclado, recebendo um callback que será executado sempre que algo for digitado.

###Exemplo (index.js):

```javascript
teclado.aoDigitar(function (linha) {
	livrosService.exibirLivrosPorTitulo(linha);
});
```

###Exemplo (teclado.js):

```javascript
var aoDigitar = function (callback) {
	process.stdin.on('readable', function () {
		var data = process.stdin.read();
		var linha = (data) ? data.toString() : '';
		linha = linha.replace(/\n/, '');
		if (linha) callback(linha);
	});
};
```

5 - Para sair, digite /q e invoque a função process.exit

###Exemplo (index.js):

```javascript
teclado.aoDigitar(function (linha) {
	if (linha === '/q') process.exit();
	livrosService.exibirLivrosPorTitulo(linha);
});
```

6 - Para dar a impressão que a busca está sendo realizada, faça com que a função exibirLivrosPorTitulo seja invocada com um atraso de 1000ms.

## Exercício 4 (Code Module) @ 15 minutos

1 - A lista de livros está em um arquivo .csv, leia o arquivo utilizando o módulo fs e a função readFile e crie o array de livros.

###Exemplo (livros.js)

```javascript
var carregarLivros = function () {
	fs.readFile('./data/livros.csv', 'utf8', function (err, csv) {
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
```

2 - Utilize o módulo zlib para zipar o csv. (opcional)

###Exemplo:

```javascript
var fs = require('fs');
var path = require('path');
var gzip = require('zlib').createGzip();
  
var inp = fs.createReadStream(path.join(__dirname, '/livros.csv'));
var out = fs.createWriteStream(path.join(__dirname, '/livros.zip'));
inp.pipe(gzip).pipe(out);
```

3 - Abrir o csv zipado. (opcional)

```javascript
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
```

4 - Utilize o módulo http para permitir consultar pela web.

## Exercício 5 (Express)

