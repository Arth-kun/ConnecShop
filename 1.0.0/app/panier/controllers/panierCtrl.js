'use strict';

angular.module('app.panier')

.controller('PanierController'/*majuscule obligatoire quand on défini le ctrl dans module.js*/, function ($scope) {

	$scope.articlesPanier = JSON.parse(localStorage.getItem('articlesPanier'));
	//alert(localStorage.getItem('articlesPanier'));

	if ($scope.articlesPanier==null)
		$scope.nbArticles=0;
	else
		$scope.nbArticles = $scope.articlesPanier.length;

	if ($scope.nbArticles==undefined)
		$scope.nbArticles=0;

	$scope.addArticle = function (product) {
		$scope.articlesPanier.push(product);
	}

});