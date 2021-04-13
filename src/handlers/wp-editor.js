/**
 * Internal dependencies
 */

import { load, save } from '../formatters/markdown';
import { applyWithSelector, markAsNotRunning, markAsRunning, attach, detach } from './base-handler';
import { hide, show, createEditorNode } from '../dom';

function detachEditor( dom ) {
	const editor = dom.nextSibling;

	// Remove the editor
	detach( editor );
	markAsNotRunning( dom );

	// Clean up
	show( dom );
}

function attachEditor( dom ) {
	// Hide everything
	hide( dom );

	const editor = createEditorNode();
	const textarea = dom.querySelector( 'textarea' );

	// Insert after the wrapper
	dom.parentNode.insertBefore( editor, dom.nextSibling );

	markAsRunning( dom );

	attach(
		editor,
		( parser, rawHandler ) => load( textarea, parser, rawHandler ),
		( content ) => save( content, textarea )
	);
}

export default function textareaHandler() {
	return applyWithSelector( '.wp-editor-container', attachEditor, detachEditor );
}
