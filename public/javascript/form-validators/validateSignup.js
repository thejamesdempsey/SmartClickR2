$('#firstName').focus();

$("#signupForm").ready(function() {
	$(this).submit(function() {
		if (false == validateSignup($(this))) {
			return false;
		} 
		
		
	});
});

validateSignup = function($form) {
	$form.find(".error").removeClass().hide();
	isValid = true;
	
	// Name
	
	var firstNameVal = $("#firstName").val();
	if ( firstNameVal == '' ) {
		$("#firstName").after('<label class="error animated fadeInDown">Please enter your first name</label>');
		isValid = false;
	} 
	
	var lastNameVal = $("#lastName").val();
	if ( lastNameVal == '' ) {
		$("#lastName").after('<label class="error animated fadeInDown">Please enter your last name</label>');
		isValid = false;
	}
	
	// Email
	var emailVal = $("#email").val();
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	
	var emailVal = $("#email").val();
	if ( emailVal == '' ) {
		$("#email").after('<label class="error animated fadeInDown">Please enter your email address</label>');
		isValid = false;
	} else if (!emailReg.test( emailVal )){
		$("#email").after('<label class="error animated fadeInDown">Yikes! This is not valid email address</label>');
		isValid = false;
	}
	
	
	// Password
	var passwordVal = $('#password').val();
	if ( passwordVal == '' ) {
		$("#password").after('<label class="error animated fadeInDown">Please enter a password</label>');
		isValid = false;
	} else if (passwordVal.length < 6) {
		$("#password").after('<label class="error animated fadeInDown">Your password must be at least 6 characters</label>');
		isValid = false;
	} 
	
	// Terms Checkbox
	if ($('input[name=checkTerms]').is(':checked') ) {
		$form.find("#terms_error").hide();
	} else {
		$("#termsLabel").after('<label id="terms_error" class="error  animated fadeInDown">This checkbox must be checked to continue</label>');
		isValid = false;
	}
	
	return isValid;
};