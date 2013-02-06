$("#loginForm").ready(function() {
	$("input #email").focus();	
	$(this).submit(function() {
		
		var email = $('#email').val().trim();
		var pass = $('#password').val().trim();
		
		console.log('Errrybody was Kung Fu fighting');
		
		$(this).ajaxForm({
			type 	: 'POST',
			data 	: {"email": email, "password": pass},
			url  	: '/login',
		   	error 	: function(jqHRX, textStatus, errorThrown){
					if (textStatus == 'error'){
						format  = '<div class="alert alert-error fade in">';
						format += '<strong>Uhh Ohh, </strong> your email address or password is incorrect';
						format += '</div>';
						
						$('#email').removeClass("input-error").addClass('input-error');
						$('#password').removeClass("input-error").addClass('input-error');
						
						$("#login-container h1").after(format);
						
					}						
				}
						//if ( error == 'user-not-found') {
						// 	$(body).after('<div class="top-error"> <p>Your username was not found</p></div>')
						// }
						// 				
						// if ( error == 'invalid-password') {
						// 	$(body).after('<div class="top-error"> <p>Your password did not match our records</p</div>')
						// }
	});


});

});


