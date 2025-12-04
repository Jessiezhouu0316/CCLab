class leaf{
  constructor(){
    this.x = random(width);
    this.y = random(height/8, height/2);
    this.s = random(10, 40);
    this.yspeed = map(this.s, 10, 40, 0.5, 5);
    this.state = "on";
    this.leafnoise = random(1000);
    this.angle = random(TWO_PI);
    this.opa = random(150,255);
    this.fade = 0;  

  }
  update(){
    this.fade = lerp(this.fade, this.opa, 0.01);
    if (this.state === "falling") {
    let n = noise(this.leafnoise, frameCount * 0.01);
    n = map(n, 0, 1, -1, 1); 
    this.x += n * 2;  
    this.y += this.yspeed; 
    this.angle += n * 0.05; 
  }

  }
  display(){
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    fill(0,0,0, this.fade);
    noStroke();
    beginShape();
    vertex(0, 0);
    bezierVertex(this.s / 2, -this.s / 5, this.s / 2, -this.s * 4/5, 0, -this.s);
    bezierVertex(-this.s / 2, -this.s * 4/5, -this.s / 2, -this.s / 5, 0, 0);
    endShape(CLOSE);
    pop();
  }


}
