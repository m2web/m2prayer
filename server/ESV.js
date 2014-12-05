ESV = function(){}

ESV.prototype.getVerse = function (verse){
	var base_url = "http://www.esvapi.org/v2/rest/passageQuery?key=687d2878725c2801"

	verse = verse.replace(/\s/, "+");
	verse = verse.replace(/\:/, "%3A");
	verse = verse.replace(/\,/, "%2C");
	
	return this.httpGet(base_url + "&passage=" + verse + "&" + this.getVerseOptions());
}

ESV.prototype.getTodaysVerse = function(){
	var base_url = "http://www.esvapi.org/v2/rest/dailyVerse?key=687d2878725c2801&"
	return this.httpGet(base_url + this.getVerseOptions());
}

ESV.prototype.httpGet = function(theUrl)
{	
	return Meteor.http.get(theUrl);
}

ESV.prototype.getVerseOptions = function(){
	return [
		"include-short-copyright=0",
		"include-passage-horizontal-lines=0",
		"include-heading-horizontal-lines=0",
		"include-footnotes=false",
		"include-short-copyright=false",
		"include-subheadings=false",
		"include-headings=false",
		"include-content-type=false"].join('&');
}