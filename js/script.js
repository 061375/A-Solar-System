// initialize constants
const 	G = 6.674e-11,
		WW = window.innerWidth,
		HH = window.innerHeight,
		hW = (WW/2),
		hH = (HH/2);
var 	SOLARSIZE = 20,
		SOLARMASS = (500 * 12e+8),
		PLANETMASS = 12e+3,
		NUMBEROFPLANETS = 20, // n - 1 ( the sun ) 
		STARTSPEED = 0.1;//25,
		MAXSTARTSPEED = 0.01,
		STARTCHAOS = (STARTSPEED + Math.random() * MAXSTARTSPEED);
		MINDISSTART = 150;
		MAXDISSTART = 400;
		MINPLANETSIZE = 1;
		MAXPLANETSIZE = 5;
		STARTSTATIC = false;

// initialize variables
var canvas, ctx,  _objects = [], isrunnning = true, W, H;


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
		document.getElementById("STARTSTATIC").checked = STARTSTATIC;

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
	SOLARSIZE = parseInt(document.getElementById("SOLARSIZE").value);
	SOLARMASS = parseInt(document.getElementById("SOLARMASS").value);
	PLANETMASS = parseInt(document.getElementById("PLANETMASS").value);
	NUMBEROFPLANETS = parseInt(document.getElementById("NUMBEROFPLANETS").value);

	STARTSPEED = parseFloat(document.getElementById("STARTSPEED").value);
	MAXSTARTSPEED = parseFloat(document.getElementById("MAXSTARTSPEED").value);
	MAXSTARTSPEED -= STARTSPEED;

	MINDISSTART = parseInt(document.getElementById("MINDISSTART").value);
	MAXDISSTART = parseInt(document.getElementById("MAXDISSTART").value);
	MAXDISSTART -= MINDISSTART;

	MINPLANETSIZE = parseInt(document.getElementById("MINPLANETSIZE").value);
	MAXPLANETSIZE = parseInt(document.getElementById("MAXPLANETSIZE").value);
	MAXPLANETSIZE -= MINPLANETSIZE;

	STARTSTATIC = document.getElementById("STARTSTATIC").checked;
	STARTCHAOS = (STARTSPEED + Math.random() * MAXSTARTSPEED);

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
			size = MINPLANETSIZE + Math.floor(Math.random() * MAXPLANETSIZE);
			mass = (size * PLANETMASS);
			if(!STARTSTATIC) {
				start = {x:STARTCHAOS, y:0};
				let a = trig(hW,hH,(MINDISSTART + Math.random() * MAXDISSTART),-90,true);
				x = a[0];
				y = a[1];
			}else{
				// This sets the planets up evenly around the sun then starts tem all in the same direction
				// set the degrees
				let d = Math.floor(Math.random() * 360);
				let a = trig(hW,hH,(MINDISSTART + Math.random() * MAXDISSTART),d,true);

				// set the start location of the planet
				x = a[0];
				y = a[1];
				// get direction of the sun
				let sd = point_direction(a[0],a[1],hW,hH,false);
				// point -90 degrees
				sd -= 90;
				if(sd < 0)sd += 360;
				// convert to radians
				sd = sd * Math.PI / 180;
				// set planet in that direction at velocity of STARTCHAOS
				start.x += (Math.cos(sd) * Math.PI / 180) * (STARTCHAOS * 100);
    			start.y += (Math.sin(sd) * Math.PI / 180) * (STARTCHAOS * 100);
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