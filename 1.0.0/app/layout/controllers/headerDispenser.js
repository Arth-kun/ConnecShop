function headerDispenser () {
	if (document.location.hash==='#/home') {
		$('#ribbon, #ribbon #homeSearchbar, #header .pull-left #logo, #header #buttonsPullRight .buttonContainer, #menu-toggle-button, #beacon .flecheHome').removeClass('displayNone');
		if (newRayon) {
			angular.element($("#beacon")).scope().showBeacon.show();
			newRayon = false; //On décharge le booléan
		}
	} else {
		$('#ribbon, #ribbon #homeSearchbar, #header .pull-left #logo, #header #buttonsPullRight .buttonContainer, #menu-toggle-button, #beacon .flecheHome').addClass('displayNone');
		
		if (document.location.hash!=='#/panier') {
			$('#header #buttonsPullRight .buttonCartContainer').removeClass('displayNone');
		}

	}

	if (!document.location.hash.includes("products-detail")) {
		if (document.location.hash!=='#/panier')
			$('#ribbon').removeClass('displayNone');

    	$('#header').removeClass('productsDetailHeader');
	}

}

window.onhashchange = function () {
	headerDispenser();
}