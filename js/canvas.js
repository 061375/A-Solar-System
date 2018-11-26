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

	CURRENTNOPLANETS = 0;
	
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
					_objects[i].loop();
					_objects[i].draw();
				}
				// restore
				ctx.restore();
			}else{
				isrunnning = false;
			}
		});
	}
}