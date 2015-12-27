define([
	'app',
], function (App) {
	'use strict';

	App.Models.Contact = Backbone.Model.extend({
		defaults: {
            name: '',
            email: '',
            message: ''
        },

        initialize: function() {
        	this.urlRoot = App.URL+"/pages/submitContact";
        },

	    validate: function( attrs ) {
			var errs = {};
			if( !attrs.name ) errs.name = { message: 'Required' };
			if( !attrs.email ) errs.email = { message: 'Required' };
			if( !attrs.message ) errs.message = { message: 'Required' };
			if( !_.isEmpty(errs) ) return errs;
		}
	});

	return App.Models.Contact;
});