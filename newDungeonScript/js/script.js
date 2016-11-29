(function(){
  var n = document.getElementById('n'),
      e = document.getElementById('e'),
      s = document.getElementById('s'),
      w = document.getElementById('w'),
      tableHolder = document.getElementById('table'),
      cells = [],
      monsters = [],
      monTypes = ['Dragon', 'Goblin', 'Ghoul', 'Vampire', 'Werewolf', 'Wraith'];
  var hero, maze, thisCell;

  checkForHero();

  /*
   * Function that checks localStorage if a hero exists
   * If not then prompts user to enter one
   */
  function checkForHero(){
    if(!localStorage.getItem('hero')){
      hero = {
        name: prompt('What\'s your name?'),
        hp: 50
      };
      localStorage.setItem('hero', JSON.stringify(hero));
    }else{
      hero = JSON.parse(localStorage.getItem('hero'));
    }
  }

  // Create the grid using algorithm
  var grid = function(y, x) { // y is the number of rows, x is the number of columns
    console.log('<---------Algorithm at work--------->');
    var totalCells = y * x;
    var visited = [];

    for(var i = 0; i < y; i++){
      cells[i] = [];
      visited[i] = [];

      for(var j = 0; j < x; j++){
        cells[i][j] = [0, 0, 0, 0]; // Walls all around each cell
        visited[i][j] = false; // None of the cells have been visited by the algorithm
      }
    }

    // Randomly generated starting point for the algorithm
    var currentCell = [ Math.floor(Math.random() * y),
                        Math.floor(Math.random() * x)];
    console.log('starting cell: ' + currentCell);

    // Track the path the algorithm takes
    var path = [currentCell];
    console.log('Path: ' + path);

    // Change the status of currentCell from unvisited to visited
    visited[currentCell[0]][currentCell[1]] = true;

    var numOfVisited = 1;

    // Execute following untill all the cells have been visited by the algorithm
    while(numOfVisited < totalCells){
      var possibleNeighbors = [ [ currentCell[0]-1, currentCell[1], 0, 2], // Check for possible neighbor on top (north)
                                [ currentCell[0], currentCell[1] + 1, 1, 3], // Check for possible neighbor to the right (east)
                                [ currentCell[0] + 1, currentCell[1], 2, 0], // Check for possible neighbor below (south)
                                [ currentCell[0], currentCell[1] - 1, 3, 1] ]; // Check for possible neighbor to the left (west)
      var neighbors = [];
      console.log('possibleNeighbors: \n [ [' + possibleNeighbors[0]
                  + '], \n [' + possibleNeighbors[1] + '], \n ['
                  + possibleNeighbors[2] + '], \n [' + possibleNeighbors[3] + '] ]');

      for(var k = 0; k < 4; k++){
        if(possibleNeighbors[k][0] > -1 && // Check if neighbor's y is valid
           possibleNeighbors[k][0] < y && // Check if neighbor's y is less than the grid width
           possibleNeighbors[k][1] > -1 && // Check if neighbor's x is valid
           possibleNeighbors[k][1] < x && // Check if neighbor's x is less than the grid height
           !visited[ possibleNeighbors[k][0] ][ possibleNeighbors[k][1] ]){ // Check if the neighbor has been visited
             neighbors.push(possibleNeighbors[k]);
           }
      }

      if(neighbors.length) { // If there are neighbors
        var nextCell = neighbors[ Math.floor(Math.random() * neighbors.length) ]; // Randomly pick the next cell to go to
        console.log('nextCell: [' + nextCell[0] + ', ' + nextCell[1] + ']');

        cells[ currentCell[0] ][ currentCell[1] ][ nextCell[2] ] =
        cells[ nextCell[0] ][ nextCell[1] ][ nextCell[3] ] = 1; // Target the common wall between current cell and next cell

        visited[ nextCell[0] ][ nextCell[1] ] = true; // Change the status of nextCell from unvisited to visited

        currentCell = [ nextCell[0], nextCell[1] ]; // currentCell is now nextCell

        path.push(currentCell); // Add currentCell to the path array that the algorithm has gone through
        console.log('path: ' + path);
        console.log('currentCell: [' + currentCell[0] + ', ' + currentCell[1] + ']');
        numOfVisited++; // Increment number of visited cells by 1
      } else { // If there are no unvisited neighbors
        console.log('no immediate neighbors available');
        currentCell = path.pop(); // Set the last cell that the algorithm went through
        console.log('currentCell: ' + currentCell);
      }
    }
    console.log('<---------Algorithm work ends--------->');

    initializeGrid(path);
  }(8, 8);

  /*
   * Function to initialize the grid/maze, activate current cell and
   * style the exit cell
   */
  function initializeGrid(path){
    gridBuilder(); // Call the function that create the maze
    generateMonsters(); // Call the function that generate monsters

    thisCell = path[0];
    activateCell(thisCell); // Call the function that sets css style to the active cell
    console.log('Maze starting cell: ' + thisCell);

    endCell(path[ path.length - 1 ]); // Call the function that sets css style to the exit cell
    console.log('Maze end cell: ' + path[ path.length - 1 ]);

    checkWalls(); // Call the function that checks for walls around the active/current cell
  }

  // Function to create the grid/maze
  function gridBuilder(){
    console.log('<---------Grid/maze building at work--------->');
    maze = document.createElement('table'); // Create a table elemenet and assign it to maze variable
    tableHolder.appendChild(maze); // Append table element to tableHolder variable (section in index.html)

    for(var i = 0; i < cells.length; i++){
      maze.insertRow(i); // Insert a row
      // console.log(tableHolder);

      for(var j = 0; j < cells[i].length; j++){
        maze.firstChild.childNodes[i].insertCell(j); // Insert cell in the row created above

        // Go through each cell in the row to set/remove walls
        thisCell = maze.firstChild.childNodes[i].childNodes[j];
        // Check all four directions and decide to set/remove class (that sets/removes walls)
        for(var k = 0; k < 4; k++){
          switch (k) {
            case 0: // Check north (cell to the top of thisCell)
              cells[i][j][k] ? // Check if thisCell has a value of 1 or 0 for its north wall. This will return true if the value is 1 (no wall)
              thisCell.classList.remove('bt') :
              thisCell.classList.add('bt');
              break;
            case 1: // Check east (cell to the right of thisCell)
              cells[i][j][k] ? // Check if thisCell has a value of 1 or 0 for its east wall.
              thisCell.classList.remove('br') :
              thisCell.classList.add('br');
              break;
            case 2: // Check south (cell below thisCell)
              cells[i][j][k] ? // Check if thisCell has a value of 1 or 0 for its south wall.
              thisCell.classList.remove('bb') :
              thisCell.classList.add('bb');
              break;
            case 3: // Check west (cell to the left of thisCell)
              cells[i][j][k] ? // Check if thisCell has a value of 1 or 0 for its west wall.
              thisCell.classList.remove('bl') :
              thisCell.classList.add('bl');
              break;
          }
        }
      }
    }
    console.log('<---------Grid/maze building work ends--------->');
  }

  // Activate current cell
  function activateCell(cell){
    console.log('Activating [' + cell[0] + ', ' + cell[1] + ']');
    // Add css class
    maze.firstChild.childNodes[ cell[0] ].childNodes[ cell[1] ].classList.add('active');
  }

  // Set style for the end cell
  function endCell(cell){
    // Add css class
    maze.firstChild.childNodes[ cell[0] ].childNodes[ cell[1] ].classList.add('exit');
  }

  /*
   * Function that check in all direction to check if there is way
   * to move to the next cell
   */
  function checkWalls(){
    console.log('<---------Checking for walls begin--------->');
    console.log('thisCell: ' + thisCell);

    var walls = cells[ thisCell[0] ][ thisCell[1] ]; // Get the values of walls for thisCell (initial value is the starting cell)
    console.log('walls: ' + walls);

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

    console.log('<---------Checking for walls end--------->');
  }

  // Enable or disable wall (top, right, bottom, left)
  // corresponding to north, east, south and west
  function enableNorth(wall) {
    // If wall = 1 (meaning there is a way), set css style for button to be clickable
    // If wall = 0 (meaning there is a wall), set css style for button to be not clickable
    wall ? n.disabled = false : n.disabled = true;
  }

  function enableEast(wall) {
    wall ? e.disabled = false : e.disabled = true;
  }

  function enableSouth(wall) {
    wall ? s.disabled = false : s.disabled = true;
  }

  function enableWest(wall) {
    wall ? w.disabled = false : w.disabled = true;
  }

  // Listen for click on direction buttons
  n.addEventListener('click', function() {
    moveNorth();
  });

  e.addEventListener('click', function() {
    moveEast();
  });

  s.addEventListener('click', function() {
    moveSouth();
  });

  w.addEventListener('click', function() {
    moveWest();
  });

  // Listen for keypress on arrow keys
  addEventListener('keydown', function(evt) {
    evt.preventDefault();
    // console.log(e);

    // If up arrow pressed and the button is not disabled (meaning there is a way), call moveNorth function
    if(evt.keyCode === 38 && !n.disabled) moveNorth();

    // If right arrow pressed and the button is not disabled (meaning there is a way), call moveEast function
    if(evt.keyCode === 39 && !e.disabled) moveEast();

    // If down arrow pressed and the button is not disabled (meaning there is a way), call moveSouth function
    if(evt.keyCode === 40 && !s.disabled) moveSouth();

    // If left arrow pressed and the button is not disabled (meaning there is a way), call moveWest function
    if(evt.keyCode === 37 && !w.disabled) moveWest();
  });

  // Move to the next cell based on the direction
  function moveNorth() {
    console.log('Moving north');

    // Call a function that changes css class for thisCell to change its active status to inactive
    statusCell(thisCell, 'inactive');

    // Change the position of thisCell to move north
    thisCell = [ thisCell[0]-1, thisCell[1] ];

    // Call a function that changes css class for the new thisCell to change its inactive status to active
    statusCell(thisCell, 'active');

    // Call a function that checks if there is a monster that you encountered
    encounter();

    // Call a function that checks for walls/doors
    checkWalls();

    console.log('Moved north');
  }

  function moveEast() {
    console.log('Moving east');

    statusCell(thisCell, 'inactive');
    thisCell = [ thisCell[0], thisCell[1]+1 ];
    statusCell(thisCell, 'active');

    encounter();
    checkWalls();
    console.log('Moved east');
  }

  function moveSouth() {
    console.log('Moving south');

    statusCell(thisCell, 'inactive');
    thisCell = [ thisCell[0]+1, thisCell[1] ];
    statusCell(thisCell, 'active');

    encounter();
    checkWalls();
    console.log('Moved South');
  }

  function moveWest() {
    console.log('Moving west');

    statusCell(thisCell, 'inactive');
    thisCell = [ thisCell[0], thisCell[1]-1 ];
    statusCell(thisCell, 'active');

    encounter();
    checkWalls();
    console.log('Moved West');
  }

  /*
   * Function that changes a cell's css style (adds/removes 'active' class),
   * sets style for when we reach the exit cell and reloads the maze again
   */
  function statusCell(cell, status){
  switch (status) {
    case 'active':
      maze.firstChild.childNodes[ cell[0] ].childNodes[ cell[1] ].classList.add('active');
      break;
    case 'inactive':
      maze.firstChild.childNodes[ cell[0] ].childNodes[ cell[1] ].classList.remove('active');
      break;
  }

  console.log(cell);

  // Check if the cell is the exit cell
  if( maze.firstChild.childNodes[ cell[0] ].childNodes[ cell[1] ].classList.contains('exit') ){
    alert('Congratulations! You\'ve made it!');
    location.reload();
  }
}

  // Monster object contructor
  function monster(name, hp){
    this.name = name;
    this.hp = hp;
  }

  /*
   * Function that generates monsters with random hit points
   */
  function generateMonsters(){
    console.log('<---------Generating Monsters--------->');

    // Random number of monsters in the maze
    var totalMonsters = Math.round(Math.random() * 10);
    console.log('Total number of monsters: ' + totalMonsters);

    for(var i = 0; i < totalMonsters; i++){
      // Create a new instance of monster object
      monsters[i] = new monster();

      // Randomly pick one monster name from monTypes array of monsters
      monsters[i].name = monTypes[Math.floor(Math.random() * monTypes.length)];

      // Randomly generate hit points between 5-20
      monsters[i].hp = Math.floor(Math.random() * 15) + 5;
    }

    console.log(monsters);
    console.log('<---------Done Generating Monsters--------->');
  }

  // Function that checks for chance of encountering a monster
  function encounter(){
    var percentageOfEncounter = Math.round(monsters.length / (cells.length * cells[0].length) * 100);
    console.log(cells.length);
    console.log(cells[0].length);
    console.log(percentageOfEncounter + '% chance of running into a monster');

    var chanceOfEncounter = Math.ceil(Math.random() * 100);
    console.log(chanceOfEncounter);

    // Randomly pick one monster from the monsters array
    var monsterEncountered = Math.floor(Math.random () * monsters.length);

    // If percentageOfEncounter is greater than or equal to chanceOfEncounter,
    // fight the monster
    if(chanceOfEncounter <= percentageOfEncounter){
      var monster = monsters.splice(monsterEncountered, 1);

      // Call the function that fights the monster
      battle(monster);
    }
  }

  // Function that fights the monster
  function battle(monster){
    console.log(monster);
    alert('You have encountered a ' + monster[0].name + "!!");

    // While both monster and the hero have hit points left
    while(monster[0].hp > 0 && hero.hp > 0){
      // Generate a hit point that hero gets
      var hit = Math.ceil(monster[0].hp / 3);
      hero.hp -= hit;

      checkHeroAlive();

      alert('You\'ve taken ' + hit + ' damage from the combat!');
      if(heroAction(monster)){ // This is true when the monster has been defeated
        break;
      }
    }
  }

  // Function that checks if hero is alive
  function checkHeroAlive(){
    console.log('hero has ' + hero.hp + ' hit points left');
    // If hero has no hit points left, reload the maze
    if(hero.hp <= 0){
      alert('Oh No! You are dead!!');
      location.reload();
    }else{
      return;
    }
  }

  // Function where hero attacks the monster
  function heroAction(monster){
    // Hit the monster with a tenth of the hit points of the hero
    var damage = Math.ceil(hero.hp / 10);
    monster[0].hp -= damage;
    alert('You shot the '+ monster[0].name + ' for ' + damage + '!!');

    return checkMonsterAlive(monster);
  }

  // Function that checks if monster is alive
  function checkMonsterAlive(monster){
    console.log('monster has ' + monster[0].hp + ' hit points left');

    // If monster has no hit points left, return true
    if(monster[0].hp <= 0){
      alert('You have defeated the monster!');
      return true;
    }else{
      return false;
    }
  }

})();
