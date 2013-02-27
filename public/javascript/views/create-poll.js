$(document).ready(function() {
	var counter = 1;
	var sesionCode = '';
	$('#save_quitBtn').hide();
	$('#addQuestion').hide();
	$("#pollName").focus();
		

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
			
			format  = '<div class="alert alert-error fade in">';
			format += '<strong>Yikes!</strong> Your poll needs a name. ';
			format += '</div>';
			
			$('#pollName').removeClass('errorBorder').addClass('errorBorder');
			$('#pollNameLabel').after(format);
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
		question = [];
		type = [];

		$('.question_wrap').each(function(index) {

			answer = '';
			stem = '';
			count++;

			//console.log(index + 1, $(this).children('h3').text());
			if($(this).children('h3').text() == 'Multiple Choice') {
				
				var mc = [];
				mChoices = [];
				type.push('MC');
				stem = $(this).children('textarea').val();
				$('.mc_response', this).each(function(index) {
					mChoices.push($(this).val());
				});

				mc.push(stem);
				mc.push(mChoices);
				question.push(mc);

			} else if ($(this).children('h3').text() == 'True/False') {
				
				var tf = [];
				type.push('TF');
				stem = $(this).children('textarea').val(); 

				tf.push(stem);
				answer = $('input[name=correct_answer' + count.toString() + ']:checked').parent().text();
				
				console.log(answer);
				if(answer == 'True' || answer == 'False')
					tf.push(answer);
				
				question.push(tf);

			} else if ($(this).children('h3').text() == 'Free Response') {
				
				type.push('FR');
				stem = $(this).children('fieldset').children('textarea').val();
				question.push(stem);

			} else {

				type.push('N');
				stem = $(this).children('fieldset').children('textarea').val();
				question.push(stem);
			}		

		});

		$.ajax({
			type:"POST",
			url:"/user/" + userID + "/poll/" + pollID + "/question/create",
			data: {"questionType": type, "questions": question},
			success: function() {
				window.location.href = '/';
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
			$('#save_quitBtn').show();
			$('#addQuestion').show();
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
		
		var format = "<article class='question_wrap overlay' id='multipleChoice_question" + counter + "'>";
		
		format += "<h3>Multiple Choice</h3>";
		format += "<span class='close-circle'>";
		format += "<button type='button', class='close'>";
		format += "&times";
		format += "</button>";
		format += "<span class='close-bg'></span>";
		format += '</span>';
		format += "<textarea class='textarea_small' placeholder='What would you like to ask?' />";
		format += "<div class='top-pad'>"
		format += "</div>"
		format += "<fieldset class='six columns'>";
		format += "<span>a)</span>";
		format += "<input type='text' class='mc_response' name='question-"+counter+"_response-1' placeholder='I am a possible answer'/>"
		format += "<div class='clear'></div>"
		format += "<label class='radio'>"
		format += "Correct Answer"	
		format += "<input type='radio' name='correct_answer" + counter + "' />"
		format += "</label>"
		format += "</fieldset>";
		format += "<fieldset class='six columns'>";
		format += "<span>b)</span>";
		format += "<input type='text' class='mc_response' name='question-"+counter+"_response-2' placeholder='I am another possible answer'/>"
		format += "<div class='clear'></div>"
		format += "<label class='radio'>"
		format += "Correct Answer"	
		format += "<input type='radio' name='correct_answer" + counter + "' />"
		format += "</label>"
		format += "</fieldset>";
		format += "<fieldset class='six columns'>";
		format += "<span>c)</span>";
		format += "<input type='text' class='mc_response' name='question-"+counter+"_response-3' placeholder='Yet another possible answer'/>"
		format += "<div class='clear'></div>"
		format += "<label class='radio'>"
		format += "Correct Answer"	
		format += "<input type='radio' name='correct_answer" + counter + "' />"
		format += "</label>"
		format += "</fieldset>";
		format += "<fieldset class='six columns'>";
		format += "<span>d)</span>";
		format += "<input type='text' class='mc_response' name='question-"+counter+"_response-4' placeholder='Im just like all the others...'/>"
		format += "<div class='clear'></div>"
		format += "<label class='radio'>"
		format += "Correct Answer"	
		format += "<input type='radio' name='correct_answer" + counter + "' />"
		format += "</label>"
		format += "</fieldset>";
		format += "<hr>";
		
		$(format).appendTo(('#question_container')).fadeIn("blind", "slow");
		$("#multipleChoice_question" + counter +" textarea").focus();
		counter++;
		//$("<article class='question_wrap' id='multipleChoice"+ counter+ "'><h3>Question "+ counter +"</h3><input type='text' placeholder='What would you like to ask?'><fieldset><label for='question-"+counter+"_response-1'>Answer 1</article><input type='text' name='question-"+counter+"_response-1'/></fieldset>").appendTo('#question_container');
	});	
		
	$('#trueFalseBtn').click(function() {
		//$('ol.poll-grid').hide("blind", "slow");
		
		var format = "<article class='question_wrap overlay' id='trueFalse_question" + counter + "'>";
		
		format += "<h3>True/False</h3>";
		format += "<span class='close-circle'>";
		format += "<button type='button', class='close'>";
		format += "&times";
		format += "</button>";
		format += "<span class='close-bg'></span>";
		format += '</span>';
		format += "<textarea class='textarea_small' placeholder='What would you like to ask?' />";
		format += "<div class='top-pad'>"
		format += "</div>"
		format += "<fieldset class='four columns'>";
		format += "<label class='radio'>"
		format += "True"	
		format += "<input type='radio' name='correct_answer" + counter + "' />"
		format += "</label>"
		format += "</fieldset>"
		format += "<fieldset class='four columns'>";
		format += "<label class='radio'>"
		format += "False"	
		format += "<input type='radio' name='correct_answer" + counter + "' />"
		format += "</label>"
		format += "</fieldset>";
		format += "<fieldset class='four columns'>";
		format += "<label class='radio'>"
		format += "No correct answer"	
		format += "<input type='radio' name='correct_answer" + counter + "'/>"
		format += "</label>"
		format += "</fieldset>";
		format += "<hr>";
		
		$(format).appendTo(('#question_container')).fadeIn("blind");
		$("#trueFalse_question" + counter +" textarea").focus();
		
		counter++;
	});
	
	$('#freeResponseBtn').click(function() {
		//$('ol.poll-grid').hide("blind", "slow");
		
		var format = "<article class='question_wrap overlay' id='freeResponse_question" + counter + "'>";
		
		format += "<h3>Free Response</h3>";
		format += "<span class='close-circle'>";
		format += "<button type='button', class='close'>";
		format += "&times";
		format += "</button>";
		format += "<span class='close-bg'></span>";
		format += '</span>';
		format += "<fieldset>";
		format += "<textarea class='fr_response' name='question-"+counter+"' cols='30' rows='5' placeholder='What would you like to ask?' />";
		format += "</fieldset>";
		//format += "<fieldset>";
		//format += "<input type='checkbox' class='add_correct' name='add_correct'>Add the correct answer</input>"	
		//format += "</fieldset>";
		format += "<hr>";
		
		$(format).hide().appendTo(('#question_container')).fadeIn("blind");
		$("#freeResponse_question" + counter +" textarea").focus();
		
		counter++;
	});
	
	$('#freeResponseNumericBtn').click(function() {
		//$('ol.poll-grid').hide("blind", "slow");
		
		var format = "<article class='question_wrap overlay' id='freeResponseNumeric_question" + counter + "'>";

		format += "<h3>Numeric Free Response</h3>";
		format += "<span class='close-circle'>";
		format += "<button type='button', class='close'>";
		format += "&times";
		format += "</button>";
		format += "<span class='close-bg'></span>";
		format += '</span>';
		format += "<fieldset>";
		format += "<textarea class='fr_response' name='question-" + counter + "' cols='30' rows='5' placeholder='What would you like to ask?' />";
		format += "</fieldset>";
		//format += "<fieldset>";
		//format += "<input type='checkbox' class='add_correct' id='add_correct-" + counter + "' name='add_correct-" + counter + "'>Add the correct answer</input>"	
		//format += "</fieldset>";
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







