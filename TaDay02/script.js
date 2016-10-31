//i want to have a pop up box appear on my window
alert();
//alert is a function that may or maynot require an argument
//we will get into function and argument later
//so when we write alert(); we get a window with an "Ok" button on top of our page.
//that doesn't help. So lets see if we can have some Text on the window above the button
//i want to have my hero's name pop up on the window
alert(Night Fury);
//undefined
//why do you think that happened?
//because, the error message explains it well, Night Fury is not defined
//javascript is looking to find a valid argument.
//here we have not defined what Night Fury is
//javascript assumes Night Fury to be a variable
//and does a lookup to find a value associated with Night Fury
//so lets see what happens if we put Night Fury in ""
alert("Night Fury");
//now alert has a string argument
//in other words, we passed a string value, anything inside of "" is a string

//now lets see if we can create a variable and display its value
//lets create and define a value to a variable
/var heroName = "Night Fury";

//lets pop up the name
alert("heroName");
//heroName
//because we passed heroName as a string argument to alert

//lets remove the ""
alert(heroName);

//lets see if we can do a contatenation
alert(heroName + "!");
//concatenation works well will numbers too
//alert(heroName + 5);


//so that was a simple alert window pop up functionality
//now let see if we can have the user visiting our game enter their hero's name
prompt("Who is brave enough to enter the dungeon?");
//now you see a different window box where you can have users enter text
//they can either click on ok or cancel
//we can write up logic for next steps based on what the user clicked on
//every response from prompt comes back as a string

//now lets capture the value of prompt into a variable
var heroName = prompt("Who is brave enough to enter the dungeon?");
alert(heroName);
console.log(heroName);

//now we can have the user confirm what they entered is correct
confirm("Did you say " + heroName + " ?");
//lets console.log the value of confirm
console.log(confirm("Did you say " + heroName + " ?"));
//so we can see that confirm returns a true or false value
