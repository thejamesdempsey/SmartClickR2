$(document).ready(function(){
	$('#index-session').submit(function(e) {

	    e.preventDefault();
	
		sessionCode = $('#index-search').val();
		
		console.log(sessionCode);
		
	    var action = $(this).attr('action') + '/' + sessionCode;
	    window.location.href = action;
	});
});

/*
$('#index-session').submit(function(e) {
	if ('#index-session input' == null){
		$("#index-session input").append('<label class="error animated fadeInDown"> You must enter a session code in order to search</label>');	
	}
    e.preventDefault();
    var action = $(this).attr('action') + '/' + $('[name=session]', this).val();
    window.location.href = action;
});*/