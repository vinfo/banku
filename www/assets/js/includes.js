$( document ).ready(function(){    
  var type_user= localStorage.type_user;    
  $( ".nav-descktop" ).load( "includes/menu_top_"+type_user+".html", function() {
    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false,
      hover: true,
      gutter: 0,
      belowOrigin: false,
      alignment: 'left',
      stopPropagation: false
    }
    );
  });
  $( ".nav-app" ).load( "includes/menu_left_"+type_user+".html", function() {
    $(".button-collapse").sideNav();
  });
  $( ".footer-nav" ).load( "includes/menu_footer_"+type_user+".html");
  $(".button-collapse").sideNav();
  $('select').material_select();
  $('.modal').modal();
  $( ".back" ).click(function() {
    window.history.back();
  });
  getUserData();  
})