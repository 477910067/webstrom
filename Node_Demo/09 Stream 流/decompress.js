var fs = require("fs");
var zlib = require('zlib');

// 解压 input.txt.gz 文件为 input.txt
fs.createReadStream('input4.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('input4.txt'));
  
console.log("文件解压完成。");