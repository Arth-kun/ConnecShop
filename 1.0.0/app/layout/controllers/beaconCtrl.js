'use strict';

angular.module('app.beacon', ['ui.router'])

.controller('beaconController', function ($scope, $http) {

	$scope.showBeacon = new Shower();

	$('#beacon').hammer().on("swiperight", function(){
		if ($scope.showBeacon.doShow) {
			$scope.showBeacon.show();
		}
	});

	$('#beacon .paddingFleche').hammer().on("swipeleft", function(){
		if (!$scope.showBeacon.doShow) {
			$scope.showBeacon.show();
		}
	});

	//var idRayon = 'RAYON1';//Test PC
	
	$scope.selectRayon = function (idRayon) {

		if (idRayon!=undefined) {

			//FOR REAL WEB SERVICE
			$.post( webServUrl+"GET_ListeArticlesParRayon", { rayon: idRayon })
  			.done(function(rayon) {

				for (var product of rayon) {

					product.descriptionShow = new Dispenser();
					product.avisShow = new Dispenser();
					product.detailProduct = new Opener();
					
				}

				$scope.nomRayon = rayon[0].Theme;
				$scope.rayon = formateJson(rayon, 'beacon');
			});

		}
	}

	$scope.conseils = [{
		"id":0,
		"titre":"Bien choisir son rouge à lèvres !",
		"img":"styles/img/demo/e-comm/2.png",
		"apercu":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore."
	}];


	$scope.addCart = function (product) {
    	angular.element($("#header #buttonsPullRight .controllerContainer")).scope().addCart(product);
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

			for (var product of rayon) {
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