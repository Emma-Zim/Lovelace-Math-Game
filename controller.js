function generateSolutions(numSolutions, context) {
  var firstArray = new Array(numSolutions);
  var secondArray = new Array(numSolutions);

  // put the numbers into the arrays
  for(var i = 0; i < numSolutions; i++){
    firstArray[i] = new Array(2);
    secondArray[i] = new Array(2);
    firstArray[i][0] = Math.floor(Math.random() * 10);
    firstArray[i][1] = Math.floor(Math.random() * 10);
    secondArray[i][0] = Math.floor(Math.random() * 10);
    secondArray[i][1] = Math.floor(Math.random() * 10);
  }

  // multiply the arrays and get the solution array
  var solutionArray = new Array(numSolutions)
  for(var i = 0; i < numSolutions; i++){
    solutionArray[i] = new Array(2);
    solutionArray[i][0] = firstArray[i][0] + secondArray[i][0];
    solutionArray[i][1] = firstArray[i][1] + secondArray[i][1]
  }

  // display the two arrays
  var x = 100;
  var y = 100;
  context.font = "120px Arial";
  context.fillText("[", x - 60, y + 70)
  context.fillText("[", x - 60, y + 470)
  for(var i = 0; i < numSolutions; i++){
    context.font = "20px Arial";
    context.fillText(firstArray[i][0], x, y);
    context.fillText(firstArray[i][1], x + 30, y);
    context.font = "32px Arial";
    context.fillText("+", 115, 400)
    context.font = "20px Arial";
    context.fillText(secondArray[i][0], x, y + 400);
    context.fillText(secondArray[i][1], x + 30, y + 400);
    y += 30
    x = 100
  }
  context.font = "120px Arial";
  context.fillText("]", x + 80, y + 70 - 30*numSolutions);
  context.fillText("]", x + 80, y + 470 - 30*numSolutions);

  return {
    sol: solutionArray,
    first: firstArray,
    second: secondArray
  };
}

function checkSolution(solArray, x, y){
  // need to constrain the x to get the block number
  x = Math.ceil((x - 270)/(5 + (1280/20 - 20)));
  //console.log(x);
  y = Math.ceil((y - 60)/(8 + (800/20 - 15)));
  //console.log(y);

  for(var i = 0; i < solArray.length; i++){
    if(x == solArray[i][0] && y == solArray[i][1]){
      // it is correct
      return true;
    }
  }
  return false;
}
