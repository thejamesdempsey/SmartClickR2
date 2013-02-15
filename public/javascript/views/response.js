$(document).ready(function(){
	$('#response-form').submit(function(){
			$(this).find(".alert").hide();			
			if (false == validateResponse($(this))) {
				return false;
			}
	});
	
	
});





validateResponse = function($form){
	
	isValid = true;

	var selected = $('input[type=radio]:checked');
	
	
	
	if (selected.length == 0){
		
		format  = '<div class="alert alert-error fade in">';
		format += '<strong>No answer?</strong> That&rsquo;s just silly.';
		format += '</div>';
		
		$("#response-form").before(format);
		isValid = false;
		
	}
	
	return isValid;
	
}
