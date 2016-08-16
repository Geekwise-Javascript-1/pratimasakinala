function capitalize(){
  var name = prompt('Please enter your name');

  if(name > ' '){
    var nameArr = name.split( ' ' );
    //var i = nameArr[].length();
    var j = 0;
    var name1 = '';

    for(j ; j< nameArr.length; j++){
      name1 = name1 + nameArr[j].charAt(0).toUpperCase() + nameArr[j].substring(1, nameArr[j].length) + ' ';
    }
    return(name1);
  }else{
    capitalize();
  }
}

console.log(capitalize());
