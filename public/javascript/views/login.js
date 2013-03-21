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
								else{
									format = '<div class="alert alert-info fade in">';
									format += '<span class="process"> Processing...'
									format += '</div>'
									$("#login-container h1").after(format);
								}
				},
			   	success : function(data, status, xhr){
							$('#email').removeClass("input-error").addClass('input-success');
							$('#password').removeClass("input-error").addClass('input-success');
							$("#login-container h1").after(format);
							$('.alert-info').hide();
							if(status == "success") window.location.href = '/user/' + data.res;
				},
				error	: function(e){
							format  = '<div class="alert alert-error fade in">';
							format += '<strong>Uhh Ohh, </strong> your email address or password is incorrect';
							format += '</div>';
							$('.alert-info').hide();
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

	})
});

