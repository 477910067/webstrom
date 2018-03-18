var fs = require("fs");
var zlib = require('zlib');

// 压缩 input.txt 文件为 input.txt.gz
fs.createReadStream('input3.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input3.txt.gz'));
  
console.log("文件压缩完成。");