$(document).ready(function(){
	$('#top-search').submit(function(e) {
			if (false == validateSearch($(this))) {
				return false;
			} 
			
			e.preventDefault();
			
			sessionCode = $('#index-top-input').val();
				
			var action = $(this).attr('action') + '/' + sessionCode;
		    window.location.href = action;
	});
});


validateSearch = function($form) {
	$form.find(".alert").hide();

	isValid = true;
		
	var sessionCode = $('#index-top-input').val();
	
	if ( sessionCode == '' ) {	
				
		format  = '<div id="alert-top"  class="alert alert-error fade in">';
		format += '<strong>No session code?</strong> We dont have anything to search.';
		format += '</div>';
		
		$("#top-search input").before(format);
		
		isValid = false;
	} 
	
	return isValid;
	
}