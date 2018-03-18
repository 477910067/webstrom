var fs = require("fs");

// 创建一个可读流
var readerStream = fs.createReadStream('input2.txt');

// 创建一个可写流
var writerStream = fs.createWriteStream('stream.txt');

// 管道读写操作
// 读取 input2.txt 文件内容，并将内容写入到 stream.txt 文件中
readerStream.pipe(writerStream);

console.log("stream.txt 文件创建成功");
console.log("程序执行完毕");