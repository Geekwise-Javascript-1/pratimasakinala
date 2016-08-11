//var userFav = prompt('What is your favorite color?');
//alert(userFav);


var a = 'test ' + 'string';
//console.log(a);

var b = 5;
var c = '5';
var d = b % c;
//console.log(d);

var e = 10 / 2 + 3;
//console.log(e);

var f = 12;
f++;
//console.log(f);

var g = b==c; //loose comparison
//console.log(g);

var h = b===c; //strict comparison
//console.log(h);

var constant = 13;
//var num = prompt('enter a number: ');
//every response from a prompt comes back as a string
//num = parseInt(num);
//console.log(num);
//console.log(constant === num);

//console.log(isNaN(num));

/*if(isNaN(num)){
  alert('not a number');
}
else{
  alert('your number is : ' + num);
}*/

/*if(num == 10){
  alert('your number is a 10');
}
else if(num < 10){
  alert('your number is less than 10');
}
else{
  alert('its none of the above');
}*/

var age = prompt('enter your age: ');
var gender = prompt('enter your gender');

if(age >= 21 && gender == 'male'){
  alert('Congratulations! you are eligible to drink');
}
else if(age >= 21 && gender == 'female'){
  alert('woman! drink up');
}
else {
  alert('you are underage');
}

(age <21)?
  alert('underage'):
  alert('over 21');
