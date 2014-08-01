Here is a link to it working: https://vimeo.com/101334922

(please note that in this code, I took out the original sound file because I wasn't sure about distributing someone else's music... but you can find the song here: https://soundcloud.com/kygo/the-xx-angels-kygo-edit and at the time of writing it is available for download there)

////////

This is my second project for the online Coursera course, "Creative Programming for Digital Media & Mobile Apps." It is built using the course lecturers' audio framework (Maxim) which has some basic beat detection in it.

I adapted some example code from the controlP5 library (specifically the controlP5matrix example code) that has a custom class for making particles, which modified. 

Each ring of particles is made with a 2D array using the sin and cos functions to map x and y for each particle in each ring. I modified the code by parameterizing the min and max values for sin and cos functions like this: x = cos(f)*random(min, max); y = sin(f)*random(min, max); so that I could essentially change how big each circle is. I used three of these 2D arrays and sized them to look like concentric rings. 

I was inspired by some of the galaxy projects I saw on openprocessing.org and wanted to see if I could apply that to an audio visualization.

I used a threshold for beat detection like the one used in the example and played around with it until I found something that looked decent. If the average calculated power was greater than the threshold, it made some of the particles in the outer ring get bigger (based on that value). If it was less, some of the particles in the inner ring got bigger, but I made made it so that they couldn't get too big - I wanted them to look smaller since they were in the inner ring, if that makes sense. The particles that were affected by the power/threshold were randomly chosen and filled with a bright blue color.

All of the circles rotate based on the frameCount (specifically, frameCount *0.001 to make it slow). A potential improvement could be to make the rings move independently like the basic rotation sketch (e.g., the inner ring would rotate slower than the outer rings). I might try to make it 3D in the future and incorporate some interaction with mousePressed()/mouseDragged() to enable moving the galaxy around. I also wanted to code the static background stars, but instead I ended up using a PImage, and the image is licensed under Creative Commons.

I had a hard time figuring out how to use fill() to affect only the randomly chosen particles but found this forum post really helpful for getting it right: forum.processing.org/one/topic/beginner-s-question-about-changing-the-fill-of-one-object.html

music: angels - the xx (kygo edit) (no copyright infringement intended)