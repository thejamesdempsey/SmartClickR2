$(document).ready(function() {
	var counter = 1;
	var sesionCode = '';
	$('#save_quitBtn').hide();
	$("#pollName").focus();
	
	
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
		
		var userID = $('#userId').val();
		var pollID = $('#pollId').val();
		var stem, answer, type, question, mChoices;
		var count = 0;

		$('.question_wrap').each(function(index) {

			answer = '';
			stem = '';
			question = [];
			mChoices = [];
			count++;


			//console.log(index + 1, $(this).children('h3').text());
			if($(this).children('h3').text() == 'Multiple Choice') {
				
				type = 'MC';
				stem = $(this).children('textarea').val();
				$('.mc_response', this).each(function(index) {
					mChoices.push($(this).val());
				});

				question.push(stem);
				question.push(mChoices);

			} else if ($(this).children('h3').text() == 'True/False') {
				
				type = 'TF';
				stem = $(this).children('textarea').val(); 

				question.push(stem);
				answer = $('input[name=tf_response' + count.toString() + ']:checked').val();
				
				if(answer == 'True' || answer == 'False') {
					question.push(answer);
				}

			} else if ($(this).children('h3').text() == 'Free Response') {
				
				type = 'FR';
				stem = $(this).children('fieldset').children('textarea').val();
				question.push(stem);


			} else {

				type = 'N';
				stem = $(this).children('fieldset').children('textarea').val();
				question.push(stem);

			}
		
			$.ajax({
				type:"POST",
				url:"/user/" + userID + "/poll/" + pollID + "/question/create",
				data: {"questionType": type, "question": question, "count" : count}
			});

			// redirect back to user's page after saving all questions
			//alert('Index is....' + index);
			if($('.question_wrap').length == (index + 1)) {
				setTimeout(function() {
					window.location = '/user/' + userID;
				}, 25);
			}

		});

	});

		
	$('#createPollBtn').click(function() {
		var userID = $('#userId').val();
		var pollName = $('#pollName').val().trim();
		var pollDescription = $('#pollDescription').val();		

		
		if( pollName == '' ) {
			$('#poll_info').find(".error").hide();
			$('#pollNameLabel').after('<label class="error"> Your poll needs a name.  </label>');
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
					$('#sessionCode').val(msg.sessionCode);
					$('#pollId').val(msg.pollID);
				}
			});
		}
		
	});
		
	
	$('#multipleChoiceBtn').click(function() {
		//$('ol.poll-grid').hide("blind", "slow");
		
		var format = "<article class='question_wrap' id='multipleChoice_question" + counter + "'>";
		
		format += "<h3>Multiple Choice</h3>";
		format += "<textarea class='textarea_small' placeholder='What would you like to ask?' />";
		format += "<fieldset class='six columns'>";
		format += "<span>a)</span>";
		format += "<input type='text' class='mc_response' name='question-"+counter+"_response-1' placeholder='I am a possible answer'/>"
		format += "<span>Correct Answer</span>"
		format += "<input type='radio' name='correct_answer' />"
		format += "</fieldset>";
		format += "<fieldset class='six columns'>";
		format += "<span>b)</span>";
		format += "<input type='text' class='mc_response' name='question-"+counter+"_response-2' placeholder='I am another possible answer'/>"
		format += "<span>Correct Answer</span>"
		format += "<input type='radio' name='correct_answer' />"
		format += "</fieldset>";
		format += "<fieldset class='six columns'>";
		format += "<span>c)</span>";
		format += "<input type='text' class='mc_response' name='question-"+counter+"_response-3' placeholder='Yet another possible answer'/>"
		format += "<span>Correct Answer</span>"
		format += "<input type='radio' name='correct_answer' />"
		format += "</fieldset>";
		format += "<fieldset class='six columns'>";
		format += "<span>d)</span>";
		format += "<input type='text' class='mc_response' name='question-"+counter+"_response-4' placeholder='Im just like all the others...'/>"
		format += "<span>Correct Answer</span>"
		format += "<input type='radio' name='correct_answer' />"
		format += "</fieldset>";
		format += "<hr>";
		
		$(format).appendTo(('#question_container')).fadeIn("blind", "slow");
		$("#multipleChoice_question" + counter +" textarea").focus();
		counter++;
		//$("<article class='question_wrap' id='multipleChoice"+ counter+ "'><h3>Question "+ counter +"</h3><input type='text' placeholder='What would you like to ask?'><fieldset><label for='question-"+counter+"_response-1'>Answer 1</article><input type='text' name='question-"+counter+"_response-1'/></fieldset>").appendTo('#question_container');
	});	
		
	$('#trueFalseBtn').click(function() {
		//$('ol.poll-grid').hide("blind", "slow");
		
		var format = "<article class='question_wrap' id='trueFalse_question" + counter + "'>";
		
		format += "<h3>True/False</h3>";
		format += "<textarea class='textarea_small' placeholder='What would you like to ask?' />";
		format += "<fieldset class='six columns'>";
		format += "<span>True</span>";
		format += "<input type='radio' class='tf_response' value='True' name='tf_response" + counter + "' placeholder='I am true, or am I?'/>";
		format += "</fieldset>"
		format += "<fieldset class='six columns'>";
		format += "<span>False</span>";
		format += "<input type='radio' class='tf_response' value='False' name='tf_response" + counter + "' placeholder='I am false'/>"
		format += "</fieldset>";
		format += "<fieldset>";
		format += "<input type='checkbox' class='no_correct' name='no_correct'>No correct answer</input>"	
		format += "</fieldset>";
		format += "<hr>";
		
		$(format).appendTo(('#question_container')).fadeIn("blind");
		$("#trueFalse_question" + counter +" textarea").focus();
		
		counter++;
	});
	
	$('#freeResponseBtn').click(function() {
		//$('ol.poll-grid').hide("blind", "slow");
		
		var format = "<article class='question_wrap' id='freeResponse_question" + counter + "'>";
		
		format += "<h3>Free Response</h3>";
		format += "<fieldset>";
		format += "<textarea class='fr_response' name='question-"+counter+"' cols='30' rows='5' placeholder='What would you like to ask?' />";
		format += "</fieldset>";
		format += "<fieldset>";
		format += "<input type='checkbox' class='add_correct' name='add_correct'>Add the correct answer</input>"	
		format += "</fieldset>";
		format += "<hr>";
		
		$(format).hide().appendTo(('#question_container')).fadeIn("blind");
		$("#freeResponse_question" + counter +" textarea").focus();
		
		counter++;
	});
	
	$('#freeResponseNumericBtn').click(function() {
		//$('ol.poll-grid').hide("blind", "slow");
		
		var format = "<article class='question_wrap' id='freeResponseNumeric_question" + counter + "'>";

		format += "<h3>Numeric Free Response</h3>";
		format += "<fieldset>";
		format += "<textarea class='fr_response' name='question-" + counter + "' cols='30' rows='5' placeholder='What would you like to ask?' />";
		format += "</fieldset>";
		format += "<fieldset>";
		format += "<input type='checkbox' class='add_correct' id='add_correct-" + counter + "' name='add_correct-" + counter + "'>Add the correct answer</input>"	
		format += "</fieldset>";
		format += "<hr>";

		$(format).appendTo(('#question_container')).fadeIn("blind");
		$("#freeResponseNumeric_question" + counter +" textarea").focus();
		
		counter++;
	});
	
	//$('#add_correct-"+ counter + "').click(function() {
	$('.add_correct').click(function() {
	
		var thisCheck = $(this);
		if(thisCheck.is (':checked')){
			//var format = "<fieldset>";

			//format += "<textarea class='fr_correct-"+ counter +"' name='fr_correct' cols='30' rows='5' placeholder='What is the correct answer?' />";
			//format += "<fieldset/>";

			//$(format).appendTo((".fr_response")).fadeIn();
			//$("#fr_correct" + counter).focus();
			$("#add_correct-" + counter).hide();

			counter++;
		}

	});
});







