Meteor.startup(function () {
	Meteor.methods({
	  todaysVerseMethod: function () {
		var esv = new ESV();
		return esv.getTodaysVerse();
	  },
	  getVerseMethod: function (verse) {
		var esv = new ESV();
		return esv.getVerse(verse);
	  }
	});
  });