define([
	'app',
	'views/portfolios/admin_list',
	'text!templates/portfolios/admin_index.html',
], function (App, adminPortfolioListView, admin_index) {
	'use strict';

	App.Views.Portfolios = Backbone.View.extend({
		template: _.template(admin_index),
		className: 'portfolio-container',

		initialize: function() {
			this.$el.html(this.template());
		},

		render: function() {
			this.collection.each(this.addOne, this);
			return this;
		},

		addOne: function(portfolio) {
			var pageView = new adminPortfolioListView({ model: portfolio});
			this.$el.find('table tbody').append(pageView.render().el);
		}
	});

	return App.Views.Portfolios;
});