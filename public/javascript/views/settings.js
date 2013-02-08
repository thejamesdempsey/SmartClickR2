$("#accountPasswordForm").ready(function() {
	
	$("#currentPassword").focus();	
	
	
	$(this).submit(function(e){
		e.preventDefault();
		
		var pass = $('#currentPassword').val().trim();
		var newpass = $('#newPassword').val().trim();
		var repass = $('#reNewPassword').val().trim();
		var id = $('#userId').val();
		
		
		$(this).find(".alert").hide();
		
		console.log('Errrybody was Kung Fu fighting');
		
				$(this).ajaxSubmit({
					type 	: 'POST',
					data 	: {"currentPassword": pass, "NewPassword": newpass, "reNewPassword": repass},
					url  	: '/user/edit/' + id,
					beforeSubmit : function(formData, jqForm, options){				
									if (false == validateSettings($(this))) {
										return false;
									}
					},
					success	: function(data, status, xhr){
						console.log(data)
						console.log(data.res)
						if (status == 'success'){
							format  = '<div class="alert alert-success fade in">';
							format += '<strong>Hooray!</strong> Your password has been changed';
							format += '</div>';

							$('#currentPassword').removeClass("input-error");
							$('#newPassword').removeClass("input-error");
							$('#reNewPassword').removeClass("input-error");
							$("#accountPasswordForm").resetForm();

							$("#passwordChangeLabel").after(format);
						}
					}, 
					error	: function(e){

								format  = '<div class="alert alert-error fade in">';
								format += '<strong>Yikes!</strong> Your current password is incorrect';
								format += '</div>';

								$('#currentPassword').removeClass("input-error").addClass('input-error');
								$('#newPassword').removeClass("input-error");
								$('#reNewPassword').removeClass("input-error");
								$("#accountPasswordForm").resetForm();

								$("#passwordChangeLabel").after(format);
					}					
							//format  = '<div class="alert alert-error fade in">';
						//	format += '<strong>Yikes!</strong> You entered a password but no email address';
						//	format += '</div>';				
			});
	return false;	
	});

});


validateSettings = function($form) {
	$form.find(".alert").hide();

	isValid = true;
		
	var currentVal = $("#currentPassword").val();
	var newVal 	   = $('#newPassword').val();
	var repeatVal   = $('#reNewPassword').val();
	
	if ( currentVal == '' && newVal == '' && repeatVal == '') {
		
		format  = '<div class="alert alert-error fade in">';
		format += '<strong>Hmmmm.</strong> You didnt enter anything for us to change';
		format += '</div>';
		
		$('#currentPassword').removeClass("input-error").addClass('input-error');
		$('#newPassword').removeClass("input-error").addClass('input-error');
		$('#reNewPassword').removeClass("input-error").addClass('input-error');
		
		
		$("#passwordChangeLabel").after(format);
		isValid = false;
		
	} else if(currentVal == '') {
		
		format  = '<div class="alert alert-error fade in">';
		format += '<strong>Yikes!</strong> You entered in a new password but not the current one';
		format += '</div>';
		
		
		$('#currentPassword').removeClass("input-error").addClass('input-error');
		$('#newPassword').removeClass("input-error");
		$('#reNewPassword').removeClass("input-error");
		
		$("#passwordChangeLabel").after(format);
		isValid = false;
		
	} else if( newVal == '' ) {
		
		format = '<div class="alert alert-error fade in">';
		format += 'We need to know what to make your new password';
		format += '</div>';
		
		$('#currentPassword').removeClass("input-error");
		$('#newPassword').removeClass("input-error").addClass('input-error');
		$('#reNewPassword').removeClass("input-error");
		
		$("#passwordChangeLabel").after(format);
		isValid = false;
	} else if( repeatVal == '' ) {

		format = '<div class="alert alert-error fade in">';
		format += 'For security reasons we need you to repeat your new password';
		format += '</div>';

		$('#currentPassword').removeClass("input-error");
		$('#newPassword').removeClass("input-error");
		$('#reNewPassword').removeClass("input-error").addClass('input-error');

		$("#passwordChangeLabel").after(format);
		
		isValid = false;
	} 
	
	return isValid;
	
}