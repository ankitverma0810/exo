define([
	'app',
], function (App) {
	'use strict';

	App.Models.Menu = Backbone.Model.extend({
		defaults: {
            id: null,
            parent_id: null,
            title: '',
            controller: '',
            action: ''
        },

	    initialize: function() {
        	if (Backbone.history.fragment.indexOf('admin') > -1) {
				this.urlRoot = App.URL+App.API+"/menus/";
			} else {
				this.urlRoot = App.URL+"/menus/";
			}
        },

	    parse: function (response) {
			var attr = response && _.clone(response) || {};
			if(response.Menu) {
				for (var key in response.Menu) {
				    if (response.Menu.hasOwnProperty(key)) {
				        attr[key] = response.Menu[key]
				    }
				}
				delete attr.Menu;
			}
			return attr;
	    },

	    validate: function( attrs ) {
			var errs = {};
			if( !attrs.title ) errs.title = { message: 'Required' };
			if( !attrs.controller ) errs.controller = { message: 'Required' };
			if( !attrs.action ) errs.action = { message: 'Required' };
			if( !_.isEmpty(errs) ) return errs;
		}
	});

	return App.Models.Menu;
});