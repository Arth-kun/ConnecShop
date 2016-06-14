'use strict';

angular.module('app.home')

.controller('HomeController', function ($scope) {

	//FOR REAL WEB SERVICE
	//MEILLEURESVENTES
	$.post( "http://auth01-04.octavesaas04.fr/WSE_Beacon/ConnecShopWS.asmx/GET_ArticleMeilleuresVentes")
  	.done(function(articlesMeilleureVente) {
    	for (var article of articlesMeilleureVente) {
    		article.img = "http://ac01.ow04.fr/I-Moyenne-"+article.IDImage+".net.jpg";

            if (article.Remise===0) {
                article.hasRemise = false;
                article.prixText = "";
                article.PrixTTC = priceToString(article.PrixTTC);
            } else {
                article.hasRemise = true;
               	article.prixText = "à partir de ";
                article.PrixTTC = priceToString(article.PrixTTC-article.PrixTTC*article.Remise);
			}
		}

    	$scope.articlesMeilleureVente = articlesMeilleureVente;
	});


	$scope.promo = [];

	$scope.goToDetail = function (id) {
		document.location.hash ='#/e-commerce/products-detail/Accueil/'+id;
	}

	$scope.goToList = function (KeyTheme) {
		document.location.hash ='#/e-commerce/products-list/'+KeyTheme;
	}

	//Swipe Carousel functions
	$(document).ready(function () {

		$('.carousel').carousel({
  			interval: 7000
		});

		$('.carousel').hammer().on("swipeleft", function(){
			$(this).carousel('next');
		});

		$('.carousel').hammer().on("swiperight", function(){
			$(this).carousel('prev');
		});
		
	});

	getMenuByID(0);
	getMenuByID(1);

   function getMenuByID (idMenu) {
	    $.post( "http://auth01-04.octavesaas04.fr/WSE_Beacon/ConnecShopWS.asmx/GET_ListeCategorieParMenu", { menu : idMenu })
	    .done(function(categories) {

	        for (var category of categories) {
	        	category.src = "http://ac01.ow04.fr/I-Moyenne-"+category.IDImage+".net.jpg";
	    	}

	    	$scope.promo[idMenu] = categories;

	    });
    }


});