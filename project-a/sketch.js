let x;
let y;
let s;
let speedX;
let speedY;
let h;
let p = 80;
let a = 0.01;
let b = 0.008;
let tx = 0;
let ty = 1000;
let d;
let safeDistance;

function setup() {
  background(0, 0, 0, 0.005);
  let c = createCanvas(800, 500);
  c.parent('p5-canvas-container');
  colorMode(HSB);

  x = random(width);
  y = random(height);
  s = random(80, 100);
  h = random(0, 360);
  speedX = random(-5, 5);
  speedY = random(-5, 5);
  d = dist(x, y, mouseX, mouseY);
  safeDistance = 150;

  for (let b = 50; b < 2 * width; b += 100) {
    beginShape();
    for (let angle = 0; angle < 2 * PI; angle += PI / 30) {
      let n = noise(cos(angle + b) * 0.5, sin(angle * b) * 0.5);
      let a = map(n, 0, 1, -50, 50);
      let x = width / 2 + (b + a) * cos(angle);
      let y = height / 2 + (b + a) * sin(angle);
      noFill();
      let c = random(0, 10);
      strokeWeight(c);
      curveVertex(x, y);
    }
    endShape(CLOSE);
  }
}

function draw() {
  background(0, 0, 100, 0.01);
  fill(h, 80, p, 0.3);
  noStroke();

  //Breathing movement
  s = map(sin(frameCount * 0.1), -1, 1, 10, 30);
  Moss(x, y, s);

  //Update noise value
  tx += a;
  ty += b;

  let noiseTargetX = width * noise(tx);
  let noiseTargetY = height * noise(ty);

  //Calculate the distance
  d = dist(x, y, mouseX, mouseY);
  safeDistance = 150;

  if (d < safeDistance) {
    let dx = x - mouseX;
    let dy = y - mouseY;

    //Move to the target point smoothly
    let moveSpeed = map(d, 0, safeDistance, 0.3, 0.1);
    x = lerp(x, x+dx, moveSpeed);
    y = lerp(y, y+dy, moveSpeed);
  } else {
    x = lerp(x, noiseTargetX, 0.1);
    y = lerp(y, noiseTargetY, 0.1);
  }

  //Hue change
  h = 360 * noise(frameCount * 0.01);

  if (mouseIsPressed) {
    p = lerp(p, 0, 0.01);
    a = lerp(a, 0, 0.01);
    b = lerp(b, 0, 0.01);
  } else {
    p = lerp(p, 80, 0.01);
    a = lerp(a, 0.01, 0.01);
    b = lerp(b, 0.008, 0.01);
  }
}

function Moss(x, y, s) {
  push();
  translate(x, y);
  rotate(frameCount * 0.1);
  circle(0, 0, s);
  ellipse(0, 0, s + 20, s - 10);
  ellipse(0, 0, s - 10, s + 20);
  pop();
}
