'use strict';

angular.module('app.eCommerce')

.controller('products-detailController', function ($scope, $http) {

    $('#ribbon').addClass('displayNone');
    $('#header').addClass('productsDetailHeader');

	var hashProduct = document.location.hash.split("/");
    var idProduct = hashProduct[4];
    var categoryProduct = hashProduct[3];

    $http.get('http://ressource.octave.biz/ac01/connecshop/products/'+idProduct+'.json', { responseType: "json" })
    .success(function (product) {
    	$scope.product = product;
    	$scope.nbAvis = product.avisContent.length;
    });

    $scope.category = decodeURI(categoryProduct);

    $(document).ready(function () {

		$('.carousel').hammer().on("swipeleft", function(){
			$(this).carousel('next');
		});

		$('.carousel').hammer().on("swiperight", function(){
			$(this).carousel('prev');
		});
		
	});

});