
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score=0;
var Background,backgroundImg;
var jump;
var iground
var st=0;
var PLAY=1;
var END=0;
var gameState=1;
var monkeyOver;
var stuck,stuckImg;
var restart,restartImg;

function preload(){
  
  restartImg=loadImage("zxzxxz.png")
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkeyOver =loadAnimation("sprite_0.png")
  
  bananaImage = loadImage("Picture3.png");
  obstacleImage = loadImage("Picture1111.png");
  backgroundImg=loadImage("b.jpg");
  banana=createSprite(200,200,0,0);
  banana.addImage("banana",bananaImage);
  banana.scale=0.15;
  jump=loadSound("js.mp3");
  stuckImg=loadImage("st.png");
}



function setup() {
  createCanvas(800,400);
  Background=createSprite(2100,200,0,0);
  Background.addImage("Background",backgroundImg);
  Background.scale=3.7;
  monkey=createSprite(140,270,0,0);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.2;
  monkey.setCollider("circle",0,0,300);
  iground=createSprite(400,335,800,10);
  iground.visible=false;
  bananaGroup=createGroup();
  obstacleGroup=createGroup();
  restart=createSprite(400,250,0,0)
  restart.addImage("img",restartImg);
  restart.scale=0.2;
  restart.visible=false;
  stuck=createSprite(400,180.0,0);
  stuck.addImage("stuck",stuckImg);
  stuck.scale=0.36;
  stuck.visible=false;
 
 
}


function draw() {
  background("white");
  monkey.collide(iground);
   //console.log(Background.x)
  Background.velocityX=-9-(st/50);
  if(Background.x<0){
      Background.x=Background.x+2100;
  }
  
  if(gameState===PLAY){
    
     
     Obstacle()
     Banana()
     
    
   st = st + Math.round(getFrameRate()/60);
    
    
    monkey.velocityY = monkey.velocityY +1;
  
    
   
    if((keyDown("space")||mouseIsPressed)&&monkey.y>260){
   jump.play();
  monkey.velocityY=-22;
    }
      
      
      if(bananaGroup.collide(monkey)){
        score=score+100;
        bananaGroup.destroyEach();
      }
        
        if(obstacleGroup.collide(monkey)){
          gameState=END;
          
        
        
     }
    }
    if(gameState===END){
      restart.visible=true;
      stuck.visible=true;
      obstacleGroup.setVelocityXEach(0);
      obstacleGroup.setVelocityYEach(0);
      monkey.addAnimation("monkey",monkeyOver);  
      Background.velocityX=0;
      bananaGroup.setVelocityXEach(0);
      bananaGroup.setVelocityYEach(0);
      monkey.velocityX=0;
      monkey.velocityY=0;
      if(mousePressedOver(restart)){
        gameState=PLAY;
        bananaGroup.destroyEach();
        obstacleGroup.destroyEach()
        score=0;
        st=0;
        restart.visible=false;
        stuck.visible=false;
        monkey.addAnimation("monkey",monkey_running);
      }
    }
  
  drawSprites();
  textSize(25)
  stroke("red");
  text("S u r v i v a l   T i m e  :  "+st,100,50);
  text("S C O R E  :  "+score,540,50);
  
  }

function Banana(){
  if(frameCount%100===0){
   banana=createSprite(800,Math.round(random(40,160)),0,0);
   banana.addImage("banana",bananaImage);
   banana.scale=0.145;
   banana.velocityX=-8;
   banana.lifetime=100;
     banana.depth = restart.depth;
    banana.depth = restart.depth + 1;
   bananaGroup.add(banana);
  }
}

function Obstacle(){
 if(frameCount%140===0){
   obstacle=createSprite(800,280,0,0);
   obstacle.addImage("obstacle",obstacleImage);
   obstacle.velocityX=-9-(st/50);
   switch(Math.round(random(1,4))){
     case 1:obstacle.scale=0.3;
       break;
     case 2:obstacle.scale=0.31;
       break;
     case 3:obstacle.scale=0.2;
       break;
     case 4:obstacle.scale=0.25;
       break;
       default:break;
   }
   obstacle.depth = restart.depth;
    obstacle.depth = restart.depth + 1;
   obstacleGroup.add(obstacle);
   
   if(obstacle.x<0){
     obstacleGroup.destroyEach();
     
   }
 }
}




