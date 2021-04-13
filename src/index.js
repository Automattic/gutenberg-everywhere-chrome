/**
 * Internal dependencies
 */

import toggleAvailableEditors from './handlers';
import './style.scss';

chrome.runtime.onMessage.addListener( ( message ) => {
	if ( message && message.type === 'TOGGLE_GUTENBERG' ) {
		toggleAvailableEditors();
	}
} );
