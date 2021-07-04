let paint = false;
let initialThickness = 5;
let initialBackground = "#F8F8FF"; //variable for background

function changeThickness(thickness) {
	initialThickness = thickness;
}

function changeBackground(colour) {
	//functionchange background colour
	initialBackground = colour;
	canvas.style.backgroundColor = initialBackground;
}
///side nav script
function openNav() {
	document.getElementById("mySidenav").style.width = "250px";
	document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
	document.getElementById("main").style.marginLeft = "0";
}

window.addEventListener("load", () => {
	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	//resize canvas to window height
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	function startPosition(e) {
		paint = true;
		draw(e);
	}
	function endPosition() {
		paint = false;
		ctx.beginPath();
	}
	function draw(e) {
		if (!paint) return;
		ctx.lineWidth = initialThickness;
		ctx.linecap = "round";

		ctx.lineTo(e.clientX, e.clientY);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(e.clientX, e.clientY);
	}

	canvas.addEventListener("mousedown", startPosition);
	canvas.addEventListener("mouseup", endPosition);
	canvas.addEventListener("mousemove", draw);
});
