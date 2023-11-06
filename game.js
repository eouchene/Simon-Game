//SIMON GAME


//creating an array with colors, and empty arrays for gamePattern and userClickedPattern
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];



//adding click event on button
$(".btn").click(function(){
var userChosenColour = $(this).attr("id"); //getting an id attribute on clicked button
userClickedPattern.push(userChosenColour); //pushing the id name into userChosenColour array
console.log(userClickedPattern);
playSound(userChosenColour); //playing the matching sound
animatePress(userChosenColour);
checkAnswer(userClickedPattern.length-1);
});



//starting a game
var level = 0;
var started = false;

//enterom pokrecemo randomizaciju, animaciju i audio zvuk, te inkrementujemo level igrice sa 0 na 1
$(document).keypress(function(event){
  if (event.key == "Enter"){  
    //samo prvi enter keypress ce pokrenuti nextSequence funkciju
    if (started == false){
        started = true;
        nextSequence(); 
        $("#level-title").text('Level ' + level);
    }
  }
})




//random pattern
function nextSequence () {

var randomNumber = Math.round(Math.random()*3); //round the result on whole numbers between 0 and 3 (matching the index numbers of array)
var randomChosenColour = buttonColors[randomNumber]; //creating a variable which value will be color from buttonColors array on random index
gamePattern.push(randomChosenColour); //pushing the randomChosenColor in the gamePattern array
console.log(gamePattern)

//adding an animation on random button
$("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

//calling a playSound function on random button
playSound(randomChosenColour);

//setting and increasing the game level
level +=1;
$("#level-title").text('Level ' + level);

userClickedPattern=[]; //clean the array nakon sto se predje na naredni level
$("h2").text("");
}


//function which start playing the matching sound, input is the color name
function playSound (name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}




//adding the animation on pressed button
function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed");

//removing the animation after 1 sec
  setTimeout (function(){
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}



     
    function checkAnswer (currentLevel){  

      if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { //check the array length
      if (userClickedPattern.length ===  gamePattern.length){ //check the array value
       console.log("succes")
       setTimeout(function(){
         nextSequence()
       }, 1000)
      }}
      else {
      console.log("not")
    
   
    //audio for wrong click
    var wrongClick = new Audio("sounds/wrong.mp3");
    wrongClick.play();

    //animation for wrong click
    $("body").addClass ("game-over");
    setTimeout (function(){
    $("body").removeClass ("game-over");
    }, 200)

    //changing the title if answer is wrong
    $("h1").text("Game Over");
    $("h2").text("Press enter to restart the game");
    $("h2").attr("id", "restart-game");


    //calling the startOverfunction
    startOver();
    
  }
  }



  //druga opcija provjere 

  // function checkAnswer(currentLevel) {
  //   for (var i = 0; i <= currentLevel; i++) {
  //     if (gamePattern[i] !== userClickedPattern[i]) {
  //       playSound("wrong");
  //       $("body").addClass("game-over");
  //       setTimeout(function() {
  //         $("body").removeClass("game-over");
  //       }, 200);
  //       $("h1").text("Game Over");
  //       $("h2").text("Press Enter to Restart");
  //       $("h2").attr("id", "restart-game");
  //       startOver();
  //       return; // Izlaz iz funkcije ako se pronađe razlika
  //     }
  //   }
  
  //   if (userClickedPattern.length === gamePattern.length) {
  //     setTimeout(function() {
  //       nextSequence();
  //     }, 1000);
  //   }
  // }


  
  //reset the values
  function startOver () {
    level = 0;
    gamePattern = [];
    started = false;
  }





