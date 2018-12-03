// This code involves the event handlers

document.getElementById("navtab").addEventListener('click', toggleMenu, false);

document.getElementById("updateconfig").addEventListener('click', run, false);

document.getElementById("STARTSPEED").addEventListener('keyup', checkPlanetSpeed, false);
document.getElementById("MAXSTARTSPEED").addEventListener('keyup', checkPlanetSpeed, false);

document.getElementById("MINPLANETSIZE").addEventListener('keyup', checkPlanetMin, false);
document.getElementById("MAXPLANETSIZE").addEventListener('keyup', checkPlanetMin, false);

document.getElementById("MINDISSTART").addEventListener('keyup', checkPlanetDis, false);
document.getElementById("MAXDISSTART").addEventListener('keyup', checkPlanetDis, false);

document.getElementById("BOOLCOLLISION").addEventListener('change', toggleCollision, false);

document.getElementById("BOOLACCRETION").addEventListener('change', toggleAccretion, false);

document.getElementById("RENDERLINES").addEventListener('change', toggleDrawLines, false);

document.getElementById("SOLARMASS").addEventListener('keyup', toggleSolarMass, false);
document.getElementById("PLANETMASS").addEventListener('keyup', togglePlanetMass, false);





classEvent("accordion","click",toggleAccordion);
/** 
 * allows an event handler to be attached to all nodes of a class (like in jQuery)
 * @param {String}
 * @param {Object} event
 * @param {Function} the fucntion to tie to the event
 * */
function classEvent(_class,_event,_function) {
	// get the list of nodes for this class
	let elems = document.getElementsByClassName(_class);
	// loop the nodes and attach the event
	for(let i=0; i<elems.length; i++) {
		elems[i].addEventListener(_event, _function, false);
	}	
}