<template>
    <div>
        <div v-if="post" class="post-summary-container">
            <router-link :to="post.link" class="no-decor">
                <img :src="post.imgSrc" class="post-summary-img" align="left">
                <h3 v-html="post.title" class="post-summary-title"></h3>
                <div class="post-summary-excerpt" v-html="post.example">
                </div>
            </router-link>
        </div>
    </div>
</template>
<style></style>
<script>
export default {
    name: 'post-summary',
    props: ['post']
}
</script>
