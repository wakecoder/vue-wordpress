require('es6-promise').polyfill()
import safeGet from 'safe-get'
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
    methods: {
        createWpLoader: function (queryUrl, mapper) {
            const loader = {
                totalPages: undefined,
                pagesLoaded: 0,
                pages: [],
                loadPage: function () {
                    const pageToLoad = loader.pagesLoaded + 1
                    const newPage = { loaded: false, content: [] }
                    loader.pages.push(newPage)
                    wpGet({ url: queryUrl + '&page=' + pageToLoad, mapper }).then(content => {
                        newPage.content = content
                        newPage.loaded = true
                        loader.pagesLoaded++
                    })
                },
                pagesLeft: true // This updated based on the X-WP-TotalPages header and pagesLoaded
            }
            loader.loadPage()
            return loader
        },
        mapPosts: function (json) {
            return json.map(p => {
                return {
                    imgSrc: safeGet(p, '_embedded.wp:featuredmedia[0].media_details.sizes.single_thumb.source_url'),
                    imgSrcLarge: safeGet(p, '_embedded.wp:featuredmedia[0].media_details.sizes.full.source_url'),
                    imgSrcSquare: safeGet(p, '_embedded.wp:featuredmedia[0].media_details.sizes.thumbnail.source_url'),
                    title: safeGet(p, 'title.rendered'),
                    content: safeGet(p, 'content.rendered'),
                    excerpt: safeGet(p, 'excerpt.rendered'),
                    author: safeGet(p, '_embedded.author[0].name'),
                    link: { path: '/' + safeGet(p, 'slug') }, // TODO: Should this be moved to link from slug?
                    bareUrl: safeGet(p, 'link')
                }
            })
        }
    }
}
