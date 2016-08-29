var btn = document.getElementById('btn');
var input1 = document.getElementById('input1');
var input2 = document.getElementById('input2');
var box = document.getElementById('box');

function btnClick(){
  input1.value = 'Hello javascript!';
  alert(input1.value);
  box.innerHTML = input2.value;// box.textContent = input2.value
}

btn.onclick = btnClick; //no paranthesis means the function doesnt get called untill button is clicked

//input1 replaced with text 'Hello javascript!'
//alert new value to input1
//replace div text with value of input2
