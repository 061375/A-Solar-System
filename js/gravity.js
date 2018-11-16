var Gravity = (function(){

	var haserror = false;

	var calc = function(a,b) {
		
		a = a.get();
		b = b.get();
		b.v = new Vector(b.x,b.y);

		if(undefined === a.x) {
			console.log("ERROR:: Object[a] requires a.x coordinate to be initialized");
			haserror = true;
		}
		if(undefined === a.y) {
			console.log("ERROR:: Object[a] requires a.y coordinate to be initialized");
			haserror = true;
		}
		if(undefined === a.x) {
			console.log("ERROR:: Object[b] requires b.x coordinate to be initialized");
			haserror = true;
		}
		if(undefined === b.y) {
			console.log("ERROR:: Object[b] requires b.y coordinate to be initialized");
			haserror = true;
		}
		if(undefined === b.v) {
			console.log("ERROR:: Object[a] requires a vector to be initialized");
			haserror = true;
		}
		if(undefined === b.v) {
			console.log("ERROR:: Object[b] requires a vector to be initialized");
			haserror = true;
		}

		// init empty vector
		let v = new Vector(0,0);
		let av = new Vector(0,0);
		let bv = new Vector(0,0);
		b.v.x -= a.x;
		b.v.y -= a.y;

		let d = v.distance(a.v,b.v);

		b.n = b.v.normalize();

		// stuck in the gravity well
		if ( d < 20 ) {
		  b.n.x *= Math.pow(d/20,5);
		  b.n.y *= Math.pow(d/20,5);
		}

		let m = b.mass;//a.mass + b.mass;

		av.x += b.n.x*(G*m)/(d*d);
		av.y += b.n.y*(G*m)/(d*d);

		// X speed
		a.speed.x += av.x;
		// Y speed
		a.speed.y += av.y;

		a.x += a.speed.x;
		a.y += a.speed.y;
	}
	//
	var calcAll = function(objects,callback) {
		for(let x = 0; x < objects.length; x++) {
			for(let y = 0; y < objects.length; y++) {
				if(haserror == false) {
					// skip the current object
					if(x != y) {
						//console.log(x,y);
						calc(objects[x],objects[y]);
					}
				}
			}
		}
		callback(haserror);
	}

	return {
		calc: calc,
		calcAll: calcAll
	}

})();