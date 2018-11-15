// initialize constants
const 	G = 6.674e-11,
		WW = window.innerWidth,
		HH = window.innerHeight;
		hW = (WW/2);
		hH = (HH/2);
		SOLARSIZE = 20;
		SOLARMASS = (500 * 12e+9);
		PLANETMASS = 12e+7;
		NUMBEROFPLANETS = 150; // n - 1 ( the sun ) 
		STARTSPEED = 0.1;
		STARTCHAOS = (STARTSPEED + Math.random() * 0.03);

// initialize variables
var canvas, ctx,  _objects = [], isrunnning = true, W, H, hW, hH;

window.onload = function(){ init(); }

/** 
 * run everything
 * @returns {Void}
 * */
function init() {

	W = document.getElementById('container').clientWidth;
	H = document.getElementById('container').clientHeight;
	

	// create the canvas
	canvas = document.createElement('canvas');
	ctx = canvas.getContext('2d');

	// init local vars
	let size = SOLARSIZE;
	let mass = SOLARMASS;
	let x,y;
	let speed = 0;
	let start = {x:0,y:0};
	
	// loop
	for(let i = 0; i<NUMBEROFPLANETS; i++) {
		// if not the first loop 
		if(i > 0) {
			
			start = {x:STARTCHAOS,y:0};
			/*
			Plan to start in random positions then give each planet a kick in the right direction

			let d = point_direction(WW,HH,x,y);
			let a = trig(WW,HH,distance(WW,HH,x,y),d);
				d += cspeed;
			let b = trig(WW,HH,distance(WW,HH,x,y),d);
			start = Vector.add(a,b);
			//console.log(start);
			*/

			size = 1 + Math.floor(Math.random() * 5);
			mass = (size * PLANETMASS);

			x = hW;//Math.random() * WW;
			y = Math.random() * (HH / 4);
		}else{
			// first loop init the SUN
			x = hW ;
			y = hH ;
		}
		// instantiate new gravity object
		_objects[i] = new gObject({
			x:x,
			y:y,
			r:size,
			speed: new Vector(start.x,start.y),
			mass:mass,
			v: new Vector(x,y),
			color:'#fff'
		});
	}
	// add the canvas
	document.getElementById('container').appendChild(canvas);

	// handle a resize
	resizeHandler();

	render();
}
/** 
 * clear the canvas
 * @function clear
 * */
function clear() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}
/** 
 * set the size of the canvas
 * @note currently this really only works once
 * @function resizeHandler
 * */
function resizeHandler() {
	canvas.height = HH;
	canvas.width = WW;
}
/** 
 * render the visible stuff
 * @function render
 * */
function render() {

	requestAnimationFrame(render);

	// if true then render 
	if(isrunnning) {
		// clear
		clear();
		// save
		ctx.save();
		Gravity.calcAll(_objects, function(err) {
			if(!err) {
				// loop everything
				for(let i=0; i<_objects.length; i++) {
					//if(i == 0)console.log(_objects[i].get().speed);
					_objects[i].loop();
					_objects[i].draw();
					//if(i == 0)console.log(_objects[i].get().speed);
				}
				// restore
				ctx.restore();
			}else{
				isrunnning = false;
			}
		});
	}
}
/** 
 * 
 * @function distance
 * @param {Number}
 * @param {Number}
 * @param {Number}
 * @param {Number}
 * @returns {Number}
 * */
function distance(x1,y1,x2,y2) {
	return Math.hypot(x2-x1, y2-y1);
}
/** 
 * 
 * @function trig
 * @param {Number}
 * @param {Number}
 * @param {Number}
 * @param {Number}
 * @param {Boolean}
 * @returns {Mixed} 
 * */
function trig(x,y,r,d,array) {

	if(d<0)d+=360;
	if(d>360)d-=360;

	let a = d * Math.PI / 180;
	let xpos = r * Math.cos(a);
	let ypos = r * Math.sin(a);

    if(array) {
    	return [
    		xpos+x,
    		ypos+y
    	]
    }else{
    	return {
    		x:xpos+x,
    		y:ypos+y
    	}
    }
}
/**
   * @param {Number}
   * @param {Number}
   * @param {Number}
   * @param {Number}
   * @param {Boolean}
   *
   * @returns {Number}
   * */
  function point_direction(x1,y1,x2,y2,radians,direction)
  {
    if (undefined === direction) direction = 0;
    if (undefined === radians) radians = false;
    
    var x = x2 - x1;
    var y = y2 - y1;
    var angleInRadians = Math.atan2(y,x);
    var angleInDegrees = angleInRadians * 180 / Math.PI + direction;
    
    if(angleInDegrees < 0)angleInDegrees+=360;
    if(angleInDegrees > 360)angleInDegrees-=360;
    
    if(radians) return angleInRadians;
  
    return angleInDegrees;
  }