$("#reset-password").ready(function() {
	$('#email').focus();
	$(this).submit(function(e) {
		e.preventDefault();
		$(this).find(".alert").hide();


		var email = $('#email').val().trim();

		$(this).ajaxSubmit({
			type 	: 'POST',
			data 	: {"email": email},
			url  	: '/lostPassword',

			beforeSubmit : function(formData, jqForm, options){				
							if (false == validateEmail($(this))) {
								return false;
							}
			},
		   	success : function(data, status, xhr){
						$('#email').removeClass("input-error").addClass('input-success');						
						format  = '<div class="alert alert-success fade in">';
						format += '<strong>Rodger dodger, </strong> we have sent you an email and you should get it in the next few minutes.';
						format += '</div>';
						$("hr.line").after(format);
			},
			error	: function(e){
						format  = '<div class="alert alert-error fade in">';
						format += '<strong>Hmmmm, </strong> we could not find this email address';
						format += '</div>';

						$('#email').removeClass("input-error").addClass('input-error');
						$("#email").before(format);
			}

	});
	return false;

});

validateEmail = function($form) {
	isValid = true;

	var emailCheckVal = $("#email").val();

	if ( emailCheckVal == '' ) {
		format  = '<div class="alert alert-error fade in">';
		format += 'Please enter a valid email address';
		format += '</div>';

		$('#email').removeClass("input-error").removeClass("input-success").addClass('input-error');
		$('#email').focus();
		$("#email").before(format);
		isValid = false;

	}

	return isValid;

}

});

