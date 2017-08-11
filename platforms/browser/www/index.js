document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    //var ref = cordova.InAppBrowser.open('01_Splash.html', '_self', 'location=no,zoom=no,enableviewportscale=yes');
    checkConnection();
	getDeviceProperty();
    console.log(navigator.camera);
}
function getDeviceProperty() {
    console.log("getDeviceProperty");
    var deviceOS = device.platform;  //fetch the device operating system
    var deviceOSVersion = device.version;  //fetch the device OS version
    var uuid = device.uuid;
    sessionStorage.setItem("OS", deviceOS);
    sessionStorage.setItem("UUID", uuid);
    console.log("Plataforma registrada " + device.platform);
}
function checkConnection() {
    console.log("checkConnection");
    var state = true;
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
    return state;
}
function registerLog(log){
    console.log(log);
}
function takePicture(){
  var options =   {   quality: 50,
                      allowEdit:true,
                      correctOrientation:true,
                      destinationType: Camera.DestinationType.DATA_URL,
                      sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Album
                      encodingType: 0     // 0=JPG 1=PNG
                  };    
    navigator.camera.getPicture(cameraSuccess, cameraError,options); 
}
function cameraSuccess(imageData){
    $(".responsive-img").attr("src","data:image/jpeg;base64," + imageData);
    $.ajax({
        type: "POST",
        url: "http://bankucolombia.com/lib/ajax_service_mobil.php",
        data: "action=updateUser&id_u="+localStorage.id_u+"&cellphone_u="+localStorage.cellphone_u+"&photo_u="+imageData,
        dataType:'JSON',
        success: function(msg){
            if(msg.status==200){                
                console.log("Imágen guardada exitosamente");
                localStorage.setItem("foto",imageData);
            }
        }
    });    
}
function cameraError(error){
    alert("Problemas Captura"+error);
}