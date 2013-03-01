$(document).ready(function(){
	$('#bottom-search').submit(function(e) {
			if (false == validateSearchBottom($(this))) {
				return false;
			} 
			
			e.preventDefault();
			
			sessionCode = $('#index-bottom-input').val();
				
			var action = $(this).attr('action') + '/' + sessionCode;
		    window.location.href = action;
	});
});


validateSearchBottom = function($form) {
	$form.find(".alert").hide();

	isValid = true;
		
	var sessionCode = $('#index-bottom-input').val();
	
	if ( sessionCode == '' ) {	
				
		format  = '<div id="alert-bottom" class="alert alert-error fade in">';
		format += '<strong>No session code?</strong> We dont have anything to search.';
		format += '</div>';
		
		err = 'Please enter a session code.';
		
		$("#index-bottom-input").addClass("error-border");
		$("label[for='index-bottom-input']").text(err).addClass("error");
		
		isValid = false;
	} 
	
	return isValid;
	
}