define([
	'app',
], function (App) {
	'use strict';

	App.Models.Blog = Backbone.Model.extend({
		defaults: {
            id: null,
            title: '',
            description: '',
            filename: ''
        },

        initialize: function() {
        	if (Backbone.history.fragment.indexOf('admin') > -1) {
				this.urlRoot = App.URL+App.API+"/blogs/";
			} else {
				this.urlRoot = App.URL+"/blogs/";
			}

			this.uploadLocation = "blogs";
        },

	    parse: function (response) {
			var attr = response && _.clone(response) || {};
			if(response.Blog) {
				for (var key in response.Blog) {
				    if (response.Blog.hasOwnProperty(key)) {
				        attr[key] = response.Blog[key]
				    }
				}
				delete attr.Blog;
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

	return App.Models.Blog;
});