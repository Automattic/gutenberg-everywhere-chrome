/**
 * Initial content loader. Determine if the textarea contains blocks or raw HTML
 * @param {string} content Text area content
 * @param {*} parser Gutenberg `parse` function
 * @param {*} rawHandler Gutenberg `rawHandler` function
 */
export function load( content, parser, rawHandler ) {
	// Parse the blocks
	return parser( content.value );
}

/**
 * Saves content to the textarea
 * @param {string} content Serialized block content
 * @param {HTMLTextAreaElement} textarea Textarea node
 */
export function save( content, textarea ) {
	textarea.value = content;
}
