
var monkey , monkey_running,monkey_changeIMG1;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score=0, restart, restartIMG, gameOver, gameOverIMG;
var ground;
var play=1;
var end=2;
var gameState=play;

function preload(){
  
  monkey_changeIMG1=loadAnimation("sprite_1.png")
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 restartIMG=loadImage("restart.png");
  gameOverIMG = loadImage("gam OVER.png");
}

function setup() {
 createCanvas(600,250); 

//creating sprite for restart button 
  restart = createSprite(290,110,10,10);
  restart.addImage(restartIMG);
  restart.scale=0.07;

//creating a sprite for monkey
  monkey = createSprite(60,170,10,10);
  monkey.addAnimation("monkeyRunning",monkey_running);
    monkey.addAnimation("change",monkey_changeIMG1);
  monkey.scale=0.13;
  
//creating ground of black colour
  ground=createSprite(300,210,600,10);
// fill(rgb(0,250,0));
  ground.velocityX=-4;
  
//new groups
  obstacleGroup = new Group();
  foodGroup = new Group();
  
//monkey.debug=true;
  monkey.setCollider("rectangle",0,0,350,610);
  
  score=0;
  
//gameOver 
  gameOver = createSprite(290,50,10,10);
  gameOver.addImage(gameOverIMG);
  gameOver.scale=0.4;
  
  
  
  }

function draw() {
background("white")
  
  console.log(gameState);
  
//score   
  text("Score = "+score,520,40);
   
//gameState PLAY
  if(gameState===play){
      
//monkey change animation to monkey running
   monkey.changeAnimation("monkeyRunning",monkey_running); 
    
//if monkey touches banana
    if(foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
      score=score+10;
  }
    
//restart 
  restart.visible=false;
  gameOver.visible=false;  
    
//functions
  obstacle();
  banana();    
    
//if space key is pressed monkey should jump
  if(keyDown("space") && monkey.y>=165){
    monkey.velocityY=-14;
  }    
    
//adding gravity and colliding the monkey with the ground
  monkey.velocityY=monkey.velocityY+0.7;
  monkey.collide(ground);  
   
// ig ground crosses its half it should come again    
  if(ground.x<300){
   ground.x=ground.width/2;
  }
    
//touching
  if(obstacleGroup.isTouching(monkey)){
    gameState=end;
  }} 
    
if(gameState===end){
  restart.visible=true;
  gameOver.visible=true;
  monkey.changeAnimation("change",monkey_changeIMG1);
  
  text("YOUR SCORE = "+score,240,150);
  
  obstacleGroup.setVelocityXEach(0);
  ground.velocityX=0;
  foodGroup.setVelocityXEach(0);
  monkey.velocityY=0;
  
  obstacleGroup.setLifetimeEach(-1);
  foodGroup.setLifetimeEach(-1);
  
  if(mousePressedOver(restart)){
    reset();
  }
}    
  
//banana depth
  banana.depth=monkey.depth
  monkey.depth=monkey.depth+1;

  drawSprites();
 
}

//reset
  function reset(){
    gameState=play;
    score=0;
    restart.visible=false;
    obstacleGroup.destroyEach();
    foodGroup.destroyEach();
    }

function banana(){
  if(frameCount%300===0){
    var banana = createSprite(600,Math.round(random(20,100)),10,10);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=(-3);
    banana.lifetime=200;
    
    foodGroup.add(banana);
}
}

function obstacle(){
  if(frameCount%80===0){
    var obstacles = createSprite(590,185,10,10);
    obstacles.addImage(obstaceImage);
    obstacles.scale=0.11;
    obstacles.velocityX=-4;
    obstacles.lifeTime=15;
    
//  obstacles.debug=true;
 obstacles.setCollider("rectangle",0,0,300,300)
    
    obstacleGroup.add(obstacles);
}
}



