var context,
    
    pX = 477,
    pY = 388,
    pDirection = 2, // 0up 1right 2down 3left
    pMoving = false,
    frame = 0,

    imageCache = {},
    
    keys = {},

    viewX = 0,

    currentMap = worldMap;

function drawImage(fileName, x, y) {
    var image = imageCache[fileName];

    if (!image) {
        image = new Image();
        image.src = 'images/' + fileName;
        imageCache[fileName] = image;
    }

    context.drawImage(image, Math.floor(x), Math.floor(y));
}

function drawPlayer() {
    var playerFrame = pMoving ? (Math.floor(frame / 30) % 2) + 1 : 1;
        directionName = ['up', 'right', 'down', 'left'][pDirection];

    drawImage(directionName + '-' + playerFrame + '.gif', pX - viewX, pY);

    // collision dot:
    //context.fillStyle = 'red';
    //context.fillRect(pX - viewX + 40, pY + 100, 2, 2);
}

function doKeys() {
    pMoving = true;
    if (keys[38]) pDirection = 0;
    else if (keys[39]) pDirection = 1;
    else if (keys[40]) pDirection = 2;
    else if (keys[37]) pDirection = 3;
    else pMoving = false;
}

function movePlayer() {
    var speed = 2.5,
        oldX = pX,
        oldY = pY;

    if (pMoving) {
        if (pDirection == 0) pY -= speed;
        if (pDirection == 1) pX += speed;
        if (pDirection == 2) pY += speed;
        if (pDirection == 3) pX -= speed;
    }

    currentMap.walls.forEach(function (wall) {
        var x = pX + 40,
            y = pY + 100;

        if (x >= wall.x && y >= wall.y && x <= wall.x + wall.width && y <= wall.y + wall.height) {
            pX = oldX;
            pY = oldY;
            pMoving = false;

            if (wall.action) {
                wall.action();
            }
        }
    });
}

function drawWalls() {

    currentMap.walls.forEach(function (wall) {
        if (wall.action) {
            context.fillStyle = 'rgba(255,0,0,.5)';
        }
        else {
            context.fillStyle = 'rgba(0,255,0,.5)';
        }
        context.fillRect(wall.x - viewX, wall.y, wall.width, wall.height);
    });
}

function fade(callback) {
    var fader = document.getElementById('fader');

    fader.style.webkitAnimationName = 'fade';

    setTimeout(function () {
        fader.style.webkitAnimationName = '';
    }, 1000);

    if (callback) {
        setTimeout(callback, 500);
    }
}

function warp(map, x, y, direction) {
    fade(function () {
        pX = x;
        pY = y;
        pDirection = direction;
        currentMap = map;
    });
}

function loop() {
    doKeys();
    movePlayer();

    viewX = Math.min(Math.max(0, pX - 400), currentMap.width - 800);
    drawImage(currentMap.background, 0 - viewX, 0);
    //context.clearRect(0, 0, 800, 600);
    //drawWalls();

    drawPlayer();

    frame ++;

    setTimeout(loop, 10);
}

window.addEventListener('load', function () {
    var canvas = document.getElementById('c');

    context = canvas.getContext('2d');

    loop();
});

window.addEventListener('keydown', function (event) {
    keys[event.which] = true;
});

window.addEventListener('keyup', function () {
    keys[event.which] = false;
});
