class rain{
  constructor(x, y){
    this.x = random(width);
    this.y = random(-height, 0);
  }
  display(){
    push();
    strokeWeight(5);
    stroke(0,0,0,100);
    line(this.x, this.y, this.x, this.y+5);
    pop();
  }
  update(){
    this.y += 10;
  }
  isOut(){
    if(this.y > height + 5){
      return true;
    }else{
      return false;
    }
  }
}