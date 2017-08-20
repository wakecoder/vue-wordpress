<template>
    <div class="all-posts-container">
        <div v-for="(page,index) of loader.pages" :key="index">
            <async-content :loaded="page.loaded">
                <ul class="all-posts-ul">
                    <li v-for="(post,index) of page.content" class="all-posts-li" :key="index">
                        <post-summary :post="post">
                        </post-summary>
                    </li>
                </ul>
            </async-content>
        </div>
    </div>
</template>
<script>
import asyncContent from './async-content.vue'
import wpMixin from '../mixins/wp-mixin'
import postSummary from './post-summary.vue'
export default {
    name: 'all-posts',
    components: {
        asyncContent,
        postSummary
    },
    mixins: [wpMixin],
    props: ['loader']
}
</script>
