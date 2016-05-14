var aoDigitar = function (callback) {
	process.stdin.on('readable', function () {
		var data = process.stdin.read();
		var linha = (data) ? data.toString() : '';
		linha = linha.replace(/\n/, '');
		if (linha) callback(linha);
	});
};

module.exports = {
	aoDigitar: aoDigitar
};