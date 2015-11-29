define([
	'app',
], function (App) {
	'use strict';

	App.Models.Service = Backbone.Model.extend({
		defaults: {
            id: null,
            title: '',
            description: '',
            filename: ''
        },

        initialize: function() {
        	if (Backbone.history.fragment.indexOf('admin') > -1) {
				this.urlRoot = App.URL+App.API+"/services/";
			} else {
				this.urlRoot = App.URL+"/services/";
			}

			this.uploadLocation = "services";
        },

	    parse: function (response) {
			var attr = response && _.clone(response) || {};
			if(response.Service) {
				for (var key in response.Service) {
				    if (response.Service.hasOwnProperty(key)) {
				        attr[key] = response.Service[key]
				    }
				}
				delete attr.Service;
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

	return App.Models.Service;
});