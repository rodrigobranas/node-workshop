var express = require('express');
var app = express();
var livrosService = require('../service/livrosService');

app.get('/livros', function (req, res) {
	res.json(livrosService.getLivros());
});

module.exports = app;