(function () {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    const cWidth = ctx.canvas.width = 1200;
    const cHeight = ctx.canvas.height;

    const bg = new Image();
    bg.src = './background2.png';

    let rightPressed = false;
    let leftPressed = false;
    let upPressed = false;
    let downPressed = false;
    let pVelocity = 8;

    function Player() {
        this.x = 150;
        this.y = 490;
        this.w = 50;
        this.h = 50;
        this.velocity = 0.15;
        this.moving = false;
        this.render = function () {
            ctx.fillStyle = 'orange';
            ctx.fillRect(this.x, this.y, this.w, this.h);
        }
        this.goRight = function () {
            pVelocity += this.velocity;
            if ((player.x + player.w + pVelocity) < cWidth) {
                this.x += pVelocity;
            }
        }
        this.goLeft = function () {
            pVelocity += this.velocity;
            if ((player.x - pVelocity) > 0) {
                player.x -= pVelocity;
            }
        }
        this.goUp = function () {
            pVelocity += this.velocity;
            player.y -= pVelocity;
        }
        this.goDown = function () {
            pVelocity += this.velocity;
            player.y += pVelocity;
        }
    }
    const player = new Player();

    function Background() {
        this.x = 0;
        this.y = -1400;
        this.w = bg.width;
        this.h = bg.height;
        this.render = function () {
            if (player.moving && rightPressed) {
                if ((player.x >= (cWidth / 2)) && this.x >= -780) {
                    ctx.drawImage(bg, this.x -= pVelocity, this.y);
                } else {
                    ctx.drawImage(bg, this.x, this.y);
                    player.goRight();
                }
                player.moving = false;
            } else if (player.moving && leftPressed) {
                if (this.x < 0 && player.x <= (cWidth / 2)) {
                    ctx.drawImage(bg, this.x += pVelocity, this.y);
                } else {
                    player.goLeft();
                    ctx.drawImage(bg, this.x, this.y);
                }
                player.moving = false;
            } else if (player.moving && upPressed) {
                if (player.y - pVelocity > 10) {
                    ctx.drawImage(bg, this.x, this.y);
                    player.goUp();
                } else {
                    if (this.y < 0) {
                        ctx.drawImage(bg, this.x, this.y += pVelocity);
                    } else {
                        ctx.drawImage(bg, this.x, this.y);
                    }
                }
                player.moving = false;
            } else if (player.moving && downPressed) {
                if (player.y < (cHeight - player.h - 10)) {
                    ctx.drawImage(bg, this.x, this.y);
                    player.goDown();
                } else if (this.y > -1400) {
                    ctx.drawImage(bg, this.x, this.y -= pVelocity);
                } else {
                    ctx.drawImage(bg, this.x, this.y);
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
        else if (event.keyCode == 87) {
            upPressed = true;
        }
        else if (event.keyCode == 83) {
            downPressed = true;
        }
        player.moving = true;
    }

    function keyUpHandler() {
        rightPressed = false;
        leftPressed = false;
        upPressed = false;
        downPressed = false;
        player.moving = false;
        pVelocity = 8;
    }

    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);

    animate();
})();