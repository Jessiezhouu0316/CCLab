class bird{
    constructor(x, y){
    this.x = x;
    this.y = y;
    this.s = 10;
    this.speedY = random(1,3);
    this.isCharging = false; 
  }

  grow() {
    if (this.isCharging && this.s < 30) {
      this.s += 0.5;  // 按住鼠标时变大
    }
  }

  display(){
    fill(0);
    rectMode(CENTER);
    rect(this.x, this.y, this.s*4, this.s);
  }
  update(){
    if (!this.isCharging) {
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