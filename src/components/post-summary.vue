<template>
    <div>
        <div v-if="post" class="post-summary-container">
            <router-link :to="post.link" class="no-decor">
                <slot name="beforeImage"></slot>
                <img :src="post[imageSource]" class="post-summary-img" align="left">
                <slot name="beforeTitle"></slot>
                <h3 v-html="post.title" class="post-summary-title"></h3>
                <slot name="beforeSummary"></slot>
                <div class="post-summary-excerpt" v-html="post.excerpt">
                </div>
                <slot class="afterSummary"></slot>
            </router-link>
        </div>
    </div>
</template>
<style></style>
<script>
export default {
    name: 'post-summary',
    // @post is the post / wp custom type object return by the wp-mixin mapper
    // @imgSize can be Thumbnail, Medium or Full. Any other value will require a custom mapper that generates a property
    // with the appropriate imgSrc property name. Example: if imgSize = 'SmallThumb' the mapper must return an object
    // with a property called 'imgSrcSmallThumb' that contains a URL to the appropriate media.
    props: ['post', 'imgSize'],
    computed: {
        imageSource() {
            return this.imgSize ? 'imgSrc' + this.imgSize : 'imgSrcMedium'
        }
    }
}
</script>
