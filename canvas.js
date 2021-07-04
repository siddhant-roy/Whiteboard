let paint = false;
let initialThickness = 5;

function changeThickness(thickness) {
	initialThickness = thickness;
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
		ctx.lineCap = "round";

		ctx.lineTo(e.clientX, e.clientY);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(e.clientX, e.clientY);
	}

	canvas.addEventListener("mousedown", startPosition);
	canvas.addEventListener("mouseup", endPosition);
	canvas.addEventListener("mousemove", draw);
});
