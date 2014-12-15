Meteor.subscribe('prayerRequests');

Template.prayerRequests.helpers({
	allPrayerRequests : function(){
		return PrayerRequests.find();
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
			//get a random number for category end since the last days of the week will have the same requests
			if (weekDayNumber > 5) { //if day greater than Thursday (+1 as 0 not good divisor or multiplicand)
				categoryEnd = Math.floor(Math.random() * (requestCount - 1)) + 1;
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
	Session.set("dateval", timeLeft);
	Meteor.clearInterval( timeIntervalId);
	$('.stopTimer').hide();
	$('.restartTimer').show();
  },
  'click .restartTimer': function(e) {
	//get the current time
	timeLeft = Session.get("dateval");
	//recreate the time interval
	timeIntervalId = Meteor.setInterval( function () {
		if(timeLeft > -1){
			Session.set("dateval", timeLeft);
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

