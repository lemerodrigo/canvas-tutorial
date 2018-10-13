
// Getting the DOM element.
const canvas = document.getElementById('my-canvas');

// Getting the 2d context.
const ctx = canvas.getContext('2d');

// Filling the canvas bg with some color.
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Rendering a circle.
// void ctx.arc(x, y, radius, startAngle, endAngle [, anticlockwise]);
ctx.beginPath();
ctx.arc(250, 250, 50, 0, Math.PI * 2, true);
ctx.closePath();
ctx.fillStyle = 'grey';
ctx.fill();


