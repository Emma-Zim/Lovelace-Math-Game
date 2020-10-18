function generateBoard(context, width, height){
  context.fillStyle = "black";
  var numBlocks = 20;
  var blockWidth = width/numBlocks - 20;
  var blockHeight = height/numBlocks - 15;

  var xText = 280;
  var yText = 80;
  for(var i = 0;  i < numBlocks; i++){
    context.font = "14px Arial";
    context.fillText(i+1, xText, 50);
    context.fillText(i+1, 250, yText);
    xText += blockWidth + 5;
    yText += blockHeight + 5;
  }

  // draw the blocks
  var x = 270;
  var y = 60;
  context.beginPath();
  for(var i = 0; i < numBlocks; i++){
    for(var j = 0; j < numBlocks; j++){
      context.rect(x, y, blockWidth, blockHeight);
      context.fillStyle = "gray";
      context.fill();
      x += blockWidth + 5;
    }
    y += blockHeight + 5;
    x = 270;
  }
  context.stroke();
}
