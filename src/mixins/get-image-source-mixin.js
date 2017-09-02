export default {
    methods: {
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
        }
    }
}
