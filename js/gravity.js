/** 
 * 
 * 
 * */
var Gravity = (function(){

	// @var {Boolean}
	var haserror = false;
	// @var {Boolean}
	var boolcollision = false;
	// @var {Boolean}
	var boolaccretion = false;

	/** 
	 * @param {Object}
	 * @param {Object}
	 * @returns {Void}
	 * */
	var calc = function(a,b) {

		// get the object variables
		a = a.get();
		b = b.get();

		// create a new vector object
		b.v = new Vector(b.x,b.y);

		// user error check

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

		// set the previous position for speed calculation
		a.px = a.x;
		a.py = a.y;

		// update a [x,y] position
		a.x += a.speed.x;
		a.y += a.speed.y;

	}
	/** 
	 * @param {Array}
	 * @param {Function}
	 * */
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
								if(boolcollision)
									checkCollision(objects[x],objects[y]);
							}
						}
					}
				}
			}
		}
		callback(haserror);
	}
	/** 
	 * @param {Object}
	 * @param {Object}
	 * */
	var checkCollision = function(a,b) {
		let v = new Vector(0,0);
		let d = distance(a.get().x,a.get().y,b.get().x,b.get().y);
		let s = (a.get().r + b.get().r);
		let m = (a.get().mass + b.get().mass);
		if(d <= (s)) {
			if(a.get().mass < b.get().mass) {
				if(boolaccretion){
					b.raisemass(m);
					b.raisesize(s);
				}
				a.collision();
			}
			if(b.get().mass < a.get().mass){
				if(boolaccretion) {
					a.raisemass(m);
					a.raisesize(s);
				}
				b.collision();
			}
		}
	}

	// ---- SETTERS

	/** 
	 * @param {Boolean}
	 * */
	var toggleCollision = function(b) {
		boolcollision = b;
	}
	/** 
	 * @param {Boolean}
	 * */
	var toggleAccretion = function(b) {
		boolaccretion = b;
	}

	return {
		calc: calc,
		calcAll: calcAll,
		toggleCollision:toggleCollision,
		toggleAccretion:toggleAccretion
	}

})();