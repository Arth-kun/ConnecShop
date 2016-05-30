'use strict';

angular.module('app.eCommerce')

.controller('products-detailController', function ($scope) {

    $('#ribbon').addClass('displayNone');
    $('#header').addClass('productsDetailHeader');

	var hashProduct = document.location.hash.split("/");
    var idProduct = parseInt(hashProduct[4]);
    var idCategory = hashProduct[3];

    //FOR REAL WEB SERVICE
    //ARTICLEDETAIL
    $.post( "http://localhost:3058/ConnecShopWS.asmx/GET_ArticleParID", { id: idProduct })
    .done(function(products) {

        for (var product of products) {

            product.imgs=[
                "styles/img/demo/e-comm/1.png",
                "styles/img/demo/e-comm/3.png",
                "styles/img/demo/e-comm/4.png"
            ];
            product.idPromo = 1;
            product.remise = true;
            product.pourcentage = -30;
            product.prixNonRemise = "900";
            product.PrixTTC = priceToString(product.PrixTTC);
             for (var avis of product.ListeAvis) {
                avis.DateCreation = dateReformate(avis.DateCreation);
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

            $scope.nbAvis = product.ListeAvis.length;
        }

        $scope.products = products;
    });

    $scope.menuTitle =[
        "Meilleures Ventes",
        "Promotions du Moment"
    ];

    getMenuByID(2);
    getMenuByID(0);
    getMenuByID(1);

    if (idCategory==='Accueil') {
    	$scope.category = idCategory;
    } else {
    	$scope.category = menuTitle[idCategory];
	}

    $scope.description = new Dispenser();
    $scope.avis = new Dispenser();


    $scope.addCart = function (product) {
    	angular.element($("#header #buttonsPullRight .controllerContainer")).scope().addCart(product);
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


    function getMenuByID (idMenu) {
        $.post( "http://localhost:3058/ConnecShopWS.asmx/GET_ListeCategorieParMenu", { menu : idMenu })
        .done(function(categories) {
            var menuTitle = [];
            for (var category of categories) {
                menuTitle.push(category.Theme);
            }
            $scope.menuTitle.push.apply(menuTitle);
        });
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