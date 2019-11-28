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

	translate(-tr2.position.x, -tr2.position.y, 0);
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
