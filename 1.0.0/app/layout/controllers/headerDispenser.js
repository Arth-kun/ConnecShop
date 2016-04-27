function headerDispenser () {
	if (document.location.hash==='#/home') {
		$('#ribbon #homeSearchbar, #header .pull-left #logo, #header #buttonsPullRight .buttonContainer, #menu-toggle-button').removeClass('displayNone');
	} else {
		$('#ribbon #homeSearchbar, #header .pull-left #logo, #header #buttonsPullRight .buttonContainer, #menu-toggle-button').addClass('displayNone');
		$('#header #buttonsPullRight .buttonCartContainer').removeClass('displayNone');
		
	}

	if (!document.location.hash.includes("products-detail")) {
		$('#ribbon').removeClass('displayNone');
    	$('#header').removeClass('productsDetailHeader');
	}

}

window.onhashchange = function () {
	headerDispenser();
}