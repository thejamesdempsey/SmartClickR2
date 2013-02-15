$(document).ready(function(){
	$('#response-form').submit(function(){
			if (false == validateResponse($(this))) {
				return false;
			}
	});
	
	
});


validateResponse = function($form){
	
	isValid = true;

//	var input = $('.mc_response').attr('checked');
	
	//var text = $('textarea[name="response"]').val();
	
	var mc = $('.mc_response:radio').is('checked');
	console.log(mc);
	var tf = $('.tf_response:radio').is('checked');
	console.log(tf);
	
	/*if (text == '')	{
		$form.find(".alert").hide();	
		format  = '<div class="alert alert-error fade in">';
		format += '<strong>No answer?</strong> That&rsquo;s just silly.';
		format += '</div>';
		
		$("#response-form").before(format);
		isValid = false;
	}*/
	if ( mc == false) {
		$form.find(".alert").hide();	
		format  = '<div class="alert alert-error fade in">';
		format += '<strong>No answer?</strong> That&rsquo;s just silly.';
		format += '</div>';
		
		$("#response-form").before(format);
		isValid = false;
		
	}
	
	if ( tf == false) {
		$form.find(".alert").hide();	
		format  = '<div class="alert alert-error fade in">';
		format += '<strong>No answer?</strong> That&rsquo;s just silly.';
		format += '</div>';
		
		$("#response-form").before(format);
		isValid = false;
		
	}
	
	return isValid;
	
}
