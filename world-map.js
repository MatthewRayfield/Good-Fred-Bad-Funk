var worldMap = {
    background: 'world-map-haha.png',
    width: 1677,
    walls: [
        {
            // from house 1 to rv
            x: 0,
            y: 100,
            width: 390,
            height: 180
        },
        {
            // left of house 1
            x: 0,
            y: 200,
            width: 180,
            height: 200
        },
        {
            // house 1 door
            x: 180,
            y: 250,
            width: 100,
            height: 140,
            action: function () {
                warp(house1Map, 52, 322, 2);
            }
        },
        {
            // right of house 1
            x: 280,
            y: 200,
            width: 40,
            height: 180
        },
        {
            // rv door
            x: 390,
            y: 150,
            width: 90,
            height: 145,
            action: function () {
                playSound('chord.wav');
            }
        },
        {
            // right of rv
            x: 480,
            y: 150,
            width: 330,
            height: 150
        },
        {
            // left of hut
            x: 810,
            y: 150,
            width: 90,
            height: 195
        },
        {
            // hut door
            x: 900,
            y: 150,
            width: 80,
            height: 185,
            action: function () {
                if (flags['steve-funk-destroyed']) {
                    warp(hutMap, 479, 322, 2);
                }
                else {
                    playSound('chord.wav');
                }
            }
        },
        {
            // right of hut
            x: 980,
            y: 150,
            width: 125,
            height: 190
        },
        {
            // igloo door
            x: 1095,
            y: 250,
            width: 125,
            height: 135,
            action: function () {
                playSound('chord.wav');
            }
        },
        {
            // right of igloo
            x: 1220,
            y: 220,
            width: 305,
            height: 190
        },
        {
            // house 2 door
            x: 1330,
            y: 400,
            width: 305,
            height: 160,
            action: function () {
                playSound('chord.wav');
            }
        },
        {
            // right of house 2
            x: 1460,
            y: 390,
            width: 305,
            height: 190
        }
    ]
};
