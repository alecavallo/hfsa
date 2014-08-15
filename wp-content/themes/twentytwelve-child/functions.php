<?php

function load_jquery(){
    wp_enqueue_script('jquery',"/site/wp-includes/js/jquery/jquery.js");
}
    
    add_action( 'wp_enqueue_scripts', 'load_jquery' );
    

function md_nmi_custom_content( $content, $item_id, $original_content ) {
$content = $content . '<span class="page-title">' . $original_content . '</span>';

return $content;
}
add_filter( 'nmi_menu_item_content', 'md_nmi_custom_content', 10, 3 );

function load_google_maps_api(){
        wp_enqueue_script('googlemaps',"http://maps.googleapis.com/maps/api/js?key=AIzaSyC6F8c6pkU5QWaV7yPV-EH4gRNifoWjMKg&sensor=true&libraries=places",array('jquery'));
}
add_action( 'wp_enqueue_scripts', 'load_google_maps_api' );

function load_jcarousel(){
    wp_enqueue_script('jcarousel',dirname(get_stylesheet_uri())."/js/jquery.jcarousel.min.js",array('jquery'));
}
add_action( 'wp_enqueue_scripts', 'load_jcarousel' );

function load_ui_js_loader(){
    wp_enqueue_script('ui.js',dirname(get_stylesheet_uri())."/js/ui.js",array('jquery','jcarousel', 'googlemaps'));
}
add_action( 'wp_enqueue_scripts', 'load_ui_js_loader' );


function tabbed_img_links_shortcode($atts){
    remove_filter( 'the_content', 'wpautop' );
    $a = shortcode_atts(array(
        'href'=>"javascript:void(0)",
        'img'=>"img/empty.png",
        'text'=>""
    ), $atts);
    if(empty($a['href'])){
        $a['href']="javascript:void(0)";
    }
    $html = "<a href=\"{$a['href']}\" class=\"pepe\"> <div class=\"article-listing\"> <img src=\"{$a['img']}\"/> <h4>{$a['text']}</h4> </div> </a>";
    return "<div class=\"matrix-container\">".$html."</div>";
}
add_shortcode( 'tabbed_img_links', 'tabbed_img_links_shortcode' );

function remove_wpautop_widgetblocks_init() {
	remove_filter( 'ww_content', 'wpautop' );
}
add_action( 'init', 'remove_wpautop_widgetblocks_init', 12 );


/*ADDING BUTTONS TO THE EDITOR*/
