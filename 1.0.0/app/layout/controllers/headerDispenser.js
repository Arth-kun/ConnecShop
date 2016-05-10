function headerDispenser () {
	if (document.location.hash==='#/home') {
		$('#ribbon, #ribbon #homeSearchbar, #header .pull-left #logo, #header #buttonsPullRight .buttonContainer, #menu-toggle-button, #beacon .flecheHome, #header #buttonsPullRight .nbArticlesPanier').removeClass('displayNone');
	} else {
		$('#ribbon, #ribbon #homeSearchbar, #header .pull-left #logo, #header #buttonsPullRight .buttonContainer, #menu-toggle-button, #beacon .flecheHome, #header #buttonsPullRight .nbArticlesPanier').addClass('displayNone');
		
		if (document.location.hash!=='#/panier') {
			$('#header #buttonsPullRight .buttonCartContainer').removeClass('displayNone');
			$('#header #buttonsPullRight .nbArticlesPanier').removeClass('displayNone');
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