document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    //var ref = cordova.InAppBrowser.open('01_Splash.html', '_self', 'location=no,zoom=no,enableviewportscale=yes');
    checkConnection();    
	  getDeviceProperty();
    setBadge(value);
    schedule;
}
function getDeviceProperty() {
    console.log("getDeviceProperty");
    cordova.plugins.notification.badge;
    var deviceOS = device.platform;  //fetch the device operating system
    var deviceOSVersion = device.version;  //fetch the device OS version
    var uuid = device.uuid;
    sessionStorage.setItem("OS", deviceOS);
    sessionStorage.setItem("UUID", uuid);
    console.log("Plataforma registrada " + device.platform);
    console.log("UUID " + uuid);
    //cordova.plugins.notification.badge.configure({ autoClear: true });     
}
function checkConnection() {
    console.log("checkConnection");
    var state = true;
    if(sessionStorage.OS){        
        var networkState = navigator.connection.type;
        var states = {};
        states[Connection.UNKNOWN] = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI] = 'WiFi connection';
        states[Connection.CELL_2G] = 'Cell 2G connection';
        states[Connection.CELL_3G] = 'Cell 3G connection';
        states[Connection.CELL_4G] = 'Cell 4G connection';
        states[Connection.CELL] = 'Cell generic connection';
        states[Connection.NONE] = 'No network connection';
        
        if (states[networkState] == 'No network connection') {
                alert('Problemas de conectividad a Internet!');
                state = false;
        }
    }
    return state;
}
function setBadge(value){
    alert("Badge");
    cordova.plugins.notification.badge.set(value);      
}
function registerLog(log){
    console.log(log);
}
schedule = function () {
  cordova.plugins.notification.local.schedule({
    id: 1,
    text: 'Test Message 1',
    icon: 'http://3.bp.blogspot.com/-Qdsy-GpempY/UU_BN9LTqSI/AAAAAAAAAMA/LkwLW2yNBJ4/s1600/supersu.png',
    smallIcon: 'res://cordova',
    sound: null,
    badge: 1,
    data: { test: id }
  });
};