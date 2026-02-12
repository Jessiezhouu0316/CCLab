let fireworks = [];
let gravity;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  gravity = createVector(0, 0.07); // 略增强重力适配大尺寸
  background(0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  background(0, 0, 0, 18);

  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();

    if (fireworks[i].isDone()) {
      fireworks.splice(i, 1);
    }
  }
}

function mousePressed() {
  fireworks.push(new Firework(mouseX, mouseY));
}

// ============================
// Firework
// ============================

class Firework {
  constructor(x, y) {
    this.particles = [];

    let hue1 = random(360);
    let hue2 = (hue1 + random(80, 200)) % 360;

    // 🔥 粒子数量增加
    for (let i = 0; i < 220; i++) {
      let chosenHue = random() < 0.5 ? hue1 : hue2;
      this.particles.push(new Particle(x, y, chosenHue));
    }
  }

  update() {
    for (let p of this.particles) {
      p.update();
    }
  }

  show() {
    for (let p of this.particles) {
      p.show();
    }
  }

  isDone() {
    return this.particles.every(p => p.alpha <= 0);
  }
}

// ============================
// Particle
// ============================

class Particle {
  constructor(x, y, hue) {
    this.pos = createVector(x, y);

    let angle = random(TWO_PI);

    // 🔥 爆炸速度提升（扩大范围）
    let speed = random(5, 10);
    this.vel = p5.Vector.fromAngle(angle);
    this.vel.mult(speed);

    this.acc = gravity.copy();

    this.hue = hue;

    // 🎨 柔和饱和度
    this.sat = random(50, 75);
    this.brightness = random(90, 100);

    // 🌟 半径整体放大一倍
    this.radius = random() < 0.25
      ? random(8, 14)     // 大颗粒
      : random(3, 6);     // 小颗粒

    this.alpha = 100;
  }

  update() {
    this.vel.add(this.acc);
    this.vel.mult(0.97);
    this.pos.add(this.vel);

    // fade 慢一点，适配更大粒子
    this.alpha -= 0.9;
  }

  show() {
    noStroke();
    fill(this.hue, this.sat, this.brightness, this.alpha);
    circle(this.pos.x, this.pos.y, this.radius);
  }
}
