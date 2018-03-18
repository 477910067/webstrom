
/* 封装展示与隐藏 */
function show(obj) {
    obj.style.display = "block";
}
function hidden(obj) {
    obj.style.display = "none";
}

/* 封装$ */
function $(str) {
    var s = str.charAt(0);   //  一个s 的变量 存放是 符号  #  .
    var ss = str.substr(1);  // demo
    switch(s) {
        case "#":
            return document.getElementById(ss);
            break;
        case ".":
            return getClass(ss);
            break;
        default :
            return document.getElementsByTagName(str);
    }
}

/* 封装class类 */
function getClass(classname) {
    //如果浏览器支持  则直接返回
    if (document.getElementsByClassName){
        return document.getElementsByClassName(classname);
    }

    //不支持的浏览器
    var arr = [];   //用于存放满足的数组
    var dom = document.getElementsByTagName("*");
    for (var i=0; i<dom.length; i++){  //遍历所有的盒子
        var txtArr = dom[i].className.split(" ");  //如果多个类名在一起  分割类名  并转换为数组
        for (var j=0; j<txtArr.length; j++){  //遍历通过类名分割的数组
            if (txtArr[j] == classname){
                arr.push(dom[i]);
            }
        }
    }
    return arr;
}

/* 封装scroll 滚动 */
function scroll() {
    if (window.pageYOffset != null) {   // ie9+ 和其他浏览器
        return {   // 由 json{left:10,right:10} 变异 而来
            left : window.pageXOffset,
            top : window.pageYOffset
        }
    } else if (document.compatMode == "CSS1Compat") {    // 已声明<!DOCTYPE html>的
        // 检测是不是怪异模式的浏览器  即是否 声明<!DOCTYPE html>
        return {
            left : document.documentElement.scrollLeft,
            top : document.documentElement.scrollTop
        }
    }
    return {    // 剩下的肯定是怪异模式的  即 未声明<!DOCTYPE html>
        left : document.body.scrollLeft,
        top : document.body.scrollTop
    }
}

/* 封装可视区域大小的函数 */
function client() {
    if (window.innerWidth != null) {   // ie9+ 最新浏览器
        return {
            width:window.innerWidth,
            height:window.innerHeight
        }
    } else if (document.compatMode === "CSS1Compat") {   //标准浏览器
        return {
            width:document.documentElement.clientWidth,
            height:document.documentElement.clientHeight
        }
    }
    return {   // 怪异浏览器
        width:document.body.clientWidth,
        height:document.body.clientHeight
    }
}

/* 封装阻止冒泡的函数 */
function stopBubble(event) {
    var event = event || window.event;
    if (event && event.stopPropagation()){
        event.stopPropagation();   // W3C标准
    } else {
        event.cancelBubble = true;    // ie 678 标准
    }
}

/* 防止拖动时选中任何内容 */
function noDrag() {
    // 兼容 ie678 的模式
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
}

/* 封装返回当前样式的函数 */
function getStyle(obj,attr) {   // 第一个参数 谁的   第二个参数 哪个属性
    if (obj.currentStyle){   // 兼容 ie 678 浏览器
        // attr为字符串  相当于"width"    style.width 等价于 style["width"]
        return obj.currentStyle[attr];
    } else {   // W3C 浏览器
        return window.getComputedStyle(obj,null)[attr];
    }
}

/* 封装单个属性的运动框架函数 */
var timer = null;
function animateD(obj,attr,target) {  // 给谁  什么属性  目标多少
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        // 计算步长 动画原理    盒子本身的样式 + 步长
        // 我们怎么知道当前的样式
        // 先得到 当前的样式 然后用target减去 再除以10  就可以了
        var current = parseInt(getStyle(obj,attr));   // 得到当前的样式 的数值
        var step = ( target - current ) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);

        // 开始动画
        obj.style[attr] = current + step + "px";
        if (current == target){
            clearInterval(timer);
        }
    },10)
}

/* 封装多个属性的运动框架函数 */
function animate(obj, json, fn) {   // 给谁 json
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;   // 用来判断是否停止定时器
        // 先 遍历json
        for (var k in json) {   // 这里的 k 是当前样式的属性
            // 目标位置就是 属性值
            var current = 0;   // 得到当前的样式 的数值

            // 判断透明度
            if (k == "opacity") {
                current = parseInt(getStyle(obj, k) * 100);
            } else {
                current = parseInt(getStyle(obj, k));
            }

            // 用target位置 减去当前的位置 再除以10
            var step = (json[k] - current) / 10;    // 步长
            step = step > 0 ? Math.ceil(step) : Math.floor(step);

            // 判断透明度
            if (k == "opacity") {   // 判断用户有没有输入 opacity
                if ("opacity" in obj.style) {    // 判断我们浏览器是否支持 opacity
                    obj.style[k] = (current + step) / 100;   // W3C 标准写法
                } else {
                    obj.style.filter = "alpha(opacity = " + (current + step) + ")";   // IE 678 写法
                }
            } else if (k == "zIndex") {   // 判断 z-index
                obj.style.zIndex = json[k];
            } else {
                obj.style[k] = current + step + "px";
            }

            // 开始动画
            if (current != json[k]) {   // 只要json中有一个未停止 就不满足停止条件  这句一定在遍历里面
                flag = false;
            }
        }
        if (flag) {
            clearInterval(timer);
            if (fn) {  // 如果有回调 执行回调
                fn();
            }
        }
    }, 10)
}


