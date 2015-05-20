<?php
/**
 * Template Name: page-with-related-posts
 * Description: páginas con 3 columnas una pequeña para los post relacionados, una prinicpal para el contenido y una secundaria para widgets
 */

get_header(); ?>

	<div id="primary" class="site-content shadowed-box herfasa-main-column">
            <div id="related-pages">
                <?php echo do_shortcode('[crp]');?>
            </div>
		<div id="content" class="narrow-content" role="main">

			<?php while ( have_posts() ) : the_post(); ?>
				<?php get_template_part( 'content', 'page' ); ?>
				<?php comments_template( '', true ); ?>
			<?php endwhile; // end of the loop. ?>

		</div><!-- #content -->
	</div><!-- #primary -->

<?php
    get_sidebar(); 
?>
<?php get_footer(); ?>