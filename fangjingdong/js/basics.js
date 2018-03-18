/*封装id*/
function $(id) {return document.getElementById(id);}

/* 登录   点击登录，弹出窗口 */
var login = $("user_login");
var mask = $("mask");
var box = $("box");
login.onclick = function () {
    mask.style.display = "block";
    box.style.display = "block";
}

/* 登录   点击叉号，关闭窗口 */
var close_login = $("close_login");
close_login.onclick = function () {
    mask.style.display = "none";
    box.style.display = "none";
}

/* 生活服务小图标的遍历 */
var iis = $("iconsprite").getElementsByTagName("i");
for (var i=0; i<iis.length; i++){
    //this.style.backgroundPosition = "25px "+(-25*i)+"px";
    this.style.backgroundPosition = "0 "+(-25*i)+"px";
}

/* 轮播图动态生成小圆点 */
var scroll = $("scroll");
var newul = document.createElement("ul");
newul.setAttribute("class","circle");
scroll.appendChild(newul);

var imgs = scroll.getElementsByTagName("img");
for (var i=0; i<imgs.length; i++) {
    var newli = document.createElement("li");
    newli.innerHTML = i+1;
    newul.appendChild(newli);
}
var child = newul.children;
child[0].setAttribute("class","current");

/* 轮播图切换函数封装 */
function target(ids) {
    var ids = $(ids);
    var imgs = ids.getElementsByTagName("img");
    var lis = ids.getElementsByTagName("li");
    for (var i=0; i<lis.length; i++){
        lis[i].index = i;
        lis[i].onclick = function () {
            for (var j=0; j<imgs.length; j++){
                lis[j].className = "";
                imgs[j].style.display = "none";
            }
            this.setAttribute("class","current");
            imgs[this.index].style.display = "block";
        }
    }
}
target("scroll");  //大banner部分轮播图












