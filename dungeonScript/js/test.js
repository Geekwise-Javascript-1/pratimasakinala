var tableHolder = document.getElementById('table');
var maze, thisCell, exitCell;
var n = document.getElementById('n');
var e = document.getElementById('e');
var s = document.getElementById('s');
var w = document.getElementById('w');

n.addEventListener('click', function(){
    moveNorth();
});
e.addEventListener('click', function(){
    moveEast();
});
s.addEventListener('click', function(){
    moveSouth();
});
w.addEventListener('click', function(){
    moveWest();
});

function moveNorth(){
    console.log('go north');
    maze.firstChild.children[thisCell[0]].children[thisCell[1]].classList.remove('active');
    thisCell = [thisCell[0]-1, thisCell[1]];
    maze.firstChild.children[thisCell[0]-1].children[thisCell[1]].classList.add('active');
    checkDirections(thisCell);
    // maze.firstChild.childNodes[thisCell[0]].childNodes[thisCell[1]].classList.remove('active');
    // thisCell = [thisCell[0]-1, thisCell[1]];
    // maze.firstChild.childNodes[thisCell[0]-1].childNodes[thisCell[1]].classList.add('active');
}

function moveEast(){
    // console.log('go east');
    // maze.firstChild.childNodes[thisCell[0]].childNodes[thisCell[1]].classList.remove('active');
    // thisCell = [thisCell[0], thisCell[1]+1];
    // maze.firstChild.childNodes[thisCell[0]].childNodes[thisCell[1]+1].classList.add('active');
}

function moveSouth(){
    // console.log('go south');
    // maze.firstChild.childNodes[thisCell[0]].childNodes[thisCell[1]].classList.remove('active');
    // thisCell = [thisCell[0]+1, thisCell[1]];
    // maze.firstChild.childNodes[thisCell[0]+1].childNodes[thisCell[1]].classList.add('active');
}

function moveWest(){
    // console.log('go west');
    // maze.firstChild.childNodes[thisCell[0]].childNodes[thisCell[1]].classList.remove('active');
    // thisCell = [thisCell[0], thisCell[1]-1];
    // maze.firstChild.childNodes[thisCell[0]].childNodes[thisCell[1]-1].classList.add('active');
}

var grid = function(x, y){
    var totalCells = x * y;
    var cells = [];
    var unvisited = [];

    for(var i = 0; i < y; i++){
        cells[i] = [];
        unvisited[i] = [];
        for(var j = 0; j < x; j++){
            cells[i][j] = [0,0,0,0];
            unvisited[i][j] = true;
        }
    }

    var currentCell =
        [ Math.floor(Math.random() * y), Math.floor(Math.random() * x) ];
        // [3, 2]
        // [y, x]
    var path = [currentCell];
    unvisited[currentCell[0]][currentCell[1]] = false;
    var visited = 1;

    while(visited < totalCells){
        var possible = [
            [ currentCell[0]-1, currentCell[1], 0, 2 ],
            [ currentCell[0], currentCell[1]+1, 1, 3 ],
            [ currentCell[0]+1, currentCell[1], 2, 0 ],
            [ currentCell[0], currentCell[1]-1, 3, 1 ]
        ];
        var neighbors = [];
        for(var l = 0; l < 4; l++){
            if(possible[l][0] > -1 &&
                possible[l][0] < y &&
                possible[l][1] > -1 &&
                possible[l][1] < x &&
                unvisited[ possible[l][0] ][ possible[l][1] ]){
                    neighbors.push( possible[l] );
            }
        }

        if(neighbors.length){
            var next = neighbors[ Math.floor(Math.random() * neighbors.length) ];

            cells[ currentCell[0] ][ currentCell[1] ][ next[2] ] = 1;
            cells[ next[0] ][ next[1] ][ next[3] ] = 1;
            unvisited[ next[0] ][ next[1] ] = false;

            visited++;
            currentCell = [ next[0], next[1] ];
            path.push(currentCell);
        }else{
            currentCell = path.pop();
        }
    }
    // return cells;

    gridBuilder(cells);
    gridStart(path);
}(9, 9);

function gridStart(path){

    thisCell = theCell(path[0]);
    exitCell = exitCell(path[path.length - 1]);

    // checkDirections(cells, thisCell);
}

function gridBuilder(cells){
    maze = document.createElement('table');
    tableHolder.appendChild(maze);
    for(var i = 0; i < cells.length; i++){
        maze.insertRow(i);
        for(var j = 0; j < cells[i].length; j++){
            maze.firstChild.childNodes[i].insertCell(j);
            var thisCell = maze.firstChild.childNodes[i].childNodes[j];
            for(var k = 0; k < 4; k++){
                switch(k){
                    case 0:
                        cells[i][j][k] ? thisCell.classList.remove('bt') : thisCell.classList.add('bt');
                        break;
                    case 1:
                        cells[i][j][k] ? thisCell.classList.remove('br') : thisCell.classList.add('br');
                        break;
                    case 2:
                        cells[i][j][k] ? thisCell.classList.remove('bb') : thisCell.classList.add('bb');
                        break;
                    case 3:
                        cells[i][j][k] ? thisCell.classList.remove('bl') : thisCell.classList.add('bl');
                        break;
                }
            }
        }
    }
}

function theCell(cell){
    maze.firstChild.childNodes[cell[0]].childNodes[cell[1]].classList.add('active');
    return cell;
}
function exitCell(cell){
    maze.firstChild.childNodes[cell[0]].childNodes[cell[1]].classList.add('exit');
    return cell;
}

function checkDirections(path){

}

/*
function checkDirections(cells, cell){
    var walls = cells[cell[0]][cell[1]];
    for(var i = 0; i < walls.length; i++){
        switch(i){
            case 0:
                enableNorth(walls[i]);
                break;
            case 1:
                enableEast(walls[i]);
                break;
            case 2:
                enableSouth(walls[i]);
                break;
            case 3:
                enableWest(walls[i]);
                break;
        }
    }
}
*/

function enableNorth(i){
    // console.log('north'+i);
    i ? n.disabled = false : n.disabled = true;
}
function enableEast(i){
    i ? e.disabled = false : e.disabled = true;
}
function enableSouth(i){
    i ? s.disabled = false : s.disabled = true;
}
function enableWest(i){
    i ? w.disabled = false : w.disabled = true;
}
