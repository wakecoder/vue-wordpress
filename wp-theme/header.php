<?php /* header.php */ ?>
<!DOCTYPE html>
<html>

<head>
    <meta name=viewport content="width=device-width,initial-scale=1">
    <meta charset="<?php bloginfo('charset'); ?>">
    <link rel=stylesheet href=https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css media=all>
    <link href=/static/css/font-awesome.min.css rel=stylesheet media=all>
    <link rel="shortcut icon" type=image/png href=/static/media/favicon16x16.ico>
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
    <title><?php wp_title(''); ?></title>
    <script type="text/javascript">
        //If js is available, hide the unstyled content to avoid FOUC
        (function () {
            document.write ('<style>.no-fouc { display: none; }</style>')
        }());
    </script>
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
