var loginEl = document.getElementById('login');
var todoEl = document.getElementById('myDiv');
todoEl.style.visibility = 'hidden';


//beginning of Login check
if(!localStorage.getItem('username') && !localStorage.getItem('password')){
  createLoginForm(false);
  alert('Please enter a username and password to proceed');

  var form = document.querySelector('form'),
      submitBtn = document.querySelector('input[type="submit"]');

  submitBtn.addEventListener('click', setLoginStorage);
}else if(localStorage.getItem('username') && localStorage.getItem('password')){
  createLoginForm(true);
  alert('Welcome back ' + localStorage.getItem('username')+'. Please enter your password to continue');

  var form = document.querySelector('form'),
      submitBtn = document.querySelector('input[type="submit"]');
  submitBtn.addEventListener('click', checkLoginStorage);
}

/* function to create a login form */
function createLoginForm(repeat){//parameter 'repeat' refers to check if the user is a repeat login
  var user = '';
  if(repeat){
    user=localStorage.getItem('username');
  }

  var loginForm = '<form id="loginForm">'+
                  '<h2 id="welcome">'+
                    '<span class="wr">W</span><span class="wo">e</span><span class="wy">l</span><span class="wg">c</span><span class="wb">o</span><span class="wi">m</span><span class="wv">e</span><span>&nbsp;</span><span class="wr1">t</span><span class="wo1">o</span><span>&nbsp;</span><span class="wy1">T</span><span class="wg1">o</span><span class="wb1">D</span><span class="wi1">o</span><span class="wv1">!</span>'+
                  '</h2>'+
                  '<label for="user">Username:'+
                    '<input type="text" id="user" value="'+user+'">'+
                  '</label>'+
                  '<label for="pass">Password:'+
                    '<input type="password" id="pass" value="">'+
                  '</label>'+
                  '<input type="submit" value="Login">'+
                  '</form>';
  loginEl.innerHTML = loginForm;
  return;
}

/* function to set login information in localStorage */
function setLoginStorage(e){
  console.log('entered setLoginStorage');
  e.preventDefault();

  localStorage.setItem('username', form.elements.user.value);
  localStorage.setItem('password', MD5(form.elements.pass.value));
  checkNewItem();
}

/* function to check localStorage for login information */
function checkLoginStorage(e){
  console.log('entered checkLoginStorage');
  e.preventDefault();

  if(MD5(form.elements.pass.value) === localStorage.getItem('password')){//if user entered password matches the password in localStorage
    /*
    below 3 lines are to hide login form
    and display todo form if valid login
    */
    loginEl.style.visibility='hidden';
    loginEl.style.display='none';
    todoEl.style.visibility = 'visible';

    checkNewItem();
  }else{//if user entered password doesn't match the password in localStorage
    alert('Please check your password');
  }
}

/* function to check if todo list exists in localStorage*/
function checkNewItem(){
  console.log('entered checkNewItem');
  var items = checkToDoStorage();
  if(items == null || items == undefined || items.length==0){
    console.log('no todo in storage');
    loginEl.style.visibility='hidden';
    loginEl.style.display='none';
    todoEl.style.visibility = 'visible';
  }else{
    console.log('todo exists in storage');
    console.log(items);
    var i = items.length;
    for(var j=0; j<i; j++){
      createNewListItem(items[j]);
    }
  }
}
//end of Login check


//beginning of todo app
var _editIndex = null,
    isRemove = false;

/* function to check input; whether it is add or update */
function addNewItem(){
  console.log('entered addNewItem');
  var inp = document.getElementById('myInput');

  if(inp.value == ''){
    alert('You have not entered anything!');
    return;
  }
  if(_editIndex !=null){//handle update
    setToDoStorage(inp.value, _editIndex);
    document.getElementById('i'+ _editIndex).getElementsByTagName('a')[0].innerHTML = inp.value;
    _editIndex = null;
  }
  else{
    setToDoStorage(inp.value);
    removeAllList();
    createNewListItem(inp.value);
  }
  document.getElementById('btnMain').innerHTML = 'Add';
  inp.value = '';
}

