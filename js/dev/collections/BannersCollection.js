define([
	'models/BannerModel',
	'app',
], function (BannerModel, App) {
	'use strict';

	App.Collections.Banners = Backbone.Collection.extend({
		model: BannerModel,
		
		initialize: function() {
			if (Backbone.history.fragment.indexOf('admin') > -1) {
				this.url = App.URL+App.API+"/banners/";
			} else {
				this.url = App.URL+"/banners/";
			}
		}
	});

	return App.Collections.Banners;
});