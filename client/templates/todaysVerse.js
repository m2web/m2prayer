Template.todaysVerse.helpers({
  theVerse: function() {
	//put something in the returned value to show
	var todaysVerseOutput = "There was a problem getting the verse."
	//call to the todaysMemoryVerse method in the server/verses.js file
	Meteor.call('todaysVerseMethod',function(err, response) {
		//set the value in session
		Session.set('todaysMemoryVerse', response);
	});
	//get the value out of session that was set in session above
	todaysVerseOutput = Session.get('todaysMemoryVerse')
	//content is the key of the verse text in the JSON document
	return todaysVerseOutput['content'];
  }
});


