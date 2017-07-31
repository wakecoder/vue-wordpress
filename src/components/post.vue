<template>
    <div>
        <h2 v-html="post.title"></h2>
        <div class="col-xs-12 width-auto">
            <img :src="post.imgSrcLarge" class="posts-img-padding post-img-float">
            <eek-social-bar :title="post.title" :quote="post.title" :media="post.imgSrc" :share-url="post.bareUrl"></eek-social-bar>
            <div v-html="post.content">
            </div>
            <eek-social-bar :title="post.title" :quote="post.title" :media="post.imgSrc" :share-url="post.bareUrl"></eek-social-bar>
        </div>
    </div>
</template>
<style>
.post-img-float {
    float: left;
    width: 50%;
}
</style>
<script>
import eekSocialBar from './eek-social-bar'
export default {
    name: 'post',
    props: ['post'],
    components: {
        eekSocialBar
    }
}

</script>
