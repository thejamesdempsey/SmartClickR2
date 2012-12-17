$(document).ready(function() {
	$('signupForm').validate({
		rules : 
		{
			firstName	: 
			{
				required : true,
				letters	 : true
			},
			lastname : 
			{
				required : true,
				letters	 : true
			},
			email : 
			{
				email	 : true,
				required : true
			},
			password : 
			{
				required  : true,
				minlength : 6 
			}
		},
		messages :
		{
			firstName : 
			{
				required	: 'Please enter your first name',
				letters		: 'Please enter letters only'
			},
			lastName :
			{
				required	: 'Please enter your last name',
				letters		: 'Please enter letters only'
			},
			email :
			{
				required	: 'Please enter your email',
				email		: 'Please enter a valid email address'
			},
			password :
			{
				required	: 'Please enter a password',
				minlength	: 'Your password must be at least 6 characters' 
			}
		}
		
	});
});

