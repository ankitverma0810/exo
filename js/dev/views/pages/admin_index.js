define([
	'app',
	'views/pages/admin_list',
	'text!templates/pages/admin_index.html',
], function (App, adminPageListView, admin_index) {
	'use strict';

	App.Views.Pages = Backbone.View.extend({
		template: _.template(admin_index),
		className: 'page-container',

		initialize: function() {
			this.$el.html(this.template());
		},

		render: function() {
			this.collection.each(this.addOne, this);
			return this;
		},

		addOne: function(page) {
			var pageView = new adminPageListView({ model: page});
			this.$el.find('table tbody').append(pageView.render().el);
		}
	});

	return App.Views.Pages;
});