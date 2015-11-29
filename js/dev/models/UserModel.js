define([
	'app',
], function (App) {
	'use strict';

	App.Models.User = Backbone.Model.extend({
		defaults: {
            id: null,
            name: '',
            email: '',
            role_id: 1,
            status_id: 1
        },

	    urlRoot: App.URL+App.API+"/users/",

	    parse: function (response) {
			var attr = response && _.clone(response) || {};
			if(response.User) {
				for (var key in response.User) {
				    if (response.User.hasOwnProperty(key)) {
				        attr[key] = response.User[key]
				    }
				}
				delete attr.User;
			}
			return attr;
	    },

	    validate: function( attrs ) {
			var errs = {};
			if( !attrs.name ) errs.name = { message: 'Required' };
			if( !attrs.email ) errs.email = { message: 'Required' };
			if( !attrs.id ) {
				if( !attrs.password ) errs.password = { message: 'Required' };
			}
			if( !_.isEmpty(errs) ) return errs;
		}
	});

	return App.Models.User;
});