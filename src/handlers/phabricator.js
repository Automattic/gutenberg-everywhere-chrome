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

	// Clean up
	show( '.remarkup-assist-bar', dom );
	show( 'textarea', dom );

	markAsNotRunning( dom );
}

function attachEditor( dom ) {
	// Hide everything
	hide( '.remarkup-assist-bar', dom );
	hide( 'textarea', dom );

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

export default function tracHandler() {
	return applyWithSelector( '.aphront-form-control-textarea', attachEditor, detachEditor );
}
