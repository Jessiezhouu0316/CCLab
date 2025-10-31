/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new Jellyfish(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class Jellyfish {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.angle = 0;
    this.lineLength = 70;
    // add properties for your dancer here:
    //..
    //..
    //..
  }
  update() {
    this.angle = sin(frameCount * 0.05) * 0.5;
    // update properties here to achieve
    // your dancer's desired moves and behaviour
  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    
    push();
    translate(this.x, this.y);
    rotate(this.angle);


    // ******** //
    // ⬇️ draw your dancer from here ⬇️



    push();

  
  beginShape();
  translate(-45,65)
  let lineLength = 70;
  stroke(20, 60, 150,150);
  strokeWeight(2);
  noFill();
  for (let i = -lineLength; i <= lineLength; i += lineLength / 10) {
    strokeWeight(10);
    let v = 8 * sin(frameCount * 0.1 - i);
    vertex(v,i);
    //circle(i, v, 5);
  }
  endShape();
  pop();
  
  push();
  beginShape();
  translate(-25, 55);
  stroke(20, 60, 150,110);
  strokeWeight(2);
  noFill();
  for (let i = -lineLength; i <= lineLength; i += lineLength / 10) {
    strokeWeight(10);
    let v = 8 * sin(frameCount * 0.1 - i);
    vertex(v,i);
    //circle(i, v, 5);
  }
  endShape();
  pop();
  
  push();
  beginShape();
  translate(-5, 65);
  stroke(20, 60, 150,190);
  strokeWeight(2);
  noFill();
  for (let i = -lineLength; i <= lineLength; i += lineLength / 10) {
    strokeWeight(10);
    let v = 8 * sin(frameCount * 0.1 - i);
    vertex(v,i);
    //circle(i, v, 5);
  }
  endShape();
  pop();
  
  push();
  beginShape();
  translate(15, 75);
  stroke(20, 60, 150,150);
  strokeWeight(2);
  noFill();
  for (let i = -lineLength; i <= lineLength; i += lineLength / 10) {
    strokeWeight(10);
    let v = 8 * sin(frameCount * 0.1 - i);
    vertex(v,i);
    //circle(i, v, 5);
  }
  endShape();
  pop();
  
  push();
  beginShape();
  translate(35, 55);
  stroke(20, 60, 150,220);
  strokeWeight(1);
  noFill();
  for (let i = -lineLength; i <= lineLength; i += lineLength / 10) {
    strokeWeight(10);
    let v = 8 * sin(frameCount * 0.1 - i);
    vertex(v,i);
    //circle(i, v, 5);
  }
  endShape();
  pop();

  push();
  //translate(width / 2, height / 2);
  noStroke();
  fill(80,150,250,230);
  let s = 1 + 0.1 * sin(frameCount * 0.1);
  ellipse(0,-15, 120*s,80*s);
  ellipse(0, 5,150*s,60*s);
  
  fill(255);
  ellipse(-20, -5, 15, 20);
  ellipse(20, -5, 15, 20);
  fill(0);
  let a = map(mouseX, 0, width, -25, -15);
  let b = map(mouseX, 0, width, 15, 25);
  let c = map(mouseY, 0, height, -10, 0);
  ellipse(a, c, 10, 10);
  ellipse(b, c, 10, 10);
  pop();
  

  




    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    // this.drawReferenceShapes()

    pop();
  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/