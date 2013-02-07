$("#currentPassword").focus();

$(".alert").alert();

$("#accountPasswordForm").ready(function() {
	//$(".alert").alert('close');
	$(this).submit(function() {
		var pass = $('#currentPassword').val().trim();
		var newpass = $('#newPassword').val().trim();
		var repass = $('#reNewPassword').val().trim();
		var id = $('#userId').val();
		
		if (false == validateSettings($(this))) {
			return false;
		}
		
		
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