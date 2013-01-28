$("#email").focus();

$(".alert").alert();

$("#loginForm").ready(function() {
	$(".alert").alert('close');
	$(this).submit(function() {
		if (false == validateLogin($(this))) {
			return false;
		} 
		
		
	});
});

validateLogin = function($form) {
	$form.find(".alert").hide();

	
	
	isValid = true;
		
	var emailVal = $("#email").val();
	var passwordVal = $('#password').val();
	
	if ( emailVal == '' && passwordVal == '') {
		
		format  = '<div class="alert alert-error fade in">';
		format += '<strong>No email or password?</strong> That&rsquo;s just silly.';
		format += '</div>';
		
		$('#email').removeClass("input-error").addClass('input-error');
		$('#password').removeClass("input-error").addClass('input-error');
		
		$("#login-container h1").after(format);
		isValid = false;
		
	} else if(emailVal == '') {
		
		format  = '<div class="alert alert-error fade in">';
		format += '<strong>Yikes!</strong> You entered a password but no email address';
		format += '</div>';
		
		
		$('#email').removeClass("input-error").addClass('input-error');
		$('#password').removeClass("input-error");
		$("#login-container h1").after(format);
		isValid = false;
		
	} else if( passwordVal == '' ) {
		
		format = '<div class="alert alert-error fade in">';
		format += 'Looks like you forgot your password, ' + emailVal + '.';
		format += '</div>';
		
		$('#email').removeClass("input-error");
		$('#password').removeClass("input-error").addClass('input-error');
		$("#login-container h1").after(format);
		isValid = false;
	} 
	
	return isValid;
	
}