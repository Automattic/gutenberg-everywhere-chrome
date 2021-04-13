function getSelectorDom( selectorDom, parent = document ) {
	if ( selectorDom instanceof Element ) {
		return [ selectorDom ];
	}

	return parent.querySelectorAll( selectorDom );
}

export function hide( selectorDom, parent ) {
	const dom = getSelectorDom( selectorDom, parent );

	if ( dom.length > 0 ) {
		dom.forEach( ( item ) => {
			item.style.display = 'none';
			item.style.visibility = 'hidden';
		} );
	}
}

export function show( selectorDom, parent ) {
	const dom = getSelectorDom( selectorDom, parent );

	if ( dom.length > 0 ) {
		dom.forEach( ( item ) => {
			item.style.display = null;
			item.style.visibility = null;
		} );
	}
}

export function createEditorNode() {
	const editor = document.createElement( 'div' );

	editor.classList.add( 'editor' );

	return editor;
}
