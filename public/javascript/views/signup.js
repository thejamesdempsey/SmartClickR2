
$("#signupForm").ajax({

	type 	: 'POST',
	data 	: {"firstname": $("#firstName").val().trim(), "lastname": $("#lastName").val().trim(), "email": $("#email").val().trim(), "password" : $('#password').val().trim()},
	url  	: '/user/create',
	success : function(data, status, xhr) {
		if(status == "success") window.location.href = '/login';

	},
	error 	: function(jqHRX, textStatus, errorThrown){
		console.log(textStatus);
			if (textStatus == 'error'){
				format  = '<div class="alert alert-error fade in">';
				format += '<strong>Uhh Ohh, </strong> your email address or password is incorrect';
				format += '</div>';
				
				$('#email').removeClass("input-error").addClass('input-error');
				$('#password').removeClass("input-error").addClass('input-error');
				
				$("#login-container h1").after(format);
				
			}						
		}

});