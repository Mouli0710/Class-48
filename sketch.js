 var MarioRunning,Mario,MarioDead;

 var bg,bg1;

 var obstacleGroup,obstacle1,obstacle2,obstacle3;

 var Mushroom;

 var Coin,CoinGroup;

 var BrickGroup,plan,joined,quemark;

 var ground;

 var PLAY = 1;
 var END = 0;

 var gameState = PLAY;

 var score = 0;

 var CoinSound;
 var MarioDeadSound;



function preload(){
 MarioRunning = loadAnimation("Images/Mario Left.png","Images/Mario Right.png","Images/Mario Stand.png");
 MarioDead = loadAnimation("Images/Mario Dead.png");

 bg = loadImage("Images/Mario Bg.jpg");

 obstacle1 = loadImage("Images/obstacle1.png");
 obstacle2 = loadImage("Images/obstacle2.png");
 obstacle3 = loadImage("Images/obstacle3.png");

 Mushroom = loadImage("Images/Mushroom.png");

 Coin = loadImage("Images/Coin.png");

 plan = loadImage("Images/Brick-plan.jpg");
 joined = loadImage("Images/Brick-joined.jpg");
 quemark = loadImage("Images/Brick-quemark.jpg");

 CoinSound = loadSound("Sound/coin.wav");
 MarioDeadSound = loadSound("Sound/Mario Dead.wav");
}

function setup() {
  createCanvas(1000,600);

  bg1 = createSprite(0,50,20,20);
  bg1.velocityX = -4;
  bg1.addImage(bg);

  Mario  = createSprite(100,500,15,15);
  Mario.addAnimation("Running",MarioRunning);
  Mario.addAnimation("Dead",MarioDead);
  

  obstacleGroup = new Group();
  CoinGroup = new Group();
  BrickGroup = new Group();
  BricksGroup = new Group();

  ground = createSprite(100,590,10000,15);
  ground.visible = false;
  
}

function draw() {
  background(255,255,255);
  if(gameState === PLAY){
  if(bg1.x<0){
    bg1.x = bg1.width/2;
  } 

  if(keyIsDown(32)||keyIsDown(38)){
  Mario.velocityY = -10;
  }
  Mario.velocityY = Mario.velocityY+0.3;

  Mario.collide(ground);
  Obstacles();
    if(frameCount%500===0){ 
       for(i=frameCount;i<=frameCount+15;i++){
       coins(); }
           }
  Bricks();
  Brick();
  
  
 
  if(Mario.isTouching(CoinGroup)){
   CoinGroup[0].destroy();
   score = score+1;
   CoinSound.play();
  }

  if(Mario.isTouching(BricksGroup)){
    BricksGroup[0].destroy();
    score = score+100;
  }

  if(Mario.isTouching(BrickGroup)){
    BrickGroup[0].destroy();
    score = score+2;
  }

  if(obstacleGroup.isTouching(Mario)){
    gameState = END;
  }
}
  if(gameState === END){
    bg1.velocityX = 0;
    Mario.changeAnimation("Dead",MarioDead);
    obstacleGroup.setVelocityXEach(0); 
    CoinGroup.setVelocityXEach(0); 
    BricksGroup.setVelocityXEach(0); 
    BrickGroup.setVelocityXEach(0);
    MarioDeadSound.play(); 
    
  }
  drawSprites();
  fill("black");
  textSize(20)
  text("Score:"+score,100,100);

}

function Obstacles(){
  if(frameCount%300 === 0){
    obstacle = createSprite(1000,530,15,15);
    obstacle.lifetime = 500;
    obstacle.velocityX = -3;
    obstacle.scale = 0.5;
    
    
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
    }
    obstacleGroup.add(obstacle);
  }
}

function coins(){
  
    coin = createSprite(Math.round(random(0,1000)),Math.round(random(400,500)),15,15);
    coin.lifetime = 500;
    coin.scale = 0.1
    coin.velocityX = -4;
    coin.addImage(Coin);
    CoinGroup.add(coin); 
  
}

function Bricks(){
  if(frameCount%400 === 0){
   brick = createSprite(1000,Math.round(random(300,400)),15,15);
   brick.lifetime = 500;
   brick.velocityX = -4;
   brick.scale = 3
   brick.addImage(plan);
   BrickGroup.add(brick);
  }
}

function Brick(){
  if(frameCount%500 === 0){
    bricks = createSprite(1000,Math.round(random(300,400)),15,15);
    bricks.lifetime = 500;
    bricks.velocityX = -4;
    bricks.scale = 3;
    bricks.addImage(quemark);
    BricksGroup.add(bricks);
  }
}
