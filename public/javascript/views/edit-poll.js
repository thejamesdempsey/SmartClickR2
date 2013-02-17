$(document).ready(function() {
	var counter = parseInt($('#counter').val());
	var sesionCode = '';
	//$('#save_quitBtn').hide();
	//$('#addQuestion').hide();
	$("#pollName").focus();
		

	$('#edit_content').ready(function() {
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
		
	$('#save_quitBtn').click(function() {
		
		var userID = $('#userId').val();
		var pollID = $('#pollId').val();
		var stem, answer, type, question, mChoices, poll, qids, cids;
		var count = 0;
		question = [];
		qids = [];
		poll = [];
		type = [];
		cids = [];

		poll.push($('#pollId').val());
		poll.push($('#pollName').val());
		poll.push($('#pollDescription').val());

		$('.question_wrap').each(function(index) {

			answer = '';
			stem = '';
			count++;

			//console.log(index + 1, $(this).children('h3').text());
			if($(this).children('h3').text() == 'Multiple Choice') {
				
				var mc = [];
				cids = [];
				mChoices = [];
				type.push('MC');
				
				if($(this).find('.questionID').length == 1) {
					qids.push($(this).children('.questionID').val());

					$('.mc_response', this).each(function(index) {
						cids.push($(this).parent().children('[type=hidden]').val());
					});
				}
				stem = $(this).children('textarea').val();
				
				$('.mc_response', this).each(function(index) {
					mChoices.push($(this).val());
				});


				mc.push(stem);
				mc.push(mChoices);
	
				if(cids.length > 0) 
					mc.push(cids);
					
				question.push(mc);

			} else if ($(this).children('h3').text() == 'True/False') {
				
				var tf = [];
				cids = [];
				type.push('TF');
				stem = $(this).children('textarea').val(); 
				
				if($(this).find('.questionID').length == 1) {
					qids.push($(this).children('.questionID').val());
					//issue! find out the value!!!
					cids.push($('.choice_id', this).val());
				}
				
				tf.push(stem);
				answer = $('input[name=correct_answer' + count.toString() + ']:checked').parent().text();

				if(answer == 'True' || answer == 'False')
					tf.push(answer);
				
				if(cids.length > 0) 
					tf.push(cids);

				question.push(tf);

			} else if ($(this).children('h3').text() == 'Free Response') {
				
				type.push('FR');
				stem = $(this).children('fieldset').children('textarea').val();
				question.push(stem);
				
				if($(this).find('.questionID').length == 1) {
					qids.push($(this).children('.questionID').val());
				}
				
			} else {

				type.push('N');
				stem = $(this).children('fieldset').children('textarea').val();
				question.push(stem);

				if($(this).find('.questionID').length == 1) {
					qids.push($(this).children('.questionID').val());
				}
				
			}		

		});
		
		console.log(question);
		console.log(qids);

		$.ajax({
			type:"POST",
			url:"/user/" + userID + "/poll/edit/" + pollID,
			data: {"questionType": type, "questions": question, "pollData": poll, "questionIDs" : qids },
			success: function() {
				//window.location.href = '/';
			}
		});


	});
		
	
	$('#multipleChoiceBtn').click(function() {
		//$('ol.poll-grid').hide("blind", "slow");
		
		var format = "<article class='question_wrap' id='multipleChoice_question" + counter + "'>";
		
		format += "<h3>Multiple Choice</h3>";
		format += "<textarea class='textarea_small' placeholder='What would you like to ask?' />";
		format += "<div class='top-pad'>"
		format += "</div>"
		format += "<fieldset class='six columns'>";
		format += "<span>a)</span>";
		format += "<input type='text' class='mc_response' name='question-"+counter+"_response-1' placeholder='I am a possible answer'/>"
		format += "<div class='clear'></div>"
		format += "<label class='radio'>"
		format += "Correct Answer"	
		format += "<input type='radio' name='correct_answer' />"
		format += "</label>"
		format += "</fieldset>";
		format += "<fieldset class='six columns'>";
		format += "<span>b)</span>";
		format += "<input type='text' class='mc_response' name='question-"+counter+"_response-2' placeholder='I am another possible answer'/>"
		format += "<div class='clear'></div>"
		format += "<label class='radio'>"
		format += "Correct Answer"	
		format += "<input type='radio' name='correct_answer' />"
		format += "</label>"
		format += "</fieldset>";
		format += "<fieldset class='six columns'>";
		format += "<span>c)</span>";
		format += "<input type='text' class='mc_response' name='question-"+counter+"_response-3' placeholder='Yet another possible answer'/>"
		format += "<div class='clear'></div>"
		format += "<label class='radio'>"
		format += "Correct Answer"	
		format += "<input type='radio' name='correct_answer' />"
		format += "</label>"
		format += "</fieldset>";
		format += "<fieldset class='six columns'>";
		format += "<span>d)</span>";
		format += "<input type='text' class='mc_response' name='question-"+counter+"_response-4' placeholder='Im just like all the others...'/>"
		format += "<div class='clear'></div>"
		format += "<label class='radio'>"
		format += "Correct Answer"	
		format += "<input type='radio' name='correct_answer' />"
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
		
		var format = "<article class='question_wrap' id='trueFalse_question" + counter + "'>";
		
		format += "<h3>True/False</h3>";
		format += "<textarea class='textarea_small' placeholder='What would you like to ask?' />";
		format += "<div class='top-pad'>"
		format += "</div>"
		format += "<fieldset class='four columns'>";
		format += "<label class='radio'>"
		format += "True"	
		format += "<input type='radio' name='correct_answer' />"
		format += "</label>"
		format += "</fieldset>"
		format += "<fieldset class='four columns'>";
		format += "<label class='radio'>"
		format += "False"	
		format += "<input type='radio' name='correct_answer' />"
		format += "</label>"
		format += "</fieldset>";
		format += "<fieldset class='four columns'>";
		format += "<label class='radio'>"
		format += "No correct answer"	
		format += "<input type='radio' name='correct_answer' />"
		format += "</label>"
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
		
		var format = "<article class='question_wrap' id='freeResponseNumeric_question" + counter + "'>";

		format += "<h3>Numeric Free Response</h3>";
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







