

$("#accountPasswordForm").ready(function(){
	$(this).ready(function() {

		$("#currentPassword").focus();	


		$("#accountPasswordForm").submit(function(e){
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
						beforeSubmit : function(){
							
							var currentVal = $("#currentPassword").val();
							var newVal 	   = $('#newPassword').val();
							var repeatVal   = $('#reNewPassword').val();

							if ( currentVal == '' && newVal == '' && repeatVal == '') {
							 	format = '<div class="alert alert-error fade in">';
								format += '<strong>Hmmmm.</strong> You didnt enter anything for us to change';
								format += '</div>';
								
								$('#currentPassword').removeClass("input-error").addClass('input-error');
								$('#newPassword').removeClass("input-error").addClass('input-error');
								$('#reNewPassword').removeClass("input-error").addClass('input-error');


								$("#passwordChangeLabel").after(format);
								return false;

							} else if(currentVal == '') {
								
								format = '<div class="alert alert-error fade in">';
								format += '<strong>Yikes.</strong> You need to enter your current password';
								format += '</div>';
								
								$('#currentPassword').removeClass("input-error").addClass('input-error');
								$('#newPassword').removeClass("input-error");
								$('#reNewPassword').removeClass("input-error");

								$("#passwordChangeLabel").after(format);
								return false;

							} else if( newVal == '' ) {

								format = '<div class="alert alert-error fade in">';
								format += '<strong>Uh Oh.</strong> We need to know what to make your new password';
								format += '</div>';
								
								$('#currentPassword').removeClass("input-error");
								$('#newPassword').removeClass("input-error").addClass('input-error');
								$('#reNewPassword').removeClass("input-error");

								$("#passwordChangeLabel").after(format);

								return false;
							} else if( repeatVal == '' ) {

								format = '<div class="alert alert-error fade in">';
								format += '<strong>Whoops</strong> For security reason we need you to enter your new password again';
								format += '</div>';
								
								$('#currentPassword').removeClass("input-error");
								$('#newPassword').removeClass("input-error");
								$('#reNewPassword').removeClass("input-error").addClass('input-error');

								$("#passwordChangeLabel").after(format);

								return false;
							} else if (newVal != repeatVal){
								
								format = '<div class="alert alert-error fade in">';
								format += '<strong>Bummer</strong> These passwords do not match';
								format += '</div>';
								
								$('#currentPassword').removeClass("input-error");
								$('#newPassword').removeClass("input-error").addClass('input-error');
								$('#reNewPassword').removeClass("input-error").addClass('input-error');

								$("#passwordChangeLabel").after(format);

								return false;
							}

								return true;
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

})






$("#deleteAcct").ready(function(){
	
	$("#typeDelete").focus();	
	
	$("#deleteAcct").submit(function() {
		if (false == validateDelete($(this))) {
			return false;
		}  
	});
		
});


validateDelete = function(){
	
	isValid = true;
	
	var input = $("#typeDelete").val().trim().toUpperCase();
	
	$("#deleteAcct").find("div.alert").hide();
	
	if ( input == '' ){
		format = '<div class="alert alert-error fade in">';
		format += "<strong>Since this cannot be undone we need you to type 'DELETE' to confirm this action.</strong>";
		format += '</div>';
		
		$('#typeDelete').removeClass("input-error").addClass('input-error');
		
		$("#typeDelete").before(format);
		
		isValid = false;
	}
	
	else if ( input != 'DELETE' ){
		format = '<div class="alert alert-error fade in">';
		format += "<strong>Yikes, </strong>you did not enter the word 'DELETE'.";
		format += '</div>';
		
		$('#typeDelete').removeClass("input-error").addClass('input-error');
		
		$("#typeDelete").before(format);
		
		isValid = false;
	}
	
	return isValid;
	
}

