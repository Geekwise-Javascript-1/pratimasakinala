// function to calculate square of a number
function squareNum(number){
  if(isNaN(number) || number == '' || number == null){
    return NaN;
  }else{
    console.log('entered else');
    number = Math.pow(number, 2);
    alert(number);
  }
}

//var num = prompt('enter a number');
//squareNum(num);


// function to capitalize first letter and add a period to the end
function capitalize(string){
  if(!isNaN(string) || string == '' || string == null){
    return '';
  }else{
    var newString = string.charAt(0).toUpperCase()
                    + string.substring(1, string.length).toLowerCase();
    if(string.charAt(string.length - 1) !== '.'){
      newString += '.';
    }
    return newString;
  }
}

//var str = prompt('enter a string');
//console.log(capitalize(str));


//function to flip the position of first and second half of a string
function flipString(string){
  string = string.trim();
  console.log(string);
    if(!isNaN(string) || string == '' || string == null){
      return '';
    }else if(string.length<2){//string length is less than 2
      return '';
    }else if(string.length%2 !== 0){//odd number of characters
      string = string.substring((string.length/2) + 0.5, string.length)
              + string.charAt((string.length/2) - 0.5)
              + string.substring(0, (string.length/2) - 0.5);
      return string;
    }else{//even number of characters
      string = string.substring(string.length/2, string.length)
              + string.substring(0, string.length/2);
      return string;
    }
}

//console.log(flipString(str));


//function to calculate average of 4 numbers
function calcAverage(arr){
    if(Array.isArray(arr)){
      var avg = 0;
      for(var i=0; i<arr.length; i++){
        if(isNaN(arr[i])){
          return NaN;
        }else{
          avg = avg + arr[i];
        }
      }
      avg = avg / arr.length;
      return avg;
    }else{
      return NaN;
    }
}

//console.log(calcAverage([1, 2, 3, 4, 5]));
