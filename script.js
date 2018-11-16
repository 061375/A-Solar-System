// initialize constants
const 	G = 6.674e-11,
		WW = window.innerWidth,
		HH = window.innerHeight,
		hW = (WW/2),
		hH = (HH/2);
var 	SOLARSIZE = 20,
		SOLARMASS = (500 * 12e+9),
		PLANETMASS = 12e+7,
		NUMBEROFPLANETS = 12, // n - 1 ( the sun ) 
		STARTSPEED = 0.25,
		MAXSTARTSPEED = 0.03,
		STARTCHAOS = (STARTSPEED + Math.random() * MAXSTARTSPEED);
		MINDISSTART = 50;
		MAXDISSTART = 400;
		MINPLANETSIZE = 1;
		MAXPLANETSIZE = 5;
		STARTSTATIC = false;

// initialize variables
var canvas, ctx,  _objects = [], isrunnning = true, W, H;

document.getElementById("navtab").addEventListener('click', toggleMenu, false);
document.getElementById("updateconfig").addEventListener('click', run, false);
window.onload = function(){ 
	buildCanvas(function(){
		document.getElementById("SOLARSIZE").value = SOLARSIZE;
		document.getElementById("SOLARMASS").value = SOLARMASS;
		document.getElementById("PLANETMASS").value = PLANETMASS;
		document.getElementById("NUMBEROFPLANETS").value = NUMBEROFPLANETS;
		document.getElementById("STARTSPEED").value = STARTSPEED;
		document.getElementById("MAXSTARTSPEED").value = MAXSTARTSPEED;
		document.getElementById("MINDISSTART").value = MINDISSTART;
		document.getElementById("MAXDISSTART").value = MAXDISSTART;
		document.getElementById("MINPLANETSIZE").value = MINPLANETSIZE;
		document.getElementById("MAXPLANETSIZE").value = MAXPLANETSIZE;
		run(); 
	});
}

/** 
 * run everything
 * @returns {Void}
 * */
function run() {
	
	_objects = [];

	// get vars from control form
	SOLARSIZE = document.getElementById("SOLARSIZE").value;
	SOLARMASS = document.getElementById("SOLARMASS").value;
	PLANETMASS = document.getElementById("PLANETMASS").value;
	NUMBEROFPLANETS = document.getElementById("NUMBEROFPLANETS").value;
	STARTSPEED = document.getElementById("STARTSPEED").value;
	MAXSTARTSPEED = document.getElementById("MAXSTARTSPEED").value;
	MINDISSTART = parseInt(document.getElementById("MINDISSTART").value);
	MAXDISSTART = parseInt(document.getElementById("MAXDISSTART").value);
	MINPLANETSIZE = parseInt(document.getElementById("MINPLANETSIZE").value);
	MAXPLANETSIZE = parseInt(document.getElementById("MAXPLANETSIZE").value);
	STARTCHAOS = (parseFloat(STARTSPEED) + Math.random() * parseFloat(MAXSTARTSPEED));

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
			if(!STARTSTATIC) {
				start = {x:STARTCHAOS, y:0};
				size = MINPLANETSIZE + Math.floor(Math.random() * MAXPLANETSIZE);
				mass = (size * PLANETMASS);
				let a = trig(hW,hH,(MINDISSTART + Math.random() * MAXDISSTART),-90,true);
				x = a[0];
				y = a[1];
			}else{

			}
		}else{
			// first loop init the SUN
			x = hW;
			y = hH;
			// plaing with multipl suns ( @TODO )
			/*
			if(i==0) {
				x = hW + 500;
				start = {x:0, y:0.032};
			}else{
				x = hW - 300;
				start = {x:0,y:-0.032};
			}
			*/
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
	

	// handle a resize
	resizeHandler();

	render();
}
function toggleMenu(e) {
	if(document.getElementById("menu-container").hasClass("close")) {
		document.getElementById("menu-container").removeClass("close");
	}else{
		document.getElementById("menu-container").addClass("close");
	}
}
/** 
 * @param {Function}
 * */
function buildCanvas(callback) {

	W = document.getElementById('container').clientWidth;
	H = document.getElementById('container').clientHeight;
	// create the canvas
	canvas = document.createElement('canvas');
	canvas.setAttribute("id","canvas");
	// add the canvas
	document.getElementById('container').appendChild(canvas);

	ctx = canvas.getContext('2d');

	callback();
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