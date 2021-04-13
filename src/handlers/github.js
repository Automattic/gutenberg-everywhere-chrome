/**
 * Internal dependencies
 */

import { load, save } from '../formatters/markdown';
import { applyWithSelector, markAsNotRunning, markAsRunning, attach, detach } from './base-handler';
import { hide, show, createEditorNode } from '../dom';

const EMPTY = '<!-- wp:paragraph --><p></p><!-- /wp:paragraph -->';

function detachEditor( dom ) {
	const editor = dom.nextSibling;

	// Remove the editor
	detach( editor );

	// Clean up
	show( '.toolbar-commenting', dom );
	show( 'textarea', dom );

	markAsNotRunning( dom );
}

function attachEditor( dom ) {
	const editor = createEditorNode();
	const textarea = dom.querySelector( 'textarea' );

	// Hide everything
	hide( '.toolbar-commenting', dom );
	hide( 'textarea', dom );

	// Insert after the textarea
	textarea.parentNode.insertBefore( editor, textarea.nextSibling );

	markAsRunning( dom );

	attach(
		editor,
		( parser, rawHandler ) => load( textarea, parser, rawHandler ),
		( content ) => {
			save( content, textarea );

			const submit = dom.querySelector( 'button.btn-primary[type=submit]' ); ;

			// Github toggles the form button depending on content. We need to do that for it here.
			if ( content.replace( /\n/g, '' ) === EMPTY ) {
				submit.setAttribute( 'disabled', true );
			} else {
				submit.removeAttribute( 'disabled' );
			}
		}
	);
}

export default function githubHandler() {
	if ( document.location.host === 'github.com' ) {
		return applyWithSelector( '.discussion-timeline-actions', attachEditor, detachEditor );
	}

	return 0;
}
