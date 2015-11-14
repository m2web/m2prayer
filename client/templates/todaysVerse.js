Template.todaysVerse.helpers({
  theVerse: function() {
	//put something in the returned value to show
	// var todaysVerseOutput = "There was a problem getting the verse."
	
	//this session variable is set in the prayerRequest.js file and is used to call the 
	//ESV API Rest service once for the day's verse. Otherwise, it continues to call it several times.
	//I am not sure why but it may have to do with the parent template's pub/sub activities (?)
	if(Session.get("todaysVerseNotSet")){
		//call to the todaysMemoryVerse method in the server/startup.js file
		Meteor.call('todaysVerseMethod',function(err, response) {
			//set this so the todaysVerseMethod is not called several times.
			Session.set("todaysVerseNotSet", false);
			//set the value in session
			Session.set('todaysMemoryVerse', response);
		});
	}
	//get the value out of session that was set in session above
	var todaysVerseOutput = Session.get('todaysMemoryVerse');
	
	//if not populated then set as empty string
	if(todaysVerseOutput){
		todaysVerseOutput = {content : ""};
	}
	
	//content is the key of the verse text in the JSON document
	return todaysVerseOutput['content'];
  }
});


