/*
Meteor.publish('todaysVerse', function() {
	var esv = new ESV();
	return esv.getTodaysVerse();
});
*/

Meteor.publish('memoryVerses', function() {
	console.log(this.jm_verses);
	return jm_verses.find();
});