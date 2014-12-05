Date.prototype.getDOY = function(){
	var firstOfJan = new Date(this.getFullYear(),0,1);
	return Math.ceil((this - firstOfJan) / 86400000);
}

