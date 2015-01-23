/*
  The Galaxy Audio Visualizer was originally created using Processing and ported over to the web using p5.js, but they
  both follow the same pattern for programming graphics. This pattern is simply to run the same function over and
  over (that function is called draw, which we would get to later). In that function we have drawing commands, like ellipse,
  who's values might change at each loop. This is what allows animation to occur.

  Unlike processing, p5.js wires into browser technologies. This means we have access to web audio, which allows us to
  analyze audio.
 */

var NUMBER_OF_STARS = 400,

  // We detect beat by the taking the average energy of all the, or a specific range of, frequencies. When that average
  // goes past the THRESHOLD limit we have set here, we consider that a beat.
  THRESHOLD = 15;

/**
 * When we detect a beat, we need a visual response. Rachel had many visualizations to choose from, but legends say that
 * a sky whale once visited her in a distant dream, bringing her the gift of the stars and that one episode of Futurama
 * where Bender meets God. This inspired her to visualize the beats as blinking stars swirling around a galaxy.
 *
 * It was either that or a galaxy demo she saw on openprocessing.org, but I like to think it was that sky whale.
 *
 * Now to draw a star in processing, we simply use the ellipse() function, but that function only takes xy coordinates
 * parameters to position our star. Ideally, a star is positioned radially from the galaxy's center. Meaning, we define a star's
 * position by it's distance from the center and at what angle it is on. This coordinate system is known as a polar coordinate
 * system (look it up in Wikipedia cause I'll use terminology from there).
 *
 * If you notice, when we create a star, we only pass in the minimum and maximum distance a star can be from the center
 * of the galaxy. That's because we randomly generate stars at each ring in the galaxy and we want to restrict each randomly
 * generated star within a radial coordinate range, so that each ring doesn't overlap with the other.
 */
function Star(minDistanceFromGalaxyCenter, maxDistanceFromGalaxyCenter) {

  // To generate a star (*cough* actually an eclipse drawing) we give it a random size and angular coordinate
  var randomAngle = random(-Math.PI, Math.PI),
    initialSize = random(2, 6),
    tempModifiedSize = 0,
    xCoordinate,
    yCoordinate;

  // Now if you remember SOH-CAH-TOA from based trigs(I meant to type basic, but trigs are totally based), you can deduce
  // the function we are using here to translate radial coordinates to xy coordinates:
  //   x = cosΘ * radius
  //   y = sinΘ * radius
  // The radius is randomly generated within our restricted radial coordinate range.
  xCoordinate = cos(randomAngle) * random(minDistanceFromGalaxyCenter, maxDistanceFromGalaxyCenter);
  yCoordinate = sin(randomAngle) * random(minDistanceFromGalaxyCenter, maxDistanceFromGalaxyCenter);

  // Let's not forget, we are visualizing beats and not teaching you trigs. If you remember from the demo, at each beat,
  // a random star becomes a giant blue star. A star's properties are set to change to big and blue when this
  // isPicked property is set to true. Sorry, I lied there a bit. The star doesn't just magically become big when this
  // property is true, we're just given access to change its size, which will be set to the average energy of the audio's
  // frequencies in a later code.
  //
  // Here's another thing, if you look around in this code, we never set isPicked back to false. A star remains blue. Was
  // that a mistake? Of course not! The sky whale asked for it. All glory to the wise sky whale!
  this.isPicked = false;

  // Here is where we set the size of the star and as was mentioned before, this is only allowed when the star is picked.
  // You're also wondering why we called the size variable _Temporary_ Modified Size. If you look back at the demo, the star's shrink
  // once they get big, so this modified size is only temporary.
  this.update = function update(size) {
    if (this.isPicked = true) {
      tempModifiedSize = size;
    }
  };

  // That shrinking is done here, inside our Star object's display() function. This here is the nucleus of our star.
  // It's not a fusion reactor, but you will find processing drawing commands based on our generated polar coordinates.
  this.display = function display() {

    // Here is where we set the color blue when our star is picked.
    if (!this.isPicked) {
      fill(255);
    } else {
      fill(69, 243, 255, 255);
    }

    // Here is that function that shrinks our stars (or grows it when tempModifiedSize is first 0; notice the fade in effect
    // when we first open our galaxy visualizer) and stabilizes at the radius set by initialSize. How? Think of it this way,
    // when initialSize === tempModifiedSize our function will become tempModifiedSize += 0 * 0.1. Which means the size of
    // our star never changes.
    //
    // By the way, because of floating points, initialSize and tempModifiedSize never become equal. Like y = 1/x, it
    // approaches 0, but never reaches it. Nonetheless, anytime tempModifiedSize deviates away from the initialSize
    // value, this function will pull it back to that value at each draw() loop, giving us our shrinking animation.
    tempModifiedSize += (initialSize - tempModifiedSize) * 0.1;

    // Finally, alas, glory to the great star whale, we draw the star on screen. Whether it is white, blue, or in the
    // midst of shrinking.
    ellipse(xCoordinate, yCoordinate, tempModifiedSize, tempModifiedSize);
  };
}

var innerRing = [],
  middleRing = [],
  outerRing = [],

  song,
  fft,
  avgFreqEnergy,
  starIndex;

/**
 * Before we even load our galaxy,
 */
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

