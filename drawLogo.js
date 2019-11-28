function drawLogo () {
	push();

	translate(tr2.position.x, tr2.position.y, 0);
	rotateZ(tr2.position.theta);

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
