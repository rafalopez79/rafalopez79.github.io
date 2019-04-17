'use strict';
(function() {	
	// create a renderer instance
	var renderer = PIXI.autoDetectRenderer(1024, 768);
	// add the renderer view element to the DOM
	var background = document.getElementById('background');
	background.appendChild(renderer.view);
	renderer.view.className = "canvas";
		
	var stage = new PIXI.Container();
	var graphics = new PIXI.Graphics();
	
	var width = renderer.view.width;
	var height = renderer.view.height;
	var radius = Math.min(width, height)/2.0;
	
	graphics.beginFill(0xffffff); // Red0xe74c3c	 	
	graphics.drawCircle(width/2, height/2, radius); // drawCircle(x, y, radius)
	graphics.endFill();
	
	graphics.beginFill(0x000000); // Red0xe74c3c	 	
	graphics.drawCircle(width/2, height/2, radius*0.9); // drawCircle(x, y, radius)
	graphics.endFill();
	
	graphics.beginFill(0xffffff); // Red0xe74c3c	 
	var rw = 100;
	graphics.drawCircle(width/2, height/2, radius*0.2); // drawCircle(x, y, radius)
	graphics.drawRect(width/2, height/2 - rw/2, radius, rw);
	graphics.drawRect( rw/2 , height/2 - rw/2, radius, rw);
	graphics.endFill();
	//developerz
	
	
	
	
	stage.addChild(graphics)
	animate();
	
	// load the texture we need .add('bunny', 'img/bunny.png')
	//PIXI.loader.load(function (loader, resources) {
	
	    // Add the bunny to the scene we are building.
	    //stage.addChild(bunny);

	    // kick off the animation loop (defined below)
	     // animate();
	//});
	
	function animate() {
	    // start the timer for the next animation loop
	    requestAnimationFrame(animate);
	    
	    renderer.render(stage);
	}
	
})();