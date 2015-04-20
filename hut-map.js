var hutMap = {
    background: 'hut-map.png',
    width: 800,
    characterState: 'normal',
    characters: [
        {
            x: 290,
            y: 285,
            animations: {
                normal: ['sally-1.gif', 'sally-2.gif'],
                talk: ['sally-1.gif', 'sally-talk.gif'],
                smile: ['sally-smile-1.gif', 'sally-smile-2.gif']
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
            x: 465,
            y: 270,
            width: 110,
            height: 150,
            action: function () {
                warp(worldMap, 907, 257, 2);
            }
        },
        {
            // lion
            x: 620,
            y: 240,
            width: 140,
            height: 250,
            action: function () {
                doText(
                    [
                        'aw. hey. watCh out !! ... that\'s a reaaal LiON you know!',
                    ],
                    'Sally',
                    [150, 111, 170],
                    function () {
                        console.log('all done here!');
                    },
                    'Blip_Select55.wav'
                );
            }
        },
        {
            // computer
            x: 30,
            y: 370,
            width: 180,
            height: 120,
            action: function () {
                if (!flags['sally-1']) {
                    doText(
                        [
                            'aw. hey... it\'s Not turned oN...',
                        ],
                        'Sally',
                        [150, 111, 170],
                        0,
                        'Blip_Select55.wav'
                    );
                    return;
                }

                if (!flags['sally-funk-destroyed']) {
                    showPc('zmz.www');

                    setTimeout(function () {
                        showBubble('Oh! It\'s you again... Hah ! You should scram! While you still can!');
                    }, 1000);
                }
                else {
                    doText(
                        [
                            'aw. hey... i nEED to chek my e-email ... ',
                        ],
                        'Sally',
                        [150, 111, 170],
                        0,
                        'Blip_Select55.wav'
                    );
                }
            }
        },
        {
            // sally
            x: 290,
            y: 290,
            width: 100,
            height: 160,
            action: function () {
                if (!flags['sally-1']) {
                    doText(
                        [
                            'aw. hey!  hmmm... geeeee... what am I doing??',
                            'i\M dancing of courSe! ... but youre right,,, it\'s not very good .....',
                            'see, i used to be a star! best dancer in planet!! ... then bad FUNK got me.',
                            'aw. hey. mayybbe you could hElp Me ?? ... just a thought .',
                        ],
                        'Sally',
                        [150, 111, 170],
                        function () {
                            flags['sally-1'] = true;
                        },
                        'Blip_Select55.wav'
                    );
                }
                else if (flags['sally-funk-destroyed']) {
                    doText(
                        [
                            'aw. hEY! ... i CAN do othEr danCes now!!! ... bUT i still like this one ;]]'
                        ],
                        'Sally',
                        [150, 111, 170],
                        function () {
                        },
                        'Blip_Select55.wav'
                    );
                }
                else {
                    doText(
                        [
                            'aw. hey.   i turNEd on the PC for you :) ......'
                        ],
                        'Sally',
                        [150, 111, 170],
                        function () {
                        },
                        'Blip_Select55.wav'
                    );
                }
            }
        }
    ]
};
