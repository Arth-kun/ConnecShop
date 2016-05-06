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

var menus = [{
	"head":"Menu",
	"categories":[{
	"name":"Meilleures Ventes",
	"id":0
},{
	"name":"Promotions du Moment",
	"id":1
},{
	"name":"Catégorie 1",
	"id":2
},{
	"name":"Catégorie 2",
	"id":3
},{
	"name":"Catégorie 3",
	"id":4
},{
	"name":"Catégorie 4",
	"id":5
},{
	"name":"Catégorie 5",
	"id":6
},{
	"name":"Catégorie 6",
	"id":7
},{
	"name":"Catégorie 7",
	"id":8
},{
	"name":"Catégorie 8",
	"id":9
	}]
}, {
	"head":"A propos",
	"categories":[{
	"name":"Qui sommes nous ?",
	"id":10
},{
	"name":"CGV",
	"id":11
},{
	"name":"Nous contacter",
	"id":12
	}]
}]