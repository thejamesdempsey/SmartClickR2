$(function(){
	$('#login_submit').click(function(e) {
		e.preventDefault();
		console.log('login submitted');
		
		var data = {};
		data.title = '';
		data.message = '';
		request.session.user = o[0];
		
		$.ajax({
			type: 'POST',
			data: JSON.stringify(data),
			url: '/user/' + o[0].User_ID,
			contentType : 'application/json',
			success : function(data) {
				console.log('success');
				console.log(JSON.stringify(data));
			}
		});
		
	});
});


/*
$(document).ready(function(){
	
	var lv = new LoginValidator();
	
	// main Login Form //
	$('#loginForm').ajaxForm({
		beforeSubmit : function(formData, jqForm, options) {
		//	if(lv.validateForm() == false){
		//		return false;
		//	} else {
		//		formData.push({name:'remember-me', value:$("input:checkbox:checked").length == 1})
		//		return true;	
		//	}	
		},
		success : function(responseText, status, xhr, $form) {
			if (status == 200) window.location.href = '/user/' + o[0].User_ID;
		},
		error : function(e) {
			lv.showLoginError('Login Failed, Please check your username and/or password');
		}
	});
	$('#email').focus();
});
*/