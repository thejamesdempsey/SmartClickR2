$("#loginForm").ready(function() {
	$(this).submit(function() {
		if (false == validateLogin($(this))) {
			return false;
		} 
		
		
	});
});



validateLogin = function($form) {
	$form.find(".error").removeClass().hide();
	isValid = true;
		
	var emailVal = $("#email").val();
	var passwordVal = $('#password').val();
	
	if ( emailVal == '' && passwordVal == '') {
		$("#login-container h1").after('<label class="error animated fadeInDown">No email or password? Thats silly.</label>');
		isValid = false;
	} else if(emailVal == '') {
			$("#login-container h1").after('<label class="error animated fadeInDown">Yikes! You entered a password but no email address</label>');
			isValid = false;
	} else if( passwordVal == '' ) {
		$("#login-container h1").after('<label class="error animated fadeInDown">Looks like you forgot your password, ' + emailVal + '.</label>');
		isValid = false;
	} 
	
	return isValid;
	
}