/**
 * Internal dependencies
 */

import textareaHandler from './textarea';
import tracHandler from './trac';
import wpEditorHandler from './wp-editor';
//import phabHandler from './phabricator';
import githubHandler from './github';

const pageHandlers = [
	tracHandler,
	wpEditorHandler,
	githubHandler,
	// phabHandler, TODO: remove annoying keyboard shortcut handler

	// This should come last as the default handler
	textareaHandler
];

export default function toggleAvailableEditors() {
	for ( let index = 0; index < pageHandlers.length; index++ ) {
		const count = pageHandlers[ index ]();

		if ( count > 0 ) {
			return count;
		}
	}

	return 0;
}
