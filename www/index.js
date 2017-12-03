document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("pause", onPause, false);
document.addEventListener("resume", onResume, false);
function onDeviceReady() {    
    checkConnection();    
    getDeviceProperty();
    initPushwoosh();
    cordova.plugins.notification.badge;      
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
    initPushwoosh();
  }
  function onPause() {
      localStorage.setItem("login","true");
  }
  function onResume() {
      cordova.plugins.notification.badge.clear();
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

  function initPushwoosh() {
   var pushNotification = cordova.require("pushwoosh-cordova-plugin.PushNotification");
  // Initialize Pushwoosh. This will trigger all pending push notifications on start.
  pushNotification.onDeviceReady({
    appid: "4B708-1B8C1",
    projectid: "928675299174"
  });

  pushNotification.registerDevice(
    function(status) {
      var pushToken = status.pushToken;
      localStorage.setItem("pushtoken",pushToken);            
      },
      function(status) {
        // handle registration error here
      }
  );  
}
function sendNotification(){
  cordova.plugins.notification.badge.set(1);
}
function registerLog(log){
  console.log(log);
}