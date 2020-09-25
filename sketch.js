const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions =[];

var divisionHeight = 300;
var score = 0;
var turn = 0;
var particle;

var gameState ="start";

function setup()
{
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width/2, height, width, 20);

  for (var k = 0; k <= width; k = k + 80)
  {
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }

  for (var i = 75; i <= width; i = i + 50)
  {  
    plinkos.push(new Plinko(i, 75));
  }

  for (var j = 50; j <= width-10; j = j + 50)
  {  
    plinkos.push(new Plinko(j, 175));
  }

  for (var l = 75; l <= width; l = l + 50)
  {  
    plinkos.push(new Plinko(l, 275));
  }

  for (var m = 50; m <= width-10; m = m + 50)
  {  
    plinkos.push(new Plinko(m, 375));
  }
}

function draw()
{
  background("black");

  textSize(35);
  text("Score : "+score,20,40);
  fill("white");

  textSize(35)
  text(" 500 ", 5, 550);
  text(" 500 ", 85, 550);
  text(" 500 ", 165, 550);
  text(" 500 ", 245, 550);
  text(" 100 ", 325, 550);
  text(" 100 ", 405, 550);
  text(" 100 ", 485, 550);
  text(" 200 ", 565, 550);
  text(" 200 ", 645, 550);
  text(" 200 ", 725, 550);

  Engine.update(engine);
  
  if (gameState === "end")
  {
    textSize(100);
    text("GameOver", 150, 250);
  }

  for (var i = 0; i < plinkos.length; i++)
  {
    plinkos[i].display();
  }
  
  if(particle != null)
  {
    particle.display();

    var pos = particle.body.position;
    if (pos.y > 760)
    {
      if (pos.x < 320 && pos.x > 0)
      {
        score = score + 500;
      }
      else if (pos.x < 600 && pos.x > 321)
      {
        score = score + 100;
      }
      else if (pos.x < 800 && pos.x > 601)
      {
        score = score + 200;
      }

      particle = null;
      if (turn >= 5)
      {
        gameState ="end";
      }
    }
  }

  for (var j = 0; j < particles.length; j++)
  {
    particles[j].display();
  }

  for (var k = 0; k < divisions.length; k++)
  {
    divisions[k].display();
  }

  ground.display();
}

function mousePressed()
{
  if(gameState !== "end")
  {
    turn++;
    particle = new Particle(mouseX, 10, 10, 10);
    particles.push(particle);
  }   
}