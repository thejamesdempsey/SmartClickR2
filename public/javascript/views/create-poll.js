$(document).ready(function() {
	var counter = 1;
	var sesionCode = '';
	$('#save_quitBtn').hide();
	
/*	
	var autosaveOn = false;
	function myAutosavedTextbox_onTextChanged()
	{
	    if (!autosaveOn)
	    {
	        autosaveOn = true;

	        $('#myAutosavedTextbox').everyTime("100000", function(){
	             $.ajax({
	                 type: "POST",
	                 url: "autosavecallbackurl",
	                 data: "id=1",
	                 success: function(msg) {
	                     $('#autosavenotify').text(msg);
	                 }
	         });
	    }
	}
*/	

$('#create_content').ready(function() {
	$(this).submit(function() {
		if (false == saveAndQuit($(this))) {
			return false;
		}
	});
});

saveAndQuit = function($form) {
	var pollName = $('#pollName').val().trim();
	isValid = true;
	
	$('#poll_info').find(".error").hide();
	
	if( pollName == '' ) {
		$('#poll_info').find(".error").hide();
		$('#pollNameLabel').after('<label class="error"> Your poll needs a name. </label>');
		$('#pollName').addClass('errorBorder');
		isValid = false;
	}
		
	return isValid;
	
}
/*	requiredTitle = function($('#poll_info') {
		$('#poll_info').find(".error").removeClass().hide();
		isFilled = true;
		
		var titleVal = $("#pollName").val();
		
		if ( titleVal == '' ) {
			$('label #pollName').after('<label class="error animated fadeInDown"> Your poll needs a name. </label>');
			isFilled = false;
		}
		
		return isFilled;
	});*/
	
		
	$('#save_quitBtn').click(function() {
		var pollName = $('#pollName').val().trim();
		
		if( pollName == '' ) {
			$('#poll_info').find(".error").hide();
			$('#pollNameLabel').after('<label class="error"> Your poll needs a name. </label>');
		}
	});
		
	$('#createPollBtn').click(function() {
		var userID = $('#userId').val();
		var pollName = $('#pollName').val().trim();
		var pollDescription = $('#pollDescription').val();		
		
		if( pollName == '' ) {
			$('#poll_info').find(".error").hide();
			$('#pollNameLabel').after('<label class="error"> Your poll needs a name. </label>');
		} else {
			$('#poll_info').find(".error").hide();
			$('ol.poll-grid').show("blind");
			$('#createPollBtn').hide();
			$('#save_quitBtn').show("blind");
			$.ajax({
				type:"POST",
				url:"/user/" + userID + "/poll/create",
				data: {"id": userID, "pollName": pollName, "pollDescription": pollDescription},
				success: function(msg) {
					console.log('New Poll Created... Session Code:' + msg);
					sessionCode = msg;
					$('#sessionCode').val(msg);
				}
			});
		}
		
	});

	
	
	$('#multipleChoiceBtn').click(function() {
		$('ol.poll-grid').hide("blind", "slow");
		
		var format = "<article class='question_wrap' id='multipleChoice_question" + counter + "'>";
		
		format += "<h3>Multiple Choice</h3>";
		format += "<textarea class='textarea_small' placeholder='What would you like to ask?' />";
		format += "<fieldset class='six columns'>";
		format += "<span>a)</span>";
		format += "<input type='text' class='mc_response' name='question-"+counter+"_response-1' placeholder='I am a possible answer'/>"
		format += "</fieldset>";
		format += "<fieldset class='six columns'>";
		format += "<span>b)</span>";
		format += "<input type='text' class='mc_response' name='question-"+counter+"_response-2' placeholder='I am another possible answer'/>"
		format += "</fieldset>";
		format += "<fieldset class='six columns'>";
		format += "<span>c)</span>";
		format += "<input type='text' class='mc_response' name='question-"+counter+"_response-3' placeholder='Yet another possible answer'/>"
		format += "</fieldset>";
		format += "<fieldset class='six columns'>";
		format += "<span>d)</span>";
		format += "<input type='text' class='mc_response' name='question-"+counter+"_response-4' placeholder='Im just like all the others...'/>"
		format += "</fieldset>";
		format += "<hr>";
		
		$(format).appendTo(('#question_container')).fadeIn("blind", "slow");
		$("#multipleChoice_question" + counter +" textarea").focus();
		counter++;
		//$("<article class='question_wrap' id='multipleChoice"+ counter+ "'><h3>Question "+ counter +"</h3><input type='text' placeholder='What would you like to ask?'><fieldset><label for='question-"+counter+"_response-1'>Answer 1</article><input type='text' name='question-"+counter+"_response-1'/></fieldset>").appendTo('#question_container');
	});	
		
	$('#trueFalseBtn').click(function() {
		$('ol.poll-grid').hide("blind", "slow");
		
		var format = "<article class='question_wrap' id='trueFalse_question" + counter + "'>";
		
		format += "<h3>True/False</h3>";
		format += "<textarea class='textarea_small' placeholder='What would you like to ask?' />";
		format += "<fieldset class='six columns'>";
		format += "<span>True</span>";
		format += "<input type='radio' class='tf_response' name='question-"+counter+"_response-true' placeholder='I am true, or am I?'/>";
		format += "</fieldset>"
		format += "<fieldset class='six columns'>";
		format += "<span>False</span>";
		format += "<input type='radio' class='tf_response' name='question-"+counter+"_response-false' placeholder='I am false'/>";
		format += "</fieldset>";
		format += "<hr>";
		
		$(format).appendTo(('#question_container')).fadeIn("blind");
		$("#trueFalse_question" + counter +" textarea").focus();
		
		counter++;
	});
	
	$('#freeResponseBtn').click(function() {
		$('ol.poll-grid').hide("blind", "slow");
		
		var format = "<article class='question_wrap' id='freeResponse_question" + counter + "'>";
		
		format += "<h3>Free Response</h3>";
		format += "<fieldset>";
		format += "<textarea class='fr_response' name='question-"+counter+"' cols='30' rows='5' placeholder='What would you like to ask?' />";
		format += "</fieldset>";
		format += "<hr>";
		
		$(format).hide().appendTo(('#question_container')).fadeIn("blind");
		$("#freeResponse_question" + counter +" textarea").focus();
		
		counter++;
	});
	
	$('#freeResponseNumericBtn').click(function() {
		$('ol.poll-grid').hide("blind", "slow");
		
		var format = "<article class='question_wrap' id='freeResponseNumeric_question" + counter + "'>";

		format += "<h3>Numeric Free Response</h3>";
		format += "<fieldset>";
		format += "<textarea class='frn_response' name='question-"+counter+"' cols='30' rows='5' placeholder='What would you like to ask?' />";
		format += "</fieldset>";
		format += "<hr>";

		$(format).appendTo(('#question_container')).fadeIn("blind");
		$("#freeResponseNumeric_question" + counter +" textarea").focus();
		
		counter++;
	});
	
});







