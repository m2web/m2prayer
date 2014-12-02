Meteor.subscribe('todaysVerse');

todaysVerse = new Meteor.Collection('todaysVerse');

Template.todaysVerse.helpers({
  theVerse: function() {
	return this.todaysVerse;
  }
});

