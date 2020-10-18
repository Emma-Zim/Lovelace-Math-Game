/* 
Developer: Bosena Telila
Team: lovelace  r
date: 10/17/20

This code creates a array of  random numbers/intigers
and places them in each box. If the player clicks on the box with the smalles integer
the array resets and the places finds the smallest number again. The counter keeps going until the places 
chooses a number that is not the smallest.



*/

String Welcome = "Math game by Lovelace";
String how_to_play = "Find the GREATEST number.";

int counter = 0;
int box_xpos = 70;
int box_ypos = 180;

int savedTime;
int totalTime = 5000;

boolean newArray = false;
boolean Start = false;
boolean duplicate = false;
boolean goodArray = false;

int[] arr = new int[16];
//creating array of Boxes using out Box class 
Box[] boxes = new Box[16];

void setup(){
 size(500,600);
 background(0);
 //time
 savedTime = millis();
 
//changes the values of the arr[i] from zero to random values that are not duplicate
 int j = 0, a;
 int n = int(random(32,500));
 while (goodArray != true){
   a = int(random(1,n));
   if(j>=16){
    break;
   }
   
   if(find_duplicate(arr,a) == false && j <= 16){
     arr[j] = a;
     j++;
   }
   
 }
 // creating class boxes and placing the random inegers inside each box
 for(int i = 0; i < boxes.length; i++){
  if(i == 0){
    boxes[i] = new Box(box_xpos, box_ypos);
    boxes[i].n = arr[i];
  }
  else if(boxes[i-1].xpos+100 >= 400) {
    boxes[i] = new Box(boxes[i-4].xpos, boxes[i-1].ypos+90);
    boxes[i].n = arr[i];
  }
  else {
    boxes[i] = new Box(boxes[i-1].xpos+90, boxes[i-1].ypos);
    boxes[i].n = arr[i];
  }
   
 }
}
//when mouse is released at each box it checks if the color is blue or green
// if the color of the box is green then it will continue
// if the color is not green it will change stop the game
void mouseReleased(){
  if(newArray == true){
    for(int i = 0; i < boxes.length; i++){
        if(boxes[i].box_color == color(0,255,0)){
         counter++;
         newArray = false;
        }
        else if(boxes[i].box_color == color(0,0,255)){
          background(0);
          textSize(30);
          text("YOU HAVE FAILED",120, 300);
          text("GOOD LUCK NEXT TIME!",90,330 );
          stop();
        }
        
    }
    
  }
}

void draw(){
if(Start == false){
  //Initial message 
  background(120);
  fill(120,0,255);
  textSize(23);
  text("Practice Clicking around.", 60,100);
  textSize(18);
  fill(0,255,0);
  text("Green means you got the correct answer.", 60,140);
  fill(0,0,255);
  text("Blue means you got the Wrong answer.", 60,160);
}
else {
 background(121); 
}

fill(255,255,0);
//introduction message
textSize(20);
text(Welcome, 135,20);
text(how_to_play, 120,40);


text("SCORE:", 30, 580);
text(counter, 120, 580);

//everytime draw is called passed time == millis - saved time;
int passedTime = millis() - savedTime;
textSize(20);
text(passedTime, 430,40);
if (passedTime >= totalTime) {
  Start = true;
    println("PsssedTime is greater that total time");
    totalTime = totalTime - 100;
    if(totalTime <= 1500){
     totalTime = totalTime + 1000;
    }
    newArray = true;
    savedTime = millis(); // Save the current time to restart the timer!
    
  //updates the current array with new randome numbers
  int j = 0, a;
  int n = int(random(16,500));
    while (goodArray != true){
      a = int(random(1,n));
      if(j>=16){
        break;
      }
       
      if(find_duplicate(arr,a) == false && j < 16){
        arr[j] = a;
       boxes[j].n = arr[j];
       boxes[j].box_color = color(255,255,255);
        j++;
      }
    }
}
  

for (int i = 0; i < boxes.length; i++) { 
  if(boxes[i].n == find_greatest(arr)){
     println("smallest  == ", find_greatest(arr));
     
    }
    else if(boxes[i].n == find_greatest(arr)){
    background(0);
    }
    boxes[i].display();
    boxes[i].check();
    
  }
}
//finds the greatest intiger from the array
int find_greatest(int[] array){
  int[] a = sort(array);
  return a[15];
   
}
//searches the array to find a duplicate number
boolean find_duplicate(int[] array, int n){
  int[] a = array;
  for(int i = 0; i < a.length; i++){
   if(a[i] == n){
    return true; 
   }
  }
  return false;
}
class Box {
  color box_color;
  int xpos,ypos,w = 80,h = 80,n;
  Box (int x, int y){
   xpos = x;
   ypos = y;
   box_color = color(255,255,255);
  }
 void display(){
   fill(box_color);
   rect(xpos, ypos,w,h,7);
   textSize(16);
   fill(255,0,0);
   text(n,xpos+30, ypos+45);
   
 }
 
 
 void check(){
  if(mousePressed){
   if(mouseX >= xpos && mouseX <=xpos+w &&  mouseY >= ypos && mouseY <=ypos+h){
     if(find_greatest(arr) == n){
       box_color = color(0,255,0);
     }
     else {
       box_color = color(0,0,255);
     }
     
   }
    
  }
   
 }
  
}
