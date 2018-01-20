document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("pause", onPause, false);
document.addEventListener("resume", onResume, false);
alert("index.js");
function onDeviceReady() {
    alert("DeviceReady");
    getDeviceProperty();
    checkConnection();    
    initPushwoosh();
    if(localStorage.OS&&localStorage.OS!="browser"){    
      cordova.plugins.notification.badge;
    }   
}
  function getDeviceProperty() {
    alert("getDeviceProperty");
    localStorage.setItem("OS","browser");    
    if(device){
      var deviceOS = device.platform;  //fetch the device operating system
      var deviceOSVersion = device.version;  //fetch the device OS version
      var uuid = device.uuid;
      localStorage.setItem("OS", deviceOS);
      localStorage.setItem("UUID", uuid);
      //console.log("Plataforma registrada " + device.platform);
      //console.log("UUID " + uuid);
      if(localStorage.OS&&localStorage.OS!="browser"){
        initPushwoosh();
      }
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
    alert("checkConnection");
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

function initPushwoosh() {
  alert("initPushwoosh");
/*  var pushNotification = cordova.require("pushwoosh-cordova-plugin.PushNotification");
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
  ); */ 
}
function sendNotification(){
  if(localStorage.OS&&localStorage.OS!="browser"){
    cordova.plugins.notification.badge.set(1);
    cordova.plugins.notification.local.schedule({
        title: 'Notificacion BankU',
        text: 'Existe una nueva oferta de negociacion...',
        foreground: true
    });    
  }  
}
function registerLog(log){
  //console.log(log);
}