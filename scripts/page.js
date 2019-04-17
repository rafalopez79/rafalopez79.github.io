//(function() {
	'use strict';
	var canvas = document.getElementById('canvas');
	var overlay = document.getElementById('overlay');
	var background = document.getElementById('background');
	overlay.addEventListener("click", onClick, false);
	overlay.addEventListener("mousemove", getOnMouseMove(), false);
	var timeout = 25;
	var ctx = canvas.getContext('2d');
	var numPoints = 100;
	var pointw = 1.5;
	var delta = 0.04;
	var points = [];
	var stop = false;

	function onClick() {
		stop = !stop;
		if (!stop) {
			window.requestAnimationFrame(draw);
		}
	};

	var spot = {
		x : 0,
		y : 0
	};
	function getOnMouseMove() {
		var prevx = undefined;
		var prevy = undefined;
		return function(event) {			 
			 var rect = canvas.getBoundingClientRect();
			 var cw = canvas.width;
			 var ch = canvas.height;
			 var scalew = cw / rect.width;
			 var scaleh = ch / rect.height;
			 var x = event.clientX - rect.left;
			 var y = event.clientY - rect.top;
			 var px = x * scalew;
			 var py = y * scaleh;
			 if (prevx != undefined && prevy != undefined){
			   spot.x = px - cw/2;
			   spot.y = py - ch/2;
			 }
			 prevx = px;
			 prevy = py;
			 $('#background').css('background-position', prevx+'px '+prevy+'px');
		};
	}
	;

	function onTimeOut() {
		// var cw = canvas.width;
		// var ch = canvas.height;
		// var centerw = cw/2;
		// var centerh = ch/2;
		// var delta = 0.5;
		// spot.x = spot.x + centerw < centerw ? spot.x + delta : spot.x -
		// delta;
		// spot.y = spot.y + centerh < centerh ? spot.y + delta : spot.y -
		// delta;
		// if (Math.abs(spot.x) <= delta){
		// spot.x = 0;
		// }
		// if (Math.abs(spot.y) <= delta){
		// spot.y = 0;
		// }
	}
	;

	function createPoint(canvas) {
		var rmax = Math.max(canvas.width, canvas.height) / 2;
		var r = Math.random() * rmax;
		var theta = Math.random() * 2 * Math.PI;
		var color = randomColor();
		var point = {
			r : r,
			theta : theta,
			delta : delta,
			color : color
		};
		return point;
	}
	;

	function createPointScoped(canvas, w, h) {
		var rmax = Math.max(w, h) / 2;
		var r = Math.random() * rmax;
		var color = randomColor();
		var theta = Math.random() * 2 * Math.PI;
		var d = delta * Math.random();
		var point = {
			r : r,
			theta : theta,
			delta : d,
			color : color
		};
		return point;
	}
	;

	function randomColor() {
		if (Math.random() > 0.75) {
			return 'rgb(' + Math.floor(255 * Math.random()) + ','
					+ Math.floor(255 * Math.random()) + ','
					+ Math.floor(255 * Math.random()) + ')';
		}
		return 'rgb(255,255,255)';
	}
	;

	function init(document) {
		for (var i = 0; i < numPoints; i++) {
			points.push(createPoint(canvas));
		}
		spot.x = 0;
		spot.y = 0;
		stop = false;
		window.requestAnimationFrame(draw);
	}
	;

	function clearCanvas(context, canvas) {
		context.clearRect(0, 0, canvas.width, canvas.height);
		var w = canvas.width;
		canvas.width = 1;
		canvas.width = w;
	}
	;

	function draw() {
		if (ctx) {
			// onTimeOut();
			var text = "Error 404: Ground Control Not Found";
			var tl = ctx.measureText(text).width;
			clearCanvas(ctx, canvas);
			var radius = 10;
			var centerw = canvas.width / 2; // + spot.x ;
			var centerh = canvas.height / 2; // + spot.y ;
			// hud
			// ctx.strokeStyle='rgb(0,255,0)';
			// ctx.beginPath();
			// ctx.arc(centerw - radius/2, centerh - radius/2, radius, 0,
			// Math.PI * 2, false);
			// ctx.moveTo(centerw,centerh);
			// ctx.arc(centerw - radius/2, centerh - radius/2, radius/2, 0,
			// Math.PI * 2, false);
			// ctx.closePath();
			// ctx.stroke();
			ctx.fillStyle = 'rgb(0,0,0)';
			for (var i = 0, num = points.length; i < num; i++) {
				var point = points[i];
				ctx.fillStyle = point.color;
				var x = centerw + point.r * Math.cos(point.theta);
				var y = centerh - point.r * Math.sin(point.theta);
				ctx.fillRect(x, y, pointw, pointw);
				point.r = point.r * (1 + point.delta);
				if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) {
					points.splice(i, 1);
					points.push(createPointScoped(canvas,
							2 * canvas.width / 3.0, 2 * canvas.height / 3.0));
				}
			}
			ctx.font = "48px monospace";
			ctx.fillStyle = "white";
			ctx.fillText(text, canvas.width / 2 - tl / 2, canvas.height / 2);
			if (!stop) {
				window.requestAnimationFrame(draw);
			}
		}
	}
	;
//})();