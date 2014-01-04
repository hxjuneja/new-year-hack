New Year Hack
=============
JavaScript color detection app that reveals a new year message when a white, green or black paper is kept in front of the screen.
Built in few hours as a small proof of concept.

##How It Works

The app use WebRTC getUserMedia() to access the user camera and then insert the video stream into a HTML5 canvas element.
A Event is fired 60 times per second which loops on every pixel of the canvas element and search for a white color.
Every white pixel is made transparent and its position is saved into variable.
and then the result is again plot to the canvas element.

##Usage

run node server.js

Visit `ttp://localhost:3000/index`



