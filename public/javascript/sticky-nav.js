$(function() {

    var $sidebar   = $("#nav-container"), 
        $window    = $(window),
        offset     = $sidebar.offset(),
        topPadding = 15;

    $window.scroll(function() {
        if ($window.scrollTop() > offset.top) {
            $sidebar.stop().animate({
                marginTop: $window.scrollTop() - offset.top + topPadding
            });
        } else {
            $sidebar.stop().animate({
                marginTop: 0
            });
        }
    });

	var navigation_links = $("#guide-nav li a");
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