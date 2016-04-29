'use strict';

angular.module('app.beacon', ['ui.router'])

.controller('beaconController', function ($scope, $http) {

	$scope.showBeacon = new Shower();

	$http.get('http://ressource.octave.biz/ac01/connecshop/productsbeacon/0.json', { responseType: "json" })
    .success(function (rayon) {
		$scope.rayon = rayon;
		$scope.nbAvis = rayon.products.avisContent.length;
	});

	function Shower () {
		
		this.doShow = false;

		this.show = function () {
			if (!this.doShow) {
				$('#bodyMainContent').addClass('translateBody');
				$('#header, #ribbon').addClass('translateRibbonHeader');
				$('.calqueOpacite').addClass('calqueOpaciteBeacon');
				$('body').addClass('noscroll');
				this.doShow = true;
			} else {
				$('#bodyMainContent, #header, #ribbon').removeClass('translateBody');
				$('#header, #ribbon').removeClass('translateRibbonHeader');
				$('.calqueOpacite').removeClass('calqueOpaciteBeacon');
				$('body').removeClass('noscroll');
				this.doShow = false;	
			}
		}
	}

});