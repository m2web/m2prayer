Meteor.subscribe('memoryVerses');

memoryVersesCollection = new Meteor.Collection('memoryVerses');

Template.memoryVerses.helpers({
  memoryVerses: function() {
	var todaysDate = new Date();
	var lastMonth = todaysDate.getMonth();
	var theYear = todaysDate.getFullYear();
	//this is from the jm_verses (Joshua's Men) collection
	return memoryVersesCollection.find({'year': theYear, 'month': {$gte: 0, $lte: lastMonth}});
  }
});