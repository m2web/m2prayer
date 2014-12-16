Template.memoryVersesAdd.events({
	'submit form' : function(e){
		e.preventDefault();
		
		//values for the insert
		var monthText = $(e.target).find('[name=month]').val();
		var referenceText = $(e.target).find('[name=reference]').val();
		var yearText = $(e.target).find('[name=year]').val();
		var textText = $(e.target).find('[name=text]').val();
		
		//use this to determine if all is well before updating
		var hasError = false; 
		
		//check the month
		if(monthText.length == 0){
			alert("Your Month was blank. Please re-add a month.");
			hasError = true;
		}
		
		//check the reference
		if(referenceText.length == 0){
			alert("Your Reference was blank. Please re-add a reference.");
			hasError = true;
		}

		//check the year
		if(yearText.length == 0){
			alert("Your Year was blank. Please re-add a year.");
			hasError = true;
		}
		
		//check the text
		if(textText.length == 0){
			alert("Your Text was blank. Please re-add the text.");
			hasError = true;
		}
		
		//if all ok then update. if not then don't
		if(!hasError){
			var verseProperties = {
				month: monthText,
				reference: referenceText,
				year: yearText,
				text: textText
			}

			MemoryVerses.insert(verseProperties); 
			Router.go('memoryVersesAdmin');	
		}		

	}
});