var fruits = ['apple', 'banana', 'cherry', 'strawberry', 'pineapple'];
//fruits.push('kiwi'); //adds new item at the end

var fruitColors = [];
var cherry = ['cherry', 'red'];
var banana = ['banana', 'yellow'];
var kiwi = ['kiwi', 'green'];

fruitColors.push(cherry);
fruitColors.push(banana);
fruitColors.push(kiwi);

//console.log(fruitColors[0][1]);
//console.log(fruitColors[1][1]);
//console.log(fruitColors[2][1]);

//var lastFruit = fruitColors.pop(); // removes last element of the array
//var firstFruit = fruitColors.shift(); // removes first element of the array
//console.log(fruitColors);
//console.log(firstFruit);

//var selectedFruit = fruits.slice(1, 3); //slice(starting index, end index) end index is not included
//console.log(selectedFruit);

fruits.splice(1,2, 'grape'); //splice(where index, how many to replace, item to be added)
console.log(fruits);
