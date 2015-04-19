var house1Map = {
    background: 'house-1-map.png',
    width: 800,
    characterState: 'normal',
    characters: [
        {
            x: 300,
            y: 290,
            animations: {
                normal: ['blue-guy-1.gif', 'blue-guy-2.gif'],
                talk: ['blue-guy-1.gif', 'blue-guy-talk.gif'],
                smile: ['blue-guy-smile-1.gif', 'blue-guy-smile-2.gif']
            }
        }
    ],
    walls: [
        {
            // back wall
            x: 0,
            y: 250,
            width: 800,
            height: 160
        },
        {
            // door
            x: 40,
            y: 270,
            width: 110,
            height: 150,
            action: function () {
                warp(worldMap, 217, 297, 2);
            }
        },
        {
            // dog dish
            x: 140,
            y: 500,
            width: 80,
            height: 80,
            action: function () {
                doText(
                    [
                        'man. that food. it\'s like... not for you... okay?',
                    ],
                    'Steve',
                    0,
                    function () {
                        console.log('all done here!');
                    }
                );
            }
        },
        {
            // computer
            x: 610,
            y: 370,
            width: 180,
            height: 150,
            action: function () {
                if (!flags['steve-1']) {
                    doText(
                        [
                            'hey... wait...',
                        ],
                        'Steve',
                        0
                    );
                    return;
                }

                if (!flags['steve-funk-destroyed']) {
                    showPc('very-real-news.www');

                    setTimeout(function () {
                        showBubble('Oh hey! My name is Bad Funk! But I\'m really a good guy ;] Let\'s be buds k?');
                    }, 1000);
                }
                else {
                    doText(
                        [
                            'hey. man. don\t you have like,,, better things to do ??',
                        ],
                        'Steve',
                        0
                    );
                }
            }
        },
        {
            // blue guy
            x: 290,
            y: 290,
            width: 100,
            height: 160,
            action: function () {
                if (!flags['steve-1']) {
                    doText(
                        [
                            'Whhhhhhaat are you talking about?? Hey,,, cn you help me?',
                            'okay. cool. so here\'s the thing.... you ready...',
                            'i\'ve got the BAD FUNK... bad! reeeeal bad bro...',
                            'I CAN\'T LIVE LIKE THIS! .... ahem..sorry.   but dude. i need you\'re help',
                        ],
                        'Steve',
                        0,
                        function () {
                            flags['steve-1'] = true;
                        }
                    );
                }
                else if (flags['steve-funk-destroyed']) {
                    doText(
                        [
                            'dude,,,,, youre so COOL :]]'
                        ],
                        'Steve',
                        0
                    );
                }
                else {
                    doText(
                        [
                            '   please help!!     oh & you can use my PC :]]]'
                        ],
                        'Steve',
                        0,
                        function () {
                        }
                    );
                }
            }
        }
    ]
};
