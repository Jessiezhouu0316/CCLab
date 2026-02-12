let fireworks = [];
let gravity;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  gravity = createVector(0, 0.05); // 更轻的重力
  background(0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  // 柔和拖尾
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

    // 🎨 从色环随机选两个颜色
    let hue1 = random(360);
    let hue2 = (hue1 + random(60, 180)) % 360;

    for (let i = 0; i < 140; i++) {
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
    let speed = random(3, 6);
    this.vel = p5.Vector.fromAngle(angle);
    this.vel.mult(speed);

    this.acc = gravity.copy();

    this.hue = hue;

    // 不那么饱和
    this.sat = random(50, 75);

    this.brightness = random(85, 100);

    // 粒子大小差异明显
    this.radius = random() < 0.2
      ? random(4, 7)
      : random(1.5, 3.5);

    this.alpha = 100; // 用 alpha 控制 fade
  }

  update() {
    this.vel.add(this.acc);

    // 空气阻力
    this.vel.mult(0.97);

    this.pos.add(this.vel);

    // 慢慢 fade
    this.alpha -= 1.2;
  }

  show() {
    noStroke();
    fill(this.hue, this.sat, this.brightness, this.alpha);
    circle(this.pos.x, this.pos.y, this.radius);
  }
}
