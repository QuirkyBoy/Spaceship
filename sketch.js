let rocket, astroid, rightWall, topWall, leftWall, bottomWall, exit, spaceImage

level = 1
lives = 3
noAstroids = 300

function preload(){
  spaceImage = loadImage("Planets.jpg");
  spaceship = loadImage("Spaceship.png");
}

function setup(){
	new Canvas();

	astroids = new Group();
	rocket = new Sprite(40, 300, 40, "triangle");
	rocket.img = "Spaceship.png";
  rocket.diameter = 1;
	rocket.stroke = 'white'
  rocket.layer = 1
	
  exit = new Sprite(width-20, height/2, 20, 200, "static");
	exit.color = "cyan";

	rightWall = new Sprite(width, height/2, 15, height, "static");
	rightWall.color = "red";

	topWall = new Sprite(width/2, height, width, 15, "static");
	topWall.color = "red";

	leftWall = new Sprite(width/width, height/2, 15, height, "static");
	leftWall.color = "red";

	bottomWall = new Sprite(width/2, height/height, width, 15, "static");
	bottomWall.color = "red";

	levelKeeper = new Sprite(width-40, 40, 60, 60, "static");
	levelKeeper.color = "red";
  liveKeeper = new Sprite(width-105, 40, 60, 60, "static");
  liveKeeper.color = "red";
  
	for (var i = 0;i<noAstroids;i++){
        astroid = new astroids.Sprite(random(100, width-100), random(height), 10, "triangle");
        astroid.color = "grey";
        astroid.direction = random(360);
        astroid.speed = 0.1;
    	  astroid.bounciness = 0.8;
        astroid.layer = 1
        astroids.stroke = "black";
  }
    //moved the instruction block down after the rockets and astroids MrsJ
    instructions = new Sprite(width/2, height/2, width, height, "static");
    instructions.color = "black";
    instructions.textColor = "red";
    instructions.textSize = 45;
    instructions.text = "The rocket propels itself towards your mouse *on each click* \n The aim is to reach the blue exit at the other side of the asteroid field \n If you hit an asteroid or a wall you'll lose a life, if you lose all 3 it's game over";
    instructions.life = 100;
    instructions.layer = 100;
    instructions.overlaps(astroids) //added MrsJ
    instructions.overlaps(rocket) //added MrsJ
}//end setup function


function draw() {
      background(10);
  
      imageMode(CENTER);
      image(spaceImage, width/2, height/2, width, height);

      rocket.rotationSpeed = 0;
  
    	levelKeeper.textSize = 20;
    	levelKeeper.textColor = "blue";
    	levelKeeper.text = "Level:\n" + level;
      liveKeeper.textSize = 20;
      liveKeeper.textColor = "blue";
      liveKeeper.text = "Lives:\n" + lives;

    	if (rocket.collides(exit)){
    		console.log("hit");
    		level += 1;
    		rocket.remove();
    		astroids.remove();
        
        rocket = new Sprite(40, 300, 40, "triangle");
        rocket.color = "red";
        rocket.stroke = 'white';
        rocket.layer = 1;

        for (var i = 0;i<noAstroids + 75;i++){
          astroid = new astroids.Sprite(random(100, width-100), random(height), 10, "triangle");
          astroid.color = "grey";
          astroid.direction = random(360);
          astroid.speed = 0.1;
          astroid.bounciness = 0.8;
          astroid.layer = 1
          astroid.stroke = "black";
        }
    	}
    
    	if (rocket.collides(astroids)){
    		console.log("miss");
    		lives -= 1;
    	}else if (rocket.collides(leftWall)){
    		console.log("miss");
    		lives -= 1;
    	}else if (rocket.collides(rightWall)){
    		console.log("miss");
    		lives -= 1;
    	}else if (rocket.collides(topWall)){
    		console.log("miss");
    		lives -= 1;
    	}else if (rocket.collides(bottomWall)){
    		console.log("miss");
    		lives -= 1;
    	}
    
  function endGame(){
      console.log("game ending...")
      astroids.remove()
      rocket.remove()
      gameOver = new Sprite(width/2, height/2, width, height, "static");
      gameOver.text = "GAME OVER - You made it to level " + level + "\n \n Press F5 to try and better your score";
      gameOver.textSize = 45;
      gameOver.color = "red";
  }
  
  if (lives == 0){
    	console.log("Game_Over");
      endGame()
    }//end game over if statement
}//end draw function

function mouseClicked(){
  rocket.moveTowards(mouse.x, mouse.y, 0.01);
}

