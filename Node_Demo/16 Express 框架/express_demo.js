//express_demo.js 文件
var express = require('express');
var app = express();
 
// Express 应用使用回调函数的参数： request 和 response 对象来处理请求和响应的数据。
app.get('/', function (req, res) {
   res.send('Hello World');
})
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})