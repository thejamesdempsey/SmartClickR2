$(document).ready(function() {
	getQuote();
});



function getQuote(){
	var quote = new Array();
		quote[0] = "Did you get a haircut? It looks great";
		quote[1] = "<a href='http://www.youtube.com/watch?v=5_sfnQDr1-o'>Baby monkeys gotta have their fun too!</a>";
		quote[2] = "The only thing we have to fear is fear itself";
		quote[3] = "G'day Mate!";
		quote[4] = "Falling doesnt make you a failure, staying down does.";
		quote[5] = "Great shirt! Where'd you get it?";
		quote[6] = "Livin' la vida, SmartClickR style";
		quote[7] = "Keep on <a href='http://www.youtube.com/watch?v=nDOPNLzEFH0'>poppin' and lockin</a> my friend";
		quote[8] = "How do you stay in such good shape? <a href='http://www.youtube.com/watch?v=BE1Z-nI4CMI&feature=related'>Jazzercise!</a>"
		quote[9] = "Its nice having you around :)";
		quote[10] = "<a href='http://www.youtube.com/watch?v=2Qd_IsxgAf8'>Thundercats! Hoooooooooo!</a>";
		quote[11] = "That's no fish. <a href='http://www.youtube.com/watch?v=IhJQp-q1Y1s'>This is a fish</a>";
		quote[12] = "What if all of the Olympic events went like <a href='http://www.youtube.com/watch?NR=1&v=BzrI15uw92k'>this</a>?";
		quote[13] = "<a href='http://www.youtube.com/watch?v=4JDt8JuCbeo'>Whaaaaaaaat!?</a>";
		quote[14] = "<a href='http://www.youtube.com/watch?v=00vDFQ_d2mE'>Hey there, its time for a kitten break!</a>";
		quote[15] = "Sometimes <a href='http://www.youtube.com/watch?v=FtX8nswnUKU'>kittens are just inspired by other kittens</a>";
	
	var randomChoice = Math.floor(Math.random() * quote.length);
	$('#greeting').append(quote[randomChoice]);
}


 