/**
 * Initial content loader. Determine if the textarea contains blocks or raw HTML
 * @param {string} content Text area content
 * @param {*} parser Gutenberg `parse` function
 * @param {*} rawHandler Gutenberg `rawHandler` function
 */
export function load( content, parser, rawHandler ) {
	if ( content.value.indexOf( '<!--' ) !== -1 ) {
		// Parse the blocks
		return parser( content.value );
	}

	return rawHandler( { HTML: content.value } );
}

/**
 * Saves content to the textarea
 * @param {string} content Serialized block content
 * @param {HTMLTextAreaElement} textarea Textarea node
 */
export function save( content, textarea ) {
	let wpautop = content;

	// Remove block markup
	wpautop = wpautop.replace( /<!--.*?-->/g, '', wpautop );

	// Remove <p> tags
	wpautop = wpautop.replace( /<p>(.*?)<\/p>/g, '$1', wpautop );

	// Flatten >2 newlines
	wpautop = wpautop.replace( /\n{3,}/g, '\n\n', wpautop );

	// Leading/trailing newlines
	wpautop = wpautop.replace( /^\n+/, '', wpautop );
	wpautop = wpautop.replace( /\n+$/, '', wpautop );

	textarea.value = wpautop + '\n';
}
