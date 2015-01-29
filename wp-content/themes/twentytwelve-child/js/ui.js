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
           jQuery('footer#colophon').animate({top:'0px'},{ duration: 200, queue: false });
           
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
                jQuery('footer#colophon').animate({top:'130px'},{ duration: 100, queue: false });
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
               jQuery('footer#colophon').animate({top:'130px'},{ duration: 400, queue: false });
           }
        }
        
        
       
    });
    
    var menuItemWidth = jQuery('html.gt-1024 body header#masthead nav.main-navigation ul li ul.sub-menu li').width();
    var menuItemHeight = jQuery('html.gt-1024 body header#masthead nav.main-navigation ul li ul.sub-menu li').height();
    var menuItemLeftMargin = parseInt(jQuery('html.gt-1024 body header#masthead nav.main-navigation ul li ul.sub-menu li').css('marginLeft'));
    var menuItemRightMargin = parseInt(jQuery('html.gt-1024 body header#masthead nav.main-navigation ul li ul.sub-menu li').css('marginRight'));
    var menuItemNewMargin = menuItemLeftMargin-(120-menuItemWidth)/2;
    console.log(menuItemNewMargin);
    
    jQuery('html.gt-1024 body header#masthead nav.main-navigation ul li ul.sub-menu li').hover(function(){
        jQuery(this).animate({
            width:120,
            height:154,
            marginLeft: menuItemNewMargin+'px',
            marginRight: menuItemNewMargin+'px'
        },"fast");
    },function(){
        jQuery(this).animate({
            width:menuItemWidth,
            height:menuItemHeight,
            marginLeft: menuItemLeftMargin+'px',
            marginRight: menuItemRightMargin+'px'
        },"fast");
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
            interval: 4000,
            autostart: true
        });
    });
})(jQuery);


//COMO ENCONTRARNOS
var map;
var directionsDisplay;
jQuery(document).ready(function(){
    
    var schemeMilitary = [
        {
            "featureType": "all",
            "elementType": "all",
            "stylers": [
                {
                    "invert_lightness": true
                },
                {
                    "saturation": -80
                },
                {
                    "lightness": 30
                },
                {
                    "gamma": 0.5
                },
                {
                    "hue": "#3d433a"
                }
            ]
        }
    ];
    var schemeShadesOfGrey = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]}];
    var schemeNeutralBlue = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#193341"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#2c5a71"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#29768a"},{"lightness":-37}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#406d80"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#406d80"}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#3e606f"},{"weight":2},{"gamma":0.84}]},{"elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"weight":0.6},{"color":"#1a3541"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#2c5a71"}]}];
    var schemeBrownie = [{"stylers":[{"hue":"#ff8800"},{"gamma":0.4}]}];
    var schemeHintsOfGold = [{"featureType":"water","elementType":"all","stylers":[{"hue":"#252525"},{"saturation":-100},{"lightness":-81},{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"hue":"#666666"},{"saturation":-100},{"lightness":-55},{"visibility":"on"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"hue":"#555555"},{"saturation":-100},{"lightness":-57},{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"hue":"#777777"},{"saturation":-100},{"lightness":-6},{"visibility":"on"}]},{"featureType":"administrative","elementType":"all","stylers":[{"hue":"#cc9900"},{"saturation":100},{"lightness":-22},{"visibility":"on"}]},{"featureType":"transit","elementType":"all","stylers":[{"hue":"#444444"},{"saturation":0},{"lightness":-64},{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"hue":"#555555"},{"saturation":-100},{"lightness":-57},{"visibility":"off"}]}];
    var schemeBrightDesert = [{"featureType":"landscape","stylers":[{"saturation":-7},{"gamma":1.02},{"hue":"#ffc300"},{"lightness":-10}]},{"featureType":"road.highway","stylers":[{"hue":"#ffaa00"},{"saturation":-45},{"gamma":1},{"lightness":-4}]},{"featureType":"road.arterial","stylers":[{"hue":"#ffaa00"},{"lightness":-10},{"saturation":64},{"gamma":0.9}]},{"featureType":"road.local","stylers":[{"lightness":-5},{"hue":"#00f6ff"},{"saturation":-40},{"gamma":0.75}]},{"featureType":"poi","stylers":[{"saturation":-30},{"lightness":11},{"gamma":0.5},{"hue":"#ff8000"}]},{"featureType":"water","stylers":[{"hue":"#0077ff"},{"gamma":1.25},{"saturation":-22},{"lightness":-31}]}];
    var schemeSubtleGrayscale = [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}];
    var style = schemeHintsOfGold;
      
      
      var directionsService = new google.maps.DirectionsService();
      var maximizeElm;
      function initialize() {
        directionsDisplay = new google.maps.DirectionsRenderer();
        var myLatlng = new google.maps.LatLng(-31.6928035,-60.7970717);
        var mapOptions = {
          scrollwheel: false,
          center: myLatlng,
          zoom: 7,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          streetViewControl: false,
          styles: style
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

/**************************CONTROLAR BLOQUES MOSAICOS DE AVERTURAS********************************************/
jQuery(window).load(function(){
   jQuery('div.matrix-container div.article-listing').each(function(index,value){
      var image = jQuery(value).find('img');
      var imageWidth = jQuery(image).width();
      var imageHeight = jQuery(image).height();
      if(imageWidth > imageHeight){
          jQuery(image).width('100px');
          jQuery(image).height('auto');
      }else{
          jQuery(image).width('auto');
          jQuery(image).height('100px');
      }
   });
   
   var maxHeight=0;
   jQuery('div.matrix-container div.article-listing').each(function(index,value){
       if(jQuery(value).height() > maxHeight){ //calculo el tamaño máximo que va a tener el mosaico
           maxHeight = jQuery(value).height();
       }
   });
   jQuery('div.matrix-container div.article-listing').height(maxHeight); //seteo el máximo tamaño de mosaico
});
/************************************************************************************************************/