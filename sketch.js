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
	position: {
		theta: 0,
		x: 0,
		y: 0,
	},
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
