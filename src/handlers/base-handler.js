/**
 * WordPress dependencies
 */

import { render, unmountComponentAtNode } from '@wordpress/element';
import root from 'react-shadow';

/**
 * Internal dependencies
 */

import IsolatedBlockEditor from 'isolated-block-editor';
import ShadowCSS from '../shadow';

/** @typedef {import('isolated-block-editor').BlockEditorSettings} BlockEditorSettings */

/**
 * These are the Gutenberg and IsolatedBlockEditor settings. Everything not set uses the defaults.
 *
 * @type BlockEditorSettings
 */
const settings = {
	iso: {
		moreMenu: false,
	},
};

export function isRunning( dom ) {
	return dom.dataset.gutenberg === undefined;
}

export function markAsNotRunning( dom ) {
	delete dom.dataset.gutenberg;
}

export function markAsRunning( dom ) {
	dom.dataset.gutenberg = true;
}

function Editor( props ) {
	const { onLoad, onSave, extraSettings = {}, extraProps = {}, children = null } = props;

	return (
		<IsolatedBlockEditor
			settings={ {
				...settings,
				...extraSettings,
			} }
			onLoad={ onLoad }
			onSaveContent={ onSave }
			onError={ () => document.location.reload() }
			{ ...extraProps }
		>
			{ children }
		</IsolatedBlockEditor>
	);
}

export function shadowAttach( container, onLoad, onSave, extraSettings = {}, extraProps = {} ) {
	render(
		<root.div className="gutenberg-everywhere gutenberg-everywhere__loading">
			<Editor onLoad={ onLoad } onSave={ onSave } extraSettings={ extraSettings } extraProps={ extraProps }>
				<ShadowCSS />
			</Editor>
		</root.div>,
		container
	);
}

export function attach( container, onLoad, onSave, extraSettings = {}, extraProps = {} ) {
	render(
		<Editor onLoad={ onLoad } onSave={ onSave } extraSettings={ extraSettings } extraProps={ extraProps } />,
		container
	);
}

/**
 * Remove IsolatedBlockEditor from a textarea node
 * @param {HTMLTextAreaElement} textarea Textarea node
 */
export function detach( container ) {
	container.parentNode.removeChild( container );
	unmountComponentAtNode( container );
}

export function applyWithSelector( selector, attachHandler, detachHandler ) {
	const areas = document.querySelectorAll( selector );

	areas.forEach( ( area ) => {
		if ( isRunning( area ) ) {
			attachHandler( area );
		} else {
			detachHandler( area );
		}
	} );

	return areas.length;
}
