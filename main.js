var context,
    
    pX = 477,
    pY = 388,
    pDirection = 2, // 0up 1right 2down 3left
    pMoving = false,
    frame = 0,

    imageCache = {},
    
    keys = {},

    viewX = 0,

    currentMap = worldMap,

    characterState = 'normal',

    inDialogue = false,
    enterCallback = false,
    
    flags = {},

    elementCache = {},
    
    currentUrl = '',
    urlHistory = [],
    lastAction = null,
    exploding = false,
    nextCatCallback = null;

function e(id) {
    var element = elementCache[id];

    if (!element) {
        element = elementCache[id] = document.getElementById(id);
    }

    return element;
}

function drawImage(fileName, x, y) {
    var image = imageCache[fileName];

    if (!image) {
        image = new Image();
        image.src = 'images/' + fileName;
        imageCache[fileName] = image;
    }

    context.drawImage(image, Math.floor(x), Math.floor(y));
}

function playSound(fileName, volume) {
    var audio = new Audio('sounds/' + fileName);

    if (volume) {
        audio.volume = volume;
    }

    audio.play();
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
    if (!inDialogue) {
        pMoving = true;
        if (keys[38]) pDirection = 0;
        else if (keys[39]) pDirection = 1;
        else if (keys[40]) pDirection = 2;
        else if (keys[37]) pDirection = 3;
        else pMoving = false;
    }
}

function movePlayer() {
    var speed = 2.5,
        oldX = pX,
        oldY = pY,
        x,
        y;

    if (pMoving) {
        if (pDirection == 0) pY -= speed;
        if (pDirection == 1) pX += speed;
        if (pDirection == 2) pY += speed;
        if (pDirection == 3) pX -= speed;
    }

    x = pX + 40;
    y = pY + 100;

    currentMap.walls.forEach(function (wall) {
        if (x >= wall.x && y >= wall.y && x <= wall.x + wall.width && y <= wall.y + wall.height) {
            pX = oldX;
            pY = oldY;
            pMoving = false;

            if (wall.action && lastAction != wall.action) {
                wall.action();
                lastAction = wall.action;
            }
        }
    });

    if (x < 0 || x > currentMap.width || y < 0 || y > 600) {
        pX = oldX;
        pY = oldY;
        pMoving = false;
    }

    if (pMoving) {
        lastAction = null;
    }
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

    fader.style.animationName = 'fade';
    fader.style.webkitAnimationName = 'fade';

    setTimeout(function () {
        fader.style.animationName = '';
        fader.style.webkitAnimationName = '';
    }, 1000);

    if (callback) {
        setTimeout(callback, 500);
    }
}

function warp(map, x, y, direction) {
    playSound('step-through-door.wav', .5);

    fade(function () {
        pX = x;
        pY = y;
        pDirection = direction;
        currentMap = map;
        characterState = currentMap.characterState;
    });
}

function drawCharacters() {
    if (currentMap.characters) {
        currentMap.characters.forEach(function (character) {
            var animation = character['animations'][characterState],
                characterFrame = Math.floor(frame / 40) % animation.length;
            
            drawImage(animation[characterFrame], character.x - viewX, character.y);
        });
    }
}

function loop() {
    doKeys();
    movePlayer();

    viewX = Math.min(Math.max(0, pX - 400), currentMap.width - 800);
    drawImage(currentMap.background, 0 - viewX, 0);
    //context.clearRect(0, 0, 800, 600);
    //drawWalls();

    drawCharacters();
    drawPlayer();

    frame ++;

    setTimeout(loop, 10);
}

