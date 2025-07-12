// 鱼类
var Fish = function(type) {
    this.type = type;  // 鱼的类型
    this.x = 0;        // x坐标
    this.y = 0;        // y坐标
    this.width = 50;   // 宽度
    this.height = 30;  // 高度
    this.speed = 2;    // 移动速度
    this.alive = true; // 是否活着
    
    // 初始化
    this.init();
};

Fish.prototype = {
    init: function() {
        // 随机生成鱼的位置
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        
        // 加载鱼的图片
        this.img = loadImage('fish' + this.type + '.png');
    },
    
    update: function() {
        // 简单的左右移动
        this.x += this.speed;
        
        // 如果超出屏幕，从另一边进入
        if (this.x > canvas.width) {
            this.x = -this.width;
        }
    },
    
    draw: function() {
        if (this.alive) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }
}; 