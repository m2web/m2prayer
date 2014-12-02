/*
Meteor.publish('todaysVerse', function() {
	var esv = new ESV();
	return esv.getTodaysVerse();
});
*/

Meteor.publish('memoryVerses', function() {
	console.log(jm_verses);
	return jm_verses.find();
});