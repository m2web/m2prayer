Meteor.startup(function () {
	Meteor.methods({
	  todaysVerseMethod: function (name) {
		var esv = new ESV();
		return esv.getTodaysVerse();
	  }
	});
  });