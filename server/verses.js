Meteor.publish('memoryVerses', function() {
	console.log(this.jm_verses);
	return jm_verses.find({});
});

Meteor.startup(function () {
	Meteor.methods({
	  todaysVerseMethod: function (name) {
		var esv = new ESV();
		return esv.getTodaysVerse();
	  }
	});
  });