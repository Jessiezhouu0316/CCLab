class bird{
    constructor(x, y){
    this.x = x;
    this.y = y;
    this.s = 0.2;
    this.angle = 0;
    this.n = random(0.05, 0.5);
    this.speedX = random(-2,2);
    this.speedY = 0
    this.isCharging = false; 
    this.opac = 255;
  }

  grow() {
    if (this.isCharging && this.s < 1) {
      this.s += 0.01; 
    }
  }

  display(){
  fill(0,0,0,this.opac);
  noStroke();
  ellipse(this.x, this.y, 20*this.s, 30*this.s);

  //right wing
  push();
  translate(this.x, this.y);
  rotate(this.angle);

  //line(0, 0, 100, 0);
  push();
  translate(-31*this.s, 10*this.s);
  rotate(-PI / 4);
  beginShape();

  // Add the first control point and draw a segment to it.
  curveVertex(84*this.s, 91*this.s);
  curveVertex(84*this.s, 91*this.s);

  // Add the anchor points to draw between.
  curveVertex(68*this.s, 19*this.s);
  curveVertex(21*this.s, 17*this.s);

  // Add the second control point.
  curveVertex(32*this.s, 91*this.s);

  // Uncomment the next line to draw the segment to the second control point.
  // curveVertex(32, 91);

  endShape();
  pop();
  pop();

  //left wing
  push();
  translate(this.x, this.y);
  scale(-1, 1);
  rotate(this.angle);
  //line(0, 0, 100, 0);

  push();
  translate(-31*this.s, 10*this.s);
  rotate(-PI / 4);
  beginShape();

  // Add the first control point and draw a segment to it.
  curveVertex(84*this.s, 91*this.s);
  curveVertex(84*this.s, 91*this.s);

  // Add the anchor points to draw between.
  curveVertex(68*this.s, 19*this.s);
  curveVertex(21*this.s, 17*this.s);

  // Add the second control point.
  curveVertex(32*this.s, 91*this.s);

  // Uncomment the next line to draw the segment to the second control point.
  // curveVertex(32, 91);

  endShape();
  pop();
  pop();

  this.angle = sin(frameCount * this.n);
  this.angle = map(this.angle, -1, 1, -PI / 10, PI / 10);
    // rectMode(CENTER);
    // rect(this.x, this.y, this.s*4, this.s);
  }
  update(){
    
    if (!this.isCharging) {

      this.speedY = map(this.n, 0.05, 1, 2,5);

      this.opac -= 0.5;
      
      let targetX = map(noise(frameCount*0.1), 0, 1, -20, 20); 
      this.speedX = lerp(this.speedX, targetX, 0.01);
      this.x += this.speedX;

      this.y -= this.speedY; 

    }
  }
  isOut(){
    if(this.y < - 5){
      return true;
    }else{
      return false;
    }
  }
}