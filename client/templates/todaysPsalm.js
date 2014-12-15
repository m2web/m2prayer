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

		var daysLastChapterNumber = monthDayNumber * 5;
		var daysFirstChapterNumber = daysLastChapterNumber - 4;

		//var psalmNumber = Math.floor(Math.random() * (daysLastChapterNumber - daysFirstChapterNumber + daysFirstChapterNumber) ) + 1;	
		psalmNumber = Math.floor(Math.random() * daysLastChapterNumber - daysFirstChapterNumber) + daysFirstChapterNumber ;
		
		Meteor.call('getVerseMethod', 'Psalm ' + psalmNumber, function(err, response) {
			//set the value in session
			Session.set('thePsalm', response);
		});
		//get the value out of session that was set in session above
		thePsalmOutput = Session.get('thePsalm');
		//content is the key of the verse text in the JSON document
		return thePsalmOutput['content'];
	}
});