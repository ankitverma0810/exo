define([
	'models/MenuModel',
	'app',
], function (MenuModel, App) {
	'use strict';

	App.Collections.Menus = Backbone.Collection.extend({
		model: MenuModel,

		initialize: function() {
			if (Backbone.history.fragment.indexOf('admin') > -1) {
				this.url = App.URL+App.API+"/menus/";
			} else {
				this.url = App.URL+"/menus/";
			}
		}
	});

	return App.Collections.Menus;
});