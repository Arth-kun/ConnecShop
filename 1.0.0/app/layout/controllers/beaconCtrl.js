'use strict';

angular.module('app.beacon', ['ui.router'])

.controller('beaconController', function ($scope, $http) {

	$scope.showBeacon = new Shower();

	$('#beacon').hammer().on("swiperight", function(){
		if ($scope.showBeacon.doShow) {
			$scope.showBeacon.show();
		}
	});

	$('#beacon .flecheHome').hammer().on("swipeleft", function(){
		if (!$scope.showBeacon.doShow) {
			$scope.showBeacon.show();
		}
	});

	$http.get('http://ressource.octave.biz/ac01/connecshop/productsbeacon/0.json', { responseType: "json" })
	.success(function (rayon) {

		for (var product of rayon.products) {
			product.descriptionShow = new Dispenser();
			product.avisShow = new Dispenser();
			product.detailProduct = new Opener();
		}

		$scope.rayon = rayon;
	});

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

					if ($.isEmptyObject(sessionStorage)) {
						var products=[];
						product.quantity=quantity;
						products[0]=product;
					}
					else {
						var products=JSON.parse(sessionStorage.getItem('articlesPanier'));
						product.quantity=quantity;
						products[products.length]=product;
					}

					sessionStorage.articlesPanier = JSON.stringify(products);
			  		//alert(sessionStorage.getItem('articlesPanier'));

			  		angular.element($("#header #buttonsPullRight .buttonCartContainer")).scope().recalcNbArticles(quantity);


			  		e.preventDefault();
			  		$.prompt.nextState();
  				}
  			},
  			state1: {
  				title: 'Ajouté !',
  				html: '<p>Votre produit a bien été ajouté.</p>',
  			}
		};
		$.prompt(addCartPopup);
	}


function Opener () {

	this.open = function (classProd, bProd) {

		$('.spanImg').addClass('col-xs-3').removeClass('col-xs-12');	
		$('.produitContent').addClass('col-xs-9').removeClass('col-xs-12');

		$('.produitContent .produitNote, .spanImg img, .produitContent .produitPrix .produitRemise, .produitContent .produitPrix .produitPrixBarre, .produitContent .produitPrix .produitPrixTTC, .produitContent .produitName, .promTagBeacon .backgroundPromo, .promTagBeacon .textPromo, .spanImg, .produitContent .produitNote .produitAvis, .produitContent .produitPanier, .descAvis').removeClass('openDetail');

		$('.product'+classProd+' .spanImg').removeClass('col-xs-3').addClass('col-xs-12');	
		$('.product'+classProd+' .produitContent').removeClass('col-xs-9').addClass('col-xs-12');

		$('.product'+classProd+' .produitContent .produitNote, .product'+classProd+' .spanImg img, .product'+classProd+' .produitContent .produitPrix .produitRemise, .product'+classProd+' .produitContent .produitPrix .produitPrixBarre, .product'+classProd+' .produitContent .produitPrix .produitPrixTTC, .product'+classProd+' .produitContent .produitName, .product'+classProd+' .promTagBeacon .backgroundPromo, .product'+classProd+' .promTagBeacon .textPromo, .product'+classProd+' .spanImg, .product'+classProd+' .produitContent .produitNote .produitAvis, .product'+classProd+' .produitContent .produitPanier, .product'+classProd+' .descAvis').addClass('openDetail');

		var rayon = $scope.rayon;

		for (var product of rayon.products) {
			if (product != bProd) {
				product.avisShow.showDesc = false;
				product.descriptionShow.showDesc = false;
			}
		}

	}
}	


function Shower () {

	this.doShow = false;

	this.show = function () {
		if (!this.doShow) {
			$('#bodyMainContent').addClass('translateBody');
			$('#header, #ribbon').addClass('translateRibbonHeader');
			$('#menu-toggle-button').addClass('translateButtunToggleMenu');
			$('.calqueOpacite').addClass('calqueOpaciteBeacon');
			document.addEventListener('touchmove', stopScroll, false);
			$('body').addClass('noscroll');

			this.doShow = true;
		} else {
			$('#bodyMainContent, #header, #ribbon').removeClass('translateBody');

			window.setTimeout(function() {
				$('#header, #ribbon').removeClass('translateRibbonHeader');
				$('#menu-toggle-button').removeClass('translateButtunToggleMenu');
			}, 300);

			$('.calqueOpacite').removeClass('calqueOpaciteBeacon');
			document.removeEventListener('touchmove', stopScroll, false);
			$('body').removeClass('noscroll');

			this.doShow = false;
		}
	}
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

function stopScroll (e) {
	if(!$('#beacon').has($(e.target)).length)
		e.preventDefault(); 
}

});