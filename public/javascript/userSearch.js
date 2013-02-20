$(document).ready(function(){
	$('#index-session').submit(function(e) {
			if (false == validateUserSearch($(this))) {
				return false;
			} 
			
			e.preventDefault();
			
			sessionCode = $('#index-search').val();
				
			var action = $(this).attr('action') + '/' + sessionCode;
		    window.location.href = action;
	});
});


validateUserSearch = function($form) {
	$('#index-session').find("div.alert").hide();

	isValid = true;
		
	var sessionCode = $('#index-search').val();
	
	if ( sessionCode == '' ) {	
				
		format = '<div class="alert alert-error">';		
		format += '<strong>No session code?</strong> We dont have anything to search.';
		format += '</div>';
		
		err = 'Please enter a session code.';
		
		$("#index-search").addClass("error-border");
		$("label[for='index-search']").text(err).addClass("error");
		
		
		
		// $("index-search").focus(format.hide());		
		
		isValid = false;
	} 
	
	return isValid;
	
}