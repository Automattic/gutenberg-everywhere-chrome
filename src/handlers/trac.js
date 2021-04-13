/**
 * Internal dependencies
 */

import { load, save } from '../formatters/markdown';
import { applyWithSelector, markAsNotRunning, markAsRunning, attach, detach } from './base-handler';
import { hide, show, createEditorNode } from '../dom';

function detachEditor( dom ) {
	const textarea = dom.querySelector( 'textarea' );
	const editor = textarea.nextSibling;

	// Remove the editor
	detach( editor );

	// Clean up
	show( '.wikitoolbar' );
	show( '.trac-grip' );
	show( '.trac-textarea-hint' );
	show( textarea );

	markAsNotRunning( dom );
}

function attachEditor( dom ) {
	// Hide Trac stuff
	hide( '.wikitoolbar' );
	hide( '.trac-grip' );
	hide( '.trac-textarea-hint' );

	const editor = createEditorNode();
	const textarea = dom.querySelector( 'textarea' );

	textarea.parentNode.insertBefore( editor, textarea.nextSibling );

	hide( textarea );
	markAsRunning( dom );

	attach(
		editor,
		( parser, rawHandler ) => load( textarea, parser, rawHandler ),
		( content ) => save( content, textarea )
	);
}

export default function tracHandler() {
	return applyWithSelector( 'div.trac-resizable', attachEditor, detachEditor );
}
