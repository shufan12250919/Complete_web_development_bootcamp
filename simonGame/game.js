//game setting
var buttonColors = ["red", "blue", "green", "yellow"];

//store pattern
var solution = [];
var userClick = [];
var start = false;

//generate next element which will be added into the solution
function nextSequence(){
  var choseColor = Math.floor(Math.random()*4);
  var color = buttonColors[choseColor];
  solution.push(color);
  $("h1").text("level " + solution.length);
  userClick = [];
  animation(color);
}

//generate sounds
function animation(color){
  //$("#" + buttonColors[color]).fadeOut(120).fadeIn(120);
  $("#" + color).addClass("pressed");
  setTimeout(function(){
    $("#" + color).removeClass("pressed");
  }, 100);
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function warning(){
  $("h1").text("Game Over, Press A key to restart!");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
}

//play questions
function startover(){
  solution = [];
  start = false;
}

//check answer
function check(index){
  if(userClick[index] === solution[index]){
    if(index === solution.length - 1){
      setTimeout(function(){
        nextSequence();
      }, 400);
    }
  }else{
    warning();
    startover();
  }
}


//detect button click
$(".btn").click(function(){
    var color = $(this).attr("id");
    userClick.push(color);
    console.log(solution);
    console.log(userClick);
    console.log(userClick.length - 1);
    if(!start || solution.length < 1){
      warning();
      startover();
    }else{
      animation(color);
      check(userClick.length - 1);
    }
});


$(document).keypress(function(event){
  if(!start){
    nextSequence();
    start = true;
  }
});
