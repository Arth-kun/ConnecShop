'use strict';

angular.module('app.eCommerce')

.controller('products-detailController', function ($scope, $http) {

    $('#ribbon').addClass('displayNone');
    $('#header').addClass('productsDetailHeader');

	var hashProduct = document.location.hash.split("/");
    var idProduct = hashProduct[4];
    var idCategory = hashProduct[3];

    $http.get('http://ressource.octave.biz/ac01/connecshop/products/'+idProduct+'.json', { responseType: "json" })
    .success(function (product) {
    	$scope.product = product;
    	$scope.nbAvis = product.avisContent.length;
    });

    if (idCategory==='Accueil') {
    	$scope.category = idCategory;
    } else {
    	$scope.category = menuTitle[idCategory];
	}

    $scope.description = new Dispenser();
    $scope.avis = new Dispenser();
    $scope.addAvis = new Dispenser();


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

    $(document).ready(function () {

		$('.carousel, .promoTag').hammer().on("swipeleft", function(){
			$('.carousel').carousel('next');
		});

		$('.carousel, .promoTag').hammer().on("swiperight", function(){
			$('.carousel').carousel('prev');
		});
		
	});

});

var menuTitle = [
	"Meilleures Ventes",
	"Promotions du Moment",
	"Catégorie 1",
	"Catégorie 2",
	"Catégorie 3",
	"Catégorie 4",
	"Catégorie 5",
	"Catégorie 6",
	"Catégorie 7",
	"Catégorie 8",
	"Qui sommes nous ?",
	"CGV",
	"Nous contacter",
	"Mode Femme",
	"Nouvelle Collection"
	];