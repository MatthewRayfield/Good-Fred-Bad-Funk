var webpages = {
    'very-real-news.www': {
        title: 'Very REAL News',
        id: 'very-real-news'
    },
    'cat-tube.www': {
        title: 'the CaT TuBe - BEst _CAT_ VidEos ForEvEr',
        id: 'cat-tube',
        action: function () {
            var go = true;

            function explode() {
                e('explosion').style.display = 'block';
                e('explosion').style.marginLeft = Math.floor(Math.random()*800)-400;

                if (go) {
                    playSound('chord.wav', .3);
                    setTimeout(explode, 700);
                }
                else {
                    e('explosion').style.display = 'none';
                }
            }

            if (currentMap == house1Map && !flags['steve-funk-destroyed']) {
                setTimeout(function () {
                    showBubble('Ahhhhhhhh! How did you know my ONLY weakness!!!',
                        function () {
                            go = false;
                            playSound('recycle.wav');
                            flags['steve-funk-destroyed'] = true;
                            house1Map.characterState = 'smile';
                            e('bad-funk-toolbar').style.marginTop = -300;
                            e('bad-funk-toolbar').style.webkitAnimationName = 'funk-die';
                        }
                    );
                }, 500);

                explode();
            }

            e('cat-image').src = 'images/cats/' + (Math.floor(Math.random()*30)+1) + '.gif';
        }
    },
    '404': {
        id: '404'
    }
};
