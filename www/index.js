document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    //var ref = cordova.InAppBrowser.open('01_Splash.html', '_self', 'location=no,zoom=no,enableviewportscale=yes');
    checkConnection();    
	  getDeviceProperty();
    cordova.plugins.notification.badge;
    cordova.plugins.notification.local.on('click', function (notification) {
        window.location.replace(notification.data.page);
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
}
function send_notification(page,uuid){
  alert("Notification");
  var beep='.mp3';
  if(sessionStorage.OS!="Android"){
    beep='.caf';
  }
  //if(uuid==sessionStorage.UUID){
    if(sessionStorage.UUID&&1==1){    
      navigator.vibrate([1200]);
      cordova.plugins.notification.local.schedule({
        id: 1,
        text: 'Nuevo mensaje negociación',
        icon: 'http://bankucolombia.com/images/logoMobil.png',
        sound: 'file://beep'+beep,
        badge: 1,
        data: { page: page }
      });
  }
}
function registerLog(log){
    console.log(log);
}