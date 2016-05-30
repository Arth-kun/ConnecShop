//JSON TRANSFORMATION OF WEB SERVICES


// Price to string
function priceToString (price) {
	var priceStr = price.toString();
	return priceStr.replace(".",",");
}

// Reformation of Date
function dateReformate (str) {
	    var y = str.substr(0,4),
        m = str.substr(4,2),
        d = str.substr(6,2);
        return d+'/'+m+'/'+y;
}