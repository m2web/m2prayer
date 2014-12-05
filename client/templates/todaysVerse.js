Template.todaysVerse.helpers({
  theVerse: function() {
	var esv = new ESV();
	return esv.getTodaysVerse();
  }
});

