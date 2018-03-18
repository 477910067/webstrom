// 创建一个长度为 10、且用 0 填充的 Buffer。
const buf1 = Buffer.alloc(10);

// 创建一个长度为 10、且用 0x1 填充的 Buffer。 
const buf2 = Buffer.alloc(10, 1);

// 创建一个长度为 10、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 因此需要使用 fill() 或 write() 重写。
const buf3 = Buffer.allocUnsafe(10);

// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
const buf4 = Buffer.from([1, 2, 3]);

// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf5 = Buffer.from('tést');

// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf6 = Buffer.from('tést', 'latin1');

// 写入 Node 缓冲区语法:
// 1.string - 写入缓冲区的字符串。
// 2.offset - 缓冲区开始写入的索引值，默认为 0 。
// 3.length - 写入的字节数，默认为 buffer.length
// 4.encoding - 使用的编码。默认为 'utf8' 。
buf1.write(string[, offset[, length]][, encoding]);

// 读取 Node 缓冲区数据语法:
// 1.encoding - 使用的编码。默认为 'utf8' 。
// 2.start - 指定开始读取的索引位置，默认为 0。
// 3.end - 结束位置，默认为缓冲区的末尾。
buf.toString([encoding[, start[, end]]]);

// 将 Node Buffer 转换为 JSON 对象的函数语法格式如下:
buf.toJSON();

// Node 缓冲区合并的语法:
// 1.list - 用于合并的 Buffer 对象数组列表。
// 2.totalLength - 指定合并后Buffer对象的总长度。
Buffer.concat(list[, totalLength]);

// Node Buffer 比较的函数语法:
// 1.otherBuffer - 与 buf 对象比较的另外一个 Buffer 对象。
buf.compare(otherBuffer);

// Node 缓冲区拷贝语法:
// 1.targetBuffer - 要拷贝的 Buffer 对象。
// 2.targetStart - 数字, 可选, 默认: 0
// 3.sourceStart - 数字, 可选, 默认: 0
// 4.sourceEnd - 数字, 可选, 默认: buffer.length
buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]]);

// Node 缓冲区裁剪语法:
// 1.start - 数字, 可选, 默认: 0
// 2.end - 数字, 可选, 默认: buffer.length
buf.slice([start[, end]]);

// Node 缓冲区长度计算语法:
// 返回 Buffer 对象所占据的内存长度
buf.length;






