/* distanceCalculator
Enregistrement de la distance de chaque beacon en fonction du minor */
function distanceCalculator (beaconInfo) {

	if (compt===15)
		compt=0;

	//Pobj beaconInfo.beacons
	for (var i in beaconInfo.beacons) {

		var beacon=beaconInfo.beacons[i];

		// On initialise chaque case beacon si elles n'existent pas
		if (!distanceManager[beacon.minor])
			distanceManager[beacon.minor]=[];
		distanceManager[beacon.minor][compt]=beacon.distance;		
	}

	//Verif value minor update
	//Pobj distanceManager
	for (var i in distanceManager) {

		var here=false;//bool

		//Pobj beaconInfo.beacons
		for (var j in beaconInfo.beacons){
			if (i == beaconInfo.beacons[j].minor)
				here=true;
		}

		if (!here)
			distanceManager[i].splice(compt,1);
	}

	compt++;

	if (compt===3&&firstDetection) 
		firstDetection = false;
	
	if (!firstDetection) 
		return distanceCalculating();//Fint
	
}


/* distanceCalculator
Calcul du beacon le plus proche grâce aux données enregistrées sur 15 valeurs */
function distanceCalculating () {

	//Ivar
	var distanceTotal=[];//arr
	var distLen=[];//arr
	var distanceCompt=0;//int
	var distance=false;//bool
	var minor;//int

	var dist;//LOG
	var minors=[]//LOG

	//Pobj distanceManager
	for (var i in distanceManager) {
		var distances=distanceManager[i];
		if (distances.length>=5) {
			distance=true;//ce boolean sert juste dans le cas où aucun ne validerai la première condition afin de laisser 'exeption'
			exeption=false;
		} else if (!distance) {
			exeption=true;
		}
	}

	//Pobj distanceManager
	for (var i in distanceManager) {

		var distances=distanceManager[i];
		distanceTotal[distanceCompt]=0;

		if (distances.length>=5||exeption==true) {
			//Ptab distanceManager.distances
			for (var j in distances) {
				if (distances[j]!=null) {
					distanceTotal[distanceCompt]+=distances[j];
					distLen[distanceCompt]=distances.length;
				}

			}

			minors[distanceCompt]=i;

			if (!distanceTotal[distanceCompt-1]){
				minor=i;
				dist=distanceTotal[distanceCompt]/distLen[distanceCompt];//LOG
			}

			else if (distanceTotal[distanceCompt]/distLen[distanceCompt]<distanceTotal[distanceCompt-1]/distLen[distanceCompt-1]){
				minor=i;
				dist=distanceTotal[distanceCompt]/distLen[distanceCompt];//LOG
			}

			distanceCompt++;
		}
	}



	//Décommenter pour afficher les infos intérèssantes
	//LOG
	/*var date = new Date();
	$('#header, #ribbon, #menu-toggle-button').addClass('displayNone');
	$('body').prepend('<table class="dist table table-bordered"></table>');
	$('table:first-child').append('<tr><th>'+compt+'</th><th>'+date.getHours()+'h '+date.getMinutes()+'min '+date.getSeconds()+', '+date.getMilliseconds()+'s</th><th>ServiceActuel: '+nomRayon(minor)+'</th></tr>')
	for (var i in distanceTotal) {
		$('body table:first-child').append('<tr><td>'+minors[i]+'</td><td>DistMoy:'+distanceTotal[i]/distLen[i]+'<br>DistTotal:'+distanceTotal[i]+'<br>nbValDist:'+distLen[i]+'</td><td>'+nomRayon(minors[i])+'</td></tr>')
	}
	function nomRayon (minor) {
		switch (parseInt(minor)) {
			case 46204 :
				return 'Hotline';
			case 35520 :
				return 'Projets';
			case 8227 :
				return 'Privilèges';
			case 21493 :
				return 'Marketing';
			case 37996 :
				return 'Produit';
			case 45531 :
				return 'Web';
			case 9777 :
				return 'Infra';
			case 43737 :
				return 'Accueil';
			case 23810 :
				return 'Commercial';
		}
	}*/



	return parseInt(minor);
}