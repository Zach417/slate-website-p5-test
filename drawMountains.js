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
