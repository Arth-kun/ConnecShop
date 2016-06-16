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
        var requetePost = $.post( webServUrl+"GET_ArticleMeilleuresVentes");
    } else {
        var requetePost = $.post( webServUrl+"GET_ListeArticlesParCategorie", { categorie: idCategory });
    }

    requetePost
    .done(function(productsList) {

        if (productsList.length===1) {

            document.location.hash = '#/e-commerce/products-detail/'+idCategory+'/'+productsList[0].ID+'/2';
        
        } else {

            $scope.nbArticle = productsList.length;
            $scope.productsList = formateJson(productsList, 'list');
        
        }
    });


    $scope.goToDetail = function (id) {
      document.location.hash ='#/e-commerce/products-detail/'+idCategory+'/'+id+'/1';
    }

    function getMenuByID (idMenu) {
        $.post( webServUrl+"GET_ListeCategorieParMenu", { menu : idMenu })
        .done(function(categories) {

            for (var category of categories) {
                $scope.menuTitle[category.KeyTheme] = category.Theme;
            }
        });
    }


});