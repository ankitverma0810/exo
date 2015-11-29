define([
	'app',
], function (App) {
	'use strict';

	App.Models.Banner = Backbone.Model.extend({
		defaults: {
            id: null,
            filename: '',
            url: ''
        },

	    initialize: function() {
        	if (Backbone.history.fragment.indexOf('admin') > -1) {
				this.urlRoot = App.URL+App.API+"/banners/";
			} else {
				this.urlRoot = App.URL+"/banners/";
			}
        },

	    parse: function (response) {
			var attr = response && _.clone(response) || {};
			if(response.Banner) {
				for (var key in response.Banner) {
				    if (response.Banner.hasOwnProperty(key)) {
				        attr[key] = response.Banner[key]
				    }
				}
				delete attr.Banner;
			}
			return attr;
	    },

	    validate: function( attrs ) {
			var errs = {};
			if( !attrs.filename ) errs.filename = { message: 'Required' };
			if( !attrs.url ) errs.url = { message: 'Required' };
			if( !_.isEmpty(errs) ) return errs;
		}
	});

	return App.Models.Banner;
});