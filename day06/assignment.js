//put submit button back into form
//ensure that each instance is appended BEFORE submit
//modify every dynamic input to be text
//on submit, output to console new array of values

var btn = document.getElementById('btn');
var submitBtn = document.getElementById('submit');
var form = document.getElementsByTagName('form')[0];

var i=0;

function appendElement(){
  var inputEl = document.createElement('input');
  i++;
  inputEl.name = 'newInput' + i;
  inputEl.type = 'text';
  inputEl.id = 'newId' + i;

  console.log(inputEl.name);
  console.log(inputEl.id);
  console.log(inputEl);

  form.insertBefore(inputEl, submitBtn);
}

btn.onclick = appendElement;

function getVals(e){
  e.preventDefault();
  var arr = [];
  for(var j=0; j <form.elements.length; j++){
    if(j==5 || j==(form.elements.length -1)){
      continue;
    }
    arr.push(form.elements[j].value);
  }
  console.log(arr);
}

submitBtn.onclick = getVals;
