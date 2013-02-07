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
	$form.find(".alert").hide();

	isValid = true;
		
	var sessionCode = $('#index-search').val();
	
	if ( sessionCode == '' ) {	
				
		format  = '<div id="alert-bottom" class="alert alert-error fade in">';
		format += '<strong>No session code?</strong> We dont have anything to search.';
		format += '</div>';
		
		$("#index-session").after(format);
		
		isValid = false;
	} 
	
	return isValid;
	
}