/* funtion to set todo in localStorage */
function setToDoStorage(item, index){
  console.log('entered setToDoStorage');
  var items = checkToDoStorage();
  console.log(items);

  if(index == null || index == undefined)
    items.push(item);
  else//for update
    items[index] = item;

  localStorage.setItem('todo', JSON.stringify(items));
}

/* function to check localStorage for todo */
function checkToDoStorage(){
  console.log('entered checkToDoStorage');

  var items = localStorage.getItem('todo');
  console.log(items);
  if(items == null || items == undefined){
    console.log('no todo in storage');
    items = [];
  }
  else{
    console.log('todo exists in storage');
    items = JSON.parse(localStorage.getItem('todo'));
  }
  console.log(items);
  return items;
}

/* function to create li under ul */
function createNewListItem(item){
  console.log('entered createNewListItem');
  var ul = document.getElementById('ul'),
      li = document.createElement('li');

  var key = ul.getElementsByTagName('li').length;
  console.log(key);
  li.id = 'i' + key;
  li.setAttribute('onclick', 'getEditPanel(this, '+ key +')');

  var a = document.createElement('a');
  a.innerHTML = item;
  a.setAttribute('href', 'javascript:;');

  li.appendChild(a);

  removeListElementBtn(li, key);
  ul.appendChild(li);
}

/* function to update content of li when clicked on it */
function getEditPanel(el, index){
  console.log('user clicked on li to update');
  if(isRemove)
    return;

  _editIndex = index;
  var inp = document.getElementById('myInput');
  inp.value = el.getElementsByTagName('a')[0].innerHTML;
  document.getElementById('btnMain').innerHTML = 'Update';
}

/* function to create close button for each li */
function removeListElementBtn(li, key){
  console.log('create close btn');
  var closeBtn = document.createElement('input');
      closeBtn.value = '\u00d7';
      closeBtn.type = 'button';
      closeBtn.id = 'closeBtn';
      closeBtn.className = 'close';
      closeBtn.setAttribute("onclick", "removeListHandler(this, " + key + ")");
      li.appendChild(closeBtn);
}

/*function to add remove all button*/
function removeAllList(){
  console.log('entered removeAllList');
  var items = checkToDoStorage();
  if(items.length>=2){
    var removeAllBtn = document.createElement('input');
        removeAllBtn.value = 'Delete all';
        removeAllBtn.type = 'button';
        removeAllBtn.id = 'removeAllBtn';
        removeAllBtn.className = 'removeAllBtn';
        removeAllBtn.setAttribute('onclick', function(e){
          e.preventDefault();
          localStorage.removeItem('todo');
        });
    document.getElementById('todo').appendChild(removeAllBtn);
  }else {
    return;
  }
}

/* function to remove li when clicked on close button */
function removeListHandler(el,key){
  console.log('remove list handler');

  _editIndex = null;
  isRemove = true;
  /*setTimeout(function(){
    isRemove = false
  }, 700);
*/
  var inp = document.getElementById('myInput');
  inp.value = '';
  document.getElementById('divInputPanel').style.display = 'block';
  document.getElementById('btnMain').innerHTML = 'Add';

  var li = document.getElementById('ul').getElementsByTagName('li');
  var index = -1;
  for(var i = li.length -1; i>=0; i--){
    if(li[i].id == 'i'+key){
      index = i;
    }
    li[i].remove();
  }
  if(index != -1){
    console.log(index);
    removeLocalStorage(index);
    el.parentNode.remove();
  }
  restoreItems();
}

/* function to remove todo entry from localStorage */
function removeLocalStorage(index){
  console.log('entered removeLocalStorage');
  console.log(index);
  var items = checkToDoStorage();
  console.log(items);

  if(index == null || index == undefined){
    localStorage.setItem('todo', JSON.stringify(items));
  }
  if(items.length == 0)
    localStorage.removeItem('todo');
  else{
    console.log('splicing items');
    items.splice(index, 1);
    console.log(items);
    localStorage.setItem('todo', JSON.stringify(items));
  }
}

/* function to display updated li */
function restoreItems(){
  console.log('entered restoreItems');
  var items = checkToDoStorage();
  for(var i=0; i<items.length; i++){
    createNewListItem(items[i]);
  }
}

/* function to handle enter key to input value */
function handleEnterKey(e){
  if(e.keyCode==13)
    addNewItem();
}
