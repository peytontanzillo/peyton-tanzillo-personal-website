// Values for Box Effect
let CANVAS_HALF = undefined;
let TOP_LEFT_POINT = undefined;
let TOP_RIGHT_POINT = undefined;
let BOTTOM_LEFT_POINT = undefined;
let BOTTOM_RIGHT_POINT = undefined;

let RECTANGLE_SIZE = undefined;

const RECTANGLE_DIVISOR = 2;

let canvas = undefined;
let ctx = undefined;

const colorPallete = {
  top: '#111111',
  left: '#222222',
  right: '#282828',
  bottom: '#333333',
  middle: '#444444',
};

const MOUSE_FOLLOW_INTENSITY_RECT = 10;

function drawTriangle(center, point1, point2, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(center.x, center.y);
  ctx.lineTo(point1.x, point1.y);
  ctx.lineTo(point2.x, point2.y);
  ctx.fill();
  ctx.closePath();
}

function getIntersect(center, point) {
  const slope = (point.y - center.y) / (point.x - center.x);
  const yIntercept = point.y + -(slope * point.x);
  let xVal = undefined;
  if (point.x === 0) {
    xVal = center.x - (RECTANGLE_SIZE.width / 2);
  } else {
    xVal = center.x + (RECTANGLE_SIZE.width / 2);
  }
  return {
    x: xVal,
    y: (slope * xVal) + yIntercept,
  };
}

function drawMiddle(center, color) {
  const firstPoint = getIntersect(center, TOP_LEFT_POINT);
  const points = [getIntersect(center, TOP_RIGHT_POINT), getIntersect(center, BOTTOM_RIGHT_POINT), getIntersect(center, BOTTOM_LEFT_POINT)];
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(firstPoint.x, firstPoint.y);
  for (const point of points) {
    ctx.lineTo(point.x, point.y);
  }
  ctx.fill();
  ctx.closePath();
}

function refreshCanvas(centerPos) {
  drawTriangle(centerPos, TOP_LEFT_POINT, TOP_RIGHT_POINT, colorPallete.top);
  drawTriangle(centerPos, TOP_LEFT_POINT, BOTTOM_LEFT_POINT, colorPallete.left);
  drawTriangle(centerPos, TOP_RIGHT_POINT, BOTTOM_RIGHT_POINT, colorPallete.right);
  drawTriangle(centerPos, BOTTOM_LEFT_POINT, BOTTOM_RIGHT_POINT, colorPallete.bottom);
  drawMiddle(centerPos, colorPallete.middle);
}

function calculateMouse(event, intensity) {
  if (CANVAS_HALF !== undefined) {
    const centerOffset = {
      x: event.clientX - CANVAS_HALF.x,
      y: event.clientY - CANVAS_HALF.y,
    };
    return {
      x: CANVAS_HALF.x + (centerOffset.x / intensity),
      y: CANVAS_HALF.y + (centerOffset.y / intensity),
    };
  }
  return {
    x: 0,
    y: 0,
  };
}

function shiftBox(event) {
  if (canvas !== null) {
    const rectCenter = calculateMouse(event, MOUSE_FOLLOW_INTENSITY_RECT);
    refreshCanvas(rectCenter);
  }
}

function resizeWindowBox() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  CANVAS_HALF = {
    x: canvas.width / 2,
    y: canvas.height / 2,
  };
  TOP_LEFT_POINT = {
    x: 0,
    y: 0,
  };
  TOP_RIGHT_POINT = {
    x: canvas.width,
    y: 0,
  };
  BOTTOM_LEFT_POINT = {
    x: 0,
    y: canvas.height,
  };
  BOTTOM_RIGHT_POINT = {
    x: canvas.width,
    y: canvas.height,
  };
  RECTANGLE_SIZE = {
    width: canvas.width / RECTANGLE_DIVISOR,
    height: canvas.height / RECTANGLE_DIVISOR,
  };
  refreshCanvas(CANVAS_HALF);
}

function loadCanvas() {
  canvas = document.getElementById('background-room');
  ctx = canvas.getContext('2d');
  resizeWindowBox();
  refreshCanvas(CANVAS_HALF);
}

window.addEventListener('resize', resizeWindowBox);
window.addEventListener('mousemove', shiftBox);
window.addEventListener('load', loadCanvas);
