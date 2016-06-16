'use strict';

angular.module('app.menu', ['ui.router'])

.controller('menuController', function ($scope) {

	$scope.categories = [{
		"name":"Meilleures Ventes",
		"key":"best"
	},{
		"name":"Promotions du Moment",
		"key":"PROMOMOMENT"
	}];

	$.post( webServUrl+"GET_ListeCategorieParMenu", { menu : 2 })
        .done(function(categories) {

        for (var category of categories) {
        	var theme = {};
        	theme.name = category.Theme;
        	theme.key = category.KeyTheme;
            $scope.categories.push(theme);
        }
    });	


	$scope.aPropos = aPropos;

	$scope.goToList = function (id) {
		document.location.hash = '#/e-commerce/products-list/'+id;
		closeMenu();
	}

	// Fonction de hiding du menu
	$('body').on('click', '#menu-toggle-button', function () {
		
		if (!$(this).hasClass('is-opened')) {

			$(this).addClass('is-opened').removeClass('is-closed');
			$('#menu-panel').addClass('opened');
			document.addEventListener('touchmove', stopScroll, false);
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
		document.removeEventListener('touchmove', stopScroll, false);
		$('body').removeClass('noscroll');
		$('.menu-head .firstHead').fadeOut('1200');
	}

	function stopScroll (e) { 
		e.preventDefault(); 
	}

});

var aPropos = [
	"Qui sommes nous ?",
	"CGV",
	"Nous contacter"
];