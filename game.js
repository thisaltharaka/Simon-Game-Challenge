//alert("Hi");
var gamePattern = [];
var buttonColours =["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var matchStarted = false;
var level = 0;

function nextSequence(){
//var randomNumber =Math.random();
var randomNumber = Math.floor((Math.random())*4);
//console.log(randomNumber);
var randomChosenColour = buttonColours[randomNumber];
//console.log(randomChosenColour);
gamePattern.push(randomChosenColour);
//console.log(gamePattern);
var buttonToAnimate = "."+randomChosenColour;
$(buttonToAnimate).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);

//showing level in H1
  level=level+1;
  var currentLevel = "level " + level;
  $("h1").text(currentLevel);
  userClickedPattern =[];
}

function playSound(name){
  var soundFilePath = "sounds/"+ name + "."+"mp3";

  var soundToPlay = new Audio(soundFilePath);
  	soundToPlay.play();
  }

function handlerFunction(buttonID){

var userChosenColour = buttonID;
userClickedPattern.push(userChosenColour);
playSound(buttonID);
animatePress(buttonID);

checkAnswer(userClickedPattern.length-1);
//console.log(userClickedPattern);
}

function checkAnswer(currentLevel){
if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
  //console.log("success");
  if(userClickedPattern.length==gamePattern.length){
  userClickedPattern=[];

  setTimeout(function(){nextSequence();},500);
}
  }
  else {
    gameOver();
  }

}

function gameOver(){
  setTimeout(function(){
    $("body").toggleClass("game-over");
  },200);

  $("h1").text("Game Over, Press Any Key to Restart");
  $("body").toggleClass("game-over");
  playSound("wrong");
  matchStarted=false;
  level=0;
  gamePattern = [];
  userClickedPattern = [];
  //console.log(gamePattern);

}

function animatePress(currentColor){
  var buttonID = "#"+currentColor;


setTimeout(function(){
  $(buttonID).toggleClass("pressed");
},100);

$(buttonID).toggleClass("pressed");
}

$(".btn").click(function(event){
  if(matchStarted){
    handlerFunction(event.currentTarget.id);
  }
  else{
    gameOver();
  }

//console.log(event.currentTarget.id);
});

$(document).keypress(function(event){

if(!matchStarted){
nextSequence();
matchStarted=true;


}});
