(function () {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    const cWidth = ctx.canvas.width = 1200;
    const cHeight = ctx.canvas.height;

    const bg = new Image();
    bg.src = './background.png';

    let rightPressed = false;
    let leftPressed = false;
    let pVelocity = 3;

    function Player() {
        this.x = cWidth / 2;
        this.y = 370;
        this.w = 30;
        this.h = 60;
        this.moving = false;
        this.render = function () {
            ctx.fillStyle = 'orange';
            ctx.fillRect(this.x, this.y, this.w, this.h);
        }
    }
    const player = new Player();

    function Background() {
        this.x = 0;
        this.y = 0;
        this.w = bg.width;
        this.h = bg.height;
        this.render = function () {
            if (player.moving && rightPressed) {
                ctx.drawImage(bg, this.x -= 10, this.y);
                if (this.x <= -1000) {
                    this.x = 0;
                }
                player.moving = false;
            } else if (player.moving && leftPressed) {
                ctx.drawImage(bg, this.x += 10, this.y);
                if (this.x >= 1000) {
                    this.x = 0;
                }
                player.moving = false;
            } else {
                ctx.drawImage(bg, this.x, this.y);
            }
        }
    }
    const background = new Background();

    function animate() {
        ctx.save();
        ctx.clearRect(0, 0, cWidth, cHeight);

        background.render();
        player.render();

        ctx.restore();
    }

    function keyDownHandler(event) {
        if (event.keyCode == 39) {
            rightPressed = true;
        }
        else if (event.keyCode == 37) {
            leftPressed = true;
        }
        player.moving = true;
    }

    function keyUpHandler() {
        rightPressed = false;
        leftPressed = false;
        player.moving = false;
    }

    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);

    setInterval(animate, 10);
})();