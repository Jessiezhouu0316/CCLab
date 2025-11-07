// CCLab Mini Project - 9.R Particle World Template

let NUM_OF_FISH = 100; // Decide the initial number of particles.
let MAX_OF_FISH = 500; // Decide the maximum number of particles.

let particles = [];
let mic;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  mic = new p5.AudioIn();
  mic.start();

  colorMode(HSB, 100);

  // generate particles
  for (let i = 0; i < NUM_OF_FISH; i++) {
    particles[i] = new Fish(random(width, width*2), random(0, height));
  }
}

function draw() {
  background(65, 60, 30);

  // consider generating particles in draw(), using Dynamic Array

  // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
  }

  if (mouseIsPressed) {
    if (particles.length > 0) {
      particles.splice(particles.length - 1, 1);
    }
  }

  // limit the number of particles
  if (particles.length > MAX_OF_FISH) {
    particles.splice(0, 1); // remove the first (oldest) particle
  }
}

function keyPressed() {
  if (key === 'A' || key === 'a') {
    if (particles.length < MAX_OF_FISH) {
      particles.push(new Fish(random(width), random(height)));
    }
  }
}

// function mouseIsPressed(){
//   if (mouseIsPressed) { 
//     if (particles.length > 0){
//       particles.splice(particles.length - 1, 1);
//     } 
//   }

// }
  
class Fish {
  // constructor function
  constructor(startX, startY) {
    // properties (variables): particle's characteristics
    this.x = startX;
    this.y = startY;
    this.s1 = random(50,100);
    this.s2 = this.s1 * 0.5;
    this.c = random(0,100);
    this.speedX = random(1,3);
    this.reverse = false;
    this.n = map(this.s1,80,120, 0.1, 0.05);
    // this.dia = 30;
  }
  // methods (functions): particle's behaviors
  update() {
    // (add) 
    let f = map(mic.getLevel(), 0,1, 1, 40);

    this.x -= this.speedX * f;
    this.s = 1 + 0.2 * sin(frameCount * this.n);
    this.l = this.s1 * this.s;
    this.h = this.s2 * this.s;

    if (this.x < -width*0.5 || this.x > width*1.5) {
      this.speedX = -this.speedX;
      this.reverse = !this.reverse;
      this.y = random(0, height);
    }
  }
  display() {
    push();
    translate(this.x, this.y);
    if (this.reverse) scale(-1,1);

    // 画鱼
    fill(this.c, 40, 100);
    noStroke();
    triangle(0,0,this.l,-this.h,this.l,this.h);
    triangle(this.l,0,this.l+this.l*0.3,-this.h*0.3,this.l+this.l*0.3,this.h*0.3);
    fill(0);
    circle(this.l*0.3,0,this.l*0.1);

    pop();
  }
}
