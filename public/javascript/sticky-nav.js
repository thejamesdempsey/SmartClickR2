$(function() {

	var nav_container = $('#guide-main');
	var nav = $('#nav-container');
	
	var top_spacing = 0;
	var waypoint_offset = 50;


	nav_container.waypoint({
		handler: function(direction) {
			
			if (direction == 'down'){
				
				nav_container.css({ 'height':nav.outerHeight() });
				nav.stop().addClass("sticky").css('top', -nav.outerHeight()).animate({"top":top_spacing});
				
			} else{
			
			   	nav_container.css({ 'height':'auto' });
				nav.stop().removeClass("sticky").css("top", nav.outerHeight() + waypoint_offset).animate({"top":""});
				
			}
		}, 
		offset: function(){
			return -nav.outerHeight()-waypoint_offset;
		}
	});
	
	var sections = $("section.sub-wrap");
	var navigation_links = $("#guide-nav li a");
	
	sections.waypoint({
		handler: function(event, direction) {
		
			var active_section;
			active_section = $(this);
			if (direction === "up") active_section = active_section.prev();

			var active_link = $('.nav a[href="#' + active_section.attr("id") + '"]');
			navigation_links.removeClass("active");
			active_link.addClass("active");

		},
		offset: '25%'
	})
	
	navigation_links.click( function(event) {

		$.scrollTo(
			$(this).attr("href"),
			{
				duration: 700,
				offset: { 'left':0, 'top':-0.15*$(window).height() }
			}
		);
	});
});