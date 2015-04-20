var iglooMap = {
    background: 'igloo-map.png',
    width: 800,
    characterState: 'normal',
    characters: [
        {
            x: 385,
            y: 330,
            animations: {
                normal: ['slug-1.gif', 'slug-2.gif'],
                talk: ['slug-1.gif', 'slug-talk.gif'],
                smile: ['slug-smile-1.gif', 'slug-smile-2.gif']
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
            x: 185,
            y: 270,
            width: 120,
            height: 150,
            action: function () {
                if (flags['slug-funk-destroyed']) {
                    worldMap.characters = worldMap.wcharacters;
                    inDialogue = true;
                    setTimeout(function () {
                        playSound('tada.wav');
                        doText(
                            [
                                '    Hip HIp HURRAY !!!!      HIP hip HuRRAY !!!',
                                'FRED destroyed the BAD FUNK once and for ALL !!',
                                'the Beach is AT peace Once again ... maybe the tourists will come back now ',
                                'SO WE CAN EAT THEM',
                                '... just kidding ...'
                            ],
                            'Everyone',
                            0,
                            function () {
                                setTimeout(function () {
                                    e('close-button').style.display = 'none';
                                    showPc('credits.www');
                                    setTimeout(function () {
                                        showBubble('Thanks for playing ;]');
                                    }, 500);
                                }, 700);
                            }
                        );
                    }, 700);
                    warp(worldMap, 477, 388, 2);
                }
                else {
                    warp(worldMap, 1102, 319, 2);
                }
            }
        },
        {
            // sink
            x: 30,
            y: 340,
            width: 140,
            height: 200,
            action: function () {
                doText(
                    [
                        'heh ... that\'s a NICE sInk     don\'Tcha thInk ??? ;]',
                    ],
                    'Slug',
                    [45, 188, 157],
                    function () {
                        console.log('all done here!');
                    },
                    'Hit_Hurt45.wav'
                );
            }
        },
        {
            // computer
            x: 610,
            y: 370,
            width: 140,
            height: 110,
            action: function () {
                if (!flags['slug-1']) {
                    doText(
                        [
                            'BRUH ... don\'T be messn WiTH a SLUG\'s stuff',
                        ],
                        'Slug',
                        [45, 188, 157],
                        0,
                        'Hit_Hurt45.wav'
                    );
                    return;
                }

                if (!flags['slug-funk-destroyed']) {
                    showPc('tek-squeeeze.www');

                    setTimeout(function () {
                        showBubble('Hahahaha! Try me ! Just try me! I\'m ready this time PUNK !');
                    }, 1000);
                }
                else {
                    doText(
                        [
                            'YO ... there\'s PleNTy of time FOR computin LATER mane...',
                        ],
                        'Slug',
                        [45, 188, 157],
                        0,
                        'Hit_Hurt45.wav'
                    );
                }
            }
        },
        {
            // slug
            x: 385,
            y: 330,
            width: 100,
            height: 120,
            action: function () {
                if (!flags['slug-1']) {
                    doText(
                        [
                            'YO mang ! .. what up... they cAll me SlUG .. You cAn prolly See why',
                            '   it\'s because i\'m a slug',
                            'buT pEEP tHis ,,, LAtelY ... i aIn\'t ben fEElin so sLuGGin\' ...',
                            '  evEN my \'\'\'SLUG LyFE\'\'\' tats aRE fading',
                            'i ThInk that WHACKy bAD FUnK is messn my MoJO ... cAN you HElp?'
                        ],
                        'Slug',
                        [45, 188, 157],
                        function () {
                            flags['slug-1'] = true;
                        },
                        'Hit_Hurt45.wav'
                    );
                }
                else if (flags['slug-funk-destroyed']) {
                    doText(
                        [
                            'Let\'s GO PARTY wrrrnnn wrnnnn wrnnn wrrrnnoooooooo !!'
                        ],
                        'Slug',
                        [45, 188, 157],
                        function () {
                        },
                        'Hit_Hurt45.wav'
                    );
                }
                else {
                    doText(
                        [
                            'ayyyyyyy ... PCs right oever thRre .. HoOk a SLUG up MaNE ;]'
                        ],
                        'Slug',
                        [45, 188, 157],
                        function () {
                        },
                        'Hit_Hurt45.wav'
                    );
                }
            }
        }
    ]
};
