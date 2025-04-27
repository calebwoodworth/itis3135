// This script will create a simple interactive drawing using p5.js
function setup() {
    createCanvas(400, 400);  // Create a 400x400 canvas
    background(220);          // Set background color to light gray
}

function draw() {
    // Draw a red circle in the center of the canvas
    fill(255, 0, 0);  // Set fill color to red
    ellipse(200, 200, 100, 100);  // Draw a circle at (200, 200) with a width and height of 100

    // Optional: Add more interactive shapes or effects here
    // Example: Draw a circle that follows the mouse position
    fill(0, 255, 0);  // Change fill color to green
    ellipse(mouseX, mouseY, 50, 50);  // Draw a circle that follows the mouse
}
