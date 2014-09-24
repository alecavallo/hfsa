<?php
/**
 * Plugin Name: Rotating Images
 * Plugin URI: http://URI_Of_Page_Describing_Plugin_and_Updates
 * Description: Creates an image which will rotate in mouse over
 * Version: 0.1
 * Author: Alejandro Cavallo
 * Author URI: http://URI_Of_The_Plugin_Author
 * License: GPL2
 */
defined('ABSPATH') or die("No script kiddies please!");
//TABBED IMAGE BUTTON
add_action('admin_head', 'rotating_img_btn');
function rotating_img_btn() {
    global $typenow;
    // check user permissions
    if ( !current_user_can('edit_posts') && !current_user_can('edit_pages') ) {
   	return;
    }
    // verify the post type
    if( ! in_array( $typenow, array( 'post', 'page' ) ) )
        return;
	// check if WYSIWYG is enabled
	if ( get_user_option('rich_editing') == 'true') {
		add_filter("mce_external_plugins", "rotating_img_plugin");
		add_filter('mce_buttons', 'register_rotating_img_btn');
	}
}

function rotating_img_plugin($plugin_array) {
   	$plugin_array['rotating_img_btn'] = plugins_url( '/js/rotating_img-button.js', __FILE__ ); // CHANGE THE BUTTON SCRIPT HERE
   	return $plugin_array;
}
//echo plugins_url('/tabbed-image-button/js/tabbed-img-button.js', __FILE__ );

function register_rotating_img_btn($buttons) {
   array_push($buttons, "rotating_img_btn");
   return $buttons;
}

function rotating_img_css() {
	wp_enqueue_style('rotating_img_css', plugins_url('/style.css', __FILE__));
}

add_action('admin_enqueue_scripts', 'rotating_img_css');


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
background: radial-gradient(#e0e0e0, #f7eeee);
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