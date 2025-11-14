
let starCount = 150;

//star location
let starX = [];
let starY = [];
let starBright = [];
let starSelected = [];
let starColor = [];

//last star clicked
let lastStar = -1;

// record the line
let lineStartX = [];
let lineStartY = [];
let lineEndX = [];
let lineEndY = [];
let lineCount = 0;

function setup() {
  // let canvas = createCanvas(windowWidth, windowHeight);
  // document.body.style.padding = "0";
  // canvas.parent("p5-canvas-container");
  document.documentElement.style.margin = '0';
  document.body.style.margin = '0';
  document.body.style.padding = '0';
  document.body.style.overflow = 'hidden';

  // 创建 canvas，并把它附到 body（p5 默认已做，但这里显式化）
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent(document.body);

  // 使用 p5 的 style 接口设置样式
  canvas.style('position', 'fixed');
  canvas.style('left', '0px');
  canvas.style('top', '0px');
  canvas.style('display', 'block');

  noStroke();
  // parameters of the stars
  for (let i = 0; i < starCount; i++) {
    starX[i] = random(width);
    starY[i] = random(height);
    starBright[i] = random(100, 200);
    starSelected[i] = false;
    starColor[i] = color(random(100,255), random(100,255), random(100,255)); 
  }
}

function draw() {
  background(0);
  
  // draw all lines
  stroke(255, 200);
  strokeWeight(1);
  for (let i = 0; i < lineCount; i++) {
    line(lineStartX[i], lineStartY[i], lineEndX[i], lineEndY[i]);
  }
  
  // draw all stars (those selected are bigger)
  noStroke();
  for (let i = 0; i < starCount; i++) {
    if (starSelected[i]) {
      fill(255, 255, 150);
      ellipse(starX[i], starY[i], 6);
    } else {
      fill(starColor[i]);
      ellipse(starX[i], starY[i], 3);
    }
  }
}

function mousePressed() {
  // examines whether a star is clicked
  for (let i = 0; i < starCount; i++) {
    let d = dist(mouseX, mouseY, starX[i], starY[i]);
    if (d < 10) {
      starSelected[i] = true;
      
      // detect previous stars and make a line
      if (lastStar != -1 && lastStar != i) {
        lineStartX[lineCount] = starX[lastStar];
        lineStartY[lineCount] = starY[lastStar];
        lineEndX[lineCount] = starX[i];
        lineEndY[lineCount] = starY[i];
        lineCount = lineCount + 1;
      }
      
      // remember this star is the newest
      lastStar = i;
      break;
    }
  }
}

function keyPressed() {
  if (key === ' ') {
    // clear all lines
    lineCount = 0;
    lastStar = -1;
    for (let i = 0; i < starCount; i++) {
      starSelected[i] = false;
    }
  }
}
