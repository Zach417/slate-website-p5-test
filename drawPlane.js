function drawPlane () {
	push();
	stroke('magenta');
	strokeWeight(1);

	//gridOffsetY += 1.5;
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
