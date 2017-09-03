<template>
  <div>
    <h1>vue-wordpress</h1>
    <p>A collection of vue.js components and mixins for interfacing with the WordPress REST API. For information on how to use vue-wordpress, go to the github site. The most used and useful pieces of this repo are probably methods in the mixin:
      <ul>
        <li>createWpLoader simplifies pulling data from the WP-REST API with WP loaders. WP loaders support pagination and simplify async fetching of data. Support custom mappers.</li>
        <li>mapPosts is a default map function for use with createWpLoader to map the REST-API response for posts into a simpler data format.
        <li>getTags is a function that can be used in the map function of a post loader to get all tags associated with a post.</li>
        <li>getImageSource is a function that maps simple image sizes to WP-REST mapper properties</li>
        <li>getPostRestUrl is a function that will take a url and map it to the corresponding WP-REST API. This can be used to pull posts from the WP-REST API based upon the route in vue-router. For an example see <a href="https://pixelthin.com">Pixelthin.com</a></li>
      </ul>
    </p>
    <h2>Examples:</h2>
    <p>Each of the following examples utilizes the wp-mixin and the async-content component. Check out the example source for more information on how to use the mixins. The post visual vue components may also be of use but, if you want to really customize them it may be easier to just use them as a template and create your own components using the mixins.
    </p>
    <div class="flex-container">
      <div class="col-sm">
        <h4>post-summary</h4>
        <!-- In this example, we're just loading one page of results from the WP-REST API. 
                                    For an example of loading more than one post, see the single-post section-->
        <async-content :loaded="postLoader.pages[0].loaded">
          <div v-for="(post,index) of postLoader.pages[0].content" :key="index">
            <post-summary imgSize="thumbnail" :post="post" class="post-summary"></post-summary>
            </br>
          </div>
        </async-content>
      </div>
      <div class="col-sm">
        <h4>single-post</h4>
        <!-- In this example we're loading one post at a time and letting the user pull a new on in dynamically
                              whenever they click a button -->
        <div v-for="(page,index) of singlePostLoader.pages" :key="index">
          <async-content :loaded="page.loaded">
            <!-- This post loader only contains one post per page (we set per_page=1 in the post loader query params) -->
            <post :post="page.content[0]"></post>
          </async-content>
        </div>
        <button type="button" @click="singlePostLoader.loadPage()"> Load Another Post</button>
      </div>
      <div class="col-lg">
        <h4>all-posts</h4>
        <all-posts :loader="allPostLoader"></all-posts>
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
      // There are multiple loaders here just for the purpos of providing an example. Each component doesn't need
      // its own loader.

      // queryParams can contain any query paramater key and value defined by the WP REST API
      postLoader: this.createWpLoader('https://pixelthin.com/content/wp-json/wp/v2/posts', {
        queryParams: ['orderby=title', 'search=example', 'per_page=4']
      }),
      singlePostLoader: this.createWpLoader('https://pixelthin.com/content/wp-json/wp/v2/posts', {
        queryParams: ['per_page=1']
      }),
      allPostLoader: this.createWpLoader('https://pixelthin.com/content/wp-json/wp/v2/posts', {
        queryParams: ['per_page=3']
      })
    }
  }
}
</script>

<style>
.all-posts-ul {
  list-style: none;
}

.all-posts-li {
  margin: 10px;
  background-color: lightgray;
  overflow: hidden;
}

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
