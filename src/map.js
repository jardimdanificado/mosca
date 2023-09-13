let util = await import("./util.js")
let DungeonGenerator = await import("./dungeon-generator.js")

export var _map = {}

_map.tile = DungeonGenerator.generate({
    maxRoomSize: 15,
    minRoomSize: 0,
    padding: 0,
    rooms: 25,
    rows: 41,
    cols: 61,
});

/*
-1  = hole
0   = floor
1   = wall 
5   = door 
*/ 

_map.door = util.newMatrix(41,61,false)

_map.tile = util.matrixReplace(_map.tile,
    [
        [1,0,1],
        [undefined,0,0],
    ],
    [
        [1,5,1],
        [undefined,0,0],
    ]
)

_map.tile = util.matrixReplace(_map.tile,
    [
        [1,0,1],
        [0,0,undefined],
    ],
    [
        [1,5,1],
        [0,0,undefined],
    ]
)

_map.tile = util.matrixReplace(_map.tile,
    [
        [0,0,undefined],
        [1,0,1],
    ],
    [
        [0,0,undefined],
        [1,5,1],
    ]
)

_map.tile = util.matrixReplace(_map.tile,
    [
        [undefined,0,0],
        [1,0,1],
    ],
    [
        [undefined,0,0],
        [1,5,1],
    ]
)

_map.tile = util.matrixReplace(_map.tile,
    [
        [1,undefined],
        [0,0],
        [1,0],
    ],
    [
        [1,undefined],
        [5,0],
        [1,0]
    ]
)

_map.tile = util.matrixReplace(_map.tile,
    [
        [1,0],
        [0,0],
        [1,undefined],
    ],
    [
        [1,0],
        [5,0],
        [1,undefined]
    ]
)

_map.tile = util.matrixReplace(_map.tile,
    [
        [0,1],
        [0,0],
        [undefined,1],
    ],
    [
        [0,1],
        [0,5],
        [undefined,1]
    ]
)

_map.tile = util.matrixReplace(_map.tile,
    [
        [undefined,1],
        [0,0],
        [0,1],
    ],
    [
        [undefined,1],
        [0,5],
        [0,1]
    ]
)

_map.tile = util.matrixReplace(_map.tile,
    [
        [5,1,5],
        []
    ],
    [
        [1,1,5],
        []
    ]
)

_map.tile = util.matrixReplace(_map.tile,
    [
        [5],
        [1],
        [5]
    ],
    [
        [5],
        [1],
        [1]
    ]
)

_map.tile = util.matrixReplace(_map.tile,
    [
        [1,1,1],
        [1,0,1],
        [1,1,1],
    ],
    [
        [1,1,1],
        [1,1,1],
        [1,1,1]
    ]
)

let ptts = 
[
    [[0,0,5]],
    [[5,0,0]],
    [[5,0,5]]
]

_map.tile = util.matrixReplace(_map.tile,
    [
        [5,0,5],
    ],
    ptts[util.roleta(10,10,5)]
)

ptts = 
[
    [
        [0],
        [0],
        [5]
    ],
    [
        [5],
        [0],
        [0]
    ],
    [
        [5],
        [0],
        [5]
    ],
]

_map.tile = util.matrixReplace(_map.tile,
    [
        [5],
        [0],
        [5]
    ],
    ptts[util.roleta(10,10,5)]
)

ptts = 
[
    [
        [5,undefined],
        [undefined,0]
    ],
    [
        [0,undefined],
        [undefined,5]
    ],
    [
        [5,undefined],
        [undefined,5]
    ]
]

_map.tile = util.matrixReplace(_map.tile,
    [
        [5,undefined],
        [undefined,5]
    ],
    ptts[util.roleta(10,10,5)]
)


export class Door
{
    constructor(position,open = false,difficulty = 1, key = false)
    {
        this.position = position
        this.difficulty = difficulty
        this.open = open
        this.key = key
    }
}

_map.tile.forEach((element,x) => 
    {
        element.forEach((element,y) => 
            {
                if (element == 5) 
                {
                    _map.door[x][y] = new Door({x:x,y:y},false,48)
                }
            }
        );
    }
);