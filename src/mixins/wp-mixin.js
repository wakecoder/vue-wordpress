require('es6-promise').polyfill()
import safeGet from 'safe-get'
import 'whatwg-fetch'

// wpGet just wraps some of the basic fetch boilerplate
const wpGet = function ({ url, mapper, fetchOptions, errorCallback }) {
    return fetch(url, fetchOptions)
        .then(res => {
            if (!res.ok) {
                errorCallback(res)
            }
            return res.json()
        })
        .then(json => {
            return mapper(json)
        })
}

export default {
    methods: {
        /**
         *
         * @param {*} url - The URL of the WP REST endpoint (Ex: https://pixelthin.com/content/wp-json/wp/v2/posts)
         * @param {object} options - An object that may contain any or none of the following:
         *      mapper: a function that takes JSON and maps it to an object. See mapPosts for an example. Useful for custom types.
         *      queryParams: an array containing any additional query parameter key-value pairs (see example.vue).
         *      embed: a boolean indicating whether media links and other links should be embedded in the response. **Default is true.**
         * @param {object} fetchOptions - An object that contains options for the fetch call. See https://github.github.io/fetch/ for more
         *      informaiton. NOTE: Must set {credentials: 'include' | 'same-site'} for endpoints requiring cookie authentication.
         */
        createWpLoader(url, options, fetchOptions, errorCallback) {
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
                    wpGet({ url: url + 'page=' + pageToLoad, mapper, fetchOptions, errorCallback }).then(content => {
                        newPage.content = content
                        newPage.loaded = true
                        loader.pagesLoaded++
                    })
                        .catch(reason => {
                            errorCallback(reason)
                        })
                },
                pagesLeft: true // This should be updated based on the X-WP-TotalPages header and pagesLoaded
            }
            loader.loadPage()
            return loader
        },

        /**
         * This method is a default mapper for WP-REST posts. Any mapper can be used with the post loader
         * but this one has most of the commonly used properties.
         */
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
        },
        /**
       *
       * @param {object} post - WP-REST response for a single post / custom type
       * @param {string} imgSize - the size of the image (e.g. Thumbnail, Medium, Full) Any other value
       * will require a custom mapper that generates a property with the appropriate imgSrc property
       *  name. Example: if imgSize = 'SmallThumb' the mapper must return an object with a property
       *  called 'imgSrcSmallThumb' that contains a URL to the appropriate media.
       */
        getImageSource(post, imgSize) {
            if (imgSize && imgSize.length > 0) {
                // Make sure the first character is upper cased -- to create a property name like: imgSrcMedium
                imgSize = imgSize.charAt(0).toUpperCase() + imgSize.slice(1)
                return post['imgSrc' + imgSize]
            }
            return post['imgSrcMedium']
        },
        /**
        * Goes through the embedded portion of a WP-REST response and pulls out tags (or any
        * other taxonomy). If tagTaxononmy isn't specified, it defaults to 'post_tag'
        * @param {object} postJson
        * @param {string} tagTaxonomy
        */
        getTags(postJson, tagTaxonomy) {
            const wpTerm = safeGet(postJson, '_embedded.wp:term')
            tagTaxonomy = tagTaxonomy || 'post_tag'
            return wpTerm ? wpTerm.reduce((previous, current) => {
                return previous.concat(current.filter(t => t.taxonomy === tagTaxonomy)
                    .map(t => t.slug))
            }, []) : []
        },
        /**
         * Takes a vue-router route object (this.$route) and returns the appropriate WP-REST API post loader.
         * This can be used with default (*) routing in the vue-router to dynamically pull in full posts.
         * Note: This makes the assumptions that your WP install is using slugs for permalinks
         * @param {object} options - {
         * {object} route: the vue-router route object (this.$route)
         * {string} baseUrl - Specifies the base URL for the WP-REST install (e.g. 'https://pixelthing.com/blog')
         * {string} postTypes - Optional. Can be used to specify a custom post type. Defaults to 'posts'
         * {array} queryParams - Optional. Can be used to specify additional query parameters for the wp loader
         * {bool} embed - Optional. Indicates whether links, tags, image URLs, etc. should be returned embedded in the WP REST response. Defaults to true.
         * {function} mapper - Optional. Used to map the WP-REST API response into a simpler object. Defaults to mapPosts
         */
        createWpLoaderFromRoute({ route, baseUrl, type, queryParams, embed, mapper }) {
            let slug = route.params.slug || route.params[0]
            type = type || 'posts'
            const url = baseUrl + '/wp-json/wp/v2/' + type
            queryParams = queryParams || []
            queryParams.push('slug=' + slug)
            return this.createWpLoader(url, { queryParams, embed, mapper })
        }
    }
}