function doText(texts, name, color, callback, sound) {
    var box = document.getElementById('dialogue-box'),
        nameBox = document.getElementById('name-box');

    color = color || [83,131,253];
    sound = sound || 'Hit_Hurt38.wav';

    inDialogue = true;

    box.style.display = 'block';

    if (!name) {
        nameBox.style.display = 'none';
    }
    else {
        nameBox.style.display = 'block';
        nameBox.innerHTML = name;
    }

    function nextText() {
        var text = texts.shift(),
            i = 0,
            l;

        box.innerHTML = '';

        if (text) {
            l = text.length;

            characterState = 'talk';

            function addLetter() {
                var letter = text.substr(i, 1),
                    span = document.createElement('span'),
                    colorMod = Math.round((i / l) * 100) 

                span.className = 'letter';
                span.innerHTML = letter;
                span.style.color = 'rgb('+(color[0]+colorMod)+','+(color[1]-colorMod)+','+(color[2]-colorMod)+')';

                box.appendChild(span);

                if ([' ', '.', '?', '!', ','].indexOf(letter) == -1) {
                    playSound(sound, .5);
                }

                setTimeout(function () {
                    span.style.animationName = 'letter-wiggle';
                    span.style.animationIterationCount = 'infinite';
                    span.style.animationDirection = 'alternate';

                    span.style.webkitAnimationName = 'letter-wiggle';
                    span.style.webkitAnimationIterationCount = 'infinite';
                    span.style.webkitAnimationDirection = 'alternate';
                }, 800);

                i ++;
                if (i < l) {
                    setTimeout(addLetter, 70);
                }
                else {
                    characterState = currentMap.characterState;
                    enterCallback = nextText;
                }
            }

            addLetter();
        }
        else {
            box.style.display = 'none';
            nameBox.style.display = 'none';
            inDialogue = false;

            if (callback) {
                callback();
            }
        }
    }

    nextText();
}

function loadWebpage(url, back) {
    var webpage = webpages[url] || {title: '404 - Page not found', id: '404'},
        url;

    if (exploding) {
        return;
    }

    if (!back && currentUrl) {
        urlHistory.push(currentUrl);
    }

    e('url-input').value = currentUrl = url;
    e('window-title').innerHTML = webpage.title + ' - Internets Explorer';
    e('bar-title').innerHTML = webpage.title + ' - Internets Explorer';

    // hide all pages
    for (url in webpages) {
        e(webpages[url].id).style.display = 'none';
    }
    e('bad-funk-bubble').style.display = 'none';

    e(webpage.id).style.display = 'block';

    if (webpage.action) {
        webpage.action();
    }
}

function showPc(url) {
    var pc = e('pc');

    inDialogue = true;

    e('bad-funk-toolbar').style.animationName = '';
    e('bad-funk-toolbar').style.webkitAnimationName = '';
    e('bad-funk-toolbar').style.marginTop = 0;

    playSound('windows-hardware-insert.wav');
    currentUrl = '';
    urlHistory = [];
    loadWebpage(url);
    pc.style.display = 'block';
    pc.style.animationDirection = 'normal';
    pc.style.webkitAnimationDirection = 'normal';
    pc.style.opacity = 1;
    pc.style.animationName = 'zoom-fade';
    pc.style.webkitAnimationName = 'zoom-fade';
    setTimeout(function () {
        pc.style.animationName = '';
        pc.style.webkitAnimationName = '';
    }, 500);
}

function showBubble(text, callback) {
    var bubble = e('bad-funk-bubble');

    playSound('windows-balloon.wav');
    e('bubble-inner').innerHTML = text;
    bubble.style.display = 'block';

    function close () {
        playSound('windows-click.wav');
        bubble.style.display = 'none';
        
        if (callback) {
            callback();
        }
    }

    bubble.onclick = close;

    //setTimeout(close, 10000);
}

