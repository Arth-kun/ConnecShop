/* distanceCalculator
Enregistrement de la distance de chaque beacon en fonction du minor */
function distanceCalculator (beaconInfo) {
	//alert(JSON.stringify(beaconInfo));//LOG
	if (compt===20)
		compt=0;
	//Pobj beaconInfo.beacons
	for (var i in beaconInfo.beacons) {

		var beacon=beaconInfo.beacons[i];

		// On initialise chaque case beacon si elles n'existent pas
		if (!distanceManager[beacon.minor])
			distanceManager[beacon.minor]=[];
		distanceManager[beacon.minor][compt]=beacon.distance;
	}

	compt++;

	if (compt===2&&firstDetection) 
		firstDetection = false;
	
	if (!firstDetection) 
		return distanceCalculating();//Fint
	
}


/* distanceCalculator
Calcul du beacon le plus proche grâce aux données enregistrées sur 20 valeurs */
function distanceCalculating () {

	//Ivar
	var distanceTotal=[];//arr
	var distLen=[];//arr
	var distanceCompt=0;//int
	var distance=false;//bool
	var minor;//int
	//var dist;//LOG

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

			if (!distanceTotal[distanceCompt-1]){
				minor=i;
				//dist=distanceTotal[distanceCompt]/distLen[distanceCompt];//LOG
			}

			else if (distanceTotal[distanceCompt]/distLen[distanceCompt]<distanceTotal[distanceCompt-1]/distLen[distanceCompt-1]){
				minor=i;
				//dist=distanceTotal[distanceCompt]/distLen[distanceCompt];//LOG
			}

			distanceCompt++;
		}
	}
	//Décommenter pour afficher les infos intérèssantes
	//var date = new Date();
	//$('#content').append(compt+'  '+minor+'  '+dist+'<br>'+date.getSeconds()+', '+date.getMilliseconds()+'<br>');
	return parseInt(minor);
}