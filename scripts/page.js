//(function() {
	'use strict';
	let canvas = document.getElementById('canvas');
	let overlay = document.getElementById('overlay');
	let background = document.getElementById('background');
	overlay.addEventListener("click", onClick, false);
	overlay.addEventListener("mousemove", getOnMouseMove(), false);
	let timeout = 25;
	let ctx = canvas.getContext('2d');
	let numPoints = 100;
	let pointw = 1.5;
	let delta = 0.04;
	let points = [];
	let stop = false;

	function onClick() {
		stop = !stop;
		if (!stop) {
			window.requestAnimationFrame(draw);
		}
	};

	let spot = {
		x : 0,
		y : 0
	};
	function getOnMouseMove() {
		let prevx = undefined;
		let prevy = undefined;
		return function(event) {			 
			 let rect = canvas.getBoundingClientRect();
			 let cw = canvas.width;
			 let ch = canvas.height;
			 let scalew = cw / rect.width;
			 let scaleh = ch / rect.height;
			 let x = event.clientX - rect.left;
			 let y = event.clientY - rect.top;
			 let px = x * scalew;
			 let py = y * scaleh;
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
		// let cw = canvas.width;
		// let ch = canvas.height;
		// let centerw = cw/2;
		// let centerh = ch/2;
		// let delta = 0.5;
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
		let rmax = Math.max(canvas.width, canvas.height) / 2;
		let r = Math.random() * rmax;
		let theta = Math.random() * 2 * Math.PI;
		let color = randomColor();
		let point = {
			r : r,
			theta : theta,
			delta : delta,
			color : color
		};
		return point;
	}
	;

	function createPointScoped(canvas, w, h) {
		let rmax = Math.max(w, h) / 2;
		let r = Math.random() * rmax;
		let color = randomColor();
		let theta = Math.random() * 2 * Math.PI;
		let d = delta * Math.random();
		let point = {
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
		for (let i = 0; i < numPoints; i++) {
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
		let w = canvas.width;
		canvas.width = 1;
		canvas.width = w;
	}
	;

	function draw() {
		if (ctx) {
			// onTimeOut();
			let text = "Error 404: Ground Control Not Found";
			let tl = ctx.measureText(text).width;
			clearCanvas(ctx, canvas);
			let radius = 10;
			let centerw = canvas.width / 2; // + spot.x ;
			let centerh = canvas.height / 2; // + spot.y ;
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
			for (let i = 0, num = points.length; i < num; i++) {
				let point = points[i];
				ctx.fillStyle = point.color;
				let x = centerw + point.r * Math.cos(point.theta);
				let y = centerh - point.r * Math.sin(point.theta);
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