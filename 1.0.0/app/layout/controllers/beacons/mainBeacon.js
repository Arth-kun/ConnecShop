// var affichage beacon
var store = false;
var sameId;
var newRayon = false;

var beaconApp = (function()
{
    // Application object.
    var beaconApp = {};


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

            // On vérifie si le beacons est trouvé
            if (beaconInfo.beacons[0] != undefined) {

                var minorChoosen = distanceCalculator(beaconInfo);
                
                if (minorChoosen!=undefined&&minorChoosen!=NaN) {
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

                    } else if ((sameId==undefined)||(sameId!=idChoosen)) {

                        window.navigator.vibrate([600, 300, 600]);
                    }

                }


                if (!store) {//store init tout en haut pour re-use dans noLayout.add
                    $('#beacon').removeClass('displayNone');
                    //$.prompt('Bienvenue dans le magasin !', {top: '20%'});
                    store = true;
                }
            }
            else if (store) {
                //$.prompt('Vous êtes sortie du magasin.', {top: '20%'});
                if (angular.element($("#beacon")).scope().showBeacon.doShow)
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

        function onMonitoringSuccess(regionState)
        {
            $("body").html(regionState.state);
            setTimeout(function() {
                $("body").html("")
            }, 800);
        }

        // Request permission from user to access location info.
        // This is needed on iOS 8.
        estimote.beacons.requestAlwaysAuthorization();

        // Start ranging beacons.
        // Le scan se fait systématiquement et renvoie toujours true
        // Même si il ne trouve pas le bon Beacon
        estimote.beacons.startRangingBeaconsInRegion(
        {
            identifier: 'Octave',
            uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
            major: 200
                //minor: 37996
            }, 
            onBeaconsRanged,
            onError);
        }

        return beaconApp;
    })();

    beaconApp.initialize();