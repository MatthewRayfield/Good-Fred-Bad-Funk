var webpages = {
    'very-real-news.www': {
        title: 'Very REAL News',
        id: 'very-real-news'
    },
    'cat-tube.www': {
        title: 'the CaT TuBe - BEst _CAT_ VidEos ForEvEr',
        id: 'cat-tube',
        action: function () {
            function explode() {
                e('explosion').style.display = 'block';
                e('explosion').style.marginLeft = Math.floor(Math.random()*800)-400;

                if (exploding) {
                    playSound('chord.wav', .3);
                    setTimeout(explode, 700);
                }
                else {
                    e('explosion').style.display = 'none';
                }
            }

            if (currentMap == house1Map && !flags['steve-funk-destroyed']) {
                exploding = true;

                setTimeout(function () {
                    showBubble('Ahhhhhhhh! How did you know my ONLY weakness!!!',
                        function () {
                            exploding = false;
                            playSound('recycle.wav');
                            flags['steve-funk-destroyed'] = true;
                            house1Map.characterState = 'smile';
                            e('bad-funk-toolbar').style.marginTop = -300;
                            e('bad-funk-toolbar').style.animationName = 'funk-die';
                            e('bad-funk-toolbar').style.webkitAnimationName = 'funk-die';
                        }
                    );
                }, 500);

                explode();
            }
            else if (currentMap == hutMap && !flags['sally-funk-destroyed']) {
                setTimeout(function () {
                    var hp = 3;

                    showBubble('Hah!! Nice try! But you\'ll have to do better than that!');

                    nextCatCallback = function () {
                        var message;

                        hp --;

                        e('bad-funk-bubble').style.display = 'none';

                        if (hp == 2) {
                            message = 'Huh? What are you doing?';
                        }
                        else if (hp == 1) {
                            message = 'Wait... No! Stop!';
                        }
                        else if (hp == 0) {
                            exploding = true;
                            nextCatCallback = false;

                            setTimeout(function () {
                                showBubble('AHHHHHHHHH! I CAN\'T BELIEVE IT! NOT AGAIN!',
                                    function () {
                                        exploding = false;
                                        playSound('recycle.wav');
                                        flags['sally-funk-destroyed'] = true;
                                        hutMap.characterState = 'smile';
                                        e('bad-funk-toolbar').style.marginTop = -300;
                                        e('bad-funk-toolbar').style.animationName = 'funk-die';
                                        e('bad-funk-toolbar').style.webkitAnimationName = 'funk-die';
                                    }
                                );
                                explode();
                            }, 500);
                        }

                        if (message) {
                            setTimeout(function () {
                                showBubble(message);
                            }, 500);
                        }
                    }
                }, 500);
            }
            else if (currentMap == iglooMap && !flags['slug-funk-destroyed']) {
                function moveButton() {
                    e('next-cat-button').style.marginTop = Math.floor(Math.random()*1000);
                }
                moveButton();

                setTimeout(function () {
                    var hp = 4;

                    showBubble('You\'re PATHETIC ! I\'m unstoppable now!');

                    nextCatCallback = function () {
                        var message;

                        hp --;

                        e('bad-funk-bubble').style.display = 'none';
                        moveButton();

                        if (hp == 3) {
                            message = 'Hmph!  You got lucky that time...';
                        }
                        else if (hp == 2) {
                            message = 'Uggg.. No... How could it be ... ';
                        }
                        else if (hp == 1) {
                            message = 'uhhhhggggg .. could you really defeat me .. ?';
                        }
                        else if (hp == 0) {
                            exploding = true;
                            nextCatCallback = false;

                            setTimeout(function () {
                                e('next-cat-button').style.marginTop = '0';
                                showBubble('BLAAAAARRGHHHHGHGH!!!!! YOU HAVE\'NT SEEN THE LAST OF MEEEEEEEEE!!!',
                                    function () {
                                        exploding = false;
                                        playSound('recycle.wav');
                                        flags['slug-funk-destroyed'] = true;
                                        iglooMap.characterState = 'smile';
                                        e('bad-funk-toolbar').style.marginTop = -300;
                                        e('bad-funk-toolbar').style.animationName = 'funk-die';
                                        e('bad-funk-toolbar').style.webkitAnimationName = 'funk-die';
                                    }
                                );
                                explode();
                            }, 500);
                        }

                        if (message) {
                            setTimeout(function () {
                                showBubble(message);
                            }, 500);
                        }
                    }
                }, 500);
            }

            e('cat-image').src = 'images/cats/' + (Math.floor(Math.random()*30)+1) + '.gif';
        }
    },
    'zmz.www': {
        title: 'ZMZ - B+ cELEBs 25/7',
        id: 'zmz'
    },
    'tek-squeeeze.www': {
        title: 'Tek SqueeezE - Your LATEST Digital Desires!',
        id: 'tek-squeeeze'
    },
    'credits.www': {
        title: 'Credits',
        id: 'credits'
    },
    '404': {
        id: '404'
    }
};
