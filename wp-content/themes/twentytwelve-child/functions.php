<?php
function load_jquery(){
    wp_enqueue_script('jquery',"/wp-includes/js/jquery/jquery.js");
}
    
    add_action( 'wp_enqueue_scripts', 'load_jquery' );

function md_nmi_custom_content( $content, $item_id, $original_content ) {
$content = $content . '<span class="page-title">' . $original_content . '</span>';

return $content;
}
add_filter( 'nmi_menu_item_content', 'md_nmi_custom_content', 10, 3 );

function load_ui_js_loader(){
    wp_enqueue_script('ui.js',dirname(get_stylesheet_uri())."/js/ui.js",array('jquery'));
}
add_action( 'wp_enqueue_scripts', 'load_ui_js_loader' );
?>