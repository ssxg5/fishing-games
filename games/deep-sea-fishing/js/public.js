// 获取元素
function $(id) {
    return document.getElementById(id);
}

// 获取画布上下文
var canvas = $('gameCanvas');
var ctx = canvas.getContext('2d');

// 加载图片
function loadImage(src) {
    var img = new Image();
    img.src = '/fishing-games/games/deep-sea-fishing/images/' + src;
    return img;
}

// 碰撞检测
function isCollision(obj1, obj2) {
    var l1 = obj1.x;
    var r1 = obj1.x + obj1.width;
    var t1 = obj1.y;
    var b1 = obj1.y + obj1.height;

    var l2 = obj2.x;
    var r2 = obj2.x + obj2.width;
    var t2 = obj2.y;
    var b2 = obj2.y + obj2.height;

    if (r1 < l2 || l1 > r2 || b1 < t2 || t1 > b2) {
        return false;
    }
    return true;
} 