'use strict';

angular.module('app.menu', ['ui.router'])

.controller('menuController', function ($scope) {	

	$scope.menus = menus;

	$scope.goToList = function (id) {
		document.location.hash = '#/e-commerce/products-list/'+id;
		closeMenu();
	}

	// Fonction de hiding du menu
	$('body').on('click', '#menu-toggle-button', function () {
		
		if (!$(this).hasClass('is-opened')) {

			$(this).addClass('is-opened').removeClass('is-closed');
			$('#menu-panel').addClass('opened');
			$('body').addClass('noscroll');
			$('.menu-head .firstHead').fadeIn('1200');
			
		} else {
			closeMenu();
		}
	});

	$('#menu-panel').hammer().on("swipeleft", function () {
		closeMenu();
	});

	function closeMenu () {
		$('#menu-toggle-button').addClass('is-closed').removeClass('is-opened');
		$('#menu-panel').removeClass('opened');
		$('body').removeClass('noscroll');
		$('.menu-head .firstHead').fadeOut('1200');
	}


});

var menus = [{
	"head":"Menu",
	"categories":[
	"meilleures ventes",
	"promotions du moment",
	"catégorie 1",
	"catégorie 2",
	"catégorie 3",
	"catégorie 4",
	"catégorie 5",
	"catégorie 6",
	"catégorie 7",
	"catégorie 8",
	]
}, {
	"head":"A propos",
	"categories":[
	"Qui sommes nous ?",
	"CGV",
	"Nous contacter",
	]
}]