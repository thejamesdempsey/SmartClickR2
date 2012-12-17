$(document).ready(function() {
	var av = new AccountValidator();
	
	$('#signupForm.ajax').ajaxForm({
		beforeSubmit : function(formData, jqForm, options) {
			return av.validateForm();
		},
		success : function(responseText, status, xhr, $form) {
			if (status == 'success') $('.modal-alert').modal('show');
		},
		error : function(e){
			if (e.responseText) == 'email-taken') {
				av.showInvalidEmail();
			} 
		}
	});
	$('#fullName').focus();
	
// customize the account signup form
	
//	$('#signup-form h1').text("Let's get started");
//	$('#account-form #sub1').text("It's simple. We only need your name, email and password");
//	$('#account-form-btn2').html('Submit');
//	$('#account-form-btn2').addClass('btn-primary');
	
// setup alerts 

//	$('.modal-alert').modal({ show : false, keyboard : false, backdrop : 'static' });
//	$('.modal-alert .modal-header h3').text('Success!');
//	$('.modal-alert .modal-body p').html('Your account has been created.</br>Click OK to return to the login page.');
});