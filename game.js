var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});
$(document).keypress(function(event) {
  if (!started) {
    $("#level-title").text("level " + level);
    newSequence();
    started = true;
  }
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
  $("#" + name).fadeIn(100).fadeOut(100).fadeIn(100);


}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed").delay(100).queue(function(next) {
    $("#" + currentColor).removeClass("pressed");
    next();

  });
};

function newSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("level   " + level);
  //Generating random numbers //
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  //add chosen color to the ^array^//
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);

}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (gamePattern.length === userClickedPattern.length) {

      setTimeout(function() {
        newSequence();
      }, 1000);
    }
  } else {
    $("#level-title").text("Game Over");
    var gameOver = new Audio("sounds/wrong.mp3");
    gameOver.play();
    $("body").addClass("game-over").delay(200).queue(function(next) {
      $("body").removeClass("game-over");
      next();


    });
    $(document).keypress(function(event) {
      if (started) {
        level = 0;
        gamePattern = [];
        $("#level-title").text("level " + level);
        newSequence();
        started = true;
      }
    });
  }


}
