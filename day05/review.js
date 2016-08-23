function getUserResp(){
  var userResp = prompt('What is your username?');
  //console.log(checkUserResp(userResp));
  splitWords(userResp);
}

function splitWords(string){
  string = string.split(' ');
  userArr = [];
  for(var i=0; i<string.length; i++){
    if(checkUserResp(string[i])){
      userArr.push(formatUserResp(checkUserResp(string[i])));
    }
  }
  if(userArr.length>0){
    outputUser(userArr);
  }else{
    alert('You didnt enter a valid username.');
    getUserResp();
  }
}

function checkUserResp(data){
  var canParse = parseInt(data);

  if(!(!isNaN(canParse) || data === null || data === '')){
    return formatUserResp(data.trim());
  }else{
    return ;
  }
}

function formatUserResp(user){
  return user.charAt(0).toUpperCase() + user.substring(1,user.length).toLowerCase();
}

function outputUser(user){
  var msg = '';
  msg += 'Welcome ';
  for(var i=0; i<user.length; i++){
    if(user[i] !== '')
      msg += user[i] + ' ';
  }
  msg += 'to my new site';
  alert(msg);
}

getUserResp();
