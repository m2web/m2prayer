Meteor.subscribe('prayerRequests');

Template.prayerRequests.helpers({
	prayerRequests: function() {
		var todaysDate = new Date();
		//adding 1 as 0 does not act as a good divisor or multiplicand (Sunday = 0)
		var weekDayNumber = todaysDate.getDay() + 1;
		//return PrayerRequests.find({"category":"Church Staff"});
		var allRequests = PrayerRequests.find({}, {sort: {'category': 1}});
		var requestCount = allRequests.count() + 1;
		//categories per day = (categories / number of days of prayer w unique requests)
		var categoriesPerDay = ( requestCount / 4);
		var categoryEnd = 0;
		
		//determine the last category to pray about that day
		if (weekDayNumber * categoriesPerDay <= requestCount ) {
			categoryEnd = weekDayNumber * categoriesPerDay
		}else {
			//get a random number for category end since the last days of the week will have the same requests
			if (weekDayNumber > 5) { //if day greater than Thursday (+1 as 0 not good divisor or multiplicand)
				categoryEnd = Math.floor(Math.random() * (requestCount - 1 + 1) ) + 1;
				//check that categoryEnd is at least 4 so wse have 4 categories for which to pray. 
				//this is because the categoryEnd might be 2 then the result is only 2 categories.
				if(categoryEnd < 4){
					categoryEnd = 4;
				}
			}else {//it is Monday - Thursday
				categoryEnd = requestsCount;
			}
		}
	
		//determine the first category to pray about that day
		var categoryStart = categoryEnd - categoriesPerDay;
		
		return PrayerRequests.find({'categoryNumber': {$gte: categoryStart, $lte: categoryEnd-1}}, {sort: {'category': 1}});
	},
	todaysPsalm: function() {
		var todaysDate = new Date();
		//adding 1 as 0 does not act as a good divisor or multiplicand (Sunday = 0)
		var monthDayNumber = todaysDate.getDate();
		
		//if the 31st then set a random day
		if (monthDayNumber > 30) {
			//given that there are 150 Psalms, max day is 30
			monthDayNumber = Math.floor(Math.random() * (30 - 1 +1) ) + 1;
		}

		var daysLastChapterNumber = monthDayNumber * 5;
		var daysFirstChapterNumber = daysLastChapterNumber - 4;

		var psalmNumber = Math.floor(Math.random() * (30 - 1 +1) ) + 1;	
		//console.log(psalmNumber);
		
		//<%= getE;VPassage("Psalm " + @thePsalmChapter.to_s).html_safe %>
		return "testing ";//Meteor.call('getVerseMethod',"Psalm " + psalmNumber);
	},
	timeLeftToPray: function() {
	var clock = 20;
		var timeLeft = function(x){
			if(clock > 0){
				clock--;
				Session.set('time', clock);
				console.log(clock);
			}else{
				Meteor.clearInterval(interval);
			}
			var interval = Meteor.setInterval(timeLeft, 1000);
			return Session.get('time');
		}
		return 
	}
});
/*
//functions in lib/prayerTimer.js
Template.prayerRequests.rendered = function(){
//on load run reset to start Countdown function
	window.onload = function(){
		resetCountdown();
		document.getElementById("restartButton").onclick = restartCountdown;	
		document.getElementById("resetButton").onclick = resetCountdown;
		document.getElementById("pauseButton").onclick = pauseCountdown;
	}
};
*/
