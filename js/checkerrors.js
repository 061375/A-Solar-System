// These errors do not prevent user activity
// they simply display that a value does not meet expected requirements

/** 
 * @param {Object} event
 * @returs {Void}
 */
function checkPlanetSpeed(e) {
	let a = parseInt(document.getElementById("STARTSPEED").value);
	let b = parseInt(document.getElementById("MAXSTARTSPEED").value);
	if(a > b) {
		e.target.addClass("haserror");
	}else{
		e.target.removeClass("haserror");
	}
}
/** 
 * @param {Object} event
 * @returs {Void}
 */
function checkPlanetMin(e) {
	let a = parseInt(document.getElementById("MINPLANETSIZE").value);
	let b = parseInt(document.getElementById("MAXPLANETSIZE").value);
	if(a > b) {
		e.target.addClass("haserror");
	}else{
		e.target.removeClass("haserror");
	}
}
/** 
 * @param {Object} event
 * @returs {Void}
 */
function checkPlanetDis(e) {
	let a = parseInt(document.getElementById("MINDISSTART").value);
	let b = parseInt(document.getElementById("MAXDISSTART").value);
	if(a > b) {
		e.target.addClass("haserror");
	}else{
		e.target.removeClass("haserror");
	}
}