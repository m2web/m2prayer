Meteor.publish('memoryVerses', function() {
	console.log(this.jm_verses);
	return jm_verses.find({});
});