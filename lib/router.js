Router.map(function() { 
	this.route('memoryVerses', {path: '/'});
	this.route('prayerRequests', {path: '/todaysPrayer'});
	this.route('prayerRequestsAdmin', {path: '/requests/edit'});

	this.route('/prayerRequestsEdit', {
		path: 'requests/edit/:_id',
		data: function() { Session.set('currentRequestEditId', this.params._id); }
	});
	this.route('prayerRequestsAdd', {path: '/request/add'});
	this.route('/prayerRequestsDelete', {
		path: 'requests/destroy/:_id',
		data: function() { Session.set('currentRequestDeleteId', this.params._id); }
	});
	
	this.route('memoryVersesAdmin', {path: '/verses/edit'});
	this.route('/memoryVerseEdit', {
		path: 'verses/edit/:_id',
		data: function() { Session.set('currentVerseEditId', this.params._id); }
	});
	this.route('memoryVersesAdd', {path: '/verses/add'});
	this.route('/memoryVersesDelete', {
		path: 'verses/destroy/:_id',
		data: function() { Session.set('currentVerseDeleteId', this.params._id); }
	});
});

Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading'
	//onBeforeAction: function() {
	  //this.render('loading');
	//}
});