$("#accountPasswordForm").ready(function() {
	$(this).submit(function() {
		
		var pass = $('#currentPassword').val().trim();
		var newpass = $('#newPassword').val().trim();
		var repass = $('#renewPassword').val().trim();
		
		console.log('Errrybody was Kung Fu fighting');
		console.log(email, pass);
		
		$(this).ajaxForm({
			type 	: 'POST',
			data 	: {"email": email, "password": pass},
			url  	: '/login',
		   	error 	: function(jqHRX, textStatus, errorThrown){
					if (textStatus == 'error'){
						$("#login-container h1").after('<label class="error"> <p>Your username or password was incorrect</label>');
						console.log(jqHRX.status, textStatus, errorThrown);
					} else {
						$("#login-container h1").after('<label class="error"> <p>Your username or password was incorrect</label>');
						
					}
											
					format  = '<div class="alert alert-error fade in">';
					format += '<strong>Yikes!</strong> You entered a password but no email address';
					format += '</div>';	
	});


});

});