define([
	'app',
	'views/banners/admin_list',
	'text!templates/banners/admin_index.html',
], function (App, adminBannerListView, admin_index) {
	'use strict';

	App.Views.Banners = Backbone.View.extend({
		template: _.template(admin_index),
		className: 'inner-container banner-container',

		initialize: function() {
			this.$el.html(this.template());
		},

		render: function() {
			this.collection.each(this.addOne, this);
			return this;
		},

		addOne: function(banner) {
			var bannerView = new adminBannerListView({ model: banner});
			this.$el.find('table tbody').append(bannerView.render().el);
		}
	});

	return App.Views.Banners;
});