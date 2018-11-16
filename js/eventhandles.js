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
