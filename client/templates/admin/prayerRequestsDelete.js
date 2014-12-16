Template.prayerRequestsDelete.rendered = function() {
	//get the request Id for the delete below
	var currentRequestId = Session.get('currentRequestDeleteId');
	
	if(currentRequestId){
		PrayerRequests.remove(currentRequestId);
		Router.go('prayerRequestsAdmin');	
	}
};