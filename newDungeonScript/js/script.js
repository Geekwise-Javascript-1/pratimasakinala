(function(){
  var n = document.getElementById('n'),
      e = document.getElementById('e'),
      s = document.getElementById('s'),
      w = document.getElementById('w'),
      tableHolder = document.getElementById('table'),
      cells = [],
      monsters = [],
      monTypes = ['Dragon', 'Goblin', 'Ghoul', 'Vampire', 'Werewolf', 'Wraith'];
  var hero, monster, maze, thisCell, tCell;

  checkForHero();

  /*
   * Function that checks localStorage if a hero exists
   * If not then prompts user to enter one
   */
  function checkForHero(){
    if(!localStorage.getItem('hero')){
      hero = {
        name: prompt('What\'s your name?'),
        hp: 15
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
    maze = document.createElement('table'); // Create a table elemenet and assign it to maze variable
    tableHolder.appendChild(maze); // Append table element to tableHolder variable (section in index.html)

    for(var i = 0; i < y; i++){
      cells[i] = [];
      visited[i] = [];

      maze.insertRow(i); // Insert a row

      for(var j = 0; j < x; j++){
        cells[i][j] = [0, 0, 0, 0]; // Walls all around each cell
        visited[i][j] = false; // None of the cells have been visited by the algorithm

        maze.firstChild.childNodes[i].insertCell(j); // Insert cell in the row created above

        thisCell = maze.firstChild.childNodes[i].childNodes[j];
        thisCell.classList.add('bt', 'br', 'bb', 'bl'); // Add walls around each cell in the table
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
      thisCell = cells[ currentCell[0] ][ currentCell[1] ];
      tCell = maze.firstChild.childNodes[ currentCell[0] ].childNodes[ currentCell[1] ];

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

        cells[ currentCell[0] ][ currentCell[1] ][ nextCell[2] ] = 1; // Target the common wall between current cell and next cell

        makeWay(thisCell, tCell);

        cells[ nextCell[0] ][ nextCell[1] ][ nextCell[3] ] = 1; // Target the common wall between current cell and next cell

        visited[ nextCell[0] ][ nextCell[1] ] = true; // Change the status of nextCell from unvisited to visited

        currentCell = [ nextCell[0], nextCell[1] ]; // currentCell is now nextCell

        path.push(currentCell); // Add currentCell to the path array that the algorithm has gone through
        console.log('path: ' + path);
        console.log('currentCell: [' + currentCell[0] + ', ' + currentCell[1] + ']');
        numOfVisited++; // Increment number of visited cells by 1
      } else { // If there are no unvisited neighbors

        if( currentCell[0] > -1 &&
            currentCell[0] < y &&
            currentCell[1] > -1 &&
            currentCell[1] < x) {
              makeWay(thisCell, tCell);
            }

        console.log('no immediate neighbors available');
        currentCell = path.pop(); // Set the last cell that the algorithm went through
        console.log('currentCell: ' + currentCell);
      }
    }
    thisCell = cells[ currentCell[0] ][ currentCell[1] ];
    tCell = maze.firstChild.childNodes[ currentCell[0] ].childNodes[ currentCell[1] ];
    makeWay(thisCell, tCell);

    console.log('<---------Algorithm work ends--------->');

    initializeGrid(path);
  }(8, 8);

  // Function to create the grid/maze
  function makeWay(thisCell, tCell){
    console.log('<---------makeWay at work--------->');
    console.log('thisCell: ' + thisCell);
    var t = -1, val = 1;
    while( (t = thisCell.indexOf(val, t+1)) != -1 ){
      console.log('index: ' + t);
      switch (t) {
        case 0:
          tCell.classList.remove('bt');
          break;
        case 1:
          tCell.classList.remove('br');
          break;
        case 2:
          tCell.classList.remove('bb');
          break;
        case 3:
          tCell.classList.remove('bl');
          break;
      }
    }
    console.log('<---------makeWay work ends--------->');
  }

  /*
   * Function to initialize the grid/maze, activate current cell and
   * style the exit cell
   */
  function initializeGrid(path){
    generateMonsters(); // Call the function that generate monsters

    thisCell = path[0];
    statusCell(thisCell, 'active'); // Call the function that sets css style to the active cell
    console.log('Maze starting cell: ' + thisCell);

    statusCell(path[ path.length - 1 ], 'finish'); // Call the function that sets css style to the exit cell
    console.log('Maze end cell: ' + path[ path.length - 1 ]);

    checkWalls(); // Call the function that checks for walls around the active/current cell
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

    // Enable or disable wall (top, right, bottom, left)
    // corresponding to north, east, south and west
    for(var i = 0; i < 4; i++){
      switch (i) {
        case 0:
          // If wall = 1 (meaning there is a way), set css style for button to be clickable
          // If wall = 0 (meaning there is a wall), set css style for button to be not clickable
          walls[i] ? n.disabled = false : n.disabled = true;
          break;
        case 1:
          walls[i] ? e.disabled = false : e.disabled = true;
          break;
        case 2:
          walls[i] ? s.disabled = false : s.disabled = true;
          break;
        case 3:
          walls[i] ? w.disabled = false : w.disabled = true;
          break;
      }
    }
    console.log('<---------Checking for walls end--------->');
  }

  // Listen for click on direction buttons
  addEventListener('click', function(evt) {
    switch (evt.target.id) {
      case 'n':
        moveDirection('n');
        break;
      case 'e':
        moveDirection('e');
        break;
      case 's':
        moveDirection('s');
        break;
      case 'w':
        moveDirection('w');
        break;
    }
  });

  // Listen for keypress on arrow keys
  addEventListener('keydown', function(evt) {
    evt.preventDefault();

    // If an arrow/(wdsa key) is pressed and the button is not disabled (meaning there is a way), call moveDirection function
    if((evt.keyCode === 38 || evt.keyCode === 87) && !n.disabled) moveDirection('n');
    if((evt.keyCode === 39 || evt.keyCode === 68) && !e.disabled) moveDirection('e');
    if((evt.keyCode === 40 || evt.keyCode === 83) && !s.disabled) moveDirection('s');
    if((evt.keyCode === 37 || evt.keyCode === 65) && !w.disabled) moveDirection('w');
  });

  // Move to the next cell based on the direction
  function moveDirection(direction) {
    // Call a function that changes css class for thisCell to change its active status to inactive
    statusCell(thisCell, 'inactive');

    // Change the position of thisCell to move
    switch (direction) {
      case 'n':
        thisCell = [ thisCell[0] - 1, thisCell[1] ];
        break;
      case 'e':
        thisCell = [ thisCell[0], thisCell[1] + 1 ];
        break;
      case 's':
        thisCell = [ thisCell[0] + 1, thisCell[1] ];
        break;
      case 'w':
        thisCell = [ thisCell[0], thisCell[1] - 1 ];
        break;
    }

    // Call a function that changes css class for the new thisCell to change its inactive status to active
    statusCell(thisCell, 'active');
    // Call a function that checks if there is a monster that you encountered
    encounter();
    // Call a function that checks for walls/doors
    checkWalls();
  }

  /*
   * Function that changes a cell's css style (adds/removes 'active' class),
   * sets style for when we reach the exit cell and reloads the maze again
   */
  function statusCell(cell, status){
    console.log(cell);
    // Check if the cell is the exit cell
    if( maze.firstChild.childNodes[ cell[0] ].childNodes[ cell[1] ].classList.contains('exit') ){
      alert('Congratulations! You\'ve made it!');
      location.reload();
    }

    switch (status) {
      case 'active':
        maze.firstChild.childNodes[ cell[0] ].childNodes[ cell[1] ].classList.add('active');
        break;
      case 'inactive':
        maze.firstChild.childNodes[ cell[0] ].childNodes[ cell[1] ].classList.remove('active');
        break;
      case 'finish':
        maze.firstChild.childNodes[ cell[0] ].childNodes[ cell[1] ].classList.add('exit');
        break;
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
    console.log(percentageOfEncounter + '% chance of running into a monster');

    var chanceOfEncounter = Math.ceil(Math.random() * 100);
    console.log('chance of encounter: ' + chanceOfEncounter);

    // If percentageOfEncounter is greater than or equal to chanceOfEncounter,
    // fight the monster
    if(chanceOfEncounter <= percentageOfEncounter){
      // Randomly pick one monster from the monsters array
      monster = monsters.splice( Math.floor(Math.random () * monsters.length), 1)[0];

      // Call the function that fights the monster
      console.log(monster);
      alert('You have encountered a ' + monster.name + "!!");
      battle(monster);
    }
  }

  // Function that fights the monster
  function battle(player){
    var takingDamage;
    if(player.name === hero.name){
      takingDamage = monster;
    }else{
      player = player;
      takingDamage = hero;
    }

    // While both attacker and the one taking damage have hit points left
    while(player.hp > 0 && takingDamage.hp > 0){
      // Generate a hit point that hero gets
      var hit = Math.ceil(player.hp / 3);
      takingDamage.hp -= hit;

      checkIfAlive(takingDamage, hit);
    }
  }

  // Function that checks if the one taking damage is alive
  function checkIfAlive(takingDamage, hit){
    if(takingDamage.hp <= 0){
      // If hero has no hit points left, reload the maze
      if(takingDamage.name === hero.name){
        alert('Oh No! You are dead!!');
        location.reload();
      }else{
        alert('You have defeated the monster!');
      }
    }else{
      if(takingDamage.name === hero.name){
        alert('You\'ve taken ' + hit + ' damage from the combat!');
        battle(hero);
      }else{
        alert('You shot the '+ monster.name + ' for ' + hit + '!!');
        battle(monster);
      }
    }
  }

})();
