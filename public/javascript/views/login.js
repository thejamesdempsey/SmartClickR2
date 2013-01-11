$("#loginForm").ready(function() {
	$(this).submit(function() {
		
		var email = $('#email').val().trim();
		var pass = $('#password').val().trim();
		
		console.log('Errrybody was Kung Fu fighting');
		console.log(email, pass);
		
		$(this).ajaxForm({
			type 	: 'POST',
			data 	: {"email": email, "password": pass},
			url  	: '/login',
		   	error 	: function(jqHRX, textStatus, errorThrown){
					if (textStatus == 'error'){
						$("#login-container h1").after('<label class="error"> <p>Your username or password was incorrect</label>');
					}						
						console.log(jqHRX.status, textStatus, errorThrown);
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


