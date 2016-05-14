// var fs = require('fs');
// var path = require('path');
// var zlib = require('zlib');
  
// fs.readFile(path.join(__dirname, '/livros.csv') , function (err, data) {
// 	zlib.gzip(data, function (err, zip) {
// 		fs.writeFile(path.join(__dirname, '/livros.zip'), zip);
// 	});
// });
var fs = require('fs');
var path = require('path');
var gzip = require('zlib').createGzip();
  
var inp = fs.createReadStream(path.join(__dirname, '/livros.csv'));
var out = fs.createWriteStream(path.join(__dirname, '/livros.zip'));
inp.pipe(gzip).pipe(out);