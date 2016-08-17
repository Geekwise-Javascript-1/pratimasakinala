var str = 'Pratima';

/*     String objects
console.log(str.length());
console.log(str.charAt(4));
console.log(str.trim()); //removes the spaces, if any, before and after the string
console.log(str);
*/

/*     Math objects
var randNum = Math.random(); //gives a 15 digit random number between 0 and 1
var randNum = Math.round(Math.random());
var randNum = Math.floor(Math.random() * 10) + 1; // .floor() rounds the value down
console.log(randNum);
*/


/*     Date objects
var toDay = new Date;

console.log(toDay.getDate());
console.log(toDay.getFullYear());

var locale = 'en-us'; //converts month number to month name
console.log(toDay.toLocaleString( locale, {month:'long'}) + '-' + toDay.getDate() + '-' + toDay.getFullYear());
*/

//var name = 'Pratima Sakinala';
var locale = 'en-us';

var firstName = prompt('whats your first name?');
var lastName = prompt('whats your last name?');
var favColor = prompt('whats your color?');
var userDate = prompt('enter your birthday as "October 2 1997" format')

function setBirthday(first, last, color, date){ //parameteres
  var toDay = new Date; //('06/13/1990') is the easy way of assigning date

  toDay.setFullYear(1990);
  toDay.setMonth(6); // 0 based. so if actual month is 7th you put 6
  toDay.setDate(13);

  var fullMonth = toDay.toLocaleString(locale , {month : 'long'})

  /*console.log(firstName
              + ' '
              + lastName
              + '.'
              + fullMonth
              + ' '
              + toDay.getDate()
              + ','
              +toDay.getFullYear()
              + '. And my color is '
              + color);
  */

  var arr = date.split(' ');
  console.log(arr);

  console.log(firstName
              + ' '
              + lastName
              + '. Born on '
              + arr[0] + ' ' + arr[1] + ' ' + arr[2]
              + '. Favorite color: '
              + color);
}

setBirthday(firstName, lastName, favColor, userDate); //arguments
//anything after return is ignored
