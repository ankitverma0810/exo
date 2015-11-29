define([
	'app',
], function (App) {
	'use strict';

	App.Models.Portfolio = Backbone.Model.extend({
		defaults: {
            id: null,
            title: '',
            url: '',
            description: '',
            filename: ''
        },

        initialize: function() {
        	if (Backbone.history.fragment.indexOf('admin') > -1) {
				this.urlRoot = App.URL+App.API+"/portfolios/";
			} else {
				this.urlRoot = App.URL+"/portfolios/";
			}

			this.uploadLocation = "portfolios";
        },

	    parse: function (response) {
			var attr = response && _.clone(response) || {};
			if(response.Portfolio) {
				for (var key in response.Portfolio) {
				    if (response.Portfolio.hasOwnProperty(key)) {
				        attr[key] = response.Portfolio[key]
				    }
				}
				delete attr.Portfolio;
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

	return App.Models.Portfolio;
});