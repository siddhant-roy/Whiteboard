let erase = false;
let paint = false;
let initialThickness = 5;
let initialColor = "#000000";

let initialBackground = "#F8F8FF"; //variable for background
const clearAllBtn = document.getElementById("clearBtn");
const eraseBtn = document.querySelector(".eraser-btn");
const writeBtn = document.getElementById("write_btn");
const downloadBtn = document.getElementById("download-btn");

function changeThickness(thickness) {
	initialThickness = thickness;
}

function changeColor(color) {
	initialColor = color;
}

function changeBackground(colour) {
	//functionchange background colour
	initialBackground = colour;
	canvas.style.backgroundColor = initialBackground;
}
///side nav script
// function openNav() {
// 	document.getElementById("mySidenav").style.width = "250px";
// 	document.getElementById("main").style.marginLeft = "250px";
// }

// function closeNav() {
// 	document.getElementById("mySidenav").style.width = "0";
// 	document.getElementById("main").style.marginLeft = "0";
// }

window.addEventListener("load", () => {
	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	//resize canvas to window height
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	function startErasing() {
		erase = true;
	}
	function finishErasing() {
		erase = false;
		// inf_ctx.updateChunks();
	}
	function eraseBoard(e) {
		if (!erase) return;
		ctx.clearRect(e.clientX, e.clientY, 30, 30);
	}

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
		ctx.strokeStyle = initialColor;
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

	writeBtn.addEventListener("click", () => {
		canvas.removeEventListener("mousedown", startErasing);
		canvas.removeEventListener("mouseup", finishErasing);
		canvas.removeEventListener("mousemove", eraseBoard);
		canvas.addEventListener("mousedown", startPosition);
		canvas.addEventListener("mouseup", endPosition);
		canvas.addEventListener("mousemove", draw);
	});
	eraseBtn.addEventListener("click", () => {
		canvas.removeEventListener("mousedown", startPosition);
		canvas.removeEventListener("mouseup", endPosition);
		canvas.removeEventListener("mousemove", draw);
		canvas.addEventListener("mousedown", startErasing);
		canvas.addEventListener("mouseup", finishErasing);
		canvas.addEventListener("mousemove", eraseBoard);
	});
	clearAllBtn.addEventListener("click", () => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		canvas.removeEventListener("mousedown", startErasing);
		canvas.removeEventListener("mouseup", finishErasing);
		canvas.removeEventListener("mousemove", eraseBoard);
		canvas.addEventListener("mousedown", startPosition);
		canvas.addEventListener("mouseup", endPosition);
		canvas.addEventListener("mousemove", draw);
	});
});

///download board fucntion
downloadBtn.addEventListener("click", () => {
	let downloadAnchor = document.getElementById("downloadAnchor");
	let imgUrl = canvas
		.toDataURL("image/jpeg")
		.replace("image/jpeg", "image/octet-stream");
	downloadAnchor.setAttribute("href", imgUrl);
});
