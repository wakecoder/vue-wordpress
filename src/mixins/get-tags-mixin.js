import safeGet from 'safe-get'
export default {
    methods: {
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
        }
    }
}
