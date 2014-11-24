var nx = 20,
  ny = 20,
  a = [],
  b = [],
  c = [],
  sound,
  fft,
  i,
  j;

function preload() {
  sound = loadSound('assets/lemoncreme.wav');
}
function setup() {
  createCanvas(1024, 768);
  noStroke();
  smooth();
  sound.loop();

  for (i = 0; i < nx; i++) {
    a[i] = [];
    b[i] = [];
    c[i] = [];

    for (j = 0; j < ny; j++) {
      a[i][j] = new Dong(65, 150);
      b[i][j] = new Dong(165, 250);
      c[i][j] = new Dong(265, 350);
    }
  }
}

function draw() {
  clear();
  translate(width / 2, height / 2);
  rotate(frameCount * 0.001);
  for (i = 0; i < nx; i++) {
    for (j = 0; j < ny; j++) {
      a[i][j].display();
      b[i][j].display();
      c[i][j].display();
    }
  }
}

function Dong(circleSizeMin, circleSizeMax) {
  var isPicked = false,
    f = random(-Math.PI, Math.PI),
    s0 = random(2, 6),
    s1 = 0,
    x,
    y;

  x = cos(f) * random(circleSizeMin, circleSizeMax);
  y = sin(f) * random(circleSizeMin, circleSizeMax);

  this.display = function display() {
    if (!isPicked) {
      fill(255);
    } else {
      fill(69, 243, 255, 255);
    }
    s1 += (s0 - s1) * 0.1;
    ellipse(x, y, s1, s1);
  };


  this.update = function update(size) {
    if (isPicked = true) {
      s1 = size;
    }
  };
}