Router.map(function() { 
	this.route('memoryVerses', {path: '/'});
	this.route('prayerRequests', {path: '/todaysPrayer'});
	this.route('prayerRequestsAdmin', {path: '/requests/edit'});

	this.route('/prayerRequestsEdit', {
		path: 'requests/edit/:_id',
		data: function() { Session.set('currentRequestEditId', this.params._id); }
	});
});

Router.configure({
	layoutTemplate: 'layout',
	//onBeforeAction: function() {
	  //this.render('loading');
	//}
});