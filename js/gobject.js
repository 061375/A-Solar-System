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
			// increment current number of planets
			CURRENTNOPLANETS++;
			
			ctx.fillStyle=this.vars.color;
			ctx.beginPath();
			ctx.arc(this.vars.x,this.vars.y,this.vars.r,0,Math.PI*2,true);
			ctx.closePath();
			ctx.fill();	

			if(RENDERLINES) {
				ctx.beginPath();
				ctx.setLineDash([1, 15]);
				ctx.strokeStyle = '#ffffff';
				ctx.moveTo(_objects[0].get().x,_objects[0].get().y);
				ctx.lineTo(this.vars.x,this.vars.y);
				ctx.stroke();
			}
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
	 * @method set
	 * @param {String}
	 * @param {Mixed}
	 * @return {Void}
	 * */
	set(key,value) {
		this.vars[key] = value;
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
	getspeed() {
		if(this.vars.alive){
			return distance(this.vars.x,this.vars.y,this.vars.px,this.vars.py);
		}else{
			return 0;
		}
	}
	/** 
	 * 
	 * */
	raisesize(r) {
		this.vars.r = r;
	}
}