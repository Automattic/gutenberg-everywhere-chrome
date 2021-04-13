/**
 * Internal dependencies
 */

import { load, save } from '../formatters/markdown';
import { applyWithSelector, markAsNotRunning, markAsRunning, attach, detach } from './base-handler';
import { hide, show, createEditorNode } from '../dom';

function detachEditor( textarea ) {
	// Remove the editor
	detach( textarea.nextSibling );

	// Clean up
	show( textarea );
	markAsNotRunning( textarea );
}

function attachEditor( textarea ) {
	const editor = createEditorNode();

	markAsRunning( textarea );

	// Insert it and hide the old textarea
	textarea.parentNode.insertBefore( editor, textarea.nextSibling );

	// Hide textarea
	hide( textarea );

	attach(
		editor,
		( parser, rawHandler ) => load( textarea, parser, rawHandler ),
		( content ) => save( content, textarea ),
	);
}

export default function textareaHandler() {
	return applyWithSelector( 'textarea', attachEditor, detachEditor );
}
