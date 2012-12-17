var mailOptions = {
	from: "<welcome@smartclickr.com>", //sender address
	to: "< " +  + " >", //receiver email,
	subject: "Welcome to SmartClickR,",
	html: "<body>
			<div>
		   		<h1>Hi " + firstName + ", welcome to SmartClickR!</h1>
		   		<a href='#'>activate your accout</a>
		   		<p>As a reminder, your SmartClickR username and account email is " + email + ".  </p>
				<p><strong>Start off right</strong><br />Read the <a href='#'>Getting Started with SmartClickR</a> guide to quickly get your bearings. 
				           If you have any additional questions or need help, please visit us at SmartClickR Support </p>
				<footer>
				 	<p>Didn't sign up for SmartClickR? Please let us know. If you dont want to recieve emails from us in the future, you can <a href='#'>unsubscribe</a>.
					<span>&copy; 2012 SmartClickR, All Rights Reserved. Made with &hearts; in Harrisonburg, VA</span>
				</footer>
				
			</div>
			</body>
	"
	 
}