let x;
let y;
let s;
let speedX;
let speedY;
let h;
let p = 80;
let a = 0.01;
let b = 0.008;
let tx = 0;  // 噪声时间变量
let ty = 1000; // 分开一点避免两个轴同步
let d;
let safeDistance;

function setup() {
  background(0,0,0,0.0005);
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
  background(0,0,100,0.01);
  fill(h, 80, p, 0.3);
  noStroke();
  s = map(sin(frameCount * 0.1), -1, 1, 10, 30);
  Moss(x, y, s);

  //noise update
  tx += a;
  ty += b;

  let noiseTargetX = width * noise(tx);
  let noiseTargetY = height * noise(ty);

  d = dist(x, y, mouseX, mouseY);
  safeDistance = 150;

  if (d < safeDistance) {

    let finalTargetX = mouseX + safeDistance;
    let finalTargetY = mouseY + safeDistance;

    // 平滑移动到目标点（越近越快）
    let moveSpeed = map(d, 0, safeDistance, 0.3, 0.1);
    x = lerp(x, finalTargetX, moveSpeed);
    y = lerp(y, finalTargetY, moveSpeed);
  } else {
    // 距离够远时，恢复噪声漂浮
    x = lerp(x, noiseTargetX, 0.1);
    y = lerp(y, noiseTargetY, 0.1);
  }

  // 随机色变化
  h = 360 * noise(frameCount * 0.01);

  // 鼠标按下时生态受损变黑变慢
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
