<template>
    <div class="post-container">
        <slot name="title">
            <h2 v-html="post.title" class="post-title"></h2>
        </slot>
        <div class="col-xs-12 width-auto">
            <slot name="image">
                <img :src="imageSource" class="post-img post-img-float">
            </slot>
            <slot name="content">
                <div v-html="post.content" class="post-content">
                </div>
            </slot>
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
export default {
    name: 'post',
    props: ['post', 'imgSize'],
    computed: {
        imageSource() {
            return this.getImageSource(this.post, this.imgSize)
        }
    }
}

</script>
