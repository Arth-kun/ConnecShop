'use strict';

angular.module('app.home')

.controller('HomeController', function ($scope) {
	$scope.imagesCarousel = imagesCarsouel;

	$scope.imagesMiseAvant = imagesMiseAvant;

	$scope.articlesMeilleureVente = articlesMeilleureVente;

	$scope.goToDetail = function (id) {
		document.location.hash ='#/product/detail/'+id;
	}
});

var imagesCarsouel = [{
	"src":"styles/img/octave/carousel.png",
	"url":"http://getbootstrap.com/javascript/"
},{
	"src":"styles/img/octave/carousel.png",
	"url":"http://getbootstrap.com/javascript/"
},{
	"src":"styles/img/octave/carousel.png",
	"url":"http://getbootstrap.com/javascript/"
}];

var imagesMiseAvant = [{
	"src":"styles/img/octave/miseavant1.png",
	"url":"http://getbootstrap.com/javascript/"
},{
	"src":"styles/img/octave/miseavant2.png",
	"url":"http://getbootstrap.com/javascript/"
}];


// Il y aura des propriété à ajouter avec les services
var articlesMeilleureVente = [{
	"id":"0",
	"img":"styles/img/demo/e-comm/1.png",
	"designation":"Sac à main",
	"prixText":"à partir de",
	"prixTTC": "49,00"
},{
	"id":"1",
	"img":"styles/img/demo/e-comm/2.png",
	"designation":"Rouge à lèvres",
	"prixText":"",
	"prixTTC": "26,90"
}]