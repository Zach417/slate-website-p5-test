function drawModel (tr2) {
	translate(0, 0, 15);
	translate(tr2.position.x, tr2.position.y, 0);
	rotateZ(tr2.position.theta);

	drawLink(tr2.link.b0, 90, -90, 0, 0, 0, 0);
	drawLink(tr2.link.b1, 0, 0, 0, 301.9, -150.2, 50.8, function () {
		rotateX(frameCount);
	});
	drawLink(tr2.link.b1, 0, 0, 0, -301.9, -150.2, 50.8, function () {
		rotateX(frameCount);
	});

	var arm = new Chain();
	arm.chain.push([tr2.link.a0, 90, 0, 0, 93.3, 729.2, 128.2, function () {
		rotateY(-90);
		rotateY(tr2.state.a0);
	}.bind(tr2)]);
	arm.chain.push([tr2.link.a1, 180, 0, -90, 89.7, 80.0, -214.6, function () {
		rotateY(-90);
		rotateY(tr2.state.a1);
	}.bind(tr2)]);
	arm.chain.push([tr2.link.a2, 90, -90, 0, -109.7, 166.9, 0, function () {
		rotateY(tr2.state.a2);
	}.bind(tr2)]);
	arm.chain.push([tr2.link.a1, 180, 0, -90, 154.4, 80.0, 0, function () {
		rotateY(20);
		rotateY(tr2.state.a3);
	}.bind(tr2)]);
	arm.chain.push([tr2.link.g0, 90, 90, 0, 109.7, 166.9, 0, function () {
		rotateY(tr2.state.a4);
	}.bind(tr2)]);
	arm.chain.push([tr2.link.g1, -90, 0, 90, 0, -7.5, 135, function () {
		translate(0, -5);
		translate(0, tr2.state.g0 / 100.0 * -40);
	}.bind(tr2)]);
	arm.chain.push([tr2.link.g1, 0, 0, 0, 0, 7.5, 0, function () {
		translate(0, 10);
		translate(0, tr2.state.g0 / 100.0 * 80);
	}.bind(tr2)]);
	arm.draw();

	var head = new Chain();
	head.chain.push([tr2.link.h0, -90, 0, 180, 0, 907.1, 122.7, function () {
		rotateY(tr2.state.h0);
	}]);
	head.chain.push([tr2.link.h1, 180, 0, 0, 68.8, -161.4, 174.5, function () {
		rotateX(-20);
		rotateX(tr2.state.h1);
	}]);
	head.draw();

	rotateZ(-tr2.position.theta);
	translate(-tr2.position.x, -tr2.position.y, 0);
	translate(0, 0, -15);
}

var Chain = function () {
	this.chain = [];

	this.draw = function () {
		push();
		scale(0.2);

		directionalLight(250, 250, 250, 500, -1250, -500);
		noStroke();
		ambientMaterial(100);

		for (var i = 0; i < this.chain.length; i++) {
			var chainLink = this.chain[i];

			var link = chainLink[0];
			var r_x = chainLink[1];
			var r_y = chainLink[2];
			var r_z = chainLink[3];
			var x = chainLink[4];
			var y = chainLink[5];
			var z = chainLink[6];
			var animate = chainLink[7];

			rotateX(r_x);
			rotateY(r_y);
			rotateZ(r_z);
			translate(x, y, z);

			if (animate) {
				animate();
			}

			model(link);
		}

		pop();
	}
}

function drawLink(link, r_x, r_y, r_z, x, y, z, animate) {
	push();
	scale(0.2);

	directionalLight(250, 250, 250, 500, -1250, -500);
	noStroke();
	ambientMaterial(100);

	rotateX(r_x);
	rotateY(r_y);
	rotateZ(r_z);
	translate(x, y, z);

	if (animate) {
		animate();
	}

	model(link);

	pop();
}
