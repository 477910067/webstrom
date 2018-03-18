var fs = require("fs");

fs.readFile('input.txt', function (err, data) {
   if (err){
      console.log(err.stack);
      return;
   }
   console.log(data.toString());
});
console.log("程序执行完毕");

 /* 
 *有index文件时的结果：
 *
 * 程序执行完毕
 * 菜鸟教程官网地址：www.runoob.com
 */
 
 
  /* 
 *没有index文件时的结果：
 *
 * 程序执行完毕
 * Error: ENOENT: no such file or directory, open 'F:\Source\WebstormProjects\Node_Demo\04 node的工作方式\input.txt'
 */

