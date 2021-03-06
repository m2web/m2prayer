Meteor.subscribe('prayerRequests');

//this is used in the todaysPsalm.js file to call the ESV API Rest service once for the day's 
//Psalm. Otherwise, it continues to call it several times.
Session.set("psalmNotSet", true);

//this is used in the todaysVerse.js file to call the ESV API Rest service once for the day's 
//verse. Otherwise, it continues to call it several times.
Session.set("todaysVerseNotSet", true);

Template.prayerRequests.helpers({
	allPrayerRequests : function(){
		return PrayerRequests.find({},{sort: {'category': 1}});
	},
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
			//*************** Set the random prayer list days here *******************
			//get a random number for category end since the last days of the week will have the same requests
			if (weekDayNumber > 4) { //if day is Thursday thru Saturday (+1 as 0 not good divisor or multiplicand)
				categoryEnd = Math.floor(Math.random() * (requestCount - 1)) + 1;
				//check that categoryEnd is at least 4 so wse have 4 categories for which to pray. 
				//this is because the categoryEnd might be 2 then the result is only 2 categories.
				if(categoryEnd < 4){
					categoryEnd = 4;
				}
			}else {//it is Monday - Wednesday
				categoryEnd = requestCount;
			}
			//*************** End random prayer list days setting here ****************
		}
	
		//determine the first category to pray about that day
		var categoryStart = categoryEnd - categoriesPerDay;

		return PrayerRequests.find({'categoryNumber': {$gte: categoryStart, $lte: categoryEnd}}, {sort: {'category': 1}});
	},
	timeLeftToPray: function() {
		if(Session.get("dateval")){
			var returnedTime = Session.get("dateval");
			var m = Math.floor(returnedTime % 3600 / 60);
			var s = Math.floor(returnedTime % 3600 % 60);
			return ((m > 0 ? (m < 10 ? "0" : "") + m + ":" : "0:") + (s < 10 ? "0" : "") + s);
		}else{
			return "00:00";
		}
	},
	selectedRequest : function(){
		if(Session.get("selectedRequest")){
			return PrayerRequests.findOne({'categoryNumber' : parseInt(Session.get("selectedRequest"))});
		}
	},
	thisMonthsMemoryVerse: function() {
		var todaysDate = new Date();
		//The first month is not until February which is month 2 so we add 1.
		var thisMonth = todaysDate.getMonth() + 1;
		
		var isDecember = (thisMonth === 12);
		
		//lets get next month's number as the JM meeting may be early or mid month and having next month's verse ready for study is good
		var nextMonth = thisMonth + 1;
		//theYear is used to determine if the Joshua's Men group is using Grudem or the books.
		var theYear = todaysDate.getFullYear();
		//even year (ex. 2014 and 2016) is using Grudem's. This is used in the query below
		var bookYear = (theYear % 2 == 0) ? "GRUDEM":"BOOKS";
		
		if(isDecember){
			//the next verse(s) are in February of the next year
			thisMonth = 2;//for February
			nextMonth = 2;
			bookYear = (theYear % 2 == 0) ? "BOOKS":"GRUDEM";//the opposite for current year
		}
		
		//we are using the year ('GRUDEM' or 'BOOKS') and the month number.
		//return MemoryVerses.find({'year': bookYear, 'month': thisMonth});
		return MemoryVerses.find({'year': bookYear, 'month': {$gte: thisMonth, $lte: nextMonth}}, {sort: {'month': -1, 'reference': -1}});
	}
});

//prayer timer code
var minutes = 20;//average prayer time
var timeLeft = minutes * 60; //number of seconds
var timeIntervalId;//Id of the interval
Template.prayerRequests.events({
  'click .startTimer': function(e) {
	//get the id to use to stop the timer
	timeIntervalId = Meteor.setInterval( function () {
		if(timeLeft > -1){
			Session.set("dateval", timeLeft);
		}
		timeLeft--;
	}, 1000 );
	$('.startTimer').hide();
	$('.stopTimer').show();
  },
  'click .stopTimer': function(e) {
	//the timeIntervalId was set in the click event above,
	//use it to stop the interval
	if(timeLeft > -1){
		Session.set("dateval", timeLeft);
	}else{
		timeLeft = minutes * 60;
	}
	
	Meteor.clearInterval( timeIntervalId);
	$('.stopTimer').hide();
	$('.restartTimer').show();
  },
  'click .restartTimer': function(e) {
	//get the current time
	timeLeft = Session.get("dateval");
	  
	//to check if reset of timer has happened
	var hasRest = false;
	  
	//recreate the time interval
	timeIntervalId = Meteor.setInterval( function () {
		if(timeLeft > -1){
			Session.set("dateval", timeLeft);
		}else{
			if(!hasRest){
				timeLeft = minutes * 60;
				Session.set("dateval", timeLeft);
				hasRest = true;
			}
		}
		timeLeft--;
	}, 1000 );
	$('.restartTimer').hide();
	$('.stopTimer').show();
},
'change  #categorySelect' : function (e,t) {
	var categoryNumber = e.target.value;
	if(parseInt(categoryNumber) > -1){
		$('.selectedRequest').show();
		Session.set("selectedRequest", categoryNumber);
	}
}
});

//set intial template state
Template.prayerRequests.rendered = function() {
	$('.stopTimer').hide();
	$('.restartTimer').hide();
	$('.selectedRequest').hide();
};

