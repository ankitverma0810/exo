define([
	'app',
], function (App) {
	'use strict';

	App.Models.Config = Backbone.Model.extend({
		defaults: {
            id: null,
            email: '',
            host: '',
            username: '',
            password: '',
            port: null,
            powered_by: '',
            copyright: ''
        },

	    urlRoot: App.URL+App.API+"/details/",

	    parse: function (response) {
			var attr = response && _.clone(response) || {};
			if(response.Detail) {
				for (var key in response.Detail) {
				    if (response.Detail.hasOwnProperty(key)) {
				        attr[key] = response.Detail[key]
				    }
				}
				delete attr.Detail;
			}
			return attr;
	    },

	    validate: function( attrs ) {
			var errs = {};
			if( !attrs.email ) errs.email = { message: 'Required' };
			if( !attrs.host ) errs.host = { message: 'Required' };
			if( !attrs.username ) errs.username = { message: 'Required' };
			if( !attrs.password ) errs.password = { message: 'Required' };
			if( !attrs.port ) errs.port = { message: 'Required' };
			if( !attrs.powered_by ) errs.powered_by = { message: 'Required' };
			if( !attrs.copyright ) errs.copyright = { message: 'Required' };
			if( !_.isEmpty(errs) ) return errs;
		}
	});

	return App.Models.Config;
});