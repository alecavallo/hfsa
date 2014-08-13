<?php
/**
 * Template Name: Carrousel-Main-Sidebar
 * Description: Muestra una seccion de carrousel de ancho completo y 2 columnas para el contenido el sidebar
 */

get_header(); ?>

	<div id="primary" class="site-content shadowed-box herasa-main-column">
		<div id="content" role="main">

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