// Display Latest Tweet  
$(document).ready(function(){  
	$.getJSON("https://api.twitter.com/1/statuses/user_timeline/smartclickr.json?count=2&include_rts=1&callback=?", function(data) {
		for (var i=0; i<data.length; i++){
		    var username = data[i].user.screen_name;
		    var status = data[i].text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
		      return '<a href="'+url+'">'+url+'</a>';
		    }).replace(/@([_a-z0-9]+)/ig, function(reply) {
			    return  '<a class="username" href="http://twitter.com/'+reply.substring(1)+'">@'+reply.substring(1)+'</a>';
			}).replace(/#([a-zA-Z0-9]+)/g, function(hash) {
			    return '<a class="hashtag" target="_blank" href="http://twitter.com/#search?q='+hash.substring(1)+'">#'+hash.substring(1)+'</a>';
			});
      // $.each(data, function(index, item){  
           $('ul.tweet-list').append('<li><span class="tweet-time">'+relative_time(data[i].created_at)+'</span><p>' + status + '</p></li>');  
    };  
	
	


	function relative_time(time_value) {
	  var values = time_value.split(" ");
	  time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
	  var parsed_date = Date.parse(time_value);
	  var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
	  var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
	  delta = delta + (relative_to.getTimezoneOffset() * 60);

	  if (delta < 60) {
	    return 'less than a minute ago';
	  } else if(delta < 120) {
	    return 'about a minute ago';
	  } else if(delta < (60*60)) {
	    return (parseInt(delta / 60)).toString() + ' minutes ago';
	  } else if(delta < (120*60)) {
	    return 'about an hour ago';
	  } else if(delta < (24*60*60)) {
	    return 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';
	  } else if(delta < (48*60*60)) {
	    return '1 day ago';
	  } else {
	    return (parseInt(delta / 86400)).toString() + ' days ago';
	  }
	}
});

});