$(document).ready(function() {
	$("#hidden_actions").css("display","none");
	
	$("input#poll_check").click(function() {
		if($("input#poll_check").is(":checked")){
			$("#hidden_actions").show();
		} else {
			$("#hidden_actions").hide();
		}
	});
});
