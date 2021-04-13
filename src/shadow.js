import { useEffect } from '@wordpress/element';

export default function ShadowCSS() {
	useEffect( () => {
		const linkElem = document.createElement( 'link' );

		linkElem.setAttribute( 'rel', 'stylesheet' );
		linkElem.setAttribute( 'href', chrome.runtime.getURL( 'build/gutenberg-everywhere.css' ) );

		document.querySelector( '.gutenberg-everywhere' ).shadowRoot.appendChild( linkElem );

		setTimeout( () => {
			document.querySelector( '.gutenberg-everywhere' ).classList.remove( 'gutenberg-everywhere__loading' );
		}, 100 );
	}, [] );
	return null;
}
