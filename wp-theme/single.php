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
                            <?php $image = wp_get_attachment_image_src( get_post_thumbnail_id(), 'full'); ?>
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
    <script type="text/javascript">
        <?php
            //NOTE: The following is specific to single-post pages. This data is injected into the
            //page using the same class as the loader used for REST-API access in the vue app.
            //This makes loading from REST and loading directly from the loop look identical to
            //vue.js
            //NOTE: If vue.js tries to use the loader to pull in additional pages, it will fail!
            //The url should be set and the loader class updated to address this when it is needed.
            $title = json_encode (apply_filters ('the_title', get_the_title()));
            $imgSrc = '';
            if (has_post_thumbnail()) {
                $imgSrc = wp_get_attachment_image_src( get_post_thumbnail_id(), 'full')[0];
            };
            echo "window.server={
                route: {
                    title: " . $title  .",
                    componentName: 'singlePost',
                    dataLoaded: true
                },
                loaders: {
                    postLoader: {
                        url: '',
                        pages: [
                            {
                                loaded: true,
                                content: [
                                    {
                                        title: " . $title . ",
                                        content: " . json_encode(apply_filters('the_content', get_the_content())) . ",
                                        imgSrcLarge: " . json_encode ($imgSrc) ."
                                    }
                                ]
                            }
                        ]
                    }
                }
            }";
        ?>
    </script>
    <?php get_footer(); ?>

