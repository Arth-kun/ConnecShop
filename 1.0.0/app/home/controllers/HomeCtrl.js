'use strict';

angular.module('app.home')

.controller('HomeController', function ($scope) {

	//FOR REAL WEB SERVICE
	//MEILLEURESVENTES
	$.post( "http://auth01-04.octavesaas04.fr/WSE_Beacon/ConnecShopWS.asmx/GET_ArticleMeilleuresVentes")
  	.done(function(articlesMeilleureVente) {
    	for (var article of articlesMeilleureVente) {
    		article.img = "http://ac01.ow04.fr/I-Moyenne-"+article.IDImage+".net.jpg";
    		article.prixText = "";
    		article.PrixTTC = priceToString(article.PrixTTC);
    	}

    	$scope.articlesMeilleureVente = articlesMeilleureVente;
  	});


	$scope.imagesCarousel = imagesCarsouel;

	$scope.imagesMiseAvant = imagesMiseAvant;

	$scope.goToDetail = function (id) {
		document.location.hash ='#/e-commerce/products-detail/Accueil/'+id;
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

});

var imagesCarsouel = [{
	"src":"styles/img/octave/carousel.png",
	"url":"#/e-commerce/products-detail/Accueil/2"
},{
	"src":"styles/img/octave/carousel.png",
	"url":"#/e-commerce/products-detail/Accueil/2"
},{
	"src":"styles/img/octave/carousel.png",
	"url":"#/e-commerce/products-detail/Accueil/2"
}];

var imagesMiseAvant = [{
	"src":"styles/img/octave/miseavant1.png",
	"url":"#/e-commerce/products-list/13"
},{
	"src":"styles/img/octave/miseavant2.png",
	"url":"#/e-commerce/products-list/14"
}];