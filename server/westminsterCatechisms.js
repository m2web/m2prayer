Meteor.publish('catechisms', function() {
	return WestminsterCatechisms.find({});
});