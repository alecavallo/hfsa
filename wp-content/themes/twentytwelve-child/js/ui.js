//jQuery.noConflict();
function maximize(){
    jQuery('div#floatbox').show();
    jQuery('body').css('overflow','hidden');
    var floatbox = jQuery("div#floatbox-content");
    var mp = map.getDiv();
    var lastCenter = map.getCenter(); 
    var dirs = directionsDisplay.getPanel();
    floatbox.append(mp);
    floatbox.append(dirs);
    maximizeElm = map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].removeAt(0);
    google.maps.event.trigger(map,'resize');
    map.setCenter(lastCenter);
}
function minimize(){
    map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(maximizeElm);
    var mp = map.getDiv();
    var lastCenter = map.getCenter(); 
    var dirDiv = directionsDisplay.getPanel();
    jQuery("div#direction").append(mp);
    jQuery("div#direction").append(dirDiv);

    jQuery('div#floatbox').hide();
    jQuery('body').css('overflow','scroll');
    google.maps.event.trigger(map,'resize');
    map.setCenter(lastCenter);
} 

jQuery(document).ready(function(){ 
    jQuery("ul.nav-menu > li.menu-item > a").click(function(evt){
        var element = jQuery(this).parent();
       //console.log(element.attr('class').split(' ')[0]);
       if(jQuery(element).hasClass('hovered')){
           jQuery(element).children('ul').animate({height:'0px'},200,function(){
               jQuery(element).children('ul').hide();
               jQuery(element).removeClass('hovered');
               jQuery(element).children('ul').removeClass('hovered');
           });
           jQuery('div#page').animate({top:'0px'},{ duration: 200, queue: false });
           
           return true;
       }
       jQuery('ul.nav-menu > li.menu-item').removeClass('hovered');
       var submenuDeployed = jQuery('ul.nav-menu > li.menu-item > ul').length > 0;
       jQuery('ul.nav-menu > li.menu-item > ul').removeClass('hovered');
       jQuery('ul.nav-menu > li.menu-item > ul').hide();
       jQuery('ul.nav-menu > li.menu-item > ul').css('height','0px');
       jQuery(element).addClass('hovered');
       jQuery(element).children('ul').addClass('hovered');
       
       //console.log(jQuery('li.menu-item > ul.submenu.hovered').length);
       
        jQuery(element).children('ul').show();
        if(submenuDeployed == true){
            if(jQuery("html").hasClass('gt-1024')){
                jQuery(element).children('ul').animate({height:'170px'},{ duration: 100, queue: false });
            }else{
                jQuery(element).children('ul').animate({height:'155px'},{ duration: 100, queue: false });
            }
            jQuery(element).children('ul > li').animate({opacity:'0.99'},{ duration: 100, queue: false });
            if(jQuery(element).children('ul').length > 0 ){
                jQuery('div#page').animate({top:'130px'},{ duration: 100, queue: false });
            }
        }else{
            if(jQuery("html").hasClass('gt-1024')){
                jQuery(element).children('ul').animate({height:'170px'},{ duration: 400, queue: false });
            }else{
                jQuery(element).children('ul').animate({height:'155px'},{ duration: 400, queue: false });
            }
            jQuery(element).children('ul > li').animate({opacity:'0.99'},{ duration: 400, queue: false });
            if(jQuery(element).children('ul').length > 0 ){
               jQuery('div#page').animate({top:'130px'},{ duration: 400, queue: false });
           }
        }
        
        
       
    });
});



//JQUERY JCARROUSEL NOTICIAS EN PORTADA
(function($) {
    $(function() {
        $(".jcarousel").jcarousel({
            list: '.list-container',
            items: '.item',
            animation: 'slow',
            transitions: true,
            wrap: 'both',
            vertical: true,
            size: 3,
            transitions: true

        });

        $('.jcarousel').jcarouselAutoscroll({
            target: '+=1',
            interval: 2000,
            autostart: true
        });
    });
})(jQuery);


//COMO ENCONTRARNOS
var map;
var directionsDisplay;
jQuery(document).ready(function(){
      
      
      var directionsService = new google.maps.DirectionsService();
      var maximizeElm;
      function initialize() {
        directionsDisplay = new google.maps.DirectionsRenderer();
        var myLatlng = new google.maps.LatLng(-31.6928035,-60.7970717);
        var mapOptions = {
          scrollwheel: false,
          center: myLatlng,
          zoom: 13,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          streetViewControl: false
        };
        map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
            
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'HerFasa - Fábrica y oficinas comerciales'
        });
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('directions-panel'));
        
        function calcRoute(start) {
            //var start = document.getElementById('addr').text;
            var request = {
              origin: start,
              destination: myLatlng,
              travelMode: google.maps.TravelMode.DRIVING
            };
            directionsService.route(request, function(response, status) {
              if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                jQuery('div#directions-panel').css('display','block');
              }
            });
          }
        
        
        
        
        /*autocomplete addr*/
        var input = document.getElementById('addr');
        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);
        
        google.maps.event.addListener(autocomplete, 'place_changed', function() {

        var place = autocomplete.getPlace();
        
        if (!place.geometry) {
          return;
        }
        calcRoute(place.geometry.location)
      });
      
        var control = document.getElementById('addr');
        var maximize = document.getElementById('max');
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
        map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(maximize);
        google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
            control.style.display = 'block';
            maximize.style.display = 'block';
        });
        
      }
      jQuery(window).load(function(){
          initialize();
      });
      
      
});
/*myAud=document.getElementById("background");
myAud.preload="auto";
myAud.volume=0.07;*/


