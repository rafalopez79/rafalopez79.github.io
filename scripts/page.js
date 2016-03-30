var canvas = document.getElementById('canvas');
canvas.addEventListener("click", onClick, false);
var ctx = canvas.getContext('2d');
var numPoints = 100;
var pointw = 1.5;
var delta = 1;
var points = [];
var stop = false;

function onClick() {
	stop = !stop;
	window.requestAnimationFrame(draw);
};

function createPoint(canvas) {
	var x = Math.random() * canvas.width;
	var y = Math.random() * canvas.height;
	var color = randomColor();
	var point = {
		x : x,
		y : y,
		delta: delta,
		color : color
	};
	return point;
};

function createPointScoped(canvas, w, h) {
	var x = (-0.5 + Math.random()) * w + canvas.width / 2;
	var y = (-0.5 + Math.random()) * h + canvas.height / 2;
	var color = randomColor();
	var point = {
		x : x,
		y : y,
		delta: delta,
		color : color
	};
	return point;
};

function randomColor() {
	if (Math.random() > 0.75) {
		return 'rgb(' + Math.floor(255 * Math.random()) + ','
				+ Math.floor(255 * Math.random()) + ','
				+ Math.floor(255 * Math.random()) + ')';
	}
	return 'rgb(255,255,255)';
};

function init(document) {
	for (var i = 0; i < numPoints; i++) {
		points.push(createPoint(canvas));
	}
	window.requestAnimationFrame(draw);
};

function clearCanvas(context, canvas) {
	context.clearRect(0, 0, canvas.width, canvas.height);
	var w = canvas.width;
	canvas.width = 1;
	canvas.width = w;
};

function draw() {
	if (ctx) {
		var text = "Error 404: Ground Control Not Found";
		var tl = ctx.measureText(text).width;
		clearCanvas(ctx, canvas);
		var centerw = canvas.width / 2;
		var centerh = canvas.height / 2;
		for (var i = 0; i < numPoints; i++) {
			var point = points[i];
			ctx.fillStyle = point.color;
			ctx.fillRect(point.x, point.y, pointw, pointw);
			var delta = point.delta; 
			point.x = point.x > centerw ? point.x + delta : point.x - delta;
			point.y = point.y > centerh ? point.y + delta : point.y - delta;
			point.delta = delta + 0.25*Math.abs(point.x - centerw)/centerw; 
			if (point.x < 0 || point.x > canvas.width || point.y < 0
					|| point.y > canvas.height) {
				points.splice(i, 1);
				points.push(createPointScoped(canvas, canvas.width / 2.0,
						canvas.height / 2.0));
			}			
		}
		ctx.font = "48px monospace";
		ctx.fillStyle = "white";
		ctx.fillText(text, canvas.width / 2 - tl / 2, canvas.height / 2);
		if (!stop) {
			window.requestAnimationFrame(draw);
		}
	}
};