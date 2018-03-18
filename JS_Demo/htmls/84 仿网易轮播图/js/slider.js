window.onload = function () {
    function $(id) {
        return document.getElementById(id);
    }

    // 获取元素

    var js_slider = $("js_slider");  // 获取最大的盒子
    var slider_main_block = $("slider_main_block");  // 获取 图片的父盒子
    var imgs = slider_main_block.children;   // 获取所有的图片组
    var slider_ctrl = $("slider_ctrl");   // 获得控制的父盒子

    // 操作元素

    // 生成小span
    for (var i=0; i<imgs.length; i++) {
        var span = document.createElement("span");
        span.className = "slider-ctrl-con";
        span.innerHTML = imgs.length - i;
        slider_ctrl.insertBefore(span,slider_ctrl.children[1]);
    }

    var spans = slider_ctrl.children;   // 得到所有的span
    spans[1].setAttribute("class","slider-ctrl-con current");

    var scrollWidth = js_slider.clientWidth;  // 得到大盒子的宽度 也就是后面动画走的距离 310

    // 刚开始 第一张图片留下  其余图片放在右面 构成排队效果
    for (var i=1; i<imgs.length; i++){
        imgs[i].style.left = scrollWidth + "px";
    }

    // 遍历3个按钮
    // spans 是8个按钮 它们都是span
    var iNew = 0;   // 用来控制播放张数
    for (var k in spans){
        spans[k].onclick = function () {
            if (this.className == "slider-ctrl-prev"){
                //alert("左滑");
                animate(imgs[iNew],{left: scrollWidth});
                --iNew < 0 ? iNew = imgs.length -1 : iNew;
                imgs[iNew].style.left = -scrollWidth + "px";
                animate(imgs[iNew],{left: 0});
                setSquare();
            } else if (this.className == "slider-ctrl-next") {
                //alert("右滑");
                autoPlay();
            } else {
                //alert(this.innerHTML);
                var that = this.innerHTML - 1;
                if (that > iNew){
                    // 做法等同于右侧按钮
                    animate(imgs[iNew],{left: -scrollWidth});   // 当前这张慢慢走出去
                    imgs[that].style.left = scrollWidth + "px";    // 点击的这张慢慢走进来
                } else if (that < iNew) {
                    // 做法等同于左侧按钮
                    animate(imgs[iNew],{left: scrollWidth});   // 当前这张慢慢走出去
                    imgs[that].style.left = -scrollWidth + "px";    // 点击的这张慢慢走进来
                }
                iNew = that;  // 给当前的索引号
                animate(imgs[that],{left: 0});
                setSquare();
            }
        }
    }

    // 一个可以控制播放span的函数
    function setSquare() {
        // 清除所有的span current  留下满足需要的那一个
         for (var i=1; i<spans.length-1; i++) {
            spans[i].className = "slider-ctrl-con";
         }
         spans[iNew+1].className = "slider-ctrl-con current";
    }    

    // 定时器开始  其实就是右侧按钮的定时器
    var timer = null;
    timer = setInterval(autoPlay,1000);

    function autoPlay() {
        animate(imgs[iNew],{left: -scrollWidth});
        ++iNew >= imgs.length ? iNew = 0 : iNew;
        imgs[iNew].style.left = scrollWidth + "px";
        animate(imgs[iNew],{left: 0});
        setSquare();
    }

    // 鼠标经过大盒子清除定时器
    js_slider.onmouseover = function () {
        clearInterval(timer);
    }
    js_slider.onmouseout = function () {
        clearInterval(timer);  // 开启之前也要先清除一下
        timer = setInterval(autoPlay,1000);
    }
}