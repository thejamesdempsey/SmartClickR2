$(document).ready(function() {
	
});

$("#signupForm").ready(function() {

	$("#firstName").focus();	

	$(this).submit(function(e){
		e.preventDefault();
		$(this).find(".error").hide();

		console.log('Errrybody was Kung Fu fighting');

		$(this).ajaxSubmit({
				type 	: 'POST',
				data 	: {"firstname": $("#firstName").val().trim(), "lastname": $("#lastName").val().trim(), "email": $("#email").val().trim(), "password" : $('#password').val().trim()},
				url  	: '/user/create',
				beforeSubmit : function(formData, jqForm, options){	
								$(this).find(".alert").hide();			
								if (false == validateSignup($(this))) {
									return false;
								}
				},
			   	success : function(data, status, xhr){
							console.log(data);
							$('#email').removeClass("input-error").addClass('input-success');
							$('#password').removeClass("input-error").addClass('input-success');
							format = '<div class="alert alert-success fade in">';
							format += '<span class="process"> Success. We are now sending you to the login page...'
							format += '</div>'
							$('#bottom-actions').before(format);
							if(status == "success") setTimeout("location.href = '/login'", 2000);
				},
				error	: function(e){
							//$('#email').removeClass("input-error").addClass('input-error');
							$("#email").after('<label class="error">An account with this email has already been created</label>');
				}
		});
	return false;

});

});

validateSignup = function($form) {
	$form.find(".error").hide();
	isValid = true;

	// Name

	var firstNameVal = $("#firstName").val();
	if ( firstNameVal == '' ) {
		$('#firstName').removeClass("input-error").addClass('input-error');
		$("#firstName").after('<label class="error">Please enter your first name</label>');

		isValid = false;
	} 

	var lastNameVal = $("#lastName").val();
	if ( lastNameVal == '' ) {
		$("#lastName").after('<label class="error">Please enter your last name</label>');
		$('#lastName').removeClass("input-error").addClass('input-error');

		isValid = false;
	}

	// Email
	var emailVal = $("#email").val();
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

	var emailVal = $("#email").val();
	if ( emailVal == '' ) {
		$("#email").after('<label class="error">Please enter your email address</label>');
		$('#email').removeClass("input-error").addClass('input-error');

		isValid = false;
	} else if (!emailReg.test( emailVal )){
		$("#email").after('<label class="error">Yikes! This is not valid email address</label>');
		$('#email').removeClass("input-error").addClass('input-error');

		isValid = false;
	}


	// Password
	var passwordVal = $('#password').val();
	if ( passwordVal == '' ) {
		$("#password").after('<label class="error">Please enter a password</label>');
		$('#password').removeClass("input-error").addClass('input-error');

		isValid = false;
	} else if (passwordVal.length < 6) {
		$("#password").after('<label class="error">Your password must be at least 6 characters</label>');
		$('#password').removeClass("input-error").addClass('input-error');

		isValid = false;
	} 

	// Terms Checkbox
	if ($('input[name=checkTerms]').is(':checked') ) {
		$form.find("#terms_error").hide();
	} else {
		$("#termsLabel").after('<label id="terms_error" class="error">This checkbox must be checked to continue</label>');
		isValid = false;
	}

	return isValid;
};