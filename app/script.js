var grid = [            //Y
    [1, 0, 0, 0, 0, 0], //[0]
    [1, 1, 1, 1, 1, 1], //[1]
    [1, 0, 0, 1, 1, 0], //[2]
    [1, 0, 1, 1, 1, 0], //[3]
    [0, 0, 0, 1, 0, 0], //[4]
    [1, 0, 1, 1, 0, 0]  //[5]
 //X[0, 1, 2, 3, 4, 5]
];
var n, e, s, w, x, y;

var startCell = function(){
    x = Math.round(grid[0].length / 2);
    y = grid.length - 1;
    checkDirs();
}();

function checkNorth(){
    // console.log(!!grid[y]); //does current row exist
    // console.log(!!grid[y - 1]); //does above row exist
    // (grid[y - 1]) ? console.log(grid[y - 1][x]) : console.log(false); //if above row exists, what is the value of above cell?

    if( !!grid[y] && !!grid[y - 1] && (grid[y - 1]) ? grid[y - 1][x] : false ){
        y--;
        checkDirs();
    }
}
function checkEast(){
    // console.log(!!grid[y][x]); //does current cell exist
    // console.log(grid[y][x + 1] !== undefined); //does right cell exist
    // (grid[y][x + 1] !== undefined) ? console.log(!!grid[y][x + 1]) : console.log(false); //if right cell exists, what is the value of cell?

    if( !!grid[y][x] && grid[y][x + 1] !== undefined && (grid[y][x + 1] !== undefined) ? grid[y][x + 1] : false ){
        x++;
        checkDirs();
    }
}
function checkSouth(){
    if( !!grid[y] && !!grid[y + 1] && (grid[y + 1]) ? grid[y + 1][x] : false ){
        y++;
        checkDirs();
    }
}
function checkWest(){
    if( !!grid[y][x] && grid[y][x - 1] !== undefined && (grid[y][x - 1] !== undefined) ? grid[y][x - 1] : false ){
        x--;
        checkDirs();
    }
}

// startCell();

function checkDirs(){
    console.clear();
    ( !!grid[y] && !!grid[y - 1] && (grid[y - 1]) ? grid[y - 1][x] : false ) ? n = '↑' : n = '¯';
    ( !!grid[y][x] && grid[y][x + 1] !== undefined && (grid[y][x + 1] !== undefined) ? grid[y][x + 1] : false ) ? e = '→' : e = '|';
    ( !!grid[y] && !!grid[y + 1] && (grid[y + 1]) ? grid[y + 1][x] : false ) ? s = '↓' : s = '_';
    ( !!grid[y][x] && grid[y][x - 1] !== undefined && (grid[y][x - 1] !== undefined) ? grid[y][x - 1] : false ) ? w = '←' : w = '|';
    /*
    Directional Arrows for copy and pasting
      ↑
    ←   →
      ↓
    */
    var map = '¯¯¯'+n+'¯¯¯\n|     |\n' + w + '  o  ' + e + '\n|     |\n___' + s + '___';
    console.log(map);
    console.log('x: ' + x + ' | y: ' + y);
}
function north(){
    console.log('x: ' + x + ' | y: ' + y);
}

addEventListener('keypress', function(e){
    e.preventDefault();
    switch(e.keyCode){
        case 38:
            checkNorth();
            // console.log('up');
            break;
        case 39:
            checkEast();
            // console.log('right');
            break;
        case 40:
            checkSouth();
            // console.log('down');
            break;
        case 37:
            checkWest();
            // console.log('left');
            break;
    }
});
