$("#loginForm").ready(function() {

	$("#email").focus();	
	
	$(this).submit(function(e) {
		//e.preventDefault();
		$(this).find(".alert").hide();
		
		
		var email = $('#email').val().trim();
		var pass = $('#password').val().trim();
		
		console.log('Errrybody was Kung Fu fighting');
		
		
		$(this).ajaxSubmit({
			type 	: 'POST',
			data 	: {"email": email, "password": pass},
			url  	: '/login',
<<<<<<< HEAD
			beforeSubmit : function(formData, jqForm, options){				
							if (false == validateLogin($(this))) {
								return false;
							}
			},
		   	success : function(responseText, status, xhr, $form){
							//if (status == 'success') window.location.href = '/user/'+ o[0].User_ID;
							//console.log('/user/'+ o[0].User_ID);
							
							$('#email').removeClass("input-error").addClass('input-success');
							$('#password').removeClass("input-error").addClass('input-success');
=======
		   	success : function(data, status, xhr){
	
				if(status == "success") window.location.href = '/user/' + data.res;
				
>>>>>>> d429227a424fc9ce2eddd210c7dad02c01ca57cd
			},
			error	: function(e){
				
						format  = '<div class="alert alert-error fade in">';
						format += '<strong>Uhh Ohh, </strong> your email address or password is incorrect';
						format += '</div>';
				
						$('#email').removeClass("input-error").addClass('input-error');
						$('#password').removeClass("input-error").addClass('input-error');
						$("#login-container h1").after(format);
			}
		
	});
	//return false;

});

});


validateLogin = function($form) {
	$(this).find(".alert").hide();

	isValid = true;
		
	var emailVal = $("#email").val();
	var passwordVal = $('#password').val();
	
	if ( emailVal == '' && passwordVal == '') {
		$(this).find(".alert").hide();
		format  = '<div class="alert alert-error fade in">';
		format += '<strong>No email or password?</strong> That&rsquo;s just silly.';
		format += '</div>';
		
		$('#email').removeClass("input-error").addClass('input-error');
		$('#password').removeClass("input-error").addClass('input-error');
		
		$("#login-container h1").after(format);
		isValid = false;
		
	} else if(emailVal == '') {
		$(this).find(".alert").hide();
		format  = '<div class="alert alert-error fade in">';
		format += '<strong>Yikes!</strong> You entered a password but no email address';
		format += '</div>';
		
		
		$('#email').removeClass("input-error").addClass('input-error');
		$('#password').removeClass("input-error");
		$("#login-container h1").after(format);
		isValid = false;
		
	} else if( passwordVal == '' ) {
		$(this).find(".alert").hide();
		
		format = '<div class="alert alert-error fade in">';
		format += 'Looks like you forgot your password, <strong>' + emailVal + '.</strong>';
		format += '</div>';
		
		$('#email').removeClass("input-error");
		$('#password').removeClass("input-error").addClass('input-error');
		$("#login-container h1").after(format);
		isValid = false;
	} 
	
	return isValid;
	
}



