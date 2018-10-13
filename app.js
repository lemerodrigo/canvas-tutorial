
// Getting the DOM element.
const canvas = document.getElementById('my-canvas');

// Getting the 2d context.
const ctx = canvas.getContext('2d');

// Our looper control.
let looper;

// Out X value that will be incremented.
let rectX = 0;

// Stops the animation.
const stopLooper = () => clearInterval(looper);

// Function that draws the rectangle.
const drawRectangle = (x) => {
  // Stops the animation when the rectangle reaches the end.
  if (x > canvas.width - 50) {
    stopLooper();
  }
  ctx.fillStyle = 'grey';
  ctx.fillRect(x, 0, 50, 50);
};

// Each loop we call render function.
const render = () => {
  // We clean everything in the canvas.
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Call the function that draws the rectangle incrementing x.
  drawRectangle(rectX += 1);
}

// Starting looper.
looper = setInterval(render, 0);
