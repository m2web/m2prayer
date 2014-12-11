Meteor.publish('memoryVerses', function() {
	return MemoryVerses.find({});
});