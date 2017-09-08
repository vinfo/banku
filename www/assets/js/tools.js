$( document ).ready(function(){    
    localStorage.setItem("site_url","http://localhost:6002");
    var type_user= localStorage.type_user;
    if(type_user=="prestatario"){
        $(".inversionista").remove();
        $(".msg-action").html("prestar");
    }else{
        $(".prestatario").remove();
        $(".msg-action").html("invertir");
    }

    $('select').material_select();
    $('.modal').modal();
    $( ".back" ).click(function() {
      window.history.back();
    });
    $( "body" ).on( "click", ".close-session", function() {
      localStorage.clear();
      window.location.href = "02_Login.html";
      //navigator.app.exitApp();
    });   
    var section= getUrlParameter("section");
    setTimeout(function(){ $("."+section).addClass('active'); }, 200);
})

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

//Solo numeros y puntos
function fMatch(field){
    field.value = field.value.replace(/[^0-9-.]/g, "");
}
//Solo numeros
function fMatch2(field){
    field.value = field.value.replace(/[^0-9]/g, "");
}
//Solo letras y numeros
function fMatch3(field){
    field.value = field.value.replace(/[^A-Z-a-z-0-9_ -.]/g, "");
}
//reemplazar format money
function rplMoney(str) {    
    return str.replace(/[^0-9]/g, "");
}
//reemplazar format percent
function rplPerc(str) {    
    return str.replace(/[^0-9-.]/g, "");
}
function parImpar(valor){
    var valor=parseInt(valor);
    var tipo=(valor%2)?"Impar":"Par";
    return tipo;
}
function spanishDate(d){
    var weekday=["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
    var monthname=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    return weekday[d.getDay()]+" "+d.getDate()+" de "+monthname[d.getMonth()]+" de "+d.getFullYear();
}
function getStates(){
	var sel="";
	$('#state_u').children('option:not(:first)').remove();
	$.ajax({
		type: "POST",
		url: "http://bankucolombia.com/lib/ajax_service_mobil.php",
		data: "action=getStates",
		dataType:'JSON',
		success: function(msg){			
			if(msg.status&&msg.data){
                var options='';				
				$.each(msg.data, function( index, value ) {
					options+='<option value="'+value.id_state+'">'+value.name_state+'</option>';
				});
                $('#state_u').html(options);
                $('#state_u').material_select();
			}
		}
	}); 	
}
function getCities(sel=''){    
    $('#city_u').children('option:not(:first)').remove();
    var state_u="";
    if($('#state_u').val()!="")state_u=$('#state_u').val();
    $.ajax({
        type: "POST",
        url: "http://bankucolombia.com/lib/ajax_service_mobil.php",
        data: "action=getCities&state_u="+state_u,
        dataType:'JSON',
        success: function(msg){         
            if(msg.status&&msg.data){
                var options='';             
                $.each(msg.data, function( index, value ) {
                    var selected="";
                    if(sel==value.id_city)selected="selected";
                    options+='<option value="'+value.id_city+'" '+selected+'>'+value.name_city+'</option>';
                });
                $('#city_u').html(options);
                $('#city_u').material_select();
            }
        }
    });     
}
function editValue(campo,valor){
    $.ajax({
        type: "POST",
        url: "http://bankucolombia.com/lib/ajax_service_mobil.php",
        data: "action=editValue&id_u="+localStorage.id_u+"&campo="+campo+"&valor="+valor,
        dataType:'JSON',
        success: function(msg){            
        }
    });     
}
function setOfferTemp(id_ofert,inv,prest,interest,duration){
    $.ajax({
        type: "POST",
        url: "http://bankucolombia.com/lib/ajax_service_mobil.php",
        data: "action=setOfferTemp&id_ofert="+id_ofert+"&inv="+inv+"&prest="+prest+"&interest="+interest+"&duration="+duration,
        dataType:'JSON',
        success: function(msg){
        }
    });
    return true;    
}
function getOffersTemp(id_ofert,inv,prest){
    $.ajax({
        type: "POST",
        url: "http://bankucolombia.com/lib/ajax_service_mobil.php",
        data: "action=getOffersTemp&id_ofert="+id_ofert+"&inv="+inv+"&prest="+prest,
        dataType:'JSON',
        success: function(msg){
            var chat='';
            var cont= 0;
            $.each(msg.data, function( index, value ) {
                var cls='bubble-rigth left';
                var photo='';
                if(inv==localStorage.id_u){
                  cls='bubble-left right';
                  if(localStorage.photo&&localStorage.photo!="")photo='<a href="#!user" class="avatar-nego"><img class="circle photo" src="data:image/jpeg;base64,' + decodeURIComponent(localStorage.photo)+'"></a>';                  
                  chat += '<div class="'+cls+'">'+photo+'<div class="info-nego"><h5>'+value.inversionista+'</h5><p>Interés (%) E.M.: <strong>'+value.interest+'</strong><br>Plazo: <strong>'+value.duration+'</strong></p> </div> <div class="date-buble">'+value.date.substr(0,16)+'</div></div>';
                }else{
                  chat += '<div class="'+cls+'"><div class="info-nego"><h5>'+value.prest+'</h5><p>Interés (%) E.M.: <strong>'+value.interest+'</strong><br>Plazo: <strong>'+value.duration+'</strong></p> </div> <div class="date-buble">'+value.date.substr(0,16)+'</div></div>';
                }
                if(value.status=="1"){
                    chat +='<div class="bubble-rigth left"><a href="#!user" class="avatar-nego"><img class="circle" src="assets/images/avatarUser.jpg"></a><div class="info-nego"><h5 class="user-prestatario"></h5>  <h3>Acepto tu oferta!!!</h3></div> <div class="date-buble">4m</div></div>';
                    $(".btn-nego,.btn-aceptar").hide();
                }
                cont++;
            });
            $(".chat").append(chat);
        }
    });
    return true;    
}
function sessionRedirect(){
    if(!localStorage.id_u)window.location.href = "02_Login.html";    
}
function calcCuota(monto,interes,duracion){ 
    var interes = interes/100;
    var cuota= (interes * Math.pow(interes+1,duracion))*monto;
    var cuota2= Math.pow(interes+1,duracion)-1;
    var total= Math.round(cuota/cuota2);
    $(".cuota").html(numeral(total).format('0,0'));
    return total;
}
function getStarts(value){ 
    var starts='';
    for(var i=0;i<value;i++){
        starts+='<i class="material-icons yellow-text text-accent-4">star_border</i>';
    }
    if(value<5){
        for(var j=0;j<(5 - value);j++){
            starts+='<i class="material-icons">star_border</i>';
        }
    }
    return starts;
}

var getUserData= function getUserData(){
    numeral.register('locale', 'es', {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'm',
            billion: 'b',
            trillion: 't'
        },
        ordinal : function (number) {
            return number === 1 ? 'er' : 'ème';
        },
        currency: {
            symbol: '$'
        }
    });
    numeral.locale('es');    
    if(localStorage.id_u!=""&&localStorage.type_user!=""){
        if(localStorage.type_user=="prestatario")$(".prestatario").show();
        if(localStorage.type_user=="inversionista")$(".inversionista").show();
        $.ajax({
            type: "POST",
            url: "http://bankucolombia.com/lib/ajax_service_mobil.php",
            data: "action=getUserData&id_u="+localStorage.id_u+"&type_user="+localStorage.type_user,
            dataType:'JSON',
            beforeSend: function( xhr ) {
                $(".wrapper").hide();
            },            
            success: function(msg){
                //console.log(JSON.stringify(msg));
                if(msg.status==200&&msg.data){                    
                    var photo="assets/images/avatarUser.jpg";
                    if(msg.data.photo_u!=null&&msg.data.photo_u!=""){
                        photo="data:image/jpeg;base64," + msg.data.photo_u;
                        localStorage.setItem("photo", msg.data.photo_u);
                    }
                    $(".photo").attr("src",photo);
                    $(".user").html(msg.data.user_u);
                    $(".names").html(msg.data.names_u+" "+msg.data.lastnames_u);
                    $(".city").html(msg.data.city_u);
                    $(".occupation").html(msg.data.occupation_u);
                    $(".phone").html(msg.data.phone_u);
                    $(".cellphone").html(msg.data.cellphone_u);
                    $(".address").html(msg.data.address_u);
                    $(".costs").html(msg.data.costs);

                    localStorage.setItem("costs", msg.data.costs);
                    localStorage.setItem("mount1", msg.data.mount1);
                    localStorage.setItem("mount2", msg.data.mount2);
                    localStorage.setItem("interes1", msg.data.interes1);
                    localStorage.setItem("interes2", msg.data.interes2);
                    localStorage.setItem("duration1", msg.data.duration1);
                    localStorage.setItem("duration2", msg.data.duration2);                                        
                    localStorage.setItem("status_u", msg.data.status_u); 
                    var bank="";
                    if(msg.data.banktype_u!=""&&msg.data.banktype_u!=null)bank+= msg.data.banktype_u;
                    if(msg.data.bank_u!=""&&msg.data.bank_u!=null)bank+= ", "+msg.data.bank_u;
                    if(msg.data.account_u!=""&&msg.data.account_u!=null)bank+= " "+msg.data.account_u;
                    $(".bank").html(bank); 
                    var f= msg.data.date_2_u.split("-");
                    var lastLogin= new Date(f[0],f[1]-1,f[2]);
                    $(".lastLogin").html(spanishDate(lastLogin));                  
                                       
                    $(".status").html(msg.data.status);
                    if(msg.data.status_u!="0")$(".msg1").hide();
                    $("#bar").css("width",msg.data.percent+"%");
                    $(".percent").html(msg.data.percent+"%");
                    if(msg.data.percent<100){
                        $(".msg_perfil").removeClass('grey-text').addClass("red-text").html("Tú perfil esta incompleto. Completa tú perfil para poder acceder a todos los servicios.");                                   
                    }
                    localStorage.setItem("percent",msg.data.percent);
                    var starts='';
                    for(var i=0;i<5;i++){
                        if(i < msg.data.calification2_u){
                            starts+='<i class="material-icons yellow-text text-accent-4">star_border</i>';
                        }else{
                            starts+='<i class="material-icons">star_border</i>';
                        }                        
                    }
                    $(".star-user").html(starts);
                    $(".monto").html(numeral(msg.data.amount_u).format('0,0'));
                    $(".amount").html(numeral(msg.data.amount).format('0,0'));
                    $(".saldo-inversionista").html(numeral(msg.data.saldo).format('0,0'));                    
                    $(".days_study").html(msg.data.days_study);
                    $(".wrapper").show();
                    $(".progress").hide();
					if(msg.data.approved_u=="0")$('#info2').modal('open');                                      
                    //console.log("Datos usuario");
                }
            }
        });         
    }    
}
var getFullUserData= function getFullUserData(){
    if(localStorage.id_u!=""&&localStorage.type_user!=""){
        if(localStorage.type_user=="prestatario")$(".prestatario").show();
        $.ajax({
            type: "POST",
            url: "http://bankucolombia.com/lib/ajax_service_mobil.php",
            data: "action=getFullUserData&id_u="+localStorage.id_u,
            dataType:'JSON',
            beforeSend: function( xhr ) {
                $(".wrapper").hide();
            },             
            success: function(msg){
                if(msg.status==200&&msg.data){
                    $.each(msg.data, function( index, value ) {                      
                      if(index=="photo_u"&&value!=""){
                        $(".photo").attr("src","data:image/jpeg;base64," + decodeURIComponent(value));
                        localStorage.setItem("photo",value);
                      }
                      if($("#"+index).length>0||$("."+index).length>0){                          
                          var text= $("#"+index).is('input:text');
                          var tel= $("#"+index).is('[type=tel]');
                          var number= $("#"+index).is('[type=number]');
                          var password= $("#"+index).is('input:password');
                          var select= $("#"+index).is('select');
                          var checkbox= $("#"+index).is('input:checkbox');
						              var hidden= $("#H"+index).is('input:hidden');

                          if($("."+index).length>0){
                            $("."+index).html(value);
                          }                           
                          
                          if(text||tel||number){                            
                            if($("#"+index).hasClass('money')){
                                $("#"+index).val(numeral(value).format('0,0'));
                            }else{
                                $("#"+index).val(value);
                            }
                          }
                          if(hidden){			  
                            $("#H"+index).val(value);
                          }							  
                          if(password){
                            if(index=="password_u"){
                                $("#"+index).val(value);
                                $("#"+index+"2").val(value);
                            }
                          }                          
                          if(select){
                            if(index=="city_u")getCities(value);
                            $('#'+index+' option[value='+value+']').attr('selected','selected');
                            $('#'+index).material_select();                            
                          }
                         if(checkbox){
                            if(value==1){
                              $("#"+index).prop('checked', true);
                            }
                         }
                      }                    
                    });
                    console.log("Datos usuario");
                }
                $(".wrapper").show();
                $(".progress").hide();                 
            }
        });         
    }    
}