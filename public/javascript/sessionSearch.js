$(document).ready(function(){
	$('#index-session').submit(function(e) {
			if (false == validateSearch($(this))) {
				return false;
			} 
			
			e.preventDefault();
			
			sessionCode = $('#index-search').val();
				
			var action = $(this).attr('action') + '/' + sessionCode;
		    window.location.href = action;
	});
});
	   // e.preventDefault();
	
		//sessionCode = $('#index-search').val();
		
	//	console.log(sessionCode);
		
	  //  var action = $(this).attr('action') + '/' + sessionCode;
	    //window.location.href = action;
	//});
//});

validateSearch = function($form) {
	$form.find(".alert").hide();

	isValid = true;
		
	var sessionCode = $('#index-search').val();
	
	if ( sessionCode == '' ) {	
				
		format  = '<div class="alert alert-error fade in">';
		format += '<strong>No session code?</strong> We dont have anything to search.';
		format += '</div>';
		
		$("#index-session input").before(format);
		
		isValid = false;
	} 
	
	return isValid;
	
}