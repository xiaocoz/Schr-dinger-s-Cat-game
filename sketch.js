let playerPos;
let gameOver;
let score;
let boxes = [];
let speed;
let playerSize;
let playerSpeed;

class Box {
  constructor(x, y, size, good) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.good = good;
  }
  
  move() {
    this.y += speed;
  }
}

function setup() {
  createCanvas(400, 600);
  frameRate(60);
  textSize(32);
  textAlign(CENTER, CENTER);
  playerPos = width / 2;
  speed = 5;
  playerSize = 20;
  playerSpeed = 10;
  gameOver = false;
  score = 0;
  spawnBox();
}

function draw() {
  if (gameOver) {
    background(0);
    textSize(32);
    fill(255, 0, 0);
    text("Game Over", width/2, height/2);
    textSize(16);
    text("You have been observed by Schrödinger's Cat", width/2, height/2+40);
    fill(255, 255, 255);
    text("Score: " + score, width/2, height/2+70);
    drawEyes();
  } else {
    background(0);
    playerPos = constrain(mouseX, playerSize/2, width - playerSize/2);
    keyPressed()
    drawPlayer();
    drawBoxes();
    textSize(32);
    fill(255);
    textSize(21);
    text("Score: " + score, 60, 50);
  }
}

function drawPlayer() {
  fill(0);
  ellipse(playerPos, height-50, playerSize, playerSize);
}

function drawBoxes() {
  fill(255);
  for(let i = boxes.length - 1; i >= 0; i--) {
    let b = boxes[i];
    rect(b.x, b.y, b.size, b.size);
    b.move();

    if(b.y > height - 50 && abs(playerPos - b.x - b.size/2) < b.size/2 + playerSize/2) {
      if(b.good) {
        score++;
      } else {
        gameOver = true;
      }
      boxes.splice(i, 1);
    } else if(b.y > height) {
      boxes.splice(i, 1);
    }
  }
  
  if(frameCount % 60 == 0) {
    spawnBox();
  }
}

function spawnBox() {
  let x = random(0, width - 50);
  let y = 0;
  let size = 50;
  let good = random(1) > 0.25;
  boxes.push(new Box(x, y, size, good));
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        playerX -= 10;
    } else if (keyCode === RIGHT_ARROW) {
        playerPos += 10;
    }
    playerPos = constrain(playerPos, playerSize / 2, width - playerSize / 2);
}

function drawEyes() {
  let eyeSize = 50;
  let offsetX = 75;
  let offsetY = 100;
  let irisSize = 20;
  let irisOffsetMax = eyeSize/2 - irisSize/2;
  for(let i = -1; i <= 1; i+=2) {
    let eyeX = width/2 + offsetX * i;
    let eyeY = height/2 - offsetY;
    fill(255);
    ellipse(eyeX, eyeY, eyeSize, eyeSize);
    
    let dx = mouseX - eyeX;
    let dy = mouseY - eyeY;
    let angle = atan2(dy, dx);
    let irisX = eyeX + cos(angle) * irisOffsetMax;
    let irisY = eyeY + sin(angle) * irisOffsetMax;
    
    fill(0);
    ellipse(irisX, irisY, irisSize, irisSize);
  }
}