var divBackground;

var sliderA0;
var sliderA1;
var sliderA2;
var sliderA3;
var sliderA4;
var sliderG0;
var sliderH0;
var sliderH1;

var labelA0;
var labelA1;
var labelA2;
var labelA3;
var labelA4;
var labelG0;
var labelH0;
var labelH1;

function sliderFocused () {
	cameraLock = true;
}

function sliderBlurred () {
	cameraLock = false;
}

function setupTerminal() {
	divBackground = createDiv();
  divBackground.style('background-color', 'rgba(100, 100, 100, 0.5)');
  divBackground.style('width', '270px');
  divBackground.style('height', '215px');

  labelA0 = createElement('h2', 'A0');
  labelA0.style('font-family', 'tomorrow-regular');
  labelA0.style('color', 'white');

  labelA1 = createElement('h2', 'A1');
  labelA1.style('font-family', 'tomorrow-regular');
  labelA1.style('color', 'white');

  labelA2 = createElement('h2', 'A2');
  labelA2.style('font-family', 'tomorrow-regular');
  labelA2.style('color', 'white');

  labelA3 = createElement('h2', 'A3');
  labelA3.style('font-family', 'tomorrow-regular');
  labelA3.style('color', 'white');

  labelA4 = createElement('h2', 'A4');
  labelA4.style('font-family', 'tomorrow-regular');
  labelA4.style('color', 'white');

  labelG0 = createElement('h2', 'G0');
  labelG0.style('font-family', 'tomorrow-regular');
  labelG0.style('color', 'white');

  labelH0 = createElement('h2', 'H0');
  labelH0.style('font-family', 'tomorrow-regular');
  labelH0.style('color', 'white');

  labelH1 = createElement('h2', 'H1');
  labelH1.style('font-family', 'tomorrow-regular');
  labelH1.style('color', 'white');

  sliderA0 = createSlider(0, 180, 0);
  sliderA0.style('width', '150px');
	sliderA0.elt.onfocus = sliderFocused;
	sliderA0.elt.onblur = sliderBlurred;

  sliderA1 = createSlider(-360, 360, 0);
  sliderA1.style('width', '150px');
	sliderA1.elt.onfocus = sliderFocused;
	sliderA1.elt.onblur = sliderBlurred;

  sliderA2 = createSlider(-360, 360, 0);
  sliderA2.style('width', '150px');
	sliderA2.elt.onfocus = sliderFocused;
	sliderA2.elt.onblur = sliderBlurred;

  sliderA3 = createSlider(-360, 360, 0);
  sliderA3.style('width', '150px');
	sliderA3.elt.onfocus = sliderFocused;
	sliderA3.elt.onblur = sliderBlurred;

  sliderA4 = createSlider(-360, 360, 0);
  sliderA4.style('width', '150px');
	sliderA4.elt.onfocus = sliderFocused;
	sliderA4.elt.onblur = sliderBlurred;

  sliderG0 = createSlider(0.0, 100, 0);
  sliderG0.style('width', '150px');
	sliderG0.elt.onfocus = sliderFocused;
	sliderG0.elt.onblur = sliderBlurred;

  sliderH0 = createSlider(-180, 180, 0);
  sliderH0.style('width', '150px');
	sliderH0.elt.onfocus = sliderFocused;
	sliderH0.elt.onblur = sliderBlurred;

  sliderH1 = createSlider(-180, 180, 0);
  sliderH1.style('width', '150px');
	sliderH1.elt.onfocus = sliderFocused;
	sliderH1.elt.onblur = sliderBlurred;

  //terminalInput = createInput();
  //terminalInput.position(20, 65);
}

function drawTerminal (tr2) {
	push();
	divBackground.position(canvasWidth - 270, canvasHeight - 215);

	sliderA0.position(canvasWidth - 190, canvasHeight - 205);
  sliderA1.position(canvasWidth - 190, canvasHeight - 180);
  sliderA2.position(canvasWidth - 190, canvasHeight - 155);
  sliderA3.position(canvasWidth - 190, canvasHeight - 130);
  sliderA4.position(canvasWidth - 190, canvasHeight - 105);
  sliderG0.position(canvasWidth - 190, canvasHeight - 80);
  sliderH0.position(canvasWidth - 190, canvasHeight - 55);
  sliderH1.position(canvasWidth - 190, canvasHeight - 30);

	labelA0.position(canvasWidth - 240, canvasHeight - 230);
	labelA1.position(canvasWidth - 240, canvasHeight - 205);
	labelA2.position(canvasWidth - 240, canvasHeight - 180);
	labelA3.position(canvasWidth - 240, canvasHeight - 155);
	labelA4.position(canvasWidth - 240, canvasHeight - 130);
	labelG0.position(canvasWidth - 240, canvasHeight - 105);
	labelH0.position(canvasWidth - 240, canvasHeight - 80);
	labelH1.position(canvasWidth - 240, canvasHeight - 55);
	pop();

	tr2.state.a0 = sliderA0.value();
	tr2.state.a1 = sliderA1.value();
	tr2.state.a2 = sliderA2.value();
	tr2.state.a3 = sliderA3.value();
	tr2.state.a4 = sliderA4.value();
	tr2.state.g0 = sliderG0.value();
	tr2.state.h0 = sliderH0.value();
	tr2.state.h1 = sliderH1.value();
}

function keyPressed () {
	if (keyCode == 13) {
		var cmd = terminalInput.value();
		parseCommand(tr2, cmd);
		terminalInput.value("");
	}
}

function parseCommand(tr2, cmd) {
	var args = cmd.split(' ');
	if (args[0] == "rostopic") {
		if (args[1] == "pub") {
			var aid = args[2].split('/')[3];
			console.log(aid);
			var pos = args[4];
			tr2.state[aid] = pos;
		}
	}
}
