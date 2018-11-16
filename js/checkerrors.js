function checkPlanetSpeed(e) {
	let a = parseInt(document.getElementById("STARTSPEED").value);
	let b = parseInt(document.getElementById("MAXSTARTSPEED").value);
	if(a > b) {
		e.target.addClass("haserror");
	}else{
		e.target.removeClass("haserror");
	}
}

function checkPlanetMin(e) {
	let a = parseInt(document.getElementById("MINPLANETSIZE").value);
	let b = parseInt(document.getElementById("MAXPLANETSIZE").value);
	if(a > b) {
		e.target.addClass("haserror");
	}else{
		e.target.removeClass("haserror");
	}
}

function checkPlanetDis(e) {
	let a = parseInt(document.getElementById("MINDISSTART").value);
	let b = parseInt(document.getElementById("MAXDISSTART").value);
	if(a > b) {
		e.target.addClass("haserror");
	}else{
		e.target.removeClass("haserror");
	}
}