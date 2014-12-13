Template.pageLinks.helpers({
	thisMonthsReadingURL : function(){
		var linkBase = "http://markmcfadden.net/prayerweb/DailyReading/";
		var pageExtension = ".html";
		var todaysDate = new Date();
		//since the getMonth method returns a 0-11 number add 1 to get the current month number
		var thisMonth = todaysDate.getMonth() + 1 ;
		//the page is named for the month's number
		return linkBase + thisMonth.toString() + pageExtension;
	},
	todaysValleyOfVisionPrayerURL : function(){
		var linkBase = "http://markmcfadden.net/prayerweb/vov/";
		var pageExtension = ".html";
		var todaysDate = new Date();
		//this date method is a custom method created in the lib/date_helper.js file. This is the day number fo the year (1 - 365)
		var todaysVOVPrayerNumber = todaysDate.getDOY();
		//the number of VOV prayers
		var numberOfPrayers = 159;
		//since there is more than 159 days in the year multiply it by 2
		var numberOfPrayersX2 = numberOfPrayers * 2;
		
		//if today's number is more than the number of prayers but less than twice the number of prayers use the difference between teh two
		if(todaysVOVPrayerNumber > numberOfPrayers && todaysVOVPrayerNumber <= numberOfPrayersX2) {
			todaysVOVPrayerNumber = todaysVOVPrayerNumber - numberOfPrayers;
		//if today's number is greater than twice the number of prayers get a random number of a prayer
		}else if(todaysVOVPrayerNumber > numberOfPrayersX2) {
			todaysVOVPrayerNumber = Math.floor(Math.random() * (numberOfPrayers - 1)) + 1;
		}
		//the page is named for the prayer's number
		return linkBase +  todaysVOVPrayerNumber + pageExtension;
	}
});
