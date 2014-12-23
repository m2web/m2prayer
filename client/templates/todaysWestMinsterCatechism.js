Meteor.subscribe('catechisms');

Template.todaysWestMinsterCatechism.helpers({
  theCatechism: function() {
	var todaysDate = new Date();
	//this date method is a custom method created in the lib/date_helper.js file. This is the day number fo the year (1 - 365)
	var todaysWestminsterCatechismNumber = todaysDate.getDOY();
	
	//get today's question
	var numberOfQuestions = 107;
	var numberOfQuestionsX2 = numberOfQuestions * 2;
	var numberOfQuestionsX3 = numberOfQuestions * 3;
	
	if(todaysWestminsterCatechismNumber > numberOfQuestions && todaysWestminsterCatechismNumber <= numberOfQuestionsX2) {
		todaysWestminsterCatechismNumber = todaysWestminsterCatechismNumber - numberOfQuestions;
	}else if(todaysWestminsterCatechismNumber > numberOfQuestionsX2 && todaysWestminsterCatechismNumber <= numberOfQuestionsX3) {
		todaysWestminsterCatechismNumber = todaysWestminsterCatechismNumber - numberOfQuestionsX2;
	}else if (todaysWestminsterCatechismNumber > numberOfQuestionsX3) {
		todaysWestminsterCatechismNumber = Math.floor(Math.random() * (numberOfQuestions - 1)) + 1;
	}	  
	console.log(todaysWestminsterCatechismNumber);
	return WestminsterCatechisms.find({'number': todaysWestminsterCatechismNumber.toString()});
  }
});