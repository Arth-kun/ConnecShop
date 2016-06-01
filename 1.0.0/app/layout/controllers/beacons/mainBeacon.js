var store = false;

// var distanceBeacon.js
var distanceManager = {};
var compt = 0;
var firstDetection = true;//bool
var exeption = true;//bool

// var affichage beacon
var sameId;
var newRayon = false;

var beaconApp = (function()
{
    // Application object.
    var beaconApp = {};

    // Dictionary of beacons.
    var beacons = {};


    beaconApp.initialize = function()
    {
        document.addEventListener(
            'deviceready',
            function() { evothings.scriptsLoaded(onDeviceReady) },
            false);
    }

    function onDeviceReady()
    {
        // Start tracking beacons!
        startScan();
    }

    function startScan()
    {   
        function onBeaconsRanged(beaconInfo)
        {
            // On v�rifie si le beacons est trouv�
            if (beaconInfo.beacons[0] != undefined) {

                //var minorChoosen = 37996;
                var minorChoosen = distanceCalculator(beaconInfo);
                
                if (minorChoosen!=undefined) {
                    var idChoosen = productChooser(minorChoosen);

                    if ((sameId==undefined)||((sameId!=idChoosen)&&(!angular.element($("#beacon")).scope().showBeacon.doShow))) {
                        //alert(sameId+''+idChoosen);//LOG
                        angular.element($("#beacon")).scope().selectRayon(idChoosen);
                        window.navigator.vibrate([600, 300, 600]);

                        if (document.location.hash==='#/home')
                            angular.element($("#beacon")).scope().showBeacon.show();
                        else
                            newRayon = true;
                        
                        sameId=idChoosen;
                    }
                }


                if (!store) {//store init tout en haut pour re-use dans noLayout.add
                    $('#beacon').removeClass('displayNone');
                    $.prompt('Bienvenue dans le magasin !', {top: '20%'});
                    store = true;
                }
            }
            else if (store) {
                $.prompt('Vous �tes sortie du magasin.', {top: '20%'});
                angular.element($("#beacon")).scope().showBeacon.show();
                $('#beacon').addClass('displayNone');
                store = false;
            }
        }


        function onError(errorMessage)
        {
            alert('Ranging beacons did fail: ' + errorMessage);
        }

        function beaconShow () {
            //alert(sameId+''+idChoosen);
            angular.element($("#beacon")).scope().selectRayon(idChoosen);
            if (document.location.hash==='#/home')
                angular.element($("#beacon")).scope().showBeacon.show();
            sameId=idChoosen;
        }

        // Request permission from user to access location info.
        // This is needed on iOS 8.
        estimote.beacons.requestAlwaysAuthorization();

        // Start ranging beacons.
        // Le scan se fait syst�matiquement et renvoie toujours true
        // M�me si il ne trouve pas le bon Beacon
        estimote.beacons.startRangingBeaconsInRegion(
            {
                identifier: 'Octave',
                uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
                major: 200
            }, 
            onBeaconsRanged,
            onError);
    }

    return beaconApp;
})();

beaconApp.initialize();