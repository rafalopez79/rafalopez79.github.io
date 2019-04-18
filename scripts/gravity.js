'use strict';
(function() {
	var canvas = document.getElementById('canvas');	
	if (!canvas){
		return;
	}
	canvas.addEventListener("click", onClick, false);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
	window.addEventListener('resize', function(){
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight
	});
	
	//indexOf
	Array.prototype.indexOf = function(obj) {
		var i = this.length;
		while (i--) {
			if (this[i] === obj) {
				return i;
			}
		}
		return -1;
	};
	//contains
	Array.prototype.contains = function(obj) {
		var i = this.indexOf(obj);
		return i >= 0;
	};
	//remove
	Array.prototype.remove = function(i) {
		this.splice(i,1);
	};
	//remove
	Array.prototype.append = function(a) {
		for (var i = 0, num = a.length; i < num; i++) {
			this.push(a[i]);
		}
	};
	//map
	Array.prototype.apply = function(f) {
		var i = this.length;
		while (i--) {
			const e = this[i]
			f(e);
		}
	};
	
	var timeout = 125;
	var ctx = canvas.getContext('2d');
	var stop = false;
	
	//constants
	const G 	= 1000.0;
	const DELTAR = 1.25;
	const NUMPOINTS = 500;
	const EPS   = 1e-9;
	const dt 	= 0.001;
	const sqrt3 = Math.sqrt(3.0);
	const sqrt2 = Math.sqrt(2.0);
	const sqrt6 = Math.sqrt(6.0);
	const text = "Gravity";
	const cplay = "\u25B6";
	const cstop = "\u25A0";
	
	//vars
	var t 	   = 0;
	var points = new Array();
	
	for (var i = 0; i < NUMPOINTS; i++) {
		const p = new Element(
		uniform(1000), //mass
		Math.max(1,uniform(3)), //radius
		randomColor(),
		uniformPoint(400,400,400), //r
		uniformPoint(0,0,0) //v
		);
		points.push(p);
	}
	
	
	function draw() {
		if (ctx) {
			clearCanvas(ctx, canvas);
			var centerw = canvas.width / 2;
			var centerh = canvas.height / 2;
			
			//updatePhys
			t += dt;
			const npoints = updatePhys(t, dt, points);
			for (var i=points.length-1; i >= 0; i--) {
				points.pop();
			}
			for (var i=npoints.length-1; i >= 0; i--) {
				const e = npoints[i];
				//e.log();
				points.push(e);
			}
			// z-sort
			points.sort(function(a, b){
				return a.r.z - b.r.z;
			});
			
			
			//draw points
			for (var i = 0, num = points.length; i < num; i++) {
				var elem = points[i];
				ctx.fillStyle = elem.color;
				var p = isometric(elem.r, centerw, centerh);
				ctx.beginPath();
				ctx.arc(p.x, p.y, elem.radius, 0, 2 * Math.PI);
				ctx.fill();
				ctx.strokeStyle = "yellow";
				ctx.beginPath();
				ctx.lineWidth = 1;
				ctx.arc(p.x, p.y, elem.radius, 0, 2 * Math.PI);	
				ctx.stroke();
			}
			
			ctx.font = "48px monospace";
			ctx.fillStyle = "white";
			var tl = ctx.measureText(text).width;
			ctx.fillText(text, canvas.width / 2 - tl / 2, canvas.height / 10);
			
			//data
			ctx.font = "24px monospace";
			ctx.fillStyle = "white";
			ctx.fillText(stop ? cplay : cstop, canvas.width / 2 + canvas.width /4, canvas.height / 10);
			
			//status
			ctx.beginPath();
			ctx.lineWidth = 1;
			ctx.strokeStyle = "white";
			ctx.moveTo(canvas.width / 2 + canvas.width / 4, 15*canvas.height / 20);
			ctx.lineTo(canvas.width - canvas.width/20, 15*canvas.height / 20);
			ctx.lineTo(canvas.width - canvas.width/20, 19*canvas.height / 20);
			ctx.lineTo(canvas.width / 2 + canvas.width / 4, 19*canvas.height / 20);
			ctx.closePath();
			ctx.stroke();
			
			ctx.font = "12px monospace";
			ctx.fillText("t      = "+t.toFixed(4), canvas.width / 2 + canvas.width / 4 + 10, 16*canvas.height / 20);
			ctx.fillText("bodies = "+points.length, canvas.width / 2 + canvas.width / 4 + 10, 16.5*canvas.height / 20);
			
			redraw(timeout);
		}
	};
	
	function redraw(time) {
		if (!stop) {
			window.setTimeout(function(){
				window.requestAnimationFrame(draw);
			}, time);
		}
	};
	
	function clearCanvas(context, canvas) {
		context.clearRect(0, 0, canvas.width, canvas.height);
		const w = canvas.width;
		canvas.width = 1;
		canvas.width = w;
	};
	
	function onClick() {
		stop = !stop;
		redraw(timeout);
	};
	
	function updatePhys(t, dt, elements){
		//collisions
		elements = updateState(elements);
		var nelements = new Array();
		for (var i = 0, num = elements.length; i < num; i++) {
			const element = elements[i];
			const nelement = RK4(elements, element, dt);
			nelements.push(nelement);
		}
		return nelements;
	};
	
	function updateState(elements){
		var nelements = new Array();
		nelements.append(elements);
		var merged = new Array();
		while(nelements.length > 0){
			const element = nelements.pop();
			var collection = getCollisions(nelements, element);
			if (collection.length > 0) {
				collection.push(element);
				const m = mergeCollisions(collection);
				merged.push(m);
				//elimino merged collection
				for (var j = 0; j < collection.length; j++){
					const e = collection[j];
					const k = nelements.indexOf(e);
					if (k >= 0){
						nelements.remove(k);
					}
				}
			} else {
				merged.push(element);
			}
		}
		return merged;
	}
	
	function getCollisions(elements, e){
		var nelements = new Array();
		for (var i = 0, num = elements.length; i < num; i++) {
			const element = elements[i];
			if (element !== e){
				const dx = element.r.x - e.r.x;
				const dy = element.r.y - e.r.y;
				const dz = element.r.z - e.r.z;
				const dsq = Math.sqrt(dx*dx + dy*dy + dz*dz);
				if (dsq <= (element.radius + e.radius) * DELTAR){
					nelements.push(element);
				}
			}
		}
		return nelements;
	}
	
	function mergeCollisions(elements){
		var color = undefined;
		var massmax = 0.0;
		var mass = 0.0;
		var vol = 0.0;
		var momentum = new Point(0,0,0);
		var rmax = undefined;
		var num = elements.length;
		for (var i = 0; i < num; i++) {
			const element = elements[i];
			mass += element.mass;
			vol += 4.0/3.0 * Math.PI * Math.pow(element.radius,3);
			momentum.inc(element.v.scalarProd(element.mass));
			if (element.mass > massmax){
				massmax = element.mass;
				color = element.color;
				rmax = element.r;
			}
		}		
		const radius = Math.pow(vol * 3.0/4.0/Math.PI, 1/3.0); 
		const nv = momentum.incScalarProd(1.0/mass);
		return new Element(mass, radius, color, rmax, nv);
	}
	
	function seuler(elements, e, dt) {
		var oldr = e.r;
		const a0 = acceleration(elements, e, oldr);
		const nv = e.v.add(a0.scalarProd(dt));
		const nr = oldr.add(nv.scalarProd(dt));
		return new Element(e.mass, e.radius, e.color, nr, nv);
	}
	
	function RK4(elements, e, dt) {
		const oldr = e.r;
		const oldv = e.v;
		const a0 = acceleration(elements, e, oldr);
		const r1 = oldr.add(oldv.scalarProd(dt/2.0)).inc(a0.scalarProd(dt*dt/8.0));
		const a1 = acceleration(elements, e, r1);
		const r2 = oldr.add(oldv.scalarProd(dt)).inc(a1.scalarProd(dt*dt/2.0));
		const a2 = acceleration(elements, e, r2);
		const nr = oldr.add(oldv.scalarProd(dt)).inc(a0.add(a1).inc(a1).incScalarProd(dt*dt/6.0));
		const nv = oldv.add(a0.add(a2).inc(a1).inc(a1).inc(a1).inc(a1).incScalarProd(dt/6.0));
		return new Element(e.mass, e.radius, e.color, nr, nv);
	}
	
	function acceleration(elements, e, r){
		var a = new Point(0,0,0);
		for (var i = 0, num = elements.length; i < num; i++) {
			const elem = elements[i];
			if (elem !== e){
				const dx = elem.r.x - r.x;
				const dy = elem.r.y - r.y;
				const dz = elem.r.z - r.z;
				const dsq = dx*dx + dy*dy + dz*dz;
				const d = Math.sqrt(dsq);
				var acc = 0.0;
				if (dsq > EPS){
					acc = G * elem.mass / dsq;
				}
				a.x += acc * dx / d;
				a.y += acc * dy / d;
				a.z += acc * dz / d;
			}
		}
		return a;
	}
	
	function Point(x,y,z) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.add = function(p){
			return new Point(this.x + p.x, this.y + p.y, this.z + p.z);
		};
		this.inc = function(p){
			this.x += p.x;
			this.y += p.y;
			this.z += p.z;
			return this;
		};
		this.scalarProd = function(d){
			return new Point(d*this.x, d*this.y, d*this.z);
		};
		this.incScalarProd = function(d){
			this.x *= d;
			this.y *= d;
			this.z *= d;
			return this;
		};
	};
	
	function Element(mass, radius, color, r, v) {
		this.mass = mass;
		this.radius = radius;
		this.color = color;
		this.r = r;
		this.v = v;	
		this.log = function(){
			console.log('m='+mass+', r=('+r.x+','+r.y+','+r.z+'), v=('+v.x+','+v.y+','+v.z+')');
		};
	};
	
	
	function isometric(p, centerw, centerh) {
		return {
			x: (sqrt3 * p.x - sqrt3 * p.z)/sqrt6 + centerw,
			y: (p.x + 2*p.y + p.z)/sqrt6 + centerh,
		};
		//return {
		//	x: p.x + centerw,
		//	y: p.y + centerh
		//};
	};
	
	function randomColor() {
		if (Math.random() > 0.10) {
			return 'rgb(' + Math.floor(255 * Math.random()) + ','
				+ Math.floor(255 * Math.random()) + ','
				+ Math.floor(255 * Math.random()) + ')';
		}
		return 'rgb(255,255,255)';
	};
	
	function uniform(max){
		return Math.random() * max;
	};
	
	function uniformPoint(maxx, maxy, maxz){
		return new Point((Math.random() * 2*maxx) - maxx, (Math.random() * 2*maxy) - maxy, (Math.random() * 2*maxz) - maxz);
	};
	
	
	//start redraw
	redraw();
})();