cd C:\Users\ac01.octave\Desktop\ConnecShop\1.0.0\

xcopy build C:\Users\ac01.octave\Desktop\ConnecShop_cordova\www\build /R /Y
xcopy styles\css C:\Users\ac01.octave\Desktop\ConnecShop_cordova\www\styles\css /R /Y
xcopy index.html C:\Users\ac01.octave\Desktop\ConnecShop_cordova\www /F /Y

cd C:\Users\ac01.octave\Desktop\ConnecShop_cordova
cordova run android