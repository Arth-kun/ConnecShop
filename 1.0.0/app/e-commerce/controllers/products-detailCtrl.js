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
    $.post( "http://auth01-04.octavesaas04.fr/WSE_Beacon/ConnecShopWS.asmx/GET_ArticleParID", { id: idProduct })
    .done(function(products) {

        for (var product of products) {

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
                product.idPromo = 1;
                product.pourcentage = -product.Remise*100;
                product.prixNonRemise = priceToString(product.PrixTTC);
                product.PrixTTC = priceToString(product.PrixTTC-product.PrixTTC*product.Remise);
            }

            $scope.nbAvis = product.ListeAvis.length;
        }

        $scope.products = products;
    });

    $scope.menuTitle={
        "best":"Meilleures Ventes",
        "PROMOMOMENT":"Promotions du Moment"
    };

    getMenuByID(2);
    getMenuByID(0);
    getMenuByID(1);


    $scope.description = new Dispenser();
    $scope.avis = new Dispenser();


    $scope.category = function () {
        if (idCategory==='Accueil') {
            return idCategory;
        } else {
            return $scope.menuTitle[idCategory];
        }
    }

    $scope.goBack = function () {
        if (hashProduct[5])
            history.go(-2);
        else
            history.back();
    }


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
        $.post( "http://auth01-04.octavesaas04.fr/WSE_Beacon/ConnecShopWS.asmx/GET_ListeCategorieParMenu", { menu : idMenu })
        .done(function(categories) {

            for (var category of categories) {
                $scope.menuTitle[category.KeyTheme] = category.Theme;
            }
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