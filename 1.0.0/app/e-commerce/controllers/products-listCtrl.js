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
        var requetePost = $.post( "http://localhost:3058/ConnecShopWS.asmx/GET_ArticleMeilleuresVentes");
    } else {
        var requetePost = $.post( "http://localhost:3058/ConnecShopWS.asmx/GET_ListeArticlesParCategorie", { categorie: idCategory });
    }

    requetePost
    .done(function(productsList) {

        for (var product of productsList) {
            product.remise = true;
            product.pourcentage = -30;
            product.prixNonRemise = '900';

            if (product.Note===0)
                product.hasNote = false;
            else
                product.hasNote = true;

            product.img = "http://ac01.ow04.fr/I-Moyenne-"+product.IDImage+".net.jpg";
            product.PrixTTC = priceToString(product.PrixTTC);
        }

        $scope.productsList = productsList;
        $scope.nbArticle = productsList.length;
    });


    $scope.goToDetail = function (id) {
      document.location.hash ='#/e-commerce/products-detail/'+idCategory+'/'+id;
    }

    function getMenuByID (idMenu) {
        $.post( "http://localhost:3058/ConnecShopWS.asmx/GET_ListeCategorieParMenu", { menu : idMenu })
        .done(function(categories) {

            for (var category of categories) {
                $scope.menuTitle[category.KeyTheme] = category.Theme;
            }
        });
    }


});