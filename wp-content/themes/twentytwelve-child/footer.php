<?php
/**
 * The template for displaying the footer
 *
 * Contains footer content and the closing of the #main and #page div elements.
 *
 * @package WordPress
 * @subpackage Twenty_Twelve
 * @since Twenty Twelve 1.0
 */
?>
	</div><!-- #main .wrapper -->
	
</div><!-- #page -->
<footer id="colophon" role="contentinfo">
    <div class="site-info">
            <?php /*do_action( 'twentytwelve_credits' ); ?>
            <a href="<?php echo esc_url( __( 'http://wordpress.org/', 'twentytwelve' ) ); ?>" title="<?php esc_attr_e( 'Semantic Personal Publishing Platform', 'twentytwelve' ); ?>"><?php printf( __( 'Proudly powered by %s', 'twentytwelve' ), 'WordPress' ); ?></a>*/?>
            <?php wp_footer(); ?>
    </div><!-- .site-info -->
</footer><!-- #colophon -->
<div id="floatbox" class="overlay">
    <div id="floatbox-container">
        <div id="floatbox-controls">
            <span><a href="javascript:minimize();">X</a></span>
        </div>
        <div id="floatbox-content"></div>
    </div>
</div>


</body>
</html>