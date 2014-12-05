Meteor.subscribe('memoryVerses');

Template.memoryVerses.helpers({
  memoryVerses: function() {
	var todaysDate = new Date();
	var lastMonth = todaysDate.getMonth();
	var theYear = todaysDate.getFullYear();
	//this is from the jm_verses (Joshua's Men) collection
	//return memoryVerses.find({'year': theYear, 'month': {$gte: 0, $lte: lastMonth}});
	//console.log(memoryVerses);
	return MemoryVerses.find({});
  }
});