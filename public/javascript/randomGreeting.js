$(document).ready(function() {
	getQuote();
});


function getQuote(){
	var quote = new Array();
		quote[0] = "Did you get a haircut? It looks great";
		quote[1] = "<a href='http://www.youtube.com/watch?v=5_sfnQDr1-o' target='_blank'>Baby monkeys just wanna have fun</a>";
		quote[2] = "G'day Mate!";
		quote[3] = "Great shirt! Where'd you get it?";
		quote[4] = "Livin' la vida, SmartClickR style";
		quote[5] = "Keep on <a href='http://www.youtube.com/watch?v=nDOPNLzEFH0' target='_blank'>poppin' and lockin</a> my friend";
		quote[6] = "How do you stay in such good shape? <a href='http://www.youtube.com/watch?v=BE1Z-nI4CMI&feature=related' target='_blank'>Jazzercise!</a>"
		quote[7] = "Its nice having you around :)";
		quote[8] = "<a href='http://www.youtube.com/watch?v=2Qd_IsxgAf8' target='_blank'>Thundercats! Hoooooooooo!</a>";
		quote[9] = "That's no fish. <a href='http://www.youtube.com/watch?v=IhJQp-q1Y1s' target='_blank'>This is a fish</a>";
		quote[10] = "What if all <a href='http://www.youtube.com/watch?NR=1&v=BzrI15uw92k' target='_blank'>Olympic events went like this?</a>?";
		quote[11] = "<a href='http://www.youtube.com/watch?v=4JDt8JuCbeo' target='_blank'>Whaaaaaaaat!?</a>";
		quote[12] = "Hey there, <a href='http://www.youtube.com/watch?v=00vDFQ_d2mE' target='_blank'>its time for a kitten break!</a>";
		quote[13] = "Sometimes <a href='http://www.youtube.com/watch?v=FtX8nswnUKU' target='_blank'>kittens are just inspired by other kittens</a>";
		quote[14] = "Whens that last time you saw a <a href='http://www.youtube.com/watch?v=LNqeZVL_ZHE&feature=player_embedded' target='_blank'>dog bark this way</a>?";
		quote[15] = "I think you could be a <a href='http://www.youtube.com/watch?v=lmDTSQtK20c' target='_blank'>part time model</a>";
		quote[16] = "Talking animals? <a href='http://www.youtube.com/watch?v=f-Kt_kuYVtU' target='_blank'>That would be crazy</a>...";
		quote[17] = "Oh the weather outside is frightful";
		quote[18] = "Shake it, <a href='http://www.youtube.com/watch?v=4hpEnLtqUDg' target='_blank'>harlem style</a>";
	
	var randomChoice = Math.floor(Math.random() * quote.length);
	$('#greeting').append(quote[randomChoice]);
}


 