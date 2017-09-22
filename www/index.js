document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    //var ref = cordova.InAppBrowser.open('01_Splash.html', '_self', 'location=no,zoom=no,enableviewportscale=yes');
    checkConnection();    
	  getDeviceProperty();
    cordova.plugins.notification.badge;
    cordova.plugins.notification.local.on('click', function (notification) {
        alert(notification.id+JSON.stringify(notification.data));
    }, this);    
}
function getDeviceProperty() {
    console.log("getDeviceProperty");    
    var deviceOS = device.platform;  //fetch the device operating system
    var deviceOSVersion = device.version;  //fetch the device OS version
    var uuid = device.uuid;
    sessionStorage.setItem("OS", deviceOS);
    sessionStorage.setItem("UUID", uuid);
    console.log("Plataforma registrada " + device.platform);
    console.log("UUID " + uuid);
    setBadge(10);
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
    cordova.plugins.notification.badge;
    cordova.plugins.notification.badge.set(value);
    send_notification();   
}
function registerLog(log){
    console.log(log);
}
function send_notification() {
  alert("Notification");
  cordova.plugins.notification.local.schedule({
    id: 1,
    text: 'Nuevo mensaje de negociación',
    icon: 'http://bankucolombia.com/images/logoMobil.png',
    smallIcon: 'res://cordova',
    sound: null,
    badge: 1,
    data: { test: 123 }
  });
};