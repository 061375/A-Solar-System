class gObject {
	/** 
	 * @param {Object}
	 * */
	constructor(params) {
		this.vars = params;
		this.vars.collision = false;
		this.vars.alive = true;
	}
	/** 
	 * no need for a loop here but its called automatically
	 * @method loop
	 * */
	loop() {
		if(this.vars.collision)
			this.vars.alive = false;
	}
	/** 
	 * @method draw
	 * */
	draw() {
		if(this.vars.alive) {
			ctx.fillStyle=this.vars.color;
			ctx.beginPath();
			ctx.arc(this.vars.x,this.vars.y,this.vars.r,0,Math.PI*2,true);
			ctx.closePath();
			ctx.fill();	
		}
	}
	/** 
	 * @method get
	 * @returns {Object}
	 * */
	get() {
		return this.vars;
	}
	/** 
	 * 
	 */
	collision() {
		this.vars.collision = true;
	}
	/** 
	 * 
	 * */
	raisemass(m) {
		this.vars.mass = m;
	}
	/** 
	 * 
	 * */
	raisesize(r) {
		this.vars.r = r;
	}
}