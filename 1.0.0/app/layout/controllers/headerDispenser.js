function headerDispenser () {
	if (document.location.hash==='#/home') {
		$('#ribbon, #ribbon #homeSearchbar, #header .pull-left #logo, #header #buttonsPullRight .buttonContainer, #menu-toggle-button, #beacon .flecheHome').removeClass('displayNone');
	} else {
		$('#ribbon, #ribbon #homeSearchbar, #header .pull-left #logo, #header #buttonsPullRight .buttonContainer, #menu-toggle-button, #beacon .flecheHome').addClass('displayNone');
		
		if (document.location.hash!=='#/panier') 
			$('#header #buttonsPullRight .buttonCartContainer').removeClass('displayNone');

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