$("#accountPasswordForm").ready(function() {
	$(this).submit(function(e){
		e.preventDefault();
		
		var pass = $('#currentPassword').val().trim();
		var newpass = $('#newPassword').val().trim();
		var repass = $('#reNewPassword').val().trim();
		var id = $('#userId').val();
		
		console.log(id);
		console.log('/user/edit/' + id);
		
		console.log('Errrybody was Kung Fu fighting');
		
		//if (pass != '' && newpass != '' && repass != ''){
				$("#accountPasswordForm").ajaxForm({
					type 	: 'POST',
					data 	: {"currentPassword": pass, "NewPassword": newpass, "reNewPassword": repass},
					url  	: '/user/edit/' + id,
					success	: function(data){
						if (data.res == 'success'){
							format  = '<div class="alert alert-success fade in">';
							format += '<strong>Hooray!</strong> Your password has been changed';
							format += '</div>';

							$('#currentPassword').removeClass("input-error");
							$('#newPassword').removeClass("input-error");
							$('#reNewPassword').removeClass("input-error");
							$("#accountPasswordForm").resetForm();

							$("#passwordChangeLabel").after(format);

							console.log(data.res);
						} else if (data.res == 'wrong'){

								format  = '<div class="alert alert-error fade in">';
								format += '<strong>Yikes!</strong> Your current password is incorrect';
								format += '</div>';

								$('#currentPassword').removeClass("input-error").addClass('input-error');
								$('#newPassword').removeClass("input-error");
								$('#reNewPassword').removeClass("input-error");
								$("#accountPasswordForm").resetForm();

								$("#passwordChangeLabel").after(format);

								console.log(jqHRX.status, textStatus, errorThrown);
							} else if (data.res == 'no match'){

									format  = '<div class="alert alert-error fade in">';
									format += '<strong>Uhh Ohh!</strong> Your passwords do not match';
									format += '</div>';

									$('#currentPassword').removeClass("input-error");
									$('#newPassword').removeClass("input-error").addClass('input-error');
									$('#reNewPassword').removeClass("input-error").addClass('input-error');
									$("#accountPasswordForm").resetForm();

									$("#passwordChangeLabel").after(format);
							}

					}						
							//format  = '<div class="alert alert-error fade in">';
						//	format += '<strong>Yikes!</strong> You entered a password but no email address';
						//	format += '</div>';	
			return false;
			});
	//	}
	return false;	
	});
	return false;	

});