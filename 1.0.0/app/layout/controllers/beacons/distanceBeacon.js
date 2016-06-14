// var distanceBeacon.js
var array = [];
var maxValues = 20;
var minValues = 5
var moyennes = [];
var minor;

/* distanceCalculator
Enregistrement de la distance de chaque beacon en fonction du minor */
function distanceCalculator (beaconInfo) {

	//beaconInfo.beacons[0].name
    //beaconInfo.beacons[0].proximity
    //beaconInfo.beacons[0].distance
    //$("body").html(beaconInfo.beacons[0].name + " - " + beaconInfo.beacons[0].proximity + "<br/>" + beaconInfo.beacons[0].distance);

    array = decalVal(array);
    moyennes = decalVal(moyennes);

    for (var index = 0; index < beaconInfo.beacons.length; index++) {
    	var beacon = beaconInfo.beacons[index];



        //beacon.name
        //beacon.minor

        //create if not exists
        if (!array[beacon.minor]) {
        	array[beacon.minor] = [];
        	for (var i = 0; i < maxValues; i++) {
        		array[beacon.minor][i] = -1;
        	}
        }



        array[beacon.minor][0] = beacon.distance;
    }


    var allowed = false;

    for (var key in array) {


    	var total = 0;
    	var count = 0;
    	for (var i = 0; i < maxValues; i++) {
    		if (array[key][i] != -1) {
    			total = total + array[key][i];
    			count = count + 1;
    		}
    	}


    	if (!moyennes[key]) {
        	moyennes[key] = [];
        	for (var i = 0; i < maxValues; i++) {
        		moyennes[key][i] = 1000;
        	}
        }


    	if (count > minValues)
    		moyennes[key][0] = total / count;
    	else
    		moyennes[key][0] = 1000;

    }



    //$("body").html(JSON.stringify(beaconInfo.beacons[0]));
    //$('#header, #ribbon, #menu-toggle-button, #beacon').addClass('displayNone');
    //$("body").html("");


    if (sortBy(moyennes, 0, true) === sortBy(moyennes, 1, true) && sortBy(moyennes, 0) === sortBy(moyennes, 2, true) && sortBy(moyennes, 2) === sortBy(moyennes, 3, true))
		minor = sortBy(moyennes, 0);
	
	//$("body").append(nomRayon(minor));
	return parseInt(minor);
	

}


function decalVal (array) {
	//decalage des valeurs
    for (var key in array) {
      	for (var i = maxValues - 1; i > 0; i--) {
            array[key][i] = array[key][i - 1];
        }
        array[key][0] = -1;
    }
    return array;
}


function sortBy (array, x, debug) {
	var tuples = [];

    for (var key in array)
    	tuples.push([key, array[key][x]]);

    tuples.sort(function(a, b) {
    	a = a[1];
    	b = b[1];

    	return a < b ? -1 : (a > b ? 1 : 0);
    });

    for (var i = 0; i < tuples.length; i++) {
    	var key = tuples[i][0];
    	var value = tuples[i][1];

        // do something with key and value

        //if (debug)
        //	$("body").append(x + " " + nomRayon(key) + " - " + value + "<br/>");
    }

    return tuples[0][0];
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
}