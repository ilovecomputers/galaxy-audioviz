var nx = 20,
  ny = 20,
  a = [],
  b = [],
  c = [],
  threshold = 15,
  song,
  fft,
  avgFreqEnergy,
  i,
  j;

function preload() {
  song = loadSound('assets/lemoncreme.wav');
}
function setup() {
  createCanvas(1024, 768);
  noStroke();
  smooth();
  song.loop();
  fft = new p5.FFT();

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
  var randomCircleA,
    randomCircleB,
    randomCircleC;

  fft.analyze();
  avgFreqEnergy = fft.getEnergy(20, 14000);

  if (avgFreqEnergy > threshold) {
    randomCircleC = c[floor(random(15))][floor(random(15))];
    randomCircleC.isPicked = true;
    randomCircleC.update(avgFreqEnergy*random(4));
  } else {
    randomCircleB = b[floor(random(10))][floor(random(10))];
    randomCircleB.isPicked = true;
    randomCircleA = a[floor(random(5))][floor(random(5))];
    randomCircleA.isPicked = true;
    randomCircleA.update(avgFreqEnergy);
  }

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