'use strict';

angular.module('app.panier')

.controller('PanierController'/*majuscule obligatoire quand on défini le ctrl dans module.js*/, function ($scope) {


	if (sessionStorage.getItem('articlesPanier')) {

		var articlesPanier = JSON.parse(sessionStorage.getItem('articlesPanier'));
		$scope.nbArticles=0;

		for (var article of articlesPanier) {
			//alert(JSON.stringify(article));
			$scope.nbArticles+=article.quantity;

			article.prixNonRemiseStr=multiplyStr(article.prixNonRemise, article.quantity);
			article.prixTTCStr=multiplyStr(article.prixTTC, article.quantity);
		}

		$scope.products = articlesPanier;


		//alert(articlesPanier);

		/*if (articlesPanier==null)
			$scope.nbArticles=0;
		else
			$scope.nbArticles = articlesPanier.length;


		if (document.location.hash==='#/panier') {
			
			$scope.products = [];
			var articles = JSON.parse(sessionStorage.getItem('articlesPanier'));

			for (var product of articles) {
				var nbDoubles = 0;

				for (var productStored of articles) {
					if (articles.indexOf(productStored)!=articles.indexOf(product)){
						if (productStored.id==product.id && productStored.idPromo==product.idPromo) {
							var index = articles.indexOf(productStored);
							articles.splice(index ,1);
							nbDoubles++;
						} 
					} 
				}

				product.quantity = nbDoubles+1;
				alert(product.quantity+JSON.stringify(product));
			}

			$scope.products = articles;	
		}*/


	} else {

		$scope.nbArticles=0;
	
	}

	$scope.addArticle = function (product) {

	}

	$scope.recalcNbArticles = function (quantity) {
			$scope.nbArticles+=quantity;
	}

	$scope.goToPanier = function () {
		if ($scope.nbArticles!==0) {
			document.location.hash='#/panier';
		} else {
			$.prompt('Le panier est vide', {top: '10%'});
		}
	}

	function multiplyStr (str, factor) {
		var strInt = str.replace(",",".");
		var int = parseFloat(strInt);
		var doubleInt = (int*factor).toFixed(2);	
		var newStrInt = doubleInt.toString();
		var newStr = newStrInt.replace(".",",");
		return newStr;
	}

});