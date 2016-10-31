/* Useless precode stuff
var fName="Snow";
var lName="Gehrett";
var age=19;
var dist=2.75;
var gender=true;
var list=["eggs", "bread", "milk"]
var car={
  make:"fiat",
  model:"abarth",
  year:"14",
};

console.log(fName[3]);
console.log(lName.length);
console.log(typeof age);
console.log(typeof dist);
console.log(typeof gender);
console.log(list[1]);
console.log(car.model);

// concepts in order:
// string
// number
// float
// boolean
// array
// object

var hobby="Arena FPS Games";*/

/*alert("First and Last Name: " + fName + " " + lName + ", Age: " + age +
 ", Hobby: " + hobby);*/

/*var uName=prompt("What is your name, stranger?");
console.log(uName);
alert(uName);

var pWord=prompt("What shall be your password?");
console.log(pWord);
alert(pWord);

var plAge=prompt("How old are you, stranger?");
console.log(parseInt(plAge));
*/

/*Movement*/

var n = document.getElementById("n");
var e = document.getElementById("e");
var s = document.getElementById("s");
var w = document.getElementById("w");
var tableHolder = document.getElementById('table');
var maze, thisCell, exitCell, cells;

function enableNorth(wall){
  wall ? n.disabled = false : n.disabled = true;
  //console.log(wall);
}
function enableWest(wall){
  wall ? w.disabled = false : w.disabled = true;
  //console.log(wall);
}
function enableSouth(wall){
  wall ? s.disabled = false : s.disabled = true;
  //console.log(wall);
}
function enableEast(wall){
  wall ? e.disabled = false : e.disabled = true;
  //console.log(wall);
}

n.addEventListener("click", function(evt){
  moveNorth(evt);
});
function moveNorth(evt){
  statusCell(thisCell,'inactive');
  thisCell = [thisCell[0]-1, thisCell[1]];
  statusCell(thisCell, 'active');
  encounter();
  chkWalls(cells);
  console.log("Went North.");
}

e.addEventListener("click", function(evt){
  moveEast(evt);
});
function moveEast(evt){
  statusCell(thisCell,'inactive');
  thisCell = [thisCell[0], thisCell[1]+1];
  statusCell(thisCell, 'active');
  encounter();
  chkWalls(cells);
  console.log("Went East.");
}

s.addEventListener("click", function(evt){
  moveSouth(evt);
});
function moveSouth(evt){
  statusCell(thisCell,'inactive');
  thisCell = [thisCell[0]+1, thisCell[1]];
  statusCell(thisCell, 'active');
  encounter();
  chkWalls(cells);
  console.log("Went South.");
}

w.addEventListener("click", function(evt){
  moveWest(evt);
});
function moveWest(evt){
  statusCell(thisCell,'inactive');
  thisCell = [thisCell[0], thisCell[1]-1];
  statusCell(thisCell, 'active');
  encounter();
  chkWalls(cells);
  console.log("Went West.");
}

/*Monsters*/

var monsters = [];
var monTypes = ["Soldier", "Scout", "Demoman", "Medic", "Sniper", "Spy", "Pyro", "Heavy", "Engineer"];

function Monsters(name, hp){
  this.name = name,
  this.hp = hp
}

function generateMonsters(){
  var totalMon = Math.round(Math.random() * 10);
  console.log(totalMon);

  for(var i = 0; i < totalMon; i++){
    monsters[i] = new Monsters();
    monsters[i].name = monTypes[Math.floor(Math.random() *
      monTypes.length)];
    if(monsters[i].name == "Scout" || monsters[i].name == "Sniper" || monsters[i].name ==  "Spy" || monsters[i].name ==  "Engineer"){
      monsters[i].hp = 5;
    }else if(monsters[i].name == "Medic"){
      monsters[i].hp = 6;
    }else if(monsters[i].name == "Demoman" || monsters[i].name == "Pyro"){
      monsters[i].hp = 7;
    }else if(monsters[i].name == "Soldier"){
      monsters[i].hp = 8;
    }else if(monsters[i].name == "Heavy"){
      monsters[i].hp = 12;
    }
  console.log(monsters);
  }
}
generateMonsters();

