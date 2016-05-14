#Node.js Workshop

Após finalizar o processo de instalação do Node.js, crie uma pasta para o projeto.

## Exercício 1 @ 10 minutos

1 - Crie um módulo chamado index (index.js), ele será o entry-point e deverá ser invocado da seguinte forma:

```
node index.js
```

2 - Dentro do módulo index, crie uma função construtora (aquela que utiliza o operador new) chamada Livro, contendo as propriedades titulo, autor, isbn, paginas, ano, editora, idioma e assunto.

```javascript
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
```

3 - Crie também um array de livros, incluindo alguns livros diretamente dentro do array.


```javascript
var livros = [
	new Livro(...),
	new Livro(...),
	new Livro(...)
];
```

4 - Por fim, utilizando a função forEach, percorra o array de livros exibindo cada um deles.


```javascript
livros.forEach(function (livro) {
	console.log(livro);
});
```

## Exercício 2 (Sistema de Módulos) @ 30 minutos

1 - Crie uma pasta chamada domain e lá crie um módulo chamado livro (livro.js).

2 - Mova a função construtora Livro para lá, exportando-a na forma de uma função.

```javascript
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

module.exports = Livro;
```

3 - Crie uma pasta chamada data e lá crie um módulo chamado livros (livros.js)

4 - Mova o array de livros para lá, utilizando a função require para importar a função construtora Livro.

```javascript
var Livro = require('../domain/livro');

var livros = [
	new Livro(...),
	new Livro(...),
	new Livro(...)
];

module.exports = livros;
```

4 - Crie uma pasta chamada service e dentro crie um módulo chamado livrosService (livrosService.js).

5 - Mova a função forEach para dentro de uma função chamada exibirLivros, responsável por percorrer o array de livros e exibir seus detalhes.

```javascript
var livros = require('../data/livros');

var exibirLivros = function () {
	livros.forEach(function (livro) {
		console.log(livro);
	});
};

module.exports = {
	exibirLivros: exibirLivros
};
```

6 - Por fim, no módulo index, faça o require do módulo livrosService e invoque a função exibirLivros.

```javascript
var livrosService = require('./service/livrosService');

livrosService.exibirLivros();
```

## Exercício 3 (Global Objects) @ 20 minutos


1 - No módulo index, faça a leitura do teclado e imprima tudo que é digitado.

```javascript
process.stdin.on('readable', function () {
	var data = process.stdin.read();
	if (data) console.log(data.toString());
});
```

2 - Crie uma pasta chamada infra e crie um módulo chamado teclado (teclado.js), movendo a função de leitura do teclado para o módulo teclado, recebendo um callback que será executado sempre que algo for digitado.

```javascript
var aoDigitar = function (callback) {
	process.stdin.on('readable', function () {
		var data = process.stdin.read();
		var linha = (data) ? data.toString() : '';
		linha = linha.replace(/\n/, '');
		if (linha) callback(linha);
	});
};

module.exports {
	aoDigitar: aoDigitar
};
```

3 - No módulo index, utilize a função require para importar o módulo teclado.

```javascript
var livrosService = require('./service/livrosService');
var teclado = require('./infra/teclado.js');

teclado.aoDigitar(function (linha) {
	console.log(linha);
});
```

4 - No módulo livrosService, crie uma função para exibirLivrosPorTitulo, utilizando o que foi digitado para realizar a busca.

```javascript
var livros = require('../data/livros');

var exibirLivrosPorTitulo = function (titulo) {
	var livrosEncontrados = livros.filter(function (livro) {
	  return livro.titulo.indexOf(titulo) > -1;
	});
	if (livrosEncontrados.length === 0) {
		console.log("Nenhum livro foi encontrado!");
		return;
	}
	livrosEncontrados.forEach(function(livro) {
		console.log(livro);
	});
};

module.exports = {
	exibirLivrosPorTitulo: exibirLivrosPorTitulo
};
```

5 - Modifique o módulo index para invocar a função exibirLivrosPorTitulo sempre que alguma linha for digitada.

```javascript
var livrosService = require('./service/livrosService');
var teclado = require('./infra/teclado.js');

teclado.aoDigitar(function (linha) {
	livrosService.exibirLivrosPorTitulo(linha);
});
```

6 - Adicione a possibilidade de digitar /q para sair, utilizando a função process.exit()

```javascript
var livrosService = require('./service/livrosService');
var teclado = require('./infra/teclado.js');

teclado.aoDigitar(function (linha) {
	if (linha === '/q') process.exit();
	livrosService.exibirLivrosPorTitulo(linha);
});
```

7 - Para dar a impressão que a busca está sendo realizada, faça com que a função exibirLivrosPorTitulo seja invocada com um atraso de 1000ms.

```javascript
var livrosService = require('./service/livrosService');
var teclado = require('./infra/teclado.js');

teclado.aoDigitar(function (linha) {
	if (linha === '/q') process.exit();
	setTimeout(function () {
		livrosService.exibirLivrosPorTitulo(linha);
	}, 1000);
});
```

## Exercício 4 (Code Module) @ 20 minutos

1 - No módulo livros, obtenha a lista de livros diretamente do arquivo livros.csv, utilizando função readFile do módulo fs, criando o array de livros a partir do arquivo lido.

```javascript
var fs = require('fs');

var livros = [];

var carregarLivros = function () {
	fs.readFile('./data/livros.csv', 'utf8', function (err, csv) {
		if (err) {
			console.log(err);
			return;
		}
		var linhas = csv.split('\n');
		linhas.forEach(function (linha) {
			var propriedades = linha.split(';');
			var livro = new Livro(propriedades[0], propriedades[1], propriedades[2], propriedades[3], propriedades[4], propriedades[5], propriedades[6], propriedades[7]);
			livros.push(livro);
		})
	});
};

carregarLivros();

module.exports = livros;
```

2 - Crie um módulo chamado zip para comprimir o arquivo livros.csv utilizando o  módulo zlib.

```javascript
var fs = require('fs');
var path = require('path');
var gzip = require('zlib').createGzip();
  
var inp = fs.createReadStream(path.join(__dirname, '/livros.csv'));
var out = fs.createWriteStream(path.join(__dirname, '/livros.zip'));
inp.pipe(gzip).pipe(out);
```

3 - Crie outro módulo chamado unzip para descomprimir o arquivo livros.zip.


4 - Modifique a função carregarLivros, do módulo livros, para descomprimir o arquivo livros.zip antes de montar o array. 

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
				var livro = new Livro(propriedades[0], propriedades[1], propriedades[2], propriedades[3], propriedades[4], propriedades[5], propriedades[6], propriedades[7]);
				livros.push(livro);
			});
		});
	});
};
```

4 - Crie a pasta http, juntamente com o módulo livrosHttp, utilizando o módulo http para listar os livros pela web.

```javascript
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
module.exports = server;
```

5 - Mude o módulo index para que seja possível rodar por meio do teclado ou de http.

```javascript
var livrosService = require('./service/livrosService');
var livrosHttp = require('./http/livrosHttp');
var teclado = require('./infra/teclado.js');

var httpMode = process.argv.some(function (arg) {
	return arg === 'http';
});

if (httpMode) {
	console.log("Http Mode");
	livrosHttp.listen(3000);
	return;
}

teclado.aoDigitar(function (linha) {
	if (linha === '/q') process.exit();
	setTimeout(function () {
		livrosService.exibirLivrosPorTitulo(linha);
	}, 1000);
});
```

## Exercício 5 (Express)

