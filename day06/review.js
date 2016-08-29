// review of scope lesson from DocDeck

var input1 = document.getElementById('input1');
var input2 = document.getElementById('input2');
var input3 = document.getElementById('input3');
var input4 = document.getElementById('input4');
var input5 = document.getElementById('input5');
var btn = document.getElementById('btn');

function btnClick(){
    var arr = [];

    arr.push(input1.value);
    arr.push(input2.value);
    arr.push(input3.value);
    arr.push(input4.value);
    arr.push(input5.value);

    console.log(arr);
    if(isArrayUnique(arr)){
        console.log('array is unique');
    }else{
      console.log('array has duplicates');
    }
}

function isArrayUnique(arr){
  isUnique = true;
  for(var i=0; i<arr.length; i++){
    for(var j=0; j<arr.length; j++){
      if(i!=j){
        if(arr[i]==arr[j]){
          isUnique = false;
        }
      }
    }
  }
  return isUnique;
}

btn.onclick = btnClick;
