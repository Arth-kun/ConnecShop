'use strict';

angular.module('app.eCommerce')

.controller('products-listController', function ($scope, $http) {

	var hashCategory = document.location.hash.split("/");
    var idCategory = hashCategory[3];

    $http.get('http://ressource.octave.biz/ac01/connecshop/productslist/'+idCategory+'.json', { responseType: "json" })
      .success(function (productsList) {
      	$scope.productsList = productsList;
    	$scope.nbArticle = productsList.products.length;
    });

    $scope.goToDetail = function (id, category) {
		document.location.hash ='#/e-commerce/products-detail/'+category+'/'+id;
	}

});