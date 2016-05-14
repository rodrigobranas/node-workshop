var livrosService = require('./service/livrosService');
var livrosHttp = require('./http/livrosHttp');
var teclado = require('./infra/teclado.js');

var httpMode = process.argv.some(function (arg) {
	return arg === '-http';
});

if (httpMode) {
	console.log("Http Mode");
	livrosHttp.listen(3000);
	return;
}

console.log("Keyboard Mode");
var exibirMenu = function () {
	console.log('');
	console.log('O que você está buscando?');
	console.log('');
	console.log('Basta digitar o título do livro');
	console.log('Utilize o comando /q para sair.');
	console.log('');
	process.stdout.write('> ');
};

teclado.aoDigitar(function (linha) {
	if (linha === '/q') process.exit();
	console.log('');
	setTimeout(function () {
		livrosService.exibirLivrosPorTitulo(linha);
		console.log('');
		process.stdout.write('> ');
	}, 1000);
});

exibirMenu();