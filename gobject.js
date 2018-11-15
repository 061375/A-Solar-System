class gObject {
	/** 
	 * @param {Object}
	 * */
	constructor(params) {
		this.vars = params;
	}
	/** 
	 * no need for a loop here but its called automatically
	 * @method loop
	 * */
	loop() {}
	/** 
	 * @method draw
	 * */
	draw() {
		//console.log(this.vars.x);
		ctx.fillStyle=this.vars.color;
		ctx.beginPath();
		ctx.arc(this.vars.x,this.vars.y,this.vars.r,0,Math.PI*2,true);
		ctx.closePath();
		ctx.fill();	
	}
	/** 
	 * @method get
	 * @returns {Object}
	 * */
	get() {
		return this.vars;
	}
}