Template.prayerRequestsEdit.helpers({
	editRequest : function(){
		console.log(Session.get('currentRequestEditId'));
		return PrayerRequests.findOne(Session.get('currentRequestEditId'));
	}
});

Template.prayerRequestsEdit.events({
	'submit form' : function(e){
		e.preventDefault();
	}
});