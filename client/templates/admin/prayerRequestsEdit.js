Template.prayerRequestsEdit.helpers({
	editRequest : function(){
		return PrayerRequests.findOne(Session.get('currentRequestEditId'));
	}
});

Template.prayerRequestsEdit.events({
	'submit form' : function(e){
		e.preventDefault();
		//get the request Id for the update below
		var currentRequestId = Session.get('currentRequestEditId');
		
		//get the submitted values		
		var categoryText = $(e.target).find('[name=category]').val();
		var requestText = $(e.target).find('[name=request]').val();
		
		//use this to determine if all is well before updating
		var hasError = false; 
		
		//check the category
		if(categoryText.length == 0){
			alert("Your Category was blank. Please re-add a category.");
			hasError = true;
		}
		
		//check the request
		if(requestText.length == 0){
			alert("Your request was blank. Please re-add a request.");
			hasError = true;
		}

		//if all ok then update. if not then don't
		if(!hasError){
			var prayerProperties = {
			category: categoryText,
			request: requestText
			}

			PrayerRequests.update(currentRequestId, {$set: prayerProperties}, function(error) {
				if (error) {
					// display the error to the user
					alert("There was an error updating the request: " + error.reason);
				} else {
					Router.go('prayerRequestsAdmin');
				}
			});		
		}
	}
});