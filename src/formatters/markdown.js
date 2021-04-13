import TurndownService from 'turndown';
import MarkdownIt from 'markdown-it';

const turndown = new TurndownService( {
	bulletListMarker: '-',
} );

turndown.addRule( 'listItem', {
	filter: 'li',

	replacement: function ( content, node, options ) {
		content = content
			.replace( /^\n+/, '' ) // remove leading newlines
			.replace( /\n+$/, '\n' ) // replace trailing newlines with just a single one
			.replace( /\n/gm, '\n    ' ); // indent
		var prefix = options.bulletListMarker + ' ';
		var parent = node.parentNode;
		if ( parent.nodeName === 'OL' ) {
			var start = parent.getAttribute( 'start' );
			var index = Array.prototype.indexOf.call( parent.children, node );
			prefix = ( start ? Number( start ) + index : index + 1 ) + '. ';
		}
		return prefix + content + ( node.nextSibling && ! /\n$/.test( content ) ? '\n' : '' );
	},
} );

/**
 * Initial content loader. Determine if the textarea contains blocks or raw HTML
 * @param {string} content Text area content
 * @param {*} parser Gutenberg `parse` function
 * @param {*} rawHandler Gutenberg `rawHandler` function
 */
export function load( content, parser, rawHandler ) {
	// Does the content contain blocks?
	if ( content.value.indexOf( '<!--' ) !== -1 ) {
		// Parse the blocks
		return parser( content.value );
	}

	const md = new MarkdownIt();

	// Raw HTML - do our best
	return rawHandler( { HTML: md.render( content.value ) } );
}

/**
 * Saves content to the textarea
 * @param {string} content Serialized block content
 * @param {HTMLTextAreaElement} textarea Textarea node
 */
export function save( content, textarea ) {
	textarea.value = turndown.turndown( content ) + '\n';
}
