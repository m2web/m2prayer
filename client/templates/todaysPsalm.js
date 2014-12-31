Template.todaysPsalm.helpers({
	todaysPsalm: function() {
		var todaysDate = new Date();
		var psalmNumber = 1;
		var thePsalmOutput = "There was an error getting the Psalm chapter.";
		//adding 1 as 0 does not act as a good divisor or multiplicand (Sunday = 0)
		var monthDayNumber = todaysDate.getDate();
		
		//if the 31st then set a random day
		if (monthDayNumber > 30) {
			//given that there are 150 Psalms, max day is 30
			monthDayNumber = Math.floor(Math.random() * (30 - 1) ) + 1;
		}
		//get the last chapter in today's range
		var daysLastChapterNumber = monthDayNumber * 5;
		//get the first chapter in today's range
		var daysFirstChapterNumber = daysLastChapterNumber - 4;

		//get the random Psalm chapter number
		psalmNumber = Math.floor(Math.random() * (daysLastChapterNumber - daysFirstChapterNumber) + daysFirstChapterNumber);
		
		//call the ESV REST service to fetch the passage
		//this session variable is set in the prayerRequest.js file and is used to call the 
		//ESV API Rest service once for the day's Psalm. Otherwise, it continues to call it several times.
		if(Session.get("psalmNotSet")){
			Meteor.call('getVerseMethod', 'Psalm ' + psalmNumber, function(err, response) {
				//set the value in session
				Session.set("thePsalm", response);
			});
		}
	
		//make sure this is set to false here so the call is not made again in the session
		Session.set('psalmNotSet', false);

		//get the value out of session that was set in session above
		thePsalmOutput = Session.get('thePsalm');
		
		return thePsalmOutput['content'];
	}
});