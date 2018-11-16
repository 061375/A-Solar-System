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
			if(objects[x].get().alive) {
				// only loop others if this object is alive
				for(let y = 0; y < objects.length; y++) {
					if(haserror == false) {
						// skip the current object
						if(objects[y].get().alive) {
							if(x != y) {
								calc(objects[x],objects[y]);
								if(x==0)checkCollision(objects[x],objects[y]);
							}
						}
					}
				}
			}
		}
		callback(haserror);
	}
	//
	var checkCollision = function(a,b) {
		let v = new Vector(0,0);
		let d = distance(a.get().x,a.get().y,b.get().x,b.get().y);
		let s = (a.get().r + b.get().r);
		let m = (a.get().mass + b.get().mass);
		if(d <= (s)) {
			if(a.get().mass < b.get().mass) {
				b.raisemass(m);
				b.raisesize(s);
				a.collision();
			}
			if(b.get().mass < a.get().mass){
				a.raisemass(m);
				a.raisesize(s);
				b.collision();
			}
		}
	}

	return {
		calc: calc,
		calcAll: calcAll
	}

})();