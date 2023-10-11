//获取元素节点
var hotWord = document.querySelector(".hot-word");
// var search = document.querySelector('.search');
// var searchLog = document.querySelector('.search-log');

//切换输入框的关键字
(function(){   
var hotWords = ['苹果手机','家用电器','电脑','图书','教育','显示器','户外'];
var index = 0;
//设置HTML的标准属性：原属节点.属性="属性值"
setInterval(function(){
    index++;
    //范围校验
    if (index > hotWords.length - 1){
        index = 0;
    }
    //设置placeholder属性
    hotWord.placeholder = hotWords[index];
},3000);
})();

//模糊查询
//input当内容发生改变时触发
//change当内容确定改变时触发

//轮播图
var img = document.getElementById('img');
var prev = document.querySelector('.prev');
var next = document.querySelector('.next');
var lis = document.querySelectorAll('banner-btn>li');
var slideBanner = document.querySelector('.slide-banner');
var imgArr = ['5.jpg','6.jpg','7.jpg','8.jpg','9.jpg','10.jpg'];
var i = 0;

// 封装切换的函数
function banner(){
    //清空样式
    for(var k = 0;k < lis.length;k++){
        lis[k].className = '';
    }
    //设置图片路径
    img.src = 'images/' + imgArr[i];
    //设置点的样式
    lis[i].className = 'btn-active';
}

// 封装自动切换的函数
function autoBanner(){
    i++;
    if (i > imgArr.length - 1){
        i = 0;
    }
    banner();
}

var timer = setInterval(autoBanner,3000);
// 鼠标移入停止定时器
slideBanner.onmouseover = function(){
    clearInterval(timer);
}
// 鼠标离开开启定时器
slideBanner.onmouseout = function(){
    timer = setInterval(autoBanner,3000);
}
// 下一张
next.onclick = function(){
    i++;
    if(i > imgArr.length-1){
        i = 0;      
    }
    //设置图片路径
    banner();
}
// 上一张
prev.onclick = function(){
    i--;
    if(i < 0){
        i = imgArr.length - 1;
    }
    //设置图片路径
    banner();
}

// 点击点
// 拿到所有点
for (var j = 0; j < lis.length; j++) {
    //绑定点击事件
    lis[j].onclick = function() {
        i = j;
        //设置图片路径
        banner();
    }
}


//楼层效果
var elevator = document.querySelector('.elevator');
var header = document.querySelector('.header');
var items = document.querySelectorAll('.items');
var eleA = document.querySelectorAll('.elevator>a');

//header+banner的高度
var to = header.offsetHeight + slideBanner.offsetHeight + 40; //基础的距离

//声明一个数组，储存3个div距上面的距离
var floor=[];
//拿到3个div
for (var i = 0;i < items.length;i++){
    to = to + items[i].offsetHeight;
    floor.push(to);
}
console.log(floor);

//封装去掉a样式的函数
function clear(){
    for (var i =0; i < eleA.length; i++){
        eleA[i].className = '';
    }
}

//给页面绑定滚动监听事件
window.onscroll=function(){
    //获取滚动条距离上面的距离
    var top = document.documentElement.scrollTop || document.body.scrollTop;
    //获取元素距上面的距离
    var top1 = header.offsetHeight + slideBanner.offsetHeight + 40;

    //判断
    if(top >= top1){
        //固定定位
        elevator.className = 'elevator elevator-fix'
    }else{
        elevator.className ='elevator'
    }

    // 楼层效果
    // 判断top距上面的距离，对应的a修改字体颜色
    if (top >= top1 && top< floor[0]){
        clear();
        eleA[0].className = 'active';
    }
    else if (top >= floor[0] && top <= floor[1]){
        clear();
        eleA[1].className = 'active'
    }
    else if (top >= floor[1]){
        clear();
        eleA[2].className = 'active'
    }
    if(top < top1){
        clear()
    }

    //吸顶效果
    // if(top >= top1-62){
    //     search.className = 'header-fix';
    //     searchLog.style.display = 'block';
    // }
}