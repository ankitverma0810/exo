define([
	'app',
], function (App) {
	'use strict';

	App.Models.Page = Backbone.Model.extend({
		defaults: {
            id: null,
            title: '',
            url: '',
            description: '',
            filename: ''
        },

        initialize: function() {
        	if (Backbone.history.fragment.indexOf('admin') > -1) {
				this.urlRoot = App.URL+App.API+"/pages/";
			} else {
				this.urlRoot = App.URL+"/pages/";
			}

			this.uploadLocation = "pages";
        },

	    parse: function (response) {
			var attr = response && _.clone(response) || {};
			if(response.Page) {
				for (var key in response.Page) {
				    if (response.Page.hasOwnProperty(key)) {
				        attr[key] = response.Page[key]
				    }
				}
				delete attr.Page;
			}
			return attr;
	    },

	    validate: function( attrs ) {
			var errs = {};
			if( !attrs.title ) errs.title = { message: 'Required' };
			if( !attrs.description ) errs.description = { message: 'Required' };
			if( !attrs.filename ) errs.filename = { message: 'Required' };
			if( !_.isEmpty(errs) ) return errs;
		}
	});

	return App.Models.Page;
});