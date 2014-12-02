Template.todaysDate.helpers({
	theDate : function() {
		var month_names = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
		var day_names = new  Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
		var d = new Date();
		var current_day = d.getDay();
		var current_date = d.getDate();
		var current_month = d.getMonth();
		var current_year = d.getFullYear();
		return day_names[current_day] + ", " + month_names[current_month] + " " + current_date + ", "  + current_year;
	}
});
