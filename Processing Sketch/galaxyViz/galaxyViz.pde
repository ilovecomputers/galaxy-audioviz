//The MIT License (MIT) - See Licence.txt for details
//Copyright (c) 2013 Mick Grierson, Matthew Yee-King, Marco Gillies
//When running on the iPad or iPhone, you won't see anything unless you tap the screen.
//If it doesn't appear to work first time, always try refreshing the browser.

PImage bg;
PFont f;

Dong[][] a, b, c, d;

int nx = 20;
int ny = 20;

Maxim maxim;
AudioPlayer player;
float power = 0;
float threshold = 0.20;// vary this until the square appears on the beats
int wait = 0;
boolean playit = true;

float time = 0;
float rotation = 0;
float radius = 0;

void setup() {
  size(1024, 768); 
  bg = loadImage("night.png"); 
  
  f = createFont("Lekton-Regular.ttf", 15);
  textFont(f);
  textAlign(LEFT);
  
  maxim = new Maxim(this);
  player = maxim.loadFile("lemoncreme.wav"); //user lemoncreme on freesound.org
  player.setLooping(true);
  player.setAnalysing(true);

  a = new Dong[nx][ny];
  b = new Dong[nx][ny];
  c = new Dong[nx][ny];
//  d = new Dong[nx][ny];
  
  for (int x = 0; x<nx; x++) {
    for (int y = 0; y<ny; y++) {  
      a[x][y] = new Dong(65, 150);
      b[x][y] = new Dong(165, 250);
      c[x][y] = new Dong(265, 350);
//      d[x][y] = new Dong(365, 450);
    }
  }  
  noStroke();
  smooth();
}

void draw() {
  background(bg);
  frame.setTitle("");
  text("PEER ASSESSMENT #2", 50, height - 85);
  text("R. ROSE, 20 July 2014", 50, height - 60);
  
//  frameRate(20);
  Dong randomCircleA, randomCircleB, randomCircleC;
  radius = 10 + time; 
  translate(width/2, height/2);
  pushMatrix();
  
   if (playit) {
    player.play(); 
    power = player.getAveragePower();
    println(power);
    color fillColor;
    
    if (power > threshold) {
      randomCircleC = c[(int)random(15)][(int)random(15)];
      randomCircleC.isPicked = true;
      randomCircleC.update(power*random(400));
    }
    
//    else if (power < threshold && power > 0.18){
//      randomCircleB = b[(int)random(10)][(int)random(10)];
//      randomCircleB.isPicked = true;
//      randomCircleB.update(power*random(200));
//    }
    else{
      randomCircleB = b[(int)random(10)][(int)random(10)];
      randomCircleB.isPicked = true;
      randomCircleA = a[(int)random(5)][(int)random(5)];
      randomCircleA.isPicked = true;
      randomCircleA.update(power*random(100));
    }
  }

  rotate(frameCount*0.001);
  for (int x = 0; x<nx; x++) {
    for (int y = 0; y<ny; y++) {
      a[x][y].display();
      b[x][y].display();
      c[x][y].display();
//      d[x][y].display();
    }
  }
  popMatrix();  
}

class Dong {
  float x, y;
  float s0, s1;
  color fillColor;
  boolean isPicked = false;

  Dong(int circleSizeMin, int circleSizeMax) {
    float f= random(-PI, PI);
    x = cos(f)*random(circleSizeMin, circleSizeMax);
    y = sin(f)*random(circleSizeMin, circleSizeMax);
    s0 = random(2, 6);
  }

  void display() {
    if(!isPicked){
      fill(255);
    }
    else{
      fill(69, 243, 255, 255);
    }
    s1 += (s0-s1)*0.1;
    ellipse(x, y, s1, s1);
  }


  void update(float size) {
    if (isPicked = true){
      s1 = size;
    }
  }
}

