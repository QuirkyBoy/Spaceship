let rocket, astroids, rightWall, topWall, leftWall, bottomWall, exit, instructions, levelKeeper, liveKeeper, shipImage, bgImage, astroidImage, coinEffect, crashEffect, sadTromboneEffect, level, lives, noAstroids;

level = 1; //sets level variable to 1
lives = 4; //sets lives variable to 4
noAstroids = 200; //sets the number (no) of astroids to 200

function preload(){
  soundFormats("mp3");
  theme = loadSound("audio/music/theme.mp3")
  coinEffect = loadSound("audio/SFX/mario_coin_sound.mp3");
  crashEffect = loadSound("audio/SFX/glass_effect.mp3");

  planet = loadImage("images/planet.jpg");
}

function setup(){
  new Canvas();

  theme.play();

  astroids = new Group(); //creates group 'astroids'

  rocket = new Sprite(40, 300, 29, 11); //creates rocket
  rocket.img = "images/spaceship.png";
  rocket.layer = 1;

  exit = new Sprite(width-20, height/2, 20, 200, "static"); //creates exit for rocket
  exit.color = "cyan";

  rightWall = new Sprite(width, height/2, 15, height, "static"); //creates the right wall
  rightWall.color = "red";

  topWall = new Sprite(width/2, height, width, 15, "static"); //creates the top wall
  topWall.color = "red";

  leftWall = new Sprite(width/width, height/2, 15, height, "static"); //creates the left wall
  leftWall.color = "red";

  bottomWall = new Sprite(width/2, height/height, width, 15, "static"); //creates the bottom wall
  bottomWall.color = "red";

  levelKeeper = new Sprite(width-40, 40, 60, 60, "static"); //creates the sprite to display the level
  levelKeeper.color = "red";

  liveKeeper = new Sprite(width-105, 40, 60, 60, "static"); //creates the sprite to display lives
  liveKeeper.color = "red";

  instructions = new Sprite(width/2, height/2, width, height, "static"); //creates the sprite to display instructions
  instructions.color = "black";
  instructions.textColor = "red";
  instructions.textSize = 45;
  instructions.text = "The rocket propels itself towards your mouse *on each click* \n The aim is to reach the blue exit at the other side of the asteroid field \n If you hit an asteroid or a wall you'll lose a life, if you lose all 3 it's game over \n \n Level one is a practice, then it gets harder \n \n **DON'T CLICK UNTIL GAME STARTS**";
  instructions.life = 580; //removes instructions after n seconds
  instructions.layer = 100;
  instructions.overlaps(astroids); //makes it go over the other sprites to not affect gameplay
  instructions.overlaps(rocket); // ^ ^ ^ ^

  for (var i = 0;i<noAstroids;i++){
    astroid = new astroids.Sprite(random(100, width-100), random(height), 10, "triangle"); //creates n astroids between inserted coords
    astroid.img = "images/astroids.png";
    astroid.direction = random(360);
    astroid.speed = 0.05;
    astroid.bounciness = 0.8;
    astroid.layer = 1;
  } //end create astroids if
} //end setup function

function endGame(){
  console.log("game ending..."); //sends a message to the console
  gameOver = new Sprite(width/2, height/2, width, height, "static"); //creates a sprite to display endgame text
  gameOver.color = "red";
  gameOver.text = "GAME OVER - You made it to level " + level + "\n \n Press F5 to try and better your score \n \n Pls like my game";
  gameOver.textSize = 45;
} //end game over function

function draw() {
  background(255);

  imageMode(CENTER); //centers image
  image(planet, width/2, height/2, width, height); //inserts and formats background image

  astroids.rotationSpeed = 0; //stops sprites from rotating crazily
  rocket.rotationSpeed = 0; // ^ ^ ^ ^

  levelKeeper.textSize = 20;
  levelKeeper.textColor = "blue";
  levelKeeper.text = "Level:\n" + level; //displays level
  liveKeeper.textSize = 20;
  liveKeeper.textColor = "blue";
  liveKeeper.text = "Lives:\n" + lives; //displays lives

  if(mouse.presses()){
    rocket.moveTowards(mouse.x, mouse.y, 0.02); //tells rocket to move towards mouse at 0.02 speed when mouse is clicked
  }//end rocket movement

  if (rocket.collides(exit)){
    console.log("hit") //sends a message to console
    rocket.remove(); //removes rocket ready for reset
    astroids.remove(); // ^ ^ ^ ^
    coinEffect.play(); //plays sound effect
    level += 1; //increases level by 1

    rocket = new Sprite(40, 300, 29, 11); //remakes rocket
    rocket.img = "spaceship.png";
    rocket.layer = 1;

    for (var i = 0;i<noAstroids + 100;i++){
      astroid = new astroids.Sprite(random(100, width-100), random(height), 10, "triangle");
      astroid.img = "astroids.png";
      astroid.direction = random(360);
      astroid.speed = 0.1;
      astroid.bounciness = 0.8;
      astroid.layer = 1
      astroid.stroke = "black";
    } //end create astroids

  }else if (rocket.collides(astroids)){
    console.log("miss");
    lives -= 1;
    crashEffect.play(); //plays effect if you hit something
  }else if (rocket.collides(leftWall)){
    console.log("miss");
    lives -= 1;
    crashEffect.play();
  }else if (rocket.collides(rightWall)){
    console.log("miss");
    lives -= 1;
    crashEffect.play();
  }else if (rocket.collides(topWall)){
    console.log("miss");
    lives -= 1;
    crashEffect.play();
  }else if (rocket.collides(bottomWall)){
    console.log("miss");
    lives -= 1;
    crashEffect.play();
  } //end if

  if (lives == 0){
    console.log("Game_Over");
    endGame();
  }//end game over if
}//end draw