window.addEventListener('load', function () {
    var canvas = document.getElementById('c'),
        image = new Image();

    context = canvas.getContext('2d');

    preloadImages();


    image.addEventListener('load', function () {
        loop();

        doText(
            [
                'August 12th, 2003',
                'FRED, the world\'s most famous management consultant finds herself on a beach',
                'But something feels... Off...  Thankfully FRED has 2 MBAs',
                '(HBS, C/O \'91 & GSB, C/O \'89)',
            ],
            0,
            [0, 151, 251],
            0,
            'Randomize30.wav'
        );
    })
    image.src = 'images/world-map-haha.png';

    // misc setup k
    e('minimize-button').addEventListener('click', function () {
        if (exploding) {
            return;
        }

        e('browser-window').style.animationName = 'minimize';
        e('browser-window').style.webkitAnimationName = 'minimize';
        playSound('haha.wav');
        setTimeout(function () {
            e('browser-window').style.animationName = '';
            e('browser-window').style.webkitAnimationName = '';
        }, 1000);
    });
    e('close-button').addEventListener('click', function () {
        var pc = document.getElementById('pc');

        if (exploding) {
            return;
        }

        playSound('windows-hardware-remove.wav');
        pc.style.animationDirection = 'reverse';
        pc.style.webkitAnimationDirection = 'reverse';
        pc.style.opacity = 0;
        pc.style.animationName = 'zoom-fade';
        pc.style.webkitAnimationName = 'zoom-fade';

        setTimeout(function () {
            inDialogue = false;
            pc.style.display = 'none';
            pc.style.animationName = '';
            pc.style.webkitAnimationName = '';
        }, 500);

        if (currentMap == house1Map && flags['steve-funk-destroyed']) {
            inDialogue = true;
            pDirection = 3;
            setTimeout(function () {
                doText(
                    [
                        'AHHhhh!!!   i FeeL so MUCH BETTER!!!! YOU\'re my HERO !!!',
                        'Here!  tak this key ... saLLy needs your help too man ..!',
                        'dude,, i knew i never should have installed that toolbar ...',
                    ],
                    'Steve',
                    0,
                    function () {
                    }
                );
            }, 700);
        }
        else if (currentMap == hutMap && flags['sally-funk-destroyed']) {
            inDialogue = true;
            pDirection = 1;
            setTimeout(function () {
                doText(
                    [
                        'aw. YEA!  you DID it!! my BAD FUNK is gone... i FEEL great!!!',
                        '  i ThInk I can dance again!! i\'MM goNNA be a STAR again !!!!',
                        'thANK you!... & take ThIS key. it\"S for slug\'s iglooo NeXT dooor ... :]'
                    ],
                    'Sally',
                    [150, 111, 170],
                    0,
                    'Blip_Select55.wav'
                );
            }, 700);
        }
        else if (currentMap == iglooMap && flags['slug-funk-destroyed']) {
            inDialogue = true;
            pDirection = 3;
            setTimeout(function () {
                doText(
                    [
                        'WHOOOOOOOOOAAAAAHH !!!! MANE you DID it !!',
                        'i CAN feeeeeel my tats COMING back right now !!!',
                        ' YoUR a TRUE hero Mang !  an HonoRARY SLUG in my BOOk ;)',
                    ],
                    'Slug',
                    [45, 188, 157],
                    0,
                    'Hit_Hurt45.wav'
                );
            }, 700);
        }
    });

    e('back-button').addEventListener('click', function () {
        var url = urlHistory.pop();

        playSound('windows-click.wav');

        if (url) {
            loadWebpage(url, true);
        }
    });

    e('home-button').addEventListener('click', function () {
        playSound('windows-click.wav');
        loadWebpage('very-real-news.www');
    });

    e('go-button').addEventListener('click', function () {
        playSound('windows-click.wav');
        loadWebpage(e('url-input').value);
    });

    e('cat-tube-link').addEventListener('click', function () {
        playSound('windows-click.wav');
        loadWebpage('cat-tube.www');
    });

    e('next-cat-button').addEventListener('click', function () {
        playSound('windows-click.wav');
        playSound('meow.wav', .5);
        e('web-content').scrollTop = 0;
        e('cat-image').src = 'images/cats/' + (Math.floor(Math.random()*30)+1) + '.gif';

        if (nextCatCallback) {
            nextCatCallback();
        }
    });
    e('bad-funk-toolbar').addEventListener('mousemove', function (event) {
        event.preventDefault();
    });
    e('bad-funk-toolbar').addEventListener('mousedown', function (event) {
        event.preventDefault();
    });
    e('bad-funk-toolbar').addEventListener('click', function () {
        if (currentUrl != 'cat-tube.www') { // wat am i doing with my life?
            showBubble('Bro! Don\'t touch me! ... bro');
        }
    });
});

window.addEventListener('keydown', function (event) {
    keys[event.which] = true;

    if (enterCallback) {
        enterCallback();
        enterCallback = false;
    }
});

window.addEventListener('keyup', function (event) {
    keys[event.which] = false;
});

function preloadImages() {
    [
        'up-1.gif',
        'up-2.gif',
        'down-1.gif',
        'down-2.gif',
        'left-1.gif',
        'left-2.gif',
        'right-1.gif',
        'right-2.gif',

        'blue-guy-1.gif',
        'blue-guy-2.gif',
        'blue-guy-smile-1.gif',
        'blue-guy-smile-2.gif',
        'blue-guy-talk.gif',

        'sally-1.gif',
        'sally-2.gif',
        'sally-smile-1.gif',
        'sally-smile-2.gif',
        'sally-talk.gif',

        'slug-1.gif',
        'slug-2.gif',
        'slug-smile-1.gif',
        'slug-smile-2.gif',
        'slug-talk.gif',

        'world-map-haha.png',
        'house-1-map.png',
        'igloo-map.png',
        'hut-map.png',
    ].forEach(function (url) {
        drawImage(url, 800, 600);
    })
}
