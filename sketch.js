var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var survivalTime = 0;



function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(600, 400);
  
  monkey = createSprite(50, 300, 10, 10);
  monkey.addAnimation("running",  monkey_running);
  monkey.scale = 0.1;
  
    
    
  
  ground = createSprite(400, 380, 800, 10);
  ground.velocityX = -4;
  
    
  
  
  ground2 = createSprite(400, 380, 800, 10);
  
  
   obstacleGroup = createGroup(); 
   foodGroup = createGroup();
  
    monkey.setCollider("rectangle",0,0,50,monkey.height);
    //monkey.debug = true
  
}


function draw() {
  background("white");

  
  if(gameState === PLAY) {
    
     stroke("black");
     textSize(20);
     fill("black");
     survivalTime = Math.ceil(frameCount / frameRate() );
     text("survival Time: "+ survivalTime, 100, 50);
  
     if(ground.x < 0 ) {
     ground.x = ground.width /2;
   }
     console.log(monkey.y)
    
   
  if(keyDown("space")&& monkey.y >= 344) {
        monkey.velocityY = -14;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;
    
    bananas();
    obstacles();
    
    
    if(foodGroup.isTouching(monkey)) {
       foodGroup.destroyEach();  
    
    }
    
    if(obstacleGroup.isTouching(monkey)) {
     
      
      gameState = END;
      
    }
    
  }
  
  
  if(gameState === END) {
    
    ground.velocityX = 0;
    monkey.velocityY = 0;
     
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
     obstacleGroup.setVelocityXEach(0);
     foodGroup.setVelocityXEach(0);
    
     textSize(40);
    
     text("GAME OVER", 180, 200);
    
  }
  
  monkey.collide(ground);
  
  drawSprites();
}

function bananas() {
  if(frameCount % 80 === 0) {
    banana = createSprite(600, 300, 10, 10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(200, 350));
    banana.scale = 0.05;
    banana.velocityX = -4;
    banana.lifetime = 150;

    foodGroup.add(banana);
  }
}

function obstacles() {
  if(frameCount % 100 === 0) {
   obstacle = createSprite(600, 350, 10, 10);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -5;
   obstacle.scale = 0.15;
   obstacle.lifetime = 150;
    
   obstacleGroup.add(obstacle);
  }
}