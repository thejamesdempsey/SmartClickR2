$(document).ready(function(){
	
	var pie = $('#pie-chart'),
		aspect = pie.width()/pie.height(), 
		container = pie.parent();
		
		
	$(window).on('resize', function(){
		var targetWidth = container.width();
		pie.attr('width', targetWidth);
		pie.attr('height', Math.round(targetWidth / aspect ));
	});
	
	
});
