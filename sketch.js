var canvasWidth = 1200;
var canvasHeight = 720;

var canvasScale = 1.7;

var terminalInput = '';
var cameraLock = false;

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
	},
	state: {
		a0: 0,
		a1: 0,
		a2: 0,
		a3: 0,
		a4: 0,
		g0: 0,
		h0: 0,
		h1: 0,
	}
};

var font_arial;
var font_tomorrow;
function preload() {
  font_arial = loadFont('/assets/arial.ttf');
	font_tomorrow = loadFont('/assets/Tomorrow-Regular.ttf');
  tr2.link.a0 = loadModel('/assets/link_a0.stl');
  tr2.link.a1 = loadModel('/assets/link_a1.stl');
  tr2.link.a2 = loadModel('/assets/link_a2.stl');
  tr2.link.a3 = loadModel('/assets/link_a3.stl');
  tr2.link.b0 = loadModel('/assets/link_b0.stl');
  tr2.link.b1 = loadModel('/assets/link_b1.stl');
  tr2.link.b2 = loadModel('/assets/link_b2.stl');
  tr2.link.b3 = loadModel('/assets/link_b3.stl');
  tr2.link.g0 = loadModel('/assets/link_g0.stl');
  tr2.link.g1 = loadModel('/assets/link_g1.stl');
  tr2.link.h0 = loadModel('/assets/link_h0.stl');
  tr2.link.h1 = loadModel('/assets/link_h1.stl');
}

function setup() {
  createCanvas(canvasWidth, canvasHeight, WEBGL);
	background(0);
	angleMode(DEGREES);
	perspective(60, width / height, 10, 15000);

	setupTerminal();

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
	if (frameCount % 3 != 0) {
		return;
	}

	background(0);

	moveCamera();

	drawPlane();
	drawLogo();
	drawModel(tr2);
	drawSun();
	drawMountains();
	drawTerminal(tr2);
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
	if (cameraLock == true) {
		return;
	}

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
	if (cameraLock == true) {
		return;
	}

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

	fill('white');
	textFont(font_tomorrow);
	textSize(250);
	text('Slate Robotics', -1000, -1100);
	pop();
}

function drawPlane () {
	push();
	stroke('magenta');
	strokeWeight(1);

	gridOffsetY += 1.5;
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
