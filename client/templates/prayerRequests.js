Meteor.subscribe('prayerRequests');

Template.prayerRequests.helpers({
	prayerRequests: function() {
		//return PrayerRequests.find({"category":"Church Staff"});
		return PrayerRequests.find();
	}
});