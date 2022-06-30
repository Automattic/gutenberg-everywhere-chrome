/**
 * Internal dependencies
 */

import toggleAvailableEditors from './handlers';
import '@automattic/isolated-block-editor/build-browser/core.css';
import '@automattic/isolated-block-editor/build-browser/isolated-block-editor.css';
import './style.scss';

chrome.runtime.onMessage.addListener( ( message ) => {
	if ( message && message.type === 'TOGGLE_GUTENBERG' ) {
		toggleAvailableEditors();
	}
} );
