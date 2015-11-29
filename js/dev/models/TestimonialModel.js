define([
	'app',
], function (App) {
	'use strict';

	App.Models.Testimonial = Backbone.Model.extend({
		defaults: {
            id: null,
            author: '',
            description: '',
            filename: ''
        },

        initialize: function() {
        	if (Backbone.history.fragment.indexOf('admin') > -1) {
				this.urlRoot = App.URL+App.API+"/testimonials/";
			} else {
				this.urlRoot = App.URL+"/testimonials/";
			}

			this.uploadLocation = "testimonials";
        },

	    parse: function (response) {
			var attr = response && _.clone(response) || {};
			if(response.Testimonial) {
				for (var key in response.Testimonial) {
				    if (response.Testimonial.hasOwnProperty(key)) {
				        attr[key] = response.Testimonial[key]
				    }
				}
				delete attr.Testimonial;
			}
			return attr;
	    },

	    validate: function( attrs ) {
			var errs = {};
			if( !attrs.author ) errs.author = { message: 'Required' };
			if( !attrs.description ) errs.description = { message: 'Required' };
			if( !attrs.filename ) errs.filename = { message: 'Required' };
			if( !_.isEmpty(errs) ) return errs;
		}
	});

	return App.Models.Testimonial;
});