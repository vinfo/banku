document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("pause", onPause, false);
document.addEventListener("resume", onResume, false);

function onDeviceReady() {    
 getDeviceProperty();
 checkConnection();    
 if(localStorage.OS&&localStorage.OS!="browser"){    
  cordova.plugins.notification.badge;
}   
}
function getDeviceProperty() {
    //console.log("getDeviceProperty");
    localStorage.setItem("OS", "browser");
    if(device){
      var deviceOS = device.platform;  //fetch the device operating system
      var deviceOSVersion = device.version;  //fetch the device OS version
      var uuid = device.uuid;
      localStorage.setItem("OS", deviceOS);
      localStorage.setItem("UUID", uuid);
    }
  }
  function onPause() {
    localStorage.setItem("login","true");
    if(localStorage.OS&&localStorage.OS!="browser")cordova.plugins.notification.badge.clear();
      //console.log("Pausa");
    }
    function onResume() {
      if(localStorage.OS&&localStorage.OS!="browser"){
        cordova.plugins.notification.badge.configure({ autoClear: true });
        cordova.plugins.notification.badge.clear();
      //console.log("Resumen");
    }
  }  
  function checkConnection() {
    //console.log("checkConnection");
    var state = true;    
    if(localStorage.OS&&localStorage.OS!="browser"){        
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
  function sendNotification(subject){
    if(localStorage.OS&&localStorage.OS!="browser"){
      cordova.plugins.notification.badge.set(1);
      cordova.plugins.notification.local.schedule({
        title: subject,
        text: 'Existe una nueva oferta de negociacion...',
        foreground: true
      });    
    } 
  }