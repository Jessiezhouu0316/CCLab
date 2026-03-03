
class tree {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.maxS = 4;
    this.ratioL = random(0.7, 0.9);
    this.ratioR = random(0.7,0.9);
    this.turnL = random(1.2, 1.8);
    this.e = random(120,150);
    this.breath = random(0.005,0.015);
    this.opaci = random(100,150);
    this.n = random(1.5,2.5);

  }

  display() {
    push();
    //angleMode(DEGREES);
    translate(this.x, this.y); 

    scale(2.5);

    let volu = mic.getLevel() * 0.001;
    this.angle = map(sin(frameCount*(this.breath+volu)), -1, 1, 10, 18);
    //this.angle = map(sin(frameCount*this.breath), -1, 1, 10, 18);
    this.angle = min(this.angle, 90);

    

    stroke(255-world,this.opaci);
    strokeWeight(this.maxS * this.n);
    line(0, 0, 0, -this.e);

    translate(0, -this.e);

    this.branch(60, 0); 

    pop();
  }

  branch(h, level) {
    let sw = map(h,30, 60, 1, this.maxS);
    let op = map(h,1,60,80,120);
    strokeWeight(sw);
    stroke(255-world,op);

    //h *= this.ratio;

    if (h > 30) {
      push();
    rotate(radians(this.angle));
    let hR = h * this.ratioR;  //用右分支的比例
    line(0, 0, 0, -hR);
    translate(0, -hR);
    this.branch(hR, level + 1);
    pop();

    // --- Left branch ---
    push();
    rotate(radians(-this.angle * this.turnL));
    let hL = h * this.ratioL;   //用左分支的比例
    line(0, 0, 0, -hL);
    translate(0, -hL);
    this.branch(hL, level + 1);
    pop();
    }
  }
}
