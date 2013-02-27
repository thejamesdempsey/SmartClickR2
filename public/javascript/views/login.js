$(document).ready(function(){
	$("#loginForm").ready(function() {	
		$('#email').focus()
		$(this).submit(function(e) {
			e.preventDefault();
			$(this).find(".alert").hide();


			var email = $('#email').val().trim();
			var pass = $('#password').val().trim();
			var remember = $('#remember-me').val();

			$(this).ajaxSubmit({
				type 	: 'POST',
				data 	: {"email": email, "password": pass, "remember-me": remember},
				url  	: '/login',

				beforeSubmit : function(formData, jqForm, options){	
								if (false == validateLogin($(this))) {
									return false;

								}
				},
			   	success : function(data, status, xhr){
							$('#email').removeClass("input-error").addClass('input-success');
							$('#password').removeClass("input-error").addClass('input-success');
							if(status == "success") window.location.href = '/user/' + data.res;
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
		return false;

	});



	validateLogin = function($form) {

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
			format += 'Looks like you forgot your password, <strong>' + emailVal + '.</strong>';
			format += '</div>';

			$('#email').removeClass("input-error");
			$('#password').removeClass("input-error").addClass('input-error');
			$("#login-container h1").after(format);
			isValid = false;
		} 

		return isValid;

	}



	$("#reset-password-form").ready(function() {
		$(this).submit(function(e) {
			e.preventDefault();
			$(this).find("#reset-password-form .alert").hide();


			var email = $('#email-change').val().trim();

			console.log('Errrybody was Kung Fu fighting');
			console.log(remember);


			$(this).ajaxSubmit({
				type 	: 'POST',
				data 	: {"email": email},
				url  	: '/lost-password',

				beforeSubmit : function(formData, jqForm, options){				
								if (false == validateEmail($(this))) {
									return false;
								}
				},
			   	success : function(data, status, xhr){
							$('#email-change').removeClass("input-error").addClass('input-success');						
							format  = '<div class="alert alert-success fade in">';
							format += '<strong>Rodger dodger, </strong> we have sent you an email and you should get it in the next few minutes. ';
							format += 'If it doesnt show up we can <a href="#">send it again</a>'
							format += '</div>';
							$("#email-change").after(format);


				},
				error	: function(e){
							format  = '<div class="alert alert-error fade in">';
							format += '<strong>Hmmmm, </strong> we could not find this email address';
							format += '</div>';

							$('#email-change').removeClass("input-error").addClass('input-error');
							$("#login-container h1").after(format);
				}

		});
		return false;


	});

	validateEmail = function($form) {
		isValid = true;

		var emailCheckVal = $("#email-change").val();

		if ( emailCheckVal == '' ) {
			format  = '<div class="alert alert-error fade in">';
			format += '<strong>No email?</strong> We need one to reset your password';
			format += '</div>';

			$('#email-change').removeClass("input-error").removeClass("input-success").addClass('input-error');

			$("#email-change").after(format);
			isValid = false;

		}

		return isValid;

	}

	});

	})
});

