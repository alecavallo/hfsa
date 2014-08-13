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

function rotate_image($atts){
    $a = shortcode_atts(array(
        'front_img'=>"javascript:void(0)",
        'back_img'=>"img/empty.png",
    ), $atts);
    if(empty($a['front_img'])|| empty($a['back_img'])){
        return "";
    }
    ob_start();
?>
    <div class="rotate-container">
        <div class="door-front"></div>
        <div class="door-back"></div>
    </div>
<style>
article section div.rotate-container{
/* How pronounced should the 3D effects be */
perspective: 800px;
-webkit-perspective: 800px;
background: radial-gradient(#e0e0e0, #aaa);
width: 220px;
height: 380px;
/* margin: 0 auto; */
border-radius: 6px;
position: relative;
float: right;
margin: 5px 15px
}
article section div.rotate-container div.door-front, article section div.rotate-container div.door-back{
/* Enable 3D transforms */
transform-style: preserve-3d;
-webkit-transform-style: preserve-3d;

/* We are using two separate divs for the front and back of the
   phone. This will hide the divs when they are flipped, so that the
   opposite side can be seen:  */

backface-visibility: hidden;
-webkit-backface-visibility: hidden;

width:200px;
height:333px;

position:absolute;
top:50%;
left:50%;
margin:-166px 0 0 -100px;

background:url(<?= $a['front_img']?>) no-repeat left center;

/* Animate the transitions */
transition:0.8s;
}
article section div.rotate-container div.door-back{

/* The back side is flipped 180 deg by default */
transform:rotateY(180deg);
-webkit-transform:rotateY(180deg);

background-image: url(<?= $a['back_img']?>);
}
article section div.rotate-container:hover div.door-front{
/* When the container is hovered, flip the front side and hide it .. */
transform:rotateY(180deg);
-webkit-transform:rotateY(180deg);
}

article section div.rotate-container:hover div.door-back{
/* .. at the same time flip the back side into visibility */
transform:rotateY(360deg);
-webkit-transform:rotateY(360deg);
}
</style>
<?php
    return ob_get_clean();
}
add_shortcode( 'rotate_image', 'rotate_image' );

function remove_wpautop_widgetblocks_init() {
	remove_filter( 'ww_content', 'wpautop' );
}
add_action( 'init', 'remove_wpautop_widgetblocks_init', 12 );