'use strict';

angular.module('app.eCommerce')

.controller('products-detailController', function ($scope) {

    $('#ribbon').addClass('displayNone');
    $('#header').addClass('productsDetailHeader');

	var hashProduct = document.location.hash.split("/");
    var idProduct = parseInt(hashProduct[4]);
    var idCategory = hashProduct[3];

    //FOR REAL WEB SERVICE
    //ARTICLEDETAIL

    $.post( webServUrl+"GET_ArticleParID", { id: idProduct })
    .done(function(products) {

        $scope.products = formateJson(products, 'detail');

    });

    $scope.menuTitle={
        "best":"Meilleures Ventes",
        "PROMOMOMENT":"Promotions du Moment"
    };

    getMenuByID(2);
    getMenuByID(0);
    getMenuByID(1);


    $scope.description = new Dispenser();
    $scope.avis = new Dispenser();

    $scope.initCarousel = function () {
        $('.carousel, .promoTag').hammer().on("swipeleft", function(){
            $('.carousel').carousel('next');
        });

        $('.carousel, .promoTag').hammer().on("swiperight", function(){
            $('.carousel').carousel('prev');
        });
    }


    $scope.category = function () {
        if (idCategory==='Accueil') {
            return idCategory;
        } else {
            return $scope.menuTitle[idCategory];
        }
    }

    $scope.goBack = function () {
        history.go(-hashProduct[5]);
    }


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


    function getMenuByID (idMenu) {
        $.post( webServUrl+"GET_ListeCategorieParMenu", { menu : idMenu })
        .done(function(categories) {

            for (var category of categories) {
                $scope.menuTitle[category.KeyTheme] = category.Theme;
            }
        });
    }
		

});