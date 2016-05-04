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
		$scope.rayon = rayon;

		for (var product of rayon.products) {
	    	product.descriptionShow = new Dispenser();
	    	product.avisShow = new Dispenser();
	    }
	});


	$scope.detailProduct = new Opener();

	function Opener () {
		this.close = true;

		this.open = function (classProd) {
			if (this.close==true) {

			 	addClassProd();

				this.close = false;
			} else {

				$('.spanImg').addClass('col-xs-3').removeClass('col-xs-12');	
			 	$('.produitContent').addClass('col-xs-9').removeClass('col-xs-12');

			 	$('.produitContent .produitNote, .spanImg img, .produitContent .produitPrix .produitRemise, .produitContent .produitPrix .produitPrixBarre, .produitContent .produitPrix .produitPrixTTC, .produitContent .produitName, .promTagBeacon .backgroundPromo, .promTagBeacon .textPromo, .spanImg, .produitContent .produitNote .produitAvis, .produitContent .produitPanier, .descAvis').removeClass('openDetail');

			 	addClassProd();

			}

			function addClassProd () {
				$('.product'+classProd+' .spanImg').removeClass('col-xs-3').addClass('col-xs-12');	
			 	$('.product'+classProd+' .produitContent').removeClass('col-xs-9').addClass('col-xs-12');

			 	$('.product'+classProd+' .produitContent .produitNote, .product'+classProd+' .spanImg img, .product'+classProd+' .produitContent .produitPrix .produitRemise, .product'+classProd+' .produitContent .produitPrix .produitPrixBarre, .product'+classProd+' .produitContent .produitPrix .produitPrixTTC, .product'+classProd+' .produitContent .produitName, .product'+classProd+' .promTagBeacon .backgroundPromo, .product'+classProd+' .promTagBeacon .textPromo, .product'+classProd+' .spanImg, .product'+classProd+' .produitContent .produitNote .produitAvis, .product'+classProd+' .produitContent .produitPanier, .product'+classProd+' .descAvis').addClass('openDetail');
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
				$('body').addClass('noscroll');

				this.doShow = true;
			} else {
				$('#bodyMainContent, #header, #ribbon').removeClass('translateBody');

				window.setTimeout(function() {
					$('#header, #ribbon').removeClass('translateRibbonHeader');
					$('#menu-toggle-button').removeClass('translateButtunToggleMenu');
				}, 300);

				$('.calqueOpacite').removeClass('calqueOpaciteBeacon');
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

});