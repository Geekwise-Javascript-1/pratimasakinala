/*
var btn = document.getElementById('btn');//target button
var input1 = document.getElementById('input1');//target id

var inputs = document.getElementsByClassName('input');//target class

var inputsTag = document.getElementsByTagName('input');//targets by tag name

var btnEl = document.querySelector('button[type="button"]');
var btnEls = document.querySelectorAll('label input');

function btnClick(){
  for(var i=0; i<inputs.length; i++){
    console.log(inputs[i].value);
  }
}

btn.onclick = btnClick;
console.log(btnEls);
*/

//input type submit refreshes the page as soon as you click on submit
var submitBtn = document.getElementById('submit');
var form = document.getElementsByTagName('form')[0];//if multiple form tags exist

function getVals(e){//e stands for event
  e.preventDefault();//to prevent the default action of input type submit
  console.log(form.elements[form.elements.length - 1].value); //output form submit value
  var arr = [];
  for(var i=0; i<form.elements.length/*-1*/; i++){//modify code to remove submit from array
    arr.push(form.elements[i].value);
  }
  arr.pop();// comment this if -1 in the for loop is activated
  console.log(arr);//output array to console
}
//submitBtn.onclick = getVals;

var lis = document.getElementsByTagName('li');
for(var i=0; i< lis.length; i++){
  lis[i].addEventListener('click', function (e){ //different way of attacking a click event
    console.log(this.textContent);//textContent gives the value of this element. it works with below two statements too
    console.log(e);
    console.log(e.currentTarget);//if the listener was set on ul, the currentTarget would result ul and target will result li
  }); //addEventListener need 2 arguments.. what event we are looking for, what needs to happen when the event is caught
}

//logName('pratima');
/*function logName(name){
  console.log(name);
}*/

//foo('pratima');//hoisting
//console.log(foo);

/*
var foo = function(name){//anonymous function declaration
  console.log(name);
}('pratima');//after every variable we create we add a ;
*/
/*
var bar = function(){
  console.log(arguments);
}('pratima', 13, ['green', 'day', 3]);
*/

var btn = document.getElementById('btn');
function appendElement(e){
  var inputEl = document.createElement('input');//creates new element
  inputEl.id = 'newId';
  inputEl.type = 'email';
  inputEl.name = 'newName';
  inputEl.placeholder = 'example@email.com';

  form.appendChild(inputEl);
}

btn.onclick = appendElement;
