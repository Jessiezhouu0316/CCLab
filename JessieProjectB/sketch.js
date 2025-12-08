let leaves = [];
let rains = [];
let birds = [];
let trees = [];
//let chargingBird = null;
let n = 150;
let mic;
let onTimer = 0;

let osc = [];
let envelope = [];

let handPose;
let indexTip = 0;
let thumbTip = 0;
let midTip = 0;
let ringTip = 0;
let pinkyTip = 0;
let wrist = 0;

let video;
let hands = [];
//let prevClose = false;
let prevClose = [false, false];      // 两只手的 prevClose
let chargingBird = [null, null];     // 两只手正在蓄力的 bird
let limit = 30;

let options = {manHands: 2, flipped: true};

let bgm;
let rainSound;

function preload() {
  handPose = ml5.handPose(options);
  bgm = loadSound("Forest.mp3");
  rainSound = loadSound("Rain.mp3");
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);

  bgm.loop();  
  bgm.setVolume(0.5); 
  rainSound.loop();  
  rainSound.setVolume(0);  // 初始静音，相当于未播放

  canvas.parent("p5-canvas-container");

  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);
  video.hide(); 
  handPose.detectStart(video, gotHands);

  mic = new p5.AudioIn();
  mic.start();
  osc = new p5.TriOsc();
  osc.amp(0.01);

  envelope = new p5.Env();
  envelope.setADSR(0.001, 0.5, 0.1, 0.1);
  envelope.setRange(0.3,0);


  for (let i = 0; i < 8; i++) {
    let m = random(-10,10);
    trees.push(new tree(m + i * width/7, height));
  }

}

function startChargingByHand(i, x, y) {
  if (chargingBird[i]) return;

  chargingBird[i] = new bird(x, y);
  chargingBird[i].isCharging = true;

  osc.start();
  let freq = map(x, 0, width, 80, 1000);
  osc.freq(freq);
  envelope.play(osc, 0, 0.15);

}

function releaseChargingByHand(i) {
  if (chargingBird[i]) {
    chargingBird[i].isCharging = false;
    birds.push(chargingBird[i]);        
    chargingBird[i] = null;            
  }
}


function draw() {
  background(255);

  for (let i = 0; i < hands.length && i < 2; i++) {
    let hand = hands[i]; 
    
    if (hand.keypoints && hand.keypoints.length >= 21) {
      indexTip = hands[i].keypoints[8];
wrist = hands[i].keypoints[0];
thumbTip = hands[i].keypoints[4];
midTip = hands[i].keypoints[12];
ringTip = hands[i].keypoints[16];
pinkyTip = hands[i].keypoints[20];

let currentClose;
// open / close 判断
if (
  indexTip.y < thumbTip.y &&
  midTip.y < thumbTip.y &&
  ringTip.y < thumbTip.y &&
  pinkyTip.y < thumbTip.y
) {
  currentClose = true;
} else {
  currentClose = false;
}
      // let p1 = hand.keypoints[4];   // 拇指 tip
      // let p2 = hand.keypoints[8];  // 食指 tip
      // let p3 = hand.keypoints[9];   // 手掌中部

      // fill(255, 0, 0);
      // circle(p1.x, p1.y, 12);

      // fill(0, 0, 255);
      // circle(p2.x, p2.y, 12);

      fill(0,0,0); 
      noStroke(); 
      circle(wrist.x, wrist.y, 15);

      // let d = dist(p1.x, p1.y, p2.x, p2.y);
      // console.log(d);
      // let currentClose = (d < limit);


      if (!currentClose && prevClose[i]) {
        startChargingByHand(i, wrist.x, wrist.y);
        
      }

      if (currentClose && !prevClose[i]) {
        releaseChargingByHand(i);
        
      }

      prevClose[i] = currentClose;
    }
  } 


  if (frameCount % 10 === 0 && leaves.length < n) {
    leaves.push(new leaf(random(width), random(height/2)));
  }
  for (let i = 0; i < leaves.length; i++) {
    let l = leaves[i];
    l.update();
    l.display();
  }

  for (let i = 0; i < trees.length; i++) {
    let t = trees[i];
    t.display();
  }

  for (let t of trees) {
    t.display();
  }

  for (let i = leaves.length - 1; i >= 0; i--) {
    if (leaves[i].y > height) {
      leaves.splice(i, 1);
    }
  }

  // if (chargingBird) {
  //   chargingBird.grow();
  //   chargingBird.display();
  
  // }
  for (let i = 0; i < 2; i++) {
  if (chargingBird[i]) {
    chargingBird[i].grow();
    chargingBird[i].display();
  }
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

if (onCount >= n*0.6) {
  onTimer++;           
  if (onTimer > 120) { 
    rains.push(new rain());
  }
} else {
  onTimer = 0;  
}


  for (let i = rains.length - 1; i >= 0; i--) {
    rains[i].update();
    rains[i].display();

    if (rains[i].isOut()) {
      rains.splice(i, 1);
    }
  }

  if (rains.length > 0) {
    let vol = map(rains.length, 1, 20, 0, 0.6);
    rainSound.setVolume(vol);
} 
  textSize(24);
  text("✊➡️✋. —— 🐦", 10, 30);
  text("🤫. ——🌧️", 10, 60);
}

function gotHands(results) {
  hands = results;
}