/*Hero*/

if(!localStorage.getItem("hero")){
  var hero = {
    name: prompt("What's your name?"),
    hp: 50
  };
  localStorage.setItem("hero", JSON.stringify(hero));
}else{
  var hero = JSON.parse(localStorage.getItem("hero"));
}


/*Cells*/

function statusCell(cell, status){
  console.log(cell);
  if (maze.firstChild.childNodes[cell[0]].childNodes[cell[1]].classList.contains("exit")){
    alert("You've made it!");
    location.reload();
  }
  switch(status){
    case "active":
        maze.firstChild.childNodes[cell[0]].childNodes[cell[1]].classList.add('active');
      break;
    case "inactive":
      maze.firstChild.childNodes[cell[0]].childNodes[cell[1]].classList.remove("active");
      break;
    case "exit":
      maze.firstChild.childNodes[cell[0]].childNodes[cell[1]].classList.add("exit");
      break;
  }
  return cell;
}

/*keypress*/

addEventListener("keypress", function(evt){
  evt.preventDefault();
  console.log(evt);
  if(evt.keyCode === 38 && !n.disabled){
    moveNorth();
  }else if(evt.keyCode === 39 && !e.disabled){
    moveEast();
  }else if(evt.keyCode === 40 && !s.disabled){
    moveSouth();
  }else if(evt.keyCode === 37 && !w.disabled){
    moveWest();
  }
});

/*Grid*/

var grid = function(x, y){
  var totalCells = x * y;
  console.log(cells);
 cells = [];
 console.log(cells);
   var unvisited = [];

    for(var i = 0; i < y; i++){
      cells[i] = [];
      unvisited[i] = [];
        for(var j = 0; j < x; j++){
          cells[i][j] = [0, 0, 0, 0];
          unvisited[i][j] = true;
        }
    }

    var currentCell= [Math.floor(Math.random() * y),
                      Math.floor(Math.random() * x)];

    var path = [currentCell];

    unvisited[currentCell[0]][currentCell[1]]
      = false;

    var visited = 1;
    while(visited < totalCells){
      var possible = [
                  [ currentCell[0]-1, currentCell[1], 0, 2 ], //checking if y value of neighbor cell (top) is inside the grid
                  [ currentCell[0], currentCell[1]+1, 1, 3 ],
                  [ currentCell[0]+1, currentCell[1], 2, 0 ],
                  [ currentCell[0], currentCell[1]-1, 3, 1 ]];
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
        cells[ next [0] ][ next[1] ][ next[3] ] = 1;
        unvisited[ next[0] ][ next[1] ]= false;

        visited++;

        currentCell = [ next[0], next [1] ];
        path.push(currentCell);
      }else{
        currentCell = path.pop();
      }
    }
    //return cells;s

    gridStart(cells, path)

}(11, 11);

var table = document.getElementById('table');

function gridStart(cells, path){
  gridBuilder(cells);

  thisCell = theCell(path[0]);
  exitCell = leaveCell(path[path.length-1]);
  chkWalls(cells);
}

