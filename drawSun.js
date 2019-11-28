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
