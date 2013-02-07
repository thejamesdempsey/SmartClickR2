$("#accountPasswordForm").ajaxForm({
	
	var firstname = $("#firstName").val();
	var lastname = $("#lastName").val();
	var email = $("#email").val();
	var password = $('#password').val();
	
	
	
	type 	: 'POST',
	data 	: {"firstname": firstname, "lastname": lastname, "email": email, "password" : password},
	url  	: '/user/edit/' + id,
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