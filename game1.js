(function () {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    const cWidth = ctx.canvas.width = 1200;
    const cHeight = ctx.canvas.height;

    const bg = new Image();
    bg.src = './background.png';

    let rightPressed = false;
    let leftPressed = false;
    let pVelocity = 8;

    function Player() {
        this.x = cWidth / 2;
        this.y = 370;
        this.w = 30;
        this.h = 60;
        this.velocity = 0.25;
        this.moving = false;
        this.render = function () {
            ctx.fillStyle = 'orange';
            ctx.fillRect(this.x, this.y, this.w, this.h);
        }
        this.goRight = function () {
            pVelocity = pVelocity + this.velocity;
            this.x += pVelocity;
        }
        this.goLeft = function () {
            pVelocity = (pVelocity > 8) ? pVelocity - this.velocity : pVelocity;
            player.x -= pVelocity;
        }
    }
    const player = new Player();

    function Background() {
        this.x = -1000;
        this.y = 0;
        this.w = bg.width;
        this.h = bg.height;
        this.render = function () {
            if (player.moving && rightPressed) {
                if (player.x >= (cWidth / 2)) {
                    ctx.drawImage(bg, this.x -= pVelocity, this.y);
                } else {
                    ctx.drawImage(bg, this.x, this.y);
                    player.goRight();
                }
                if (this.x <= -1000) {
                    this.x = 0;
                }
                player.moving = false;
            } else if (player.moving && leftPressed) {
                ctx.drawImage(bg, this.x, this.y);
                if (player.x > 50) {
                    player.goLeft();
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

        window.requestAnimationFrame(() => {
            animate();
        });
    }

    function keyDownHandler(event) {
        if (event.keyCode == 68) {
            rightPressed = true;
        }
        else if (event.keyCode == 65) {
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

    animate();
})();