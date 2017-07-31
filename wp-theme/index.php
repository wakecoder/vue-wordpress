<?php get_header(); ?>
    <main role="main">
        <div id="app">
            <?php 
               // For SEO, post pages use progressive enhancement. Content is originally displayed
                // with very little formatting intially. Once the vue.js framework is loaded, the 
                // content is 'prettified' ?>
            <?php while (have_posts()) : the_post(); ?>
                <div id="content" class="no-fouc">
                    <article class="article">
                        <?php the_title( '<h1>', '</h1>' ); ?>
                        <?php if(has_post_thumbnail()):?>
                            <?php $image = wp_get_attachment_image_src( get_post_thumbnail_id(), 'parent_thumb'); ?>
                            <div>
                                <img class="unstyled" class="alignleft" src="<?php echo $image[0]; ?>" alt="<?php the_title();?>" >
                            </div>
                        <?php endif; ?>
                    <?php the_content();?>
                 </article>
              </div>
            <?php endwhile; ?>   
        </div>         
    </main>
    <?php get_footer(); ?>
