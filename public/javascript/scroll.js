/*$('a[href^="#"]').bind('click.smoothscroll',function (e) {
    e.preventDefault();
    var target = this.hash;
        $target = $(target);
    $('html, body').stop().animate({
        'scrollTop': $target.offset().top
    }, 500, 'swing', function () {
        window.location.hash = target;
    });
});*/



$(function() {


	$('#tour-top').waypoint(function(direction) {
		
			if (direction == 'down'){
				$('#to-top').css('display', 'block').css('bottom', '120px')
			
			} else{
		
			   	$('#to-top').css("display", "none")
				
			}
	});

	$('a').click( function(event) {

		$.scrollTo(
			$(this).attr("href"),
			{
				duration: 400,
				offset: { 'left':0, 'top':0.01*$(window).height() }
			}
		);
	});


});