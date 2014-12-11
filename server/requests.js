Meteor.publish('prayerRequests', function() {
	return PrayerRequests.find({});
});