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

classEvent("accordion","click",toggleAccordion);




function classEvent(_class,_event,_function) {
	let elems = document.getElementsByClassName(_class);
	for(let i=0; i<elems.length; i++) {
		elems[i].addEventListener(_event, _function, false);
	}	
}