var loginEl = document.getElementById('login'),
  todoEl = document.getElementById('myDiv'),
  user = '',
  _editIndex = null,
  isRemove = false;
todoEl.style.visibility = 'hidden';

checkUser();

// check if user is saved in localStorage
function checkUser(){
  if (localStorage.getItem('username') && localStorage.getItem('password')) user = localStorage.getItem('username');
  var submitBtn = createLoginForm(),
    form = document.querySelector('form');

  if (user) {
    alert('Welcome back ' + localStorage.getItem('username')+'. Please enter your password to continue');
    submitBtn.addEventListener('click', function(e){
      e.preventDefault();

      //if user entered password matches the password in localStorage
      if (MD5(form.elements.pass.value) === localStorage.getItem('password')) checkNewItem();
      else alert('Please check your password');
    });
  } else {
    alert('Please enter a username and password to proceed');
    submitBtn.addEventListener('click', function(e){
      e.preventDefault();

      localStorage.setItem('username', form.elements.user.value);
      localStorage.setItem('password', MD5(form.elements.pass.value));

      checkNewItem();
    });
  }
}

// function to create a login form
function createLoginForm(){
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

  var submitBtn = document.querySelector('input[type="submit"]');

  return submitBtn;
}

// function to check if todo list exists in localStorage
function checkNewItem(){
  // below 3 lines are to hide login form and display todo form if valid login
  loginEl.style.visibility='hidden';
  loginEl.style.display='none';
  todoEl.style.visibility = 'visible';

  var items = checkToDoStorage();
  if (items !== null && items !== 'undefined' && items.length)
    for (var j = 0; j < items.length; j++) createNewListItem(items[j]);
}

// function to check localStorage for todo
function checkToDoStorage() {
  var items = localStorage.getItem('todo');
  if (items !== null && items !== 'undefined') items = JSON.parse(localStorage.getItem('todo'));
  else items = [];

  return items;
}

/* function to create li under ul */
function createNewListItem(item){
  var ul = document.getElementById('ul'),
      li = document.createElement('li'),
      a = document.createElement('a'),
      key = ul.getElementsByTagName('li').length;

  li.id = 'i' + key;
  li.setAttribute('onclick', 'getEditPanel(this, '+ key +')');

  a.innerHTML = item;
  a.setAttribute('href', 'javascript:;');

  li.appendChild(a);

  addDeleteBtn(li, key);
  ul.appendChild(li);
  addDeleteAllBtn();
}

// function to update content of li when clicked on it
function getEditPanel(el, index){
  if(isRemove) return;

  _editIndex = index;
  document.getElementById('myInput').value = el.getElementsByTagName('a')[0].innerHTML;
  document.getElementById('btnMain').innerHTML = 'Update';
}

// function to create close button for each li
function addDeleteBtn(li, key){
  var closeBtn = document.createElement('input');
  closeBtn.value = '\u00d7';
  closeBtn.type = 'button';
  closeBtn.id = 'closeBtn';
  closeBtn.className = 'close';
  closeBtn.setAttribute("onclick", "removeListHandler(this, " + key + ")");
  li.appendChild(closeBtn);
}

// function to remove li when clicked on close button
function removeListHandler(el, key){
  _editIndex = null;
  isRemove = true;

  // reset isRemove variable to false
  setTimeout(function () {
    isRemove = false
  }, 1000);

  document.getElementById('myInput').value = '';
  document.getElementById('divInputPanel').style.display = 'block';
  document.getElementById('btnMain').innerHTML = 'Add';

  var li = document.getElementById('ul').getElementsByTagName('li'),
    index = -1;
  for (var i = li.length - 1; i >= 0; i--) {
    if (li[i].id == 'i' + key) index = i;
    li[i].remove();
  }

  if (index != -1) {
    removeLocalStorage(index);
    el.parentNode.remove();
  }
  restoreItems();
}

// function to remove todo entry from localStorage
function removeLocalStorage(index){
  var items = checkToDoStorage();

  if (index == null || index == undefined) localStorage.setItem('todo', JSON.stringify(items));
  if (items.length == 0) localStorage.removeItem('todo');
  else {
    items.splice(index, 1);
    localStorage.setItem('todo', JSON.stringify(items));
  }
}

// function to display updated li
function restoreItems(){
  var items = checkToDoStorage();
  if (items.length <= 2) {
    var element = document.getElementById('removeAllBtn');
    if (element) element.parentNode.removeChild(element);
  }
  for (var i = 0; i < items.length; i++) createNewListItem(items[i]);
}

// function to add remove all button
function addDeleteAllBtn(){
  var items = checkToDoStorage();
  if (items.length >= 2 && !document.getElementById('removeAllBtn')) {
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
  } else return;
}

// function to check input; whether it is add or update
function addNewItem(){
  var inp = document.getElementById('myInput');

  if (inp.value == '') {
    alert('You have not entered anything!');
    return;
  }
  if (_editIndex !== null) {//handle update
    document.getElementById('i'+ _editIndex).getElementsByTagName('a')[0].innerHTML = inp.value;
    setToDoStorage(inp.value, _editIndex);
    _editIndex = null;
  } else {
    setToDoStorage(inp.value, null);
    addDeleteAllBtn();
    createNewListItem(inp.value);
  }
  document.getElementById('btnMain').innerHTML = 'Add';
  inp.value = '';
}

// funtion to set todo in localStorage
function setToDoStorage(item, index){
  var items = checkToDoStorage();

  // if its an update
  if (index !== null && index !== 'undefined') items[index] = item;
  else items.push(item);

  localStorage.setItem('todo', JSON.stringify(items));
}

/* function to handle enter key to input value */
function handleEnterKey(e){
  if (e.keyCode == 13) addNewItem();
}
