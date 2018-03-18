/*/!* 封装$ *!/
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
/!* 封装class类 *!/
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
}*/
$(document).ready(function(){

    /*点击按钮*/

    $(".line").on("click",function(){

         $(this).toggleClass("toggle").siblings(".nav1").toggle();
    })
    $(".user").on("click",function(){
        $(".user-btn").toggleClass("move");
    })
    var slide = $(".slide");  // 获取滚动的盒子
    var discLi = $(".disc li");
    var slideLi = $(".slide li");
    var W = $(window).width();  // 获取屏幕的宽度
    // 克隆一张图片
    slide.append(slideLi.eq(0).clone(true));
    /* discLi.on({
         "mouseenter":function(){ alert(11);},
         "click":function(){alert(22);}
     })
     事件委托   多个事件*/
    $(".slide li").width(W);  // 把屏幕的宽度给 滚动的  li
    var key = 0; // 图片的张数
    var circle = 0; // 小圆点的
    discLi.on("click",function(){
        /*alert($(this).index());*/
       /* 点击第n个点 ，slide就要走n屏幕*/
       circle =  key = $(this).index();// 把当前的序号给 key
        run();
        disc();
    })

    /*运动函数*/
    function run(){
        slide.stop().animate({"left":-key * W},500);
    }

    /*小圆点函数*/
    function disc(){
        discLi.eq(circle).addClass("current").siblings().removeClass();
    }

    /*添加定时器*/
    var timer = 0;

    timer = setInterval(autoplay,3000);

    // 自动播放函数
    function autoplay(){
        // 先看图片
        key++;
        if(key > slideLi.length)
        {
            slide.css("left",0);  //css 闪电回到第一张
            key = 1; // 爬到第二张
        }
        run();
        // 再看小圆点
        circle++;
        circle > discLi.length-1 ? circle = 0 : circle;
        disc();
    }

    // 关闭定时器
    $(".banner").hover(function(){
        clearInterval(timer);
        timer = null;
    },function(){
        clearInterval(timer); // 记住 非常重要， 要开定时器， 先关闭定时器。
        timer = setInterval(autoplay,3000);
    })

    // 屏幕缩放
    $(window).resize(function(){
        W = $(window).width();
        $(".slide li").width(W);
    })


})
