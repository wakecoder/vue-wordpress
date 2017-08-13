<template>
    <div class="post-container">
        <slot name="beforeTitle"></slot>
        <h2 v-html="post.title" class="post-title"></h2>
        <div class="col-xs-12 width-auto">
            <slot name="beforeImage"></slot>
            <img :src="post.imgSrcLarge" class="post-img post-img-float">
            <slot name="beforeContent"></slot>
            <div v-html="post.content" class="post-content">
            </div>
            <slot name="afterContent"></slot>
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
    props: ['post']
}

</script>
