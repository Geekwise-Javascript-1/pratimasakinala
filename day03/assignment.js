// capitalize all words entered by user

// get user input and pass it to another function
function getUserResp(){
  var name = prompt('Please enter your name');
  return capitalize(name);
}

/*
 function to capitalize first letter.
 check if user has entered anything or not.
 if not entered, ask again untill entered or cancelled.
 if entered, check if user entered string or number.
 if input is a number, print it as it is in console.
 if input is a string, check for the number of words entered.
 if only single word is entered, capitalize the first letter of the word.
 if multiple words are entered, capitalize the first letter of all the words.
*/
function capitalize(text){
  if(text === '' || text === null){ // check if user entered anything or not
    getUserResp();
  }else{
    var name1 = '';
    text = text.trim();
    if(text === ''){
      getUserResp();
    }else{
      if(text.includes(' ')){// check if multiple words
        var nameArr = text.split( ' ' );
        for(var j = 0 ; j< nameArr.length; j++){//loop to capitalize first letter for each word

          if(isNaN(nameArr[j])){//check if the user input is a string
            name1 = name1 + nameArr[j].charAt(0).toUpperCase() + nameArr[j].substring(1, nameArr[j].length).toLowerCase() + ' ';
          }else{//if number

            if(nameArr[j] === ''){// to clear all unwanted spaces between words
              name1 = name1;
            }else{
              name1 = name1 + nameArr[j] + ' ';
            }
          }
        }
      }else{//if only one word entered
        if(isNaN(text)){//check if string
          name1 = text.charAt(0).toUpperCase() + text.substring(1, (text.length)).toLowerCase();
        }else{//if number
            name1 = text;
        }
      }
      return(name1);
    }
  }
}

console.log(getUserResp());
