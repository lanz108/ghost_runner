var tower,tower1;
var doorsGroup,door,doorImage;
var ghost,ghostImage;
var climber,climberGroup,climberImage;
var invisibleBlock,invisibleBlockGroup;
var gameState="play";
var spookySound;

function preload(){
 tower1=loadImage("tower.png");
  doorImage= loadImage("door.png");
  ghostImage = loadImage("ghost-standing.png");
  climberImage= loadImage("climber.png");
  spookySound= loadSound("spooky.wav");
}


function setup(){
  createCanvas(600,600);
  
  tower=createSprite(300,300);
  tower.addImage(tower1);
  
  doorsGroup= new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();  
  ghost=createSprite(300,400);
  ghost.addImage(ghostImage);
  ghost.scale=0.5;
  
  spookySound.loop();
  
}

function draw(){
 background("white");
  
  if (gameState==="play"){
    
  tower.velocityY = 5;
    
    //resetting the tower
  if (tower.y>600) {
      tower.y = 300;
      
      }
    //makes the ghost jump
  if (keyDown("space")){
    
    ghost.velocityY=-10;
  }
  // gravity effect
  ghost.velocityY=ghost.velocityY+0.5;
  
    //to move the ghost towards left
  if(keyDown("left")){
    
    ghost.x = ghost.x-2;
    
  }
    
  //to move the ghost towards right
  if(keyDown("right")){
    
    ghost.x= ghost.x+2;
  }
   
   //make the ghost climb on the climber
  if (climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
    
  }
    //ending the game when the ghost touches the climber from bottom
  if (invisibleBlockGroup.isTouching(ghost)|| ghost.y>600){
    
    gameState="end";
    
    ghost.destroy();
    
    
  }  
    doors();
    drawSprites();
  }
  
  else if (gameState==="end"){
    
    tower.velocityY = 0;
    textSize(50);
    stroke("black");
    strokeWeight(3);
    fill("red");
    text("Game Over",200,300);
  }
  
  
  

  
  
  
  
}

function doors(){
  if (frameCount%60===0){
    
    door=createSprite(200,0);
    door.addImage(doorImage);
    door.velocityY = 5;
    door.x= Math.round(random(100,500));
    door.lifetime = 120;
    doorsGroup.add(door);
    
    climber= createSprite(200,60);
    climber.addImage(climberImage);
    climber.velocityY= 5;
    climber.x = door.x;
    climber.lifetime=120;
    climberGroup.add(climber);
    
    invisibleBlock=createSprite(200,65);
    invisibleBlock.visible = false;
    invisibleBlock.velocityY= 5;
    invisibleBlock.x = door.x;
    invisibleBlock.lifetime= 120;
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.width = climber.width;
    
    door.depth = ghost.depth;
    ghost.depth=ghost.depth+1;
  }
  
  
  
}