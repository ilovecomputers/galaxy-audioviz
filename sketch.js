var numberOfStarGroups = 20,
  numberOfStarsPerGroup = 20,
  innerRing = [],
  middleRing = [],
  outerRing = [],
  threshold = 15,
  song,
  fft,
  avgFreqEnergy,
  starGroupIndex,
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

  for (starGroupIndex = 0; starGroupIndex < numberOfStarGroups; starGroupIndex++) {
    innerRing[starGroupIndex] = [];
    middleRing[starGroupIndex] = [];
    outerRing[starGroupIndex] = [];

    for (starIndex = 0; starIndex < numberOfStarsPerGroup; starIndex++) {
      innerRing[starGroupIndex][starIndex] = new Dong(65, 150);
      middleRing[starGroupIndex][starIndex] = new Dong(165, 250);
      outerRing[starGroupIndex][starIndex] = new Dong(265, 350);
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
    randomCircleC = outerRing[floor(random(15))][floor(random(15))];
    randomCircleC.isPicked = true;
    randomCircleC.update(avgFreqEnergy*random(4));
  } else {
    randomCircleB = middleRing[floor(random(10))][floor(random(10))];
    randomCircleB.isPicked = true;
    randomCircleA = innerRing[floor(random(5))][floor(random(5))];
    randomCircleA.isPicked = true;
    randomCircleA.update(avgFreqEnergy);
  }

  clear();
  translate(width / 2, height / 2);
  rotate(frameCount * 0.001);
  for (starGroupIndex = 0; starGroupIndex < numberOfStarGroups; starGroupIndex++) {
    for (starIndex = 0; starIndex < numberOfStarsPerGroup; starIndex++) {
      innerRing[starGroupIndex][starIndex].display();
      middleRing[starGroupIndex][starIndex].display();
      outerRing[starGroupIndex][starIndex].display();
    }
  }
}

function Dong(circleSizeMin, circleSizeMax) {
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