/* 
Developer: Bosena Telila
Team: lovelace 
date: 10/17/20

This code creates a array of  random numbers/intigers
and places them in each box. If the player clicks on the box with the smalles integer
the array resets and the places finds the smallest number again. The counter keeps going until the places 
chooses a number that is not the smallest.



*/

String Welcome = "Welcome to my Math game.";
String how_to_play = "Find the smallest number.";

int counter = 0;
int box_xpos = 70;
int box_ypos = 180;

int savedTime;
int totalTime = 5000;

boolean newarr = false;
boolean Start = false;

int[] arr = new int[16];
Box[] boxes = new Box[16];
void setup(){
 size(500,600);
 background(0);
 
 savedTime = millis();
 //initializing array with random intigers
 for(int i = 0; i < arr.length; i++){
   int a = int(random(1,200));
   arr[i] = a;
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
void mouseReleased(){
  if(newarr == true){
    for(int i = 0; i < boxes.length; i++){
        if(boxes[i].box_color == color(0,255,0)){
         counter++;
         newarr = false;
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
//introduction message
textSize(20);
text(Welcome, 70,20);

text("SCORE:", 30, 580);
text(counter, 120, 580);

int passedTime = millis() - savedTime;
textSize(20);
text(passedTime, 430,40);
if (passedTime >= totalTime) {
  Start = true;
    println("5 seconds have passed!");
    totalTime = totalTime - 100;
    if(totalTime <= 1500){
     totalTime = totalTime + 1000;
    }
    newarr = true;
    savedTime = millis(); // Save the current time to restart the timer!
    //arr = null;
   for(int i = 0; i < arr.length; i++){
     int a = int(random(1,200));
     arr[i] = a;
     boxes[i].n = arr[i];
     boxes[i].box_color = color(255,255,255);
     
   }
  }
  

for (int i = 0; i < boxes.length; i++) { 
  if(boxes[i].n == find_smallest(arr)){
     println("smallest  == ", find_smallest(arr));
     
    }
    else if(boxes[i].n == find_smallest(arr)){
    background(0);
    }
    boxes[i].display();
    boxes[i].check();
    
  }
}

int find_smallest(int[] array){
  int[] a = sort(array);
  
  
  return a[0];
   
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
     if(find_smallest(arr) == n){
       box_color = color(0,255,0);
     }
     else {
       box_color = color(0,0,255);
     }
     
   }
    
  }
   
 }
  
}
