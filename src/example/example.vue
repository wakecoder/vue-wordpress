<template>
  <div>
    <h1>vue-wordpress</h1>
    <p>A collection of vue.js components and mixins for interfacing with the WordPress REST API. For information on how to use vue-wordpress, go to the github site.
    </p>
    <h2>Examples:</h2>
    <p>Each of the following examples utilizes the wp-mixin and the async-content component.</p>
    <div class="flex-container">
      <div class="col-sm">
        <h4>post-summary</h4>
        <async-content :loaded="postLoader.pages[0].loaded">
          <post-summary v-for="(post,index) of postLoader.pages[0].content" :post="post" :key="index"></post-summary>
        </async-content>
      </div>
      <div class="col-sm">
        <h4>single-post</h4>
      </div>
      <div class="col-lg">
        <h4>all-posts</h4>
      </div>
    </div>
  
  </div>
</template>

<script>
import wpMixin from 'vue-wordpress/mixins/wp-mixin'
import asyncContent from 'vue-wordpress/components/async-content.vue'
import allPosts from 'vue-wordpress/components/all-posts.vue'
import post from 'vue-wordpress/components/post.vue'
import postSummary from 'vue-wordpress/components/post-summary.vue'

export default {
  name: 'example',
  mixins: [wpMixin],
  components: {
    asyncContent,
    allPosts,
    post,
    postSummary
  },
  data() {
    return {
      postLoader: this.createWpLoader('https://pixelthin.com/content/wp-json/wp/v2/posts', {
        queryParams: ['orderby=title', 'search=example', 'per_page=4']
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  text-align: left;
  margin-left: 10%;
}

h1,
h2 {
  font-weight: normal;
  text-align: left;
  color: blue;
}

h4 {
  text-align: center;
}

.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
}

.col-sm {
  width: 45%;
  margin: 2px;
  background-color: #CCDCDC;
  min-width: 400px;
}

.col-lg {
  width: 90%;
  margin: 4px;
  background-color: #CCDCDC;
}
</style>
