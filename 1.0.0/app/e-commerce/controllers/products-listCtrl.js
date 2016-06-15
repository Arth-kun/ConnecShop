'use strict';

angular.module('app.eCommerce')

.controller('products-listController', function ($scope, $http) {

	var hashCategory = document.location.hash.split("/");
    var idCategory = hashCategory[3];
    $scope.idCategory = idCategory;

    $scope.menuTitle={
        "best":"Meilleures Ventes",
        "PROMOMOMENT":"Promotions du Moment"
    };

    getMenuByID(2);
    getMenuByID(0);
    getMenuByID(1);


    if (idCategory=='best') {
        var requetePost = $.post( "http://auth01-04.octavesaas04.fr/WSE_Beacon/ConnecShopWS.asmx/GET_ArticleMeilleuresVentes");
    } else {
        var requetePost = $.post( "http://auth01-04.octavesaas04.fr/WSE_Beacon/ConnecShopWS.asmx/GET_ListeArticlesParCategorie", { categorie: idCategory });
    }

    requetePost
    .done(function(productsList) {

        if(productsList.length===1) {
            document.location.hash = '#/e-commerce/products-detail/'+idCategory+'/'+productsList[0].ID+'/1';
        } else {

            for (var product of productsList) {


                if (product.Note===0)
                    product.hasNote = false;
                else
                    product.hasNote = true;

                product.img = "http://ac01.ow04.fr/I-Moyenne-"+product.IDImage+".net.jpg";
                
                if (product.Remise===0) {
                    product.hasRemise = false;
                    product.pourcentage = 0;
                    product.prixNonRemise = 0;
                    product.PrixTTC = priceToString(product.PrixTTC);
                } else {
                    product.hasRemise = true;
                    product.pourcentage = -product.Remise*100;
                    product.prixNonRemise = priceToString(product.PrixTTC);
                    product.PrixTTC = priceToString(product.PrixTTC-product.PrixTTC*product.Remise);
                }

            }

            $scope.productsList = productsList;
            $scope.nbArticle = productsList.length;
        }
    });


    $scope.goToDetail = function (id) {
      document.location.hash ='#/e-commerce/products-detail/'+idCategory+'/'+id+'/0';
    }

    function getMenuByID (idMenu) {
        $.post( "http://auth01-04.octavesaas04.fr/WSE_Beacon/ConnecShopWS.asmx/GET_ListeCategorieParMenu", { menu : idMenu })
        .done(function(categories) {

            for (var category of categories) {
                $scope.menuTitle[category.KeyTheme] = category.Theme;
            }
        });
    }


});