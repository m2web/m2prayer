Meteor.subscribe('memoryVerses');

Template.memoryVerses.helpers({
	memoryVerses: function() {
		var todaysDate = new Date();
		//The lastMonth is used to determine the number of memory verses to be displayed in the query below. If April 
		//is the month, then verses up to and including April will be shown
		//Also, since the last month for meeting to memorize scripture for Joshua's Men is November and the getMonth 
		//returns a 0 - 11 number, we do not need to include December (or 12) and therefore do not need to add 1.
		//However, the first month is not until February which is month 2 so we add 2 to get this and next month's verses.
		var lastMonth = todaysDate.getMonth() + 2;
		//theYear is used to determine if the Joshua's Men group is using Grudem or the books. 
		var theYear = todaysDate.getFullYear();
		//even year (ex. 2014 and 2016) is using Grudem's. This is used in the query below
		var bookYear = (theYear % 2 == 0) ? "GRUDEM":"BOOKS";
		
		//we are using the year ('GRUDEM' or 'BOOKS') and the month number range. We are sorting my month number and reference (verse location) descending.
		return MemoryVerses.find({'year': bookYear, 'month': {$gte: 0, $lte: lastMonth}}, {sort: {'month': -1, 'reference': -1}});
	}
});