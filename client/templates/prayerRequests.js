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
	timeLeftToPray: function() {
		returnedTime = Session.get("dateval");
		var m = Math.floor(returnedTime % 3600 / 60);
		var s = Math.floor(returnedTime % 3600 % 60);
		return ((m > 0 ? (m < 10 ? "0" : "") + m + ":" : "0:") + (s < 10 ? "0" : "") + s);
	}
});

/*
Template.prayerRequests.events({
  'click .pause': function(e) {
	  Meteor.clearInterval( timeIntervalId);
  }
});
*/
var minutes = 20;
var timeLeft = minutes * 60;
var timeIntervalId = Meteor.setInterval( function () {
	if(timeLeft > 0){
		Session.set("dateval", timeLeft);
	}
	timeLeft--;
}, 1000 );
