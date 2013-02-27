$('#response-form').ready(function(){

	$(this).submit(function(){
			if (false == validateResponse($(this))) {
				return false;
			}
	});
	
});


validateResponse = function($form){
		
	isValid = true;
	
	var numberRegex = /^[+-]?\d+(\.\d+)?([eE][+-]?\d+)?$/;

	emptyError = '<div class="alert alert-error fade in">';
	emptyError += '<strong>No answer?</strong> That&rsquo;s just silly.';
	emptyError += '</div>';
	
	numError = '<div class="alert alert-error fade in">';
	numError += '<strong>Whoops,</strong> You answer must be a number';
	numError += '</div>';
	
/*	for ( i = 0; i < required.length; i++ ){
		var input = $(required[i]);
		if( input.val() == ""){
			$form.find(".alert").hide();	

			$("#response-form").before(emptyError);
			isValid = false;
		} 
	}*/
	
	if($('#response-form').find('#mc-container').length == 1) {
		var mc = $('input[name="response"]:checked').val();
		console.log(mc);
		
		if ( !mc) {
			$form.find(".alert").hide();	
			$("#response-form").before(emptyError);
			isValid = false;
		}
			
	} 
	
	else if($('#response-form').find('#tf-container').length == 1) {
		var tf = $('input[name="response"]:checked').val();
		console.log(tf);
		
		if ( !tf) {
			$form.find(".alert").hide();	

			$("#response-form").before(emptyError);
			isValid = false;
		} 	
	} 
	
	if($('#response-form').find('#free-container').length == 1) {
		var free =  $('.f_response').val().trim();
		console.log(free);
		
		if (free == ""){
			$form.find(".alert").hide();	

			$("#response-form").before(emptyError);
			isValid = false;

		}	
	}
	
	if($('#response-form').find('#num-container').length == 1) {
		var num = $('.n_response').val().trim();
		console.log(num);
		console.log(numberRegex.test(num));
		
		if (num == ""){
			$form.find(".alert").hide();	

			$("#response-form").before(emptyError);
			isValid = false;

		} else if ( numberRegex.test(num) == false){
			$form.find("div.alert").hide();	

			$("#response-form").before(numError);
			isValid = false;
		}	
	}
	
	
	return isValid;
		
}
