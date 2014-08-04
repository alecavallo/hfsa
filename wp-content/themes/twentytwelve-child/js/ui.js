//jQuery.noConflict();
jQuery(document).ready(function(){
    /*jQuery('ul.nav-menu > li.menu-item').on('mouseenter mouseleave', function(e) {
        var parentA = jQuery(this);
        console.log(parentA.attr('class'));
        jQuery(parentA).toggleClass("hovered");
    });*/
    
    /*jQuery('html.lt-1280 nav div.menu').hover(function(){
        var submenu = jQuery('div.submenu',this);
        if(typeof submenu.html() !== 'undefined'){
            var rightSidePos = (jQuery(window).width() - (jQuery(submenu).offset().left + jQuery(submenu).outerWidth()));
            if(rightSidePos < 0){
                jQuery(submenu).css({
                    'right':'0px',
                    'left': 'auto'
                });
                //console.log('Changed to: '+(jQuery(window).width() - (jQuery(submenu).offset().left + jQuery(submenu).outerWidth())));
            }

        }
    });*/
    
    jQuery("ul.nav-menu > li.menu-item > a").click(function(evt){
        var element = jQuery(this).parent();
       //console.log(element.attr('class').split(' ')[0]);
       if(jQuery(element).hasClass('hovered')){
           jQuery(element).children('ul').animate({height:'0px'},200,function(){
               jQuery(element).children('ul').hide();
               jQuery(element).removeClass('hovered');
               jQuery(element).children('ul').removeClass('hovered');
           });
           
           return true;
       }
       jQuery('ul.nav-menu > li.menu-item').removeClass('hovered');
       var submenuDeployed = jQuery('ul.nav-menu > li.menu-item > ul').length > 0;
       jQuery('ul.nav-menu > li.menu-item > ul').removeClass('hovered');
       jQuery('ul.nav-menu > li.menu-item > ul').hide();
       jQuery('ul.nav-menu > li.menu-item > ul').css('height','0px');
       jQuery(element).addClass('hovered');
       jQuery(element).children('ul').addClass('hovered');
       
       console.log(jQuery('li.menu-item > ul.submenu.hovered').length);
       
        jQuery(element).children('ul').show();
        if(submenuDeployed == true){
            jQuery(element).children('ul').animate({height:'170px'},{ duration: 100, queue: false });
            jQuery(element).children('ul > li').animate({opacity:'0.99'},{ duration: 100, queue: false });
        }else{
            jQuery(element).children('ul').animate({height:'170px'},{ duration: 400, queue: false });
            jQuery(element).children('ul > li').animate({opacity:'0.99'},{ duration: 400, queue: false });
        }
        
        
       
    });
});
/*myAud=document.getElementById("background");
myAud.preload="auto";
myAud.volume=0.07;*/


