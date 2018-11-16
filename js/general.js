/** 
 * 
 * */
function toggleMenu() {
	if(document.getElementById("menu-container").hasClass("close")) {
		document.getElementById("menu-container").removeClass("close");
	}else{
		document.getElementById("menu-container").addClass("close");
	}
}
function toggleCollision() {
    BOOLCOLLISION = document.getElementById("BOOLCOLLISION").checked;
    Gravity.toggleCollision(BOOLCOLLISION);
}
function toggleAccretion() {
    BOOLACCRETION = document.getElementById("BOOLACCRETION").checked;
    Gravity.toggleAccretion(BOOLACCRETION);
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