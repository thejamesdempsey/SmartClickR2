$("#contact-us").ready(function() {
	$('#yourName').focus();
	$(this).submit(function(e) {
		e.preventDefault();
		$(this).find(".alert").hide();
		
		var name = $('#yourName').val().trim();
		var email = $("#yourEmail").val().trim();
		var subject = $('#yourSubject').val().trim();
		var message = $('#yourMessage').val().trim();

		$(this).ajaxSubmit({
			type 	: 'POST',
			data 	: {"name": name, "email": email, "subject": subject, "message" : message},
			url  	: '/contact',

			beforeSubmit : function(formData, jqForm, options){				
							if (false == validateContact($(this))) {
								return false;
							}
							else{
								format = '<div class="alert alert-info fade in">';
								format += '<span class="sending-gif"> Sending your email...'
								format += '</div>'
								$(".send-btn").before(format);
							}
			},
		   	success : function(data, status, xhr){
						console.log(data);
						console.log(status);
						console.log(xhr);
						$('#yourName').removeClass("input-error");						
						$('#yourEmail').removeClass("input-error");	
						$('#yourSubject').removeClass("input-error");
						$('#yourMessage').removeClass("input-error");											
						format  = '<div class="alert alert-success fade in">';
						format += '<strong>Rodger dodger, </strong> your email has been sent. We will get back to you as soon as possible';
						format += '</div>';
						$('.alert-info').hide();
						$(".send-btn").before(format);
						
			},
			error	: function(e){
						format  = '<div class="alert alert-error fade in">';
						format += '<strong>Hmmmm, </strong> something went wrong with sending this email';
						format += '</div>';
						$('.alert-info').hide();
						$(".send-btn").before(format);
						
			}

	});
	return false;

});

validateContact = function($form) {
	isValid = true;

	var name = $('#yourName').val();
	var email = $("#yourEmail").val();
	var emailReg =  /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	var subject = $('#yourSubject').val();
	var message = $('#yourMessage').val();


	if ( name == '' ) {
		format  = '<div class="alert alert-error fade in">';
		format += 'We need to know what to call you';
		format += '</div>';

		$('#yourName').removeClass("input-error").removeClass("input-success").addClass('input-error');
		$("#yourName").before(format);
		isValid = false;

	}
	
	if ( email == '' ) {
		format  = '<div class="alert alert-error fade in">';
		format += 'We need to know your email address';
		format += '</div>';

		$('#yourEmail').removeClass("input-error").removeClass("input-success").addClass('input-error');
		$("#yourEmail").before(format);
		isValid = false;

	} else if ( !emailReg.test(email) ){
		format  = '<div class="alert alert-error fade in">';
		format += 'Yikes! This is not a valid email address';
		format += '</div>';

		$('#yourEmail').removeClass("input-error").removeClass("input-success").addClass('input-error');
		$("#yourEmail").before(format);
		isValid = false;
	}
	
	if ( subject == '' ) {
		format  = '<div class="alert alert-error fade in">';
		format += 'We need you to enter a subject';
		format += '</div>';

		$('#yourSubject').removeClass("input-error").removeClass("input-success").addClass('input-error');
		$("#yourSubject").before(format);
		isValid = false;

	}
	
	if ( message == '' ) {
		format  = '<div class="alert alert-error fade in">';
		format += 'We need you to enter a message';
		format += '</div>';

		$('#yourMessage').removeClass("input-error").removeClass("input-success").addClass('input-error');
		$("#yourMessage").before(format);
		isValid = false;

	}
	
	if ( name == '' ) {
		$('#yourName').focus();
	} else if ( email == '' ) {
		$('#yourEmail').focus();	
	} else if ( !emailReg.test(email) ){
		$('#yourEmail').focus();	
	}else if ( subject == '' ) {
		$('#yourSubject').focus();	
	} else if ( message == '' ) {
		$('#yourMessage').focus();	
	}
	

	return isValid;

}

});