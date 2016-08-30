var btn = document.querySelector('button');
var link = document.getElementsByTagName('a')[0];

//add and remove listener
/*
btn.addEventListener('click', once);//adds it to the window
function once(){
  console.log('done!');
  btn.removeEventListener('click', once);//which event to remove, when to remove
}
*/


//listen for a mouse down
/*
btn.addEventListener('mousedown', function(e){
  console.log(e);
  if(e.which == 1){
    console.log('left click');
  }else if(e.which == 2){
    console.log('middle click');
  }else if(e.which == 3){
    console.log('right click');
  }
});
*/


//preventing default behavior
/*
link.addEventListener('click', function(e){
  e.preventDefault();
  console.log('clicked on link');
});
*/

/*
addEventListener('keydown', function(e){
  console.log(e);
  if(e.keyCode == 86){
    document.body.style.backgroundColor = 'violet';
  }
});

addEventListener('keyup', function(e){
  if(e.keyCode == 86){
    document.body.style.backgroundColor = '';
  }
});
*/

//console.log('P'.charCodeAt(0));


//listen for mousemove
/*
addEventListener('mousemove', function(e){
  //console.log('x: ' + e.screenX + 'px');
  //console.log('y: ' + e.screenY + 'px');
});
*/


//render dot based on click location
/*
addEventListener('click', function(e){
  var dot = document.createElement('div');//creating new div tag
  dot.className = 'dot';
  dot.style.left = e.pageX + 'px'; // assigning the dot a x position
  dot.style.top = e.pageY + 'px'; // assigning the dot a y position
  document.body.appendChild(dot);
});
*/


//listen for a scroll
/*
var hdr = document.querySelector('header');
addEventListener('scroll', function(e){
  if(e.pageY >= 65){
    hdr.classList.add('fixed');
    document.body.style.paddingTop = '65px';
  }else{
    hdr.classList.remove('fixed');
    document.body.style.paddingTop = '0px';
  }
});
*/


//to detect if the user is on the same page or moving out to another tab in the browser
addEventListener('focus', function(){
  console.log('in focus');
});//catches the event when the tab is open
addEventListener('blur', function(){
  console.log('out of focus');
});//catches the event when the user moved on to another tab in the browser
