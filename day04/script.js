/*
function hello(){
  var msg = 'hello';
  world(msg);
}

function world(message){
  alert( message + ' world' );
}

hello();
*/

function getUserName(){
  var userName = prompt('what is your username?');
  userName = checkUserName(userName);
}

function craftMsg(name){
  var msg = 'Welcome ';
  msg += formatUserName(name);
  msg += ' to my site';

  alertUser(msg);
}

function formatUserName(name){
  name = name.toLowerCase();
  name = name.charAt(0).toUpperCase() + name.substring(1, name.length);
  return name;
}

function alertUser(user){
  alert(user);
}

getUserName();

function checkUserName(user){
  var preparsed = user;
  user = parseInt(user);

  if(!isNaN(user) || preparsed === '' || preparsed === null){//user entered a number
    alert('thats not a proper username');
    return '';
  }
    preparsed = preparsed.trim();
    if(preparsed == ''){
      alert('thats not a proper username');
      return '';
    }
    craftMsg(preparsed);
}

//checkUserName();
