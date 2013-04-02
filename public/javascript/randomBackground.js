$(document).ready(function() {
	getBackground();
});


function getBackground(){
	var colors = new Array();
		colors[0]  = "#2aa0b5";
		colors[1]  = "#45bcd2";
		colors[2]  = "#B1E1ED";
		colors[3]  = "#6DC6DD";
		colors[4]  = "#3d8e7c";
		colors[5]  = "#72C1B0";
		colors[6]  = "#72C1B0";
		colors[7]  = "#ffd14e";
		colors[8]  = "#E95C41";
		colors[9]  = "#B7B7B5";
		colors[10] = "#72c1b0";
		colors[11] = "#4c8ab0";
		colors[12] = "#f2af6e";
	
	var randomColors = Math.floor(Math.random() * colors.length);
	
	$('body').css("background-color", colors[randomColors]);
}


