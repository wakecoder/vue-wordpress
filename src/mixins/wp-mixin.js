require('es6-promise').polyfill()
import safeGet from 'safe-get'
import getTagsMixin from './get-tags-mixin'
import 'whatwg-fetch'

// wpGet just wraps some of the basic fetch boilerplate
const wpGet = function ({ url, mapper }) {
    return fetch(url)
        .then(res => res.json())
        .then(json => {
            return mapper(json)
        })
}
export default {
    mixins: [getTagsMixin],
    methods: {
        /**
         *
         * @param {*} url - The URL of the WP REST endpoint (Ex: https://pixelthin.com/content/wp-json/wp/v2/posts)
         * @param {object} options - An object that may contain any or none of the following:
         *      mapper: a function that takes JSON and maps it to an object. See mapPosts for an example. Useful for custom types.
         *      queryParams: an array containing any additional query parameter key-value pairs (see example.vue).
         *      embed: a boolean indicating whether media links and other links should be embedded in the response. **Default is true.**
         */
        createWpLoader(url, options) {
            let mapper = options.mapper ? options.mapper : this.mapPosts
            url += options.embed !== false ? '?_embed&' : '?'
            if (safeGet(options, 'queryParams.length') > 0) {
                url += options.queryParams.join('&') + '&'
            }
            const loader = {
                totalPages: undefined,
                pagesLoaded: 0,
                pages: [],
                loadPage: function () {
                    const pageToLoad = loader.pagesLoaded + 1
                    const newPage = { loaded: false, content: [] }
                    loader.pages.push(newPage)
                    wpGet({ url: url + 'page=' + pageToLoad, mapper }).then(content => {
                        newPage.content = content
                        newPage.loaded = true
                        loader.pagesLoaded++
                    })
                },
                pagesLeft: true // This should be updated based on the X-WP-TotalPages header and pagesLoaded
            }
            loader.loadPage()
            return loader
        },
        mapPosts: function (json) {
            return json.map(p => {
                return {
                    imgSrcThumbnail: safeGet(p, '_embedded.wp:featuredmedia[0].media_details.sizes.thumbnail.source_url'),
                    imgSrcMedium: safeGet(p, '_embedded.wp:featuredmedia[0].media_details.sizes.medium.source_url'),
                    imgSrcFull: safeGet(p, '_embedded.wp:featuredmedia[0].media_details.sizes.full.source_url'),
                    title: safeGet(p, 'title.rendered'),
                    content: safeGet(p, 'content.rendered'),
                    excerpt: safeGet(p, 'excerpt.rendered'),
                    author: safeGet(p, '_embedded.author[0].name'),
                    link: { path: '/' + safeGet(p, 'slug') }, // TODO: Should this be moved to link from slug?
                    bareUrl: safeGet(p, 'link'),
                    date: safeGet(p, 'date'),
                    tags: this.getTags(p)
                }
            })
        }
    }
}
