var theForm = document.getElementsByTagName('form')[0],
    submit = document.querySelector('input[type="submit"]'),
    addField = document.getElementsByTagName('button')[0];
var incNum = 1;

addField.addEventListener('click', createField);

function createField(){
  var newLabel = document.createElement('label');
  newLabel.setAttribute('for', 'generic' + incNum);//what attribute, the value
  newLabel.innerHTML = 'Generic Label';

  var newInput = document.createElement('input');
  newInput.id = 'generic' + incNum;
  newInput.name = 'generic';
  newInput.type = 'text';
  newInput.placeholder = 'Generic Input Box';

  addToForm(newLabel, newInput);
}

function addToForm(newLabel, newInput){
  newLabel.appendChild(newInput);
  theForm.insertBefore(newLabel, submit);//what to insert, what element to insert before
}

function getInputVals(e){
  e.preventDefault();
  var inputs = [];

  for(var i=0; i<theForm.elements.length - 1; i++){
    inputs.push(theForm.elements[i].value);
  }
  console.log(inputs);
}

submit.addEventListener('click', getInputVals);
