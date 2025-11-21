let leaves = [];
let rains = [];
let birds = [];
let chargingBird = null;
let n = 100;
let mic;
let onTimer = 0;


function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  mic = new p5.AudioIn();
  mic.start();

  // for (let i = 0; i < n; i++) {
  //   leaves.push(new leaf());
  // }
}

function mousePressed() {
  chargingBird = new bird(mouseX, mouseY);
  chargingBird.isCharging = true;
  // birds.push(new bird(mouseX, mouseY));
}

function mouseReleased() {
  if (chargingBird) {
    chargingBird.isCharging = false; // 停止生长
    birds.push(chargingBird);        // 加到飞行鸟数组
    chargingBird = null;             // 清空 charging
  }
}

function draw() {
  background(255);
  if (frameCount % 10 === 0 && leaves.length < n) {
    leaves.push(new leaf(random(width), random(height/2)));
  }
  for (let i = 0; i < leaves.length; i++) {
    let l = leaves[i];
    l.update();
    l.display();
  }

  for (let i = leaves.length - 1; i >= 0; i--) {
    if (leaves[i].y > height) {
      leaves.splice(i, 1);
    }
  }

  if (chargingBird) {
    chargingBird.grow();
    chargingBird.display();
  }

  for (let i = birds.length - 1; i >= 0; i--) {
  birds[i].update();
  birds[i].display();
  
  if (birds[i].isOut()) {
    birds.splice(i, 1);
  }
}

  let vol = mic.getLevel()*6;
  

  let fall = int(leaves.length * vol);
  
  for (let i = 0; i < leaves.length; i++) {
    if (i < fall) {
      leaves[i].state = "falling";
    } 
}

  let onCount = 0;
  for (let i = 0; i < leaves.length; i++) {
  if (leaves[i].state === "on") {
    onCount++;
  }
}

if (onCount >= n*0.7) {
  onTimer++;           
  if (onTimer > 120) { 
    rains.push(new rain());
  }
} else {
  onTimer = 0;  
}

//   if (onCount >= 80) {
//   rains.push(new rain());
// }
 
// if (mic.getLevel() < 0.001) { 
//     rains.push(new rain());    
//   }

  for (let i = rains.length - 1; i >= 0; i--) {
    rains[i].update();
    rains[i].display();

    if (rains[i].isOut()) {
      rains.splice(i, 1);
    }
  }
  // print(mic.getLevel());
  print(leaves.length);
  print(birds.length);
}

class leaf{
  constructor(){
    this.x = random(width);
    this.y = random(height/2);
    this.s = random(10, 40);
    this.yspeed = map(this.s, 10, 40, 0.5, 5);
    this.state = "on";
    this.leafnoise = random(1000);

  }
  update(){
    
    if (this.state === "falling") {
    let n = noise(this.leafnoise, frameCount * 0.01);
    n = map(n, 0, 1, -1, 1); 
    this.x += n * 2;  
    this.y += this.yspeed; 
  }

  }
  display(){
    push();
    translate(this.x, this.y);
    fill(0);
    circle(0, 0, this.s);
    pop();
  }


}


