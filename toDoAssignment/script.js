( function (){
  var todo =[],
    item = prompt('Enter your first todo item');

  if( isValid(item, true) ){
    addToDo(item);
    checkIfMore();
  }

  function isValid(item, mainCall){
    if(item !== null){
      if( !parseInt(item) && item.trim() !== '' ){
        return true;
      }else{
        alert('Invalid input');
        if(mainCall){
          return false;
        }
        else{
          craftMsg();
        }
      }
    }else{
      alert('Invalid input');
      if(mainCall){
        return false;
      }
      else{
        craftMsg();
      }
    }
  }

  function addToDo(item){
      todo.push(item);
  }

  function checkIfMore(){
    for(var moreTodo = true; moreTodo;){
      if( confirm('Want to add more?') ){
        askMore();
      }else{
        moreTodo = false;
        craftMsg();
        return false;
      }
    }
  }

  function askMore(){
    var item = prompt('Enter another todo item');

    if( isValid(item, false) ){
      addToDo(item);
      // return;
    }
  }

  function craftMsg(){
    var msg = '';
    for(var i = 0; i < todo.length; i++){
        msg += '    - ' + todo[i].trim() + '\n';
    }
    alert('My list of items to purchase: \n' + msg);
  }

}() );
