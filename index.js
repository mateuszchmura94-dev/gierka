var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var pressed = false;

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
})

  $(".starter").click(function () {
    if (pressed === false){
      $("#level-title").text("Level " + level);
      nextSequence();
      pressed = true;
    }
  });

    function nextSequence() {
      userClickedPattern = [];
      var randomNumber = Math.round(Math.random() * 3);
      var randomChosenColour = buttonColours[randomNumber];
      gamePattern.push(randomChosenColour);
      $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
      playSound(randomChosenColour);
      level++;
      $("#level-title").text("Level " + level);

    }


function playSound(name) {
  var audio = new Audio("/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Przegrana, Wcisnij Przycisk by Zaczac od Nowa!");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  pressed = false;
}