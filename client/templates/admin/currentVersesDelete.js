Template.memoryVersesDelete.rendered = function() {
	//get the verse Id for the delete below
	var currentVerseId= Session.get('currentVerseDeleteId');
	
	if(currentVerseId){
		MemoryVerses.remove(currentVerseId);
		Router.go('memoryVersesAdmin');	
	}
};