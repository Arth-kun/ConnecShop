//JSON TRANSFORMATION OF WEB SERVICES

// Url of webservices
var webServUrl = "http://auth01-04.octavesaas04.fr/WSE_Beacon/ConnecShopWS.asmx/";


// Formate the product from webservices to be use in app
function formateJson (products, page) {

	for (var product of products) {

		if (page === 'beacon' || page === 'detail') {

		    product.imgs=["http://ac01.ow04.fr/I-Moyenne-"+product.IDImage+".net.jpg"
		    ];
		    for (var image of product.ImagesSecondaires) {
		        var value = "http://ac01.ow04.fr/I-Moyenne-"+image+".net.jpg";
		        if (!isInArray(value, product.imgs))    
		            product.imgs.push(value);
		    }

		    for (var avis of product.ListeAvis) {
		        avis.DateCreation = dateReformate(avis.DateCreation);

		        avis.Commentaire = $('<textarea />').html(avis.Commentaire).text(); // Ne fonctionne pas sans raison apparente !
		        avis.Commentaire = $('<span>'+avis.Commentaire+'</span>').text();
	    	}

		    if (product.ListeAvis.length>0)
		        product.avis = true;   
		    else
		        product.avis = false;

    	    product.CatHTMLDesignation = $('<textarea />').html(product.CatHTMLDesignation).text(); // Alors que celui ci marche très bien !
		    product.CatHTMLDesignation = $('<span>'+product.CatHTMLDesignation+'</span>').text(); // enlève les balises HTML
		    
		    if (product.CatHTMLDesignation==="")
		        product.description = false;
		    else
		        product.description = true;

		} else if (page === 'home' || page === 'list') {

			product.img = "http://ac01.ow04.fr/I-Moyenne-"+product.IDImage+".net.jpg";

		}

		if (page != 'home') {
		
		    if (product.Note===0)
		        product.hasNote = false;
		    else
		        product.hasNote = true;
		}

	    if (product.Remise===0) {

	        product.hasRemise = false;
	        product.idPromo = 0;
	        product.pourcentage = 0;
	        product.prixNonRemise = 0;
	        product.PrixTTC = priceToString(product.PrixTTC);

	    } else {

	        product.hasRemise = true;
	        product.idPromo = 1;
	        product.pourcentage = -product.Remise*100;
	        product.prixNonRemise = priceToString(product.PrixTTC);
	        product.PrixTTC = priceToString(product.PrixTTC-product.PrixTTC*product.Remise);

	    }

	}

	return products;

}

// Price to string
function priceToString (price) {
	price = price.toFixed(2);
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

// Check presence in Array
function isInArray(value, array) {
  return array.indexOf(value) > -1;
}