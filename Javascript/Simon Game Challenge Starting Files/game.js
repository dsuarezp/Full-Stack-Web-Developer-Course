var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;

$(document).on("keydown", function (event) {
  // START GAME
  $("h1").text(`Level ${level}`);
  nextSequence();

  // USER CLICK
  $(".btn").on("click", function (event) {
    var btnClicked = event.currentTarget.id;
    userClickedPattern.push(btnClicked);
    animatePress(btnClicked);
    if (userClickedPattern.length === level) {
      checkAnswer(level);
    }
  });
});

function generateRandomNumber() {
  var randomNumber = Math.floor(Math.random() * 4);
  level++;
  $("h1").text(`Level ${level}`);
  return randomNumber;
}

function nextSequence() {
  var randomChosenColour = buttonColours[generateRandomNumber()];
  gamePattern.push(randomChosenColour);
  $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var sound = new Audio(`./sounds/${name}.mp3`);
  sound.play();
}

function animatePress(currentColour) {
  playSound(currentColour);
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(() => {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  var lastGamePattern = gamePattern[currentLevel - 1];
  var lastUserClick = userClickedPattern[currentLevel - 1];

  console.log(gamePattern);
  console.log(userClickedPattern);

  if (lastGamePattern === lastUserClick) {
    console.log("sucess");
    userClickedPattern = [];
    setTimeout(() => {
      nextSequence();
    }, 1000);
  } else {
    console.log("error");
    gamePattern = [];
    userClickedPattern = [];
    level = 0
    $("h1").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 100);
  }
}
