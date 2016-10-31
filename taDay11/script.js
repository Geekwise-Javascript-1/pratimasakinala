if(!localStorage.getItem('username') && !localStorage.getItem('lastname')){
		var name = prompt('Enter your name');
    var lname = prompt('Enter your last name');
		var password = prompt('Enter you password');
		setLoginStorage();
}else{
  alert('Welcome back ' + localStorage.getItem('username'));
}

function setLoginStorage(){
	localStorage.setItem('username', name);
  localStorage.setItem('lastname', lname);
	sessionStorage.setItem('password', password);
}
