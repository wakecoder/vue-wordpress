<template>
    <div>
        <div v-if="post">
            <router-link :to="post.link" class="no-decor">
                <slot name="image">
                    <img :src="imageSource" class="post-summary-img" align="left">
                </slot>
                <slot name="title">
                    <h3 v-html="post.title" class="post-summary-title"></h3>
                </slot>
                <slot name="excerpt">
                    <div class="post-summary-excerpt" v-html="post.excerpt">
                    </div>
                </slot>
            </router-link>
        </div>
    </div>
</template>
<style></style>
<script>
import wpMixin from '../mixins/wp-mixin'
export default {
    mixins: [wpMixin],
    name: 'post-summary',
    // @post is the post / wp custom type object return by the wp-mixin mapper
    // @imgSize can be Thumbnail, Medium or Full. Any other value will require a custom mapper that generates a property
    // with the appropriate imgSrc property name. Example: if imgSize = 'SmallThumb' the mapper must return an object
    // with a property called 'imgSrcSmallThumb' that contains a URL to the appropriate media.
    props: ['post', 'imgSize'],
    computed: {
        imageSource() {
            return this.getImageSource(this.post, this.imgSize)
        }
    }
}
</script>
