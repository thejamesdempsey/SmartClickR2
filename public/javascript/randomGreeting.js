

$(document).ready(function() {
	getQuote();
	
	$("label.infield").inFieldLabels();
});


function getQuote(){
	var quote = new Array();
	
		// Just text
		quote[0]  = "Did you get a haircut? It looks great";
		quote[1]  = "G'day Mate!";
		quote[2]  = "Great shirt! Where'd you get it?";
		quote[3]  = "Livin' la vida, SmartClickr style";
		quote[4]  = "Its nice having you around :)";
		quote[5]  = "Oh the weather outside is frightful";
		quote[6]  = "Easy peasy, lemon squeesy";
		quote[7]  = "Hey there! How goes it?";
		quote[8]  = "What's shaken, bacon?";
		quote[9]  = "Cats sleep 16 to 18 hours per day.";
		quote[10] = 'Karoke means "empty orchestra" in Japanese.';
		quote[11] = "Elephants are the only mammals that can't jump.";
		quote[12] = "You deserve a slice of pie :)";
		quote[13] = "Did you know otters sleep holding hands?";
		quote[14] = "You've got a great smile";
		quote[15] = "You're fun to be around";
		quote[16] = "What's crackalackin?";
		quote[17] = "Aloha, my friend";
		quote[18] = "Tag! Your it.";
		quote[19] = "It’s always a pleasure to see you.";
		quote[20] = "Lookin clean, jellybean ";
		
		
		// Videos
		quote[21] = "<a href='http://www.youtube.com/watch?v=5_sfnQDr1-o' target='_blank'>Baby monkeys just wanna have fun</a>";
		quote[22] = "Keep on <a href='http://www.youtube.com/watch?v=nDOPNLzEFH0' target='_blank'>poppin' and lockin</a> my friend";
		quote[23] = "How do you stay in such good shape? <a href='http://www.youtube.com/watch?v=BE1Z-nI4CMI&feature=related' target='_blank'>Jazzercise!</a>"
		quote[24] = "<a href='http://www.youtube.com/watch?v=2Qd_IsxgAf8' target='_blank'>Thundercats! Hoooooooooo!</a>";
		quote[25] = "That's no fish. <a href='http://www.youtube.com/watch?v=IhJQp-q1Y1s' target='_blank'>This is a fish</a>";
		quote[26] = "What if all <a href='http://www.youtube.com/watch?NR=1&v=BzrI15uw92k' target='_blank'>Olympic events went like this?</a>?";
		quote[27] = "<a href='http://www.youtube.com/watch?v=4JDt8JuCbeo' target='_blank'>Whaaaaaaaat!?</a>";
		quote[28] = "Hey there, <a href='http://www.youtube.com/watch?v=00vDFQ_d2mE' target='_blank'>its time for a kitten break!</a>";
		quote[29] = "Sometimes <a href='http://www.youtube.com/watch?v=FtX8nswnUKU' target='_blank'>kittens are just inspired by other kittens</a>";
		quote[30] = "Whens that last time you saw a <a href='http://www.youtube.com/watch?v=LNqeZVL_ZHE&feature=player_embedded' target='_blank'>dog bark this way</a>?";
		quote[31] = "I think you could be a <a href='http://www.youtube.com/watch?v=lmDTSQtK20c' target='_blank'>part time model</a>";
		quote[32] = "Talking animals? <a href='http://www.youtube.com/watch?v=f-Kt_kuYVtU' target='_blank'>That would be crazy</a>...";
		quote[33] = "Shake it, <a href='http://www.youtube.com/watch?v=4hpEnLtqUDg' target='_blank'>harlem style</a>";
		quote[34] = "We like Taylor Swift, <a href='http://www.youtube.com/watch?v=HLI4EuDckgM' target='_blank'>but do goats?</a>";
		quote[35] = "Shells are cute, <a href='http://www.youtube.com/watch?v=VF9-sEbqDvU' target='_blank'>especially when they have shoes on.</a>";
		quote[36] = "Star Wars is best <a href='http://www.youtube.com/watch?v=EBM854BTGL0' target='_blank'>described by 3 year olds.</a>";
		quote[37] = "<a href='http://www.youtube.com/watch?v=_YQpbzQ6gzs' target='_blank'>We can all use a little candy</a>";
		quote[38] = "<a href='http://www.youtube.com/watch?v=0Bmhjf0rKe8' target='_blank'>Cuteness overload!</a>";
		quote[39] = "<a href='http://www.youtube.com/watch?v=L64c5vT3NBw' target='_blank'>There's no place like home</a>";
		quote[40] = "<a href='http://www.youtube.com/watch?v=UjXi6X-moxE' target='_blank'>It's a gigglefest!</a>";
		
		
	var randomChoice = Math.floor(Math.random() * quote.length);
	$('#greeting').append(quote[randomChoice]);
}


 