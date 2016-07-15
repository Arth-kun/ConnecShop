'use strict';

angular.module('app.account')

.controller('AccountController'/*majuscule obligatoire quand on défini le ctrl dans module.js*/, function ($scope) {


$scope.menu = 0;
var menuReference;
var menuReferencePassword;

$scope.day = 31;
$scope.mois = 12;
$scope.annee = 117;

if (sessionStorage.getItem('fiche')) {
	$scope.logged = true;
	$scope.fiche = JSON.parse(sessionStorage.getItem('fiche'));
} else {
	$scope.logged = false;
	$scope.fiche = "";
}


$scope.getNumber = function (num) {
	return new Array(num);
}

$scope.valid = function (login, password) {

	$.post( webServUrl+"GET_FicheParLogin", { webLogin: login, webPassword : password })
  	.done(function(fiche) {

  		if (fiche=="") {

  			$.prompt("Mauvais identifiant ou mot de passe, réessayez !");
  		
  		} else {

  			$scope.logged = true;
  			$scope.fiche = fiche[0];
  			sessionStorage.setItem('fiche', JSON.stringify(fiche[0]));
  		
  		}

  	});
}

$scope.keypress = function (login, password, event) {

	if (event.which === 13){
		$scope.valid(login, password);	
	}

}

$scope.disconect = function () {

	$scope.logged = false;
	sessionStorage.removeItem('fiche');

}

$scope.goToMenu = function (id, idFiche) {

	var webServ;

	$scope.menu = id;

	switch (id) {
		case "1":
			getToInfoPerso(idFiche);

		case "2":
			getToChangePassword(idFiche);

		case "3":
			getToInfoFidelite(idFiche);
	}

	
}

$scope.goBack = function (menu) {

	if (menu === 0)
		history.back();
	else
		$scope.menu = 0;
}

$scope.modifyFiche = function () {

	var menuDetail = $scope.menuDetail;

	if(JSON.stringify(menuDetail) != JSON.stringify(menuReference)) {
		
  		var menuChange = {};
  		

		if (menuDetail.EMail === menuDetail.confirmEMail) {

			menuChange.EMail = menuDetail.EMail;
			menuChange.WebLogin = menuDetail.EMail;

		} else {

			menuChange.EMail = menuReference.EMail;
			menuChange.WebLogin = menuReference.WebLogin;

		}

		menuChange.DateNaissanceString = menuDetail.annee + menuDetail.mois + menuDetail.jour

		for (var key in menuDetail) {

			if (key != "EMail" && key != "confirmEMail" && key != "WebLogin" && key != "jour" && key != "mois" && key != "annee")
				menuChange[key] = menuDetail[key];

		}

		$.post( webServUrl + "UPDATE_FicheParIDFiche", { idFiche : menuChange.ID, WebLogin: menuChange.WebLogin, EMail : menuChange.EMail, Prenom : menuChange.Prenom, NomFamille : menuChange.NomFamille, DateNaissanceString : menuChange.DateNaissanceString, Adresse2 : menuChange.Adresse2, Adresse0 : menuChange.Adresse0, Adresse1 : menuChange.Adresse1, Adresse3 : menuChange.Adresse3, CodePostal : menuChange.CodePostal, Ville : menuChange.Ville, Pays : menuChange.Pays, Telephone : menuChange.Telephone, Mobile : menuChange.Mobile, AutoriseContactMail : menuChange.AutoriseContactMail })
  		.done(function(fiche) {

  			menuReference = JSON.parse(JSON.stringify(menuDetail));
  			$.prompt('Modification effectuée !');

  		});

	} else {

		$.prompt('Aucun changement détecté.');

	}

}

$scope.modifyPassword = function (menuDetail) {

	if(menuDetail.webPasswordActuel === menuReferencePassword.WebPassword) {
		
		if (menuDetail.newWebPassword == menuDetail.confirmNewWebPassword) {
			$.post( webServUrl + "UPDATE_PasswordParIDFiche", { idFiche : menuReferencePassword.ID, WebPassword: menuDetail.newWebPassword })
	  		.done(function(fiche) {

	  			menuReferencePassword = JSON.parse(JSON.stringify(menuDetail));

	  			$.prompt('Modification effectuée !');

	  			$scope.goBack($scope.menu);

	  		});

	  	} else {

	  		$.prompt('Les deux mots de passes sont différents !');

	  	}

	} else {

		$.prompt('Mauvais mot de passe !');
		
	}

}


$scope.menusAccount = [{
	"message" : "Informations personnelles",
	"id" : "1" 
},{
	"message" : "Changer le mot de passe",
	"id" : "2"
},{
	"message" : "Points fidélité",
	"id" : "3"
}];



$scope.goToAccount = function () {

	document.location.hash='#/account';

}


function getToInfoPerso (idFiche) {

	$.post( webServUrl + "GET_FicheParIDFiche", { IDFiche : idFiche })
  	.done(function(fiche) {

  		fiche.annee = fiche.DateNaissanceString.substr(0,4);
  		fiche.mois = fiche.DateNaissanceString.substr(4,2);
  		fiche.jour = fiche.DateNaissanceString.substr(6,2);

  		fiche.confirmEMail = fiche.EMail;

  		$scope.menuDetail = fiche;

  		menuReference = JSON.parse(JSON.stringify(fiche));

  	});

}

function getToChangePassword (idFiche) {

	$.post( webServUrl + "GET_PasswordParIDFiche", { IDFiche : idFiche })
  	.done(function(fiche) {

  		$scope.menuDetail;

  		menuReferencePassword = JSON.parse(JSON.stringify(fiche));

  	});

}

function getToInfoFidelite (idFiche) {

	$.post( webServUrl + "GET_FideliteParIDFiche", { idFiche : idFiche })
	.done(function(fiche) {

		$scope.ptFidelite = fiche.NbPoints;

		if (fiche.NbPoints == 0)
			$scope.hasPoint = false;
		else
			$scope.hasPoint = true;

	});

}

});