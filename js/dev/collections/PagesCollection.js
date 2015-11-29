define([
	'models/PageModel',
	'app',
], function (PageModel, App) {
	'use strict';

	App.Collections.Pages = Backbone.Collection.extend({
		model: PageModel,

		initialize: function() {
			if (Backbone.history.fragment.indexOf('admin') > -1) {
				this.url = App.URL+App.API+"/pages/";
			} else {
				this.url = App.URL+"/pages/";
			}
		}
	});

	return App.Collections.Pages;
});