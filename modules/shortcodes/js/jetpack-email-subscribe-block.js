/* global wp */
/* jshint esversion: 5, es3:false */
const el = wp.element.createElement,
	registerBlockType = wp.blocks.registerBlockType,
	ServerSideRender = wp.components.ServerSideRender,
	TextControl = wp.components.TextControl,
	InspectorControls = wp.editor.InspectorControls,
	__ = wp.i18n.__;

const fields = [
	{ id: 'title', label: __( 'Title' ) },
	{ id: 'email_placeholder', label: __( 'Placeholder' ) },
	{ id: 'submit_label', label: __( 'Submit button label' ) },
	{ id: 'consent_text', label: __( 'Consent text' ) },
	{ id: 'processing_label', label: __( '"Processing" status message' ) },
	{ id: 'success_label', label: __( 'Success status message' ) },
	{ id: 'error_label', label: __( 'Error status message' ) },
];

registerBlockType( 'jetpack/email-subscribe', {
	title: __( 'Email Subscribe' ),
	icon: 'email',
	category: 'widgets',

	edit: function( props ) {
		return [
			el( ServerSideRender, {
				block: 'jetpack/email-subscribe',
				attributes: props.attributes,
			} ),
			el( InspectorControls, {},
				fields.map( function( field ) {
					return el( TextControl, {
						label: field.label,
						key: field.id,
						value: props.attributes[ field.id ],
						onChange: function( value ) {
							const newVal = {};
							newVal[ field.id ] = value;
							props.setAttributes( newVal );
						},
					} );
				} )
			)
		];
	},

	// We're going to be rendering in PHP, so save() can just return null.
	save: function() {
		return null;
	},
} );
