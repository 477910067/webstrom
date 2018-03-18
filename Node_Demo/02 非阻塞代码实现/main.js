// 非阻塞是不需要按顺序的  所以如果需要处理回调函数的参数，我们就需要写在回调函数内
// 不需要等待文件读取完，这样就可以在读取文件时同时执行接下来的代码，大大提高了程序的性能

var fs = require("fs");

fs.readFile('input.txt', function (err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
});

console.log("程序执行结束!");