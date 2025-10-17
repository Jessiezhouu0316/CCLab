let x;
let y;
let s;
let speedX;
let speedY;
let h;
let p = 80;

function setup() {
  background(0,0,0,0.005);
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container")
  colorMode(HSB);
  x = random(width);
  y = random(height);
  s = random(80, 100);
  h = random(0, 360);
  speedX = random(-5, 5);
  speedY = random(-5, 5);
  for (let b = 50; b < 2 * width; b += 100) {
    beginShape();
    for (let angle = 0; angle < 2 * PI; angle += PI / 30) {
      let n = noise(cos(angle + b) * 0.5, sin(angle * b) * 0.5);

      let a = map(n, 0, 1, -50, 50);
      let x = width / 2 + (b + a) * cos(angle);
      let y = height / 2 + (b + a) * sin(angle);
      //circle(x,y, 10);
      noFill();
      let c = random(0, 10);
      strokeWeight(c);
      //vertex(x, y);
      curveVertex(x, y);
    }
    endShape(CLOSE);
  }
}

function draw() {
  background(0,0,0,0.005);
  fill(h, 80, p, 0.3);
  noStroke();
  s = map(sin(frameCount * 0.1), -1, 1, 2, 20);
  Moss(x, y, s);
  let noiseValue = noise(frameCount) * 5;
  //let noiseValue = 1;

  x = x + speedX;
  y = y + speedY;

 let a = floor(random(5, 20));
  if (frameCount % a == 0) {
    //speedX = -speedX;
    speedX = random(-5, 5);
    if (speedX == 0) {
      speedX = 1;
    }
    speedY = random(-5, 5);
    if (speedY == 0) {
      speedY = 1;
    }
    h = random(0, 360);
  }

  if (x > width || x < 0) {
    speedX = -speedX;
    speedY = random(-5, 5);
    if (speedY == 0){
      speedY = 1;
    }
  }
  if (y > height || y < 0) {
    speedY = -speedY;
    speedX = random(-5, 5);
    if (speedX == 0){
      speedX = 1;
    }
  }
  if (x > width || y > height || x < 0 || y < 0) {
    h = lerp(h, random(0, 360), 0.1);
  }

  if (mouseIsPressed) {
    p = lerp(p, 0, 0.1);
  } else {
    p = lerp(p, 80, 0.1);
  }
}

function Moss(x, y, s) {
  push();
  translate(x, y);
  rotate(frameCount * 0.1);
  //fill(255);
  circle(0, 0, s);
  ellipse(0, 0, s + 20, s - 10);
  ellipse(0, 0, s - 10, s + 20);

  pop();
}
