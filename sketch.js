var canvasWidth = 1200;
var canvasHeight = 720;

var canvasScale = 1.7;

var gridMultiplier = 5;
var gridSize = canvasHeight / 10;
var gridOffsetY = 0;

var rotateDifX = 0;
var rotateDifZ = 0;

var mountains = [];

var tr2 = {
	link: {
		b0: '',
		b1: '',
		b2: '',
		b3: '',
		a0: '',
		a1: '',
		a2: '',
		a3: '',
		g0: '',
		g1: '',
		h0: '',
		h1: '',
	}
};

var font_arial;
function preload() {
  font_arial = loadFont('http://localhost:8000/assets/Retronoid.ttf');
  tr2.link.a0 = loadModel('http://localhost:8000/assets/link_a0.stl');
  tr2.link.a1 = loadModel('http://localhost:8000/assets/link_a1.stl');
  tr2.link.a2 = loadModel('http://localhost:8000/assets/link_a2.stl');
  tr2.link.a3 = loadModel('http://localhost:8000/assets/link_a3.stl');
  tr2.link.b0 = loadModel('http://localhost:8000/assets/link_b0.stl');
  tr2.link.b1 = loadModel('http://localhost:8000/assets/link_b1.stl');
  tr2.link.b2 = loadModel('http://localhost:8000/assets/link_b2.stl');
  tr2.link.b3 = loadModel('http://localhost:8000/assets/link_b3.stl');
  tr2.link.g0 = loadModel('http://localhost:8000/assets/link_g0.stl');
  tr2.link.g1 = loadModel('http://localhost:8000/assets/link_g1.stl');
  tr2.link.h0 = loadModel('http://localhost:8000/assets/link_h0.stl');
  tr2.link.h1 = loadModel('http://localhost:8000/assets/link_h1.stl');
}

function setup() {
  createCanvas(canvasWidth, canvasHeight, WEBGL);
	background(0);
	angleMode(DEGREES);
	perspective(60, width / height, 10, 20000);

	for (var x = -canvasWidth * 5; x <= canvasWidth * 5 ; x += random(300, 500)) {
		var x1 = x + random(-250, 250);
		var y1 = -12.5;
		var x2 = x + random(500, 750);
		var y2 = -12.5;
		var x3 = random(x1, x2);
		var y3 = -12.5 - random(300, 750);
	  mountains.push([x1, y1, x2, y2, x3, y3]);
	}
}

function draw() {
	background(0);

	moveCamera();

	drawPlane();
	drawLogo();
	drawModel(tr2);
	drawSun();
	drawMountains();
}

function moveCamera () {
	scale(canvasScale);

	var defaultX = 80;
	var defaultZ = 150;
	var angleX = defaultX + rotateDifZ;
	var angleZ = defaultZ + rotateDifX;

	if (angleX > 80) {
		angleX = 80;
		rotateDifZ = 80 - defaultX;
	} else if (angleX < 45) {
		angleX = 45;
		rotateDifZ = 45 - defaultX;
	}

	rotateX(angleX);
	rotateZ(angleZ);
	translate(0, 0, -120);
}

var lastX;
var lastY;

var minScale = 1.0;
var maxScale = 2.0;
var mWheelVar = 0;
function mouseWheel (event) {
	canvasScale = canvasScale - event.delta / 500.0;
	if (canvasScale > maxScale) {
		canvasScale = maxScale;
	} else if (canvasScale < minScale) {
		canvasScale = minScale;
	}
}

function mouseClicked() {
	lastX = '';
	lastY = '';
}

function mouseDragged() {
	if (!lastX) {
		lastX = mouseX;
	}
	if (!lastY) {
		lastY = mouseY;
	}

	rotateDifX = rotateDifX + ((lastX - mouseX) / 10);
	rotateDifZ = rotateDifZ + ((lastY - mouseY) / 10);

	lastX = mouseX;
	lastY = mouseY;
}

function polygon(x, y, radius, npoints) {
  let angle = 360 / npoints;
  beginShape();
  for (let a = 0; a <= 360; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
		vertex(sx, sy);
  }
  endShape(CLOSE);
}

function drawMountains () {
	push();
	translate(0, canvasHeight * 5, 0);
	rotateX(-90);

	stroke('cyan');
	fill('black');
	strokeWeight(4);

	for (var i = 0; i < mountains.length; i++) {
		var t = mountains[i];
		triangle(t[0], t[1], t[2], t[3], t[4], t[5]);
	}
	pop();
}

function drawLogo () {
	push();
	stroke('cyan');
	fill('cyan');
	rotateZ(90)
  polygon(0, 0, 100, 6);

	noFill();
	polygon(0, 0, 100 + (frameCount % 600) * 0.2, 6);
	polygon(0, 0, 100 + (frameCount % 510) * 0.2, 6);
	polygon(0, 0, 100 + (frameCount % 380) * 0.2, 6);
	pop();
}

function drawSun () {
	push();
	translate(0, (canvasHeight * 6) + 15, 0);
	rotateX(-90);

	stroke('orange');
	fill('orange');
	translate(0, 0, -10);
	circle(-2000, -1250, 2000);
	pop();

	push();
	translate(0, (canvasHeight * 6) + 15, 0);
	rotateX(90);
	rotateZ(180);

	fill('red');
	textFont(font_arial);
	textSize(150);
	text('Slate Robotics', -1000, -1100);
	pop();
}

function drawPlane () {
	push();
	stroke('magenta');
	strokeWeight(1);

	gridOffsetY += 0.5;
	if (gridOffsetY >= gridSize) {
		gridOffsetY -= gridSize;
	}

	for (var x = -canvasWidth * 5; x <= canvasWidth * 5; x += gridSize) {
		line(x, -canvasHeight * gridMultiplier, x, canvasHeight * gridMultiplier);
	}

	for (var y = -canvasHeight * 5; y <= canvasHeight * 5; y += gridSize) {
		line(-canvasWidth * gridMultiplier, y + gridOffsetY, canvasWidth * gridMultiplier, y + gridOffsetY);
	}
	pop();
}
