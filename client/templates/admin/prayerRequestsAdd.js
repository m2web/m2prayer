Template.prayerRequestsAdd.events({
	'submit form' : function(e){
		e.preventDefault();
		
		//get the max catagoryNumber and add 1 to it
		var newCategoryNumberCursor = PrayerRequests.find({}, {sort: {categoryNumber: -1}, limit: 1});
		var newCategoryNumber = 0;
		newCategoryNumberCursor.forEach(function (request){
			newCategoryNumber = request.categoryNumber + 1;
		});
		
		//get the submitted values		
		var categoryText = $(e.target).find('[name=category]').val();
		var requestText = $(e.target).find('[name=request]').val();
		
		//use this to determine if all is well before updating
		var hasError = false; 
		
		//check that we have a new categoryNumber
		if(newCategoryNumber == 0){
			alert("You did not get a new categoryNumber value. Please try again.");
			hasError = true;
		}
		
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
			categoryNumber: newCategoryNumber,
			category: categoryText,
			request: requestText
			}

			PrayerRequests.insert(prayerProperties);	
			Router.go('prayerRequestsAdmin');
		}
	}
});