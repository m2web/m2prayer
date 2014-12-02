Template.memoryVerses.helpers({
  memoryVerses: function() {
	var todaysDate = new Date();
	var lastMonth = todaysDate.getMonth();
	//this is from the jm_verses (Joshua's Men) collection
	return this.jm_verses.find({'year': year, month: {$gte: 0, $lte: lastMonth}});
  }
});