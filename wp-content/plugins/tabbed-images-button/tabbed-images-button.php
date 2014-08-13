<?php
/**
 * Plugin Name: Tabbed images button
 * Plugin URI: http://URI_Of_Page_Describing_Plugin_and_Updates
 * Description: Creates a link to a page in form of a button
 * Version: 0.1
 * Author: Alejandro Cavallo
 * Author URI: http://URI_Of_The_Plugin_Author
 * License: GPL2
 */
defined('ABSPATH') or die("No script kiddies please!");
//TABBED IMAGE BUTTON
add_action('admin_head', 'tabbed_img_btn');
function tabbed_img_btn() {
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
		add_filter("mce_external_plugins", "tabbed_img_btn_plugin");
		add_filter('mce_buttons', 'register_tabbed_img_btn');
	}
}

function tabbed_img_btn_plugin($plugin_array) {
   	$plugin_array['tabbed_img_btn'] = plugins_url( '/js/tabbed-img-button.js', __FILE__ ); // CHANGE THE BUTTON SCRIPT HERE
   	return $plugin_array;
}
//echo plugins_url('/tabbed-image-button/js/tabbed-img-button.js', __FILE__ );

function register_tabbed_img_btn($buttons) {
   array_push($buttons, "tabbed_img_btn");
   return $buttons;
}

function tabbed_img_btn_css() {
	wp_enqueue_style('tabbed_img_btn_css', plugins_url('/style.css', __FILE__));
}

add_action('admin_enqueue_scripts', 'tabbed_img_btn_css');