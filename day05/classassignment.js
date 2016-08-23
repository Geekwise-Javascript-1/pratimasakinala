/*class assignment */

var fruits = [];

function getUserFruit(){
  var fruit = prompt('Please enter a fruit');
   fruits.push(fruit);
   checkAnotherEntry(fruits);
}

function checkAnotherEntry(){
  var newEntry = confirm('Do you want to add another fruit?');
  if(newEntry){
    getUserFruit();
  }else{
    console.log(fruits);
    removeFruit();
  }
}

function removeFruit(){
  var remove = prompt('Enter the index number of the item to be removed');
  if(!isNaN(remove) && remove < fruits.length && remove !== null && remove !== '' && remove.trim()){
    fruits.splice(remove, 1);
    fruits.sort();
    outputFruits(fruits);
  }else{
    alert('That is an invalid entry.');
    removeFruit();
  }
}

function outputFruits(array){
  // for loop
  /*for(var i=0, len=array.length; i<len; i++){
    console.log(array[i]);
  }*/

  //while loop
  /*var i=0;
  while(i<array.length){
    console.log(array[i]);
    i++;
  }*/

  //do-while loop
  /*var i=0;
  do{
    console.log(array[i]);
    i++;
  }while(i<array.length);*/


}

//getUserFruit();

//continue - skips the code if the condition is true
/*for(var i=1; i<=10; i++){
  if(i==5 || i==7){
    continue;
  }
  console.log(i);
}*/

//break - stops the loop completely
for(var i=1; i<=10; i++){
  if(i == 6){
    break;
  }
  console.log(i);
}
