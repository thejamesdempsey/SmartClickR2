$("#loginForm").ready(function() {
		
	
	$("input #email").focus();	
	
	$(this).submit(function(e) {
		e.preventDefault();
		
		var email = $('#email').val().trim();
		var pass = $('#password').val().trim();
		
		console.log('Errrybody was Kung Fu fighting');
		
		$(this).ajaxSubmit({
			type 	: 'POST',
			data 	: {"email": email, "password": pass},
			url  	: '/login',
		   	success : function(responseText, status, xhr, $form){
							if (status == 'success') window.location.href = '/user/'+ o[0].User_ID;
							console.log('/user/'+ o[0].User_ID);
			},
			error	: function(e){
				format  = '<div class="alert alert-error fade in">';
				format += '<strong>Uhh Ohh, </strong> your email address or password is incorrect';
				format += '</div>';
				
				$('#email').removeClass("input-error").addClass('input-error');
				$('#password').removeClass("input-error").addClass('input-error');
				
				$("#login-container h1").after(format);
			}
				/*	if (textStatus == 'error'){
						format  = '<div class="alert alert-error fade in">';
						format += '<strong>Uhh Ohh, </strong> your email address or password is incorrect';
						format += '</div>';
						
						$('#email').removeClass("input-error").addClass('input-error');
						$('#password').removeClass("input-error").addClass('input-error');
						
						$("#login-container h1").after(format);
						
					} else	 {
						location.href = '/user/' + o[0].User_ID;
					}					
				}/*,
			success	: function(textStatus){
				if (o){
					location.href = '/user/' + o[0].User_ID;
				}
			} */
		
	});
	return false;

});

});


