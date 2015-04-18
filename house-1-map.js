var house1Map = {
    background: 'house-1-map.png',
    width: 800,
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
            action: 1
        },
        {
            // computer
            x: 610,
            y: 370,
            width: 180,
            height: 150,
            action: 1
        }
    ]
};
