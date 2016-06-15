'use strict';

angular.module('app.panier')

.controller('PanierController'/*majuscule obligatoire quand on défini le ctrl dans module.js*/, function ($scope) {


	calcProducts();

	function calcProducts () {
		if (sessionStorage.getItem('articlesPanier')) {

			var articlesPanier = JSON.parse(sessionStorage.getItem('articlesPanier'));
			$scope.nbArticles=0;
			$scope.prixTotal=6.6;
			for (var article of articlesPanier) {
				//alert(JSON.stringify(article));
				$scope.nbArticles+=article.quantity;

				if (article.prixNonRemise)
					article.prixNonRemiseStr=multiplyStr(article.prixNonRemise, article.quantity);

				article.prixTTCStr=multiplyStr(article.PrixTTC, article.quantity);

				totalPrix(article.prixTTCStr);
			}

			totalPrix($scope.prixTotal);

			$scope.products = articlesPanier;

		} else {

			$scope.nbArticles=0;
		
		}
	}


	$scope.changeQuantity = function (index, quantity) {
		
		var productsStored=JSON.parse(sessionStorage.getItem('articlesPanier'));
		productsStored[index].quantity+=quantity;

		if (!productsStored[index].quantity) {
			productsStored.splice(index,1);
		}
		sessionStorage.articlesPanier = JSON.stringify(productsStored);
		calcProducts();
		angular.element($("#header #buttonsPullRight .controllerContainer")).scope().recalcNbArticles();

		if ($scope.nbArticles==0) {
			$.prompt('Le panier est vide', {top: '10%'});
			document.location.hash = '#/home';
		}
	}


	$scope.recalcNbArticles = function () {
			calcProducts();
	}


	$scope.addCart = function (product) {
		//Il faudrait que le nombre d'article à choisir se fasse en fonction de nombre d'article disponible
		var addCartPopup = {
			state0: {
				title: 'Quantité',
				html:'<select name="quantity" class="form-control">'+
				'<option value="1" selected>1</option>'+
				'<option value="2">2</option>'+
				'<option value="3">3</option>'+
				'<option value="4">4</option>'+
				'<option value="5">5</option>'+
				'</select>',
				buttons: { "Ajouter": true },
				submit:function(e,v,m,f){

				 	var quantity = parseInt(f.quantity);
				 	var doublon = false;

					if ($.isEmptyObject(sessionStorage)) {
						var products=[];
						product.quantity=quantity;
						products[0]=product;
					}
					else {
						var products=JSON.parse(sessionStorage.getItem('articlesPanier'));
						for (var productStored of products) {
							if (productStored.ID===product.ID&&productStored.idPromo===product.idPromo){
								doublon=true;
								productStored.quantity+=quantity;
							}
						}

						if (!doublon) {				
							product.quantity=quantity;
							products[products.length]=product;
						}
					}

					sessionStorage.articlesPanier = JSON.stringify(products);
			  		//alert(sessionStorage.getItem('articlesPanier'));

			  		calcProducts();


			  		e.preventDefault();
			  		$.prompt.nextState();
  				}
  			},
  			state1: {
  				title: 'Ajouté !',
  				html: '<p>Votre produit a bien été ajouté.</p>',
  			}
		};
		if (product.Stock)
			$.prompt(addCartPopup);
		else
			$.prompt('Le produit n\'est plus en stock')
	}

	$scope.goToPanier = function () {
		if ($scope.nbArticles!==0) {
			document.location.hash='#/panier';
		} else {
			$.prompt('Le panier est vide', {top: '10%'});
		}
	}

	function multiplyStr (str, factor) {
		var strNumber = str.replace(",",".");
		var number = parseFloat(strNumber);
		var doubleNumber = (number*factor).toFixed(2);	
		var newStrNumber = doubleNumber.toString();
		return newStrNumber.replace(".",",");
	}

	function totalPrix (prix) {
		if (typeof prix === 'string') {
			var prixNumber = prix.replace(",",".");
			$scope.prixTotal += parseFloat(prixNumber);
		} else {
			var prixTotal = prix.toFixed(2);
			var prixTotalString = prixTotal.toString();
			$scope.prixTotal = prixTotalString.replace(".",",");
		}
	}

});