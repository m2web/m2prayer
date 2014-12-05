Meteor.publish('memoryVerses', function() {
	return MemoryVerses.find({});
});

Meteor.startup(function () {
	Meteor.methods({
	  todaysVerseMethod: function (name) {
		var esv = new ESV();
		return esv.getTodaysVerse();
	  }
	});
  });