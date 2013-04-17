$(document).ready(function() {
 
        //Calculate the height of <header>
        //Use outerHeight() instead of height() if have padding
        var aboveHeight = $('#guide-hero').outerHeight();
 
	//when scroll
        $(window).scroll(function(){
 
	        //if scrolled down more than the header’s height
                if ($(window).scrollTop() > aboveHeight){
 
	        // if yes, add “fixed” class to the <nav>
	        // add padding top to the #content 
                //(value is same as the height of the nav)
                $('#nav-container').addClass('fixed', 2000).css('top','0').css('z-index', '20').css('box-shadow', '0 2px 5px #b4b4b4');
 				$('#page-top').removeClass('navbar-fixed-top', 2000);
				$('#back-top').css('display', 'block');
				
				
				
				} else {
 
	        // when scroll up or less than aboveHeight,
            //remove the “fixed” class, and the padding-top
                $('#nav-container').removeClass('fixed', 2000).css('top','80px').css('box-shadow', '0px');
 				$('#page-top').addClass('navbar-fixed-top');
				$('#back-top').css('display', 'none');
				
				

               }

				if($(window).width() < '768'){
					$('#nav-container').removeClass('fixed').next()
	                .css('padding-top','0');
					$('#mobile-built').css('padding-top', '34px');
					$('.banded').css('padding-top', '34px');
					$('#back-top').css('display', 'none');
				}
        });

		var sections = $("section.sub-wrap");
		var navigation_links = $("#guide-nav li a");

		sections.waypoint({
			handler: function(event, direction) {

				var active_section;
				active_section = $(this);
				if (direction == "up") active_section = active_section.prev();

				var active_link = $('#guide-nav a[href="#' + active_section.attr("id") + '"]');
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
