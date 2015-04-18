var house1Map = {
    background: 'house-1-map.png',
    width: 800,
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
            action: 1
        },
        {
            // blue guy
            x: 290,
            y: 290,
            width: 100,
            height: 160,
            action: function () {
                doText(
                    [
                        'Whhhhhhaat are you talking about?? Hey,,, cn you help me?',
                        'okay. cool. so here\'s the thing.... you ready...',
                        'i\'ve got the BAD FUNK... bad! reeeeal bad bro...',
                    ],
                    'Steve',
                    0,
                    function () {
                        console.log('all done here!');
                    }
                );
            }
        }
    ]
};
