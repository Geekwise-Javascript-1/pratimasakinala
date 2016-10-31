var form = '<form>'
      + '<div>Hello world</div>'
      + '<label for="firstName">First Name'
      + '<input type="text" class="name" id="firstName" value=""/>'
      + '</label><br>'
      + '<label for="lastName">Last Name'
      + '<input type="text" class="name" id="lastName" value=""/>'
      + '</label><br>'
      + '<label for="email">Email'
      + '<input type="email" id="email" value=""/>'
      + '</label><br>'
      + '<button type="button" value="Submit" onclick=submitBtn()>Add</button>'
      + '</form>';
document.write(form);

var firstName = document.getElementById('firstName');
var lastName = document.getElementById('lastName');
var email = document.getElementById('email');

var btn = document.querySelector('button[type="button"]');
var inputs = document.querySelectorAll('input');

var div = document.getElementsByTagName('div');

function submitBtn(e){
  console.log(e);
    console.log(inputs);
}
