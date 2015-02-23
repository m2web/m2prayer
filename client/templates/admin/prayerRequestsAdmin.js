Template.prayerRequestsAdmin.helpers({
	allPrayerRequests : function(){
		return PrayerRequests.find({}, {sort: {'category': 1}});
	}
});