function gridBuilder(cells){
  maze = document.createElement('table')
  tableHolder.appendChild(maze);
  //console.log(tableHolder);
  for(var i = 0; i < cells.length; i++){
    maze.insertRow(i);
      for(var j = 0; j < cells[i].length; j++){
        maze.firstChild.childNodes[i].insertCell(j);
        thisCell = maze.firstChild.childNodes[i].childNodes[j];
        for(var k = 0; k < 4; k++){
          switch(k){
            case 0:
              cells[i][j][k] ?
              thisCell.classList.remove('bt') :
              thisCell.classList.add('bt')
              break;
            case 1:
              cells[i][j][k] ?
              thisCell.classList.remove('br') :
              thisCell.classList.add('br')
              break;
            case 2:
              cells[i][j][k] ?
              thisCell.classList.remove('bb') :
              thisCell.classList.add('bb')
              break;
            case 3:
              cells[i][j][k] ?
              thisCell.classList.remove('bl') :
              thisCell.classList.add('bl')
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

function leaveCell(cell){
  maze.firstChild.childNodes[cell[0]].childNodes[cell[1]].classList.add('exit');
  return cell;
}

function chkWalls(cells){
  // console.log(thisCell);
  // console.log(cells);
  var walls = cells[ thisCell[0] ][ thisCell[1] ];
    for(var i = 0; i < 4; i++){
      switch (i) {
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

/*Encounter*/

function encounter(){
  var percEnc = Math.round(monsters.length /
    (cells.length * cells[0].length) * 100);
  console.log(percEnc + "% chance of running into a member of RED!");
  var chanceEnc = Math.ceil(Math.random() * 100);
  //console.log(chanceEnc);
  var monsterEnc = Math.floor(Math.random() * monsters.length);
    if(chanceEnc <= percEnc){
      //console.log("A member of the RED team stands in your path!")
      console.log(monsters.splice(monsterEnc, 1));
      battle(monsters.splice(monsterEnc, 1));
    }
}

function battle(monster){
  console.log(monster[0]);
  console.log(monster[0].name);
  console.log(monster[0].hp);
  alert("You ran into a RED "+monster[0].name+"!!");
  while(monster[0].hp > 0 && hero.hp > 0){
    var damage = Math.ceil(monster[0].hp / 3);
    hero.hp -= damage;
    if(hero.hp <= 0){
      alert("My professional opinion? You're dead!");
      location.reload();
    }
    alert("You've taken "+damage+" damage from combat!");
    playerAction(monster);
    if(monster[0].hp <= 0){
      alert("The member of RED has died.");
      break;
    }
  }
}

function playerAction(monster){
  console.log(monster);
  var damage = Math.ceil(hero.hp / 10);
  console.log(monster[0].hp);
  monster[0].hp -= damage;
  console.log(monster[0].hp);
  alert("You shot the RED member for "+damage+"!!");
}

/*var hero = {
   name: 'Kaomi Yulai',
   power: 100
};

var Enemy = function(name, power, pos){
   this.name = name,
   this.power = power
   this.y = pos[0],
   this.x = pos[1]
};

function randPower(min, max){
  var power = Math.floor(Math.random() * 100) +1;
  var range = Math.floor(Math.random() * (max - min)) + min;
  return range;
}

function randCell(){
 var y = Math.floor(Math.random() * cells.length);
 var x = Math.floor(Math.random() * cells[0].length);
 return [y, x];
}

var enemy1 = new Enemy('Scout', randPower(5, 10), randCell());
var enemy2 = new Enemy('Soldier', randPower(10, 20), randCell());

// console.log(hero);
// console.log(enemy1);
// console.log(enemy2);

if(!localStorage.getItem("username") &&
  !localStorage.getItem("lastname")){
    var name = prompt("What's your name, Stranger?");
    var lname = prompt("And your family name?");
    var password = prompt("Make a Password?");
    setLoginStorage();
  }else{
    alert("Welcome back, " + localStorage.getItem("username"));
  }

function setLoginStorage(){
  localStorage.setItem("username", name);
  localStorage.setItem("lastname", lname);
  sessionStorage.setItem("hero", hero);
  sessionStorage.setItem("enemies", enemy1, enemy2);
  sessionStorage.setItem("password", password);
}

if(!localStorage.getItem("hero"));{
  setCharStorage();
}

function setCharStorage(){
  localStorage.setItem("hero", JSON.stringify(hero));
  sessionStorage.setItem("enemy1", JSON.stringify(enemy1));
  sessionStorage.setItem("enemy2", JSON.stringify(enemy2));
}

setLoginStorage();*/
