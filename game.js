var rollAllowed;
var total;
var roll;
var incorrectGuesses;

$(function(){
  //Upon hitting the start game button, the first elements are hidden and game elements are shown
  $("#start-screen button").on("click", function (event) {
    $("#start-screen").hide();
    $("#game-screen").show();
    $("#guess").val("");
    incorrectGuesses = 0;
    total = 0;
    rollAllowed = true;
  });

  //when you click the roll button it rolls the die and updates your addition problem
  $("#roll-button").click(rollDice);

  //when you click the add button it calls the checkGuess function
  $("#addition-button").click(checkGuess);
});

//Handle the event click of the roll button and update on screen elements
function rollDice(){
  if(rollAllowed){
    //get the roll number
    roll = getRandomInt(6);
    rollAllowed = false;

    //update our announcments and send the roll number to the updateMath function
    $("#announcements").text("You rolled a " + roll);
    updateMath(roll);
  }else{
    //tell the player to add the numbers before rolling
    $("#announcements").text("You cannot roll twice in a row. Guess the number that your total and roll equal.")
  }

}

//Generates a random number between 1 and 6
function getRandomInt(max){
  return Math.floor(Math.random() * Math.floor(max)) + 1;
}

//update the math expression that is shown
function updateMath(roll){
  var sentence = total + " + " + roll + " = ";
  $("#addition-sentence").text(sentence);
}

//check if the user guessed correctly
function checkGuess(){
  if(!rollAllowed){
    //get the user total and correct total
    var userTotal = Number($("#guess").val());
    var correctTotal = Number(total) + Number(roll);
    if(userTotal == correctTotal){
      $("#guess").val("");
      rollAllowed = true;
      total = userTotal
      var sentence = $("#addition-sentence").text();
      $("#addition-sentence").text(sentence + total);
      $("#announcements").text("You guessed correctly! Roll the dice if you want to add more to your total");
    }else{
      $("#announcements").text("You guessed incorrectly! Try again.");
      incorrectGuesses++;
      if(incorrectGuesses == 3)[
        loseGame("guesses");
      ]
    }
  }else{
    $("#announcements").text("Roll the dice before you guess again.");
  }
}

loseGame(typeOfLoss){
  switch(typeOfLoss) {
    case "guesses":
//lost to too many guesses
    [break]
    case "adaWon":
//need to figure this out
    [break]
    default:
//what would make this happen?
    [break]
  }
}
























//this is so my code is near the top of my screen
