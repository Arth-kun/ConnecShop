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

	//var idRayon = 'RAYON1';//Test PC
	
	$scope.selectRayon = function (idRayon) {

		if (idRayon!=undefined) {

			//FOR REAL WEB SERVICE
			$.post( "http://auth01-04.octavesaas04.fr/WSE_Beacon/ConnecShopWS.asmx/GET_ListeArticlesParRayon", { rayon: idRayon })
  			.done(function(rayon) {

				for (var product of rayon) {
					product.imgs=["http://ac01.ow04.fr/I-Moyenne-"+product.IDImage+".net.jpg"
		            ];
		            for (var image of product.ImagesSecondaires) {
		                product.imgs.push("http://ac01.ow04.fr/I-Moyenne-"+image+".net.jpg");
		            }

		            for (var avis of product.ListeAvis) {
		                avis.DateCreation = dateReformate(avis.DateCreation);
		                //var commentaireHTML = '<b>'+avis.Commentaire+'</b>';
		                avis.Commentaire = $('<textarea />').html(avis.Commentaire).text(); // Ne fonctionne pas sans raison apparente !
		            }

		            if (product.ListeAvis.length>0)
		                product.avis = true;   
		            else
		                product.avis = false;
		            
		            product.CatHTMLDesignation = $('<textarea />').html(product.CatHTMLDesignation).text(); // Alors que celui ci marche très bien !
		            if (product.CatHTMLDesignation==="")
		                product.description = false;
		            else
		                product.description = true;

		            if (product.Note===0)
		                product.hasNote = false;
		            else
		                product.hasNote = true;

		            if (product.Remise===0) {
		                product.hasRemise = false;
		                product.idPromo = 0;
		                product.pourcentage = 0;
		                product.prixNonRemise = 0;
		                product.PrixTTC = priceToString(product.PrixTTC);
		            } else {
		                product.hasRemise = true;
		                product.idPromo = 2;
		                product.pourcentage = -product.Remise*100;
		                product.prixNonRemise = priceToString(product.PrixTTC);
		                product.PrixTTC = priceToString(product.PrixTTC-product.PrixTTC*product.Remise);
		            }


					product.descriptionShow = new Dispenser();
					product.avisShow = new Dispenser();
					product.detailProduct = new Opener();

					$scope.nomRayon = product.Theme;
				}

				$scope.rayon = rayon;
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