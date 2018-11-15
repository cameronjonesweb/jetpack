/* global wp */
/* jshint esversion: 5, es3:false */
const el = wp.element.createElement,
	registerBlockType = wp.blocks.registerBlockType,
	ServerSideRender = wp.components.ServerSideRender,
	TextControl = wp.components.TextControl,
	InspectorControls = wp.editor.InspectorControls,
	__ = wp.i18n.__;

const fields = [
	{ id: 'title', label: __( 'Title', 'jetpack' ) },
	{ id: 'email_placeholder', label: __( 'Placeholder', 'jetpack' ) },
	{ id: 'submit_label', label: __( 'Submit button label', 'jetpack' ) },
	{ id: 'consent_text', label: __( 'Consent text', 'jetpack' ) },
	{ id: 'processing_label', label: __( '"Processing" status message', 'jetpack' ) },
	{ id: 'success_label', label: __( 'Success status message', 'jetpack' ) },
	{ id: 'error_label', label: __( 'Error status message', 'jetpack' ) },
];

registerBlockType( 'jetpack/email-subscribe', {
	title: __( 'Email Subscribe (Jetpack)', 'jetpack' ),
	icon: 'email',
	category: 'widgets',
	keywords: [ __( 'email', 'jetpack' ), __( 'mailchimp', 'jetpack' ), 'jetpack' ],

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

	// We will generate shortcode as a fallback, so that this works even if gutenberg does not.
	save: function( props ) {
		var attrs = '';
		if ( props.attributes ) {
			attrs = ' ' + Object.keys( props.attributes ).filter( function( key ) {
				return props.attributes[ key ];
			} ).map( function( key ) {
				return key + '="' + props.attributes[ key ].replace( '"', "'" ) + '"';
			} ).join( ' ' );
		}
		return '[jetpack-email-subscribe' + attrs + ']';
	},
} );
