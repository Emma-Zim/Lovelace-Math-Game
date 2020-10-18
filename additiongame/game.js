var rollAllowed;
var total;
var roll;
var incorrectGuesses;
var SCORE = "Your Score: ";
var ADASCORE = "Ada's Score: ";
var ADADESCR = "Ada rolled a ";
var ADANOTGUESSING = "Ada will not longer be rolling.";
var adaGuessing;
var adaTotal;
var userGuessing;

$(function(){
  //Upon hitting the start game button, the first elements are hidden and game elements are shown
  $("#start-screen button").click(resetGame);

  //when you click the roll button it rolls the die and updates your addition problem
  $("#roll-button").click(rollDice);

  //when you click the add button it calls the checkGuess function
  $("#addition-button").click(checkGuess);

  $("#reset-button").click(resetGame);

  $("#end-button").click(function(){
    $("#start-screen").show();
    $("#game-screen").hide();
    $("#end-screen").hide();
  });

  $("#stop-button").click(stopRolling);
});

//reset all values for the game to start again
function resetGame(){
  $("#start-screen").hide();
  $("#game-screen").show();
  $("#end-screen").hide();
  $("#ada-screen").show();
  $("#guess").val("");
  $("#addition-sentence").text("");
  $("#user-score").text("Your Score: 0");
  $("#ada-score").text(ADASCORE + "0");
  $("#add-description").text("");
  incorrectGuesses = 0;
  total = 0;
  adaTotal = 0;
  rollAllowed = 1;
  adaGuessing = 1;
  userGuessing = 1;
}

//Handle the event click of the roll button and update on screen elements
function rollDice(){
  if(rollAllowed){
    //get the roll number
    roll = getRandomInt(6);
    rollAllowed = 0;

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
      rollAllowed = 1;
      total = userTotal
      var sentence = $("#addition-sentence").text();
      $("#addition-sentence").text(sentence + total);
      $("#announcements").text("You guessed correctly! Roll the dice if you want to add more to your total");
      $("#user-score").text(SCORE + total);
      if(total > 21){
        endGame("wentover")
      }
      adaDoesRoll();
      checkWin();
    }else{
      $("#announcements").text("You guessed incorrectly! Try again.");
      incorrectGuesses++;
      if(incorrectGuesses == 3){
        endGame("guesses");
      }
    }
  }else{
    $("#announcements").text("Roll the dice before you guess again.");
  }
}

function endGame(typeOfLoss){
  $("#game-screen").hide();
  $("#end-screen").show();
  $("#ada-screen").hide();
  switch(typeOfLoss) {
    case "guesses":
      $("#end-title").text("You Lost");
      $("#end-description").text("You added your numbers incorrectly too many times");
      break;

    case "adawin":
      $("#end-title").text("You Lost");
      $("#end-description").text("Ada had a higher number than you when you both stopped.");
      break;

//ada's total goes over 21
    case "adaloss":
      $("#end-title").text("You Won");
      $("#end-description").text("Congratulations! Ada went over 21.");
      break;

//need this
    case "greaterthan":
      $("#end-title").text("You Won");
      $("#end-description").text("Congratulations! You had a higher number than Ada when you both stopped.");
      break;

//the user's total goes over 21
    case "wentover":
      $("#end-title").text("You Lost");
      $("#end-description").text("You went over 21");
      break;

//need this
    case "draw":
      $("#end-title").text("It's a draw!");
      $("#end-description").text("You and Ada both stopped on the same number.");
      break;
  }
}

//make the ai, ada, roll and add to their total
function adaDoesRoll(){
  var adaRoll = 0;
  if(Boolean(adaGuessing)){
    if(adaTotal >= 21){
      adaGuessing = 0;
    }else if(adaTotal == 20){
      if(getRandomInt(6) <= 1){
        adaRoll = getRandomInt(6);
      }else{
        adaGuessing = 0;
      }
    }else if(adaTotal == 19){
      if(getRandomInt(6) <= 2){
        adaRoll = getRandomInt(6);
      }else{
        adaGuessing = 0;
      }
    }else if(adaTotal == 18){
      if(getRandomInt(6) <= 3){
        adaRoll = getRandomInt(6);
      }else{
        adaGuessing = 0;
      }
    }else if(adaTotal == 17){
      if(getRandomInt(6) <= 4){
        adaRoll = getRandomInt(6);
      }else{
        adaGuessing = 0;
      }
    }else if(adaTotal == 16){
      if(getRandomInt(6) <= 5){
        adaRoll = getRandomInt(6);
      }else{
        adaGuessing = 0;
      }
    }else{
      adaRoll = getRandomInt(6);
    }
    adaTotal+= Number(adaRoll);
    $("#ada-score").text(ADASCORE + adaTotal);
    if(adaRoll != 0){
      $("#ada-description").text(ADADESCR + adaRoll);
    }else{
      $("#ada-description").text(ADANOTGUESSING);
    }
  }else{
    $("#ada-description").text("Ada did not roll.");
  }
}

function stopRolling(){
  $("#announcments").text("You have stopped rolling.");
  userGuessing = 0;
  while(Boolean(adaGuessing)){
    adaDoesRoll();
    checkWin();
  }
  checkWin();
}

function checkWin(){
  console.log("checked");
  if(total > 21){
    console.log("wentover");
    endGame("wentover");
  }
  if(adaTotal > 21){
    console.log("adaloss");
    endGame("adaloss");
  }
  if((Boolean(userGuessing) == false) && (Boolean(adaGuessing) == false)){
    console.log("0s");
    if(Number(total) > Number(adaTotal)){
      console.log(greaterthan);
      endGame("greaterthan");
    }else if(Number(total) < Number(adaTotal)){
      console.log("adawin");
      endGame("adawin")
    }else{
      console.log("draw");
      endGame("draw");
    }
  }
}


















//this is so my code is near the top of my screen
