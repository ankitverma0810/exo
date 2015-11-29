define([
	'models/BlogModel',
	'app',
], function (BlogModel, App) {
	'use strict';

	App.Collections.Blogs = Backbone.Collection.extend({
		model: BlogModel,

		initialize: function() {
			if (Backbone.history.fragment.indexOf('admin') > -1) {
				this.url = App.URL+App.API+"/blogs/";
			} else {
				this.url = App.URL+"/blogs/";
			}
		}
	});

	return App.Collections.Blogs;
});