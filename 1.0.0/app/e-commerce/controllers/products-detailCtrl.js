'use strict';

angular.module('app.eCommerce')

.controller('products-detailController', function ($scope, $http) {

    $('#ribbon').addClass('displayNone');
    $('#header').addClass('productsDetailHeader');

	var hashProduct = document.location.hash.split("/");
    var idProduct = hashProduct[4];
    var idCategory = hashProduct[3];

    $http.get('http://ressource.octave.biz/ac01/connecshop/products/'+idProduct+'.json', { responseType: "json" })
    .success(function (product) {
    	$scope.product = product;
    	$scope.nbAvis = product.avisContent.length;
    });

    if (idCategory==='Accueil') {
    	$scope.category = idCategory;
    } else {
    	$scope.category = menuTitle[idCategory];
	}

    $scope.description = new Dispenser();
    $scope.avis = new Dispenser();
    $scope.addAvis = new Dispenser();


    $scope.addCart = function (product) {
    	angular.element($("#header #buttonsPullRight .controllerContainer")).scope().addCart(product);
	}


    function Dispenser () {
    	this.showDesc = false;

    	this.dispDesc = function () {
    		if (!this.showDesc) {
    			this.showDesc = true;
    		} else {
    			this.showDesc = false;
    		}
    	}
    }

    $(document).ready(function () {

		$('.carousel, .promoTag').hammer().on("swipeleft", function(){
			$('.carousel').carousel('next');
		});

		$('.carousel, .promoTag').hammer().on("swiperight", function(){
			$('.carousel').carousel('prev');
		});
		
	});

});

var menuTitle = [
	"Meilleures Ventes",
	"Promotions du Moment",
	"Catégorie 1",
	"Catégorie 2",
	"Catégorie 3",
	"Catégorie 4",
	"Catégorie 5",
	"Catégorie 6",
	"Catégorie 7",
	"Catégorie 8",
	"Qui sommes nous ?",
	"CGV",
	"Nous contacter",
	"Mode Femme",
	"Nouvelle Collection"
	];