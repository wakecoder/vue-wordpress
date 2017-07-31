<?php /* Template Name: WooCommerce */ ?>
<?php get_header(); ?>
    <main role="main">
        <!--The following line should be removed if issues occur-->
        <div id="app">
            <div class="no-fouc">
              <?php woocommerce_content(); ?>
            </div>
        </div>
    </main>
    <script type="text/javascript">
        <?php
            $title = json_encode (apply_filters ('the_title', get_the_title()));
            echo "window.server={
                route: {
                    title: " . $title  .",
                    componentName: 'store',
                    dataLoaded: true
                },
                render: function() {
                    return " . json_encode(apply_filters('the_content', get_the_content())) . "
                }
            }";
        ?>
    </script>
    <?php get_footer(); ?>
