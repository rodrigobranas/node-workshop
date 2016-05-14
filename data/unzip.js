// var fs = require('fs');
// var path = require('path');
// var zlib = require('zlib');
  
// fs.readFile(path.join(__dirname, '/livros.zip') , function (err, data) {
//   	zlib.unzip(data, function (err, unzip) {
//     	fs.writeFile(path.join(__dirname, '/livros.csv2'), unzip);
//   	});
// });
var fs = require('fs');
var path = require('path');
var gunzip = require('zlib').createGunzip();
  
var inp = fs.createReadStream(path.join(__dirname, '/livros.zip'));
var out = fs.createWriteStream(path.join(__dirname, '/livros.csv2'));
inp.pipe(gunzip).pipe(out);