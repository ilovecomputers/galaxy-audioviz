var NUMBER_OF_STARS = 400,
  THRESHOLD = 15,
  innerRing = [],
  middleRing = [],
  outerRing = [],
  song,
  fft,
  avgFreqEnergy,
  starIndex;

function preload() {
  song = loadSound('assets/lemoncreme.wav');
}
function setup() {
  createCanvas(1024, 768);
  noStroke();
  smooth();
  song.loop();
  fft = new p5.FFT();

  for (starIndex = 0; starIndex < NUMBER_OF_STARS; starIndex++) {
    innerRing[starIndex] = new Star(65, 150);
    middleRing[starIndex] = new Star(165, 250);
    outerRing[starIndex] = new Star(265, 350);
  }

}

function draw() {
  var randomCircleA,
    randomCircleB,
    randomCircleC;

  fft.analyze();
  avgFreqEnergy = fft.getEnergy(20, 14000);

  if (avgFreqEnergy > THRESHOLD) {
    randomCircleC = outerRing[floor(random(225))];
    randomCircleC.isPicked = true;
    randomCircleC.update(avgFreqEnergy*random(4));
  } else {
    randomCircleB = middleRing[floor(random(100))];
    randomCircleB.isPicked = true;
    randomCircleA = innerRing[floor(random(25))];
    randomCircleA.isPicked = true;
    randomCircleA.update(avgFreqEnergy);
  }

  clear();
  translate(width / 2, height / 2);
  rotate(frameCount * 0.001);
  for (starIndex = 0; starIndex < NUMBER_OF_STARS; starIndex++) {
    innerRing[starIndex].display();
    middleRing[starIndex].display();
    outerRing[starIndex].display();
  }
}

function Star(circleSizeMin, circleSizeMax) {
  var randomAngle = random(-Math.PI, Math.PI),
    initialSize = random(2, 6),
    tempModifiedSize = 0,
    xCoordinate,
    yCoordinate;

  xCoordinate = cos(randomAngle) * random(circleSizeMin, circleSizeMax);
  yCoordinate = sin(randomAngle) * random(circleSizeMin, circleSizeMax);

  this.isPicked = false;

  this.display = function display() {
    if (!this.isPicked) {
      fill(255);
    } else {
      fill(69, 243, 255, 255);
    }
    tempModifiedSize += (initialSize - tempModifiedSize) * 0.1;
    ellipse(xCoordinate, yCoordinate, tempModifiedSize, tempModifiedSize);
  };


  this.update = function update(size) {
    if (this.isPicked = true) {
      tempModifiedSize = size;
    }
  };
}