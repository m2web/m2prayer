Router.configure({
	layoutTemplate: 'layout'	
});

Router.route('/', {name: 'memoryVerses'});

Router.route('/todaysPrayer', {name: 'prayerRequests'});